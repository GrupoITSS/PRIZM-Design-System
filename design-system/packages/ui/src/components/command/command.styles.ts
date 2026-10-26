/**
 * PRIZM Command — command menu / palette component built on top of cmdk.
 *
 * All classes use design tokens from `@grupoitss/prizm-tokens` (e.g. `bg-popover`, `text-muted-foreground`,
 * `bg-accent`, `border`, etc.) to keep visual parity with the rest of the design system.
 *
 * @see https://github.com/dip/cmdk
 * @see https://ui.shadcn.com/docs/components/command
 */

export const commandRootStyles =
  "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground";

/**
 * Extra styles applied when the command is rendered inside a dialog.
 * Responsible for spacing and typography of groups, headings and items.
 */
export const commandDialogStyles =
  "[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-2 [&_[cmdk-group]]:px-3 [&_[cmdk-group]]:py-2 [&_[cmdk-input-wrapper]]:px-5 [&_[cmdk-input-wrapper]]:py-1 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-14 [&_[cmdk-item]]:gap-3 [&_[cmdk-item]]:px-3 [&_[cmdk-item]]:py-3.5 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5";

export const commandInputWrapperStyles = "flex items-center border-b px-4";

export const commandInputIconStyles = "mr-3 h-4 w-4 shrink-0 opacity-50";

export const commandInputStyles =
  "flex h-12 w-full rounded-md bg-transparent py-3.5 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50";

export const commandListStyles = "max-h-[360px] overflow-y-auto overflow-x-hidden p-2";

export const commandEmptyStyles = "py-8 text-center text-sm";

export const commandGroupStyles =
  "overflow-hidden p-2 text-foreground [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground";

export const commandSeparatorStyles = "-mx-1 h-px bg-border";

export const commandItemStyles =
  "relative flex cursor-default gap-3 select-none items-center rounded-md px-3 py-2.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[selected=true]:[&_.text-muted-foreground]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0";

export const commandShortcutStyles = "ml-auto text-xs tracking-widest text-muted-foreground";
