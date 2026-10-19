import type * as React from "react";
import type { SeparatorVariantProps } from "./separator.styles";

export interface SeparatorProps
  extends React.HTMLAttributes<HTMLDivElement>, SeparatorVariantProps {
  /**
   * When true, the separator is decorative only and hidden from assistive tech.
   * @default true
   */
  decorative?: boolean;
}
