import { cn } from "../../lib/cn";
import { Tooltip as TooltipPrimitive } from "radix-ui";
import * as React from "react";
import { tooltipArrowStyles, tooltipContentStyles } from "./tooltip.styles";
import type { TooltipProps, TooltipProviderProps } from "./tooltip.types";

const DEFAULT_DELAY = 200;
const DEFAULT_SKIP_DELAY = 300;

/** Marca que há um TooltipProvider do Prizm acima: o Tooltip não cria o próprio. */
const InsideProviderContext = React.createContext(false);

/**
 * Provider dos tooltips de uma região (uma barra de ferramentas, o app inteiro). Com ele, o atraso
 * curto entre tooltips vizinhos (`skipDelayDuration`) funciona: ao passar de um botão para o outro,
 * o segundo tooltip abre sem esperar. Sem ele, cada `Tooltip` cria o próprio provider.
 *
 * @example
 * <TooltipProvider>
 *   <Tooltip content="Negrito"><Button size="icon" aria-label="Negrito"><Bold /></Button></Tooltip>
 *   <Tooltip content="Itálico"><Button size="icon" aria-label="Itálico"><Italic /></Button></Tooltip>
 * </TooltipProvider>
 */
function TooltipProvider({
  delayDuration = DEFAULT_DELAY,
  skipDelayDuration = DEFAULT_SKIP_DELAY,
  children,
  ...props
}: TooltipProviderProps) {
  return (
    <TooltipPrimitive.Provider
      delayDuration={delayDuration}
      skipDelayDuration={skipDelayDuration}
      {...props}
    >
      <InsideProviderContext value={true}>{children}</InsideProviderContext>
    </TooltipPrimitive.Provider>
  );
}
TooltipProvider.displayName = "TooltipProvider";

/**
 * Tooltip — shows a short hint on hover/focus of the trigger.
 *
 * **API por props:** Use `content` e `children` (trigger). Ex.: `<Tooltip content="Salvar"> <Button>Hover</Button> </Tooltip>`.
 *
 * Dentro de um `TooltipProvider`, usa o provider de fora (o atraso entre vizinhos funciona); fora,
 * cria o próprio.
 *
 * @see [Tooltip — shadcn/ui (Radix)](https://ui.shadcn.com/docs/components/tooltip)
 */
function Tooltip({
  content,
  children,
  delayDuration,
  skipDelayDuration,
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
  const insideProvider = React.use(InsideProviderContext);

  const tooltip = (
    <TooltipPrimitive.Root
      {...(insideProvider && delayDuration !== undefined ? { delayDuration } : {})}
      {...rootProps}
    >
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal container={portalContainer ?? undefined}>
        <TooltipPrimitive.Content
          data-slot="tooltip-content"
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
          <TooltipPrimitive.Arrow data-slot="tooltip-arrow" className={tooltipArrowStyles} />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );

  if (insideProvider) return tooltip;

  return (
    <TooltipPrimitive.Provider
      delayDuration={delayDuration ?? DEFAULT_DELAY}
      skipDelayDuration={skipDelayDuration ?? DEFAULT_SKIP_DELAY}
    >
      {tooltip}
    </TooltipPrimitive.Provider>
  );
}

Tooltip.displayName = "Tooltip";

export { Tooltip, TooltipProvider };
