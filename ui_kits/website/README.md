# Website UI kit — thecoopeats.com

The Coop's public site. **There is no first-party ordering flow** — the site's job is to make people hungry, then hand them to TouchBistro.

**Screens**
1. `Screens.jsx` — `Hero` (full-bleed Nashville shot + protection gradient), `CateringBanner` (black split band → catering), `Favorites` (photo cards), `Gallery` (4-up full-bleed food band), `MascotBanner` (→ merch), `FindUs` (truck photo, schedule, catering form), `Footer`.
2. `MenuScreen.jsx` — the tabbed menu (Entrees, Sides) as a read-only display, ending in the one ORDER ONLINE handoff. **No drinks section** — drinks were dropped from the menu.
3. `FindUs.jsx` — the truck's **real Google Calendar**, embedded. List and Month views, plus an **ADD TO YOUR CALENDAR** button that subscribes the visitor to the live calendar so it keeps updating. Schedule data is no longer hard-coded — it comes from the calendar. No catering form lives here anymore.

   Calendar: `0r49o8cj65ab5l9lj063idkjf8@group.calendar.google.com`. It must stay **public** ("Make available to public" in Google Calendar's sharing settings) or visitors see an error instead of the schedule.
4. `Catering.jsx` — the **cost estimator**: guests (20–400), hours of service (2–6), travel zone, plus checkbox pick-lists for sandwiches and sides. A sticky black summary card prices it live: food (average of the chosen entrees + sides at 60% of headcount, × guests), on-site cooking at $175/hr, travel by zone, an $850 event minimum, per-head figure and 25% deposit. Assumptions live at the top of the file as named constants — change `STAFF_PER_HOUR`, `SIDE_PORTION`, `MIN_SPEND`, `DEPOSIT` and `ZONES` to match real pricing.
5. `App.jsx` — four routes: home, menu, find us, catering.

**External destinations**
- Ordering → `https://order.tbdine.com/pickup/30439/menu` (TouchBistro Dine), new tab, from every ORDER ONLINE button.
- Merch → `https://the-coop-8.creator-spring.com/` (Creator Spring), from SHOP THE MERCH and the footer.

Every outbound label carries a ↗, and the menu page states the handoff in plain words. Do not add a cart.

**Where the form components still apply:** the catering estimator — the only first-party form on the site.

**Placeholder data to replace:** every pricing constant in `Catering.jsx` (`STAFF_PER_HOUR`, `SIDE_PORTION`, `MIN_SPEND`, `DEPOSIT`, `ZONES`) is an invented stand-in. The schedule is real.

**Source caveat:** no website code or Figma file was provided, and both external platforms are JS-rendered with no readable markup. Structure and copy are extrapolated from the printed menu, food photos, truck wrap and mascot art.
