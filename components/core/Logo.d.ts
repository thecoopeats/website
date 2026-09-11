import * as React from 'react';
/**
 * The Coop wordmark. Always the supplied artwork — never set in type.
 * @startingPoint section="Brand" subtitle="Wordmark + mascot lockups" viewport="700x220"
 */
export interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** primary = red bubble wordmark; knockout = solid white for red/photo grounds; nugs = mascot lockup. */
  variant?: 'primary' | 'knockout' | 'nugs';
  width?: number | string;
  /** Path prefix to the design-system root, e.g. '../../'. */
  assetBase?: string;
}
export function Logo(props: LogoProps): JSX.Element;
