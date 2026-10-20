import { isValidElement, useEffect, type ComponentProps, type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { LoaderCircle } from "lucide-react";
import { Slot } from "radix-ui";
import { cn } from "../../lib/cn";

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
    // The 2px offset in the background color keeps the ring apart from the
    // button: ring is the primary color in every brand, so without the gap it
    // merged with the default variant (1:1) and read as a slightly bigger button.
    "focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-ring-offset",
    "active:opacity-60",
    // aria-disabled is the loading state: it keeps focus on the button, which
    // the disabled attribute drops to <body> (see Button below).
    "disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline:
          "border border-input bg-input-background text-foreground shadow-xs hover:bg-accent hover:text-accent-foreground",
        ghost: "text-foreground hover:bg-accent hover:text-accent-foreground",
        // primary-strong, not primary: brand text on the background has to
        // pass 4.5:1 in dark mode too, and primary doesn't in any brand.
        // Always underlined: against body text it's 1.39–2.72:1, so color
        // alone doesn't set it apart (WCAG 1.4.1). Hover thickens the line.
        link: "text-primary-strong underline underline-offset-4 hover:decoration-2",
        // From @pas/ui: destructive action shown as text (e.g. "Excluir" in a
        // table row), with a ghost hover in the destructive color. Text in a
        // tone's color on the background is the -strong step, as in link.
        text: "text-destructive-strong hover:bg-destructive/10",
      },
      // Icon buttons are square at the same control height as text buttons.
      size: {
        default: "h-control-height-md px-4",
        // xs and icon-xs come from @pas/ui. control-height-xs is 24px in every
        // brand (the WCAG 2.2 minimum target), Digitrol included.
        xs: "h-control-height-xs gap-1 px-2 text-xs [&_svg]:size-3",
        sm: "h-control-height-sm px-3 text-xs",
        lg: "h-control-height-lg px-6",
        icon: "size-control-height-md",
        "icon-xs": "size-control-height-xs [&_svg]:size-3",
        "icon-sm": "size-control-height-sm",
        "icon-lg": "size-control-height-lg",
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
  /**
   * Blocks the button (aria-disabled, keeping focus) and shows a spinner (in
   * place of the icon, on icon sizes).
   */
  loading?: boolean;
  /**
   * Renders the single child element (e.g. a link) with the button's styles
   * instead of a `<button>`. `loading` doesn't add the spinner in this case.
   */
  asChild?: boolean;
}

// A string or number child, or an sr-only element, names an icon button.
function hasTextContent(children: ReactNode): boolean {
  if (Array.isArray(children)) return children.some((child: ReactNode) => hasTextContent(child));
  return (
    (typeof children === "string" && children.trim() !== "") ||
    typeof children === "number" ||
    (isValidElement<{ className?: string }>(children) &&
      (children.props.className?.includes("sr-only") ?? false))
  );
}

export function Button({
  className,
  variant,
  size,
  loading = false,
  disabled,
  type = "button",
  asChild = false,
  children,
  onClick,
  ...other
}: ButtonProps) {
  const iconOnly = size?.startsWith("icon") ?? false;
  const named =
    !iconOnly ||
    Boolean(other["aria-label"] ?? other["aria-labelledby"] ?? other.title) ||
    hasTextContent(children);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production" && !named) {
      console.warn(
        `Button: botão de ícone (size="${size}") sem nome acessível. Passe aria-label, aria-labelledby ou um texto sr-only.`,
      );
    }
  }, [named, size]);

  if (asChild) {
    return (
      <Slot.Root
        aria-busy={loading || undefined}
        className={cn(buttonVariants({ variant, size }), className)}
        data-slot="button"
        onClick={onClick}
        {...other}
      >
        {children}
      </Slot.Root>
    );
  }

  // Loading uses aria-disabled, not disabled: the disabled attribute drops
  // focus to <body> (and it doesn't come back), so a keyboard user who
  // pressed "Salvar" would lose their place. Clicks are blocked here instead,
  // which also stops a submit button from sending the form twice.
  return (
    <button
      aria-busy={loading || undefined}
      aria-disabled={loading || undefined}
      className={cn(buttonVariants({ variant, size }), className)}
      data-slot="button"
      disabled={disabled}
      onClick={(event) => {
        if (loading) {
          event.preventDefault();
          return;
        }
        onClick?.(event);
      }}
      type={type}
      {...other}
    >
      {loading ? <LoaderCircle aria-hidden="true" className="animate-spin" /> : null}
      {loading && iconOnly ? null : children}
    </button>
  );
}
