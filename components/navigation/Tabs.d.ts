import * as React from 'react';
/**
 * Pill tab row for switching menu categories.
 * @startingPoint section="Navigation" subtitle="Tabs and the site header" viewport="700x260"
 */
export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: (string | { value: string; label: string })[];
  value?: string;
  onChange?: (value: string) => void;
  tone?: 'paper' | 'board';
}
export function Tabs(props: TabsProps): JSX.Element;
