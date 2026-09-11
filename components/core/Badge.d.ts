import * as React from 'react';
/** Small all-caps status pill: NEW, SOLD OUT, LIMITED, TRUCK IS OPEN. */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: 'red' | 'black' | 'white' | 'maple' | 'buffalo';
  size?: 'sm' | 'md';
  outlined?: boolean;
  children?: React.ReactNode;
}
export function Badge(props: BadgeProps): JSX.Element;
