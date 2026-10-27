import { cva, type VariantProps } from "class-variance-authority";

/**
 * PRIZM Skeleton — shimmer base para carregamento.
 * Usa tokens de `@grupoitss/prizm-tokens` (bg-muted etc.) e funciona em tema claro/escuro.
 *
 * O pulso roda 2 ciclos (4s) e para com o bloco cheio: WCAG 2.2.2 pede um jeito de parar
 * movimento que dura mais de 5s ao lado de outro conteúdo (decisão de 27/10/2026).
 * `!` para valer sobre o `infinite` do animate-pulse, como o motion-reduce do Spinner.
 */
const skeletonBase =
  "animate-pulse [animation-iteration-count:2]! bg-muted rounded-md inline-block align-middle";

export const skeletonVariants = cva(skeletonBase, {
  variants: {
    /**
     * Forma geral do skeleton.
     *
     * - `rect`: retângulo com bordas levemente arredondadas (default)
     * - `pill`: pílula (útil para botões, tags)
     * - `circle`: círculo (útil para avatar). Sempre redondo: basta um tamanho (`size-10`).
     */
    shape: {
      rect: "rounded-md",
      pill: "rounded-full",
      circle: "aspect-square rounded-full",
    },
  },
  defaultVariants: {
    shape: "rect",
  },
});

export type SkeletonVariantProps = VariantProps<typeof skeletonVariants>;
