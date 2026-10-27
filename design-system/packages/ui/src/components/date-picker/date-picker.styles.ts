import { cva, type VariantProps } from "class-variance-authority";

/**
 * Trigger do DatePicker — alinhado visualmente ao Input do PRIZM.
 * Tamanhos, foco e disabled (opacidade 50%, 26/10/2026) espelham o Input (`sm` | `md` | `lg`, decisões de 21/10/2026).
 * `ring-offset-0` anula o espaço do anel que o Button (gatilho) traz.
 */
export const datePickerTriggerVariants = cva(
  "inline-flex items-center justify-between gap-2 rounded-md border border-input bg-input-background px-3 py-2 text-left font-normal " +
    "text-foreground shadow-xs ring-offset-background transition-colors " +
    // Sem hover no campo, como o Input, o Select e o Textarea (D3, 27/10/2026): anula o hover do Button outline.
    "hover:bg-input-background hover:text-foreground " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 focus-visible:border-transparent " +
    // Calendário aberto = foco (D4); erro com aria-invalid, como o Select (D2).
    "data-[state=open]:ring-2 data-[state=open]:ring-ring data-[state=open]:border-transparent " +
    "aria-invalid:border-destructive aria-invalid:focus-visible:border-destructive aria-invalid:data-[state=open]:border-destructive " +
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 " +
    "data-[empty=true]:text-muted-foreground data-[empty=true]:hover:text-muted-foreground",
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
