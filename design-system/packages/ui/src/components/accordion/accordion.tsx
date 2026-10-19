import { cn } from "../../lib/cn";
import { ChevronDown } from "../icons";
import { Accordion as RadixAccordion } from "radix-ui";
import * as React from "react";
import {
  accordionContentInnerStyles,
  accordionContentStyles,
  accordionItemStyles,
  accordionTriggerStyles,
} from "./accordion.styles";
import type {
  AccordionContentProps,
  AccordionItemProps,
  AccordionProps,
  AccordionTriggerProps,
} from "./accordion.types";

/**
 * Accordion root. Controls single or multiple open items.
 *
 * **Simplified API (recommended):** pass `items` to avoid subcomponents.
 * **Composition API:** use AccordionItem / AccordionTrigger / AccordionContent when needed.
 *
 * @see [Accordion — shadcn/ui (Radix)](https://ui.shadcn.com/docs/components/accordion)
 */
const Accordion = ({
  items,
  itemClassName,
  triggerClassName,
  contentClassName,
  className,
  children,
  ref,
  ...props
}: AccordionProps & { ref?: React.Ref<React.ComponentRef<typeof RadixAccordion.Root>> }) => {
  const useSimplifiedAPI = items !== undefined;

  return (
    <RadixAccordion.Root ref={ref} data-slot="accordion" className={className} {...props}>
      {useSimplifiedAPI
        ? items?.map((item) => (
            <AccordionItem
              key={item.value}
              value={item.value}
              disabled={item.disabled}
              className={itemClassName}
            >
              <AccordionTrigger className={triggerClassName}>{item.trigger}</AccordionTrigger>
              <AccordionContent className={contentClassName}>{item.content}</AccordionContent>
            </AccordionItem>
          ))
        : children}
    </RadixAccordion.Root>
  );
};
Accordion.displayName = RadixAccordion.Root.displayName ?? "Accordion";

const AccordionItem = ({
  className,
  ref,
  ...props
}: AccordionItemProps & { ref?: React.Ref<React.ComponentRef<typeof RadixAccordion.Item>> }) => (
  <RadixAccordion.Item
    ref={ref}
    data-slot="accordion-item"
    className={cn(accordionItemStyles, className)}
    {...props}
  />
);
AccordionItem.displayName = RadixAccordion.Item.displayName ?? "AccordionItem";

const AccordionTrigger = ({
  className,
  children,
  ref,
  ...props
}: AccordionTriggerProps & {
  ref?: React.Ref<React.ComponentRef<typeof RadixAccordion.Trigger>>;
}) => (
  <RadixAccordion.Header className="flex">
    <RadixAccordion.Trigger
      ref={ref}
      data-slot="accordion-trigger"
      className={cn(accordionTriggerStyles, className)}
      {...props}
    >
      {children}
      <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform duration-200" />
    </RadixAccordion.Trigger>
  </RadixAccordion.Header>
);
AccordionTrigger.displayName = RadixAccordion.Trigger.displayName ?? "AccordionTrigger";

const AccordionContent = ({
  className,
  children,
  ref,
  ...props
}: AccordionContentProps & {
  ref?: React.Ref<React.ComponentRef<typeof RadixAccordion.Content>>;
}) => (
  <RadixAccordion.Content
    ref={ref}
    data-slot="accordion-content"
    className={cn(accordionContentStyles, className)}
    {...props}
  >
    <div className={accordionContentInnerStyles}>{children}</div>
  </RadixAccordion.Content>
);
AccordionContent.displayName = RadixAccordion.Content.displayName ?? "AccordionContent";

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
