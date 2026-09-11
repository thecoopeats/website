import * as React from 'react';
/** The red dashed rule that brackets the DIPPED block on the printed menu. */
export interface DashRuleProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  thickness?: number;
  dash?: number;
  gap?: number;
}
export function DashRule(props: DashRuleProps): JSX.Element;
