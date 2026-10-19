import { cn } from "../../lib/cn";
import { Separator as RadixSeparator } from "radix-ui";
import * as React from "react";
import { separatorVariants } from "./separator.styles";
import type { SeparatorProps } from "./separator.types";

/**
 * Separator do design system PRIZM.
 *
 * Usado para separar visualmente ou semanticamente blocos de conteúdo.
 * Baseado em shadcn/ui Separator.
 *
 * @see https://ui.shadcn.com/docs/components/radix/separator
 */
const Separator = ({
  className,
  orientation = "horizontal",
  decorative = true,
  role,
  ref,
  ...props
}: SeparatorProps & { ref?: React.Ref<React.ComponentRef<typeof RadixSeparator.Root>> }) => (
  <RadixSeparator.Root
    ref={ref}
    decorative={decorative}
    orientation={orientation ?? "horizontal"}
    role={decorative ? "none" : role}
    data-orientation={orientation ?? "horizontal"}
    className={cn(separatorVariants({ orientation: orientation ?? "horizontal" }), className)}
    {...props}
  />
);

Separator.displayName = RadixSeparator.Root.displayName ?? "Separator";

export { Separator };
