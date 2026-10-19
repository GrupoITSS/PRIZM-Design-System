import { cva, type VariantProps } from "class-variance-authority";

/**
 * PRIZM Input — estilos base usando tokens de `@grupoitss/prizm-tokens`.
 * Compatível com tema claro/escuro via variáveis CSS.
 *
 * Baseado no componente Input do shadcn/ui (Radix).
 */
const inputBase =
  "flex w-full rounded-md border border-input bg-input-background px-3 py-2 font-normal text-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-normal file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:border-input disabled:cursor-not-allowed disabled:opacity-50";

export const inputVariants = cva(inputBase, {
  variants: {
    size: {
      sm: "h-control-height-sm text-xs",
      /** Cockpit sheets/forms (PAS-2115 / PAS-2346). */
      md: "h-control-height-md text-sm border-input bg-input-background text-foreground font-normal placeholder:text-muted-foreground shadow-xs hover:bg-input-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-transparent disabled:border-transparent disabled:shadow-none disabled:bg-muted disabled:!text-muted-foreground disabled:placeholder:!text-muted-foreground disabled:opacity-100",
      default: "h-control-height-lg text-base md:text-sm",
      lg: "h-12 text-base",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type InputVariantProps = VariantProps<typeof inputVariants>;
