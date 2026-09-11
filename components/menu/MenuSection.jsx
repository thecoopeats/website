import React from 'react';

export function MenuSection({ title, tone = 'paper', note, columns = 1, children, style, ...rest }) {
  const dark = tone === 'board';
  return (
    <section {...rest} style={{ color: dark ? 'var(--text-on-black)' : 'var(--text-body)', ...style }}>
      <h2 style={{
        margin: '0 0 var(--space-2)', fontFamily: 'var(--font-poster)',
        fontSize: 'var(--text-2xl)', letterSpacing: 'var(--tracking-poster)',
        textTransform: 'uppercase', lineHeight: 1,
        color: dark ? 'var(--coop-white)' : 'var(--coop-red)'
      }}>{title}</h2>
      {note && <p style={{
        margin: '0 0 var(--space-3)', fontFamily: 'var(--font-body)', fontWeight: 700,
        fontSize: 'var(--text-xs)', color: 'var(--coop-red)', lineHeight: 'var(--leading-snug)'
      }}>{note}</p>}
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${columns},minmax(0,1fr))`, columnGap: 'var(--space-6)' }}>
        {children}
      </div>
    </section>
  );
}
