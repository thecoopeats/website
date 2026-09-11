# Moving The Coop design system into Claude Code

Everything here is plain files — no build step, no package manager. Download the project, unzip it, `cd` in, run `claude`.

## What you're getting

| Path | What it is |
|---|---|
| `readme.md` | The brand bible — voice, color, type, layout, component inventory, decisions and their reasoning. **Read this first.** |
| `SKILL.md` | Frontmatter that lets this folder be installed as a Claude Code skill (see below). |
| `styles.css` + `tokens/` | All design tokens as CSS custom properties. The single source of truth for color/type/space/radius/motion. |
| `components/` | 23 React components as `.jsx`, each with a `.d.ts` (prop contract), a `.prompt.md` (usage rules), and a `.card.html` (live example). |
| `ui_kits/website/` | The 4-page marketing site — `App.jsx`, `Screens.jsx`, `MenuScreen.jsx`, `FindUs.jsx`, `Catering.jsx`. This is where the logic lives. |
| `ui_kits/menu_board/` | The digital truck menu board. |
| `guidelines/` | Specimen cards (color, type, spacing, mascot, logo lockups). |
| `assets/` | Logos, mascot, food and truck photography. |
| `_ds_bundle.js` | Auto-generated compiled bundle of all components. **Do not hand-edit** — edit the `.jsx` sources. |

## Two ways to use it

**1. As a working repo** (you want to edit the logic — most likely what you want)

```bash
unzip the-coop-design-system.zip && cd the-coop-design-system
git init && git add -A && git commit -m "Import design system"
claude
```

Then open the site: `open ui_kits/website/index.html`. It runs directly in the browser — React + Babel are loaded from a CDN and JSX is transpiled in the page, so editing a `.jsx` and hitting refresh is the whole loop.

Tell Claude Code: *"Read readme.md and ui_kits/website/README.md, then help me edit the catering estimator logic in ui_kits/website/Catering.jsx."*

**2. As an installed skill** (you want to build *new* things on-brand, in another codebase)

```bash
cp -r the-coop-design-system ~/.claude/skills/the-coop-design
```

`SKILL.md` is already written. In any project, invoke `the-coop-design` and Claude Code will read the brand rules and build to them.

## Where the real logic is

- **`ui_kits/website/Catering.jsx`** — the live estimator. Pricing constants are at the top of the file (per-head rates, `MIN_SPEND = 850`, travel, staffing). Change the numbers there, not in the JSX.
- **`ui_kits/website/FindUs.jsx`** — embeds the truck's real Google Calendar. The calendar ID and the schedule fallback constants are at the top.
- **`ui_kits/website/App.jsx`** — routing (a `useState` string, not a router) and the page data for the homepage.
- **`ui_kits/website/MenuScreen.jsx`** — menu items and prices as a data array.
- **`components/core/*.jsx`** — primitives. Change one and every screen changes.

External handoffs are intentional and hardcoded: ordering → TouchBistro, merch → Creator Spring.

## Rules worth carrying over

1. Never hardcode a hex value. Every color is a token in `tokens/colors.css`.
2. Poster type (Luckiest Guy) is ALL CAPS signage only. Ingredient copy is **all lowercase**. `readme.md` explains why.
3. Components take a `assetBase` prop so they work from any folder depth — keep that pattern if you move files.
4. `_ds_bundle.js` is generated. If a component change doesn't show up, you edited the bundle instead of the source.

## Porting to a real framework

The `.jsx` files are standard React function components with no imports — they read from `window.TheCoopDesignSystem_a9fb85`. To move into a Next/Vite app: add `import React from 'react'` and `export`s, swap the `window` destructure for real imports, and drop `styles.css` into your global stylesheet. Inline styles already use CSS variables, so they port as-is.
