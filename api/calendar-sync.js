// Syncs a Spot Check event to The Coop's real public Google Calendar — the
// same one embedded on thecoopeats.com's "Find the truck" page
// (ui_kits/website/FindUs.jsx). Called from the front end whenever an
// event is saved with status "Attending" (upsert) or stops being
// "Attending" after having been synced before (remove).
//
// The read-only API key FindUs.jsx uses can only fetch events, not create
// them — writing requires a Google Cloud service account with the
// calendar shared to it (Settings > Share with specific people > Make
// changes to events).
//
// Required Vercel project env vars:
//   GOOGLE_SERVICE_ACCOUNT_EMAIL
//   GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY   (PEM; store with literal \n for
//                                         newlines — this code un-escapes them)

const crypto = require("crypto");

const PASSPHRASE = process.env.SPOTCHECK_PASSPHRASE;
const SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const SERVICE_ACCOUNT_KEY = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;

// Must match ui_kits/website/FindUs.jsx's CAL_ID exactly (that constant is
// URL-encoded there; this is the plain form).
const CAL_ID = "0r49o8cj65ab5l9lj063idkjf8@group.calendar.google.com";

function base64url(buf) {
  return buf.toString("base64").replace(/=+$/, "").replace(/\+/g, "-").replace(/\//g, "_");
}

// Tolerates the common ways a private key gets mangled in transit through a
// dashboard textarea: wrapped in quotes, the whole service-account JSON
// pasted instead of just the private_key field, \r\n line endings, or extra
// surrounding whitespace.
function resolvePrivateKey() {
  let raw = (SERVICE_ACCOUNT_KEY || "").trim();
  if ((raw.startsWith('"') && raw.endsWith('"')) || (raw.startsWith("'") && raw.endsWith("'"))) {
    raw = raw.slice(1, -1);
  }
  if (raw.startsWith("{")) {
    try {
      const parsed = JSON.parse(raw);
      if (parsed.private_key) raw = parsed.private_key;
    } catch (e) { /* not valid JSON -- fall through and let the format check below catch it */ }
  }
  raw = raw.replace(/\\n/g, "\n").replace(/\r\n/g, "\n").trim();
  if (!raw.includes("BEGIN") || !raw.includes("PRIVATE KEY")) {
    throw new Error(
      "GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY doesn't look like a PEM key (no BEGIN/PRIVATE KEY markers found). " +
      "Paste just the private_key value from the service account's JSON file, including the -----BEGIN/END----- lines."
    );
  }
  return raw;
}

async function getAccessToken() {
  const key = resolvePrivateKey();
  const now = Math.floor(Date.now() / 1000);
  const header = base64url(Buffer.from(JSON.stringify({ alg: "RS256", typ: "JWT" })));
  const claims = base64url(Buffer.from(JSON.stringify({
    iss: SERVICE_ACCOUNT_EMAIL,
    scope: "https://www.googleapis.com/auth/calendar",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  })));
  const unsigned = header + "." + claims;
  let signature;
  try {
    const signer = crypto.createSign("RSA-SHA256");
    signer.update(unsigned);
    signer.end();
    signature = base64url(signer.sign(key));
  } catch (err) {
    throw new Error(
      "Couldn't sign with GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY (" + (err && err.message) + "). " +
      "This usually means the pasted key got corrupted in transit -- re-copy the exact private_key value " +
      "from the service account's JSON file (open it in a plain text editor, not a viewer that might reformat it)."
    );
  }
  const jwt = unsigned + "." + signature;

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: "grant_type=" + encodeURIComponent("urn:ietf:params:oauth:grant-type:jwt-bearer") + "&assertion=" + jwt,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error_description || data.error || ("Google auth HTTP " + res.status));
  return data.access_token;
}

function addDays(iso, n) {
  const d = new Date(iso + "T00:00:00");
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
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

  if (!PASSPHRASE) {
    res.status(500).json({ error: "Server not configured (passphrase). See api/events.js setup." });
    return;
  }
  if (!SERVICE_ACCOUNT_EMAIL || !SERVICE_ACCOUNT_KEY) {
    res.status(500).json({
      error: "Set GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY in the Vercel project's environment variables, then redeploy. Also share the truck's Google Calendar with that service account's email (Settings and sharing > Share with specific people > Make changes to events).",
    });
    return;
  }
  const key = req.headers["x-spotcheck-key"];
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
    const token = await getAccessToken();
    const base = "https://www.googleapis.com/calendar/v3/calendars/" + encodeURIComponent(CAL_ID) + "/events";

    if (body.action === "remove") {
      if (!body.gcalEventId) { res.status(400).json({ error: "Missing gcalEventId" }); return; }
      const delRes = await fetch(base + "/" + encodeURIComponent(body.gcalEventId), {
        method: "DELETE",
        headers: { Authorization: "Bearer " + token },
      });
      if (!delRes.ok && delRes.status !== 404 && delRes.status !== 410) {
        const errBody = await delRes.json().catch(() => ({}));
        throw new Error((errBody.error && errBody.error.message) || ("Google Calendar HTTP " + delRes.status));
      }
      res.status(200).json({ ok: true });
      return;
    }

    // action === "upsert"
    if (!body.name || !body.dateStart) {
      res.status(400).json({ error: "Missing name or dateStart" });
      return;
    }
    const startDate = body.dateStart;
    const endDate = body.dateEnd || body.dateStart;
    const calBody = {
      summary: body.name,
      location: body.location || undefined,
      description: [body.hours ? "Hours: " + body.hours : null, "Synced from Spot Check."].filter(Boolean).join("\n"),
      start: { date: startDate },
      end: { date: addDays(endDate, 1) }, // Calendar's all-day end date is exclusive
    };

    let gcalEventId = body.gcalEventId || null;
    let calRes;
    if (gcalEventId) {
      calRes = await fetch(base + "/" + encodeURIComponent(gcalEventId), {
        method: "PATCH",
        headers: { Authorization: "Bearer " + token, "Content-Type": "application/json" },
        body: JSON.stringify(calBody),
      });
      if (calRes.status === 404 || calRes.status === 410) {
        gcalEventId = null; // the calendar-side event is gone; create a fresh one below
      }
    }
    if (!gcalEventId) {
      calRes = await fetch(base, {
        method: "POST",
        headers: { Authorization: "Bearer " + token, "Content-Type": "application/json" },
        body: JSON.stringify(calBody),
      });
    }
    if (!calRes.ok) {
      const errBody = await calRes.json().catch(() => ({}));
      throw new Error((errBody.error && errBody.error.message) || ("Google Calendar HTTP " + calRes.status));
    }
    const calData = await calRes.json();
    res.status(200).json({ gcalEventId: calData.id, htmlLink: calData.htmlLink });
  } catch (err) {
    res.status(500).json({ error: String((err && err.message) || err) });
  }
};
