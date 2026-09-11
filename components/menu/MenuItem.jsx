import React from 'react';
import { HeatMeter } from './HeatMeter.jsx';
import { PriceTag } from './PriceTag.jsx';
import { Badge } from '../core/Badge.jsx';

export function MenuItem({ name, price, description, heat = 0, badge, tone = 'paper', compact, soldOut, onClick, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const dark = tone === 'board';
  const clickable = typeof onClick === 'function' && !soldOut;
  return (
    <div {...rest} onClick={clickable ? onClick : undefined}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: 'grid', gridTemplateColumns: '1fr auto', columnGap: 'var(--space-4)',
        alignItems: 'baseline', padding: compact ? 'var(--space-2) 0' : 'var(--space-3) 0',
        cursor: clickable ? 'pointer' : 'default', opacity: soldOut ? 0.45 : 1,
        color: dark ? 'var(--text-on-black)' : 'var(--text-body)', ...style
      }}>
      <div style={{ minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
          <span style={{
            fontFamily: 'var(--font-poster)', fontSize: compact ? 'var(--text-md)' : 'var(--text-lg)',
            letterSpacing: 'var(--tracking-poster)', textTransform: 'uppercase', lineHeight: 1.05,
            color: dark ? 'var(--coop-white)' : 'var(--coop-black)',
            textDecoration: clickable && hover ? 'underline' : 'none',
            textDecorationThickness: '3px', textUnderlineOffset: '3px',
            textDecorationColor: 'var(--coop-red)'
          }}>{name}</span>
          <HeatMeter level={heat} size={compact ? 14 : 17} />
          {badge && <Badge tone={dark ? 'white' : 'red'} size="sm">{badge}</Badge>}
          {soldOut && <Badge tone="black" size="sm">Sold out</Badge>}
        </div>
        {description && !compact && (
          <p style={{
            margin: '4px 0 0', fontFamily: 'var(--font-body)', fontWeight: 'var(--weight-body)',
            fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-body)', maxWidth: '46ch',
            color: dark ? 'rgba(255,255,255,.82)' : 'var(--text-muted)'
          }}>{description}</p>
        )}
      </div>
      <PriceTag value={price} size={compact ? 'sm' : 'md'} tone={dark ? 'white' : 'ink'} />
    </div>
  );
}
