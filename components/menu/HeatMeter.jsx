import React from 'react';

export function HeatMeter({ level = 0, size = 16, style, ...rest }) {
  if (!level) return null;
  const colors = ['var(--heat-1)', 'var(--heat-2)', 'var(--heat-3)'];
  return (
    <span {...rest} role="img" aria-label={`Heat level ${level} of 3`}
      style={{ display: 'inline-flex', gap: '2px', verticalAlign: 'middle', ...style }}>
      {Array.from({ length: level }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={colors[Math.min(i, 2)]}
          stroke="var(--coop-black)" strokeWidth="1.5" strokeLinejoin="round">
          <path d="M12 2c2.5 3.5 1 5.5 0 6.5C10.5 7 9 6 9 4 6.5 6 5 9 5 12a7 7 0 0 0 14 0c0-3.5-2.5-7-7-10z" />
        </svg>
      ))}
    </span>
  );
}
