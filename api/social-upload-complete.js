// Reassembles chunks uploaded via api/social-upload-chunk.js into the
// final file, stores it as one Blob object, and cleans up the temporary
// chunk blobs. See that file's header comment for why chunking exists.
//
// POST body (JSON): { chunkUrls: [url, url, ...] (in order), filename, contentType }

const { put, del } = require("@vercel/blob");

const PASSPHRASE = process.env.SOCIAL_PASSPHRASE;

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

  try {
    const body = await readBody(req);
    const chunkUrls = Array.isArray(body.chunkUrls) ? body.chunkUrls : [];
    const filename = String(body.filename || "upload").trim();
    const contentType = String(body.contentType || "application/octet-stream").trim();
    if (!chunkUrls.length) { res.status(400).json({ error: "Missing chunkUrls" }); return; }

    for (const url of chunkUrls) {
      if (typeof url !== "string" || !url.startsWith("https://")) {
        res.status(400).json({ error: "Invalid chunk URL" });
        return;
      }
    }
    // Fetched in parallel (order preserved by Promise.all matching input
    // order) rather than one at a time -- a large video can be 100+
    // chunks, and this function has a limited wall-clock budget.
    const parts = await Promise.all(chunkUrls.map(async (url) => {
      const r = await fetch(url);
      if (!r.ok) throw new Error("Couldn't fetch chunk (HTTP " + r.status + ")");
      return Buffer.from(await r.arrayBuffer());
    }));
    const full = Buffer.concat(parts);

    const blob = await put(filename, full, {
      access: "public",
      addRandomSuffix: true,
      contentType,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    // Best-effort cleanup — a leftover temp chunk isn't worth failing the
    // whole upload over at this point.
    Promise.all(chunkUrls.map((url) => del(url).catch(() => {}))).catch(() => {});

    res.status(200).json({ url: blob.url, pathname: blob.pathname, contentType: blob.contentType || contentType, size: full.length });
  } catch (err) {
    res.status(400).json({ error: String((err && err.message) || err) });
  }
};
