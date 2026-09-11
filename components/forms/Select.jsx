import React from 'react';

export function Select({ label, options = [], hint, id, style, ...rest }) {
  const uid = id || React.useId();
  return (
    <div style={{ display: 'grid', gap: '6px' }}>
      {label && <label htmlFor={uid} style={{
        fontFamily: 'var(--font-poster)', fontSize: 'var(--text-2xs)', letterSpacing: 'var(--tracking-caps)',
        textTransform: 'uppercase'
      }}>{label}</label>}
      <select {...rest} id={uid} style={{
        appearance: 'none', width: '100%', background: 'var(--coop-white)',
        border: 'var(--stroke-2) solid var(--coop-black)', borderRadius: 'var(--radius-md)',
        padding: '12px var(--space-6) 12px var(--space-3)',
        fontFamily: 'var(--font-body)', fontWeight: 'var(--weight-body)', fontSize: 'var(--text-sm)',
        color: 'var(--text-body)', cursor: 'pointer',
        backgroundImage: 'linear-gradient(45deg,transparent 50%,var(--coop-black) 50%),linear-gradient(135deg,var(--coop-black) 50%,transparent 50%)',
        backgroundPosition: 'calc(100% - 20px) 21px,calc(100% - 14px) 21px',
        backgroundSize: '6px 6px,6px 6px', backgroundRepeat: 'no-repeat', ...style
      }}>
        {options.map(o => {
          const v = typeof o === 'string' ? o : o.value;
          const l = typeof o === 'string' ? o : o.label;
          return <option key={v} value={v}>{l}</option>;
        })}
      </select>
      {hint && <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-2xs)', color: 'var(--text-muted)' }}>{hint}</span>}
    </div>
  );
}
