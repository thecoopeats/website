// Shared default search settings for Spot Check's lead discovery
// (api/discover.js and api/search-settings.js both read this). Not under
// /api so Vercel doesn't treat it as its own route.

const DEFAULT_LOCATION = "Danbury, CT";

const DEFAULT_SETTINGS = {
  location: DEFAULT_LOCATION,
  queries: [
    '"vendor application" food truck within {radius} miles of {location}',
    '"call for vendors" food truck festival near {location}',
    '"food truck vendors wanted" OR "seeking food trucks" market fair near {location}',
  ],
  positive: [
    "vendor application", "call for vendors", "vendors wanted", "seeking vendors",
    "seeking food trucks", "food truck vendors", "vendor registration", "vendor spot",
    "vendor fee", "vendor form", "become a vendor", "apply to vend", "food vendor",
    "vending opportunity", "vendor packet", "vendor rules",
  ],
  negative: [
    "best food truck", "top 10 food truck", "top food truck", "food trucks near me",
    "food truck for sale", "food truck menu", "food truck review", "things to do",
    "our menu", "catering menu", "food truck schedule", "where to find",
  ],
  excludeDomains: ["yelp.com", "tripadvisor.com", "pinterest.com", "amazon.com", "ebay.com", "youtube.com"],
};

const LIMITS = { location: 300, queries: 8, positive: 40, negative: 40, excludeDomains: 50 };

function sanitizeList(list, max) {
  if (!Array.isArray(list)) return [];
  return list.map((s) => String(s == null ? "" : s).trim()).filter(Boolean).slice(0, max);
}

function sanitizeLocation(loc) {
  return String(loc == null ? "" : loc).trim().slice(0, LIMITS.location);
}

function normalizeSettings(raw) {
  const src = raw && typeof raw === "object" ? raw : {};
  return {
    location: sanitizeLocation(src.location),
    queries: sanitizeList(src.queries, LIMITS.queries),
    positive: sanitizeList(src.positive, LIMITS.positive),
    negative: sanitizeList(src.negative, LIMITS.negative),
    excludeDomains: sanitizeList(src.excludeDomains, LIMITS.excludeDomains),
  };
}

// A saved settings doc with everything empty means "never configured" —
// treat it the same as no doc at all, so an empty save resets to defaults
// instead of shipping a search that matches nothing.
function effectiveSettings(saved) {
  const s = normalizeSettings(saved);
  const allEmpty = !s.location && !s.queries.length && !s.positive.length && !s.negative.length && !s.excludeDomains.length;
  if (allEmpty) return DEFAULT_SETTINGS;
  return {
    location: s.location || DEFAULT_SETTINGS.location,
    queries: s.queries.length ? s.queries : DEFAULT_SETTINGS.queries,
    positive: s.positive.length ? s.positive : DEFAULT_SETTINGS.positive,
    negative: s.negative,
    excludeDomains: s.excludeDomains,
  };
}

module.exports = { DEFAULT_LOCATION, DEFAULT_SETTINGS, LIMITS, sanitizeList, normalizeSettings, effectiveSettings };
