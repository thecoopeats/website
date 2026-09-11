import React from 'react';

const files = {
  primary: 'assets/logo-coop.png',
  knockout: 'assets/logo-coop-knockout.png',
  nugs: 'assets/nugs-not-drugs.png'
};

export function Logo({ variant = 'primary', width = 180, assetBase = '', style, ...rest }) {
  return (
    <img {...rest}
      src={assetBase + files[variant]}
      alt={variant === 'nugs' ? 'Nugs Not Drugs — The Coop' : 'The Coop'}
      style={{
        width, height: 'auto', display: 'block', ...style
      }} />
  );
}
