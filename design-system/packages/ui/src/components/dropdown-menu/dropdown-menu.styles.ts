/**
 * PRIZM DropdownMenu — estilos base usando tokens de `@grupoitss/prizm-tokens`.
 *
 * Baseado no DropdownMenu do shadcn/ui com ajustes para o design system.
 *
 * @see https://ui.shadcn.com/docs/components/dropdown-menu
 */

export const dropdownMenuContentStyles =
  "z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md custom-scroll data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[var(--radix-dropdown-menu-content-transform-origin)]";

export const dropdownMenuSubContentStyles =
  "z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[var(--radix-dropdown-menu-content-transform-origin)]";

/**
 * Item (decisões de 04/11/2026): desabilitado sem clique, como a família e o shadcn; ícone em
 * muted-foreground (accent-foreground no destaque); destrutivo em destructive-strong em repouso e
 * destructive no destaque (exceção do time: 2,24 a 4,43:1 sobre accent).
 */
export const dropdownMenuItemStyles =
  "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground focus:[&_.text-muted-foreground]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 [&_svg:not([class*='text-'])]:text-muted-foreground focus:[&_svg:not([class*='text-'])]:text-accent-foreground data-[variant=destructive]:text-destructive-strong data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:[&_svg]:text-current!";

export const dropdownMenuCheckboxItemStyles =
  "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground focus:[&_.text-muted-foreground]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50";

export const dropdownMenuRadioItemStyles =
  "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground focus:[&_.text-muted-foreground]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50";

/** Descrição do item (API por props): text-xs muted, accent-foreground no destaque. */
export const dropdownMenuItemDescriptionStyles = "text-xs text-muted-foreground";

export const dropdownMenuLabelStyles = "px-2 py-1.5 text-sm font-semibold";

export const dropdownMenuSeparatorStyles = "-mx-1 my-1 h-px bg-border";

export const dropdownMenuShortcutStyles = "ml-auto text-xs tracking-widest text-muted-foreground";
