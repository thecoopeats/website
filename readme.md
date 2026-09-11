# The Coop — Design System

**The Coop** is a food truck serving hand-battered fried chicken sandwiches and nuggies, with six truckmade dipping sauces. Instagram/Twitter/Facebook: **@thecoopeats** · **www.thecoopeats.com**

The brand's own summary, from the brief: *"we use red, black, and white… we are playful but mess around with our food quality."* That tension is the whole system — cartoon bubble letters and a nugget in sunglasses on the outside, precise ingredient lists and real prices on the inside.

## Sources used

Everything here was derived from four user-supplied files. **No codebase, Figma file, or website source was provided** — there is no live product code to check this against.

| File | What it gave us |
|---|---|
| `uploads/Logo.png` → `assets/logo-coop.png` | The wordmark: red bubble letters with a heavy black keyline |
| `uploads/Menu.jpg` → `assets/menu-original.jpg` | Full menu, prices, ingredient copy, sauce list + sauce colors, type hierarchy |
| `uploads/IMG_2386.jpg` → `assets/photo-truck.jpg` | The truck: red body, black lower panel, white knockout wordmark |
| `uploads/nugsnotdrugsOUTLINE.png` → `assets/nugs-not-drugs.png` | The mascot lockup — a nugget in a fedora and shades, line art |
| 5 food photos → `assets/food-*.jpg` | The Nashville, The Buf-Mac-Wich, The Cluckin', Clucked Fries, sauced Nuggies |

**Ordering and merch live off-site — by design.** The Coop runs no cart and no checkout of its own:

| Destination | URL | Handles |
|---|---|---|
| TouchBistro Dine | `https://order.tbdine.com/pickup/30439/menu` | all pickup ordering |
| Creator Spring | `https://the-coop-8.creator-spring.com/` | all merch |
| Google Calendar | `0r49o8cj65ab5l9lj063idkjf8@group.calendar.google.com` | the public truck schedule — embedded on Find Us, never re-typed by hand |

**Rule for every surface you build: never design a cart, item configurator, or checkout.** The menu is a *display* of the food. The single action is **ORDER ONLINE** — a red primary button opening TouchBistro in a new tab. Merch buttons open Creator Spring the same way. Both platforms are vendor-templated and outside brand control, so always mark the handoff: an outbound arrow (↗) on the label, plus one plain line near the main CTA — *"Pickup ordering is handled on TouchBistro — you'll leave this site."* Never imply the order completes on The Coop's own site.

## Content fundamentals

**Two registers, never mixed inside one line.**

1. **Poster voice** — everything that acts as signage. ALL CAPS, short, punchy, no punctuation at the end.
   *"ENTREES" · "DIPPED" · "ORDER AHEAD" · "NUGS NOT DRUGS" · "SOLD OUT"*
2. **Ingredient voice** — everything that describes food. **All lowercase**, comma-separated run-on lists, ingredient-first, zero adjectives-for-adjectives'-sake. This is copied straight off the printed board and it is the single most distinctive copy rule in the brand.
   *"fried chicken sandwich with nashville hot seasoning, bacon, coleslaw, pickles, and comeback sauce"*
   *"eight bite-sized pieces of boneless chicken breast, freshly-battered, fried and tossed in your sauce of choice"*

**Item naming.** Every entree is "The ___": The Original, The Classic, The Cluckin', The Hot Honey, The Nashville, The Buf-Mac-Wich. Sides are plain nouns: Waffle Fries, Mac N Cheese, Hashbrown. Puns are welcome in names ("Buf-Mac-Wich", "Clucked Fries") and nowhere else.

**Person.** "We" for the truck, "you"/"your" for the guest — *"tossed in your sauce of choice"*, *"get any chicken item dipped in one of our truckmade sauces"*. Never "The Coop offers…".

**Prices.** Whole dollars with no currency noise on the board (`THE CLASSIC 13`). Catering estimates round to whole dollars too — no cents anywhere in the brand.

