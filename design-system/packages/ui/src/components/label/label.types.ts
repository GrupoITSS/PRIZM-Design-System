import type * as React from "react";
import type { LabelVariantProps } from "./label.styles";

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement>, LabelVariantProps {
  /** When true, renders a red asterisk after the label text. */
  required?: boolean;
}
