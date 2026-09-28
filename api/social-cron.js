// Publishes any scheduled posts whose time has come. Vercel Hobby-plan
// cron jobs only run once a day, which isn't fine-grained enough for real
// scheduling — so this is meant to be hit every few minutes by an external
// pinger (e.g. a free cron-job.org task) rather than relying solely on
// vercel.json's crons entry, which is wired up as a once-a-day safety net.
//
// Auth: an `Authorization: Bearer <CRON_SECRET>` header. Vercel's own Cron
// sends this automatically for any env var literally named CRON_SECRET
// (see vercel.json's crons entry, which needs no secret embedded in it as
// a result) — point an external pinger's custom-header option at the same
// value. If a pinger can't set headers, a `?secret=` query param works too.
//
// Required Vercel project env var (beyond api/social-posts.js's):
//   CRON_SECRET

const { publishPost } = require("../lib/metaGraph");

const REDIS_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const CRON_SECRET = process.env.CRON_SECRET;
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

function authorized(req) {
  const header = req.headers["authorization"] || "";
  const bearer = header.startsWith("Bearer ") ? header.slice(7) : null;
  const queryKey = req.query && req.query.secret;
  return (bearer && bearer === CRON_SECRET) || (queryKey && queryKey === CRON_SECRET);
}

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");

  if (!REDIS_URL || !REDIS_TOKEN || !CRON_SECRET) {
    res.status(500).json({ error: "Server not configured (storage/CRON_SECRET). See api/social-cron.js setup." });
    return;
  }
  if (!authorized(req)) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const now = Date.now();
    const dueIds = (await redis(["ZRANGEBYSCORE", QUEUE_KEY, 0, now])) || [];

    const processed = [];
    for (const id of dueIds) {
      // Pull it off the queue first so a slow publish can't get double-run
      // by an overlapping invocation.
      const removed = await redis(["ZREM", QUEUE_KEY, id]);
      if (!removed) continue; // another invocation already claimed it

      const raw = await redis(["HGET", POSTS_KEY, id]);
      if (!raw) continue;
      let post = JSON.parse(raw);
      if (post.status !== "scheduled") continue;

      post.status = "posting";
      post.updatedAt = Date.now();
      await redis(["HSET", POSTS_KEY, id, JSON.stringify(post)]);

      const { results, status } = await publishPost(post);
      post = Object.assign(post, { status, results, postedAt: Date.now(), updatedAt: Date.now() });
      await redis(["HSET", POSTS_KEY, id, JSON.stringify(post)]);
      processed.push({ id, status });
    }

    res.status(200).json({ checked: dueIds.length, processed });
  } catch (err) {
    res.status(500).json({ error: String((err && err.message) || err) });
  }
};
