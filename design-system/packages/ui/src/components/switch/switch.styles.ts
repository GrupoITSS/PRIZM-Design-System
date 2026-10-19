import { cva, type VariantProps } from "class-variance-authority";

/**
 * PRIZM Switch — estilos base usando tokens de `@grupoitss/prizm-tokens`.
 * Compatível com tema claro/escuro via variáveis CSS.
 *
 * Baseado no componente Switch do shadcn/ui (Radix).
 */
const switchRootBase =
  "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input";

export const switchRootVariants = cva(switchRootBase, {
  variants: {
    size: {
      sm: "h-5 w-9",
      default: "h-6 w-11",
      lg: "h-7 w-12",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

const switchThumbBase =
  "pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform";

export const switchThumbVariants = cva(switchThumbBase, {
  variants: {
    size: {
      sm: "h-4 w-4 data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
      default: "h-5 w-5 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
      lg: "h-6 w-6 data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-0",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export type SwitchVariantProps = VariantProps<typeof switchRootVariants>;
