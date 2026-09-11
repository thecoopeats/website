# Menu Board UI kit

A faithful digital recreation of The Coop's printed truck menu (`assets/menu-original.jpg`).

- **Source of truth:** the supplied menu photo. Item names, prices, descriptions and the DIPPED sauce list are transcribed verbatim, including the printed lowercase ingredient style.
- **Layout:** two columns — Entrees on the left, wordmark + DIPPED + Sides/Drinks on the right, bracketed by red dashed rules.
- **Components used:** `MenuSection`, `MenuItem`, `SauceChip`, `DashRule`, `Logo`, `HeatMeter` (via MenuItem's `heat`), `PriceTag` (via MenuItem).
- **Known deviation:** the printed board uses 🔥 emoji for spicy items; the digital board uses `HeatMeter`. The hand-drawn Comeback Sauce blob is approximated with a CSS organic-radius outline.
