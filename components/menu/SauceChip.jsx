import React from 'react';

export const SAUCES = [
  { id: 'honey-bbq', label: 'Honey BBQ', color: 'var(--sauce-honey-bbq)' },
  { id: 'garlic-parmesan', label: 'Garlic Parmesan', color: 'var(--sauce-garlic-parm)' },
  { id: 'spicy-maple', label: 'Spicy Maple', color: 'var(--sauce-spicy-maple)' },
  { id: 'sweet-thai-chili', label: 'Sweet Thai Chili', color: 'var(--sauce-sweet-thai)' },
  { id: 'buffalo', label: 'Buffalo', color: 'var(--sauce-buffalo)' },
  { id: 'nashville-hot', label: 'Nashville Hot', color: 'var(--sauce-nashville)' }
];

export function SauceChip({ sauce, label, color, selected, onSelect, style, ...rest }) {
  const meta = SAUCES.find(s => s.id === sauce);
  const text = label || (meta && meta.label) || sauce;
  const c = color || (meta && meta.color) || 'var(--sauce-spicy-maple)';
  const interactive = typeof onSelect === 'function';
  return (
    <button {...rest} type="button" disabled={!interactive}
      onClick={interactive ? () => onSelect(sauce) : undefined}
      style={{
        fontFamily: 'var(--font-poster)', fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-caps)',
        textTransform: 'uppercase', lineHeight: 1, padding: '9px 14px',
        borderRadius: 'var(--radius-pill)', cursor: interactive ? 'pointer' : 'default',
        border: 'var(--stroke-2) solid ' + (selected ? c : 'var(--coop-black)'),
        background: selected ? c : 'var(--coop-black)',
        color: selected ? 'var(--coop-black)' : c,
        transition: 'background var(--dur-fast) linear, color var(--dur-fast) linear, transform var(--dur-fast) var(--ease-pop)',
        transform: selected ? 'scale(1.03)' : 'none', ...style
      }}>{text}</button>
  );
}
