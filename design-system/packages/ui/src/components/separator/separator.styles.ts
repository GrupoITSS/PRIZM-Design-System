import { cva, type VariantProps } from "class-variance-authority";

/**
 * PRIZM Separator — estilos base usando tokens de `@grupoitss/prizm-tokens`.
 * Baseado em shadcn/ui Separator.
 */
export const separatorVariants = cva("shrink-0 bg-border", {
  variants: {
    orientation: {
      horizontal: "h-px w-full",
      vertical: "h-full w-px",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

export type SeparatorVariantProps = VariantProps<typeof separatorVariants>;
