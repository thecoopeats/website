import * as React from 'react';
/**
 * Centered modal on a dark scrim, styled as a big sticker card.
 * @startingPoint section="Feedback" subtitle="Dialog, toast and tooltip" viewport="700x320"
 */
export interface DialogProps {
  open?: boolean;
  title?: string;
  children?: React.ReactNode;
  onClose?: () => void;
  /** Custom action row; defaults to a single red "GOT IT" button. */
  footer?: React.ReactNode;
  width?: number;
}
export function Dialog(props: DialogProps): JSX.Element | null;
