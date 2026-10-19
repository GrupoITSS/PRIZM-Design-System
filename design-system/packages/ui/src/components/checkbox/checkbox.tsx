import { cn } from "../../lib/cn";
import { Checkbox as RadixCheckbox } from "radix-ui";
import { Check, Minus } from "lucide-react";
import * as React from "react";
import { Label } from "../label";
import {
  checkboxIconStyles,
  checkboxIndicatorStyles,
  checkboxRootVariants,
} from "./checkbox.styles";
import type { CheckboxProps } from "./checkbox.types";

/**
 * Checkbox — controlled or uncontrolled checkbox with optional label.
 *
 * Simplified API: use `label` for the common case of checkbox + label.
 * Composition: use Checkbox without label and wrap with your own Label for custom layout.
 *
 * @example
 * // Simplified (recommended)
 * <Checkbox label="Accept terms" checked={accepted} onCheckedChange={setAccepted} />
 *
 * @example
 * // Composition
 * <div className="flex items-center gap-2">
 *   <Checkbox id="terms" />
 *   <Label htmlFor="terms">Accept terms</Label>
 * </div>
 *
 * @see https://ui.shadcn.com/docs/components/checkbox
 * @see https://www.radix-ui.com/docs/primitives/components/checkbox
 */
const Checkbox = function Checkbox({
  className,
  size = "default",
  label,
  id: idProp,
  ref,
  ...props
}: CheckboxProps & { ref?: React.Ref<React.ComponentRef<typeof RadixCheckbox.Root>> }) {
  const generatedId = React.useId();
  const id = idProp ?? generatedId;

  const root = (
    <RadixCheckbox.Root
      ref={ref}
      id={id}
      data-slot="checkbox"
      data-size={size}
      className={cn(checkboxRootVariants({ size }), "group/checkbox-root", className)}
      {...props}
    >
      <RadixCheckbox.Indicator className={cn(checkboxIndicatorStyles)}>
        <span className={cn(checkboxIconStyles, size === "sm" && "size-3")}>
          <Check
            strokeWidth={2.5}
            aria-hidden
            className="size-full group-data-[state=indeterminate]/checkbox-root:hidden"
          />
          <Minus
            strokeWidth={2.5}
            aria-hidden
            className="hidden size-full group-data-[state=indeterminate]/checkbox-root:block"
          />
        </span>
      </RadixCheckbox.Indicator>
    </RadixCheckbox.Root>
  );

  if (label != null) {
    return (
      <div className="group/checkbox flex items-center gap-2">
        {root}
        <Label
          htmlFor={id}
          className="cursor-pointer text-sm font-light text-foreground leading-none group-has-disabled/checkbox:cursor-not-allowed group-has-disabled/checkbox:opacity-70"
        >
          {label}
        </Label>
      </div>
    );
  }

  return root;
};

Checkbox.displayName = RadixCheckbox.Root.displayName ?? "Checkbox";

export { Checkbox };
