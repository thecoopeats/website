import React from 'react';

export function Radio({ label, name, value, checked, onChange, disabled, ...rest }) {
  return (
    <label style={{
      display: 'flex', gap: 'var(--space-3)', alignItems: 'center',
      cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.45 : 1
    }}>
      <input {...rest} type="radio" name={name} value={value} checked={checked} disabled={disabled}
        onChange={e => onChange && onChange(value, e)}
        style={{
          appearance: 'none', width: 24, height: 24, margin: 0, flex: '0 0 auto',
          border: 'var(--stroke-2) solid var(--coop-black)', borderRadius: '999px',
          background: 'var(--coop-white)', cursor: 'inherit',
          boxShadow: checked ? 'inset 0 0 0 4px var(--coop-white), inset 0 0 0 12px var(--coop-red)' : 'none',
          transition: 'box-shadow var(--dur-fast) var(--ease-pop)'
        }} />
      <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 'var(--text-sm)' }}>{label}</span>
    </label>
  );
}
