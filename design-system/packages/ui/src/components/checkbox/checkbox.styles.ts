import { cva, type VariantProps } from "class-variance-authority";

/**
 * PRIZM Checkbox — root styles aligned with shadcn/ui.
 * Radix Checkbox.Root renders a <button>; we reset native button styles and use
 * border-input-strong when unchecked, primary when checked. Uses design tokens from @grupoitss/prizm-tokens.
 *
 * @see https://ui.shadcn.com/docs/components/checkbox
 * @see https://www.radix-ui.com/docs/primitives/components/checkbox
 */
export const checkboxRootVariants = cva(
  [
    "peer relative grid shrink-0 place-content-center rounded-xs border border-input-strong",
    "bg-input-background transition-colors",
    /* 1px internal padding so the check icon sits inset from the border */
    "p-px",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-ring-offset",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
    "data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground",
    /* Error wins over the checked border; the focus ring stays on ring */
    "aria-invalid:border-destructive aria-invalid:data-[state=checked]:border-destructive aria-invalid:data-[state=indeterminate]:border-destructive",
    /* Reset native <button> appearance */
    "cursor-pointer appearance-none",
  ].join(" "),
  {
    variants: {
      size: {
        /* 16px total = 14px inner + 2×1px padding. after: 24px pointer target (WCAG 2.5.8) */
        default: "size-4 min-h-4 min-w-4 after:absolute after:-inset-1 after:content-['']",
        /* 14px total = 12px inner + 2×1px padding. after: 24px pointer target (WCAG 2.5.8) */
        sm: "size-3.5 min-h-3.5 min-w-3.5 after:absolute after:-inset-[5px] after:content-['']",
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
