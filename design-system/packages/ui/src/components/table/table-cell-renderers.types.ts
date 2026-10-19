import type * as React from "react";

export enum ContentRenderType {
  TEXT = "text",
  STATUS = "status",
  STATUS_SUMMARY_WITH_POPOVER = "status-summary-with-popover",
  TEXT_IMAGE = "text-image",
  TEXT_BUTTON = "text-button",
  HOVER = "hover",
  BADGE = "badge",
  ACTIONS = "actions",
}

export enum ContentFormatType {
  CNPJ = "cnpj",
  CPF = "cpf",
  CEP = "cep",
  DATE = "date",
  PHONE = "phone",
  DATE_TIME = "date-time",
  PERCENTAGE = "percentage",
  CURRENCY = "currency",
}

export type ColumnStatus =
  "PENDING" | "IN_PROGRESS" | "COMPLETED" | "ERROR" | "ACTIVE" | "INACTIVE" | (string & {});

export type ImageWithText = {
  imageUrl?: string;
  text: string;
};

export type StatusSummaryItem = {
  type: string;
  status: string;
  value: string;
};

export type StatusSummaryValue = {
  summary: string;
  statusItems?: StatusSummaryItem[];
};

export type Tag = {
  id: string;
  name: string;
};

export type RenderPopoverTrigger = "hover" | "click";
export type RenderPopoverPosition = "top" | "bottom" | "left" | "right";

export type RenderPopoverContentArgs<TRow = unknown> = {
  row: TRow;
  value: unknown;
  /**
   * Provided for compatibility with Grid's renderPopover implementation
   * (which historically receives getValue + row in some places).
   */
  getValue?: () => unknown;
};

export interface RenderPopoverConfig<TRow = unknown> {
  title?: React.ReactNode;
  content: (args: RenderPopoverContentArgs<TRow>) => React.ReactNode;
  position?: RenderPopoverPosition;
  trigger?: RenderPopoverTrigger;
}

/**
 * Column-level meta config for PRIZM Table/DataTable cell renderers.
 * Designed to be compatible with the Grid meta API:
 * `columnDef.meta.rows.contentRenderType`, etc.
 */
export interface PrizmCellMeta<TRow = unknown> {
  contentRenderType?: ContentRenderType | `${ContentRenderType}`;
  contentFormatType?: ContentFormatType | `${ContentFormatType}`;
  /** Link template (supports ":id") or function. */
  link?: string | ((row: TRow) => string | undefined);
  /** Called when a clickable cell is activated. Receives (rowId, row). */
  onColumnClick?: (rowId: string, row: TRow) => void;
  renderPopover?: RenderPopoverConfig<TRow> | null;

  /** Optional custom labels for STATUS. */
  statusLabels?: Partial<Record<ColumnStatus, string>> | Record<string, string>;
  /**
   * Column titles for the STATUS_SUMMARY_WITH_POPOVER detail panel (i18n).
   * @default English "Type", "Item", "Status"
   */
  statusSummaryColumnHeaders?: {
    type: string;
    item: string;
    status: string;
  };
  /** Max visible tags for BADGE. @default 2 */
  badgeMaxVisible?: number;
  /** Horizontal alignment for table cells when using DataTable (`td` / `th`). */
  cellAlign?: "left" | "right" | "center";
  /** Custom cell renderer (Grid compat). */
  cell?: (ctx: { getValue: () => unknown; row: unknown }) => React.ReactNode;
  actions?: unknown;
}

export interface PrizmColumnMeta<TRow = unknown> {
  rows?: PrizmCellMeta<TRow>;
}
