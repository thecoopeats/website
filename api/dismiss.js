// Manage Spot Check's dismissed-leads list. A dismissed lead or confirmed
// event is filtered out of every future /api/discover response (see
// leadDismissKey/eventDismissKey there) regardless of caching or re-search
// — dismissing is a standing decision, not just a one-time hide.
//
// Stored as a Redis hash: field = the dismiss key (e.g. "lead:<url>" or
// "tm:<eventId>"), value = {label, dismissedAt} for the "manage dismissed"
// list in the UI.

const REDIS_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const PASSPHRASE = process.env.SPOTCHECK_PASSPHRASE;

const DISMISSED_KEY = "spotcheck:dismissed";

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
      const flat = (await redis(["HGETALL", DISMISSED_KEY])) || [];
      const items = [];
      for (let i = 0; i < flat.length; i += 2) {
        let meta = {};
        try { meta = JSON.parse(flat[i + 1]); } catch (e) { /* skip corrupt row */ }
        items.push(Object.assign({ key: flat[i] }, meta));
      }
      items.sort((a, b) => (b.dismissedAt || 0) - (a.dismissedAt || 0));
      res.status(200).json({ dismissed: items });
      return;
    }

    if (req.method === "POST") {
      const body = await readBody(req);
      const dismissKey = String(body.key || "").trim();
      if (!dismissKey) { res.status(400).json({ error: "Missing key" }); return; }
      const label = String(body.label || "").slice(0, 300);
      await redis(["HSET", DISMISSED_KEY, dismissKey, JSON.stringify({ label, dismissedAt: Date.now() })]);
      res.status(200).json({ ok: true });
      return;
    }

    if (req.method === "DELETE") {
      const dismissKey = String((req.query && req.query.key) || "").trim();
      if (!dismissKey) { res.status(400).json({ error: "Missing key" }); return; }
      await redis(["HDEL", DISMISSED_KEY, dismissKey]);
      res.status(200).json({ ok: true });
      return;
    }

    res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    res.status(500).json({ error: String((err && err.message) || err) });
  }
};
