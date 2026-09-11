import * as React from 'react';
/** Outlined dropdown matching Input's keyline and label treatment. */
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options?: (string | { value: string; label: string })[];
  hint?: string;
}
export function Select(props: SelectProps): JSX.Element;
