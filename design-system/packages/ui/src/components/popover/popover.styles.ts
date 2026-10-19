import { cva, type VariantProps } from "class-variance-authority";

/**
 * PRIZM Popover — styles use design tokens from @grupoitss/prizm-tokens.
 * Compatible with light/dark mode via :root and .dark CSS variables.
 *
 * Baseado no Popover do shadcn/ui (Radix).
 *
 * @see https://ui.shadcn.com/docs/components/radix/popover
 */
export const popoverContentBase =
  "z-[200] rounded-md border border-border bg-popover text-popover-foreground shadow-md outline-none " +
  "data-[state=open]:animate-in data-[state=closed]:animate-out " +
  "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 " +
  "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 " +
  "data-[side=bottom]:slide-in-from-top-2 " +
  "data-[side=left]:slide-in-from-right-2 " +
  "data-[side=right]:slide-in-from-left-2 " +
  "data-[side=top]:slide-in-from-bottom-2 " +
  "origin-[--radix-popover-content-transform-origin]";

export const popoverContentVariants = cva(popoverContentBase, {
  variants: {
    /**
     * Optional width presets for the popover content.
     * @default "md"
     */
    size: {
      /** Menus de ação (⋮) — padding interno nos itens do consumer. */
      sm: "w-56 p-1",
      md: "w-72 p-4",
      lg: "w-96 p-4",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type PopoverVariantProps = VariantProps<typeof popoverContentVariants>;
