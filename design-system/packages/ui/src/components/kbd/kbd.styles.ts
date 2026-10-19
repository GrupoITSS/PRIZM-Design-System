/**
 * PRIZM Kbd — styles use design tokens from @grupoitss/prizm-tokens.
 * Single key and group wrapper for shortcut display.
 *
 * @see https://ui.shadcn.com/docs/components/kbd
 */
export const kbdStyles =
  "bg-muted text-muted-foreground pointer-events-none inline-flex h-5 w-fit min-w-5 select-none items-center justify-center gap-1 rounded-sm px-1 font-sans text-xs font-medium [&_svg:not([class*='size-'])]:size-3 [[data-slot=tooltip-content]_&]:bg-background/20 [[data-slot=tooltip-content]_&]:text-background";

export const kbdGroupStyles = "inline-flex items-center gap-1";
