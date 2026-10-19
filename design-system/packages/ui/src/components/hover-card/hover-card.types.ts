import { HoverCard as RadixHoverCard } from "radix-ui";

type RadixHoverCardRootProps = React.ComponentPropsWithoutRef<typeof RadixHoverCard.Root>;

type RadixHoverCardContentProps = React.ComponentPropsWithoutRef<typeof RadixHoverCard.Content>;

/**
 * Props do `HoverCard` do design system PRIZM.
 *
 * **API principal baseada em props (recomendada):**
 *
 * - `trigger`: conteúdo que dispara o hover (ex.: avatar, texto, ícone)
 * - `content`: conteúdo exibido no card ao passar o mouse
 * - `align`, `side`, `sideOffset`: posicionamento do conteúdo
 *
 * Exemplo:
 *
 * ```tsx
 * <HoverCard
 *   trigger={<span>@prizm</span>}
 *   content={
 *     <div>
 *       <p className="text-sm font-semibold">@prizm</p>
 *       <p className="text-xs text-muted-foreground">Design system</p>
 *     </div>
 *   }
 * />
 * ```
 *
 * Para casos avançados de composição, utilize diretamente os primitivos
 * do Radix (`HoverCard.Root`, `HoverCard.Trigger`, `HoverCard.Content`)
 * importando de `"radix-ui"`.
 *
 * @see https://ui.shadcn.com/docs/components/hover-card
 */
export interface HoverCardProps extends Omit<RadixHoverCardRootProps, "children"> {
  /**
   * Conteúdo que dispara o hover (trigger do card).
   *
   * Geralmente um avatar, texto ou ícone.
   */
  trigger: React.ReactNode;

  /**
   * Conteúdo exibido dentro do card quando o trigger é "hovered".
   */
  content: React.ReactNode;

  /**
   * Alinhamento do conteúdo em relação ao trigger.
   * @default "center"
   */
  align?: RadixHoverCardContentProps["align"];

  /**
   * Lado em que o conteúdo será exibido em relação ao trigger.
   * @default "top"
   */
  side?: RadixHoverCardContentProps["side"];

  /**
   * Distância em pixels entre o trigger e o conteúdo.
   * @default 4
   */
  sideOffset?: RadixHoverCardContentProps["sideOffset"];

  /**
   * Classe adicional aplicada ao conteúdo do card.
   */
  contentClassName?: string;
}
