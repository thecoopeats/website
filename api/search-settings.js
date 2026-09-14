// Read/write the user-editable search settings for Spot Check's lead
// discovery (api/discover.js) — the Tavily query templates and the
// include/exclude keyword lists that filter results. Stored in Redis;
// GET returns the saved settings (or defaults if nothing's saved yet),
// PUT saves new ones, DELETE resets to defaults. Saving or resetting
// also clears the cached leads so the next load re-searches with the
// new settings instead of showing stale results.

const { DEFAULT_SETTINGS, LIMITS, normalizeSettings } = require("../lib/searchDefaults");

const REDIS_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const PASSPHRASE = process.env.SPOTCHECK_PASSPHRASE;

const SETTINGS_KEY = "spotcheck:search-settings";
const LEADS_CACHE_KEY = "spotcheck:leads";

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

function readBody(req) {
  return new Promise((resolve) => {
    if (req.body !== undefined && req.body !== null) {
      if (typeof req.body === "string") {
        try { resolve(JSON.parse(req.body || "{}")); } catch (e) { resolve({}); }
      } else {
        resolve(req.body);
      }
      return;
    }
    let data = "";
    req.on("data", (chunk) => { data += chunk; });
    req.on("end", () => {
      try { resolve(JSON.parse(data || "{}")); } catch (e) { resolve({}); }
    });
    req.on("error", () => resolve({}));
  });
}

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");

  if (!REDIS_URL || !REDIS_TOKEN || !PASSPHRASE) {
    res.status(500).json({ error: "Server not configured (storage/passphrase). See api/events.js setup." });
    return;
  }

  const key = req.headers["x-spotcheck-key"];
  if (!key || key !== PASSPHRASE) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    if (req.method === "GET") {
      const raw = await redis(["GET", SETTINGS_KEY]);
      const settings = raw ? normalizeSettings(JSON.parse(raw)) : null;
      res.status(200).json({ settings, defaults: DEFAULT_SETTINGS, limits: LIMITS });
      return;
    }

    if (req.method === "PUT") {
      const body = await readBody(req);
      const settings = normalizeSettings(body);
      await redis(["SET", SETTINGS_KEY, JSON.stringify(settings)]);
      await redis(["DEL", LEADS_CACHE_KEY]);
      res.status(200).json({ settings });
      return;
    }

    if (req.method === "DELETE") {
      await redis(["DEL", SETTINGS_KEY]);
      await redis(["DEL", LEADS_CACHE_KEY]);
      res.status(200).json({ settings: null, defaults: DEFAULT_SETTINGS });
      return;
    }

    res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    res.status(500).json({ error: String((err && err.message) || err) });
  }
};
