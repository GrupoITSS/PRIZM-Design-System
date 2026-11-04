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
  contentProps,
  ref,
  ...rootProps
}: PopoverProps & { ref?: React.Ref<React.ComponentRef<typeof RadixPopover.Content>> }) => {
  // O conteúdo é role="dialog": sem nome, o leitor de tela anuncia só "diálogo" (WCAG 4.1.2).
  const named = Boolean(contentProps?.["aria-label"] ?? contentProps?.["aria-labelledby"]);
  const onOpenAutoFocus: React.ComponentProps<typeof RadixPopover.Content>["onOpenAutoFocus"] = (
    event,
  ) => {
    if (process.env.NODE_ENV !== "production" && !named) {
      console.warn(
        "Popover: painel sem nome acessível. Passe aria-label ou aria-labelledby em contentProps.",
      );
    }
    contentProps?.onOpenAutoFocus?.(event);
  };

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
          {...contentProps}
          onOpenAutoFocus={onOpenAutoFocus}
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
