import type * as React from "react";
import type { PaginationVariantProps } from "./pagination.styles";

export interface PaginationProps
  extends Omit<React.ComponentProps<"nav">, "children">, PaginationVariantProps {
  /**
   * Current page (1-based).
   */
  page: number;
  /**
   * Total number of pages.
   */
  totalPages: number;
  /**
   * Called when the user selects a page (SPA). If omitted and `getHref` is also omitted, buttons still render but do nothing.
   */
  onPageChange?: (page: number) => void;
  /**
   * If provided, page links render as `<a href={getHref(page)}>` for SSR/navigation. When set, `onPageChange` is still called on click if provided (caller can preventDefault and use client-side logic).
   * @example (page) => `?page=${page}`
   */
  getHref?: (page: number) => string;
  /**
   * Show Previous / Next buttons.
   * @default true
   */
  showPrevNext?: boolean;
  /**
   * Show First / Last page buttons.
   * @default false
   */
  showFirstLast?: boolean;
  /**
   * When true, only Previous and Next are shown (no page numbers). Useful for data tables with a rows-per-page selector.
   * @default false
   */
  iconsOnly?: boolean;
  /**
   * Number of page numbers to show on each side of the current page (before ellipsis).
   * @default 1
   */
  siblingCount?: number;
  /**
   * Label for the Previous button (text or node). When `iconsOnly` is true, only the icon is shown; this can be used for aria-label.
   * @default "Previous"
   */
  prevLabel?: React.ReactNode;
  /**
   * Label for the Next button.
   * @default "Next"
   */
  nextLabel?: React.ReactNode;
  /**
   * Label for the First button (e.g. "First" or "1").
   * @default "First"
   */
  firstLabel?: React.ReactNode;
  /**
   * Label for the Last button.
   * @default "Last"
   */
  lastLabel?: React.ReactNode;
  /**
   * Accessible label for the navigation landmark.
   * @default "pagination"
   */
  "aria-label"?: string;
}
