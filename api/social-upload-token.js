// Issues client upload tokens so the browser can upload photos/videos
// directly to Vercel Blob (bypassing this function's ~4.5MB body limit,
// which matters for video).
//
// @vercel/blob's handleUpload() also supports a server-side
// onUploadCompleted webhook for registering the finished file, but on this
// project that server-to-server callback never actually arrived in
// production (silently — no error, no retry visible in logs), even after
// hardcoding callbackUrl. Rather than keep fighting Vercel's webhook
// delivery, registration now happens via the browser calling
// POST /api/social-media right after upload() resolves (see
// social/index.html) — it already has everything it needs at that point.
// onUploadCompleted is left as a no-op below since handleUpload requires it.
//
// Required Vercel project env vars (beyond the ones api/events.js documents):
//   BLOB_READ_WRITE_TOKEN   (added automatically when you create a Blob store)
//   SOCIAL_PASSPHRASE

const { handleUpload } = require("@vercel/blob/client");

const PASSPHRASE = process.env.SOCIAL_PASSPHRASE;

const ALLOWED_TYPES = [
  "image/jpeg", "image/png", "image/webp", "image/heic", "image/heif",
  "video/mp4", "video/quicktime", "video/webm",
];

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

  if (!PASSPHRASE || !process.env.BLOB_READ_WRITE_TOKEN) {
    res.status(500).json({
      error: "Server not configured. Set SOCIAL_PASSPHRASE and BLOB_READ_WRITE_TOKEN (from a Vercel Blob store) in the project's environment variables, then redeploy.",
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
        };
      },
      onUploadCompleted: async () => {},
    });

    res.status(200).json(jsonResponse);
  } catch (err) {
    res.status(400).json({ error: String((err && err.message) || err) });
  }
};
