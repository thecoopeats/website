import React from 'react';

export function Switch({ label, checked, onChange, disabled, ...rest }) {
  return (
    <label style={{
      display: 'inline-flex', gap: 'var(--space-3)', alignItems: 'center',
      cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.45 : 1
    }}>
      <span onClick={() => !disabled && onChange && onChange(!checked)} style={{
        width: 56, height: 32, borderRadius: 'var(--radius-pill)', position: 'relative',
        border: 'var(--stroke-2) solid var(--coop-black)',
        background: checked ? 'var(--coop-red)' : 'var(--gray-200)',
        transition: 'background var(--dur-med) linear', flex: '0 0 auto'
      }}>
        <span style={{
          position: 'absolute', top: 2, left: checked ? 26 : 2, width: 22, height: 22,
          borderRadius: '999px', background: 'var(--coop-white)',
          border: 'var(--stroke-1) solid var(--coop-black)',
          transition: 'left var(--dur-med) var(--ease-pop)'
        }} />
      </span>
      {label && <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 'var(--text-sm)' }}>{label}</span>}
      <input type="checkbox" checked={!!checked} readOnly hidden {...rest} />
    </label>
  );
}
