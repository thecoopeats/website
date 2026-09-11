import React from 'react';

const tones = {
  red: { background: 'var(--coop-red)', color: '#fff' },
  black: { background: 'var(--coop-black)', color: '#fff' },
  white: { background: '#fff', color: 'var(--coop-black)' },
  maple: { background: 'var(--sauce-spicy-maple)', color: 'var(--coop-black)' },
  buffalo: { background: 'var(--sauce-buffalo)', color: 'var(--coop-black)' }
};

export function Badge({ tone = 'red', size = 'md', outlined = true, children, style, ...rest }) {
  const dims = size === 'sm'
    ? { fontSize: 'var(--text-3xs)', padding: '3px 8px', borderWidth: 'var(--stroke-1)' }
    : { fontSize: 'var(--text-2xs)', padding: '5px 12px', borderWidth: 'var(--stroke-2)' };
  return (
    <span {...rest} style={{
      ...tones[tone], ...dims, display: 'inline-flex', width: 'fit-content', justifySelf: 'start', alignItems: 'center', gap: '4px',
      fontFamily: 'var(--font-poster)', letterSpacing: 'var(--tracking-caps)', lineHeight: 1.1,
      textTransform: 'uppercase', borderRadius: 'var(--radius-pill)',
      borderStyle: 'solid', borderColor: outlined ? 'var(--coop-black)' : 'transparent',
      ...style
    }}>{children}</span>
  );
}
