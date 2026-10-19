import type { DropdownMenu as RadixDropdownMenu } from "radix-ui";
import type * as React from "react";

export interface DropdownMenuItemData {
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
   * Handler de clique do item.
   */
  onSelect?: () => void;
}

export interface DropdownMenuSection {
  /**
   * Título opcional da seção (label acima dos itens).
   */
  label?: React.ReactNode;
  /**
   * Lista de itens da seção.
   */
  items: DropdownMenuItemData[];
}

export type DropdownMenuProps = React.ComponentPropsWithoutRef<typeof RadixDropdownMenu.Root> & {
  /**
   * Elemento que abre o menu (geralmente um botão).
   *
   * @example <Button>Open</Button>
   */
  /**
   * **Simplificada:** obrigatório — usado para renderizar o Trigger automaticamente.
   * **Composição:** opcional — quando ausente, você deve usar `DropdownMenuTrigger`
   * manualmente dentro de `children`, como na doc do shadcn/ui.
   */
  trigger?: React.ReactNode;
  /**
   * API simplificada: lista de itens ou seções.
   * Quando `items` é fornecido, `children` é ignorado.
   */
  items?: DropdownMenuItemData[] | DropdownMenuSection[];
  /**
   * Alinhamento horizontal do conteúdo em relação ao trigger.
   *
   * @default "start"
   */
  align?: DropdownMenuContentProps["align"];
  /**
   * Lado em que o conteúdo aparece em relação ao trigger.
   */
  side?: DropdownMenuContentProps["side"];
  /**
   * Offset em pixels entre o trigger e o conteúdo.
   *
   * @default 4
   */
  sideOffset?: DropdownMenuContentProps["sideOffset"];
};

export type DropdownMenuContentProps = React.ComponentPropsWithoutRef<
  typeof RadixDropdownMenu.Content
>;

export type DropdownMenuSubContentProps = React.ComponentPropsWithoutRef<
  typeof RadixDropdownMenu.SubContent
>;

export type DropdownMenuItemProps = React.ComponentPropsWithoutRef<
  typeof RadixDropdownMenu.Item
> & {
  inset?: boolean;
};

export type DropdownMenuCheckboxItemProps = React.ComponentPropsWithoutRef<
  typeof RadixDropdownMenu.CheckboxItem
>;

export type DropdownMenuRadioItemProps = React.ComponentPropsWithoutRef<
  typeof RadixDropdownMenu.RadioItem
>;

export type DropdownMenuLabelProps = React.ComponentPropsWithoutRef<
  typeof RadixDropdownMenu.Label
> & {
  inset?: boolean;
};

export type DropdownMenuSeparatorProps = React.ComponentPropsWithoutRef<
  typeof RadixDropdownMenu.Separator
>;

export type DropdownMenuShortcutProps = React.HTMLAttributes<HTMLSpanElement>;

export type DropdownMenuTriggerProps = React.ComponentPropsWithoutRef<
  typeof RadixDropdownMenu.Trigger
>;

export type DropdownMenuRadioGroupProps = React.ComponentPropsWithoutRef<
  typeof RadixDropdownMenu.RadioGroup
>;

export type DropdownMenuSubTriggerProps = React.ComponentPropsWithoutRef<
  typeof RadixDropdownMenu.SubTrigger
> & {
  inset?: boolean;
};
