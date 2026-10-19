import type { ContextMenu as RadixContextMenu } from "radix-ui";
import type * as React from "react";

export interface ContextMenuItemData {
  /**
   * Rótulo principal do item. Pode ser string ou ReactNode (para ícones, etc.).
   */
  label: React.ReactNode;
  /**
   * Descrição opcional exibida abaixo do label.
   */
  description?: React.ReactNode;
  /**
   * Atalho de teclado ou texto curto alinhado à direita.
   *
   * @example "⌘+P"
   */
  shortcut?: React.ReactNode;
  /**
   * Ícone opcional exibido antes do label.
   */
  icon?: React.ReactNode;
  /**
   * Indica se o item está desabilitado.
   *
   * @default false
   */
  disabled?: boolean;
  /**
   * Handler chamado ao selecionar o item.
   */
  onSelect?: () => void;
  /**
   * Aparência do item.
   *
   * @default "default"
   */
  variant?: "default" | "destructive";
  /**
   * Subitens: abre um submenu ao passar o mouse / focar.
   */
  subItems?: ContextMenuItemData[] | ContextMenuSection[];
}

export interface ContextMenuSection {
  /**
   * Título opcional da seção (label acima dos itens).
   */
  label?: React.ReactNode;
  /**
   * Lista de itens da seção.
   */
  items: ContextMenuItemData[];
}

export interface ContextMenuRadioOption {
  value: string;
  label: React.ReactNode;
}

export interface ContextMenuRadioSection {
  type: "radio";
  /**
   * Título opcional do grupo de rádio.
   */
  label?: React.ReactNode;
  /** Valor selecionado (controlado). */
  value: string;
  /** Callback quando a seleção muda. */
  onValueChange: (value: string) => void;
  /** Opções do grupo. */
  options: ContextMenuRadioOption[];
}

export type ContextMenuProps = React.ComponentPropsWithoutRef<typeof RadixContextMenu.Root> & {
  /**
   * **Simplificada:** filhos são a área que recebe o clique direito (envolvida em ContextMenuTrigger).
   * **Composição:** quando `items` ausente, use `ContextMenuTrigger` / `ContextMenuContent` manualmente nos children.
   */
  children?: React.ReactNode;
  /**
   * API simplificada: lista de itens, seções com label, ou seções do tipo radio.
   * Quando `items` é fornecido, o conteúdo do menu é montado automaticamente.
   */
  items?: ContextMenuItemData[] | (ContextMenuSection | ContextMenuRadioSection)[];
};

export type ContextMenuContentProps = React.ComponentPropsWithoutRef<
  typeof RadixContextMenu.Content
>;

export type ContextMenuItemProps = React.ComponentPropsWithoutRef<typeof RadixContextMenu.Item> & {
  inset?: boolean;
};

export type ContextMenuCheckboxItemProps = React.ComponentPropsWithoutRef<
  typeof RadixContextMenu.CheckboxItem
>;

export type ContextMenuRadioItemProps = React.ComponentPropsWithoutRef<
  typeof RadixContextMenu.RadioItem
>;

export type ContextMenuLabelProps = React.ComponentPropsWithoutRef<
  typeof RadixContextMenu.Label
> & {
  inset?: boolean;
};

export type ContextMenuSeparatorProps = React.ComponentPropsWithoutRef<
  typeof RadixContextMenu.Separator
>;

export type ContextMenuShortcutProps = React.HTMLAttributes<HTMLSpanElement>;

export type ContextMenuTriggerProps = React.ComponentPropsWithoutRef<
  typeof RadixContextMenu.Trigger
>;

export type ContextMenuRadioGroupProps = React.ComponentPropsWithoutRef<
  typeof RadixContextMenu.RadioGroup
>;

export type ContextMenuSubTriggerProps = React.ComponentPropsWithoutRef<
  typeof RadixContextMenu.SubTrigger
> & {
  inset?: boolean;
};
