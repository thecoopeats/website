# Social Poster — setup

Upload a photo/video, write a caption, post to Facebook + Instagram immediately or on a schedule — from `/social` on this site. This doc is the one-time setup; day-to-day use just needs the page and the passphrase.

## How it works

| Piece | What it does |
|---|---|
| `social/index.html` | The admin page (passphrase-gated, like `/spot-check`) |
| `api/social-upload-direct.js` | Stores a small file (photos, under ~4MB) — the browser POSTs the raw bytes straight to this endpoint |
| `api/social-upload-chunk.js` + `api/social-upload-complete.js` | For anything larger (mainly video): the browser splits the file into ~4MB pieces, uploads each one via `social-upload-chunk`, then `social-upload-complete` fetches and reassembles them into the final file |
| `api/social-media.js` | Lists/registers/deletes uploaded media — the browser registers a file right after uploading it |
| `api/social-posts.js` | Creates a post — publishes immediately, or queues it if scheduled |
| `api/social-cron.js` | Publishes due scheduled posts; needs to be pinged periodically (see below) |
| `lib/metaGraph.js` | The actual Facebook/Instagram Graph API calls |

Both platforms publish from a public URL (Vercel Blob), not a raw upload — that's just how Meta's API works.

**Note on the upload architecture:** the original design used `@vercel/blob/client`'s direct-to-Blob browser upload (`upload()`/`handleUpload()`), which is Vercel's documented approach for exactly this use case. It turned out to be unreliable in production on iOS (Safari, Chrome, and Brave — all WebKit-based there) in three different ways across three different fix attempts: the server-to-server `onUploadCompleted` callback never arrived at all (worked around by having the browser register uploads itself instead), then uploads hung indefinitely mid-transfer, then — after pinning client and server to the same `@vercel/blob` version and disabling multipart — failed instantly with Safari's generic "Load failed" error, for files of any size. Rather than keep chasing that path, uploads now go through this site's own server entirely: a plain POST for small files, or a client-side-chunked POST-per-piece plus server-side reassembly for large ones. Slower for very large files than a true direct-to-Blob multipart upload would be, but everything here is a same-origin request with no dependency on `@vercel/blob/client`'s browser behavior at all, and it's held up in testing where the original approach didn't.

## 1. Create a Vercel Blob store

1. In the Vercel dashboard, open this project → **Storage** → **Create Database** → **Blob**.
2. Access level: **Public** (Instagram/Facebook need to be able to fetch the file).
3. This automatically adds `BLOB_READ_WRITE_TOKEN` to the project's environment variables — nothing else to do here.

## 2. Set up Meta (Facebook + Instagram) access

Facebook and Instagram are set up as **two separate products** in the Meta app — they use different APIs, different hosts, and different token types. Don't skip either half.

### 2a. Facebook Page (classic Graph API)

