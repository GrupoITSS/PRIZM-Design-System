import type * as React from "react";
import type { Collapsible as RadixCollapsible } from "radix-ui";
import type { CollapsibleTriggerVariantProps } from "./collapsible.styles";

export interface CollapsibleProps extends Omit<
  React.ComponentPropsWithoutRef<typeof RadixCollapsible.Root>,
  "children"
> {
  /**
   * Children: when using simplified API (trigger is set), this is the expandable content.
   * When using composition API (trigger is not set), children are CollapsibleTrigger and CollapsibleContent.
   */
  children?: React.ReactNode;
  /**
   * Simplified API: label or content of the trigger. When provided, the component renders
   * trigger + content internally. Can be a function (isOpen) => ReactNode for state-dependent trigger (e.g. icon swap).
   *
   * @example "Product details"
   * @example (isOpen) => isOpen ? <MinimizeIcon /> : <MaximizeIcon />
   */
  trigger?: React.ReactNode | ((isOpen: boolean) => React.ReactNode);
  /**
   * Optional icon shown after the trigger text (e.g. ChevronDown). Only used when trigger is not a function.
   */
  triggerIcon?: React.ReactNode;
  /**
   * Trigger style variant when using simplified API.
   * @default "default"
   */
  triggerVariant?: CollapsibleTriggerVariantProps["variant"];
  /**
   * Optional className for the trigger when using simplified API.
   */
  triggerClassName?: string;
  /**
   * Optional className for the content wrapper when using simplified API.
   */
  contentClassName?: string;
}

export type CollapsibleTriggerProps = React.ComponentPropsWithoutRef<
  typeof RadixCollapsible.Trigger
> &
  CollapsibleTriggerVariantProps;

export type CollapsibleContentProps = React.ComponentPropsWithoutRef<
  typeof RadixCollapsible.Content
>;
