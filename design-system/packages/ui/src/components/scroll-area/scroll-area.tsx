import { cn } from "../../lib/cn";
import { ScrollArea as RadixScrollArea } from "radix-ui";
import * as React from "react";
import {
  scrollAreaRootClasses,
  scrollAreaViewportClasses,
  scrollBarClasses,
  scrollBarThumbClasses,
} from "./scroll-area.styles";
import type { ScrollAreaProps } from "./scroll-area.types";

/**
 * ScrollArea do design system PRIZM.
 *
 * API **100% baseada em props**, sem subcomponentes públicos:
 *
 * Exemplo básico (lista vertical):
 *
 * `tsx
 * <ScrollArea className="h-72 w-48 rounded-md border">
 *   <div data-slot="scroll-area-content" className="p-4">
 *     Conteúdo rolável aqui
 *   </div>
 * </ScrollArea>
 * `
 *
 * Para rolagem horizontal:
 *
 * `tsx
 * <ScrollArea horizontal className="w-96 rounded-md border">
 *   <div
 *     data-slot="scroll-area-content"
 *     className="flex w-max space-x-4 p-4"
 *   >
 *     Itens horizontais
 *   </div>
 * </ScrollArea>
 * `
 *
 * Internamente usa Radix `ScrollArea`, mantendo acessibilidade e comportamento
 * padrão do shadcn/ui, mas toda a composição (Viewport, Scrollbar, Thumb)
 * é encapsulada.
 *
 * @see https://ui.shadcn.com/docs/components/radix/scroll-area
 */
function ScrollAreaImpl({
  className,
  children,
  horizontal = false,
  hideScrollbars = false,
  ref,
  ...rootProps
}: ScrollAreaProps & { ref?: React.Ref<React.ComponentRef<typeof RadixScrollArea.Root>> }) {
  const showHorizontal = horizontal;

  const scrollbarVisibilityClass = hideScrollbars ? "opacity-0 pointer-events-none" : "";

  return (
    <RadixScrollArea.Root
      ref={ref}
      data-slot="scroll-area"
      className={cn(scrollAreaRootClasses, className)}
      {...rootProps}
    >
      <RadixScrollArea.Viewport className={scrollAreaViewportClasses}>
        {children}
      </RadixScrollArea.Viewport>

      {/* Barra vertical padrão */}
      <RadixScrollArea.Scrollbar
        orientation="vertical"
        className={cn(scrollBarClasses({ orientation: "vertical" }), scrollbarVisibilityClass)}
      >
        <RadixScrollArea.Thumb className={scrollBarThumbClasses} />
      </RadixScrollArea.Scrollbar>

      {/* Barra horizontal opcional */}
      {showHorizontal && (
        <RadixScrollArea.Scrollbar
          data-testid="scroll-area-horizontal-scrollbar"
          orientation="horizontal"
          className={cn(scrollBarClasses({ orientation: "horizontal" }), scrollbarVisibilityClass)}
        >
          <RadixScrollArea.Thumb className={scrollBarThumbClasses} />
        </RadixScrollArea.Scrollbar>
      )}

      <RadixScrollArea.Corner />
    </RadixScrollArea.Root>
  );
}

ScrollAreaImpl.displayName = "ScrollArea";

export { ScrollAreaImpl as ScrollArea };
