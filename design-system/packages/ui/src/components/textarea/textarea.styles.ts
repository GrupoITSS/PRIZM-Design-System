import { cva, type VariantProps } from "class-variance-authority";

/**
 * PRIZM Textarea — estilos base usando tokens de `@grupoitss/prizm-tokens`.
 * Compatível com tema claro/escuro via variáveis CSS.
 *
 * Baseado no componente Textarea do shadcn/ui (Radix).
 */
const textareaBase =
  "flex w-full rounded-md border border-input bg-input-background font-normal text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:border-input disabled:cursor-not-allowed disabled:opacity-50";

export const textareaVariants = cva(textareaBase, {
  variants: {
    size: {
      sm: "min-h-16 px-3 py-1.5 text-xs",
      /** Cockpit sheets/forms (PAS-2115 / PAS-2346). */
      md: "min-h-16 px-3 py-2 text-sm border-input bg-input-background text-foreground font-normal placeholder:text-muted-foreground shadow-xs hover:bg-input-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-transparent resize-none disabled:border-transparent disabled:shadow-none disabled:bg-muted disabled:!text-muted-foreground disabled:placeholder:!text-muted-foreground disabled:opacity-100",
      default: "min-h-20 px-3 py-2 text-base md:text-sm",
      lg: "min-h-24 px-3 py-3 text-base",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type TextareaVariantProps = VariantProps<typeof textareaVariants>;
