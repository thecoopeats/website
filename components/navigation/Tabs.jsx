import React from 'react';

export function Tabs({ items = [], value, onChange, tone = 'paper', style, ...rest }) {
  const dark = tone === 'board';
  return (
    <div {...rest} role="tablist" style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', ...style }}>
      {items.map(it => {
        const id = typeof it === 'string' ? it : it.value;
        const label = typeof it === 'string' ? it : it.label;
        const active = id === value;
        return (
          <button key={id} role="tab" aria-selected={active} type="button"
            onClick={() => onChange && onChange(id)}
            style={{
              fontFamily: 'var(--font-poster)', fontSize: 'var(--text-xs)',
              letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase', lineHeight: 1,
              padding: '11px 18px', borderRadius: 'var(--radius-pill)', cursor: 'pointer',
              border: 'var(--stroke-2) solid ' + (dark ? 'var(--coop-white)' : 'var(--coop-black)'),
              background: active ? 'var(--coop-red)' : (dark ? 'transparent' : 'var(--coop-white)'),
              color: active ? 'var(--coop-white)' : (dark ? 'var(--coop-white)' : 'var(--coop-black)'),
              transition: 'background var(--dur-fast) linear, color var(--dur-fast) linear'
            }}>{label}</button>
        );
      })}
    </div>
  );
}
