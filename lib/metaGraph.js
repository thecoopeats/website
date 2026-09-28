// Facebook + Instagram publishing calls. Shared by api/social-posts.js
// (post-now) and api/social-cron.js (scheduled publish). Not under /api so
// Vercel doesn't treat it as its own route.
//
// Facebook and Instagram use two DIFFERENT APIs here, not one shared one —
// Meta's newer "Instagram API with Instagram Login" (what The Coop's app
// was set up with) is a separate product from the classic Facebook-Page
// Graph API: different host, different token type, different auth style.
// See social/SETUP.md for how to obtain each set of credentials.
//
// Required Vercel project env vars:
//   FB_PAGE_ID, FB_PAGE_ACCESS_TOKEN     (classic Facebook Page Graph API)
//   IG_USER_ID, IG_ACCESS_TOKEN          (Instagram API with Instagram Login)
//   META_GRAPH_VERSION                   (optional, defaults below — bump if
//                                         Meta retires the pinned version)

const GRAPH_VERSION = process.env.META_GRAPH_VERSION || "v21.0";
const FB_GRAPH_BASE = "https://graph.facebook.com/" + GRAPH_VERSION;
const IG_GRAPH_BASE = "https://graph.instagram.com/" + GRAPH_VERSION;

const FB_PAGE_ID = process.env.FB_PAGE_ID;
const FB_PAGE_ACCESS_TOKEN = process.env.FB_PAGE_ACCESS_TOKEN;
const IG_USER_ID = process.env.IG_USER_ID;
const IG_ACCESS_TOKEN = process.env.IG_ACCESS_TOKEN;

function isConfigured(target) {
  if (target === "facebook") return !!(FB_PAGE_ID && FB_PAGE_ACCESS_TOKEN);
  if (target === "instagram") return !!(IG_USER_ID && IG_ACCESS_TOKEN);
  return false;
}

function graphError(data, res) {
  const msg = (data.error && data.error.message) || ("Graph API HTTP " + res.status);
  const err = new Error(msg);
  err.graphError = data.error;
  return err;
}

// Classic Facebook Page Graph API: form-encoded body, access_token as a param.
async function fbFetch(path, params, method) {
  method = method || "POST";
  const url = FB_GRAPH_BASE + path;
  let res;
  if (method === "GET") {
    res = await fetch(url + "?" + new URLSearchParams(params).toString());
  } else {
    res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(params).toString(),
    });
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.error) throw graphError(data, res);
  return data;
}

// Instagram API with Instagram Login: JSON body + Bearer auth for writes,
// access_token query param for reads (matches Meta's documented examples).
async function igFetch(path, params, method) {
  method = method || "POST";
  const url = IG_GRAPH_BASE + path;
  let res;
  if (method === "GET") {
    res = await fetch(url + "?" + new URLSearchParams(Object.assign({}, params, { access_token: IG_ACCESS_TOKEN })).toString());
  } else {
    res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + IG_ACCESS_TOKEN,
      },
      body: JSON.stringify(params),
    });
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.error) throw graphError(data, res);
  return data;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function publishToFacebook(mediaUrl, kind, caption) {
  if (!isConfigured("facebook")) {
    return { ok: false, error: "Facebook isn't configured (missing FB_PAGE_ID / FB_PAGE_ACCESS_TOKEN)." };
  }
  try {
    let data;
    if (kind === "video") {
      data = await fbFetch("/" + FB_PAGE_ID + "/videos", {
        file_url: mediaUrl,
        description: caption || "",
        access_token: FB_PAGE_ACCESS_TOKEN,
      });
    } else {
      data = await fbFetch("/" + FB_PAGE_ID + "/photos", {
        url: mediaUrl,
        caption: caption || "",
        access_token: FB_PAGE_ACCESS_TOKEN,
      });
    }
    const objectId = data.post_id || data.id;
    let permalink = null;
    try {
      const p = await fbFetch("/" + encodeURIComponent(objectId), { fields: "permalink_url", access_token: FB_PAGE_ACCESS_TOKEN }, "GET");
      permalink = p.permalink_url || null;
    } catch (e) { /* permalink is a nice-to-have */ }
    return { ok: true, id: data.id, postId: data.post_id || null, permalink };
  } catch (err) {
    return { ok: false, error: String(err.message || err) };
  }
}

async function pollInstagramContainer(creationId, maxWaitMs) {
  maxWaitMs = maxWaitMs || 90000;
  const start = Date.now();
  let delay = 2000;
  while (Date.now() - start < maxWaitMs) {
    const data = await igFetch("/" + encodeURIComponent(creationId), { fields: "status_code" }, "GET");
    if (data.status_code === "FINISHED") return true;
    if (data.status_code === "ERROR" || data.status_code === "EXPIRED") {
      throw new Error("Instagram media container failed processing (" + data.status_code + ").");
    }
    await sleep(delay);
    delay = Math.min(delay * 1.5, 8000);
  }
  throw new Error("Timed out waiting for Instagram to finish processing the media.");
}

async function publishToInstagram(mediaUrl, kind, caption) {
  if (!isConfigured("instagram")) {
    return { ok: false, error: "Instagram isn't configured (missing IG_USER_ID / IG_ACCESS_TOKEN)." };
  }
  try {
    const containerParams = { caption: caption || "" };
    if (kind === "video") {
      containerParams.video_url = mediaUrl;
      containerParams.media_type = "REELS";
    } else {
      containerParams.image_url = mediaUrl;
      containerParams.media_type = "IMAGE";
    }
    const created = await igFetch("/" + IG_USER_ID + "/media", containerParams);
    const creationId = created.id;

    await pollInstagramContainer(creationId);

    const published = await igFetch("/" + IG_USER_ID + "/media_publish", { creation_id: creationId });
    let permalink = null;
    try {
      const p = await igFetch("/" + encodeURIComponent(published.id), { fields: "permalink" }, "GET");
      permalink = p.permalink || null;
    } catch (e) { /* permalink is a nice-to-have */ }
    return { ok: true, id: published.id, permalink };
  } catch (err) {
    return { ok: false, error: String(err.message || err) };
  }
}

// Publishes a post record ({ mediaUrl, kind, caption, captionInstagram, targets })
// to every target it lists, in parallel. Used by both the immediate "post
// now" path and the scheduled-post cron.
async function publishPost(post) {
  const results = {};
  const jobs = [];
  if (post.targets.includes("facebook")) {
    jobs.push(publishToFacebook(post.mediaUrl, post.kind, post.caption).then((r) => { results.facebook = r; }));
  }
  if (post.targets.includes("instagram")) {
    const igCaption = post.captionInstagram || post.caption;
    jobs.push(publishToInstagram(post.mediaUrl, post.kind, igCaption).then((r) => { results.instagram = r; }));
  }
  await Promise.all(jobs);

  const oks = Object.values(results).filter((r) => r.ok).length;
  const status = oks === 0 ? "failed" : oks === Object.keys(results).length ? "posted" : "partial";
  return { results, status };
}

module.exports = { isConfigured, publishToFacebook, publishToInstagram, publishPost };
