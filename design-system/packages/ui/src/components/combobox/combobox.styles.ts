/**
 * Estilos do Combobox PRIZM baseados em tokens de `@grupoitss/prizm-tokens`.
 */

export const comboboxContentStyles =
  "relative max-h-(--available-height) w-(--anchor-width) max-w-(--available-width) min-w-[calc(var(--anchor-width)+--spacing(7))] origin-(--transform-origin) overflow-hidden rounded-lg bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[chips=true]:min-w-(--anchor-width) *:data-[slot=input-group]:m-1 *:data-[slot=input-group]:mb-0 *:data-[slot=input-group]:h-control-height-sm *:data-[slot=input-group]:rounded-lg *:data-[slot=input-group]:border-input/30 *:data-[slot=input-group]:bg-input/30 *:data-[slot=input-group]:shadow-none";

export const comboboxListStyles =
  "max-h-[min(18rem,calc(var(--available-height)-2.25rem))] overflow-y-auto scroll-py-1 overscroll-contain p-1 data-empty:p-0";

export const comboboxItemStyles =
  "relative flex w-full cursor-default select-none items-center gap-2 rounded-md py-1 pl-1.5 pr-8 text-sm text-foreground outline-hidden data-disabled:pointer-events-none data-disabled:opacity-50 data-highlighted:bg-accent data-highlighted:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4";

// Foco, erro e disabled seguem o InputGroup (decisões de 27/10/2026): anel de 2px
// em `ring` com a borda transparente; no erro a borda fica `destructive` e o anel
// continua `ring`; sem ring-3 nem ring/50 (mediam 1,66:1). Altura e texto vêm do size.
// Fundo, raio e sombra iguais ao Default (InputGroup), decisão de 28/10/2026.
export const comboboxChipsStyles =
  "flex flex-wrap items-center gap-1 rounded-md border bg-input-background bg-clip-padding shadow-xs px-2.5 py-1 transition-[color,box-shadow,border-color,background-color] border-input has-aria-invalid:border-destructive has-data-[slot=combobox-chip]:px-1";

/** Altura mínima e texto da caixa do Multiple por tamanho, como o Input. */
export const comboboxChipsSizeStyles = {
  sm: "min-h-control-height-sm text-xs",
  md: "min-h-control-height-md text-sm",
  lg: "min-h-control-height-lg text-base md:text-sm",
} as const;

export const comboboxChipStyles =
  "flex h-[calc(--spacing(5.25))] w-fit items-center justify-center gap-1 whitespace-nowrap rounded-sm bg-muted px-1.5 text-xs font-medium text-foreground has-data-[slot=combobox-chip-remove]:pr-0 has-disabled:pointer-events-none has-disabled:cursor-not-allowed";
