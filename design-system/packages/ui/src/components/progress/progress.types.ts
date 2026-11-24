import type * as React from "react";
import type { Progress as RadixProgress } from "radix-ui";
import type { ProgressStatus, ProgressVariantProps } from "./progress.styles";

export interface ProgressProps
  extends
    Omit<React.ComponentPropsWithoutRef<typeof RadixProgress.Root>, "className">,
    Omit<ProgressVariantProps, "status"> {
  className?: string;
  /**
   * Valor atual, de 0 a 100. Fora disso, vai para a ponta mais próxima.
   * @default 0
   */
  value?: number;
  /**
   * Status da barra. Quem decide é o produto: chegar a 100% não vira `success` sozinho.
   * `info` é apelido obsoleto de `default`.
   * @default "default"
   */
  status?: ProgressStatus | "info";
  /** Nome da barra. Sem ele (ou sem `aria-labelledby`), há aviso no console em desenvolvimento. */
  "aria-label"?: string;
  /** Id do rótulo que nomeia a barra (ex.: o `FieldLabel` ao lado). */
  "aria-labelledby"?: string;
}
