import type * as React from "react";
import type { BadgeVariantProps } from "./badge.styles";

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>, BadgeVariantProps {
  /**
   * Semantic color, as in the Figma component. Required.
   */
  variant: NonNullable<BadgeVariantProps["variant"]>;
  /**
   * `number` renders a round counter (min 20px wide) for digits, as in the Figma "Badge Number".
   * `dot` renders an 8px point (Figma "Badge Dot"): `children` becomes screen-reader-only text,
   * and is required. The dot exists in `default`, `destructive`, `success`, `warning` and
   * `verified`.
   * @default "default"
   */
  shape?: NonNullable<BadgeVariantProps["shape"]>;
  /**
   * Badge link: renders the single child element (an `<a>`, or a router Link that renders one)
   * with the badge styles, and turns on hover and focus. Never inside a Button: the button
   * itself is the action.
   * @default false
   */
  asChild?: boolean;
  /**
   * Dot only: a halo that grows and fades, for something in progress. Off with reduced motion.
   * @default false
   */
  pulse?: boolean;
  /**
   * When true, marks the badge as loading (a11y only).
   * Visual spinners should be provided via `startIcon`/`endIcon`.
   * @default false
   */
  loading?: boolean;
  /**
   * Icon rendered before the text.
   * Equivalent to manually placing an element with `data-icon="inline-start"`.
   */
  startIcon?: React.ReactNode;
  /**
   * Icon rendered after the text.
   * Equivalent to manually placing an element with `data-icon="inline-end"`.
   */
  endIcon?: React.ReactNode;
}
