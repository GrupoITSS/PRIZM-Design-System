import { cva, type VariantProps } from "class-variance-authority";

/**
 * PRIZM Collapsible — trigger and content styles.
 * Uses design tokens from @grupoitss/prizm-tokens.
 *
 * Decisões de 06/11/2026, alinhadas ao título do Accordion (mesma família): hover e pressed com
 * fundo `accent` (texto e ícone em `accent-foreground`), foco do Prizm (anel `ring` com offset
 * `ring-offset`, fundo `ring-offset` como no Figma), disabled a 50% sem clique, `px-2 py-4`, `gap-4` até o ícone, `rounded-md`,
 * `text-sm` à esquerda. Sai a variante ghost. O ícone gira 180° com o painel aberto.
 *
 * @see https://ui.shadcn.com/docs/components/collapsible
 * @see https://www.radix-ui.com/docs/primitives/components/collapsible
 */
export const collapsibleTriggerStyles = [
  "flex w-full cursor-pointer items-center justify-between gap-4 rounded-md px-2 py-4 text-left text-sm font-medium text-foreground",
  "outline-none transition-colors",
  "hover:bg-accent hover:text-accent-foreground active:bg-accent active:text-accent-foreground",
  "[&_[data-slot=collapsible-icon]]:text-muted-foreground hover:[&_[data-slot=collapsible-icon]]:text-accent-foreground active:[&_[data-slot=collapsible-icon]]:text-accent-foreground",
  "focus-visible:bg-ring-offset focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-ring-offset",
  "disabled:pointer-events-none disabled:opacity-50",
].join(" ");

/**
 * Ícone do gatilho (`triggerIcon`): fora do nome do botão e girando 180° com o painel aberto.
 */
export const collapsibleIconStyles =
  "ml-auto inline-flex shrink-0 transition-transform duration-200 [&_svg]:size-4 group-data-[state=open]/collapsible:rotate-180";

/**
 * @deprecated Desde 06/11/2026 o gatilho não tem variantes (a ghost saiu). Use
 * `collapsibleTriggerStyles`. Mantido para quem importava a função.
 */
export const collapsibleTriggerVariants = cva(collapsibleTriggerStyles);

/** @deprecated O gatilho não tem mais variantes. */
export type CollapsibleTriggerVariantProps = VariantProps<typeof collapsibleTriggerVariants>;

/**
 * Collapsible content wrapper — animated expand/collapse.
 */
export const collapsibleContentStyles = [
  "overflow-hidden",
  "data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down",
].join(" ");
