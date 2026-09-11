import React from 'react';

export function DashRule({ color = 'var(--coop-red)', thickness = 5, dash = 18, gap = 14, style, ...rest }) {
  return (
    <div {...rest} role="separator" style={{
      height: thickness,
      background: `repeating-linear-gradient(90deg,${color} 0 ${dash}px,transparent ${dash}px ${dash + gap}px)`,
      ...style
    }} />
  );
}
