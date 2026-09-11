import React from 'react';

export function Stepper({ value = 1, min = 0, max = 99, onChange, size = 'md', ...rest }) {
  const dim = size === 'sm' ? 32 : 40;
  const btn = (glyph, next, disabled) => (
    <button type="button" disabled={disabled} onClick={() => onChange && onChange(next)}
      style={{
        width: dim, height: dim, border: 'none', background: 'transparent',
        fontFamily: 'var(--font-poster)', fontSize: 'var(--text-md)', lineHeight: 1,
        cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.3 : 1, color: 'var(--coop-black)'
      }}>{glyph}</button>
  );
  return (
    <div {...rest} style={{
      display: 'inline-flex', alignItems: 'center',
      border: 'var(--stroke-2) solid var(--coop-black)', borderRadius: 'var(--radius-pill)',
      background: 'var(--coop-white)', overflow: 'hidden'
    }}>
      {btn('–', Math.max(min, value - 1), value <= min)}
      <span style={{
        minWidth: 28, textAlign: 'center', fontFamily: 'var(--font-poster)',
        fontSize: 'var(--text-sm)', lineHeight: 1
      }}>{value}</span>
      {btn('+', Math.min(max, value + 1), value >= max)}
    </div>
  );
}
