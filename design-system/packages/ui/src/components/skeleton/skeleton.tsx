import { cn } from "../../lib/cn";
import * as React from "react";
import { skeletonVariants } from "./skeleton.styles";
import type { SkeletonProps } from "./skeleton.types";

/**
 * Skeleton de carregamento do design system PRIZM.
 *
 * API principal baseada em **props** (sem subcomponents):
 *
 * ```tsx
 * <Skeleton className="h-4 w-32" />
 * <Skeleton shape="circle" className="h-10 w-10" />
 * <Skeleton shape="pill" className="h-8 w-24" />
 * ```
 *
 * - Forma controlada por `shape`
 * - Tamanho controlado via `className` (`h-*`, `w-*`, `max-w-*`, etc.)
 *
 * @see https://ui.shadcn.com/docs/components/radix/skeleton
 */
function Skeleton({
  className,
  shape,
  ref,
  ...props
}: SkeletonProps & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      data-slot="skeleton"
      className={cn(skeletonVariants({ shape, className }))}
      {...props}
    />
  );
}

Skeleton.displayName = "Skeleton";

export { Skeleton };
