import { cva, type VariantProps } from "class-variance-authority";

/**
 * PRIZM ButtonGroup — estilos base usando tokens de @grupoitss/prizm-tokens.
 * Agrupa botões com bordas compartilhadas e suporte a orientação horizontal/vertical.
 *
 * @see https://ui.shadcn.com/docs/components/radix/button-group
 */
const buttonGroupBase =
  "flex w-fit items-stretch has-[>[data-slot=button-group]]:gap-2 [&>*]:focus-visible:relative [&>*]:focus-visible:z-10 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-md [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1";

export const buttonGroupVariants = cva(buttonGroupBase, {
  variants: {
    orientation: {
      horizontal:
        "[&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0 [&>*:not(:last-child)]:rounded-r-none",
      vertical:
        "flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:last-child)]:rounded-b-none",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

export type ButtonGroupVariantProps = VariantProps<typeof buttonGroupVariants>;

/** Classes para o texto/label dentro do grupo (ButtonGroupText). */
export const buttonGroupTextClass =
  "bg-muted shadow-xs flex items-center gap-2 rounded-md border px-4 text-sm font-medium [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none";

/**
 * Classes para o separador dentro do grupo (ButtonGroupSeparator).
 * Usa primary-foreground/20 para ficar visível sobre fundos sólidos (primary, destructive, etc.).
 */
export const buttonGroupSeparatorClass =
  "bg-primary-foreground/20 relative !m-0 self-stretch min-w-px min-h-px";
