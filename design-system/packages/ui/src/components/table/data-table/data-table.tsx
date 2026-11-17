import { Button } from "../../button";
import { Checkbox } from "../../checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../dropdown-menu";
import { Select } from "../../select";
import { Skeleton } from "../../skeleton";
import { Empty } from "../../empty";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  Columns3,
  FolderOpen,
  Search,
} from "../../icons";
import { Input } from "../../input";
import type {
  CellContext,
  Column,
  ColumnDef,
  ColumnFiltersState,
  ColumnPinningState,
  OnChangeFn,
  Row,
  RowSelectionState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { cn } from "../../../lib/cn";
import * as React from "react";
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from "../table-primitives";
import type { PrizmCellMeta, PrizmColumnMeta } from "../table-cell-renderers.types";
import { ContentRenderType } from "../table-cell-renderers.types";
import { renderPrizmCell } from "../table-cell-renderers";
import { alignCenter, alignLeft, alignRight } from "../table.styles";
import { toText } from "../../../lib/to-text";
import { TruncatedText } from "../table-truncated-text";
import {
  dataTableCell,
  dataTableCellNumeric,
  dataTableDetailCell,
  dataTableDetailRow,
  dataTableExpandCell,
  dataTableGroupCell,
  dataTableGroupCount,
  dataTableGroupRow,
  dataTableHead,
  dataTableRowClickable,
  dataTableRowEmphasis,
  dataTableRowEmphasisBar,
  dataTableSkeleton,
  dataTableStickyCell,
  dataTableStickyEdgeLeft,
  dataTableStickyEdgeRight,
  dataTableStickyHead,
  dataTableStickyHeader,
  dataTableSummaryRow,
  type DataTableRowEmphasis,
} from "./data-table.styles";

function getPrizmRowsMeta(meta: unknown): PrizmCellMeta<unknown> | null {
  if (!meta || typeof meta !== "object") return null;
  const m = meta as PrizmColumnMeta<unknown> & {
    prizm?: PrizmColumnMeta<unknown> | PrizmCellMeta<unknown>;
  };
  if (m.rows) return m.rows;
  if (m.prizm && typeof m.prizm === "object") {
    if ("rows" in m.prizm && m.prizm.rows) {
      return m.prizm.rows;
    }
    return m.prizm as PrizmCellMeta<unknown>;
  }
  return null;
}

const PRIZM_RENDER_TYPES = new Set<string>([
  ContentRenderType.STATUS,
  ContentRenderType.STATUS_SUMMARY_WITH_POPOVER,
  ContentRenderType.TEXT_IMAGE,
  ContentRenderType.TEXT_BUTTON,
  ContentRenderType.HOVER,
  ContentRenderType.BADGE,
  ContentRenderType.ACTIONS,
  "status",
  "status-summary-with-popover",
  "text-image",
  "text-button",
  "hover",
  "badge",
  "actions",
]);

function needsPrizmCellRenderer(rowsMeta: PrizmCellMeta<unknown>): boolean {
  const renderType = String(rowsMeta.contentRenderType ?? "");
  return (
    PRIZM_RENDER_TYPES.has(renderType) ||
    Boolean(rowsMeta.contentFormatType) ||
    Boolean(rowsMeta.link) ||
    Boolean(rowsMeta.onColumnClick) ||
    Boolean(rowsMeta.renderPopover) ||
    Boolean(rowsMeta.actions)
  );
}

function cellAlignClassName(
  meta: unknown,
  fallback?: "left" | "right" | "center",
): string | undefined {
  const a = getPrizmRowsMeta(meta)?.cellAlign ?? fallback;
  if (a === "center") return alignCenter;
  if (a === "right") return alignRight;
  if (a === "left") return alignLeft;
  return undefined;
}

const STATUS_COLUMN_MIN_SIZE = 168;
const STATUS_COLUMN_IDS = new Set(["status", "displayStatus"]);

function columnAccessorKey(col: ColumnDef<unknown, unknown>): string | undefined {
  const accessorKey = (col as { accessorKey?: unknown }).accessorKey;
  return typeof accessorKey === "string" ? accessorKey : undefined;
}

function isStatusColumnId(id: string | undefined): boolean {
  return id != null && STATUS_COLUMN_IDS.has(id);
}

function isStatusLikeMeta(meta: unknown): boolean {
  // contentRenderType accepts the enum or its string value; they're equal.
  const renderType: string = getPrizmRowsMeta(meta)?.contentRenderType ?? "";
  return renderType === "status" || renderType === "status-summary-with-popover";
}

function isStatusLikeColumn(column: { id: string; columnDef: { meta?: unknown } }): boolean {
  return isStatusColumnId(column.id) || isStatusLikeMeta(column.columnDef.meta);
}

function withStatusColumnSize<TData, TValue>(
  col: ColumnDef<TData, TValue>,
): ColumnDef<TData, TValue> {
  const colId = col.id ?? columnAccessorKey(col as ColumnDef<unknown, unknown>);
  if (!isStatusLikeMeta(col.meta) && !isStatusColumnId(colId)) return col;
  if (col.size != null && col.size >= STATUS_COLUMN_MIN_SIZE) return col;
  return { ...col, size: STATUS_COLUMN_MIN_SIZE };
}

function columnWidthStyle(
  size: number | undefined,
  lockSize = false,
): React.CSSProperties | undefined {
  if (size == null) return undefined;
  return lockSize
    ? { width: size, minWidth: size, maxWidth: size }
    : { width: size, minWidth: size };
}

const FILTER_ALL_VALUE = "__all__";
const SELECT_COLUMN_ID = "select";
const EXPAND_COLUMN_ID = "expand";

/** Elementos que têm clique próprio: o clique e o Enter neles não abrem a linha. */
const INTERACTIVE_SELECTOR =
  "button, a, input, select, textarea, [role='menuitem'], [role='checkbox'], [role='combobox']";

function defaultRowId<TData>(
  row: TData,
  index: number,
  getRowId?: (originalRow: TData, index: number, parent?: unknown) => string,
  parent?: unknown,
) {
  if (getRowId) return getRowId(row, index, parent);
  if (row && typeof row === "object" && "id" in row) {
    const id = (row as { id?: unknown }).id;
    if (toText(id).trim() !== "") return toText(id);
  }
  return String(index);
}

function selectedIdList(selection: RowSelectionState) {
  return Object.keys(selection).filter((id) => Boolean(selection[id]));
}

function syncSelectedRowsCache<TData>(
  cache: Map<string, TData>,
  data: TData[],
  selection: RowSelectionState,
  getId: (row: TData, index: number) => string,
) {
  const selectedIds = selectedIdList(selection);
  const selectedSet = new Set(selectedIds);

  data.forEach((row, index) => {
    const id = getId(row, index);
    if (selectedSet.has(id)) cache.set(id, row);
  });

  for (const cachedId of [...cache.keys()]) {
    if (!selectedSet.has(cachedId)) cache.delete(cachedId);
  }

  return selectedIds.map((id) => cache.get(id)).filter((row): row is TData => row !== undefined);
}

function humanizeFilterId(id: string) {
  const normalized = id.replace(/[-_]/g, " ").trim();
  if (!normalized) return id;
  return normalized.charAt(0).toUpperCase() + normalized.slice(1);
}

export type DataTableStatusFilterValue = "active" | "inactive" | "all";

export type DataTableSelectFilter = {
  id: string;
  /** Nome acessível do select (não renderiza rótulo visível). */
  label?: string;
  /** Label of the empty/"all" option (e.g. "Todos os grupos"). */
  allLabel: string;
  options: Array<{ value: string; label: string }>;
  value?: string;
  onChange: (value: string) => void;
};

export type DataTableSelectionToolbarContext<TData> = {
  selectedCount: number;
  selectedRows: TData[];
  clearSelection: () => void;
};

function createSelectColumn<TData, TValue>(): ColumnDef<TData, TValue> {
  return {
    id: SELECT_COLUMN_ID,
    size: 40,
    enableSorting: false,
    enableHiding: false,
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Selecionar todos"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        disabled={!row.getCanSelect()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Selecionar linha"
        onClick={(event) => event.stopPropagation()}
      />
    ),
  };
}

