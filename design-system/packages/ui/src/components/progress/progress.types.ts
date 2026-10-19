import type * as React from "react";
import type { Progress as RadixProgress } from "radix-ui";
import type { ProgressStatus, ProgressVariantProps } from "./progress.styles";

export interface ProgressProps
  extends
    Omit<React.ComponentPropsWithoutRef<typeof RadixProgress.Root>, "className">,
    ProgressVariantProps {
  className?: string;
  /**
   * Current progress value between 0 and 100.
   * Values outside this range are clamped.
   * @default 0
   */
  value?: number;
  /**
   * Visual status of the progress indicator.
   * When not provided, status is inferred: value === 100 => "success".
   * @default "info"
   */
  status?: ProgressStatus;
}
