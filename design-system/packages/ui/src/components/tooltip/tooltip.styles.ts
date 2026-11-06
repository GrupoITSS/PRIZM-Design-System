/**
 * PRIZM Tooltip — content bubble styles using design tokens from @grupoitss/prizm-tokens.
 *
 * Decisões de 06/11/2026: balão em `color/tooltip` com texto em `color/tooltip-foreground` (escuro
 * nos dois modos, igual em todas as marcas), `text-xs` com peso normal, seta em `color/tooltip`,
 * sem sombra nem borda, largura máxima `max-w-sm` com quebra equilibrada.
 *
 * @see [Tooltip — shadcn/ui (Radix)](https://ui.shadcn.com/docs/components/tooltip)
 */
export const tooltipContentStyles = [
  "z-50 w-fit max-w-sm rounded-md bg-tooltip px-3 py-1.5 text-xs font-normal text-balance text-tooltip-foreground",
  "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
  "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  "origin-[--radix-tooltip-content-transform-origin]",
].join(" ");

/**
 * Seta do balão (10px, `width/2-5` no Figma), na cor do balão, apontando para o gatilho.
 */
export const tooltipArrowStyles =
  "z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] bg-tooltip fill-tooltip";
