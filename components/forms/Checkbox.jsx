import React from 'react';

export function Checkbox({ label, description, checked, onChange, disabled, ...rest }) {
  return (
    <label style={{
      display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start',
      cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.45 : 1
    }}>
      <input {...rest} type="checkbox" checked={checked} disabled={disabled}
        onChange={e => onChange && onChange(e.target.checked, e)}
        style={{
          appearance: 'none', width: 24, height: 24, margin: 0, flex: '0 0 auto',
          border: 'var(--stroke-2) solid var(--coop-black)', borderRadius: '7px',
          background: checked ? 'var(--coop-red)' : 'var(--coop-white)', cursor: 'inherit',
          transition: 'background var(--dur-fast) linear',
          boxShadow: checked ? 'inset 0 0 0 3px var(--coop-white), inset 0 0 0 12px var(--coop-red)' : 'none'
        }} />
      <span style={{ display: 'grid', gap: '2px' }}>
        <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 'var(--text-sm)' }}>{label}</span>
        {description && <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-2xs)', color: 'var(--text-muted)' }}>{description}</span>}
      </span>
    </label>
  );
}
