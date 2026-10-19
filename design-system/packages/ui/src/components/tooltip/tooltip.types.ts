import type * as React from "react";
import type { Tooltip as TooltipPrimitive } from "radix-ui";

/**
 * Props forwarded to the Radix Tooltip Content (placement, collision, etc.).
 * Used for the content wrapper when passing contentProps.
 */
export type TooltipContentProps = React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>;

export interface TooltipProps
  extends
    Pick<
      React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Root>,
      "defaultOpen" | "onOpenChange"
    >,
    Pick<
      TooltipContentProps,
      | "side"
      | "sideOffset"
      | "align"
      | "alignOffset"
      | "avoidCollisions"
      | "collisionBoundary"
      | "collisionPadding"
      | "arrowPadding"
      | "sticky"
      | "hideWhenDetached"
    > {
  /**
   * Tooltip content (text or React node). Shown on hover/focus of the trigger.
   * @example "Save your changes"
   */
  content: React.ReactNode;
  /**
   * Trigger element (e.g. Button or icon). Receives hover/focus to show the tooltip.
   * @example <Button variant="outline">Hover me</Button>
   */
  children: React.ReactNode;
  /**
   * Optional delay in ms before showing the tooltip. Applied via internal Provider.
   * @default 200 (Radix default)
   */
  delayDuration?: number;
  /**
   * Optional delay in ms before hiding when moving to next trigger (skip delay).
   * @default 300 (Radix default)
   */
  skipDelayDuration?: number;
  /**
   * Optional class name for the tooltip content wrapper (popover bubble).
   */
  contentClassName?: string;
  /**
   * Element to portal tooltip content into. Defaults to `document.body` when omitted.
   * Use the shadow-root overlay container in embedded widgets so stacking and theme tokens match the app surface.
   */
  portalContainer?: HTMLElement | null;
}
