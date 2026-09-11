import React from 'react';

export function Tooltip({ label, placement = 'top', children }) {
  const [show, setShow] = React.useState(false);
  const pos = placement === 'bottom'
    ? { top: 'calc(100% + 8px)' } : { bottom: 'calc(100% + 8px)' };
  return (
    <span style={{ position: 'relative', display: 'inline-flex' }}
      onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)} onBlur={() => setShow(false)}>
      {children}
      {show && (
        <span role="tooltip" style={{
          position: 'absolute', left: '50%', transform: 'translateX(-50%)', ...pos,
          background: 'var(--coop-black)', color: 'var(--coop-white)',
          fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 'var(--text-3xs)',
          padding: '6px 10px', borderRadius: 'var(--radius-sm)', whiteSpace: 'nowrap', zIndex: 40
        }}>{label}</span>
      )}
    </span>
  );
}
