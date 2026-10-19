import { cn } from "../../lib/cn";
import { AspectRatio as RadixAspectRatio } from "radix-ui";
import * as React from "react";
import { aspectRatioRootStyles } from "./aspect-ratio.styles";
import { ASPECT_RATIO_PRESETS, type AspectRatioProps } from "./aspect-ratio.types";

/**
 * AspectRatio — mantém proporção do conteúdo (ex.: 16/9 para vídeos).
 * Use `ratio` (número) ou `ratioPreset` (nome pré-definido, ex.: "16:9", "1:1").
 *
 * @see [Aspect Ratio — shadcn/ui (Radix)](https://ui.shadcn.com/docs/components/aspect-ratio)
 */
const AspectRatio = ({
  className,
  ratio,
  ratioPreset,
  ref,
  ...props
}: AspectRatioProps & { ref?: React.Ref<React.ComponentRef<typeof RadixAspectRatio.Root>> }) => {
  const resolvedRatio = ratioPreset != null ? ASPECT_RATIO_PRESETS[ratioPreset] : (ratio ?? 1);
  return (
    <RadixAspectRatio.Root
      ref={ref}
      data-slot="aspect-ratio"
      className={cn(aspectRatioRootStyles, className)}
      ratio={resolvedRatio}
      {...props}
    />
  );
};
AspectRatio.displayName = RadixAspectRatio.Root.displayName ?? "AspectRatio";

export { AspectRatio };
