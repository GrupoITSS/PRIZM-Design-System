import type * as React from "react";
import type { AspectRatio as RadixAspectRatio } from "radix-ui";

/** Valores pré-definidos de proporção; use a prop `ratioPreset` para escolher pelo nome. */
export const ASPECT_RATIO_PRESETS = {
  "1:1": 1,
  "4:3": 4 / 3,
  "3:4": 3 / 4,
  "5:4": 5 / 4,
  "4:5": 4 / 5,
  "3:2": 3 / 2,
  "2:3": 2 / 3,
  "16:10": 16 / 10,
  "10:16": 10 / 16,
  "16:9": 16 / 9,
  "9:16": 9 / 16,
  "2:1": 2 / 1,
  "1:2": 1 / 2,
  "1.618:1": 1.618,
  "1:1.618": 1 / 1.618,
  "21:9": 21 / 9,
  "9:21": 9 / 21,
} as const;

export type AspectRatioPreset = keyof typeof ASPECT_RATIO_PRESETS;

export interface AspectRatioProps extends Omit<
  React.ComponentPropsWithoutRef<typeof RadixAspectRatio.Root>,
  "ratio"
> {
  /** Proporção numérica (ex.: 16/9, 1). Ignorado se `ratioPreset` for informado. */
  ratio?: number;
  /** Proporção por nome pré-definido. Tem precedência sobre `ratio`. */
  ratioPreset?: AspectRatioPreset;
}
