import * as React from 'react';
/**
 * Outlined text field with a poster-caps label.
 * @startingPoint section="Forms" subtitle="Inputs, selects, toggles and steppers" viewport="700x340"
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  /** Error message; also turns the keyline red. */
  error?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}
export function Input(props: InputProps): JSX.Element;
