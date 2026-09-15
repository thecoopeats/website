// Serverless API for Spot Check's "Leads near Danbury" panel.
//
// Two sources, merged:
//  - Tavily web search for vendor-call pages ("leads") — raw search
//    results, not verified events. The front end lets the user review a
//    lead and, if it looks real, open it pre-filled in the normal "Log an
//    event" form so they still do the actual vetting themselves. Each
//    lead also carries a best-effort dateGuess/possiblyPast flag, parsed
//    from any date mentioned in its title/snippet, since Tavily has no
//    concept of "is this event still upcoming."
//  - "confirmedEvents" — real, dated events, from two sources merged
//    together: the Ticketmaster Discovery API (real lat/lng radius search,
//    optional — skips cleanly if TICKETMASTER_API_KEY isn't set) and a
//    direct scrape of ctfoodtrucks.com/food-truck-festivals/ (plain
//    server-rendered HTML, no API needed). Both are filtered to
//    known-past dates dropped outright — these have real dates, unlike
//    Tavily leads, so there's no reason to just flag a past one.
//
// The queries and include/exclude keyword lists (Tavily side) are
// user-editable via api/search-settings.js (stored in Redis); this file
// falls back to lib/searchDefaults.js when nothing's been saved.
//
// Results are cached in Redis for CACHE_TTL_MS so casual page loads don't
// burn API credits; pass ?refresh=1 to force a fresh search. Saving new
// settings clears this cache (see search-settings.js) so the next load
// reflects the change instead of serving stale results.
//
// Required Vercel project env vars (beyond the ones events.js needs):
//   TAVILY_API_KEY        — from tavily.com, free tier, no card required
//   TICKETMASTER_API_KEY  — optional, from developer.ticketmaster.com, free

const { effectiveSettings } = require("../lib/searchDefaults");

const REDIS_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const PASSPHRASE = process.env.SPOTCHECK_PASSPHRASE;
const TAVILY_API_KEY = process.env.TAVILY_API_KEY;
const TICKETMASTER_API_KEY = process.env.TICKETMASTER_API_KEY;

const CACHE_KEY = "spotcheck:leads";
const SETTINGS_KEY = "spotcheck:search-settings";
const DISMISSED_KEY = "spotcheck:dismissed";
const CACHE_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours

// Dismiss keys — must match the format the front end uses when it posts
// to api/dismiss.js (see spot-check/index.html's dismissKeyFor*).
function leadDismissKey(lead) { return "lead:" + lead.url; }
function eventDismissKey(ev) { return "tm:" + (ev.id || ev.url || (ev.name + "|" + ev.startDate)); }

// Ticketmaster needs real coordinates, not free-text location; Danbury is
// the truck's home base per the distance-from-Danbury field on events too.
const DANBURY_LAT = 41.3948;
const DANBURY_LNG = -73.4540;

// Approximate Connecticut town-center coordinates, for estimating distance
// on a confirmed event when only a town name is known (no live geocoding
// available). Good enough for a rough "~N mi" estimate, not turn-by-turn
// precision -- Ticketmaster venues with real lat/lng use those instead.
const CT_TOWN_COORDS = {
  danbury: [41.3948, -73.4540], hartford: [41.7658, -72.6734],
  glastonbury: [41.7134, -72.6070], "south glastonbury": [41.6737, -72.5820],
  colchester: [41.5751, -72.3298], enfield: [41.9762, -72.5904],
  milford: [41.2223, -73.0565], montville: [41.4573, -72.1546],
  middletown: [41.5623, -72.6506], manchester: [41.7759, -72.5215],
  bloomfield: [41.8362, -72.7284], newtown: [41.4137, -73.3032],
  ridgefield: [41.2815, -73.4979], bethel: [41.3706, -73.4140],
  brookfield: [41.4826, -73.4029], "new milford": [41.5776, -73.4082],
  redding: [41.3168, -73.3843], wilton: [41.1954, -73.4379],
  norwalk: [41.1177, -73.4079], stamford: [41.0534, -73.5387],
  greenwich: [41.0262, -73.6282], bridgeport: [41.1792, -73.1894],
  "new haven": [41.3083, -72.9279], waterbury: [41.5582, -73.0515],
  "new britain": [41.6612, -72.7795], meriden: [41.5382, -72.8070],
  bristol: [41.6718, -72.9493], "west hartford": [41.7620, -72.7420],
  fairfield: [41.1408, -73.2613], norwich: [41.5243, -72.0759],
  "new london": [41.3557, -72.0995], torrington: [41.8007, -73.1212],
  naugatuck: [41.4859, -73.0509], shelton: [41.3165, -73.0931],
  stratford: [41.1845, -73.1332], "east hartford": [41.7854, -72.6120],
  willimantic: [41.7101, -72.2087], windham: [41.7101, -72.2087],
  southington: [41.6001, -72.8781], cheshire: [41.4995, -72.9006],
  wallingford: [41.4573, -72.8231], newington: [41.6979, -72.7237],
  vernon: [41.8437, -72.4759], groton: [41.3501, -72.0787],
  trumbull: [41.2429, -73.2004], ansonia: [41.3437, -73.0781],
  derby: [41.3223, -73.0904], wolcott: [41.6009, -72.9840],
  berlin: [41.6218, -72.7454],
};

