import React from 'react';

export function IconButton({ variant = 'light', size = 40, label, children, style, ...rest }) {
  const [down, setDown] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  const bg = { light: 'var(--coop-white)', dark: 'var(--coop-black)', red: 'var(--coop-red)' }[variant];
  const fg = variant === 'light' ? 'var(--coop-black)' : 'var(--coop-white)';
  return (
    <button {...rest} aria-label={label} onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setDown(false); }}
      onMouseDown={() => setDown(true)} onMouseUp={() => setDown(false)}
      style={{
        width: size, height: size, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        background: bg, color: fg, border: 'var(--stroke-2) solid var(--coop-black)',
        borderRadius: 'var(--radius-pill)', cursor: 'pointer', padding: 0,
        boxShadow: down ? 'var(--shadow-sticker-press)' : 'var(--shadow-sticker)',
        transform: down ? 'translate(2px,2px)' : (hover ? 'translate(-1px,-1px)' : 'none'),
        transition: 'transform var(--dur-fast) var(--ease-pop), box-shadow var(--dur-fast) var(--ease-pop)',
        ...style
      }}>{children}</button>
  );
}