export interface DataTableProps<TData, TValue> {
  /** Column definitions from TanStack Table. */
  columns: ColumnDef<TData, TValue>[];
  /** Data rows. */
  data: TData[];
  /** Optional wrapper class. */
  className?: string;
  /** Mensagem sem dados. @default "Nenhum resultado." */
  emptyMessage?: React.ReactNode;
  /** Enable pagination controls. @default false */
  showPagination?: boolean;
  /** Enable filter input. Requires filterColumn. @default false */
  showFilter?: boolean;
  /** Column ID to filter (e.g., "email"). Required if showFilter=true. */
  filterColumn?: string;
  /** Placeholder for filter input. @default "Filtrar..." */
  filterPlaceholder?: string;
  /** Select filters rendered in the toolbar (Grupo, Papel, Status, …). */
  filters?: DataTableSelectFilter[];
  /** Enable column visibility toggle. @default false */
  showColumnVisibility?: boolean;
  /** Initial column visibility (`false` hides the column). */
  initialColumnVisibility?: VisibilityState;
  /** Label of the column visibility button. @default "Colunas" */
  columnVisibilityLabel?: string;
  /** Label inside the column visibility menu. @default "Mostrar colunas" */
  columnVisibilityMenuLabel?: string;
  /**
   * Enable row selection. Injects a checkbox column when columns do not
   * already define `id: "select"`. @default false
   */
  enableRowSelection?: boolean | ((row: Row<TData>) => boolean);
  /** Allow selecting more than one row. @default true */
  enableMultiRowSelection?: boolean;
  /** Initial/uncontrolled selection by row id. */
  defaultSelection?: RowSelectionState;
  /** Controlled row selection state. */
  rowSelection?: RowSelectionState;
  /** Called when row selection changes. */
  onRowSelectionChange?: OnChangeFn<RowSelectionState>;
  /** Convenience callback with the selected row originals. */
  onSelectedRowsChange?: (selectedRows: TData[]) => void;
  /** Stable row id for selection across pages. Defaults to `row.id` when present. */
  getRowId?: (originalRow: TData, index: number, parent?: unknown) => string;
  /**
   * Toolbar rendered above the table card when at least one row is selected.
   * Receives selected rows and a clear helper.
   */
  selectionToolbar?: (ctx: DataTableSelectionToolbarContext<TData>) => React.ReactNode;
  /** Show selected row count. @default false */
  showSelectedCount?: boolean;
  /** Optional labels mapping for STATUS render type. */
  statusLabels?: Record<string, string>;
  /** Called when a data row is clicked, or activated with Enter or Space (the row takes focus). */
  onRowClick?: (row: TData) => void;
  /** Optional class names for a data row. */
  getRowClassName?: (row: TData) => string | undefined;
  /** Horizontal overflow of the table body. @default "auto" */
  overflowX?: "auto" | "hidden";
  /** Shows skeleton rows in place of the data. @default false */
  isLoading?: boolean;
  /** Number of skeleton rows while loading. @default 5 */
  loadingRows?: number;
  /** Error message. Replaces the table, with a retry button when `onRetry` is set. */
  error?: React.ReactNode;
  /** Retry after an error. */
  onRetry?: () => void;
  /** Label of the retry button. @default "Tentar novamente" */
  retryLabel?: string;
  /** Accessible name of the table. */
  "aria-label"?: string;
  /** Controlled sorting state (TanStack). Use `DataTableColumnHeader` in the column header. */
  sorting?: SortingState;
  /** Initial sorting (uncontrolled). */
  defaultSorting?: SortingState;
  /** Called when sorting changes. */
  onSortingChange?: OnChangeFn<SortingState>;
  /** Sorting is done by the server: the table does not reorder `data`. @default false */
  manualSorting?: boolean;
  /**
   * Emphasis of a row: `<tone>-weak` background and a 3px bar in the tone. The reason must also be
   * in text in the row (color alone does not reach everyone).
   */
  getRowEmphasis?: (row: TData) => DataTableRowEmphasis | undefined;
  /**
   * Groups rows under a group row, by the returned key. Groups follow the order of `data`: sort the
   * data by the group first. Each group is a `<tbody>` with a `<th scope="rowgroup">`.
   */
  groupBy?: (row: TData) => string;
  /** Content of the group row. @default the key and the count */
  renderGroupLabel?: (group: { key: string; rows: TData[] }) => React.ReactNode;
  /** Actions at the end of the toolbar (e.g. a "Nova proposta" button). */
  toolbarActions?: React.ReactNode;
  /**
   * Summary row (totals) at the bottom of the table, by column id. Cells follow the column alignment.
   * @example { produto: "Total", valor: "R$ 1.640,00" }
   */
  summaryRow?: Partial<Record<string, React.ReactNode>>;
  /** Detail of a row, opened by a button in a column on the left. Returns `null` for rows without detail. */
  renderRowDetail?: (row: TData) => React.ReactNode;
  /** Rows with the detail open at first, by row id. */
  defaultExpandedRows?: string[];
  /** Rows with the detail open (controlled). */
  expandedRows?: string[];
  /** Called when a detail opens or closes. */
  onExpandedRowsChange?: (expandedRows: string[]) => void;
  /** Name of the detail button. @default "Ver detalhes" / "Ocultar detalhes" + the first column */
  getDetailLabel?: (row: TData, isExpanded: boolean) => string;
  /** Header stays on top when the table scrolls vertically. @default false */
  stickyHeader?: boolean;
  /** First data column (and the selection and detail columns) stays when scrolling sideways. Needs `size`. @default false */
  stickyFirstColumn?: boolean;
  /** Last column (e.g. actions) stays when scrolling sideways. Needs `size`. @default false */
  stickyLastColumn?: boolean;
  /** Optional footer rendered inside the table card (pagination, counts). */
  footer?: React.ReactNode;
  /**
   * Server-side pagination (Cockpit listagens). When set, replaces client
   * `showPagination` footer with page controls that call `onPageChange`.
   */
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalRows: number;
    perPage: number;
    onPageChange: (page: number) => void;
  };
  /** Optional toolbar filters (search + status) rendered above the table. */
  toolbarFilters?: Array<
    | {
        type: "search";
        placeholder?: string;
        value: string;
        onChange: (value: string) => void;
        /** Evita uma requisição a cada tecla. @default 350 */
        debounceMs?: number;
      }
    | {
        type: "status";
        value: DataTableStatusFilterValue;
        onChange: (value: DataTableStatusFilterValue) => void;
        /** Nome acessível do select (não renderiza rótulo visível). @default "Status" */
        label?: string;
        /** @default "Ativos" */
        activeLabel?: string;
        /** @default "Inativos" */
        inactiveLabel?: string;
        /** @default "Todos" */
        allLabel?: string;
      }
  >;
  /**
   * Barra abaixo dos filtros quando há linhas selecionadas.
   * Sem `selectionToolbar` custom, usa o texto "X itens selecionados".
   */
  selectionBar?: {
    entityName?: string;
    color?: string;
    actions?: React.ReactNode;
  };
}

