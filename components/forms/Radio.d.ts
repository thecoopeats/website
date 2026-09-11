import * as React from 'react';
/** Single-choice control for mutually exclusive order options (pickup vs delivery). */
export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label: string;
  name: string;
  value: string;
  checked?: boolean;
  onChange?: (value: string, e: React.ChangeEvent<HTMLInputElement>) => void;
}
export function Radio(props: RadioProps): JSX.Element;
