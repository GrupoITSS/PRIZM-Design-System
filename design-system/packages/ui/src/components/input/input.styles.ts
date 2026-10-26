import { cva, type VariantProps } from "class-variance-authority";

/**
 * PRIZM Input — estilos base usando tokens de `@grupoitss/prizm-tokens`.
 * Compatível com tema claro/escuro via variáveis CSS.
 *
 * Foco, erro e disabled valem para todos os tamanhos (decisões de 21/10/2026):
 * anel de 2px em `ring` com a borda transparente; no erro a borda fica
 * `destructive` e o anel continua `ring`; disabled com opacidade 50%, como o Button
 * (revisto em 26/10/2026; antes era `bg-muted`).
 *
 * Baseado no componente Input do shadcn/ui (Radix).
 */
const inputBase =
  "flex w-full rounded-md border border-input bg-input-background px-3 py-2 font-normal text-foreground shadow-xs ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-normal file:text-foreground placeholder:text-muted-foreground hover:bg-input-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-transparent aria-invalid:border-destructive aria-invalid:focus-visible:border-destructive disabled:cursor-not-allowed disabled:opacity-50";

export const inputVariants = cva(inputBase, {
  variants: {
    size: {
      sm: "h-control-height-sm text-xs",
      /** Cockpit sheets/forms (PAS-2115 / PAS-2346). */
      md: "h-control-height-md text-sm",
      lg: "h-control-height-lg text-base md:text-sm",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type InputVariantProps = VariantProps<typeof inputVariants>;
