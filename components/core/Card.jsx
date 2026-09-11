import React from 'react';

export function Card({ tone = 'paper', outlined = true, sticker, hoverLift, padding = 'var(--space-5)', children, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const tones = {
    paper: { background: 'var(--surface-card)', color: 'var(--text-body)' },
    board: { background: 'var(--coop-black)', color: 'var(--text-on-black)' },
    red: { background: 'var(--coop-red)', color: 'var(--text-on-red)' },
    sunk: { background: 'var(--surface-sunk)', color: 'var(--text-body)' }
  };
  return (
    <div {...rest}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        ...tones[tone], padding, borderRadius: 'var(--radius-lg)',
        border: outlined ? 'var(--outline-hard)' : '1px solid var(--border-soft)',
        boxShadow: sticker ? (hoverLift && hover ? 'var(--shadow-sticker-lg)' : 'var(--shadow-sticker)') : (outlined ? 'none' : 'var(--shadow-card)'),
        transform: sticker && hoverLift && hover ? 'translate(-2px,-2px)' : 'none',
        transition: 'transform var(--dur-med) var(--ease-pop), box-shadow var(--dur-med) var(--ease-pop)',
        ...style
      }}>{children}</div>
  );
}
