import * as React from 'react';
/** Site header: knockout wordmark left, poster-caps links right, heavy black bottom rule. */
export interface NavBarProps extends React.HTMLAttributes<HTMLElement> {
  links?: (string | { value: string; label: string })[];
  active?: string;
  onNavigate?: (value: string) => void;
  /** Usually a <Button variant="dark">FIND THE TRUCK</Button>. */
  cta?: React.ReactNode;
  assetBase?: string;
  tone?: 'red' | 'black' | 'white';
}
export function NavBar(props: NavBarProps): JSX.Element;
