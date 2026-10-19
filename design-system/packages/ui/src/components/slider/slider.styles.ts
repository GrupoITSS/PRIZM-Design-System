import { cva, type VariantProps } from "class-variance-authority";

/**
 * PRIZM Slider — controle de valor contínuo com suporte a tema e tokens.
 *
 * Usa tokens de `@grupoitss/prizm-tokens` para cores (`bg-secondary`, `bg-primary`, etc.)
 * e funciona em modo claro/escuro via variáveis CSS.
 *
 * @see https://ui.shadcn.com/docs/components/slider
 */
export const sliderRootVariants = cva(
  "relative flex w-full touch-none select-none items-center disabled:cursor-not-allowed data-[disabled]:cursor-not-allowed",
  {
    variants: {
      size: {
        default: "h-5",
        sm: "h-4",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

export const sliderTrackVariants = cva(
  "relative w-full grow overflow-hidden rounded-full bg-secondary",
  {
    variants: {
      size: {
        default: "h-2",
        sm: "h-1.5",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

export const sliderThumbVariants = cva(
  "block rounded-full border-2 border-primary bg-background ring-offset-background transition-colors shadow-sm " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 " +
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 data-[disabled]:cursor-not-allowed",
  {
    variants: {
      size: {
        default: "h-5 w-5",
        sm: "h-4 w-4",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

export type SliderSize = "default" | "sm";

export type SliderVariantProps = VariantProps<typeof sliderRootVariants>;
