import type * as React from "react";
import type { Command as CommandPrimitive } from "cmdk";

/**
 * Base props for the Command root component (composition API).
 *
 * Espelha os props do `cmdk` para permitir usos avançados via composição.
 */
export type CommandRootProps = React.ComponentPropsWithoutRef<typeof CommandPrimitive>;

export type CommandRootElement = React.ElementRef<typeof CommandPrimitive>;

export type CommandInputProps = React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>;

export type CommandInputElement = React.ElementRef<typeof CommandPrimitive.Input>;

export type CommandListProps = React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>;

export type CommandListElement = React.ElementRef<typeof CommandPrimitive.List>;

export type CommandEmptyProps = React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>;

export type CommandEmptyElement = React.ElementRef<typeof CommandPrimitive.Empty>;

export type CommandGroupProps = React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>;

export type CommandGroupElement = React.ElementRef<typeof CommandPrimitive.Group>;

export type CommandItemProps = React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>;

export type CommandItemElement = React.ElementRef<typeof CommandPrimitive.Item>;

export type CommandShortcutProps = React.HTMLAttributes<HTMLSpanElement>;

/**
 * Simplified, props-first API configs
 */
export interface CommandItemConfig {
  /**
   * Main label for the command item.
   *
   * @example "Calendar"
   */
  label: React.ReactNode;
  /**
   * Optional leading icon rendered before the label.
   *
   * @example <CalendarIcon className="h-4 w-4" />
   */
  icon?: React.ReactNode;
  /**
   * Optional keyboard shortcut shown on the right side.
   *
   * @example "⌘K"
   */
  shortcut?: React.ReactNode;
  /**
   * Called when the item is selected.
   */
  onSelect?: () => void;
}

export interface CommandGroupConfig {
  /**
   * Optional group heading displayed above the items.
   *
   * @example "Suggestions"
   */
  heading?: React.ReactNode;
  /**
   * Items contained in this group.
   */
  items: CommandItemConfig[];
}

export interface CommandProps extends CommandRootProps {
  /**
   * Placeholder text for the search input.
   *
   * @default "Type a command or search..."
   */
  placeholder?: string;
  /**
   * Message displayed when there are no results.
   *
   * @default "No results found."
   */
  emptyMessage?: React.ReactNode;
  /**
   * Groups and items to render using the simplified API.
   *
   * When provided, the Command will render:
   * - an input with the given placeholder
   * - a list with groups and items
   *
   * When omitted, the Command falls back to the composition API (children).
   */
  groups?: CommandGroupConfig[];
}
