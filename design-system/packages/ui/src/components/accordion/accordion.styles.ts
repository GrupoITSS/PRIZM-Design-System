/**
 * PRIZM Accordion — styles use design tokens from @grupoitss/prizm-tokens.
 * Neutral borders (border-border), compatible with light/dark.
 *
 * @see [Accordion — shadcn/ui (Radix)](https://ui.shadcn.com/docs/components/accordion)
 */

export const accordionItemStyles =
  "border-b border-border last:border-b-0 last:border-b-transparent";

export const accordionTriggerStyles =
  "flex flex-1 cursor-pointer items-center justify-between py-4 font-medium text-foreground transition-all hover:underline [&[data-state=open]>svg]:rotate-180";

export const accordionContentStyles =
  "overflow-hidden text-sm text-muted-foreground transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down";

export const accordionContentInnerStyles = "pb-4 pt-0";
