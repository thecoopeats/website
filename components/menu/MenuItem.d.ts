import * as React from 'react';
/**
 * One line of the menu: name in poster caps, lowercase ingredient description, price on the right.
 * @startingPoint section="Menu" subtitle="Menu rows on paper and on the board" viewport="700x300"
 */
export interface MenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  price: number | string;
  /** All-lowercase ingredient run-on, exactly as written on the truck menu. */
  description?: string;
  heat?: 0 | 1 | 2 | 3;
  badge?: string;
  tone?: 'paper' | 'board';
  /** Name + price only — for sides, drinks and receipts. */
  compact?: boolean;
  soldOut?: boolean;
}
export function MenuItem(props: MenuItemProps): JSX.Element;
