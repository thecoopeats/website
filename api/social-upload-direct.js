// Alternative to api/social-upload-token.js's direct-to-Blob client upload,
// used for photos small enough to fit this function's ~4.5MB body limit
// (see social/index.html's uploadOne — it picks this path for images under
// ~4MB, and falls back to the direct-to-Blob client flow otherwise, mainly
// for video). Added because @vercel/blob/client's browser upload() was
// unreliable on iOS (Safari/Chrome/Brave, all WebKit-based there) —
// hanging mid-transfer, then failing immediately with "Load failed" after
// version/config changes — while a plain POST through our own server has
// none of that cross-domain, streaming-upload complexity.
//
// POST body: the raw image bytes (Content-Type set to the image's MIME type)
// Query param: ?filename=<original filename>
//
// Required Vercel project env vars (beyond api/social-upload-token.js's):
//   (none new — reuses SOCIAL_PASSPHRASE and BLOB_READ_WRITE_TOKEN)

const { put } = require("@vercel/blob");

const PASSPHRASE = process.env.SOCIAL_PASSPHRASE;
const MAX_BYTES = 4 * 1024 * 1024;

function readRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let total = 0;
    req.on("data", (chunk) => {
      total += chunk.length;
      if (total > MAX_BYTES + 1024 * 1024) {
        // A little over MAX_BYTES tolerated in case of small framing
        // overhead, but this endpoint is for small photos only — anything
        // much bigger should have gone through the direct-to-Blob path.
        reject(new Error("File too large for this endpoint"));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");

  if (!PASSPHRASE || !process.env.BLOB_READ_WRITE_TOKEN) {
    res.status(500).json({ error: "Server not configured (passphrase/Blob). See api/social-upload-token.js setup." });
    return;
  }
  const key = req.headers["x-social-key"];
  if (!key || key !== PASSPHRASE) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const contentType = req.headers["content-type"] || "application/octet-stream";
  const filename = String((req.query && req.query.filename) || "upload").trim();

  try {
    const buffer = await readRawBody(req);
    if (!buffer.length) { res.status(400).json({ error: "Empty body" }); return; }

    const blob = await put(filename, buffer, {
      access: "public",
      addRandomSuffix: true,
      contentType,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    res.status(200).json({
      url: blob.url,
      pathname: blob.pathname,
      contentType: blob.contentType || contentType,
      size: buffer.length,
    });
  } catch (err) {
    res.status(400).json({ error: String((err && err.message) || err) });
  }
};
