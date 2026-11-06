import { cn } from "../../lib/cn";
import { Collapsible as RadixCollapsible } from "radix-ui";
import * as React from "react";
import { Button } from "../button";
import { ChevronRight } from "../icons";
import {
  collapsibleContentStyles,
  collapsibleIconStyles,
  collapsibleToggleStyles,
  collapsibleTriggerStyles,
} from "./collapsible.styles";
import type {
  CollapsibleContentProps,
  CollapsibleProps,
  CollapsibleToggleProps,
  CollapsibleTriggerProps,
} from "./collapsible.types";

/**
 * Collapsible root. Controls open state for expand/collapse content.
 *
 * **Simplified API (recommended):** pass `trigger` and `children` (content) to avoid subcomponents.
 * Use `triggerIcon` for a chevron (it rotates 180° when open); use `trigger={(isOpen) => ...}` for state-dependent trigger (e.g. icon swap).
 *
 * **Composition API:** omit `trigger` and pass CollapsibleTrigger + CollapsibleContent as children.
 *
 * @example
 * // Props-based (recommended)
 * <Collapsible trigger="Product details" triggerIcon={<ChevronDown />}>
 *   <p>Expandable content here.</p>
 * </Collapsible>
 *
 * @example
 * // Composition (escape hatch)
 * <Collapsible>
 *   <CollapsibleTrigger>Toggle</CollapsibleTrigger>
 *   <CollapsibleContent>Content</CollapsibleContent>
 * </Collapsible>
 *
 * @see https://ui.shadcn.com/docs/components/collapsible
 * @see https://www.radix-ui.com/docs/primitives/components/collapsible
 */
const Collapsible = function Collapsible({
  className,
  trigger,
  triggerIcon,
  triggerClassName,
  contentClassName,
  children,
  open: openProp,
  defaultOpen,
  onOpenChange,
  ref,
  ...props
}: CollapsibleProps & { ref?: React.Ref<React.ComponentRef<typeof RadixCollapsible.Root>> }) {
  const useSimplifiedAPI = trigger !== undefined;

  const isControlled = openProp !== undefined;
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen ?? false);
  const open = isControlled ? openProp : internalOpen;
  const handleOpenChange = React.useCallback(
    (next: boolean) => {
      if (!isControlled) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  if (useSimplifiedAPI) {
    return (
      <RadixCollapsible.Root
        ref={ref}
        data-slot="collapsible"
        className={cn("group/collapsible", className)}
        open={open}
        onOpenChange={handleOpenChange}
        {...props}
      >
        <RadixCollapsible.Trigger
          data-slot="collapsible-trigger"
          className={cn(collapsibleTriggerStyles, triggerClassName)}
        >
          {typeof trigger === "function" ? trigger(open) : trigger}
          {triggerIcon != null ? (
            <span data-slot="collapsible-icon" aria-hidden="true" className={collapsibleIconStyles}>
              {triggerIcon}
            </span>
          ) : null}
        </RadixCollapsible.Trigger>
        <RadixCollapsible.Content
          data-slot="collapsible-content"
          className={cn(collapsibleContentStyles, contentClassName)}
        >
          {children}
        </RadixCollapsible.Content>
      </RadixCollapsible.Root>
    );
  }

  return (
    <RadixCollapsible.Root
      ref={ref}
      data-slot="collapsible"
      className={cn("group/collapsible", className)}
      defaultOpen={defaultOpen}
      open={openProp}
      onOpenChange={onOpenChange}
      {...props}
    >
      {children}
    </RadixCollapsible.Root>
  );
};
Collapsible.displayName = RadixCollapsible.Root.displayName ?? "Collapsible";

/**
 * Gatilho da composição. Com `asChild` (o Button do Prizm), o estilo é o do filho: o gatilho não
 * soma as classes dele por cima.
 */
const CollapsibleTrigger = ({
  className,
  asChild,
  ref,
  ...props
}: CollapsibleTriggerProps & {
  ref?: React.Ref<React.ComponentRef<typeof RadixCollapsible.Trigger>>;
}) => (
  <RadixCollapsible.Trigger
    ref={ref}
    data-slot="collapsible-trigger"
    asChild={asChild}
    className={asChild ? className : cn(collapsibleTriggerStyles, className)}
    {...props}
  />
);
CollapsibleTrigger.displayName = RadixCollapsible.Trigger.displayName ?? "CollapsibleTrigger";

const CollapsibleContent = ({
  className,
  ref,
  ...props
}: CollapsibleContentProps & {
  ref?: React.Ref<React.ComponentRef<typeof RadixCollapsible.Content>>;
}) => (
  <RadixCollapsible.Content
    ref={ref}
    data-slot="collapsible-content"
    className={cn(collapsibleContentStyles, className)}
    {...props}
  />
);
CollapsibleContent.displayName = RadixCollapsible.Content.displayName ?? "CollapsibleContent";

/**
 * Gatilho só com ícone, para a composição: o Button ghost icon-sm do Prizm com ChevronRight, que gira
 * 90° com o painel aberto (vira ChevronDown). Use num cabeçalho com outras ações ao lado; só ele abre
 * e fecha. Os estados (hover, foco, pressed, disabled) são os do Button.
 *
 * @example
 * <Collapsible>
 *   <div className="flex items-center gap-2">
 *     <CollapsibleToggle aria-label="Mostrar produtos de Bebidas" />
 *     <span>Bebidas</span>
 *     <Button variant="ghost" size="sm">Editar</Button>
 *   </div>
 *   <CollapsibleContent>…</CollapsibleContent>
 * </Collapsible>
 */
const CollapsibleToggle = ({
  className,
  children,
  "aria-label": ariaLabel = "Mostrar ou ocultar",
  ...props
}: CollapsibleToggleProps) => (
  <RadixCollapsible.Trigger asChild>
    <Button
      data-slot="collapsible-toggle"
      variant="ghost"
      size="icon-sm"
      aria-label={ariaLabel}
      className={cn(collapsibleToggleStyles, className)}
      {...props}
    >
      {children ?? <ChevronRight aria-hidden="true" />}
    </Button>
  </RadixCollapsible.Trigger>
);
CollapsibleToggle.displayName = "CollapsibleToggle";

export { Collapsible, CollapsibleTrigger, CollapsibleToggle, CollapsibleContent };
