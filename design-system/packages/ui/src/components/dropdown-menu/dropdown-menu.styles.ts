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

export const dropdownMenuItemStyles =
  "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0";

export const dropdownMenuCheckboxItemStyles =
  "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed";

export const dropdownMenuRadioItemStyles =
  "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed";

export const dropdownMenuLabelStyles = "px-2 py-1.5 text-sm font-semibold text-muted-foreground";

export const dropdownMenuSeparatorStyles = "-mx-1 my-1 h-px bg-muted";

export const dropdownMenuShortcutStyles = "ml-auto text-xs tracking-widest opacity-60";
