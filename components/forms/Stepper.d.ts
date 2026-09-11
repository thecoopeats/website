import * as React from 'react';
/** Quantity control for cart lines. */
export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
  size?: 'sm' | 'md';
}
export function Stepper(props: StepperProps): JSX.Element;