/**
 * DataTable do design system PRIZM — integração com TanStack Table.
 * Suporta pagination, sorting, filtering, column visibility e row selection.
 * Para casos simples, use o componente <Table> com API por props.
 *
 * @see [TanStack Table](https://tanstack.com/table/latest) — Documentação oficial.
 * @see [Data Table — shadcn/ui](https://ui.shadcn.com/docs/components/data-table) — Exemplos e guia.
 */
function DebouncedSearchInput({
  value,
  onChange,
  placeholder,
  debounceMs = 350,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
  className?: string;
}) {
  const [local, setLocal] = React.useState(value);

  // Follow the `value` prop when it changes, during render
  // (https://react.dev/learn/you-might-not-need-an-effect).
  const [prevValue, setPrevValue] = React.useState(value);
  if (value !== prevValue) {
    setPrevValue(value);
    setLocal(value);
  }

  React.useEffect(() => {
    if (local === value) return;
    const timer = window.setTimeout(() => onChange(local), debounceMs);
    return () => window.clearTimeout(timer);
  }, [local, value, onChange, debounceMs]);

  return (
    <Input
      className={className}
      size="md"
      placeholder={placeholder ?? "Buscar"}
      value={local}
      onChange={(event) => setLocal(event.currentTarget.value)}
      aria-label={placeholder ?? "Buscar"}
      startIcon={<Search className="size-4" aria-hidden />}
    />
  );
}

