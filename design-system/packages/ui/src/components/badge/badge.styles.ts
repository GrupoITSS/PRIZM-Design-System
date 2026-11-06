import { cva, type VariantProps } from "class-variance-authority";

/**
 * PRIZM Badge — styles use the @grupoitss/prizm-tokens colors (`bg-primary`).
 *
 * The variants are the ones in the Figma component (`[PRIZM] Componentes`, Badge): `default`,
 * `secondary`, `outline`, `destructive`, `verified`, `success` and `warning`. `outline` follows the
 * Figma Button outline (`input-background`, `input` border, `shadow-xs`). Other
 * colors come from `className`, as in shadcn's "Custom Colors" (e.g. `bg-info-weak text-info-strong`).
 *
 * Pill shape: `rounded-full` (`radius/full`) in every variant and size, with the same padding
 * (decision of 03/11/2026).
 *
 * The Badge is static: no hover and no focus, only the default state (Figma, 21/10/2026).
 * The exception is the Badge link (`asChild` with an `<a>`, DS-63, 05/11/2026): only there
 * the `[a&]:` classes add hover (the Button rule of the same variant) and the Button focus ring.
 * Inside a filled Button it inverts its colors (see the base classes below). A Badge link never
 * goes inside a Button: a link inside a button is nested interaction (WCAG 4.1.2).
 *
 * @see https://ui.shadcn.com/docs/components/radix/badge
 */
export const badgeVariants = cva(
  [
    "inline-flex w-fit items-center whitespace-nowrap rounded-full border font-semibold leading-none",
    "px-2 py-0.5",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
    // Badge link only (asChild with an <a>): pointer, transition and the Button focus ring.
    "[a&]:cursor-pointer [a&]:outline-none [a&]:transition-[color,background-color,box-shadow]",
    "[a&]:focus-visible:ring-[3px] [a&]:focus-visible:ring-ring [a&]:focus-visible:ring-offset-2 [a&]:focus-visible:ring-offset-ring-offset",
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
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/80",
        // Link hover as in the Button secondary: foreground overlay at 10%.
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-[color-mix(in_oklab,var(--prizm-color-secondary),var(--prizm-color-foreground)_10%)]",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground [a&]:hover:bg-destructive/80",
        // Same tokens as the Figma Button outline.
        outline:
          "border-input bg-input-background text-foreground shadow-xs [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        // Figma "Verified": the info tone (`color/info`), used with a check icon.
        verified:
          "border-transparent bg-info text-info-foreground [a&]:hover:bg-info/80",
        success:
          "border-transparent bg-success text-success-foreground [a&]:hover:bg-success/80",
        warning:
          "border-transparent bg-warning text-warning-foreground [a&]:hover:bg-warning/80",
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
        number: "min-w-5 justify-center px-1 tabular-nums",
        // The dot has its own classes (badgeDotVariants); this value only names the shape.
        dot: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
      shape: "default",
    },
  },
);

/**
 * Badge dot (`shape="dot"`, DS-66, 06/11/2026): an 8px point with no visible content, for an unread
 * notification (`default`), a service in progress (`success`), an action running (`warning`) or an
 * error (`destructive`). Figma: the Badge Dot set.
 *
 * - The 2px ring in `background` is always there: it separates the dot from any surface. On the
 *   colored sidebars of Docnix and Digitrol the tones alone fall to 1,00–2,96:1 (WCAG 1.4.11).
 * - `warning` uses `warning-strong`: `warning` is 1,97–2,15:1 against the light background.
 * - There is no `secondary` or `outline` dot: 1,09–1,37:1, the point would not show.
 * - The text goes in `children`, read only by screen readers (see Badge).
 */
export const badgeDotVariants = cva(
  "relative inline-block size-2 shrink-0 rounded-full ring-2 ring-background",
  {
    variants: {
      variant: {
        default: "bg-primary",
        destructive: "bg-destructive",
        success: "bg-success",
        warning: "bg-warning-strong",
        verified: "bg-info",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

/** The pulse halo: the dot color, growing and fading. Gone with reduced motion (WCAG 2.3.3). */
export const badgeDotPulse =
  "pointer-events-none absolute inset-0 rounded-full bg-inherit opacity-75 motion-safe:animate-ping";

export type BadgeDotVariant = NonNullable<
  VariantProps<typeof badgeDotVariants>["variant"]
>;

export type BadgeVariantProps = VariantProps<typeof badgeVariants>;