**Emoji.** The printed menu uses 🔥 for heat and platform glyphs for socials. In digital surfaces, use the `HeatMeter` component instead of the emoji, and real social icons instead of glyph fonts. No other emoji, ever — no 🍗, no 🎉.

**Casing.** Poster voice = uppercase (set with `text-transform`, write labels naturally in source). Ingredient voice = lowercase, including the first letter. UI microcopy (hints, errors) = sentence case: *"We'll shout it out."* / *"Need 10 digits"*.

**Vibe.** Confident, fast, a little smart-mouthed; never corporate, never precious about the food's "journey". Jokes go on merch, mascot art and hero headlines. Jokes never go in allergen info, catering forms, error messages or tooltips.

## Visual foundations

**Color.** Three colors do everything: `--coop-red #C8252B`, `--coop-black #0A0A0A`, `--coop-white #FFFFFF`. Neutrals are warm-shifted greys (`--gray-50` … `--gray-800`) so white surfaces read like paper, not like a SaaS dashboard. The **six sauce colors** (green, chartreuse, yellow, orange, orange-red, red) are signage-only: they appear as colored type or fills **on black**, exactly as on the printed DIPPED strip, and are never used as text on white or as UI status colors. Max two background colors per layout — white plus one of black/red.

**Type.** Three roles. `--font-poster` (Luckiest Guy) for all caps signage: section headings, item names, button labels, badges. `--font-display` (Bowlby One) for bubble-letter hype type on merch and big statements — red fill with a 4px black stroke, mimicking the wordmark; it never typesets the logo itself. `--font-body` (Quicksand, 500/700) for ingredient copy and UI. `--font-mono` (Roboto Mono) for tickets and receipts only. Scale runs 11 → 88px; poster type is set tight (line-height 0.95–1.05) and body loose (1.45).

**The keyline is the brand.** Nearly every shape carries a hard black outline — 2px (`--stroke-1`) on small controls, 3px (`--stroke-2`) as the default, 5px (`--stroke-3`) on structural rules such as the header's bottom edge. This comes straight from the wordmark and mascot, both of which are line-art on a flat fill.

**Shadows.** Hard offset, **zero blur**: `--shadow-sticker` `4px 4px 0 black`, `--shadow-sticker-lg` `7px 7px 0`. Soft blurred shadows are off-brand and only exist as `--shadow-lift` for overlays sitting on photography. There are no inner shadows.

**Corners.** Bubbly: 6 / 12 / 20 / 32 / pill. Nothing is a sharp rectangle except the black menu-board panel and full-bleed photography.

**Backgrounds.** Flat color, always. No gradients as decoration — the only permitted gradient is the black **protection gradient** over hero photography so white type keeps contrast. No repeating patterns, no textures, no noise. The red dashed rule (`DashRule`) is the one decorative divider, used in pairs to bracket a highlighted block (as DIPPED is on the printed menu), not between every section.

**Imagery.** Two kinds, both real and unfiltered.

*Food:* shot inches from the sandwich, in the truck, in whatever light is there — sauce dripping down the bun, mac & cheese mid-pour off a spoon, a tray held in someone's hand with the service window and the grass behind it. Warm amber-and-red tones, shallow depth of field, visible steam and grease. Backgrounds are honest: foil wrappers, clamshell containers, the stainless counter, the allergy notice taped to the window. Never a styled studio plate, never a cool grade, never a top-down flat-lay on marble.

*Place:* daylight photos of the truck — green grass, red steel, natural sun.

Photography goes full-bleed edge-to-edge (hero, gallery band) or fills the top of a card corner-to-corner with a 3px black keyline under it. It is never a small rounded thumbnail floating inside padding.

**Transparency & blur.** Almost none. Scrims over photos are flat black at 45–78% opacity; the modal scrim is `rgba(10,10,10,.6)`. No frosted glass, no backdrop blur anywhere.

**Hover.** Sticker elements nudge up-left 1px and brighten ~6%; cards with `hoverLift` grow the shadow from 4px to 7px. Text links get a 3px red underline. No color inversion on hover.

