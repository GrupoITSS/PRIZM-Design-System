import type * as React from "react";
import type { Collapsible as RadixCollapsible } from "radix-ui";

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
   * Optional icon shown after the trigger text (e.g. ChevronDown). It stays out of the button name
   * (aria-hidden) and rotates 180° when the panel is open.
   */
  triggerIcon?: React.ReactNode;
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
>;

export type CollapsibleContentProps = React.ComponentPropsWithoutRef<
  typeof RadixCollapsible.Content
>;
