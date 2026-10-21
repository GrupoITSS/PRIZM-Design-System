import { cva, type VariantProps } from "class-variance-authority";

/**
 * PRIZM Badge — styles use the @grupoitss/prizm-tokens colors (`bg-primary`).
 *
 * The variants are the ones in the Figma component (`[PRIZM] Componentes`, Badge): `default`,
 * `secondary`, `outline`, `destructive`, `verified` and `success`. `outline` follows the Figma Button outline
 * (`input-background`, `input` border, `shadow-xs`, hover on `accent`). Other colors come from
 * `className`, as in shadcn's "Custom Colors" (e.g. `bg-success text-success-foreground`).
 *
 * @see https://ui.shadcn.com/docs/components/radix/badge
 */
export const badgeVariants = cva(
  [
    "inline-flex w-fit items-center whitespace-nowrap rounded-md border font-semibold leading-none",
    "px-2 py-0.5 transition-colors",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
    "focus-visible:outline-none",
  ].join(" "),
  {
    variants: {
      variant: {
        // Figma "Default" is bound to `color/primary`.
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        // Same tokens as the Figma Button outline.
        outline:
          "border-input bg-input-background text-foreground shadow-xs hover:bg-accent hover:text-accent-foreground",
        // Figma "Verified": the info tone (`color/info`), used with a check icon.
        verified: "border-transparent bg-info text-info-foreground hover:bg-info/80",
        success: "border-transparent bg-success text-success-foreground hover:bg-success/80",
      },
      // The Figma component has a single size for now (20px high, from padding + line).
      size: {
        default: "h-5 gap-1 text-xs [&_svg:not([class*='size-'])]:size-3",
      },
      // `number` is the Figma "Badge Number": a round counter (min 20px wide) for digits.
      shape: {
        default: "",
        number: "min-w-5 justify-center rounded-full px-1 tabular-nums",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      shape: "default",
    },
  },
);

export type BadgeVariantProps = VariantProps<typeof badgeVariants>;
