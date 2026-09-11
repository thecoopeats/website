import React from 'react';

export function Input({ label, hint, error, prefix, suffix, id, style, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  const uid = id || React.useId();
  return (
    <div style={{ display: 'grid', gap: '6px' }}>
      {label && <label htmlFor={uid} style={{
        fontFamily: 'var(--font-poster)', fontSize: 'var(--text-2xs)', letterSpacing: 'var(--tracking-caps)',
        textTransform: 'uppercase', color: 'var(--coop-black)'
      }}>{label}</label>}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 'var(--space-2)',
        background: 'var(--coop-white)', borderRadius: 'var(--radius-md)',
        border: 'var(--stroke-2) solid ' + (error ? 'var(--coop-red)' : 'var(--coop-black)'),
        boxShadow: focus ? '0 0 0 3px rgba(200,37,43,.35)' : 'none',
        padding: '0 var(--space-3)', transition: 'box-shadow var(--dur-fast) linear'
      }}>
        {prefix && <span style={{ color: 'var(--gray-600)', display: 'flex' }}>{prefix}</span>}
        <input {...rest} id={uid} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          style={{
            flex: 1, minWidth: 0, border: 'none', outline: 'none', background: 'transparent',
            fontFamily: 'var(--font-body)', fontWeight: 'var(--weight-body)', fontSize: 'var(--text-sm)',
            color: 'var(--text-body)', padding: '12px 0', ...style
          }} />
        {suffix && <span style={{ color: 'var(--gray-600)', display: 'flex' }}>{suffix}</span>}
      </div>
      {(hint || error) && <span style={{
        fontFamily: 'var(--font-body)', fontSize: 'var(--text-2xs)',
        color: error ? 'var(--coop-red)' : 'var(--text-muted)'
      }}>{error || hint}</span>}
    </div>
  );
}
