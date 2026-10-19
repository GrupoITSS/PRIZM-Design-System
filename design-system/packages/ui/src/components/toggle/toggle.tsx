import { cn } from "../../lib/cn";
import { Toggle as RadixToggle } from "radix-ui";
import * as React from "react";
import { toggleVariants } from "./toggle.styles";
import type { ToggleProps } from "./toggle.types";

/**
 * Toggle do design system PRIZM.
 *
 * API principal é baseada em props (`pressed`, `defaultPressed`, `onPressedChange`),
 * sem necessidade de subcomponentes. Usa Radix Toggle como base para acessibilidade.
 *
 * @see [Toggle — shadcn/ui (Radix)](https://ui.shadcn.com/docs/components/toggle)
 */
function Toggle({
  className,
  variant = "default",
  size = "default",
  pressed,
  defaultPressed,
  onPressedChange,
  asChild = false,
  children,
  ref,
  ...props
}: ToggleProps & { ref?: React.Ref<HTMLButtonElement> }) {
  return (
    <RadixToggle.Root
      ref={ref}
      data-slot="toggle"
      data-variant={variant}
      data-size={size}
      className={cn(toggleVariants({ variant, size, className }))}
      pressed={pressed}
      defaultPressed={defaultPressed}
      onPressedChange={onPressedChange}
      asChild={asChild}
      {...props}
    >
      {children}
    </RadixToggle.Root>
  );
}

Toggle.displayName = "Toggle";

export { Toggle };
