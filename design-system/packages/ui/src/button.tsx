import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { LoaderCircle } from "lucide-react";
import { cn } from "./lib/cn";

// Colors, heights, radius, font and shadow come from the design tokens (CSS
// custom properties), so the same button follows the active brand, product
// and mode set by the data-* attributes on an ancestor. Spacing, font sizes
// and opacities are primitives, which aren't emitted as custom properties;
// Tailwind's default scale has the same values.
//
// Figma states map to CSS, not props: Hover → :hover, Focus → :focus-visible,
// Pressed → :active, Disabled → :disabled. Loading is the `loading` prop.
export const buttonVariants = cva(
  [
    "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md font-sans text-sm font-medium outline-none",
    "transition-[color,background-color,box-shadow,opacity]",
    "focus-visible:ring-[3px] focus-visible:ring-ring",
    "active:opacity-60",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-input-background text-foreground shadow-(--style-shadow-xs) hover:bg-accent hover:text-accent-foreground",
        ghost: "text-foreground hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        warning: "bg-warning text-warning-foreground hover:bg-warning/90",
      },
      // Icon buttons are square at the same control height as text buttons.
      size: {
        default: "h-(--control-height-md) px-4",
        sm: "h-(--control-height-sm) px-3 text-xs",
        lg: "h-(--control-height-lg) px-6",
        icon: "size-(--control-height-md)",
        "icon-sm": "size-(--control-height-sm)",
        "icon-lg": "size-(--control-height-lg)",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

// ComponentProps<"button"> includes `ref` (a regular prop since React 19).
export interface ButtonProps extends ComponentProps<"button">, VariantProps<typeof buttonVariants> {
  /** Disables the button and shows a spinner (in place of the icon, on icon sizes). */
  loading?: boolean;
}

export function Button({
  className,
  variant,
  size,
  loading = false,
  disabled,
  type = "button",
  children,
  ...other
}: ButtonProps) {
  const iconOnly = size?.startsWith("icon") ?? false;

  return (
    <button
      aria-busy={loading || undefined}
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled || loading}
      type={type}
      {...other}
    >
      {loading ? <LoaderCircle aria-hidden="true" className="animate-spin" /> : null}
      {loading && iconOnly ? null : children}
    </button>
  );
}
