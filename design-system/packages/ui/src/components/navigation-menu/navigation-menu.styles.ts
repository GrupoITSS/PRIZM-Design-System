import { cva, type VariantProps } from "class-variance-authority";

/**
 * Estilos base do NavigationMenu PRIZM.
 * Classes adaptadas do componente original shadcn/ui,
 * utilizando tokens utilitários (bg-*, text-*, border-*, etc.).
 */

export const navigationMenuRootStyles =
  "relative z-10 flex max-w-max flex-1 items-center justify-center";

export const navigationMenuListStyles =
  "group flex flex-1 list-none items-center justify-center space-x-1";

export const navigationMenuContentStyles =
  "left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto";

/** Painel posicionado sob o trigger (sem viewport compartilhado). */
export const navigationMenuContentInlineStyles =
  "absolute left-0 top-full z-50 mt-1.5 w-auto min-w-[12rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95";

export const navigationMenuListItemStyles =
  "relative flex w-full cursor-default select-none items-center rounded-md py-2 pl-2 pr-8 text-left text-sm font-normal text-foreground outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:[&_.text-muted-foreground]:text-accent-foreground disabled:pointer-events-none disabled:opacity-50";

export const navigationMenuViewportWrapperStyles = "absolute left-0 top-full flex justify-center";

export const navigationMenuViewportStyles =
  "origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]";

export const navigationMenuIndicatorStyles =
  "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in";

export const navigationMenuIndicatorInnerStyles =
  "relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md";

/**
 * CVA para o gatilho (trigger) do NavigationMenu.
 * Mantém compatibilidade com o estilo original do shadcn/ui.
 */
export const navigationMenuTriggerVariants = cva(
  "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-normal transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:[&_.text-muted-foreground]:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=open]:text-accent-foreground data-[state=open]:bg-accent/50 data-[state=open]:hover:bg-accent data-[state=open]:focus:bg-accent",
);

export type NavigationMenuTriggerVariantProps = VariantProps<typeof navigationMenuTriggerVariants>;
