import { cn } from "../../lib/cn";
import { Progress as RadixProgress } from "radix-ui";
import * as React from "react";
import { progressIndicatorVariants, progressRootVariants } from "./progress.styles";
import type { ProgressProps } from "./progress.types";

/**
 * Linear progress bar for representing completion between 0% and 100%.
 *
 * **API simplificada (preferida):**
 * ```tsx
 * <Progress value={40} />
 * <Progress value={75} size="lg" aria-label="Upload progress" />
 * ```
 *
 * Baseado no Progress do shadcn/ui (Radix), mas exposto apenas como
 * componente único baseado em props (sem subcomponentes públicos).
 *
 * @see [Progress — shadcn/ui (Radix)](https://ui.shadcn.com/docs/components/radix/progress)
 */
const Progress = ({
  className,
  value = 0,
  size = "md",
  status,
  ref,
  ...props
}: ProgressProps & { ref?: React.Ref<React.ComponentRef<typeof RadixProgress.Root>> }) => {
  const numericValue = Number(value);
  const clampedValue = Number.isFinite(numericValue) ? Math.min(100, Math.max(0, numericValue)) : 0;

  const derivedStatus = status ?? (clampedValue === 100 ? "success" : "info");

  return (
    <RadixProgress.Root
      ref={ref}
      data-slot="progress"
      data-size={size}
      data-status={derivedStatus}
      className={cn(progressRootVariants({ size, status: derivedStatus }), className)}
      value={clampedValue}
      {...props}
    >
      <RadixProgress.Indicator
        data-status={derivedStatus}
        className={cn(progressIndicatorVariants({ size, status: derivedStatus }))}
        style={{ transform: `translateX(-${100 - clampedValue}%)` }}
      />
    </RadixProgress.Root>
  );
};

Progress.displayName = RadixProgress.Root.displayName ?? "Progress";

export { Progress };
