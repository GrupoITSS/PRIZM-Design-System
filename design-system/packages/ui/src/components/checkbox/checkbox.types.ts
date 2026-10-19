import type * as React from "react";
import type { Checkbox as RadixCheckbox } from "radix-ui";
import type { CheckboxVariantProps } from "./checkbox.styles";

export interface CheckboxProps
  extends
    Omit<React.ComponentPropsWithoutRef<typeof RadixCheckbox.Root>, "children">,
    CheckboxVariantProps {
  /**
   * Optional label text or node. When provided, the checkbox is rendered with an
   * accessible label (recommended for most form usages).
   *
   * @example "Accept terms and conditions"
   * @example <span>I agree to the <a href="/terms">Terms</a></span>
   */
  label?: React.ReactNode;
}
