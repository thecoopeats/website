// Serverless API for Spot Check (the vending-event tracker at /spot-check).
// Storage: Redis over the Upstash-compatible REST API (no SDK dependency —
// plain fetch). Works with either the plain Upstash names or the
// KV_REST_API_* names Vercel's own Marketplace integration provisions.
// Auth: a single shared passphrase, checked server-side against SPOTCHECK_PASSPHRASE.
//
// Required Vercel project env vars (either naming pair works):
//   KV_REST_API_URL / KV_REST_API_TOKEN
//   or UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN
//   SPOTCHECK_PASSPHRASE

const REDIS_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const PASSPHRASE = process.env.SPOTCHECK_PASSPHRASE;
const HASH_KEY = "spotcheck:events";

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

function freshId() {
  return "e_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 10);
}

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");

  if (!REDIS_URL || !REDIS_TOKEN || !PASSPHRASE) {
    res.status(500).json({
      error: "Server not configured. Set KV_REST_API_URL, KV_REST_API_TOKEN (or the UPSTASH_REDIS_REST_* equivalents), and SPOTCHECK_PASSPHRASE in the Vercel project's environment variables, then redeploy.",
    });
    return;
  }

  const key = req.headers["x-spotcheck-key"];
  if (!key || key !== PASSPHRASE) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    if (req.method === "GET") {
      const flat = (await redis(["HGETALL", HASH_KEY])) || [];
      const events = [];
      for (let i = 0; i < flat.length; i += 2) {
        try { events.push(JSON.parse(flat[i + 1])); } catch (e) { /* skip corrupt row */ }
      }
      res.status(200).json({ events });
      return;
    }

    if (req.method === "POST") {
      const body = await readBody(req);
      const id = freshId();
      const doc = Object.assign({}, body, { id });
      await redis(["HSET", HASH_KEY, id, JSON.stringify(doc)]);
      res.status(200).json({ event: doc });
      return;
    }

    if (req.method === "PUT") {
      const id = req.query && req.query.id;
      if (!id) { res.status(400).json({ error: "Missing id" }); return; }
      const existingRaw = await redis(["HGET", HASH_KEY, id]);
      if (!existingRaw) { res.status(404).json({ error: "Not found" }); return; }
      const existing = JSON.parse(existingRaw);
      const body = await readBody(req);
      const doc = Object.assign({}, existing, body, { id });
      await redis(["HSET", HASH_KEY, id, JSON.stringify(doc)]);
      res.status(200).json({ event: doc });
      return;
    }

    if (req.method === "DELETE") {
      const id = req.query && req.query.id;
      if (!id) { res.status(400).json({ error: "Missing id" }); return; }
      await redis(["HDEL", HASH_KEY, id]);
      res.status(200).json({ ok: true });
      return;
    }

    res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    res.status(500).json({ error: String((err && err.message) || err) });
  }
};
