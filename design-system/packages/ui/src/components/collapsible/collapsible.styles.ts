import { cva, type VariantProps } from "class-variance-authority";

/**
 * PRIZM Collapsible — trigger button styles.
 * Uses design tokens from @grupoitss/prizm-tokens.
 *
 * @see https://ui.shadcn.com/docs/components/collapsible
 * @see https://www.radix-ui.com/docs/primitives/components/collapsible
 */
export const collapsibleTriggerVariants = cva(
  [
    "flex items-center justify-between gap-2 rounded-md px-4 py-2 text-sm font-medium",
    "bg-transparent transition-colors",
    "hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "",
        ghost: "hover:bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export type CollapsibleTriggerVariantProps = VariantProps<typeof collapsibleTriggerVariants>;

/**
 * Collapsible content wrapper — animated expand/collapse.
 */
export const collapsibleContentStyles = [
  "overflow-hidden",
  "data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down",
].join(" ");
