// Issues client upload tokens so the browser can upload photos/videos
// directly to Vercel Blob (bypassing this function's ~4.5MB body limit,
// which matters for video). Also receives Vercel's "upload completed"
// webhook callback and registers the finished file in the media library.
//
// Both the token request AND the completion webhook hit this same URL —
// @vercel/blob's handleUpload() tells them apart by payload shape. That
// means we can't gate the whole handler behind the passphrase header like
// the other api/*.js files: the webhook call comes from Vercel, not the
// browser, and won't carry it. Instead the passphrase travels inside
// clientPayload and is checked in onBeforeGenerateToken.
//
// Required Vercel project env vars (beyond the ones api/events.js documents):
//   BLOB_READ_WRITE_TOKEN   (added automatically when you create a Blob store)
//   SOCIAL_PASSPHRASE

const { handleUpload } = require("@vercel/blob/client");

const REDIS_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const PASSPHRASE = process.env.SOCIAL_PASSPHRASE;
const MEDIA_KEY = "social:media";

const ALLOWED_TYPES = [
  "image/jpeg", "image/png", "image/webp", "image/heic", "image/heif",
  "video/mp4", "video/quicktime", "video/webm",
];

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
  return "m_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 10);
}

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");

  if (!REDIS_URL || !REDIS_TOKEN || !PASSPHRASE || !process.env.BLOB_READ_WRITE_TOKEN) {
    res.status(500).json({
      error: "Server not configured. Set KV_REST_API_URL/TOKEN, SOCIAL_PASSPHRASE, and BLOB_READ_WRITE_TOKEN (from a Vercel Blob store) in the project's environment variables, then redeploy.",
    });
    return;
  }
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const body = await readBody(req);
    const jsonResponse = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        let payload = {};
        try { payload = JSON.parse(clientPayload || "{}"); } catch (e) { /* treated as unauthorized below */ }
        if (!payload.key || payload.key !== PASSPHRASE) {
          throw new Error("Unauthorized");
        }
        return {
          allowedContentTypes: ALLOWED_TYPES,
          addRandomSuffix: true,
          maximumSizeInBytes: 500 * 1024 * 1024,
          // Hardcoded rather than left to auto-detect from Vercel's system env
          // vars: on this project that was resolving to a host that never
          // actually received the onUploadCompleted webhook (likely an
          // apex/www or *.vercel.app mismatch), so the media library never
          // got its Redis entry written. Update this if the production
          // domain ever changes.
          callbackUrl: "https://www.thecoopeats.com/api/social-upload-token",
          tokenPayload: JSON.stringify({ filename: payload.filename || pathname }),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        let filename = blob.pathname;
        try {
          const parsed = JSON.parse(tokenPayload || "{}");
          if (parsed.filename) filename = parsed.filename;
        } catch (e) { /* keep pathname fallback */ }

        const kind = (blob.contentType || "").startsWith("video/") ? "video" : "image";
        const id = freshId();
        const record = {
          id,
          url: blob.url,
          pathname: blob.pathname,
          contentType: blob.contentType,
          kind,
          filename,
          size: blob.size || null,
          uploadedAt: Date.now(),
        };
        await redis(["HSET", MEDIA_KEY, id, JSON.stringify(record)]);
      },
    });

    res.status(200).json(jsonResponse);
  } catch (err) {
    // The webhook retries 5 times waiting for a 200, so a real config/auth
    // error should surface as non-200 rather than being swallowed.
    res.status(400).json({ error: String((err && err.message) || err) });
  }
};
