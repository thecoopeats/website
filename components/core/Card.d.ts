import * as React from 'react';
/**
 * Outlined content container. Sticker cards get the hard offset shadow.
 * @startingPoint section="Core" subtitle="Card tones: paper, board, red, sunk" viewport="700x260"
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: 'paper' | 'board' | 'red' | 'sunk';
  /** Heavy 3px black keyline. On by default — it is the brand. */
  outlined?: boolean;
  /** Hard offset black shadow (no blur). */
  sticker?: boolean;
  /** Shadow grows and card nudges up on hover. Only with sticker. */
  hoverLift?: boolean;
  padding?: string;
  children?: React.ReactNode;
}
export function Card(props: CardProps): JSX.Element;
