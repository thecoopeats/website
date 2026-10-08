// Unlock Social Poster / Spot Check when opened from the owner menu
// (admin.thecoopeats.com): the page sends the owner's POS sign-in token, we ask the
// POS database whether that login is the owner, and only then hand back the tool's
// passphrase (which the page stores like a typed one). Opened any other way, the
// tools still ask for their passphrase.
//
// POST { tool: "social" | "spotcheck", token: "<Supabase access token>" } -> { key }

// The POS's public Supabase address and key (the same ones the order page uses).
const SUPABASE_URL = process.env.POS_SUPABASE_URL || "https://vcxyzzafryywbckxnjvm.supabase.co";
const SUPABASE_KEY = process.env.POS_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_M7cqdqEyEN9n5tzZHeH9gQ_2oOnl39B";

const KEYS = {
  social: () => process.env.SOCIAL_PASSPHRASE,
  spotcheck: () => process.env.SPOTCHECK_PASSPHRASE,
};

async function isOwner(token) {
  const r = await fetch(SUPABASE_URL + "/rest/v1/rpc/is_owner", {
    method: "POST",
    headers: { apikey: SUPABASE_KEY, Authorization: "Bearer " + token, "Content-Type": "application/json" },
    body: "{}",
  });
  if (!r.ok) return false; // expired or invalid sign-in
  return (await r.json()) === true;
}

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") {
    res.status(405).json({ error: "POST only" });
    return;
  }
  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch (e) {
      body = {};
    }
  }
  const tool = body && body.tool;
  const token = body && body.token;
  if (!KEYS[tool] || typeof token !== "string" || token.length < 20) {
    res.status(400).json({ error: "Bad request" });
    return;
  }
  const key = KEYS[tool]();
  if (!key) {
    res.status(500).json({ error: "Server not configured (passphrase)." });
    return;
  }
  try {
    if (!(await isOwner(token))) {
      res.status(401).json({ error: "Not signed in as the owner. Open this from admin.thecoopeats.com again." });
      return;
    }
  } catch (e) {
    res.status(502).json({ error: "Couldn't reach the POS to check your sign-in." });
    return;
  }
  res.status(200).json({ key });
};
