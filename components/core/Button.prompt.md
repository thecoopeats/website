One-line: the sticker button — hard black keyline, offset black shadow, presses 2px on click; use `primary` (red) for the single main action per screen.

```jsx
<Button variant="primary" size="lg" onClick={order}>ORDER NOW</Button>
<Button variant="dark" size="md">SEE THE MENU</Button>
<Button variant="ghost" size="sm">Cancel</Button>
```

Variants: `primary` red, `dark` black, `light` white-on-black-outline (use over red or photos), `ghost` (no keyline, no shadow — secondary/destructive-adjacent text actions only). Sizes sm/md/lg. `block` for full-width mobile CTAs. Label copy is ALL CAPS for primary/dark, sentence case is acceptable on ghost.
