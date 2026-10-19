import { Menubar as RadixMenubar } from "radix-ui";

type RadixMenubarRootProps = React.ComponentPropsWithoutRef<typeof RadixMenubar.Root>;

/**
 * Item base usado em todos os tipos de entrada do Menubar.
 */
export interface MenubarItemBase {
  /**
   * Identificador opcional para chave de renderização.
   */
  id?: string;

  /**
   * Rótulo visível do item (texto, ícone + texto, etc.).
   */
  label?: React.ReactNode;

  /**
   * Desabilita a interação do item.
   */
  disabled?: boolean;

  /**
   * Aplica recuo visual (indent) ao item.
   */
  inset?: boolean;

  /**
   * Atalho exibido alinhado à direita (ex.: "⌘S", "Ctrl+P").
   */
  shortcut?: React.ReactNode;

  /**
   * Ícone opcional exibido antes do label.
   */
  icon?: React.ReactNode;

  /**
   * Classe opcional aplicada ao item.
   */
  className?: string;
}

/**
 * Item de ação padrão.
 */
export interface MenubarActionItem extends MenubarItemBase {
  type?: "item";

  /**
   * Callback chamado ao selecionar o item.
   */
  onSelect?: () => void;
}

/**
 * Item checkbox.
 */
export interface MenubarCheckboxItem extends MenubarItemBase {
  type: "checkbox";

  /**
   * Estado controlado/semicontrolado do checkbox.
   */
  checked?: boolean;

  /**
   * Callback disparado quando o estado muda.
   */
  onCheckedChange?: (checked: boolean) => void;
}

/**
 * Item de grupo de rádio, contendo múltiplas opções exclusivas.
 */
export interface MenubarRadioGroupItem extends Omit<
  MenubarItemBase,
  "shortcut" | "icon" | "label"
> {
  type: "radio-group";

  /**
   * Valor atualmente selecionado no grupo.
   */
  value: string;

  /**
   * Opções do grupo de rádio.
   */
  items: Array<
    Omit<MenubarItemBase, "shortcut" | "icon"> & {
      /**
       * Tipo do item interno; opcional para reduzir verbosidade.
       * @default "radio"
       */
      type?: "radio";
      /**
       * Valor associado ao item de rádio.
       */
      value: string;
    }
  >;

  /**
   * Callback disparado quando o valor selecionado muda.
   */
  onValueChange?: (value: string) => void;
}

/**
 * Separador visual.
 */
export interface MenubarSeparatorItem {
  type: "separator";
  id?: string;
}

/**
 * Rótulo de seção.
 */
export interface MenubarLabelItem extends MenubarItemBase {
  type: "label";
}

/**
 * Submenu (aninhado dentro de outro menu).
 */
export interface MenubarSubmenuItem extends MenubarItemBase {
  type: "submenu";

  /**
   * Itens exibidos dentro do submenu.
   */
  items: MenubarMenuItem[];
}

export type MenubarMenuItem =
  | MenubarActionItem
  | MenubarCheckboxItem
  | MenubarRadioGroupItem
  | MenubarSeparatorItem
  | MenubarLabelItem
  | MenubarSubmenuItem;

/**
 * Configuração de um menu do menubar (por exemplo: "File", "Edit", etc.).
 */
export interface MenubarMenuConfig {
  /**
   * Identificador opcional para chave de renderização.
   */
  id?: string;

  /**
   * Rótulo do menu (texto ou nó React).
   */
  label: React.ReactNode;

  /**
   * Classe opcional aplicada ao conteúdo do menu.
   * Útil para controlar a largura (ex.: `w-44`, `w-64`).
   */
  contentClassName?: string;

  /**
   * Itens exibidos dentro deste menu.
   */
  items: MenubarMenuItem[];
}

/**
 * Props do `Menubar` do design system PRIZM.
 *
 * **API principal baseada em props (recomendada):**
 *
 * - `menus`: lista de menus com seus itens (action, checkbox, radio-group, separator, label, submenu)
 * - Demais props do Radix Menubar (`loop`, `orientation`, `dir`, etc.)
 *
 * Exemplo:
 *
 * ```tsx
 * <Menubar
 *   menus={[
 *     {
 *       label: "File",
 *       items: [
 *         { label: "New Tab", shortcut: "⌘T", onSelect: () => {} },
 *         { type: "separator" },
 *         {
 *           type: "checkbox",
 *           label: "Show Status Bar",
 *           checked: showStatusBar,
 *           onCheckedChange: setShowStatusBar,
 *         },
 *       ],
 *     },
 *   ]}
 * />
 * ```
 *
 * Para casos avançados de composição (controle fino de cada primitivo),
 * utilize diretamente os componentes Radix (`Menubar.Root`, `Menubar.Menu`, etc.)
 * importando de `"radix-ui"`.
 */
export interface MenubarProps extends Omit<RadixMenubarRootProps, "children"> {
  /**
   * Lista de menus exibidos na barra.
   */
  menus: MenubarMenuConfig[];

  /**
   * Classe opcional aplicada ao elemento raiz do menubar.
   */
  className?: string;
}
