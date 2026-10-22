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
 * Inside a filled Button it inverts its colors (see the base classes below).
 *
 * @see https://ui.shadcn.com/docs/components/radix/badge
 */
export const badgeVariants = cva(
  [
    "inline-flex w-fit items-center whitespace-nowrap rounded-md border font-semibold leading-none",
    "px-2 py-0.5",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
    // Inside a filled Button (default, destructive) the badge inverts: the
    // button's text color as background and the button's color as text. A
    // default badge (bg-primary) on a primary button would vanish. On neutral
    // buttons (secondary, outline, ghost, link, text) it keeps its own colors.
    // Contrast of the number: 4.88–13.41:1 on default, 4.53–5.84:1 on destructive.
    "[[data-slot=button][data-variant=default]_&]:border-transparent [[data-slot=button][data-variant=default]_&]:bg-primary-foreground [[data-slot=button][data-variant=default]_&]:text-primary [[data-slot=button][data-variant=default]_&]:shadow-none",
    "[[data-slot=button][data-variant=destructive]_&]:border-transparent [[data-slot=button][data-variant=destructive]_&]:bg-destructive-foreground [[data-slot=button][data-variant=destructive]_&]:text-destructive [[data-slot=button][data-variant=destructive]_&]:shadow-none",
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
