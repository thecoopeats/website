// Create, list, and cancel social posts (Facebook + Instagram) for the
// media library in api/social-media.js. A post created with no
// scheduledFor (or one in the past) publishes immediately; otherwise it's
// queued in the social:queue sorted set for api/social-cron.js to pick up.
//
// GET                 -> list all posts, newest first
// POST                -> create a post: { mediaId, caption, captionInstagram?,
//                         targets: ["facebook","instagram"], scheduledFor?: epochMs }
// DELETE ?id=<postId>  -> cancel a still-scheduled post

const { publishPost } = require("../lib/metaGraph");

const REDIS_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const PASSPHRASE = process.env.SOCIAL_PASSPHRASE;
const MEDIA_KEY = "social:media";
const POSTS_KEY = "social:posts";
const QUEUE_KEY = "social:queue";

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
  return "p_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 10);
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
      const flat = (await redis(["HGETALL", POSTS_KEY])) || [];
      const items = [];
      for (let i = 0; i < flat.length; i += 2) {
        try { items.push(JSON.parse(flat[i + 1])); } catch (e) { /* skip corrupt row */ }
      }
      items.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
      res.status(200).json({ posts: items });
      return;
    }

    if (req.method === "POST") {
      const body = await readBody(req);
      const mediaId = String(body.mediaId || "").trim();
      const targets = Array.isArray(body.targets) ? body.targets.filter((t) => t === "facebook" || t === "instagram") : [];
      if (!mediaId) { res.status(400).json({ error: "Missing mediaId" }); return; }
      if (!targets.length) { res.status(400).json({ error: "Pick at least one platform" }); return; }

      const mediaRaw = await redis(["HGET", MEDIA_KEY, mediaId]);
      if (!mediaRaw) { res.status(404).json({ error: "That media item no longer exists" }); return; }
      const media = JSON.parse(mediaRaw);

      const now = Date.now();
      const scheduledFor = body.scheduledFor ? Number(body.scheduledFor) : null;
      const isFuture = scheduledFor && scheduledFor > now + 5000;

      const id = freshId();
      let post = {
        id,
        mediaId,
        mediaUrl: media.url,
        kind: media.kind,
        caption: String(body.caption || ""),
        captionInstagram: body.captionInstagram ? String(body.captionInstagram) : null,
        targets,
        status: isFuture ? "scheduled" : "posting",
        scheduledFor: isFuture ? scheduledFor : null,
        createdAt: now,
        updatedAt: now,
        postedAt: null,
        results: null,
        error: null,
      };

      if (isFuture) {
        await redis(["HSET", POSTS_KEY, id, JSON.stringify(post)]);
        await redis(["ZADD", QUEUE_KEY, scheduledFor, id]);
        res.status(200).json({ post });
        return;
      }

      const { results, status } = await publishPost(post);
      post = Object.assign(post, { status, results, postedAt: Date.now(), updatedAt: Date.now() });
      await redis(["HSET", POSTS_KEY, id, JSON.stringify(post)]);
      res.status(200).json({ post });
      return;
    }

    if (req.method === "DELETE") {
      const id = String((req.query && req.query.id) || "").trim();
      if (!id) { res.status(400).json({ error: "Missing id" }); return; }
      const raw = await redis(["HGET", POSTS_KEY, id]);
      if (!raw) { res.status(404).json({ error: "Not found" }); return; }
      const post = JSON.parse(raw);
      // A still-scheduled post must come off the queue first so the cron
      // can't publish it after its history entry is gone.
      if (post.status === "scheduled") {
        await redis(["ZREM", QUEUE_KEY, id]);
      }
      await redis(["HDEL", POSTS_KEY, id]);
      res.status(200).json({ ok: true });
      return;
    }

    res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    res.status(500).json({ error: String((err && err.message) || err) });
  }
};
