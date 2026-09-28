// The social-poster's media library: photos/videos already uploaded to
// Vercel Blob (via api/social-upload-token.js), ready to attach to a post.
//
// GET    -> list all media, newest first
// DELETE ?id=<mediaId> -> remove the Blob file and its library entry

const { del } = require("@vercel/blob");

const REDIS_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const PASSPHRASE = process.env.SOCIAL_PASSPHRASE;
const MEDIA_KEY = "social:media";

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

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");

  if (!REDIS_URL || !REDIS_TOKEN || !PASSPHRASE) {
    res.status(500).json({ error: "Server not configured (storage/passphrase). See api/social-upload-token.js setup." });
    return;
  }
  const key = req.headers["x-social-key"];
  if (!key || key !== PASSPHRASE) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    if (req.method === "GET") {
      const flat = (await redis(["HGETALL", MEDIA_KEY])) || [];
      const items = [];
      for (let i = 0; i < flat.length; i += 2) {
        try { items.push(JSON.parse(flat[i + 1])); } catch (e) { /* skip corrupt row */ }
      }
      items.sort((a, b) => (b.uploadedAt || 0) - (a.uploadedAt || 0));
      res.status(200).json({ media: items });
      return;
    }

    if (req.method === "DELETE") {
      const id = String((req.query && req.query.id) || "").trim();
      if (!id) { res.status(400).json({ error: "Missing id" }); return; }
      const raw = await redis(["HGET", MEDIA_KEY, id]);
      if (raw) {
        let record = null;
        try { record = JSON.parse(raw); } catch (e) { /* ignore */ }
        if (record && record.url) {
          try { await del(record.url); } catch (e) { /* blob may already be gone */ }
        }
      }
      await redis(["HDEL", MEDIA_KEY, id]);
      res.status(200).json({ ok: true });
      return;
    }

    res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    res.status(500).json({ error: String((err && err.message) || err) });
  }
};
