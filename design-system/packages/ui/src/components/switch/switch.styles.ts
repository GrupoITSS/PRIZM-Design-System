import { cva, type VariantProps } from "class-variance-authority";

/**
 * PRIZM Switch — estilos base usando tokens de `@grupoitss/prizm-tokens`.
 * Compatível com tema claro/escuro via variáveis CSS.
 *
 * Baseado no componente Switch do shadcn/ui (Radix).
 */
const switchRootBase = [
  "peer relative inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors",
  // Foco igual ao do Checkbox: anel separado por 2px de ring-offset
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-ring-offset",
  "disabled:cursor-not-allowed disabled:opacity-50",
  // Trilho desligado em input, como os campos (exceção ao 3:1 decidida em 03/11)
  "data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
  // Erro: a borda de 2px fica destructive, também ligado; o anel continua ring
  "aria-invalid:border-destructive",
].join(" ");

export const switchRootVariants = cva(switchRootBase, {
  variants: {
    size: {
      // 20px de altura; o after: dá 24px de alvo de ponteiro (WCAG 2.5.8)
      sm: "h-5 w-9 after:absolute after:-inset-0.5 after:content-['']",
      default: "h-6 w-11",
      lg: "h-7 w-12",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

const switchThumbBase =
  "pointer-events-none block rounded-full bg-background ring-0 transition-transform";

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