1. **Create a Meta developer app**: go to [developers.facebook.com/apps](https://developers.facebook.com/apps) → Create App → type **Business**.
2. On the app's Dashboard, click **"Add use cases"** and add **"Manage everything on your Page"**. Click into it and follow its setup checklist.
3. Generate a token via the [Graph API Explorer](https://developers.facebook.com/tools/explorer/): select your app, "User or Page" → **User Token**, add permissions `pages_show_list`, `pages_read_engagement`, `pages_manage_posts` → **Generate Access Token** → log in and approve, making sure The Coop's Page is checked.
4. Exchange it for a **long-lived user token**:
   ```
   GET https://graph.facebook.com/v21.0/oauth/access_token
     ?grant_type=fb_exchange_token
     &client_id=<APP_ID>
     &client_secret=<APP_SECRET>
     &fb_exchange_token=<SHORT_LIVED_USER_TOKEN>
   ```
5. Get the **Page access token** (inherits the long-lived-ness of the user token as long as you stay an admin of the Page):
   ```
   GET https://graph.facebook.com/v21.0/me/accounts?access_token=<LONG_LIVED_USER_TOKEN>
   ```
   Find The Coop's Page in the response — its `access_token` field is `FB_PAGE_ACCESS_TOKEN`, its `id` is `FB_PAGE_ID`.

### 2b. Instagram (Instagram API with Instagram Login)

Meta's current console sets new apps up with a **different, newer Instagram product** than the old "linked-to-a-Facebook-Page" approach — it authenticates directly against Instagram, not through the Page token above. It uses its own host (`graph.instagram.com`), its own permission names (`instagram_business_*`), and its own token type ("Instagram User access token," not a Page token).

1. On the app's Dashboard, click **"Add use cases"** and add **"Manage messaging & content on Instagram."**
2. Click into it. Under step 1, click **"Go to permissions and features"** and make sure these are all enabled: `instagram_business_basic`, `instagram_business_content_publish` (the required list on the main checklist doesn't include the publish permission by default — add it here).
3. Under step 2 ("Generate access tokens"), click **"Add account"** and log into The Coop's Instagram account when prompted. This produces an **Instagram User access token** — copy it.
4. This token is **short-lived (1 hour)**. Exchange it for a long-lived one (Meta's docs on the exact endpoint were unreachable while writing this doc — if the call below 404s, search Meta's current docs for "Instagram API long-lived access tokens" and use whatever endpoint they show instead):
   ```
   GET https://graph.instagram.com/access_token
     ?grant_type=ig_exchange_token
     &client_secret=<APP_SECRET>
     &access_token=<SHORT_LIVED_TOKEN>
   ```
   This is `IG_ACCESS_TOKEN`. It should last ~60 days; there's a `refresh_access_token` endpoint with a similar shape for renewing it before it expires — worth a calendar reminder every ~50 days, or automating later if this gets used a lot.
5. Get the Instagram account's numeric ID:
   ```
   GET https://graph.instagram.com/v21.0/me?fields=user_id,username&access_token=<IG_ACCESS_TOKEN>
   ```
   The `user_id` in the response is `IG_USER_ID`.

### 2c. Development mode

While the app is in Development mode (not submitted for App Review / not Live), it should work fine for The Coop's own Page and Instagram account — no review needed for a single-business internal tool like this. If posting ever fails with a permissions/role error, check the app's **Roles** tab and make sure the relevant Facebook and Instagram accounts are added there.

## 3. Set the environment variables

In Vercel → this project → Settings → Environment Variables:

| Variable | Value |
|---|---|
| `SOCIAL_PASSPHRASE` | Any password you'll type to unlock `/social` (can be the same as `SPOTCHECK_PASSPHRASE` or different) |
| `FB_PAGE_ID` | From step 2a.5 |
| `FB_PAGE_ACCESS_TOKEN` | From step 2a.5 |
| `IG_USER_ID` | From step 2b.5 |
| `IG_ACCESS_TOKEN` | From step 2b.4 |
| `CRON_SECRET` | Any random string — Vercel's own Cron sends it automatically once set |
| `META_GRAPH_VERSION` | Optional, defaults to `v21.0` — bump if Meta retires that version ([changelog](https://developers.facebook.com/docs/graph-api/changelog)) |

`KV_REST_API_URL` / `KV_REST_API_TOKEN` (or the `UPSTASH_REDIS_REST_*` equivalents) should already be set from Spot Check — this feature reuses that same Redis store, just under different keys (`social:*` instead of `spotcheck:*`).

Redeploy after saving env vars.

## 4. Fine-grained scheduling (recommended)

`vercel.json` includes a daily cron hitting `/api/social-cron` as a safety net, but the Hobby plan only allows once-a-day cron — not useful for "post at 2pm today." For real scheduling precision, add a free external pinger:

1. Sign up at [cron-job.org](https://cron-job.org) (or any similar free cron service).
2. Create a job hitting `https://<your-domain>/api/social-cron` every 5–15 minutes.
3. Add a custom header: `Authorization: Bearer <your CRON_SECRET value>`.
   - If your chosen service can't set custom headers, use `https://<your-domain>/api/social-cron?secret=<CRON_SECRET>` instead.

Scheduled posts only go out as precisely as this pinger's interval — a 15-minute interval means a post scheduled for 2:00pm might go out up to 15 minutes late.

## 5. Test it

1. Visit `/social`, unlock with `SOCIAL_PASSPHRASE`.
2. Upload a small photo — confirm it shows up in the media library within a few seconds.
3. Select it, write a caption, uncheck Instagram, leave Facebook checked, hit **Post now** — confirm it shows up on the Page.
4. Repeat with just Instagram checked.
5. Try scheduling a post 5–10 minutes out and confirm the external pinger picks it up (check the "Scheduled & posted" table).

## Known limitations (MVP)

- One photo or video per post — no carousels (multi-image posts) yet.
- Instagram videos publish as Reels (feed video posts without Reels framing were deprecated by Meta).
- No Instagram/Facebook Stories support.
- The Facebook Page access token (step 2a) is long-lived but not eternal, and the Instagram token (step 2b) needs refreshing roughly every 60 days — if posting starts failing with an auth error, regenerate/refresh the relevant token.