export function DataTableSelectionBar({
  count,
  entityName,
  color,
  actions,
}: {
  count: number;
  entityName?: string;
  color?: string;
  actions?: React.ReactNode;
}) {
  const label = entityName
    ? `${count.toLocaleString("pt-BR")} ${entityName}${
        count === 1 ? "" : "s"
      } selecionado${count === 1 ? "" : "s"}`
    : `${count.toLocaleString("pt-BR")} ${count === 1 ? "item selecionado" : "itens selecionados"}`;

  return (
    <fieldset
      className="flex items-center gap-3 rounded-xl border px-4 py-2.5"
      style={{
        borderColor: color ?? "var(--prizm-color-border)",
        background: color ? `${color}14` : "var(--prizm-color-muted)",
        color: color ?? "inherit",
      }}
    >
      <legend className="sr-only">{label}</legend>
      <p className="text-sm">
        <strong>{count.toLocaleString("pt-BR")}</strong>{" "}
        {entityName
          ? `${entityName}${count === 1 ? "" : "s"} selecionado${count === 1 ? "" : "s"}`
          : count === 1
            ? "item selecionado"
            : "itens selecionados"}
      </p>
      {actions ? <div className="ml-auto flex items-center gap-2">{actions}</div> : null}
    </fieldset>
  );
}

/**
 * DataTable do design system PRIZM — integração com TanStack Table.
 */
