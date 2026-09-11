import React from 'react';

export function Toast({ tone = 'dark', title, message, onDismiss, style, ...rest }) {
  const bg = { dark: 'var(--coop-black)', red: 'var(--coop-red)', white: 'var(--coop-white)' }[tone];
  const fg = tone === 'white' ? 'var(--coop-black)' : 'var(--coop-white)';
  return (
    <div {...rest} role="status" style={{
      display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)',
      background: bg, color: fg, border: 'var(--outline-hard)',
      borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sticker)',
      padding: 'var(--space-3) var(--space-4)', maxWidth: 380, ...style
    }}>
      <div style={{ display: 'grid', gap: '2px', flex: 1 }}>
        {title && <strong style={{
          fontFamily: 'var(--font-poster)', fontSize: 'var(--text-xs)',
          letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase', fontWeight: 400
        }}>{title}</strong>}
        {message && <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-2xs)', lineHeight: 'var(--leading-body)' }}>{message}</span>}
      </div>
      {onDismiss && <button onClick={onDismiss} aria-label="Dismiss" style={{
        border: 'none', background: 'transparent', color: fg, cursor: 'pointer',
        fontFamily: 'var(--font-poster)', fontSize: 'var(--text-sm)', lineHeight: 1, padding: 0
      }}>×</button>}
    </div>
  );
}
