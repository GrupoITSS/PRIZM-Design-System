/**
 * PRIZM Kbd — styles use design tokens from @grupoitss/prizm-tokens.
 * Single key and group wrapper for shortcut display.
 *
 * Inside a button the key follows the Badge rule (Figma "Contexto"): on a filled
 * Button (`default`, `destructive`) it takes the button's text color with a 20%
 * background of the same color; on neutral buttons (secondary, outline, ghost,
 * link, text) it keeps `muted`. Inside a tooltip it takes the text color of its
 * parent (currentColor) with a 20% background, since PRIZM's tooltip is `bg-popover`.
 *
 * Open (decision of 23/10/2026): on filled buttons the key text is below 4.5:1
 * (3.33–7.31:1 on primary, 3.47–4.23:1 on destructive). Inverting like the Badge
 * passes in every brand; it was left for later.
 *
 * @see https://ui.shadcn.com/docs/components/kbd
 */
export const kbdStyles = [
  "bg-muted text-muted-foreground pointer-events-none inline-flex h-5 w-fit min-w-5 select-none items-center justify-center gap-1 rounded-sm px-1 font-sans text-xs font-medium [&_svg:not([class*='size-'])]:size-3",
  "[[data-slot=tooltip-content]_&]:bg-current/20 [[data-slot=tooltip-content]_&]:text-current",
  "[[data-slot=button][data-variant=default]_&]:bg-primary-foreground/20 [[data-slot=button][data-variant=default]_&]:text-primary-foreground",
  "[[data-slot=button][data-variant=destructive]_&]:bg-destructive-foreground/20 [[data-slot=button][data-variant=destructive]_&]:text-destructive-foreground",
].join(" ");

export const kbdGroupStyles = "inline-flex items-center gap-1";

/** The "+" between keys (Figma KbdGroup "+ Separated"): regular weight, in the key's text color. */
export const kbdSeparatorStyles = [
  "text-muted-foreground font-sans text-xs font-normal",
  "[[data-slot=tooltip-content]_&]:text-current",
  "[[data-slot=button][data-variant=default]_&]:text-primary-foreground",
  "[[data-slot=button][data-variant=destructive]_&]:text-destructive-foreground",
].join(" ");
