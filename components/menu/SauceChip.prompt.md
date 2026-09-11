One-line: the DIPPED sauce selector — each sauce has a fixed color that only ever appears on black.

```jsx
{SAUCES.map(s => (
  <SauceChip key={s.id} sauce={s.id} selected={pick === s.id} onSelect={setPick} />
))}
```

The six sauces and their colors are fixed brand assets; do not invent new ones or recolor existing ones. Sauce colors are never used as text on white.
