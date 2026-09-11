import React from 'react';

const base = {
  fontFamily: 'var(--font-poster)', letterSpacing: 'var(--tracking-poster)',
  border: 'var(--stroke-2) solid var(--coop-black)', cursor: 'pointer',
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-2)',
  textDecoration: 'none', lineHeight: 1, whiteSpace: 'nowrap',
  transition: 'transform var(--dur-fast) var(--ease-pop), box-shadow var(--dur-fast) var(--ease-pop), background var(--dur-fast) linear'
};

const sizes = {
  sm: { fontSize: 'var(--text-xs)', padding: '9px 14px', borderRadius: 'var(--radius-md)' },
  md: { fontSize: 'var(--text-md)', padding: '13px 22px', borderRadius: 'var(--radius-lg)' },
  lg: { fontSize: 'var(--text-lg)', padding: '18px 32px', borderRadius: 'var(--radius-lg)' }
};

const variants = {
  primary: { background: 'var(--coop-red)', color: 'var(--coop-white)' },
  dark: { background: 'var(--coop-black)', color: 'var(--coop-white)' },
  light: { background: 'var(--coop-white)', color: 'var(--coop-black)' },
  ghost: { background: 'transparent', color: 'var(--coop-black)', border: 'var(--stroke-2) solid transparent', boxShadow: 'none' }
};

export function Button({ variant = 'primary', size = 'md', block, disabled, iconLeft, iconRight, as = 'button', children, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const [down, setDown] = React.useState(false);
  const Tag = as;
  const flat = variant === 'ghost';
  const offset = down ? 2 : 0;
  const s = {
    ...base, ...sizes[size], ...variants[variant],
    width: block ? '100%' : undefined,
    boxShadow: flat ? 'none' : (down ? 'var(--shadow-sticker-press)' : 'var(--shadow-sticker)'),
    transform: down ? 'translate(2px,2px)' : (hover && !flat ? 'translate(-1px,-1px)' : 'none'),
    filter: hover && !flat ? 'brightness(1.06)' : 'none',
    background: flat && hover ? 'var(--gray-100)' : variants[variant].background,
    opacity: disabled ? 0.4 : 1,
    pointerEvents: disabled ? 'none' : undefined,
    ...style
  };
  void offset;
  return (
    <Tag {...rest} disabled={Tag === 'button' ? disabled : undefined} style={s}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => { setHover(false); setDown(false); }}
      onMouseDown={() => setDown(true)} onMouseUp={() => setDown(false)}>
      {iconLeft}{children}{iconRight}
    </Tag>
  );
}
