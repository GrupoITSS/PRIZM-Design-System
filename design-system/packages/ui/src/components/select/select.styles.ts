import { cva, type VariantProps } from "class-variance-authority";

/**
 * PRIZM Select — estilos base usando tokens de `@grupoitss/prizm-tokens`.
 * Compatível com tema claro/escuro via variáveis CSS.
 *
 * Tamanhos, foco e disabled iguais aos do Input (decisões de 21/10/2026): sm, md e lg em
 * `control-height`; anel de 2px em `ring` com a borda transparente; disabled com opacidade 50% (26/10/2026).
 *
 * Baseado no componente Select do shadcn/ui (Radix).
 */
const selectTriggerBase =
  "flex w-full items-center gap-2 justify-between rounded-md border border-input bg-input-background px-3 py-2 text-left font-normal text-foreground shadow-xs ring-offset-background data-[placeholder]:text-muted-foreground hover:bg-input-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-transparent data-[state=open]:bg-input-background data-[state=open]:shadow-xs data-[state=open]:ring-[3px] data-[state=open]:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:min-w-0 [&>span]:flex-1 [&>span]:truncate [&>span]:text-left";

export const selectTriggerVariants = cva(selectTriggerBase, {
  variants: {
    size: {
      sm: "h-control-height-sm text-xs",
      /** Cockpit sheets/forms (PAS-2115 / PAS-2346). */
      md: "h-control-height-md text-sm",
      lg: "h-control-height-lg text-base md:text-sm",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type SelectTriggerVariantProps = VariantProps<typeof selectTriggerVariants>;

/** Estilos do conteúdo do dropdown do Select (portal). */
export const selectContentStyles =
  "mt-2 relative z-[300] max-h-[min(24rem,var(--radix-select-content-available-height))] min-w-[8rem] overflow-hidden rounded-md border border-input bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-select-content-transform-origin]";

/** Estilos do viewport interno do Select (lista de opções). */
export const selectViewportStyles =
  "p-1 w-full min-w-[var(--radix-select-trigger-width)] max-h-[inherit] overflow-y-auto";

/** Estilos do item de opção do Select. */
export const selectItemStyles =
  "relative flex w-full cursor-default select-none items-center rounded-md py-1.5 pl-2 pr-8 text-sm text-foreground outline-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50";

/** Estilos do label de grupo no dropdown (`Select.Label`). */
export const selectLabelStyles = "px-2 py-1.5 text-xs font-medium text-muted-foreground";

/** Estilos do separador de opções. */
export const selectSeparatorStyles = "-mx-1 my-1 h-px bg-border";

/** Estilos dos botões de scroll (quando a lista é longa). */
export const selectScrollButtonStyles =
  "flex cursor-default items-center justify-center py-1 text-muted-foreground";

/** Estilos do container do footer fixo do Select. */
export const selectFooterStyles = "p-1 pt-0";

/** Separador entre a lista de opções e o footer do Select. */
export const selectFooterSeparatorStyles = "mx-1 mb-1 h-px shrink-0 bg-border";

/** Estilos do item de ação no footer do Select. */
export const selectFooterItemStyles =
  "relative flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-2 py-1.5 text-sm text-foreground outline-none transition-colors hover:bg-accent hover:text-accent-foreground";
