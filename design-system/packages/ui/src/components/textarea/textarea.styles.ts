import { cva, type VariantProps } from "class-variance-authority";

/**
 * PRIZM Textarea — estilos base usando tokens de `@grupoitss/prizm-tokens`.
 * Compatível com tema claro/escuro via variáveis CSS.
 *
 * Tamanhos, foco e disabled iguais aos do Input (decisões de 21/10/2026): sm, md e lg;
 * anel de 2px em `ring` com a borda transparente; disabled com opacidade 50% (26/10/2026).
 *
 * Baseado no componente Textarea do shadcn/ui (Radix).
 */
const textareaBase =
  "flex w-full rounded-md border border-input bg-input-background px-3 font-normal text-foreground shadow-xs ring-offset-background placeholder:text-muted-foreground hover:bg-input-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-transparent disabled:cursor-not-allowed disabled:opacity-50";

export const textareaVariants = cva(textareaBase, {
  variants: {
    size: {
      sm: "min-h-16 py-1.5 text-xs",
      /** Cockpit sheets/forms (PAS-2115 / PAS-2346). */
      md: "min-h-16 py-2 text-sm",
      lg: "min-h-20 py-2 text-base md:text-sm",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type TextareaVariantProps = VariantProps<typeof textareaVariants>;
