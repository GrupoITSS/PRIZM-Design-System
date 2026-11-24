import { cva, type VariantProps } from "class-variance-authority";

/**
 * PRIZM Progress — styles use design tokens from @grupoitss/prizm-tokens.
 *
 * Decisões de 24/11/2026 (DS, documentação do Progress):
 * - Trilho: o tom do status a 20% (`bg-<tom>/20`). O `-weak` foi medido e, no escuro, o primary
 *   contra o primary-weak fica em 2,50–2,84:1; com o tom a 20%, todos os pares passam de 3:1.
 * - Indicador: o tom do status; no warning, `warning-strong`, porque `warning` fica em
 *   1,72–2,15:1 no claro, contra o trilho e contra a página.
 * - `default` usa a primária. `info` é apelido obsoleto de `default`.
 *
 * @see [Progress — shadcn/ui (Radix)](https://ui.shadcn.com/docs/components/radix/progress)
 */
const progressRootBase = "relative w-full overflow-hidden rounded-full";

export const progressRootVariants = cva(progressRootBase, {
  variants: {
    size: {
      sm: "h-1",
      md: "h-2",
      lg: "h-3",
    },
    status: {
      default: "bg-primary/20",
      success: "bg-success/20",
      warning: "bg-warning/20",
      error: "bg-destructive/20",
    },
  },
  defaultVariants: {
    size: "md",
    status: "default",
  },
});

const progressIndicatorBase = "h-full w-full flex-1 transition-all";

export const progressIndicatorVariants = cva(progressIndicatorBase, {
  variants: {
    size: {
      sm: "h-1",
      md: "h-2",
      lg: "h-3",
    },
    status: {
      default: "bg-primary",
      success: "bg-success",
      warning: "bg-warning-strong",
      error: "bg-destructive",
    },
  },
  defaultVariants: {
    size: "md",
    status: "default",
  },
});

/** Os status, na ordem do Figma (Status). */
export const progressStatuses = ["default", "success", "warning", "error"] as const;

export type ProgressStatus = (typeof progressStatuses)[number];

export type ProgressVariantProps = VariantProps<typeof progressRootVariants>;
