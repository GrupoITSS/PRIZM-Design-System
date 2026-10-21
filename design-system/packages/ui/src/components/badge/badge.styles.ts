import { cva, type VariantProps } from "class-variance-authority";

/**
 * PRIZM Badge — styles use the @grupoitss/prizm-tokens colors (`bg-primary`).
 *
 * `variant` is the semantic color. `appearance` is the surface:
 * contained (solid), outlined (tinted toward the color), text (icon color, theme text).
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
        default: "",
        primary: "",
        secondary: "",
        success: "",
        warning: "",
        info: "",
        verified: "",
        violet: "",
        destructive: "",
        outline: "",
      },
      appearance: {
        contained: "",
        outlined: "",
        text: "",
      },
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
    compoundVariants: [
      {
        appearance: "contained",
        variant: "default",
        // Figma "Default" is bound to `color/primary` (the old @pas/ui contrast color was wrong).
        class: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
      },
      {
        appearance: "contained",
        variant: "primary",
        class: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
      },
      {
        appearance: "contained",
        variant: "secondary",
        class: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
      },
      {
        appearance: "contained",
        variant: "success",
        class: "border-transparent bg-success text-success-foreground hover:bg-success/80",
      },
      {
        appearance: "contained",
        variant: "warning",
        class: "border-transparent bg-warning text-warning-foreground hover:bg-warning/80",
      },
      {
        appearance: "contained",
        variant: "info",
        class: "border-transparent bg-info text-info-foreground hover:bg-info/80",
      },
      {
        // Figma "Verified": the info tone (`color/info`), used with a check icon.
        appearance: "contained",
        variant: "verified",
        class: "border-transparent bg-info text-info-foreground hover:bg-info/80",
      },
      {
        appearance: "outlined",
        variant: "verified",
        class: "border-info/40 bg-info-weak text-info-strong",
      },
      {
        appearance: "text",
        variant: "verified",
        class: "border-transparent bg-transparent text-foreground [&_[data-icon]]:text-info",
      },
      {
        appearance: "contained",
        variant: "violet",
        // No violet token in @grupoitss/prizm-tokens: Tailwind's palette for now.
        class: "border-transparent bg-violet-600 text-white hover:bg-violet-600/80",
      },
      {
        appearance: "contained",
        variant: "destructive",
        class:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
      },
      {
        appearance: "contained",
        variant: "outline",
        class: "border-border bg-background text-foreground",
      },
      {
        appearance: "outlined",
        variant: "default",
        class: "border-foreground/25 bg-foreground/5 text-foreground",
      },
      {
        appearance: "outlined",
        variant: "primary",
        class: "border-primary/40 bg-primary-weak text-primary-strong",
      },
      {
        appearance: "outlined",
        variant: "secondary",
        class: "border-border bg-secondary text-secondary-foreground",
      },
      {
        appearance: "outlined",
        variant: "success",
        class: "border-success/40 bg-success-weak text-success-strong",
      },
      {
        appearance: "outlined",
        variant: "warning",
        class: "border-warning/40 bg-warning-weak text-warning-strong",
      },
      {
        appearance: "outlined",
        variant: "info",
        class: "border-info/40 bg-info-weak text-info-strong",
      },
      {
        appearance: "outlined",
        variant: "violet",
        class: "border-violet-600/40 bg-violet-600/10 text-violet-600",
      },
      {
        appearance: "outlined",
        variant: "destructive",
        class: "border-destructive/40 bg-destructive-weak text-destructive-strong",
      },
      {
        appearance: "text",
        variant: "default",
        class: "border-transparent bg-transparent text-foreground [&_[data-icon]]:text-foreground",
      },
      {
        appearance: "text",
        variant: "primary",
        class: "border-transparent bg-transparent text-foreground [&_[data-icon]]:text-primary",
      },
      {
        appearance: "text",
        variant: "secondary",
        class:
          "border-transparent bg-transparent text-foreground [&_[data-icon]]:text-muted-foreground",
      },
      {
        appearance: "text",
        variant: "success",
        class: "border-transparent bg-transparent text-foreground [&_[data-icon]]:text-success",
      },
      {
        appearance: "text",
        variant: "warning",
        class: "border-transparent bg-transparent text-foreground [&_[data-icon]]:text-warning",
      },
      {
        appearance: "text",
        variant: "info",
        class: "border-transparent bg-transparent text-foreground [&_[data-icon]]:text-info",
      },
      {
        appearance: "text",
        variant: "violet",
        class: "border-transparent bg-transparent text-foreground [&_[data-icon]]:text-violet-600",
      },
      {
        appearance: "text",
        variant: "destructive",
        class: "border-transparent bg-transparent text-foreground [&_[data-icon]]:text-destructive",
      },
    ],
    defaultVariants: {
      variant: "default",
      appearance: "contained",
      size: "sm",
      shape: "default",
    },
  },
);

export type BadgeVariantProps = VariantProps<typeof badgeVariants>;
