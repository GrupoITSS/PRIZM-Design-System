import type * as React from "react";
import type { Popover as RadixPopover } from "radix-ui";

type RadixPopoverRootProps = React.ComponentPropsWithoutRef<typeof RadixPopover.Root>;

type RadixPopoverContentProps = React.ComponentPropsWithoutRef<typeof RadixPopover.Content>;

/**
 * Popover ancorado a um campo de busca — abre com foco e fecha ao clicar fora
 * (Radix `onOpenChange`), inclusive dentro de drawers com overlay.
 *
 * @see Popover — PRIZM v2, variante para autocomplete / busca de membros
 */
export interface SearchPopoverProps extends Pick<
  RadixPopoverRootProps,
  "open" | "onOpenChange" | "defaultOpen" | "modal"
> {
  /**
   * Elemento âncora (ex.: wrapper do input). Renderizado via `Popover.Anchor asChild`.
   */
  anchor: React.ReactElement;

  /** Painel flutuante (sugestões, vazio, loading). */
  children: React.ReactNode;

  className?: string;
  align?: RadixPopoverContentProps["align"];
  side?: RadixPopoverContentProps["side"];
  sideOffset?: RadixPopoverContentProps["sideOffset"];
  portalContainer?: HTMLElement | null;
}
