import type { Tabs as RadixTabs } from "radix-ui";
import type * as React from "react";
import type { TabsVariantProps } from "./tabs.styles";

export type TabsVariant = "underline" | "pills";

export interface TabsItem {
  /**
   * Unique value used to identify the tab. Must match Root's `value`.
   */
  value: string;
  /**
   * Label rendered inside the tab trigger.
   */
  label: React.ReactNode;
  /**
   * Content rendered inside the corresponding tab content.
   */
  content: React.ReactNode;
  /**
   * Optional icon rendered before the label in the trigger.
   */
  icon?: React.ReactNode;
  /**
   * Optional counter after the label (ex.: pendências). A number or string becomes a
   * Badge `shape="number"`; any other node is rendered as is. It is part of the tab name.
   */
  badge?: React.ReactNode;
  /**
   * Whether this tab is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * Hint shown on hover. Needed for disabled tabs, whose trigger does not receive pointer events.
   */
  tooltip?: string;
}

export interface TabsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "dir">, TabsVariantProps {
  /**
   * List of tab items for the simplified API.
   * When provided, triggers and contents are rendered automatically.
   */
  items?: TabsItem[];
  /**
   * Controlled selected tab value.
   */
  value?: string;
  /**
   * Default selected tab value when uncontrolled.
   * @default items?.[0]?.value
   */
  defaultValue?: string;
  /**
   * Activation mode: "automatic" selects on arrow focus; "manual" selects with Enter or Space.
   * @default "automatic"
   */
  activationMode?: "automatic" | "manual";
  /**
   * Callback when the selected tab changes.
   */
  onValueChange?: (value: string) => void;
  /**
   * If true, makes triggers expand to fill the available width.
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Composition: when `items` is not provided, children are rendered inside the root.
   * Use `TabsList`, `TabsTrigger` and `TabsContent`.
   */
  children?: React.ReactNode;
  /**
   * Classe extra no contêiner da lista (ex.: `-mx-8 px-8` para o divisor full-bleed).
   */
  listClassName?: string;
  /**
   * Additional className for the root element.
   */
  className?: string;
}

export interface TabsListProps extends React.ComponentProps<typeof RadixTabs.List> {
  /** Triggers divide the list width in equal parts. */
  fullWidth?: boolean;
  /** Class for the container around the list (it holds the underline border). */
  containerClassName?: string;
}

export interface TabsTriggerProps extends React.ComponentProps<typeof RadixTabs.Trigger> {
  /** Icon before the label. */
  icon?: React.ReactNode;
  /** Counter after the label; a number or string becomes a Badge `shape="number"`. */
  badge?: React.ReactNode;
}

export type TabsContentProps = React.ComponentProps<typeof RadixTabs.Content>;
