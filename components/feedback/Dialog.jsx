import React from 'react';
import { Button } from '../core/Button.jsx';

export function Dialog({ open, title, children, onClose, footer, width = 480 }) {
  if (!open) return null;
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, background: 'rgba(10,10,10,.6)',
      display: 'grid', placeItems: 'center', padding: 'var(--space-5)', zIndex: 60
    }}>
      <div onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" style={{
        width: '100%', maxWidth: width, background: 'var(--coop-white)',
        border: 'var(--outline-hard)', borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-sticker-lg)', padding: 'var(--space-6)',
        animation: 'none'
      }}>
        {title && <h3 style={{
          margin: '0 0 var(--space-3)', fontFamily: 'var(--font-poster)',
          fontSize: 'var(--text-xl)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-poster)',
          lineHeight: 1.05
        }}>{title}</h3>}
        <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-body)', color: 'var(--text-body)' }}>
          {children}
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'flex-end', marginTop: 'var(--space-5)' }}>
          {footer || <Button variant="primary" onClick={onClose}>GOT IT</Button>}
        </div>
      </div>
    </div>
  );
}
