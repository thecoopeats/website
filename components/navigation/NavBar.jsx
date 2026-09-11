import React from 'react';
import { Logo } from '../core/Logo.jsx';
import { Button } from '../core/Button.jsx';

export function NavBar({ links = [], active, onNavigate, cta, assetBase = '', tone = 'red', style, ...rest }) {
  const dark = tone !== 'white';
  return (
    <header {...rest} style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-5)',
      padding: 'var(--space-3) var(--gutter-page)',
      background: tone === 'red' ? 'var(--coop-red)' : tone === 'black' ? 'var(--coop-black)' : 'var(--coop-white)',
      borderBottom: 'var(--stroke-3) solid var(--coop-black)', ...style
    }}>
      <a href="#" onClick={e => { e.preventDefault(); onNavigate && onNavigate(links[0] && (links[0].value || links[0])); }}
        style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
        <Logo variant={dark ? 'knockout' : 'primary'} width={110} assetBase={assetBase} />
      </a>
      <nav style={{ display: 'flex', gap: 'var(--space-5)', alignItems: 'center', flexWrap: 'wrap' }}>
        {links.map(l => {
          const id = typeof l === 'string' ? l : l.value;
          const label = typeof l === 'string' ? l : l.label;
          const on = id === active;
          return (
            <a key={id} href="#" onClick={e => { e.preventDefault(); onNavigate && onNavigate(id); }}
              style={{
                fontFamily: 'var(--font-poster)', fontSize: 'var(--text-sm)',
                letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase', textDecoration: 'none',
                color: dark ? 'var(--coop-white)' : 'var(--coop-black)',
                borderBottom: on ? '4px solid ' + (dark ? 'var(--coop-white)' : 'var(--coop-red)') : '4px solid transparent',
                paddingBottom: 2
              }}>{label}</a>
          );
        })}
        {cta}
      </nav>
    </header>
  );
}
