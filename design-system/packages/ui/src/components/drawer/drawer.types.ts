import type * as React from "react";
import type { Drawer as VaulDrawer } from "vaul";

/**
 * Lado de abertura do drawer. Alias semântico para a prop `direction` do Vaul.
 *
 * @default "bottom"
 */
export type DrawerSide = "top" | "right" | "bottom" | "left";

/**
 * Props do componente raiz `Drawer` do design system PRIZM.
 *
 * Usa Vaul (Drawer) por baixo. A API simplificada via props é o caminho principal.
 * Subcomponentes existem apenas como escape hatch para composição avançada.
 *
 * @see https://vaul.emilkowal.ski/
 */
export interface DrawerProps extends Omit<
  React.ComponentPropsWithoutRef<typeof VaulDrawer.Root>,
  "direction"
> {
  /**
   * Lado de abertura do drawer. Preferir sobre `direction` para clareza.
   *
   * @default "bottom"
   * @example side="right"
   */
  side?: DrawerSide;

  /**
   * Direção do drawer (Vaul). Use `side` quando possível.
   *
   * @default "bottom"
   */
  direction?: DrawerSide;

  /**
   * Elemento que abre o drawer (ex.: um `Button`).
   *
   * @example <Button variant="outline">Open Drawer</Button>
   */
  trigger?: React.ReactNode;

  /**
   * Título do drawer. Recomendado para acessibilidade.
   *
   * @example "Edit profile"
   */
  title?: React.ReactNode;

  /**
   * Descrição do drawer. Opcional, para contexto.
   *
   * @example "Make changes below. Click save when done."
   */
  description?: React.ReactNode;

  /**
   * Conteúdo principal do drawer (corpo).
   *
   * @example body={<Form>...</Form>}
   */
  body?: React.ReactNode;

  /**
   * Conteúdo do rodapé do drawer (ações, botões).
   *
   * @example footer={<><Button variant="outline">Cancel</Button><Button>Save</Button></>}
   */
  footer?: React.ReactNode;

  /**
   * Exibe a alça (handle) no topo do conteúdo.
   *
   * @default true
   */
  showHandle?: boolean;

  /**
   * Classe CSS aplicada ao conteúdo do drawer na API simplificada.
   */
  contentClassName?: string;

  /**
   * Se o drawer é modal (bloqueia interação com o fundo).
   *
   * @default true
   */
  modal?: boolean;

  /**
   * Se pode fechar ao clicar fora, tecla Escape ou arrastar.
   *
   * @default true
   */
  dismissible?: boolean;

  /**
   * Se apenas o handle pode ser arrastado para fechar (não o conteúdo).
   *
   * @default false
   */
  handleOnly?: boolean;

  /**
   * Reposicionar inputs no iOS quando o drawer abre (evita teclado sobre o conteúdo).
   *
   * @default true
   */
  repositionInputs?: boolean;

  /**
   * Escalar o fundo ao abrir (efeito visual).
   *
   * @default true
   */
  shouldScaleBackground?: boolean;

  /**
   * Elemento onde o portal do drawer será montado.
   *
   * @default document.body
   */
  container?: HTMLElement | null;
}

export type DrawerTriggerProps = React.ComponentPropsWithoutRef<typeof VaulDrawer.Trigger>;

export type DrawerPortalProps = React.ComponentPropsWithoutRef<typeof VaulDrawer.Portal>;

export type DrawerOverlayProps = React.ComponentPropsWithoutRef<typeof VaulDrawer.Overlay> &
  Pick<React.HTMLAttributes<HTMLDivElement>, "className">;

export interface DrawerContentProps extends Omit<
  React.ComponentPropsWithoutRef<typeof VaulDrawer.Content>,
  "className"
> {
  className?: string;
  /**
   * Exibe a alça (handle) no topo do conteúdo.
   * @default true
   */
  showHandle?: boolean;
}

export type DrawerHeaderProps = React.HTMLAttributes<HTMLDivElement>;

export type DrawerFooterProps = React.HTMLAttributes<HTMLDivElement>;

export type DrawerTitleProps = React.ComponentPropsWithoutRef<typeof VaulDrawer.Title> &
  Pick<React.HTMLAttributes<HTMLDivElement>, "className">;

export type DrawerDescriptionProps = React.ComponentPropsWithoutRef<typeof VaulDrawer.Description> &
  Pick<React.HTMLAttributes<HTMLParagraphElement>, "className">;

export type DrawerCloseProps = React.ComponentPropsWithoutRef<typeof VaulDrawer.Close>;
