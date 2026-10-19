import type * as React from "react";
import type { ToggleVariantProps } from "./toggle.styles";

export interface ToggleProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange">, ToggleVariantProps {
  /**
   * Controlled pressed state of the toggle.
   */
  pressed?: boolean;
  /**
   * Initial pressed state when uncontrolled.
   */
  defaultPressed?: boolean;
  /**
   * Callback fired when pressed state changes.
   */
  onPressedChange?: (pressed: boolean) => void;
  /**
   * When true, uses Radix `asChild` to style the child element instead of rendering a `<button>`.
   * Children must then be a single React element.
   * @default false
   */
  asChild?: boolean;
}
