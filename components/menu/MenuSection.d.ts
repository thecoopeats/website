import * as React from 'react';
/** A menu category block: ENTREES / SIDES / DRINKS / DIPPED, holding MenuItem rows. */
export interface MenuSectionProps extends React.HTMLAttributes<HTMLElement> {
  /** Category name, rendered uppercase in red (or white on board tone). */
  title: string;
  tone?: 'paper' | 'board';
  /** Small red instruction line, e.g. "get any chicken item dipped in one of our truckmade sauces". */
  note?: string;
  columns?: number;
  children?: React.ReactNode;
}
export function MenuSection(props: MenuSectionProps): JSX.Element;
