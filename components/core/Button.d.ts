import * as React from 'react';

/**
 * The Coop's primary action control: a hard-outlined sticker button with an
 * offset black shadow that presses down on click.
 * @startingPoint section="Core" subtitle="Sticker buttons in every variant and size" viewport="700x220"
 */
export interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
  /** Visual weight. Red for the one real action on a screen. */
  variant?: 'primary' | 'dark' | 'light' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  /** Stretch to the container width (mobile order flows). */
  block?: boolean;
  disabled?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  /** Render as another element, e.g. 'a'. */
  as?: 'button' | 'a' | 'div';
  children?: React.ReactNode;
}
export function Button(props: ButtonProps): JSX.Element;
