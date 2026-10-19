// Table com API por props (recomendado para casos simples)
export { Table } from "./table";
export type {
  TableCellRender,
  TableColumn,
  TableFooterCell,
  TableFooterRow,
  TableProps,
} from "./table.types";

// PRIZM cell renderers (Grid-compatible meta API)
export { ContentFormatType, ContentRenderType } from "./table-cell-renderers.types";
export { renderPrizmCell } from "./table-cell-renderers";
export { formatTableText } from "./table-cell-renderers.utils";
export { StatusColumnComponent } from "./status-column/status-column";
export type {
  StatusColumnAppearance,
  StatusColumnComponentProps,
} from "./status-column/status-column";
export { getStatusConfig, normalizeStatus } from "./status-column/status-column.constants";
export type { StatusConfig, StatusVariant } from "./status-column/status-column.constants";
export { GridActionMenu as ActionMenu } from "./table-action-menu";
export type {
  GridAction as ActionMenuItem,
  GridActionMenuProps as ActionMenuProps,
} from "./table-action-menu";
export type {
  ColumnStatus,
  ImageWithText,
  PrizmCellMeta,
  PrizmColumnMeta,
  RenderPopoverConfig,
  RenderPopoverContentArgs,
  RenderPopoverPosition,
  RenderPopoverTrigger,
  StatusSummaryItem,
  StatusSummaryValue,
  Tag,
} from "./table-cell-renderers.types";

// DataTable com TanStack Table (para tabelas avançadas)
export { DataTable } from "./data-table";
export type { DataTableProps, DataTableStatusFilterValue } from "./data-table";

// Primitivos para composição avançada
export {
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRoot,
  TableRow,
} from "./table-primitives";

// Estilos (classes)
export {
  tableBase,
  tableBody,
  tableCaption,
  tableCell,
  tableFooter,
  tableHead,
  tableHeader,
  tableRow,
  tableWrapper,
} from "./table.styles";

// Table parts (for TanStack Table composition)
export {
  TableBody as TableBodyPart,
  TableCaption as TableCaptionPart,
  TableCell as TableCellPart,
  TableElement,
  TableFooter as TableFooterPart,
  TableHead as TableHeadPart,
  TableHeader as TableHeaderPart,
  TableRow as TableRowPart,
  TableWrapper,
} from "./table-parts";

// DataTable com filtros (busca, status, selects)
export * from "./data-table-with-filters";
