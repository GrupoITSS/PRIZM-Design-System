import type * as React from "react";
import type { Popover as RadixPopover } from "radix-ui";
import type { PopoverVariantProps } from "./popover.styles";

type RadixPopoverRootProps = React.ComponentPropsWithoutRef<typeof RadixPopover.Root>;

type RadixPopoverContentProps = React.ComponentPropsWithoutRef<typeof RadixPopover.Content>;

/**
 * Props para o componente `Popover` do PRIZM.
 *
 * API simplificada baseada em props — não expõe subcomponentes.
 *
 * ```tsx
 * <Popover
 *   trigger={<Button>Open</Button>}
 *   content={<div>Content</div>}
 * />
 *
 * <Popover
 *   trigger={<Button variant="outline">Align start</Button>}
 *   content="Popover aligned to start"
 *   align="start"
 *   side="bottom"
 * />
 * ```
 */
export interface PopoverProps extends Omit<RadixPopoverRootProps, "children">, PopoverVariantProps {
  /**
   * Elemento que dispara a abertura/fechamento do popover.
   * Renderizado via `asChild` em `RadixPopover.Trigger`.
   */
  trigger: React.ReactNode;

  /**
   * Conteúdo exibido dentro do popover.
   */
  content: React.ReactNode;

  /**
   * Classe adicional aplicada ao conteúdo do popover.
   */
  className?: string;

  /**
   * Alinhamento horizontal em relação ao trigger.
   * @default "center"
   */
  align?: RadixPopoverContentProps["align"];

  /**
   * Lado em que o popover irá aparecer em relação ao trigger.
   * @default "bottom"
   */
  side?: RadixPopoverContentProps["side"];

  /**
   * Distância em pixels entre o trigger e o conteúdo.
   * @default 4
   */
  sideOffset?: RadixPopoverContentProps["sideOffset"];

  /**
   * Margem mínima entre o popover e as bordas da tela.
   * @default 8
   */
  collisionPadding?: RadixPopoverContentProps["collisionPadding"];

  /**
   * Elemento onde o conteúdo do popover é renderizado (portal).
   * Em embeds com Shadow DOM, use o container da overlay para herdar tema e stacking.
   */
  portalContainer?: HTMLElement | null;

  /**
   * Chamado no Escape do conteúdo. Use `event.preventDefault()` para impedir o fechamento.
   */
  onEscapeKeyDown?: RadixPopoverContentProps["onEscapeKeyDown"];

  /**
   * Atributos repassados ao conteúdo do popover: nome acessível (o conteúdo tem `role="dialog"`)
   * e controle do foco ao abrir e ao fechar.
   */
  contentProps?: Pick<
    RadixPopoverContentProps,
    "aria-label" | "aria-labelledby" | "onOpenAutoFocus" | "onCloseAutoFocus"
  >;
}
