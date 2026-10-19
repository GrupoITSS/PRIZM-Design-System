import { cn } from "../../lib/cn";
import { Label as RadixLabel } from "radix-ui";
import * as React from "react";
import { labelVariants } from "./label.styles";
import type { LabelProps } from "./label.types";

/**
 * Label do design system PRIZM.
 *
 * Rótulo acessível para inputs e outros controles de formulário.
 * Baseado em shadcn/ui Label.
 *
 * Uso recomendado:
 * ```tsx
 * <div className="flex gap-2">
 *   <input id="terms" type="checkbox" />
 *   <Label htmlFor="terms">Accept terms and conditions</Label>
 * </div>
 * ```
 *
 * @see https://ui.shadcn.com/docs/components/radix/label
 */
const Label = ({
  className,
  required,
  children,
  ref,
  ...props
}: LabelProps & { ref?: React.Ref<React.ComponentRef<typeof RadixLabel.Root>> }) => (
  <RadixLabel.Root
    ref={ref}
    data-slot="label"
    className={cn(className, labelVariants())}
    {...props}
  >
    {children}
    {required ? (
      <span className="ml-0.5 text-destructive" aria-hidden="true">
        *
      </span>
    ) : null}
  </RadixLabel.Root>
);

Label.displayName = RadixLabel.Root.displayName ?? "Label";

export { Label };
