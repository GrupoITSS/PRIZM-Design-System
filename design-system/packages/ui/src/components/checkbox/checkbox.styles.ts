import { cva, type VariantProps } from "class-variance-authority";

/**
 * PRIZM Checkbox — root styles aligned with shadcn/ui.
 * Radix Checkbox.Root renders a <button>; we reset native button styles and use
 * border-input when unchecked, primary when checked. Uses design tokens from @grupoitss/prizm-tokens.
 *
 * @see https://ui.shadcn.com/docs/components/checkbox
 * @see https://www.radix-ui.com/docs/primitives/components/checkbox
 */
export const checkboxRootVariants = cva(
  [
    "peer grid shrink-0 place-content-center rounded-[4px] border border-input",
    "bg-background transition-colors",
    /* 1px internal padding so the check icon sits inset from the border */
    "p-px",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
    "data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground",
    /* Reset native <button> appearance */
    "cursor-pointer appearance-none",
  ].join(" "),
  {
    variants: {
      size: {
        /* 16px total = 14px inner + 2×1px padding */
        default: "h-4 w-4 min-h-4 min-w-4",
        /* 14px total = 12px inner + 2×1px padding */
        sm: "h-[14px] w-[14px] min-h-[14px] min-w-[14px]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

export type CheckboxVariantProps = VariantProps<typeof checkboxRootVariants>;

/**
 * Checkbox indicator — icon container when checked. Only rendered when checked.
 * Uses tw-animate for the "pop" effect like shadcn.
 */
export const checkboxIndicatorStyles = [
  "grid place-content-center text-current",
  "animate-in zoom-in-50 duration-200",
].join(" ");

/**
 * Check icon — 14×14px, flex-shrink: 0, aspect-ratio 1/1.
 */
export const checkboxIconStyles =
  "size-3.5 shrink-0 aspect-square [&_svg]:size-full [&_svg]:shrink-0";
