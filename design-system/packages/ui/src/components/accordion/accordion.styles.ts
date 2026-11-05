/**
 * PRIZM Accordion — styles use design tokens from @grupoitss/prizm-tokens.
 * Neutral borders (border-border), compatible with light/dark.
 *
 * Decisões de 05/11/2026: hover e pressed com fundo `accent` (texto e chevron em
 * `accent-foreground`), foco do Prizm (anel `ring` com offset `ring-offset`), disabled a 50%
 * no item inteiro e sem clique, título `text-sm` alinhado à esquerda, conteúdo em `foreground`
 * com `spacing/1` em cima para o anel não cobrir a primeira linha.
 *
 * @see [Accordion — shadcn/ui (Radix)](https://ui.shadcn.com/docs/components/accordion)
 */

export const accordionItemStyles =
  "border-b border-border last:border-b-0 last:border-b-transparent data-[disabled]:opacity-50";

export const accordionTriggerStyles =
  "flex flex-1 cursor-pointer items-center justify-between rounded-md px-2 py-4 text-left text-sm font-medium text-foreground outline-none transition-all hover:bg-accent hover:text-accent-foreground hover:[&>svg]:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-ring-offset disabled:pointer-events-none [&[data-state=open]>svg]:rotate-180";

export const accordionContentStyles =
  "overflow-hidden text-sm text-foreground transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down";

export const accordionContentInnerStyles = "px-2 pt-1 pb-4";
