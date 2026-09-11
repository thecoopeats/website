import * as React from 'react';
/** Black label on hover/focus. Short factual text only — never the place for jokes. */
export interface TooltipProps {
  label: string;
  placement?: 'top' | 'bottom';
  children?: React.ReactNode;
}
export function Tooltip(props: TooltipProps): JSX.Element;
