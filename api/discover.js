// Serverless API for Spot Check's "Leads near Danbury" panel.
// Runs a few real web searches (Tavily Search API) for food-truck vendor
// opportunities near Danbury, CT and returns raw results — titles, links,
// snippets. These are leads, not verified events: nothing here is written
// as a tracked event automatically. The front end lets the user review a
// lead and, if it looks real, open it pre-filled in the normal "Log an
// event" form so they still do the actual vetting themselves.
//
// The queries and include/exclude keyword lists are user-editable via
// api/search-settings.js (stored in Redis); this file falls back to
// lib/searchDefaults.js when nothing's been saved.
//
// Results are cached in Redis for CACHE_TTL_MS so casual page loads don't
// burn API credits; pass ?refresh=1 to force a fresh search. Saving new
// settings clears this cache (see search-settings.js) so the next load
// reflects the change instead of serving stale results.
//
// Required Vercel project env vars (beyond the ones events.js needs):
//   TAVILY_API_KEY   — from tavily.com, free tier, no card required

const { effectiveSettings } = require("../lib/searchDefaults");

const REDIS_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const PASSPHRASE = process.env.SPOTCHECK_PASSPHRASE;
const TAVILY_API_KEY = process.env.TAVILY_API_KEY;

const CACHE_KEY = "spotcheck:leads";
const SETTINGS_KEY = "spotcheck:search-settings";
const CACHE_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours

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

function looksLikeVendorCall(lead, positive, negative) {
  const text = ((lead.title || "") + " " + (lead.snippet || "")).toLowerCase();
  const hasPositive = positive.some((s) => text.includes(s.toLowerCase()));
  const hasNegative = negative.some((s) => text.includes(s.toLowerCase()));
  return hasPositive && !hasNegative;
}

async function tavilySearch(query, excludeDomains) {
  const res = await fetch("https://api.tavily.com/search", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + TAVILY_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      search_depth: "basic",
      max_results: 8,
      topic: "general",
      country: "united states",
      exclude_domains: excludeDomains,
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

async function runDiscovery(radius, settings) {
  const queries = settings.queries.map((q) => q.split("{radius}").join(String(radius)));
  const batches = await Promise.all(queries.map((q) => tavilySearch(q, settings.excludeDomains).catch(() => [])));
  const seen = new Set();
  const leads = [];
  for (const batch of batches) {
    for (const lead of batch) {
      if (!lead.url || seen.has(lead.url)) continue;
      if (!looksLikeVendorCall(lead, settings.positive, settings.negative)) continue;
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
    const settingsRaw = await redis(["GET", SETTINGS_KEY]);
    const settings = effectiveSettings(settingsRaw ? JSON.parse(settingsRaw) : null);

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

    const leads = await runDiscovery(radius, settings);
    const payload = { radius, fetchedAt: Date.now(), leads };
    await redis(["SET", CACHE_KEY, JSON.stringify(payload)]);
    res.status(200).json({ leads, fetchedAt: payload.fetchedAt, radius, cached: false });
  } catch (err) {
    res.status(500).json({ error: String((err && err.message) || err) });
  }
};
