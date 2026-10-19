import { cva, type VariantProps } from "class-variance-authority";

/**
 * PRIZM Skeleton — shimmer base para carregamento.
 * Usa tokens de `@grupoitss/prizm-tokens` (bg-muted etc.) e funciona em tema claro/escuro.
 */
const skeletonBase = "animate-pulse bg-muted rounded-md inline-block align-middle";

export const skeletonVariants = cva(skeletonBase, {
  variants: {
    /**
     * Forma geral do skeleton.
     *
     * - `rect`: retângulo com bordas levemente arredondadas (default)
     * - `pill`: pílula (útil para botões, tags)
     * - `circle`: círculo (útil para avatar)
     */
    shape: {
      rect: "rounded-md",
      pill: "rounded-full",
      circle: "rounded-full",
    },
  },
  defaultVariants: {
    shape: "rect",
  },
});

export type SkeletonVariantProps = VariantProps<typeof skeletonVariants>;
