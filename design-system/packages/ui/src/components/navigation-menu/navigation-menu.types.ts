import type * as React from "react";
import { NavigationMenu as RadixNavigationMenu } from "radix-ui";

type RadixNavigationMenuRootProps = React.ComponentPropsWithoutRef<typeof RadixNavigationMenu.Root>;

/**
 * Item base usado no NavigationMenu.
 */
export interface NavigationMenuItemBase {
  /**
   * Identificador opcional para chave de renderização.
   */
  id?: string;

  /**
   * Rótulo visível do item (texto, ícone + texto, etc.).
   */
  label: React.ReactNode;

  /**
   * Ícone opcional exibido antes do label.
   */
  icon?: React.ReactNode;

  /**
   * Descrição opcional exibida abaixo do label em painéis.
   */
  description?: React.ReactNode;

  /**
   * Conteúdo opcional exibido ao lado do label (ex.: badge).
   */
  badge?: React.ReactNode;

  /**
   * Classe opcional aplicada ao item/trigger.
   */
  className?: string;
}

/**
 * Item simples que navega diretamente para uma rota.
 */
export interface NavigationMenuLinkItem extends NavigationMenuItemBase {
  type?: "link";

  /**
   * URL de navegação do item.
   */
  href?: string;

  /**
   * target do link (ex.: "_blank").
   */
  target?: string;

  /**
   * rel do link (ex.: "noreferrer").
   */
  rel?: string;
}

/**
 * Item de link interno a um painel (mega menu).
 */
export interface NavigationMenuPanelLinkItem extends Omit<NavigationMenuLinkItem, "type"> {
  /**
   * Se verdadeiro, pode ser destacado visualmente.
   */
  highlight?: boolean;

  /**
   * Marca a opção como a selecionada (pickers / filtros).
   */
  selected?: boolean;

  /**
   * Chamado ao escolher o item. Use em pickers sem navegação.
   */
  onSelect?: () => void;

  /**
   * Desabilita o item.
   */
  disabled?: boolean;

  /**
   * Lista opcional de subitens, permitindo representar hierarquias
   * dentro de um mesmo painel (ex.: categoria → grupo → item).
   *
   * Útil para criar **3+ níveis lógicos** de navegação usando
   * apenas a API baseada em props.
   */
  children?: NavigationMenuPanelLinkItem[];
}

/**
 * Item que abre um painel com uma lista de links (mega menu).
 */
export interface NavigationMenuPanelItem extends NavigationMenuItemBase {
  type: "panel";

  /**
   * Itens exibidos dentro do painel.
   */
  items: NavigationMenuPanelLinkItem[];

  /**
   * Número de colunas do painel (grid).
   * @default 1
   */
  columns?: 1 | 2 | 3 | 4;

  /**
   * `grid` é o mega menu. `list` é uma lista compacta (filtros).
   * @default "grid"
   */
  layout?: "grid" | "list";

  /**
   * Desabilita o trigger do painel.
   */
  disabled?: boolean;
}

export type NavigationMenuItem = NavigationMenuLinkItem | NavigationMenuPanelItem;

/**
 * Props do `NavigationMenu` do design system PRIZM.
 *
 * **API principal baseada em props (recomendada):**
 *
 * - `items`: lista de itens (links simples ou painéis com múltiplos links)
 * - Demais props do Radix NavigationMenu (`orientation`, `delayDuration`, etc.)
 *
 * Exemplo:
 *
 * ```tsx
 * <NavigationMenu
 *   items={[
 *     { label: "Home", href: "/" },
 *     {
 *       type: "panel",
 *       label: "Products",
 *       items: [
 *         { label: "Analytics", description: "Dashboards & insights", href: "/analytics" },
 *         { label: "Automation", href: "/automation" },
 *       ],
 *     },
 *   ]}
 * />
 * ```
 *
 * Para casos avançados de composição (controle fino de cada primitivo),
 * utilize diretamente os componentes Radix (`NavigationMenu.Root`, etc.)
 * importando de `"radix-ui"`.
 */
export interface NavigationMenuProps extends Omit<RadixNavigationMenuRootProps, "children"> {
  /**
   * Lista de itens exibidos no menu de navegação.
   */
  items: NavigationMenuItem[];

  /**
   * Classe opcional aplicada ao elemento raiz.
   */
  className?: string;

  /**
   * Classe opcional aplicada à lista de itens.
   */
  listClassName?: string;

  /**
   * Quando `false`, cada painel abre sob o próprio trigger (picker).
   * O padrão `true` usa o viewport compartilhado (mega menu).
   * @default true
   */
  viewport?: boolean;
}
