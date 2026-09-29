// Stores one chunk of a large file (video) being uploaded in pieces —
// see api/social-upload-complete.js (reassembles them) and
// social/index.html's uploadViaChunks (the client side).
//
// Added because @vercel/blob/client's direct-to-Blob browser upload was
// unreliable on iOS regardless of file size or config — every attempt
// (pinning versions, disabling multipart, longer timeouts) still hit
// "Load failed" or a mid-transfer stall. This same-origin chunked
// approach is the same technique that fixed small-photo uploads
// (api/social-upload-direct.js), extended to handle files of any size by
// splitting them client-side into pieces this function's body limit can
// actually hold.
//
// POST body: raw chunk bytes
// Query params: uploadId (client-generated, alphanumeric/-/_ only), index

const { put } = require("@vercel/blob");

const PASSPHRASE = process.env.SOCIAL_PASSPHRASE;
const MAX_CHUNK_BYTES = 4 * 1024 * 1024;

function readRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let total = 0;
    req.on("data", (chunk) => {
      total += chunk.length;
      if (total > MAX_CHUNK_BYTES + 1024 * 1024) {
        reject(new Error("Chunk too large"));
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
    res.status(500).json({ error: "Server not configured (passphrase/Blob). See api/social-upload-direct.js setup." });
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

  const uploadId = String((req.query && req.query.uploadId) || "").trim();
  const index = String((req.query && req.query.index) || "").trim();
  if (!uploadId || !/^[a-zA-Z0-9_-]{1,80}$/.test(uploadId) || !/^\d+$/.test(index)) {
    res.status(400).json({ error: "Missing/invalid uploadId or index" });
    return;
  }

  try {
    const buffer = await readRawBody(req);
    if (!buffer.length) { res.status(400).json({ error: "Empty chunk" }); return; }

    const blob = await put("_chunks/" + uploadId + "/" + index.padStart(6, "0"), buffer, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/octet-stream",
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    res.status(200).json({ url: blob.url });
  } catch (err) {
    res.status(400).json({ error: String((err && err.message) || err) });
  }
};
