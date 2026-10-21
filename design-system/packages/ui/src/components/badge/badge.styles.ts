import { cva, type VariantProps } from "class-variance-authority";

/**
 * PRIZM Badge — styles use the @grupoitss/prizm-tokens colors (`bg-primary`).
 *
 * The variants are the ones in the Figma component (`[PRIZM] Componentes`, Badge): `default`,
 * `secondary`, `outline`, `destructive`, `verified`, `success` and `warning`. `outline` follows the
 * Figma Button outline (`input-background`, `input` border, `shadow-xs`). Other
 * colors come from `className`, as in shadcn's "Custom Colors" (e.g. `bg-info-weak text-info-strong`).
 *
 * The Badge is static: no hover and no focus, only the default state (Figma, 21/10/2026).
 *
 * @see https://ui.shadcn.com/docs/components/radix/badge
 */
export const badgeVariants = cva(
  [
    "inline-flex w-fit items-center whitespace-nowrap rounded-md border font-semibold leading-none",
    "px-2 py-0.5",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        // Figma "Default" is bound to `color/primary`.
        default: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive: "border-transparent bg-destructive text-destructive-foreground",
        // Same tokens as the Figma Button outline.
        outline: "border-input bg-input-background text-foreground shadow-xs",
        // Figma "Verified": the info tone (`color/info`), used with a check icon.
        verified: "border-transparent bg-info text-info-foreground",
        success: "border-transparent bg-success text-success-foreground",
        warning: "border-transparent bg-warning text-warning-foreground",
      },
      // Same sizes in Figma (Size = sm, md, lg): height/5, height/6 and height/7.
      size: {
        sm: "h-5 gap-1 text-xs [&_svg:not([class*='size-'])]:size-3",
        md: "h-6 gap-1.5 text-xs [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-7 gap-2 text-sm [&_svg:not([class*='size-'])]:size-4",
      },
      // `number` is the Figma "Badge Number": a round counter (min 20px wide) for digits.
      shape: {
        default: "",
        number: "min-w-5 justify-center rounded-full px-1 tabular-nums",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
      shape: "default",
    },
  },
);

export type BadgeVariantProps = VariantProps<typeof badgeVariants>;
