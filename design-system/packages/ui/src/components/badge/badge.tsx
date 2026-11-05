import { cn } from "../../lib/cn";
import * as React from "react";
import { Slot } from "radix-ui";
import { badgeVariants } from "./badge.styles";
import type { BadgeProps } from "./badge.types";

/**
 * Badge — small label for statuses, counters or metadata.
 *
 * - `variant`: `default` | `secondary` | `outline` | `destructive` | `verified` (as in Figma)
 * - `shape`: `default` | `number` (round counter for digits)
 * - `startIcon` / `endIcon`: icons with data-icon="inline-start" / "inline-end"
 * - `asChild`: Badge link, rendered as the child `<a>`, with hover and focus (DS-63)
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
  children,
  ref,
  ...props
}: BadgeProps & { ref?: React.Ref<HTMLDivElement> }) => {
  const Comp = asChild ? Slot.Root : "div";
  const content = asChild ? <Slot.Slottable>{children}</Slot.Slottable> : children;
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

export { Badge };
