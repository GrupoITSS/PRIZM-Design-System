import { cva, type VariantProps } from "class-variance-authority";

/**
 * Trigger do DatePicker — alinhado visualmente ao Input do PRIZM.
 * Tamanhos, foco e disabled espelham o Input (`sm` | `md` | `lg`, decisões de 21/10/2026).
 * `ring-offset-0` anula o espaço do anel que o Button (gatilho) traz.
 */
export const datePickerTriggerVariants = cva(
  "inline-flex items-center justify-between gap-2 rounded-md border border-input bg-input-background px-3 py-2 text-left font-normal " +
    "text-foreground shadow-xs ring-offset-background transition-colors " +
    "hover:bg-accent hover:text-foreground " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 focus-visible:border-transparent " +
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:border-transparent disabled:shadow-none disabled:bg-muted disabled:text-muted-foreground disabled:opacity-100 " +
    "data-[empty=true]:text-muted-foreground",
  {
    variants: {
      fullWidth: {
        true: "w-full min-w-0",
        false: "w-auto",
      },
      size: {
        sm: "h-control-height-sm text-xs",
        md: "h-control-height-md text-sm",
        lg: "h-control-height-lg text-base md:text-sm",
      },
    },
    defaultVariants: {
      fullWidth: true,
      size: "md",
    },
  },
);

export type DatePickerTriggerVariantProps = VariantProps<typeof datePickerTriggerVariants>;
