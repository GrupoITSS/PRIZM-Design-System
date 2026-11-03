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
   * Show the Previous / Next buttons.
   * @default true
   */
  showPrevNext?: boolean;
  /**
   * Show the First / Last buttons (icons ChevronsLeft / ChevronsRight).
   * @default false
   */
  showFirstLast?: boolean;
  /**
   * When true, only the arrows are shown, as icons (no page numbers). Useful for data tables with a rows-per-page selector.
   * @default false
   */
  iconsOnly?: boolean;
  /**
   * Show the chevron icons on Previous, Next, First and Last. With `false`, they show only the text.
   * Ignored in `iconsOnly` and in the `icon` / `icon-sm` sizes, where the arrows are icon only.
   * @default true
   */
  showIcons?: boolean;
  /**
   * Number of page numbers to show on each side of the current page (before ellipsis).
   * @default 1
   */
  siblingCount?: number;
  /**
   * Text of the Previous button. Hidden in `iconsOnly` and in the icon sizes (the button keeps its aria-label).
   * @default "Anterior"
   */
  prevLabel?: React.ReactNode;
  /**
   * Text of the Next button.
   * @default "Próxima"
   */
  nextLabel?: React.ReactNode;
  /**
   * Text of the First button.
   * @default "Primeira"
   */
  firstLabel?: React.ReactNode;
  /**
   * Text of the Last button.
   * @default "Última"
   */
  lastLabel?: React.ReactNode;
  /**
   * Accessible name of the navigation landmark.
   * @default "Paginação"
   */
  "aria-label"?: string;
}
