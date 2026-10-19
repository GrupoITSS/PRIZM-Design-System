import type * as React from "react";
import type { Accordion as RadixAccordion } from "radix-ui";

export interface AccordionItemData {
  /**
   * Unique value for the item (Radix requirement).
   * @example "account-settings"
   */
  value: string;
  /**
   * Trigger content (usually a short title).
   * @example "Is it accessible?"
   */
  trigger: React.ReactNode;
  /**
   * Collapsible content body.
   */
  content: React.ReactNode;
  /**
   * Disable this item.
   * @default false
   */
  disabled?: boolean;
}

export type AccordionProps = React.ComponentPropsWithoutRef<typeof RadixAccordion.Root> & {
  /**
   * Simplified API: provide items to avoid using subcomponents.
   * When `items` is provided, `children` is ignored.
   */
  items?: AccordionItemData[];
  /**
   * Optional className applied to every item when using `items`.
   */
  itemClassName?: string;
  /**
   * Optional className applied to every trigger when using `items`.
   */
  triggerClassName?: string;
  /**
   * Optional className applied to every content when using `items`.
   */
  contentClassName?: string;
};

export type AccordionItemProps = React.ComponentPropsWithoutRef<typeof RadixAccordion.Item>;

export type AccordionTriggerProps = React.ComponentPropsWithoutRef<typeof RadixAccordion.Trigger>;

export type AccordionContentProps = React.ComponentPropsWithoutRef<typeof RadixAccordion.Content>;
