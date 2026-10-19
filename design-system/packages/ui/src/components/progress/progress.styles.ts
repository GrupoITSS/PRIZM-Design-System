import { cva, type VariantProps } from "class-variance-authority";

/**
 * PRIZM Progress — styles use design tokens from @grupoitss/prizm-tokens.
 * Compatible com light/dark mode via :root e .dark CSS variables.
 *
 * A faixa NÃO preenchida do progress (track) deve usar uma cor derivada do
 * status atual, porém com opacidade, seguindo o layout do Figma
 * (overlay esbranquiçado sobre a cor base).
 *
 * Exemplo visual aproximado:
 * - status=info    → fundo `primary` com opacidade
 * - status=success → fundo `success` com opacidade
 * - status=warning → fundo `warning` com opacidade
 * - status=error   → fundo `destructive` com opacidade
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
      info: "bg-primary/20",
      success: "bg-success/20",
      warning: "bg-warning/20",
      error: "bg-destructive/20",
    },
  },
  defaultVariants: {
    size: "md",
    status: "info",
  },
});

const progressIndicatorBase =
  "h-full w-full flex-1 bg-primary transition-all data-[status=complete]:bg-success data-[status=error]:bg-destructive data-[status=warning]:bg-warning";

export const progressIndicatorVariants = cva(progressIndicatorBase, {
  variants: {
    size: {
      sm: "h-1",
      md: "h-2",
      lg: "h-3",
    },
    status: {
      info: "",
      success: "bg-success",
      warning: "bg-warning",
      error: "bg-destructive",
    },
  },
  defaultVariants: {
    size: "md",
    status: "info",
  },
});

export type ProgressStatus = "info" | "success" | "warning" | "error";
export type ProgressVariantProps = VariantProps<typeof progressRootVariants> &
  Pick<VariantProps<typeof progressIndicatorVariants>, "status">;
