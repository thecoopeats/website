import * as React from 'react';
/** Poster-font price. Whole dollars on the board (12, not 12.00); cents only at checkout. */
export interface PriceTagProps extends React.HTMLAttributes<HTMLSpanElement> {
  value: number | string;
  size?: 'sm' | 'md' | 'lg';
  tone?: 'ink' | 'red' | 'white';
  currency?: string;
}
export function PriceTag(props: PriceTagProps): JSX.Element;
