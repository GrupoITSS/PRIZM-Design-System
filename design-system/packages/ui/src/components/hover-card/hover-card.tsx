import { HoverCard as RadixHoverCard } from "radix-ui";
import * as React from "react";

import { cn } from "../../lib/cn";

import { hoverCardContentStyles } from "./hover-card.styles";
import type { HoverCardProps } from "./hover-card.types";

/**
 * HoverCard do design system PRIZM.
 *
 * Baseado no Radix HoverCard, com **API principal por props**:
 *
 * - `trigger`: conteúdo que dispara o hover (ex.: avatar, texto, ícone)
 * - `content`: conteúdo exibido dentro do card
 * - `align`, `side`, `sideOffset`: controle de posicionamento do conteúdo
 * - Demais props do Radix HoverCard (`open`, `defaultOpen`, `onOpenChange`, etc.)
 *
 * Exemplo recomendado (sem subcomponentes):
 *
 * ```tsx
 * <HoverCard
 *   trigger={<span>@prizm</span>}
 *   content={
 *     <div className="space-y-1">
 *       <p className="text-sm font-semibold">@prizm</p>
 *       <p className="text-xs text-muted-foreground">
 *         Design system multi-apps da PAS.
 *       </p>
 *     </div>
 *   }
 * />
 * ```
 *
 * Para cenários de composição extremamente avançados, use diretamente
 * os primitivos do Radix importando de `"radix-ui"`.
 */
// Root renders no DOM element, so there's no ref to forward.
function HoverCard({
  trigger,
  content,
  align = "center",
  side = "top",
  sideOffset = 4,
  contentClassName,
  ...props
}: HoverCardProps) {
  return (
    <RadixHoverCard.Root {...props}>
      <RadixHoverCard.Trigger asChild>{trigger}</RadixHoverCard.Trigger>
      <RadixHoverCard.Portal>
        <RadixHoverCard.Content
          align={align}
          side={side}
          sideOffset={sideOffset}
          data-slot="hover-card-content"
          className={cn(hoverCardContentStyles, contentClassName)}
        >
          {content}
        </RadixHoverCard.Content>
      </RadixHoverCard.Portal>
    </RadixHoverCard.Root>
  );
}

HoverCard.displayName = RadixHoverCard.Root.displayName ?? "HoverCard";

export { HoverCard };