**Press.** Everything with a sticker shadow translates `+2px, +2px` and its shadow shrinks to 2px — the button physically presses into the page. No scale-down, no ripple.

**Focus.** A 3px red halo (`rgba(200,37,43,.35)`) outside the black keyline. Never remove it.

**Motion.** Fast and springy. `--dur-fast` 110ms for press/hover, `--dur-med` 200ms for toggles and tabs, `--dur-slow` 380ms for modals. `--ease-pop` (a slight overshoot) for anything that should feel bouncy; `--ease-standard` for everything else. No parallax, no scroll-jacking, no long fades.

**Layout.** Max content width 1120px, 24px page gutters, 64px between sections. The header and the black DIPPED band run full-bleed; content inside them is centered to the max width. Sticky elements: the site header only.

**Cards.** White (or black/red), 3px black keyline, 20px radius, 24px padding, optional hard sticker shadow. No borderless "elevation-only" cards.

## Iconography

There is **no icon set in the supplied materials** — the printed menu uses only 🔥 emoji and stock social glyphs, and no SVG or icon-font assets were provided.

- **Substitution (flagged):** UI icons come from **Lucide** via CDN (`https://unpkg.com/lucide@0.446.0`), at 2px stroke, which matches the brand's outline-first look. Nothing has been drawn by hand except the flame in `HeatMeter`, which is Lucide's `flame` shape filled with the heat colors.
- **Heat marks:** never the 🔥 emoji in digital surfaces — use `HeatMeter level={1|2|3}`.
- **Social icons:** use the platforms' own official marks; none were supplied here, so the UI kit prints "@thecoopeats" as text instead of drawing them.
- **Emoji:** not used in product UI.
- If you have the truck's real icon assets, drop them in `assets/` and replace the Lucide references.

## Fonts

Loaded from the Google Fonts CDN in `tokens/fonts.css`. These were matched to the printed menu and wordmark, and **approved by the brand owner** — they are the system's real fonts, not placeholders.

| Role | Substitute | Matching |
|---|---|---|
| Poster caps | **Luckiest Guy** | menu headings and item names |
| Bubble display | **Bowlby One** | the COOP wordmark's letterforms |
| Body | **Quicksand** | the menu's rounded description type |
| Mono | **Roboto Mono** | tickets/receipts (no printed reference) |

## Index

**Root**
- `styles.css` — the single entry point consumers link (imports only)
- `readme.md` (this file) · `SKILL.md` · `thumbnail.html`

**`tokens/`** — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `effects.css`, `motion.css`

**`assets/`** — `logo-coop.png`, `nugs-not-drugs.png`, `photo-truck.jpg`, `menu-original.jpg`

**`guidelines/`** — 19 specimen cards feeding the Design System tab (Colors, Type, Spacing, Brand)

**Components** (each with `.jsx`, `.d.ts`, `.prompt.md`)
- `components/core/` — **Button**, **IconButton**, **Card**, **Badge**, **Logo**
- `components/menu/` — **MenuSection**, **MenuItem**, **PriceTag**, **HeatMeter**, **SauceChip**, **DashRule**
- `components/forms/` — **Input**, **Select**, **Checkbox**, **Radio**, **Switch**, **Stepper**
- `components/navigation/` — **NavBar**, **Tabs**
- `components/feedback/` — **Dialog**, **Toast**, **Tooltip**

**UI kits**
- `ui_kits/menu_board/` — print-faithful digital menu board
- `ui_kits/website/` — thecoopeats.com: home, menu, the live Google Calendar schedule, and the catering cost estimator

### Intentional additions

No source defined a component inventory, so the set above is a standard primitive set sized to a food-truck ordering experience. Four are brand-specific rather than generic: **SauceChip** (the six DIPPED sauces are a fixed brand asset), **HeatMeter** (replaces the printed 🔥), **DashRule** (the menu's signature separator), and **PriceTag** (the poster-font price treatment).
