import * as React from 'react';
/** Round sticker button holding a single Lucide icon. Always give it a label. */
export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'light' | 'dark' | 'red';
  /** Square px size of the circle. Never below 44 for touch surfaces. */
  size?: number;
  /** Accessible name — required, the button has no text. */
  label: string;
  children?: React.ReactNode;
}
export function IconButton(props: IconButtonProps): JSX.Element;
