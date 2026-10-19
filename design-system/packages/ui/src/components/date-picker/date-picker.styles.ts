import { cva, type VariantProps } from "class-variance-authority";

/**
 * Trigger do DatePicker — alinhado visualmente ao Input do PRIZM.
 * Tamanhos espelham Input (`sm` | `md` | `default` | `lg`).
 */
export const datePickerTriggerVariants = cva(
  "inline-flex items-center justify-between gap-2 rounded-md border border-input bg-input-background px-3 py-2 text-left font-normal " +
    "text-foreground shadow-sm ring-offset-background transition-colors " +
    "hover:bg-input-background hover:text-foreground " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:border-input " +
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 " +
    "data-[empty=true]:text-muted-foreground",
  {
    variants: {
      fullWidth: {
        true: "w-full min-w-0",
        false: "w-auto",
      },
      size: {
        sm: "h-control-height-sm text-xs",
        md: "h-control-height-md text-sm border-input bg-input-background text-foreground shadow-xs hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-transparent data-[empty=true]:text-muted-foreground disabled:bg-muted disabled:text-muted-foreground disabled:opacity-100",
        default: "h-control-height-lg text-base md:text-sm",
        lg: "h-12 text-base",
      },
    },
    defaultVariants: {
      fullWidth: true,
      size: "md",
    },
  },
);

export type DatePickerTriggerVariantProps = VariantProps<typeof datePickerTriggerVariants>;
