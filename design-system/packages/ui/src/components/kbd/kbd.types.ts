import type * as React from "react";

/**
 * Props for a single key (no `keys` prop).
 * Renders one <kbd> with children.
 */
export interface KbdSingleProps extends React.ComponentProps<"kbd"> {
  /**
   * Content of the key (e.g. "⌘", "K", "Enter").
   * Use when rendering a single shortcut key.
   */
  children?: React.ReactNode;
  /** When set, renders multiple keys in a row; `children` is ignored. */
  keys?: never;
  /** Only with `keys`. */
  separator?: never;
}

/**
 * Props for multiple keys (with `keys` prop).
 * Renders a wrapper with one <kbd> per key.
 */
export interface KbdKeysProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  /**
   * Array of keys to show as a shortcut (e.g. ["⌘", "K"]).
   * Renders as a group of styled keys with gap.
   */
  keys: (string | React.ReactNode)[];
  /**
   * Shown between the keys when they are pressed together (e.g. "+" for Ctrl + Alt + B,
   * Figma KbdGroup "+ Separated"). Without it, the keys sit side by side.
   */
  separator?: React.ReactNode;
  /** Ignored when `keys` is provided. */
  children?: never;
}

/**
 * Kbd component props — props-based API only.
 * - Single key: <Kbd>⌘</Kbd>
 * - Multiple keys: <Kbd keys={["⌘", "K"]} />
 *
 * @see https://ui.shadcn.com/docs/components/kbd
 */
export type KbdProps = KbdSingleProps | KbdKeysProps;
