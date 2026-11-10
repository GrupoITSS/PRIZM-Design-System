import { cva, type VariantProps } from "class-variance-authority";

/**
 * PRIZM Sidebar — estilos a partir do shadcn/ui (new-york-v4), com as decisões de 10/11/2026.
 *
 * - Item com 32px (`height/8`) fixo em todas as marcas (M1).
 * - Item ativo em `color/sidebar-primary`, texto em `color/sidebar-primary-foreground` (S5).
 *   O subitem ativo fica em `color/sidebar-accent` (P2).
 * - Rótulo do grupo em `text-xs`, com o texto a 70% (P1).
 * - Sem `variant` outline e sem `size` sm no SidebarMenuButton (S7).
 *
 * @see https://ui.shadcn.com/docs/components/radix/sidebar
 */

/**
 * Anel de foco das peças interativas da Sidebar (pendência 1 de 10/11/2026). Dentro da Sidebar, o
 * anel é `color/sidebar-foreground` com 2px de espaço em `color/sidebar`: passa 3:1 nas 12
 * combinações de marca e modo (10,14 a 19,27:1). O `color/ring` ficava em 1,00 a 2,75:1 contra a
 * sidebar colorida do Docnix, do AFIPE escuro e da Digitrol.
 */
export const sidebarFocusRing =
  "outline-hidden focus-visible:ring-[3px] focus-visible:ring-sidebar-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-sidebar";

/**
 * Área de toque das ações (pendência 7): 24px no desktop (o ícone tem 20px) e 36px no celular,
 * sem mudar o visual.
 */
export const sidebarActionHitArea = "after:absolute after:-inset-2 md:after:-inset-0.5";

export const sidebarMenuButtonVariants = cva(
  [
    "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm transition-[width,height,padding]",
    "group-has-data-[sidebar=menu-action]/menu-item:pr-8 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2!",
    "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground",
    "disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50",
    "data-[active=true]:bg-sidebar-primary data-[active=true]:font-medium data-[active=true]:text-sidebar-primary-foreground",
    "data-[active=true]:hover:bg-sidebar-primary data-[active=true]:hover:text-sidebar-primary-foreground data-[active=true]:active:bg-sidebar-primary data-[active=true]:active:text-sidebar-primary-foreground",
    "data-[state=open]:not-data-[active=true]:hover:bg-sidebar-accent data-[state=open]:not-data-[active=true]:hover:text-sidebar-accent-foreground",
    "[&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
    sidebarFocusRing,
  ].join(" "),
  {
    variants: {
      size: {
        /** 32px (`height/8`). */
        default: "h-8 text-sm",
        /** 48px: o Big Icon do Figma, com mídia, título e subtítulo. Não leva `isActive` (P4). */
        lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

export type SidebarMenuButtonVariantProps = VariantProps<typeof sidebarMenuButtonVariants>;

export const sidebarGroupLabelStyles = [
  "flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 transition-[margin,opacity] duration-200 ease-linear [&>svg]:size-4 [&>svg]:shrink-0",
  "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
  sidebarFocusRing,
].join(" ");

export const sidebarGroupActionStyles = [
  "absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0",
  sidebarActionHitArea,
  "group-data-[collapsible=icon]:hidden",
  sidebarFocusRing,
].join(" ");

export const sidebarMenuActionStyles = [
  "absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground transition-transform peer-hover/menu-button:text-sidebar-accent-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0",
  sidebarActionHitArea,
  "peer-data-[size=default]/menu-button:top-1.5 peer-data-[size=lg]/menu-button:top-2.5",
  "peer-data-[active=true]/menu-button:text-sidebar-primary-foreground",
  "group-data-[collapsible=icon]:hidden",
  sidebarFocusRing,
].join(" ");

export const sidebarMenuActionShowOnHoverStyles =
  "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 md:opacity-0";

export const sidebarMenuBadgeStyles = [
  "pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium text-sidebar-foreground tabular-nums select-none",
  "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-primary-foreground",
  "peer-data-[size=default]/menu-button:top-1.5 peer-data-[size=lg]/menu-button:top-2.5",
  "group-data-[collapsible=icon]:hidden",
].join(" ");

export const sidebarMenuSubStyles = [
  "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5",
  "group-data-[collapsible=icon]:hidden",
].join(" ");

export const sidebarMenuSubButtonStyles = [
  "flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground",
  "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground",
  "disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50",
  "[&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground",
  "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
  "group-data-[collapsible=icon]:hidden",
  sidebarFocusRing,
].join(" ");
