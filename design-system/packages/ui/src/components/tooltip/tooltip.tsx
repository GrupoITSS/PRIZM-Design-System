import { cn } from "../../lib/cn";
import { Tooltip as TooltipPrimitive } from "radix-ui";
import { tooltipContentStyles } from "./tooltip.styles";
import type { TooltipProps } from "./tooltip.types";

/**
 * Tooltip — shows a short hint on hover/focus of the trigger.
 *
 * **API por props:** Use `content` e `children` (trigger). Ex.: `<Tooltip content="Salvar"> <Button>Hover</Button> </Tooltip>`.
 *
 * @see [Tooltip — shadcn/ui (Radix)](https://ui.shadcn.com/docs/components/tooltip)
 */
function Tooltip({
  content,
  children,
  delayDuration = 200,
  skipDelayDuration = 300,
  side = "top",
  sideOffset = 4,
  contentClassName,
  align,
  alignOffset,
  avoidCollisions,
  collisionBoundary,
  collisionPadding,
  arrowPadding,
  sticky,
  hideWhenDetached,
  portalContainer,
  ...rootProps
}: TooltipProps) {
  return (
    <TooltipPrimitive.Provider delayDuration={delayDuration} skipDelayDuration={skipDelayDuration}>
      <TooltipPrimitive.Root {...rootProps}>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal container={portalContainer ?? undefined}>
          <TooltipPrimitive.Content
            side={side}
            sideOffset={sideOffset}
            align={align}
            alignOffset={alignOffset}
            avoidCollisions={avoidCollisions}
            collisionBoundary={collisionBoundary}
            collisionPadding={collisionPadding}
            arrowPadding={arrowPadding}
            sticky={sticky}
            hideWhenDetached={hideWhenDetached}
            className={cn(tooltipContentStyles, contentClassName)}
          >
            {content}
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}

Tooltip.displayName = "Tooltip";

export { Tooltip };
