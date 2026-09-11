import * as React from 'react';
/** On/off toggle for settings-style preferences (text me when it's ready). */
export interface SwitchProps {
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
}
export function Switch(props: SwitchProps): JSX.Element;
