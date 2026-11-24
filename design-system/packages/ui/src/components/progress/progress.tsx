import { cn } from "../../lib/cn";
import { Progress as RadixProgress } from "radix-ui";
import * as React from "react";
import { progressIndicatorVariants, progressRootVariants, type ProgressStatus } from "./progress.styles";
import type { ProgressProps } from "./progress.types";

/**
 * Barra que mostra quanto de uma tarefa já foi feito, de 0 a 100%.
 *
 * ```tsx
 * <Progress value={75} aria-label="Envio de relatorio.pdf" />
 * <Progress value={50} status="error" aria-labelledby="rotulo-envio" />
 * ```
 *
 * API por props, sem subcomponentes. O status é o que o produto disser: chegar a 100% não troca
 * para `success`. Sem valor conhecido, use o Spinner.
 *
 * @see [Progress — shadcn/ui (Radix)](https://ui.shadcn.com/docs/components/radix/progress)
 */
const Progress = ({
  className,
  value = 0,
  size = "md",
  status = "default",
  ref,
  ...props
}: ProgressProps & { ref?: React.Ref<React.ComponentRef<typeof RadixProgress.Root>> }) => {
  const numericValue = Number(value);
  const clampedValue = Number.isFinite(numericValue) ? Math.min(100, Math.max(0, numericValue)) : 0;
  const resolvedStatus: ProgressStatus = status === "info" ? "default" : status;
  const named = Boolean(props["aria-label"] || props["aria-labelledby"]);

  React.useEffect(() => {
    if (process.env.NODE_ENV !== "production" && !named) {
      console.warn(
        'Progress: barra sem nome acessível. Passe aria-label ou aria-labelledby (ex.: aria-labelledby="id-do-rótulo").',
      );
    }
  }, [named]);

  return (
    <RadixProgress.Root
      ref={ref}
      data-slot="progress"
      data-size={size}
      data-status={resolvedStatus}
      className={cn(progressRootVariants({ size, status: resolvedStatus }), className)}
      value={clampedValue}
      {...props}
    >
      <RadixProgress.Indicator
        data-slot="progress-indicator"
        data-status={resolvedStatus}
        className={progressIndicatorVariants({ size, status: resolvedStatus })}
        style={{ transform: `translateX(-${100 - clampedValue}%)` }}
      />
    </RadixProgress.Root>
  );
};

Progress.displayName = RadixProgress.Root.displayName ?? "Progress";

export { Progress };
