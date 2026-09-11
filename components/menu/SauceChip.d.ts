import * as React from 'react';
export declare const SAUCES: { id: string; label: string; color: string }[];
/**
 * A DIPPED sauce chip — colored type on black, filling with its own color when chosen.
 * @startingPoint section="Menu" subtitle="The six truckmade sauces" viewport="700x180"
 */
export interface SauceChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** One of the six canonical sauces: honey-bbq, garlic-parmesan, spicy-maple, sweet-thai-chili, buffalo, nashville-hot. */
  sauce: string;
  label?: string;
  color?: string;
  selected?: boolean;
  /** Providing this makes the chip a real toggle; omit it for display-only boards. */
  onSelect?: (sauce: string) => void;
}
export function SauceChip(props: SauceChipProps): JSX.Element;
