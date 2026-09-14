// Serverless API for Spot Check's "Leads near Danbury" panel.
// Runs a few real web searches (Tavily Search API) for food-truck vendor
// opportunities near Danbury, CT and returns raw results — titles, links,
// snippets. These are leads, not verified events: nothing here is written
// as a tracked event automatically. The front end lets the user review a
// lead and, if it looks real, open it pre-filled in the normal "Log an
// event" form so they still do the actual vetting themselves.
//
// Results are cached in Redis for CACHE_TTL_MS so casual page loads don't
// burn API credits; pass ?refresh=1 to force a fresh search.
//
// Required Vercel project env vars (beyond the ones events.js needs):
//   TAVILY_API_KEY   — from tavily.com, free tier, no card required

const REDIS_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const PASSPHRASE = process.env.SPOTCHECK_PASSPHRASE;
const TAVILY_API_KEY = process.env.TAVILY_API_KEY;

const CACHE_KEY = "spotcheck:leads";
const CACHE_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours
const ANCHOR = "Danbury, CT";

async function redis(command) {
  const res = await fetch(REDIS_URL, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + REDIS_TOKEN,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return data.result;
}

function buildQueries(radius) {
  return [
    `food truck vendor application within ${radius} miles of ${ANCHOR}`,
    `call for vendors food truck festival near ${ANCHOR}`,
    `farmers market food truck vendor sign up near ${ANCHOR}`,
  ];
}

async function tavilySearch(query) {
  const res = await fetch("https://api.tavily.com/search", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + TAVILY_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      search_depth: "basic",
      max_results: 6,
      topic: "general",
      include_published_date: true,
    }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.detail || body.error || ("Tavily HTTP " + res.status));
  }
  const data = await res.json();
  return (data.results || []).map((r) => ({
    title: r.title,
    url: r.url,
    snippet: r.content,
    publishedDate: r.published_date || null,
    favicon: r.favicon || null,
    foundVia: query,
  }));
}

async function runDiscovery(radius) {
  const queries = buildQueries(radius);
  const batches = await Promise.all(queries.map((q) => tavilySearch(q).catch(() => [])));
  const seen = new Set();
  const leads = [];
  for (const batch of batches) {
    for (const lead of batch) {
      if (!lead.url || seen.has(lead.url)) continue;
      seen.add(lead.url);
      leads.push(lead);
    }
  }
  return leads;
}

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");

  if (!REDIS_URL || !REDIS_TOKEN || !PASSPHRASE) {
    res.status(500).json({ error: "Server not configured (storage/passphrase). See api/events.js setup." });
    return;
  }
  if (!TAVILY_API_KEY) {
    res.status(500).json({ error: "Set TAVILY_API_KEY in the Vercel project's environment variables (free key from tavily.com), then redeploy." });
    return;
  }

  const key = req.headers["x-spotcheck-key"];
  if (!key || key !== PASSPHRASE) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const radius = Math.max(1, Math.min(300, parseInt(req.query.radius, 10) || 50));
  const forceRefresh = req.query.refresh === "1";

  try {
    if (!forceRefresh) {
      const cachedRaw = await redis(["GET", CACHE_KEY]);
      if (cachedRaw) {
        const cached = JSON.parse(cachedRaw);
        const age = Date.now() - cached.fetchedAt;
        if (cached.radius === radius && age < CACHE_TTL_MS) {
          res.status(200).json({ leads: cached.leads, fetchedAt: cached.fetchedAt, radius, cached: true });
          return;
        }
      }
    }

    const leads = await runDiscovery(radius);
    const payload = { radius, fetchedAt: Date.now(), leads };
    await redis(["SET", CACHE_KEY, JSON.stringify(payload)]);
    res.status(200).json({ leads, fetchedAt: payload.fetchedAt, radius, cached: false });
  } catch (err) {
    res.status(500).json({ error: String((err && err.message) || err) });
  }
};
