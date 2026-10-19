import type * as React from "react";
import type { TabsVariantProps } from "./tabs.styles";

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
   * Tab orientation.
   * @default "horizontal"
   */
  orientation?: "horizontal" | "vertical";
  /**
   * Activation mode (automatic on focus or manual on click).
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
   * Advanced composition: when `items` is not provided,
   * children will be rendered directly inside the Tabs root.
   */
  children?: React.ReactNode;
  /**
   * Classe extra no wrapper da lista (ex.: `-mx-8 px-8` para o divisor full-bleed).
   */
  listClassName?: string;
  /**
   * Additional className for the root element.
   */
  className?: string;
}
