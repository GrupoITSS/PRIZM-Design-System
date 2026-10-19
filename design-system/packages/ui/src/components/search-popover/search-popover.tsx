import { cn } from "../../lib/cn";
import { Popover as RadixPopover } from "radix-ui";
import * as React from "react";
import { popoverContentBase } from "../popover/popover.styles";
import type { SearchPopoverProps } from "./search-popover.types";

/**
 * Popover para campos de busca com lista de sugestões.
 *
 * Usa `Popover.Anchor` (sem trigger toggle) para não fechar ao clicar no input.
 * O Radix dispara `onOpenChange(false)` em clique fora — integra com drawers
 * que reconhecem `[data-slot="popover-content"]`.
 */
const SearchPopover = ({
  anchor,
  children,
  className,
  align = "start",
  side = "bottom",
  sideOffset = 4,
  portalContainer,
  modal = false,
  ref,
  ...rootProps
}: SearchPopoverProps & { ref?: React.Ref<React.ComponentRef<typeof RadixPopover.Content>> }) => {
  return (
    <div className="relative w-full">
      <RadixPopover.Root modal={modal} {...rootProps}>
        <RadixPopover.Anchor asChild>{anchor}</RadixPopover.Anchor>
        <RadixPopover.Portal container={portalContainer ?? undefined}>
          <RadixPopover.Content
            ref={ref}
            data-slot="popover-content"
            align={align}
            side={side}
            sideOffset={sideOffset}
            onOpenAutoFocus={(event) => event.preventDefault()}
            className={cn(
              popoverContentBase,
              "w-[var(--radix-popover-anchor-width)] min-w-[var(--radix-popover-anchor-width)] max-w-[var(--radix-popover-anchor-width)] max-h-[280px] overflow-y-auto overflow-x-hidden p-0",
              className,
            )}
          >
            {children}
          </RadixPopover.Content>
        </RadixPopover.Portal>
      </RadixPopover.Root>
    </div>
  );
};

SearchPopover.displayName = "SearchPopover";

export { SearchPopover };
