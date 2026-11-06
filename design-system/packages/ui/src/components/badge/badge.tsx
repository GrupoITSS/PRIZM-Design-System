import { cn } from "../../lib/cn";
import * as React from "react";
import { Slot } from "radix-ui";
import {
  badgeDotPulse,
  badgeDotVariants,
  badgeVariants,
  type BadgeDotVariant,
} from "./badge.styles";
import type { BadgeProps } from "./badge.types";

/**
 * Badge — small label for statuses, counters or metadata.
 *
 * - `variant`: `default` | `secondary` | `outline` | `destructive` | `verified` (as in Figma)
 * - `shape`: `default` | `number` (round counter for digits)
 * - `startIcon` / `endIcon`: icons with data-icon="inline-start" / "inline-end"
 * - `asChild`: Badge link, rendered as the child `<a>`, with hover and focus (DS-63)
 * - `shape="dot"`: 8px point, `children` read only by screen readers; `pulse` for in progress (DS-66)
 *
 * @see https://ui.shadcn.com/docs/components/radix/badge
 */
const Badge = ({
  className,
  variant,
  size,
  shape,
  loading,
  startIcon,
  endIcon,
  asChild = false,
  pulse = false,
  children,
  ref,
  ...props
}: BadgeProps & { ref?: React.Ref<HTMLDivElement> }) => {
  if (shape === "dot") {
    return (
      <BadgeDot
        ref={ref}
        variant={variant}
        pulse={pulse}
        className={className}
        {...props}
      >
        {children}
      </BadgeDot>
    );
  }
  const Comp = asChild ? Slot.Root : "div";
  const content = asChild ? (
    <Slot.Slottable>{children}</Slot.Slottable>
  ) : (
    children
  );
  return (
    <Comp
      ref={ref}
      data-slot="badge"
      data-variant={variant}
      data-loading={loading ? "" : undefined}
      aria-busy={loading || undefined}
      className={cn(
        badgeVariants({ variant, size, shape }),
        loading && "opacity-80",
        className,
      )}
      {...props}
    >
      {Boolean(startIcon) && (
        <span
          data-icon="inline-start"
          className="inline-flex shrink-0 items-center justify-center [&_svg]:block"
        >
          {startIcon}
        </span>
      )}
      {content}
      {Boolean(endIcon) && (
        <span data-icon="inline-end" className="inline-flex shrink-0">
          {endIcon}
        </span>
      )}
    </Comp>
  );
};
Badge.displayName = "Badge";

const DOT_VARIANTS = new Set<string>([
  "default",
  "destructive",
  "success",
  "warning",
  "verified",
]);

// The dot has no visible content: children is the screen reader's text (WCAG 1.1.1 and 1.4.1).
function BadgeDot({
  variant,
  pulse,
  className,
  children,
  ref,
  ...props
}: Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> & {
  variant: string;
  pulse: boolean;
  children?: React.ReactNode;
  ref?: React.Ref<HTMLDivElement>;
}) {
  const valid = DOT_VARIANTS.has(variant);
  const named =
    Boolean(children) ||
    Boolean(props["aria-label"]) ||
    Boolean(props["aria-labelledby"]);
  React.useEffect(() => {
    if (process.env.NODE_ENV === "production") return;
    if (!valid) {
      console.warn(
        `Badge: shape="dot" não existe em variant="${variant}" (sem contraste de 3:1). Use default, destructive, success, warning ou verified.`,
      );
    }
    if (!named) {
      console.warn(
        "Badge: dot sem texto para o leitor de tela. Passe o texto em children.",
      );
    }
  }, [valid, named, variant]);

  return (
    <span
      ref={ref}
      data-slot="badge"
      data-shape="dot"
      data-variant={variant}
      className={cn(
        badgeDotVariants({
          variant: valid ? (variant as BadgeDotVariant) : "default",
        }),
        className,
      )}
      {...props}
    >
      {pulse ? (
        <span
          data-slot="badge-pulse"
          aria-hidden="true"
          className={badgeDotPulse}
        />
      ) : null}
      {children ? <span className="sr-only">{children}</span> : null}
    </span>
  );
}

export { Badge };
