import { cn } from "../../lib/cn";
import { Popover as RadixPopover } from "radix-ui";
import * as React from "react";
import { popoverContentVariants } from "./popover.styles";
import type { PopoverProps } from "./popover.types";

/**
 * Floating panel anchored to a trigger element.
 *
 * **API simplificada (preferida):**
 * ```tsx
 * <Popover
 *   trigger={<Button>Open</Button>}
 *   content={<div>Popover content</div>}
 * />
 * ```
 *
 * Baseado no Popover do shadcn/ui (Radix), mas exposto como
 * componente único baseado em props (sem subcomponentes públicos).
 *
 * @see https://ui.shadcn.com/docs/components/radix/popover
 */
const Popover = ({
  trigger,
  content,
  className,
  size = "md",
  align = "center",
  side = "bottom",
  sideOffset = 4,
  collisionPadding = 8,
  portalContainer,
  onEscapeKeyDown,
  ref,
  ...rootProps
}: PopoverProps & { ref?: React.Ref<React.ComponentRef<typeof RadixPopover.Content>> }) => {
  return (
    <RadixPopover.Root {...rootProps}>
      <RadixPopover.Trigger asChild>{trigger}</RadixPopover.Trigger>
      <RadixPopover.Portal container={portalContainer ?? undefined}>
        <RadixPopover.Content
          ref={ref}
          data-slot="popover-content"
          align={align}
          side={side}
          sideOffset={sideOffset}
          collisionPadding={collisionPadding}
          onEscapeKeyDown={onEscapeKeyDown}
          className={cn(
            popoverContentVariants({ size }),
            "max-h-[var(--radix-popover-content-available-height)] overflow-y-auto",
            className,
          )}
        >
          {content}
        </RadixPopover.Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  );
};

Popover.displayName =
  RadixPopover.Root.displayName ?? RadixPopover.Content.displayName ?? "Popover";

export { Popover };
