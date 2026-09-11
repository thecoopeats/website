import * as React from 'react';
/** 1–3 flame glyphs marking a spicy item, matching the 🔥 marks on the printed menu. */
export interface HeatMeterProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** 0 hides the meter entirely. 1 = maple yellow, 2 = buffalo orange, 3 = nashville red. */
  level?: 0 | 1 | 2 | 3;
  size?: number;
}
export function HeatMeter(props: HeatMeterProps): JSX.Element | null;