export function DataTable<TData, TValue>({
  columns,
  data,
  className,
  emptyMessage = "Nenhum resultado.",
  showPagination = false,
  showFilter = false,
  filterColumn,
  filterPlaceholder = "Filtrar...",
  filters,
  showColumnVisibility = false,
  columnVisibilityLabel = "Colunas",
  columnVisibilityMenuLabel = "Mostrar colunas",
  initialColumnVisibility,
  enableRowSelection = false,
  enableMultiRowSelection = true,
  defaultSelection = {},
  rowSelection: controlledRowSelection,
  onRowSelectionChange,
  onSelectedRowsChange,
  getRowId,
  selectionToolbar,
  showSelectedCount = false,
  statusLabels,
  onRowClick,
  getRowClassName,
  overflowX = "auto",
  isLoading = false,
  loadingRows = 5,
  error,
  onRetry,
  retryLabel = "Tentar novamente",
  "aria-label": ariaLabel,
  sorting: controlledSorting,
  defaultSorting = [],
  onSortingChange,
  manualSorting = false,
  getRowEmphasis,
  groupBy,
  renderGroupLabel,
  toolbarActions,
  summaryRow,
  renderRowDetail,
  defaultExpandedRows = [],
  expandedRows: controlledExpandedRows,
  onExpandedRowsChange,
  getDetailLabel,
  stickyHeader = false,
  stickyFirstColumn = false,
  stickyLastColumn = false,
  footer,
  pagination,
  toolbarFilters,
  selectionBar,
}: DataTableProps<TData, TValue>) {
  const [uncontrolledSorting, setUncontrolledSorting] =
    React.useState<SortingState>(defaultSorting);
  const sorting = controlledSorting ?? uncontrolledSorting;
  const handleSortingChange = React.useCallback<OnChangeFn<SortingState>>(
    (updater) => {
      if (controlledSorting === undefined) setUncontrolledSorting(updater);
      onSortingChange?.(updater);
    },
    [controlledSorting, onSortingChange],
  );

  const [uncontrolledExpanded, setUncontrolledExpanded] = React.useState<string[]>(
    () => defaultExpandedRows,
  );
  const expandedRows = controlledExpandedRows ?? uncontrolledExpanded;
  const toggleExpanded = React.useCallback(
    (id: string) => {
      const next = expandedRows.includes(id)
        ? expandedRows.filter((x) => x !== id)
        : [...expandedRows, id];
      if (controlledExpandedRows === undefined) setUncontrolledExpanded(next);
      onExpandedRowsChange?.(next);
    },
    [controlledExpandedRows, expandedRows, onExpandedRowsChange],
  );
  const detailBaseId = React.useId();
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>(
    initialColumnVisibility ?? {},
  );
  const [uncontrolledRowSelection, setUncontrolledRowSelection] =
    React.useState<RowSelectionState>(defaultSelection);

  const isRowSelectionControlled = controlledRowSelection !== undefined;
  const rowSelection = isRowSelectionControlled ? controlledRowSelection : uncontrolledRowSelection;

  const resolveRowId = React.useCallback(
    (originalRow: TData, index: number, parent?: unknown) =>
      defaultRowId(originalRow, index, getRowId, parent),
    [getRowId],
  );

  const selectedRowsCacheRef = React.useRef(new Map<string, TData>());

  const selectedRows = React.useMemo(() => {
    if (!enableRowSelection) return [];
    return syncSelectedRowsCache(selectedRowsCacheRef.current, data, rowSelection, resolveRowId);
  }, [data, enableRowSelection, resolveRowId, rowSelection]);

  const selectedCount = selectedIdList(rowSelection).length;

  const handleRowSelectionChange = React.useCallback<OnChangeFn<RowSelectionState>>(
    (updater) => {
      const apply = (prev: RowSelectionState) => {
        const next = typeof updater === "function" ? updater(prev) : updater;
        if (onSelectedRowsChange) {
          onSelectedRowsChange(
            syncSelectedRowsCache(selectedRowsCacheRef.current, data, next, resolveRowId),
          );
        }
        return next;
      };

      if (isRowSelectionControlled) {
        if (onRowSelectionChange) {
          onRowSelectionChange((prev) => apply(prev));
        } else if (onSelectedRowsChange) {
          apply(controlledRowSelection ?? {});
        }
        return;
      }
      setUncontrolledRowSelection((prev) => apply(prev));
    },
    [
      controlledRowSelection,
      data,
      isRowSelectionControlled,
      onRowSelectionChange,
      onSelectedRowsChange,
      resolveRowId,
    ],
  );

  const columnsWithSelection = React.useMemo(() => {
    let cols = columns;
    if (renderRowDetail && !cols.some((column) => column.id === EXPAND_COLUMN_ID)) {
      const expandColumn: ColumnDef<TData, TValue> = {
        id: EXPAND_COLUMN_ID,
        size: 48,
        enableSorting: false,
        enableHiding: false,
        header: () => <span className="sr-only">Detalhes</span>,
        cell: ({ row }) => {
          if (renderRowDetail(row.original) == null) return null;
          const isOpen = expandedRows.includes(row.id);
          const firstCell = row
            .getAllCells()
            .find((c) => c.column.id !== SELECT_COLUMN_ID && c.column.id !== EXPAND_COLUMN_ID);
          const label = getDetailLabel
            ? getDetailLabel(row.original, isOpen)
            : `${isOpen ? "Ocultar detalhes" : "Ver detalhes"} de ${toText(firstCell?.getValue())}`;
          return (
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-expanded={isOpen}
              aria-controls={isOpen ? `${detailBaseId}-${row.id}` : undefined}
              aria-label={label}
              onClick={() => toggleExpanded(row.id)}
            >
              {isOpen ? <ChevronDown /> : <ChevronRight />}
            </Button>
          );
        },
      };
      cols = [expandColumn, ...cols];
    }
    if (!enableRowSelection) return cols;
    const hasSelectColumn = cols.some((column) => column.id === SELECT_COLUMN_ID);
    if (hasSelectColumn) return cols;
    return [createSelectColumn<TData, TValue>(), ...cols];
  }, [
    columns,
    detailBaseId,
    enableRowSelection,
    expandedRows,
    getDetailLabel,
    renderRowDetail,
    toggleExpanded,
  ]);

  const enhancedColumns = React.useMemo(() => {
    return columnsWithSelection.map((col) => {
      const sizedCol = withStatusColumnSize(col);
      const rowsMeta = getPrizmRowsMeta(sizedCol.meta);
      // Texto simples corta numa linha, com Tooltip quando corta (decisão de 17/11/2026).
      const plainTextCell =
        sizedCol.cell == null && !rowsMeta?.wrap && !(rowsMeta && needsPrizmCellRenderer(rowsMeta))
          ? {
              cell: (ctx: CellContext<TData, TValue>) => {
                const value = ctx.getValue();
                if (value == null || value === "") return null;
                if (typeof value === "string" || typeof value === "number") {
                  return <TruncatedText>{toText(value)}</TruncatedText>;
                }
                return value as React.ReactNode;
              },
            }
          : null;
      if (!rowsMeta) return plainTextCell ? { ...sizedCol, ...plainTextCell } : sizedCol;

      const customCell = rowsMeta.cell;
      if (typeof customCell === "function") {
        return {
          ...sizedCol,
          cell: (ctx: CellContext<TData, TValue>) =>
            customCell({
              getValue: ctx.getValue,
              row: ctx.row,
            }),
        };
      }

      if (!needsPrizmCellRenderer(rowsMeta)) {
        return plainTextCell ? { ...sizedCol, ...plainTextCell } : sizedCol;
      }

      return {
        ...sizedCol,
        cell: (ctx: CellContext<TData, TValue>) => {
          const original = ctx.row.original as { id?: unknown } | null;
          const rowId = toText(original?.id) || ctx.row.id;
          return renderPrizmCell({
            value: ctx.getValue(),
            row: ctx.row,
            rowId,
            meta: rowsMeta,
            getValue: ctx.getValue,
            statusLabels,
          });
        },
      };
    });
  }, [columnsWithSelection, statusLabels]);

  const columnPinning = React.useMemo<ColumnPinningState>(() => {
    const ids = enhancedColumns.map(
      (c) => c.id ?? columnAccessorKey(c as ColumnDef<unknown, unknown>),
    );
    const lead = ids.filter((id) => id === SELECT_COLUMN_ID || id === EXPAND_COLUMN_ID);
    const dataIds = ids.filter(
      (id): id is string => id != null && id !== SELECT_COLUMN_ID && id !== EXPAND_COLUMN_ID,
    );
    const left = stickyFirstColumn && dataIds[0] ? [...(lead as string[]), dataIds[0]] : [];
    const last = dataIds[dataIds.length - 1];
    const right = stickyLastColumn && last && !left.includes(last) ? [last] : [];
    return { left, right };
  }, [enhancedColumns, stickyFirstColumn, stickyLastColumn]);

  // TanStack Table isn't compatible with the React Compiler's memoization;
  // the compiler skips this component, which is what it should do.
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns: enhancedColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: showPagination ? getPaginationRowModel() : undefined,
    onSortingChange: handleSortingChange,
    getSortedRowModel: manualSorting ? undefined : getSortedRowModel(),
    manualSorting,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    enableRowSelection,
    enableMultiRowSelection,
    onRowSelectionChange: enableRowSelection ? handleRowSelectionChange : undefined,
    getRowId: resolveRowId,
    autoResetPageIndex: false,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      columnPinning,
      ...(enableRowSelection && { rowSelection }),
    },
  });

  const clearSelection = React.useCallback(() => {
    handleRowSelectionChange({});
  }, [handleRowSelectionChange]);

  const hasSelectFilters = Boolean(filters?.length);
  const searchFilter = toolbarFilters?.find((filter) => filter.type === "search");
  const otherToolbarFilters = toolbarFilters?.filter((filter) => filter.type === "status");
  const hasLeadingSelects = hasSelectFilters || Boolean(otherToolbarFilters?.length);
  const hasToolbarFilters = Boolean(toolbarFilters?.length);
  const showToolbar =
    showFilter ||
    showColumnVisibility ||
    hasSelectFilters ||
    hasToolbarFilters ||
    toolbarActions != null;
  const showError = !isLoading && error != null;
  const showEmptyTable = !isLoading && !showError && table.getRowModel().rows.length === 0;
  const visibleColumnCount = table.getVisibleLeafColumns().length;

  const pinnedStyle = (column: Column<TData, unknown>): React.CSSProperties | undefined => {
    const pinned = column.getIsPinned();
    if (pinned === "left") return { left: column.getStart("left") };
    if (pinned === "right") return { right: column.getAfter("right") };
    return undefined;
  };
  const pinnedClass = (column: Column<TData, unknown>, isHead: boolean) => {
    const pinned = column.getIsPinned();
    if (!pinned) return undefined;
    return cn(
      isHead ? dataTableStickyHead : dataTableStickyCell,
      pinned === "left" && column.getIsLastColumn("left") && dataTableStickyEdgeLeft,
      pinned === "right" && column.getIsFirstColumn("right") && dataTableStickyEdgeRight,
    );
  };

  const rows = table.getRowModel().rows;
  const groups: Array<{ key: string | null; rows: Row<TData>[] }> = [];
  for (const row of rows) {
    const key = groupBy ? groupBy(row.original) : null;
    const last = groups[groups.length - 1];
    if (last && last.key === key) last.rows.push(row);
    else groups.push({ key, rows: [row] });
  }

  const renderRow = (row: Row<TData>) => {
    const emphasis = getRowEmphasis?.(row.original);
    const detail =
      renderRowDetail && expandedRows.includes(row.id) ? renderRowDetail(row.original) : null;
    const cells = row.getVisibleCells();
    const activate = onRowClick ? () => onRowClick(row.original) : undefined;
    return (
      <React.Fragment key={row.id}>
        <TableRow
          data-state={row.getIsSelected() ? "selected" : undefined}
          data-emphasis={emphasis}
          tabIndex={activate ? 0 : undefined}
          className={cn(
            "border-border transition-colors",
            activate && dataTableRowClickable,
            emphasis && dataTableRowEmphasis[emphasis],
            getRowClassName?.(row.original),
          )}
          onClick={
            activate
              ? (event) => {
                  const target = event.target as HTMLElement | null;
                  if (target?.closest(INTERACTIVE_SELECTOR)) return;
                  activate();
                }
              : undefined
          }
          onKeyDown={
            activate
              ? (event) => {
                  if (event.target !== event.currentTarget) return;
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    activate();
                  }
                }
              : undefined
          }
        >
          {cells.map((cell, index) => {
            const meta = getPrizmRowsMeta(cell.column.columnDef.meta);
            const isStatus = isStatusLikeColumn(cell.column);
            const align = meta?.cellAlign ?? (isStatus ? "left" : undefined);
            return (
              <TableCell
                key={cell.id}
                style={{
                  ...columnWidthStyle(cell.column.columnDef.size, isStatus),
                  ...pinnedStyle(cell.column),
                }}
                className={cn(
                  dataTableCell,
                  meta?.wrap
                    ? "whitespace-normal break-words"
                    : isStatus
                      ? "overflow-visible"
                      : "overflow-hidden truncate",
                  cellAlignClassName(cell.column.columnDef.meta, isStatus ? "left" : undefined),
                  align === "right" && dataTableCellNumeric,
                  cell.column.id === EXPAND_COLUMN_ID && dataTableExpandCell,
                  pinnedClass(cell.column, false),
                  index === 0 && emphasis && dataTableRowEmphasisBar[emphasis],
                )}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            );
          })}
        </TableRow>
        {detail != null ? (
          <TableRow
            id={`${detailBaseId}-${row.id}`}
            data-slot="data-table-detail-row"
            className={dataTableDetailRow}
          >
            <TableCell colSpan={visibleColumnCount} className={dataTableDetailCell}>
              {detail}
            </TableCell>
          </TableRow>
        ) : null}
      </React.Fragment>
    );
  };

  const searchInput =
    showFilter && filterColumn ? (
      <Input
        className="w-[200px]"
        size="md"
        placeholder={filterPlaceholder}
        value={(table.getColumn(filterColumn)?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn(filterColumn)?.setFilterValue(event.currentTarget.value)
        }
        aria-label={filterPlaceholder}
        startIcon={<Search className="size-4" aria-hidden />}
      />
    ) : searchFilter ? (
      <DebouncedSearchInput
        className="w-[200px]"
        placeholder={searchFilter.placeholder ?? "Buscar"}
        value={searchFilter.value}
        onChange={searchFilter.onChange}
        debounceMs={searchFilter.debounceMs}
      />
    ) : null;

  return (
    <div
      data-slot="data-table"
      className={cn("flex h-full min-h-0 w-full flex-1 flex-col gap-4", className)}
    >
      {showToolbar && (
        <div className="flex w-full shrink-0 items-center justify-between gap-2 overflow-visible p-1">
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            {otherToolbarFilters?.map((filter) => (
              <Select
                key="status"
                size="md"
                placeholder={filter.label ?? "Status"}
                aria-label={filter.label ?? "Status"}
                className="w-36"
                value={filter.value}
                onChange={(next) => {
                  if (next === "active" || next === "inactive" || next === "all") {
                    filter.onChange(next);
                  }
                }}
                options={[
                  { value: "active", label: filter.activeLabel ?? "Ativos" },
                  {
                    value: "inactive",
                    label: filter.inactiveLabel ?? "Inativos",
                  },
                  { value: "all", label: filter.allLabel ?? "Todos" },
                ]}
              />
            ))}
            {hasSelectFilters &&
              filters?.map((filter) => {
                const selectValue =
                  filter.value && filter.value.trim() !== "" ? filter.value : FILTER_ALL_VALUE;
                const filterLabel = filter.label ?? humanizeFilterId(filter.id);
                return (
                  <Select
                    key={filter.id}
                    size="md"
                    placeholder={filterLabel}
                    aria-label={filterLabel}
                    className="w-44"
                    value={selectValue}
                    onChange={(next) => {
                      filter.onChange(next === FILTER_ALL_VALUE || next == null ? "" : next);
                    }}
                    options={[
                      { value: FILTER_ALL_VALUE, label: filter.allLabel },
                      ...filter.options,
                    ]}
                  />
                );
              })}
            {!hasLeadingSelects ? searchInput : null}
          </div>
          <div className="flex shrink-0 items-center gap-2">
            {hasLeadingSelects ? searchInput : null}
            {showColumnVisibility && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="default" className="font-normal">
                    <Columns3 data-icon="inline-start" />
                    {columnVisibilityLabel}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-[13.75rem] rounded-xl">
                  <DropdownMenuGroup className="flex flex-col gap-1.5">
                    <DropdownMenuLabel className="px-2.5 pb-1 pt-0.5 text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                      {columnVisibilityMenuLabel}
                    </DropdownMenuLabel>
                    {table
                      .getAllColumns()
                      .filter((column) => column.getCanHide())
                      .map((column) => {
                        const label =
                          typeof column.columnDef.header === "string"
                            ? column.columnDef.header
                            : column.id;
                        const visible = column.getIsVisible();
                        return (
                          <DropdownMenuItem
                            key={column.id}
                            className="cursor-pointer"
                            onSelect={(event) => event.preventDefault()}
                            onClick={() => column.toggleVisibility(!visible)}
                          >
                            <Checkbox
                              checked={visible}
                              tabIndex={-1}
                              className="pointer-events-none"
                              aria-hidden
                            />
                            <span className="normal-case">{label}</span>
                          </DropdownMenuItem>
                        );
                      })}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            {toolbarActions}
          </div>
        </div>
      )}

      {enableRowSelection && selectedCount > 0 ? (
        <div className="shrink-0">
          {selectionToolbar ? (
            selectionToolbar({
              selectedCount,
              selectedRows,
              clearSelection,
            })
          ) : (
            <DataTableSelectionBar
              count={selectedCount}
              entityName={selectionBar?.entityName}
              color={selectionBar?.color}
              actions={selectionBar?.actions}
            />
          )}
        </div>
      ) : null}

      {showError ? (
        <div
          data-slot="data-table-error"
          role="alert"
          className="flex min-h-0 flex-1 flex-col items-center justify-center overflow-visible px-2 py-8"
        >
          <Empty
            appearance="plain"
            mediaVariant="icon"
            icon={<CircleAlert className="size-6 text-destructive" aria-hidden />}
            title={error}
            content={
              onRetry ? (
                <Button type="button" variant="outline" onClick={onRetry}>
                  {retryLabel}
                </Button>
              ) : undefined
            }
          />
        </div>
      ) : showEmptyTable ? (
        <div
          data-slot="data-table-empty"
          className="flex min-h-0 flex-1 flex-col items-center justify-center overflow-visible px-2 py-8"
        >
          {typeof emptyMessage === "string" || emptyMessage == null ? (
            <Empty
              appearance="plain"
              mediaVariant="icon"
              icon={<FolderOpen className="size-6 text-muted-foreground" aria-hidden />}
              title={emptyMessage ?? "Nenhum resultado."}
            />
          ) : (
            emptyMessage
          )}
        </div>
      ) : (
        <div
          data-slot="data-table-card"
          className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-border bg-background"
        >
          <div
            className={cn(
              "min-h-0 flex-1 overflow-y-auto",
              overflowX === "hidden" ? "overflow-x-hidden" : "overflow-x-auto",
            )}
          >
            <table
              aria-label={ariaLabel}
              aria-busy={isLoading || undefined}
              className="w-full table-fixed caption-bottom text-sm"
            >
              <TableHeader className={cn(stickyHeader && dataTableStickyHeader)}>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id} className="border-border hover:bg-transparent">
                    {headerGroup.headers.map((header) => {
                      const isStatus = isStatusLikeColumn(header.column);
                      const meta = getPrizmRowsMeta(header.column.columnDef.meta);
                      const sorted = header.column.getIsSorted();
                      return (
                        <TableHead
                          key={header.id}
                          aria-sort={
                            sorted === "asc"
                              ? "ascending"
                              : sorted === "desc"
                                ? "descending"
                                : undefined
                          }
                          style={{
                            ...columnWidthStyle(header.column.columnDef.size, isStatus),
                            ...pinnedStyle(header.column),
                          }}
                          className={cn(
                            dataTableHead,
                            isStatus ? "overflow-visible" : "overflow-hidden truncate",
                            cellAlignClassName(
                              header.column.columnDef.meta,
                              isStatus ? "left" : undefined,
                            ),
                            meta?.cellAlign === "right" && dataTableCellNumeric,
                            header.column.id === EXPAND_COLUMN_ID && dataTableExpandCell,
                            pinnedClass(header.column, true),
                          )}
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              {isLoading ? (
                <TableBody data-slot="data-table-loading">
                  {Array.from({ length: loadingRows }, (_, i) => (
                    <TableRow key={i} className="hover:bg-transparent">
                      {table.getVisibleLeafColumns().map((column) => (
                        <TableCell key={column.id} className={dataTableCell}>
                          {column.id === SELECT_COLUMN_ID ||
                          column.id === EXPAND_COLUMN_ID ? null : (
                            <Skeleton className={dataTableSkeleton} />
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              ) : groupBy ? (
                groups.map((group) => (
                  <TableBody key={group.key ?? ""} data-slot="data-table-group">
                    <TableRow data-slot="data-table-group-row" className={dataTableGroupRow}>
                      <th
                        scope="rowgroup"
                        colSpan={visibleColumnCount}
                        className={dataTableGroupCell}
                      >
                        {renderGroupLabel ? (
                          renderGroupLabel({
                            key: group.key ?? "",
                            rows: group.rows.map((r) => r.original),
                          })
                        ) : (
                          <>
                            {group.key}
                            <span className={dataTableGroupCount}>{group.rows.length}</span>
                          </>
                        )}
                      </th>
                    </TableRow>
                    {group.rows.map(renderRow)}
                  </TableBody>
                ))
              ) : (
                <TableBody>{rows.map(renderRow)}</TableBody>
              )}
              {summaryRow && !isLoading ? (
                <tfoot data-slot="data-table-summary">
                  <TableRow className={dataTableSummaryRow}>
                    {table.getVisibleLeafColumns().map((column) => {
                      const meta = getPrizmRowsMeta(column.columnDef.meta);
                      return (
                        <TableCell
                          key={column.id}
                          style={{
                            ...columnWidthStyle(column.columnDef.size),
                            ...pinnedStyle(column),
                          }}
                          className={cn(
                            dataTableCell,
                            "overflow-hidden truncate",
                            cellAlignClassName(column.columnDef.meta),
                            meta?.cellAlign === "right" && dataTableCellNumeric,
                            pinnedClass(column, false),
                          )}
                        >
                          {summaryRow[column.id] ?? null}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </tfoot>
              ) : null}
            </table>
          </div>

          {footer ? <div className="shrink-0">{footer}</div> : null}

          {pagination ? (
            <div className="flex shrink-0 items-center justify-between border-t border-border bg-background px-4 py-3">
              <div className="text-sm text-muted-foreground">
                {pagination.totalRows === 0
                  ? "Mostrando 0 itens"
                  : `Mostrando ${(pagination.currentPage - 1) * pagination.perPage + 1}-${Math.min(
                      pagination.currentPage * pagination.perPage,
                      pagination.totalRows,
                    )} de ${pagination.totalRows} itens`}
              </div>
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="size-9 shrink-0 rounded-full"
                  disabled={isLoading || pagination.currentPage <= 1 || pagination.totalRows === 0}
                  aria-label="Página anterior"
                  onClick={() => pagination.onPageChange(pagination.currentPage - 1)}
                >
                  <ChevronLeft className="size-4" />
                </Button>
                <span className="text-sm text-foreground">
                  Página {pagination.currentPage} de {pagination.totalPages || 1}
                </span>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="size-9 shrink-0 rounded-full"
                  disabled={
                    isLoading ||
                    pagination.currentPage >= pagination.totalPages ||
                    pagination.totalRows === 0
                  }
                  aria-label="Próxima página"
                  onClick={() => pagination.onPageChange(pagination.currentPage + 1)}
                >
                  <ChevronRight className="size-4" />
                </Button>
              </div>
            </div>
          ) : null}

          {/* Footer: contagem + paginação (padrão PaginationFooter do Cockpit) */}
          {(showSelectedCount || showPagination) && !pagination && (
            <div className="flex shrink-0 items-center justify-between border-t border-border bg-background px-4 py-3">
              <div className="text-sm text-muted-foreground">
                {showSelectedCount ? (
                  <>
                    {selectedCount} de {table.getFilteredRowModel().rows.length} selecionada(s)
                  </>
                ) : (
                  (() => {
                    const { pageIndex, pageSize } = table.getState().pagination;
                    const total = table.getFilteredRowModel().rows.length;
                    const start = total === 0 ? 0 : pageIndex * pageSize + 1;
                    const end = Math.min((pageIndex + 1) * pageSize, total);
                    return `Mostrando ${start}-${end} de ${total} itens`;
                  })()
                )}
              </div>
              {showPagination &&
                (() => {
                  const page = table.getState().pagination.pageIndex + 1;
                  const totalPages = Math.max(1, table.getPageCount());
                  const isFirst = page <= 1;
                  const isLast = page >= totalPages;
                  return (
                    <div className="flex items-center gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className={cn(
                          "size-9 shrink-0 rounded-full",
                          isFirst && "cursor-not-allowed opacity-35",
                        )}
                        disabled={isFirst}
                        aria-label="Página anterior"
                        onClick={() => table.previousPage()}
                      >
                        <ChevronLeft className="size-4" />
                      </Button>
                      <span className="text-sm text-foreground">
                        Página {page} de {totalPages}
                      </span>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className={cn(
                          "size-9 shrink-0 rounded-full",
                          isLast && "cursor-not-allowed opacity-35",
                        )}
                        disabled={isLast}
                        aria-label="Próxima página"
                        onClick={() => table.nextPage()}
                      >
                        <ChevronRight className="size-4" />
                      </Button>
                    </div>
                  );
                })()}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
