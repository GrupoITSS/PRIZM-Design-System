/**
 * Estilos base do Menubar PRIZM.
 * As classes abaixo foram adaptadas do componente shadcn/ui original,
 * mantendo tokens utilitários (bg-*, text-*, border-*, etc.).
 */

export const menubarRootStyles =
  "flex h-10 items-center space-x-1 rounded-md border bg-background p-1";

export const menubarTriggerStyles =
  "flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground focus:[&_.text-muted-foreground]:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground";

export const menubarSubTriggerStyles =
  "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground focus:[&_.text-muted-foreground]:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground";

export const menubarSubTriggerInsetStyles = "pl-8";

export const menubarSubContentStyles =
  "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-menubar-content-transform-origin]";

export const menubarContentStyles =
  "z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-menubar-content-transform-origin]";

export const menubarItemStyles =
  "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground focus:[&_.text-muted-foreground]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50";

export const menubarItemInsetStyles = "pl-8";

export const menubarCheckboxItemStyles =
  "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground focus:[&_.text-muted-foreground]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50";

export const menubarRadioItemStyles =
  "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground focus:[&_.text-muted-foreground]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50";

export const menubarLabelStyles = "px-2 py-1.5 text-sm font-semibold";

export const menubarLabelInsetStyles = "pl-8";

export const menubarSeparatorStyles = "-mx-1 my-1 h-px bg-muted";

export const menubarShortcutStyles = "ml-auto text-xs tracking-widest text-muted-foreground";
