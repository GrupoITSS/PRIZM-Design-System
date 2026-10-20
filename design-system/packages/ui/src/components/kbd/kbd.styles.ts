/**
 * PRIZM Kbd — styles use design tokens from @grupoitss/prizm-tokens.
 * Single key and group wrapper for shortcut display.
 *
 * Inside a button or a tooltip the key takes the text color of its parent
 * (currentColor) with a 20% background of the same color, so it reads on any
 * button variant and any tooltip surface, in light and dark mode. shadcn's
 * `bg-background/20 text-background` assumed a dark tooltip; PRIZM's tooltip
 * is `bg-popover`, and on a primary button `background` is dark in dark mode.
 *
 * @see https://ui.shadcn.com/docs/components/kbd
 */
export const kbdStyles =
  "bg-muted text-muted-foreground pointer-events-none inline-flex h-5 w-fit min-w-5 select-none items-center justify-center gap-1 rounded-sm px-1 font-sans text-xs font-medium [&_svg:not([class*='size-'])]:size-3 [[data-slot=tooltip-content]_&]:bg-current/20 [[data-slot=tooltip-content]_&]:text-current [[data-slot=button]_&]:bg-current/20 [[data-slot=button]_&]:text-current";

export const kbdGroupStyles = "inline-flex items-center gap-1";
