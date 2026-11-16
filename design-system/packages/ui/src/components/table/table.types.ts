import type { Getter, Row } from "@tanstack/react-table";
import type * as React from "react";
import type {
  ContentFormatType,
  ContentRenderType,
  PrizmCellMeta,
  RenderPopoverConfig,
} from "./table-cell-renderers.types";

/** Callback de célula no formato usado pelas colunas do DataTable. */
export type TableCellRender = (props: {
  getValue: Getter<unknown>;
  row: Row<unknown>;
}) => React.ReactNode;

/** Definition of a table column (header + how to render cells). */
export interface TableColumn<T = Record<string, unknown>> {
  /** Unique key matching row data. */
  key: string;
  /** Header content (string or ReactNode). */
  header: React.ReactNode;
  /** Cell alignment. @default 'left' */
  align?: "left" | "right" | "center";
  /** Optional width (e.g. "100px", "w-[100px]"). */
  width?: string;
  /** Optional class for header. */
  className?: string;
  /** Optional class for body cells of this column. */
  cellClassName?: string;
  /**
   * Custom cell renderer. Receives cell value, full row and the row meta (depth and, on rows
   * with sub-rows, `subRows` — e.g. to show the sum of the sub-rows on the parent).
   */
  render?: (value: unknown, row: T, meta: TableRowMeta<T>) => React.ReactNode;

  /**
   * Optional PRIZM cell render behavior (compatible with Grid meta API).
   * If `render` is provided, it takes precedence.
   */
  contentRenderType?: ContentRenderType | `${ContentRenderType}`;
  contentFormatType?: ContentFormatType | `${ContentFormatType}`;
  link?: PrizmCellMeta<T>["link"];
  onColumnClick?: PrizmCellMeta<T>["onColumnClick"];
  renderPopover?: RenderPopoverConfig<T> | null;
  statusLabels?: PrizmCellMeta<T>["statusLabels"];
  statusSummaryColumnHeaders?: PrizmCellMeta<T>["statusSummaryColumnHeaders"];
  badgeMaxVisible?: number;
}

/** Row context passed to `render` (third argument). */
export interface TableRowMeta<T = Record<string, unknown>> {
  /** 0 for top-level rows, 1 for sub-rows. */
  depth: number;
  /** Sub-rows of this row (from `getSubRows`); only on rows that have them. */
  subRows?: T[];
  /** Whether a row with sub-rows is open. */
  isExpanded?: boolean;
}

/** One cell in a footer row. */
export interface TableFooterCell {
  content: React.ReactNode;
  colSpan?: number;
  /** @default 'left' */
  align?: "left" | "right" | "center";
  className?: string;
}

/** One footer row: array of cells. */
export type TableFooterRow = TableFooterCell[];

export interface TableProps<T = Record<string, unknown>> extends Omit<
  React.HTMLAttributes<HTMLTableElement>,
  "children"
> {
  /** Column definitions (key, header, align, render, etc.). */
  columns: TableColumn<T>[];
  /** Data rows; each row is keyed by column keys. */
  rows: T[];
  /** Optional caption (e.g. "A list of your recent invoices."). */
  caption?: React.ReactNode;
  /** Optional footer rows (array of rows, each row is array of cells). */
  footerRows?: TableFooterRow[];
  /** Shown when rows is empty. */
  emptyMessage?: React.ReactNode;
  /** Key extractor for list items. @default (_, i) => String(i) */
  getRowKey?: (row: T, index: number) => string;
  /** Optional class for the wrapper (scroll container). */
  className?: string;
  /** Optional class for the <table> element. */
  tableClassName?: string;
  /**
   * Sub-rows of a row (one level). Rows with sub-rows get a button to expand them, in a column
   * added at the left; sub-rows use the same columns, with the first data column indented.
   * Footer rows: the first cell spans the extra column automatically.
   */
  getSubRows?: (row: T) => T[] | undefined;
  /** Rows open on the first render, by `getRowKey`; `true` opens all. Uncontrolled. */
  defaultExpanded?: string[] | true;
  /** Open rows, by `getRowKey` (controlled). */
  expanded?: string[];
  /** Called with the open row keys when a row is expanded or collapsed. */
  onExpandedChange?: (expanded: string[]) => void;
  /**
   * Accessible name of the expand button. Default: "Expandir" or "Recolher" plus the text of the
   * first column (e.g. "Expandir Produto A").
   */
  getExpandLabel?: (row: T, isExpanded: boolean) => string;
  /** Visually hidden header of the expand column. @default "Expandir" */
  expandColumnLabel?: string;
}
