import * as React from 'react';
/** Transient confirmation strip: "added to the bag", "truck is parked". */
export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: 'dark' | 'red' | 'white';
  title?: string;
  message?: string;
  onDismiss?: () => void;
}
export function Toast(props: ToastProps): JSX.Element;
