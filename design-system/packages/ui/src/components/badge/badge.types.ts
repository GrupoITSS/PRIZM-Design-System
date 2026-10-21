import type * as React from "react";
import type { BadgeVariantProps } from "./badge.styles";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, BadgeVariantProps {
  /**
   * Semantic color. Required.
   */
  variant: NonNullable<BadgeVariantProps["variant"]>;
  /**
   * Surface: solid fill, tinted outline, or icon-only color with theme text.
   * @default "contained"
   */
  appearance?: NonNullable<BadgeVariantProps["appearance"]>;
  /**
   * `number` renders a round counter (min 20px wide) for digits, as in the Figma "Badge Number".
   * @default "default"
   */
  shape?: NonNullable<BadgeVariantProps["shape"]>;
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
