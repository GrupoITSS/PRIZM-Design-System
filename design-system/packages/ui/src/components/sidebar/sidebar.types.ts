import type * as React from "react";
import type { Tooltip as TooltipPrimitive } from "radix-ui";
import type { SidebarMenuButtonVariantProps } from "./sidebar.styles";

export interface SidebarContextProps {
  /** `expanded` (aberta) ou `collapsed` (recolhida). */
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean) => void;
  /** Gaveta aberta no celular. */
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  /** Abre ou recolhe; no celular, abre ou fecha a gaveta. */
  toggleSidebar: () => void;
}

export interface SidebarProviderProps extends React.ComponentProps<"div"> {
  /**
   * Começa aberta.
   * @default true
   */
  defaultOpen?: boolean;
  /** Aberta ou recolhida, controlado de fora. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /**
   * Altura do header global, acima da Sidebar (S2). A Sidebar começa abaixo dele.
   * @default "0px"
   * @example "3rem"
   */
  headerHeight?: string;
  /**
   * Atalho Ctrl ou Cmd + B para abrir e recolher. Com o foco num campo editável (input,
   * textarea, contenteditable), o atalho é ignorado e o negrito do editor continua funcionando.
   * @default true
   */
  keyboardShortcut?: boolean;
}

export interface SidebarProps extends React.ComponentProps<"div"> {
  /**
   * Lado da tela.
   * @default "left"
   */
  side?: "left" | "right";
  /**
   * Como recolhe: `icon` vira uma faixa de ícones de 48px (S4); `offcanvas` sai da tela; `none`
   * não recolhe. No celular, a Sidebar sempre abre numa gaveta.
   * @default "icon"
   */
  collapsible?: "offcanvas" | "icon" | "none";
  /**
   * Nome da região de navegação (`<nav aria-label>`).
   * @default "Navegação"
   */
  label?: string;
}

export type SidebarTooltipContentProps = React.ComponentProps<typeof TooltipPrimitive.Content>;

export interface SidebarMenuButtonProps
  extends React.ComponentProps<"button">, SidebarMenuButtonVariantProps {
  /** Renderiza o filho (por exemplo, o link do roteador) no lugar do `<button>`. */
  asChild?: boolean;
  /**
   * Item da página atual: fundo `color/sidebar-primary` e `aria-current="page"`.
   * @default false
   */
  isActive?: boolean;
  /** Nome no Tooltip, mostrado só com a Sidebar recolhida. */
  tooltip?: string | SidebarTooltipContentProps;
}

export interface SidebarMenuSubButtonProps extends React.ComponentProps<"a"> {
  /** Renderiza o filho (por exemplo, o link do roteador) no lugar do `<a>`. */
  asChild?: boolean;
  /** @default "md" */
  size?: "sm" | "md";
  /**
   * Subitem da página atual: fundo `color/sidebar-accent` e `aria-current="page"`.
   * @default false
   */
  isActive?: boolean;
}

export interface SidebarActionProps extends React.ComponentProps<"button"> {
  asChild?: boolean;
}

export interface SidebarMenuActionProps extends SidebarActionProps {
  /** Mostra a ação só no hover e no foco do item. */
  showOnHover?: boolean;
}

export interface SidebarGroupLabelProps extends React.ComponentProps<"div"> {
  asChild?: boolean;
}

export interface SidebarMenuSkeletonProps extends React.ComponentProps<"div"> {
  showIcon?: boolean;
}
