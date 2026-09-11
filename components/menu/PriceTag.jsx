import React from 'react';

export function PriceTag({ value, size = 'md', tone = 'ink', currency = '$', style, ...rest }) {
  const sizes = { sm: 'var(--text-md)', md: 'var(--text-xl)', lg: 'var(--text-2xl)' };
  const colors = { ink: 'var(--coop-black)', red: 'var(--coop-red)', white: 'var(--coop-white)' };
  return (
    <span {...rest} style={{
      fontFamily: 'var(--font-poster)', fontSize: sizes[size], color: colors[tone],
      letterSpacing: 'var(--tracking-poster)', lineHeight: 1, whiteSpace: 'nowrap', ...style
    }}>
      <span style={{ fontSize: '0.62em', verticalAlign: '0.28em', marginRight: '1px' }}>{currency}</span>{value}
    </span>
  );
}