function haversineMiles(lat1, lon1, lat2, lon2) {
  const R = 3958.8;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function lookupTownCoords(text) {
  if (!text) return null;
  const lower = text.toLowerCase();
  // Longest name first so "south glastonbury" matches before "glastonbury".
  const names = Object.keys(CT_TOWN_COORDS).sort((a, b) => b.length - a.length);
  for (const name of names) {
    if (lower.includes(name)) return CT_TOWN_COORDS[name];
  }
  return null;
}

// The configured "Leads near {location}" setting is free text (could be a
// single town or a list of several) -- resolve it to one anchor point by
// finding the first known town mentioned, falling back to Danbury (the
// truck's fixed home base, same anchor Ticketmaster's radius search uses).
function resolveAnchorCoords(location) {
  const found = lookupTownCoords(location);
  return found || [DANBURY_LAT, DANBURY_LNG];
}

function estimateDistanceMiles(ev, anchor) {
  if (typeof ev.lat === "number" && typeof ev.lng === "number") {
    return Math.round(haversineMiles(anchor[0], anchor[1], ev.lat, ev.lng));
  }
  const coords = lookupTownCoords([ev.venueName, ev.city, ev.state].filter(Boolean).join(", "));
  if (!coords) return null;
  return Math.round(haversineMiles(anchor[0], anchor[1], coords[0], coords[1]));
}

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

function looksLikeVendorCall(lead, positive, negative) {
  const text = ((lead.title || "") + " " + (lead.snippet || "")).toLowerCase();
  const hasPositive = positive.some((s) => text.includes(s.toLowerCase()));
  const hasNegative = negative.some((s) => text.includes(s.toLowerCase()));
  return hasPositive && !hasNegative;
}

const MONTHS = {
  jan: 0, january: 0, feb: 1, february: 1, mar: 2, march: 2, apr: 3, april: 3,
  may: 4, jun: 5, june: 5, jul: 6, july: 6, aug: 7, august: 7,
  sep: 8, sept: 8, september: 8, oct: 9, october: 9, nov: 10, november: 10,
  dec: 11, december: 11,
};

// Best-effort: find every date mentioned in a snippet of text and return
// the latest one. Deliberately conservative — this is a hint for the UI
// ("this might already be past"), never a reason to silently drop a lead,
// since free-text date parsing is unreliable and a false "past" verdict
// would hide a genuinely good lead.
function guessLatestDate(text) {
  if (!text) return null;
  const now = Date.now();
  const found = [];

  const monthRe = /\b(jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:t(?:ember)?)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\.?\s+(\d{1,2})(?:st|nd|rd|th)?(?:,?\s*(\d{4}))?/gi;
  let m;
  while ((m = monthRe.exec(text))) {
    const month = MONTHS[m[1].toLowerCase()];
    const day = parseInt(m[2], 10);
    if (month === undefined || day < 1 || day > 31) continue;
    let year = m[3] ? parseInt(m[3], 10) : new Date().getFullYear();
    if (!m[3]) {
      // No year mentioned: assume the nearest occurrence that isn't more
      // than ~60 days in the past (listings usually drop the year for
      // "this season").
      const guess = new Date(year, month, day);
      if (guess.getTime() < now - 60 * 86400000) year += 1;
    }
    const d = new Date(year, month, day);
    if (!isNaN(d.getTime())) found.push(d);
  }

  const numRe = /\b(\d{1,2})\/(\d{1,2})\/(\d{2,4})\b/g;
  while ((m = numRe.exec(text))) {
    const month = parseInt(m[1], 10) - 1;
    const day = parseInt(m[2], 10);
    let year = parseInt(m[3], 10);
    if (year < 100) year += 2000;
    if (month < 0 || month > 11 || day < 1 || day > 31) continue;
    const d = new Date(year, month, day);
    if (!isNaN(d.getTime())) found.push(d);
  }

  if (!found.length) return null;
  // Take the latest mention — postings often lead with a "posted on" or
  // application-deadline date before the actual event date.
  return found.reduce((latest, d) => (d > latest ? d : latest));
}

async function tavilySearch(query, opts) {
  opts = opts || {};
  const body = {
    query,
    search_depth: "basic",
    max_results: 8,
    topic: "general",
    country: "united states",
    include_published_date: true,
  };
  if (opts.excludeDomains && opts.excludeDomains.length) body.exclude_domains = opts.excludeDomains;
  if (opts.includeDomains && opts.includeDomains.length) {
    body.include_domains = opts.includeDomains;
    body.include_domains_mode = opts.includeDomainsMode || "boost";
  }
  const res = await fetch("https://api.tavily.com/search", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + TAVILY_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    throw new Error(errBody.detail || errBody.error || ("Tavily HTTP " + res.status));
  }
  const data = await res.json();
  return (data.results || []).map((r) => ({
    title: r.title,
    url: r.url,
    snippet: r.content,
    publishedDate: r.published_date || null,
    favicon: r.favicon || null,
    foundVia: query,
  }));
}

// Craigslist is plain, crawlable HTML (unlike Facebook/NextDoor) and its
// gigs/events sections do carry real local vendor posts, so it gets its
// own hard-scoped call rather than relying on the generic queries above.
function craigslistQuery(settings) {
  return "food truck vendor OR gigs near " + settings.location;
}

async function findLeads(radius, settings) {
  const queries = settings.queries.map((q) =>
    q.split("{radius}").join(String(radius)).split("{location}").join(settings.location)
  );

  const tasks = queries.map((q) => ({
    query: q,
    opts: { excludeDomains: settings.excludeDomains, includeDomains: settings.boostDomains, includeDomainsMode: "boost" },
  }));
  tasks.push({
    query: craigslistQuery(settings),
    opts: { includeDomains: ["craigslist.org"], includeDomainsMode: "filter" },
  });

  const batches = await Promise.all(
    tasks.map((t) =>
      tavilySearch(t.query, t.opts).catch((err) => {
        console.error("Tavily query failed:", t.query, err && err.message);
        return [];
      })
    )
  );
  const seen = new Set();
  const leads = [];
  for (const batch of batches) {
    for (const lead of batch) {
      if (!lead.url || seen.has(lead.url)) continue;
      if (!looksLikeVendorCall(lead, settings.positive, settings.negative)) continue;
      const guessed = guessLatestDate((lead.title || "") + " " + (lead.snippet || ""));
      lead.dateGuess = guessed ? guessed.toISOString().slice(0, 10) : null;
      lead.possiblyPast = !!(guessed && guessed.getTime() < Date.now() - 3 * 86400000);
      seen.add(lead.url);
      leads.push(lead);
    }
  }
  return leads;
}

const TM_EVENT_SIGNALS = [
  "festival", "fair", "food truck", "food fest", "market", "carnival",
  "block party", "street fair", "brewfest", "brew fest", "food & wine",
  "night market", "farmers market",
];

async function findConfirmedEvents(radius) {
  if (!TICKETMASTER_API_KEY) return [];
  const params = new URLSearchParams({
    apikey: TICKETMASTER_API_KEY,
    latlong: DANBURY_LAT + "," + DANBURY_LNG,
    radius: String(radius),
    unit: "miles",
    startDateTime: new Date().toISOString().slice(0, 19) + "Z",
    sort: "date,asc",
    size: "50",
  });
  let res;
  try {
    res = await fetch("https://app.ticketmaster.com/discovery/v2/events.json?" + params.toString());
  } catch (err) {
    console.error("Ticketmaster request failed:", err && err.message);
    return [];
  }
  if (!res.ok) {
    console.error("Ticketmaster search failed:", res.status, await res.text().catch(() => ""));
    return [];
  }
  const data = await res.json().catch(() => ({}));
  const events = (data._embedded && data._embedded.events) || [];
  const out = [];
  for (const ev of events) {
    const name = ev.name || "";
    if (!TM_EVENT_SIGNALS.some((s) => name.toLowerCase().includes(s))) continue;
    const venue = ev._embedded && ev._embedded.venues && ev._embedded.venues[0];
    const loc = venue && venue.location;
    const lat = loc && loc.latitude !== undefined ? parseFloat(loc.latitude) : null;
    const lng = loc && loc.longitude !== undefined ? parseFloat(loc.longitude) : null;
    out.push({
      id: ev.id || null,
      name,
      url: ev.url || null,
      startDate: (ev.dates && ev.dates.start && ev.dates.start.localDate) || null,
      dateEnd: (ev.dates && ev.dates.end && ev.dates.end.localDate) || null,
      dateTBD: !!(ev.dates && ev.dates.start && (ev.dates.start.dateTBD || ev.dates.start.dateTBA)),
      venueName: venue ? venue.name : null,
      city: venue && venue.city ? venue.city.name : null,
      state: venue && venue.state ? venue.state.stateCode : null,
      lat: lat !== null && !isNaN(lat) ? lat : null,
      lng: lng !== null && !isNaN(lng) ? lng : null,
      source: "ticketmaster",
    });
  }
  return out;
}

const CTFT_MONTHS = {
  january: 0, february: 1, march: 2, april: 3, may: 4, june: 5, july: 6,
  august: 7, september: 8, october: 9, november: 10, december: 11,
};

// Same month for both ends, e.g. "August 22, 2026" or "April 25 - 26, 2026" —
// matches every date format actually seen on the page; a cross-month range
// would just fail to parse and get skipped (never guessed).
function parseCtftDateRange(text) {
  const m = text.match(/([A-Za-z]+)\s+(\d{1,2})(?:\s*-\s*(\d{1,2}))?,\s*(\d{4})/);
  if (!m) return null;
  const month = CTFT_MONTHS[m[1].toLowerCase()];
  if (month === undefined) return null;
  const day1 = parseInt(m[2], 10);
  const day2 = m[3] ? parseInt(m[3], 10) : day1;
  const year = parseInt(m[4], 10);
  const start = new Date(year, month, day1);
  const end = new Date(year, month, day2);
  if (isNaN(start.getTime())) return null;
  return { start, end: isNaN(end.getTime()) ? start : end };
}

function toISODate(d) { return d.toISOString().slice(0, 10); }

// Plain server-rendered HTML (confirmed via curl, no JS execution needed),
// parsed with targeted regexes rather than a DOM library to keep this
// dependency-free. Fragile by nature — if the site's markup changes this
// silently returns fewer/zero results rather than throwing, so it degrades
// instead of breaking the rest of the endpoint.
async function findCtFoodTrucksEvents() {
  let html;
  try {
    const res = await fetch("https://ctfoodtrucks.com/food-truck-festivals/");
    if (!res.ok) { console.error("ctfoodtrucks.com fetch failed:", res.status); return []; }
    html = await res.text();
  } catch (err) {
    console.error("ctfoodtrucks.com fetch failed:", err && err.message);
    return [];
  }

  const out = [];
  const chunks = html.split("<h3>").slice(1);
  for (const chunk of chunks) {
    try {
      const nameMatch = chunk.match(/^([^<]+)<\/h3>/);
      if (!nameMatch) continue;
      const name = nameMatch[1].trim();

      const dateMatch = chunk.match(/<\/svg>\s*([A-Za-z]+\s+\d{1,2}(?:\s*-\s*\d{1,2})?,\s*\d{4})\s*<\/span>/);
      const parsed = dateMatch ? parseCtftDateRange(dateMatch[1]) : null;
      if (!parsed) continue; // no confident date -- skip rather than guess

      // Hard filter: this source has real dates, so a past one is dropped
      // outright (unlike Tavily leads, whose guessed dates only get flagged).
      if (parsed.end.getTime() < Date.now() - 86400000) continue;

      const cityMatch = chunk.match(/class="address"><svg[\s\S]*?<\/svg>\s*([^<]+)<\/span>/);
      const linkMatch = chunk.match(/class="event-links"\s+href="([^"]+)"/);

      const startISO = toISODate(parsed.start);
      const endISO = toISODate(parsed.end);
      out.push({
        id: "ctft:" + name,
        name,
        url: linkMatch ? linkMatch[1].trim() : null,
        startDate: startISO,
        dateEnd: endISO !== startISO ? endISO : null,
        dateTBD: false,
        venueName: null,
        city: cityMatch ? cityMatch[1].trim() : null,
        state: "CT",
        source: "ctfoodtrucks",
      });
    } catch (e) {
      console.error("ctfoodtrucks.com entry parse failed:", e && e.message);
    }
  }
  return out.slice(0, 30);
}

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");

  if (!REDIS_URL || !REDIS_TOKEN || !PASSPHRASE) {
    res.status(500).json({ error: "Server not configured (storage/passphrase). See api/events.js setup." });
    return;
  }
  if (!TAVILY_API_KEY) {
    res.status(500).json({ error: "Set TAVILY_API_KEY in the Vercel project's environment variables (free key from tavily.com), then redeploy." });
    return;
  }

  const key = req.headers["x-spotcheck-key"];
  if (!key || key !== PASSPHRASE) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const radius = Math.max(1, Math.min(300, parseInt(req.query.radius, 10) || 50));
  const forceRefresh = req.query.refresh === "1";

  try {
    const [settingsRaw, dismissedFlat] = await Promise.all([
      redis(["GET", SETTINGS_KEY]),
      redis(["HGETALL", DISMISSED_KEY]),
    ]);
    const settings = effectiveSettings(settingsRaw ? JSON.parse(settingsRaw) : null);
    const dismissedSet = new Set();
    for (let i = 0; i < (dismissedFlat || []).length; i += 2) dismissedSet.add(dismissedFlat[i]);

    let leads, confirmedEvents, fetchedAt, cachedFlag;

    if (!forceRefresh) {
      const cachedRaw = await redis(["GET", CACHE_KEY]);
      if (cachedRaw) {
        const cached = JSON.parse(cachedRaw);
        const age = Date.now() - cached.fetchedAt;
        if (cached.radius === radius && cached.location === settings.location && age < CACHE_TTL_MS) {
          leads = cached.leads;
          confirmedEvents = cached.confirmedEvents || [];
          fetchedAt = cached.fetchedAt;
          cachedFlag = true;
        }
      }
    }

    if (leads === undefined) {
      const result = await Promise.all([
        findLeads(radius, settings),
        findConfirmedEvents(radius).catch((err) => {
          console.error("Ticketmaster lookup failed:", err && err.message);
          return [];
        }),
        findCtFoodTrucksEvents().catch((err) => {
          console.error("ctfoodtrucks.com lookup failed:", err && err.message);
          return [];
        }),
      ]);
      leads = result[0];
      confirmedEvents = result[1].concat(result[2]);
      fetchedAt = Date.now();
      cachedFlag = false;
      const payload = { radius, location: settings.location, fetchedAt, leads, confirmedEvents };
      await redis(["SET", CACHE_KEY, JSON.stringify(payload)]);
    }

    // Distance from the configured "Leads near {location}" anchor, using
    // real venue coordinates when Ticketmaster gave us one, else a town-name
    // lookup — computed fresh every response (cheap, no need to cache it).
    const anchor = resolveAnchorCoords(settings.location);
    confirmedEvents = confirmedEvents.map((ev) => {
      ev.distanceMiles = estimateDistanceMiles(ev, anchor);
      return ev;
    });

    // A confirmed event has a real date, so re-check "is this already past"
    // even against a cached result — a cache can be up to CACHE_TTL_MS old,
    // long enough for something to have quietly happened in the meantime.
    confirmedEvents = confirmedEvents.filter((ev) => {
      const d = ev.dateEnd || ev.startDate;
      if (!d) return true; // no known date (e.g. dateTBD) -- don't hide it
      return new Date(d + "T23:59:59").getTime() >= Date.now();
    });

    // Dismissed items are filtered out here rather than at cache-write time,
    // so a dismiss takes effect immediately even against a cached result,
    // and a future re-search never needs to "know" about dismissals itself.
    const filteredLeads = leads.filter((l) => !dismissedSet.has(leadDismissKey(l)));
    const filteredEvents = confirmedEvents.filter((e) => !dismissedSet.has(eventDismissKey(e)));

    res.status(200).json({
      leads: filteredLeads,
      confirmedEvents: filteredEvents,
      fetchedAt,
      radius,
      location: settings.location,
      cached: cachedFlag,
    });
  } catch (err) {
    res.status(500).json({ error: String((err && err.message) || err) });
  }
};
