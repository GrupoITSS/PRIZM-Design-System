import { Badge } from "../../badge";
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
  ExpandedState,
  OnChangeFn,
  Row,
  RowSelectionState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
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
import { alignCenter, alignLeft, alignRight, tableSubRowIndent } from "../table.styles";
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
  dataTableGroupToggle,
  dataTableHead,
  dataTableRowClickable,
  dataTableSkeleton,
  dataTableStickyCell,
  dataTableStickyEdgeLeft,
  dataTableStickyEdgeRight,
  dataTableStickyHead,
  dataTableStickyHeader,
  dataTableSummaryRow,
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

/**
 * Busca na toolbar. Com `columnId` (sem `onChange`), a tabela filtra a coluna nos dados que tem.
 * Com `onChange`, o produto filtra (na tela ou no servidor), com espera entre teclas (`debounceMs`).
 */
export type DataTableSearchFilter = {
  type: "search";
  /** Coluna que a tabela filtra sozinha. */
  columnId?: string;
  /** Texto do campo e nome acessível. @default "Buscar" */
  placeholder?: string;
  /** Valor (com `onChange`). */
  value?: string;
  /** O produto filtra. Sem ele, a tabela filtra `columnId`. */
  onChange?: (value: string) => void;
  /** Evita uma busca a cada tecla (com `onChange`). @default 350 */
  debounceMs?: number;
};

/** Status pronto: Ativos, Inativos e Todos. O produto filtra. */
export type DataTableStatusFilter = {
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
};

/** Select na toolbar (Grupo, Papel…). O produto filtra. Sem `type`, o filtro é um select. */
export type DataTableSelectFilter = {
  type?: "select";
  id: string;
  /** Nome acessível do select (não renderiza rótulo visível). */
  label?: string;
  /** Label of the empty/"all" option (e.g. "Todos os grupos"). */
  allLabel: string;
  options: Array<{ value: string; label: string }>;
  value?: string;
  onChange: (value: string) => void;
};

/** Campo da toolbar: busca, select ou status (decisão de 18/11/2026). */
export type DataTableFilter = DataTableSearchFilter | DataTableSelectFilter | DataTableStatusFilter;

/** Nome do item na barra de seleção, no singular e no plural: "proposta selecionada". */
export type DataTableEntityName = { one: string; other: string };

/** Paginação na tela: a tabela pagina `data`. */
export type DataTableClientPagination = {
  /** Linhas por página. @default 10 */
  perPage?: number;
  onPageChange?: undefined;
};

/** Paginação no servidor: `data` é só a página atual; o produto busca as outras. */
export type DataTableServerPagination = {
  currentPage: number;
  totalPages: number;
  totalRows: number;
  perPage: number;
  onPageChange: (page: number) => void;
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
  /** @deprecated Use `pagination={{ perPage: 10 }}` (decisão de 18/11/2026). */
  showPagination?: boolean;
  /** @deprecated Use `filters={[{ type: "search", columnId, placeholder }]}` (decisão de 18/11/2026). */
  showFilter?: boolean;
  /** @deprecated Use `filters={[{ type: "search", columnId }]}`. */
  filterColumn?: string;
  /** @deprecated Use `filters={[{ type: "search", placeholder }]}`. */
  filterPlaceholder?: string;
  /**
   * Campos da toolbar, na ordem: selects e status à esquerda, a busca depois deles. `type`:
   * `search` (com `columnId`, a tabela filtra; com `onChange`, o produto filtra), `select` (o padrão)
   * e `status`.
   */
  filters?: DataTableFilter[];
  /** Enable column visibility toggle. @default false */
  showColumnVisibility?: boolean;
  /** Initial column visibility (`false` hides the column). */
  initialColumnVisibility?: VisibilityState;
  /** Label of the column visibility button. @default "Colunas" */
  columnVisibilityLabel?: string;
  /** Label inside the column visibility menu. @default "Colunas visíveis" */
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
  /** @deprecated A barra de seleção já mostra a contagem (decisão de 18/11/2026). */
  showSelectedCount?: boolean;
  /** Optional labels mapping for STATUS render type. */
  statusLabels?: Record<string, string>;
  /** Called when a data row is clicked, or activated with Enter or Space (the row takes focus). */
  onRowClick?: (row: TData) => void;
  /** @deprecated Classe solta, fora dos tokens. Para aviso na linha, use um Badge na célula (18/11/2026). */
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
   * Groups rows under a group row, by the returned key. Groups follow the order of `data`: sort the
   * data by the group first. Each group is a `<tbody>` with a `<th scope="rowgroup">`.
   */
  groupBy?: (row: TData) => string;
  /** Content of the group row. @default the key and the count */
  renderGroupLabel?: (group: { key: string; rows: TData[] }) => React.ReactNode;
  /**
   * The group row gets a button that collapses and expands the group's rows. Different from
   * sub-rows: the group row is a header for a set of rows, not a data row. @default false
   */
  collapsibleGroups?: boolean;
  /** Groups collapsed at first, by key (uncontrolled). */
  defaultCollapsedGroups?: string[];
  /** Collapsed groups, by key (controlled). */
  collapsedGroups?: string[];
  /** Called when a group collapses or expands. */
  onCollapsedGroupsChange?: (collapsedGroups: string[]) => void;
  /** Actions at the end of the toolbar (e.g. a "Nova proposta" button). */
  toolbarActions?: React.ReactNode;
  /**
   * Summary row (totals) at the bottom of the table, by column id. Cells follow the column alignment.
   * @example { produto: "Total", valor: "R$ 1.640,00" }
   */
  summaryRow?: Partial<Record<string, React.ReactNode>>;
  /**
   * Sub-rows of a row, one level (as in the Table). The parent row gets a button that opens them, in a
   * column on the left; the open parent row is `accent`. Do not use with `renderRowDetail`.
   */
  getSubRows?: (row: TData) => TData[] | undefined;
  /** Name of the sub-rows button. @default "Expandir" / "Recolher" + the first column */
  getExpandLabel?: (row: TData, isExpanded: boolean) => string;
  /** Detail of a row, opened by a button in a column on the left. Returns `null` for rows without detail. */
  renderRowDetail?: (row: TData) => React.ReactNode;
  /** Rows open at first (detail or sub-rows), by row id. */
  defaultExpandedRows?: string[];
  /** Rows open (detail or sub-rows), controlled. */
  expandedRows?: string[];
  /** Called when a row opens or closes (detail or sub-rows). */
  onExpandedRowsChange?: (expandedRows: string[]) => void;
  /** Name of the detail button. @default "Ver detalhes" / "Ocultar detalhes" + the first column */
  getDetailLabel?: (row: TData, isExpanded: boolean) => string;
  /** Header stays on top when the table scrolls vertically. @default false */
  stickyHeader?: boolean;
  /** First data column (and the selection and detail columns) stays when scrolling sideways. Needs `size`. @default false */
  stickyFirstColumn?: boolean;
  /** Last column (e.g. actions) stays when scrolling sideways. Needs `size`. @default false */
  stickyLastColumn?: boolean;
  /** Conteúdo livre no rodapé do card, ao lado da contagem e da paginação. */
  footer?: React.ReactNode;
  /**
   * Paginação, no rodapé (decisão de 18/11/2026). Sem `onPageChange`, a tabela pagina `data`
   * (`{ perPage }`). Com `onPageChange`, o produto pagina: `data` é só a página atual.
   */
  pagination?: DataTableClientPagination | DataTableServerPagination;
  /** @deprecated Use `filters` com `type: "search"` e `type: "status"` (decisão de 18/11/2026). */
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
    /**
     * Nome do item, no singular e no plural: `{ one: "proposta selecionada", other: "propostas
     * selecionadas" }`. Um texto só (`"proposta"`) ainda funciona, mas o plural sai errado.
     */
    entityName?: string | DataTableEntityName;
    /** @deprecated Cor fora dos tokens e sem contraste medido (decisão de 18/11/2026). */
    color?: string;
    actions?: React.ReactNode;
  };
}

const warned = new Set<string>();
/** Avisa uma vez, em desenvolvimento, que uma prop saiu (decisões de 18/11/2026). */
function warnDeprecated(name: string, replacement: string) {
  if (process.env.NODE_ENV === "production" || warned.has(name)) return;
  warned.add(name);
  console.warn(`[Prizm DataTable] ${name} está @deprecated. Use ${replacement}.`);
}

/** Texto da barra de seleção: "3 itens selecionados", "1 proposta selecionada". */
export function selectionLabel(count: number, entityName?: string | DataTableEntityName) {
  const n = count.toLocaleString("pt-BR");
  if (entityName && typeof entityName === "object")
    return `${n} ${count === 1 ? entityName.one : entityName.other}`;
  if (entityName)
    return `${n} ${entityName}${count === 1 ? "" : "s"} selecionado${count === 1 ? "" : "s"}`;
  return `${n} ${count === 1 ? "item selecionado" : "itens selecionados"}`;
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
  entityName?: string | DataTableEntityName;
  color?: string;
  actions?: React.ReactNode;
}) {
  const label = selectionLabel(count, entityName);
  const rest = label.slice(label.indexOf(" ") + 1);

  return (
    <fieldset
      aria-label={label}
      className="flex items-center gap-3 rounded-xl border px-4 py-2.5"
      style={{
        borderColor: color ?? "var(--prizm-color-border)",
        background: color ? `${color}14` : "var(--prizm-color-muted)",
        color: color ?? "inherit",
      }}
    >
      <p className="text-sm">
        <strong>{count.toLocaleString("pt-BR")}</strong> {rest}
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
  columnVisibilityMenuLabel = "Colunas visíveis",
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
  groupBy,
  renderGroupLabel,
  collapsibleGroups = false,
  defaultCollapsedGroups = [],
  collapsedGroups: controlledCollapsedGroups,
  onCollapsedGroupsChange,
  toolbarActions,
  summaryRow,
  getSubRows,
  getExpandLabel,
  renderRowDetail: renderRowDetailProp,
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
  if (showFilter || filterColumn)
    warnDeprecated("showFilter", 'filters com type "search" e columnId');
  if (toolbarFilters) warnDeprecated("toolbarFilters", 'filters com type "search" e "status"');
  if (showSelectedCount) warnDeprecated("showSelectedCount", "a barra de seleção");
  if (showPagination) warnDeprecated("showPagination", "pagination={{ perPage: 10 }}");
  if (getRowClassName) warnDeprecated("getRowClassName", "um Badge na célula");
  if (selectionBar?.color) warnDeprecated("selectionBar.color", "a barra em color/muted");
  if (
    getSubRows &&
    renderRowDetailProp &&
    process.env.NODE_ENV !== "production" &&
    !warned.has("subRows+detail")
  ) {
    warned.add("subRows+detail");
    console.warn(
      "[Prizm DataTable] getSubRows e renderRowDetail não vão juntos: ficam as sub-linhas.",
    );
  }
  const renderRowDetail = getSubRows ? undefined : renderRowDetailProp;

  // Filtros: as APIs antigas viram campos de `filters` (decisão de 18/11/2026).
  const allFilters: DataTableFilter[] = [
    ...(filters ?? []),
    ...(showFilter && filterColumn
      ? [{ type: "search", columnId: filterColumn, placeholder: filterPlaceholder } as const]
      : []),
    ...((toolbarFilters ?? []) as DataTableFilter[]),
  ];
  const selectFilters = allFilters.filter(
    (f): f is DataTableSelectFilter => f.type === undefined || f.type === "select",
  );
  const statusFilters = allFilters.filter((f): f is DataTableStatusFilter => f.type === "status");
  const searchFilters = allFilters.filter((f): f is DataTableSearchFilter => f.type === "search");

  // Paginação: na tela (sem onPageChange) ou no servidor (decisão de 18/11/2026).
  const serverPagination =
    pagination && "onPageChange" in pagination && pagination.onPageChange ? pagination : null;
  const clientPagination = !serverPagination && (pagination != null || showPagination);
  const perPage = pagination?.perPage ?? 10;

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

  const [uncontrolledCollapsed, setUncontrolledCollapsed] = React.useState<string[]>(
    () => defaultCollapsedGroups,
  );
  const collapsedGroups = controlledCollapsedGroups ?? uncontrolledCollapsed;
  const toggleGroup = (key: string) => {
    const next = collapsedGroups.includes(key)
      ? collapsedGroups.filter((k) => k !== key)
      : [...collapsedGroups, key];
    if (controlledCollapsedGroups === undefined) setUncontrolledCollapsed(next);
    onCollapsedGroupsChange?.(next);
  };
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
    if ((renderRowDetail || getSubRows) && !cols.some((column) => column.id === EXPAND_COLUMN_ID)) {
      const expandColumn: ColumnDef<TData, TValue> = {
        id: EXPAND_COLUMN_ID,
        size: 48,
        enableSorting: false,
        enableHiding: false,
        header: () => <span className="sr-only">{getSubRows ? "Expandir" : "Detalhes"}</span>,
        cell: ({ row }) => {
          const hasSubRows = Boolean(getSubRows) && row.depth === 0 && row.subRows.length > 0;
          if (getSubRows ? !hasSubRows : renderRowDetail?.(row.original) == null) return null;
          const isOpen = expandedRows.includes(row.id);
          const firstCell = row
            .getAllCells()
            .find((c) => c.column.id !== SELECT_COLUMN_ID && c.column.id !== EXPAND_COLUMN_ID);
          const first = toText(firstCell?.getValue());
          const label = getSubRows
            ? getExpandLabel
              ? getExpandLabel(row.original, isOpen)
              : `${isOpen ? "Recolher" : "Expandir"} ${first}`
            : getDetailLabel
              ? getDetailLabel(row.original, isOpen)
              : `${isOpen ? "Ocultar detalhes" : "Ver detalhes"} de ${first}`;
          const controls = getSubRows
            ? row.subRows.map((sub) => `${detailBaseId}-${sub.id}`).join(" ")
            : `${detailBaseId}-${row.id}`;
          return (
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-expanded={isOpen}
              aria-controls={isOpen ? controls : undefined}
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
    getExpandLabel,
    getSubRows,
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

  const expandedState = React.useMemo<ExpandedState>(
    () => Object.fromEntries(expandedRows.map((id) => [id, true])),
    [expandedRows],
  );

  // TanStack Table isn't compatible with the React Compiler's memoization;
  // the compiler skips this component, which is what it should do.
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns: enhancedColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: clientPagination ? getPaginationRowModel() : undefined,
    getSubRows,
    getExpandedRowModel: getSubRows ? getExpandedRowModel() : undefined,
    initialState: { pagination: { pageIndex: 0, pageSize: perPage } },
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
      ...(getSubRows && { expanded: expandedState }),
      ...(enableRowSelection && { rowSelection }),
    },
  });

  const clearSelection = React.useCallback(() => {
    handleRowSelectionChange({});
  }, [handleRowSelectionChange]);

  const showToolbar = allFilters.length > 0 || showColumnVisibility || toolbarActions != null;
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
    const key = groupBy ? groupBy((row.getParentRow() ?? row).original) : null;
    const last = groups[groups.length - 1];
    if (last && last.key === key) last.rows.push(row);
    else groups.push({ key, rows: [row] });
  }

  const renderRow = (row: Row<TData>, trId?: string) => {
    const hasSubRows = Boolean(getSubRows) && row.depth === 0 && row.subRows.length > 0;
    const firstDataColumnId = row
      .getVisibleCells()
      .find((c) => c.column.id !== SELECT_COLUMN_ID && c.column.id !== EXPAND_COLUMN_ID)?.column.id;
    const detail =
      renderRowDetail && expandedRows.includes(row.id) ? renderRowDetail(row.original) : null;
    const cells = row.getVisibleCells();
    const activate = onRowClick ? () => onRowClick(row.original) : undefined;
    return (
      <React.Fragment key={row.id}>
        <TableRow
          id={row.depth > 0 ? `${detailBaseId}-${row.id}` : trId}
          data-state={row.getIsSelected() ? "selected" : undefined}
          data-depth={getSubRows ? row.depth : undefined}
          data-expanded={
            hasSubRows ? (expandedRows.includes(row.id) ? "true" : "false") : undefined
          }
          tabIndex={activate ? 0 : undefined}
          className={cn(
            "border-border transition-colors",
            activate && dataTableRowClickable,
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
          {cells.map((cell) => {
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
                  row.depth > 0 && cell.column.id === firstDataColumnId && tableSubRowIndent,
                  pinnedClass(cell.column, false),
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

  const searchInputs = searchFilters.map((filter) =>
    filter.onChange ? (
      <DebouncedSearchInput
        key={`search-${filter.columnId ?? filter.placeholder ?? "busca"}`}
        className="w-[200px]"
        placeholder={filter.placeholder ?? "Buscar"}
        value={filter.value ?? ""}
        onChange={filter.onChange}
        debounceMs={filter.debounceMs}
      />
    ) : filter.columnId ? (
      <Input
        key={`search-${filter.columnId ?? filter.placeholder ?? "busca"}`}
        className="w-[200px]"
        size="md"
        placeholder={filter.placeholder ?? "Buscar"}
        value={(table.getColumn(filter.columnId)?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn(filter.columnId!)?.setFilterValue(event.currentTarget.value)
        }
        aria-label={filter.placeholder ?? "Buscar"}
        startIcon={<Search className="size-4" aria-hidden />}
      />
    ) : null,
  );

  return (
    <div
      data-slot="data-table"
      className={cn("flex h-full min-h-0 w-full flex-1 flex-col gap-4", className)}
    >
      {showToolbar && (
        <div className="flex w-full shrink-0 items-center justify-between gap-2 overflow-visible p-1">
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            {statusFilters.map((filter) => (
              <Select
                key={`status-${filter.label ?? "Status"}`}
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
            {selectFilters.map((filter) => {
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
                  options={[{ value: FILTER_ALL_VALUE, label: filter.allLabel }, ...filter.options]}
                />
              );
            })}
            {searchInputs}
          </div>
          <div className="flex shrink-0 items-center gap-2">
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

      {enableRowSelection ? (
        <div role="status" className="sr-only">
          {selectedCount > 0 ? selectionLabel(selectedCount, selectionBar?.entityName) : ""}
        </div>
      ) : null}

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
          className="flex min-h-0 flex-1 flex-col items-center justify-center overflow-visible px-2 py-20"
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
          className="flex min-h-0 flex-1 flex-col items-center justify-center overflow-visible px-2 py-20"
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
                groups.map((group, groupIndex) => {
                  const key = group.key ?? "";
                  const label = renderGroupLabel ? (
                    renderGroupLabel({ key, rows: group.rows.map((r) => r.original) })
                  ) : (
                    <>
                      {group.key}
                      <Badge
                        variant="secondary"
                        size="sm"
                        shape="number"
                        className={dataTableGroupCount}
                      >
                        {group.rows.filter((r) => r.depth === 0).length}
                      </Badge>
                    </>
                  );
                  const isCollapsed = collapsibleGroups && collapsedGroups.includes(key);
                  const rowIds = group.rows.map((_, i) => `${detailBaseId}-g${groupIndex}-${i}`);
                  return (
                    <TableBody
                      key={key}
                      data-slot="data-table-group"
                      data-collapsed={collapsibleGroups ? isCollapsed : undefined}
                    >
                      <TableRow data-slot="data-table-group-row" className={dataTableGroupRow}>
                        <th
                          scope="rowgroup"
                          colSpan={visibleColumnCount}
                          className={dataTableGroupCell}
                        >
                          {collapsibleGroups ? (
                            <button
                              type="button"
                              data-slot="data-table-group-toggle"
                              className={dataTableGroupToggle}
                              aria-expanded={!isCollapsed}
                              aria-controls={isCollapsed ? undefined : rowIds.join(" ")}
                              onClick={() => toggleGroup(key)}
                            >
                              {isCollapsed ? (
                                <ChevronRight aria-hidden />
                              ) : (
                                <ChevronDown aria-hidden />
                              )}
                              {label}
                            </button>
                          ) : (
                            label
                          )}
                        </th>
                      </TableRow>
                      {isCollapsed ? null : group.rows.map((r, i) => renderRow(r, rowIds[i]))}
                    </TableBody>
                  );
                })
              ) : (
                <TableBody>{rows.map((r) => renderRow(r))}</TableBody>
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

          {(() => {
            const paged = serverPagination != null || clientPagination;
            if (!paged && !showSelectedCount && footer == null) return null;
            let countText: string | null = null;
            let page = 1;
            let totalPages = 1;
            let goTo: ((page: number) => void) | null = null;
            let blocked = false;
            if (serverPagination) {
              const { currentPage, perPage: per, totalRows } = serverPagination;
              countText =
                totalRows === 0
                  ? "Mostrando 0 itens"
                  : `Mostrando ${(currentPage - 1) * per + 1}-${Math.min(currentPage * per, totalRows)} de ${totalRows} itens`;
              page = currentPage;
              totalPages = serverPagination.totalPages || 1;
              goTo = serverPagination.onPageChange;
              blocked = isLoading || totalRows === 0;
            } else if (clientPagination || showSelectedCount) {
              const total = table.getFilteredRowModel().rows.length;
              if (showSelectedCount) {
                countText = `${selectedCount} de ${total} selecionada(s)`;
              } else {
                const { pageIndex, pageSize } = table.getState().pagination;
                const start = total === 0 ? 0 : pageIndex * pageSize + 1;
                const end = Math.min((pageIndex + 1) * pageSize, total);
                countText = `Mostrando ${start}-${end} de ${total} itens`;
              }
              page = table.getState().pagination.pageIndex + 1;
              totalPages = Math.max(1, table.getPageCount());
              goTo = (p) => table.setPageIndex(p - 1);
            }
            return (
              <div
                data-slot="data-table-footer"
                className="flex shrink-0 items-center justify-between gap-3 border-t border-border bg-background px-4 py-3"
              >
                {countText != null ? (
                  <div role="status" className="text-sm text-muted-foreground">
                    {countText}
                  </div>
                ) : null}
                {footer != null ? <div className="min-w-0 flex-1">{footer}</div> : null}
                {paged && goTo ? (
                  <div className="flex items-center gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="shrink-0"
                      disabled={blocked || page <= 1}
                      aria-label="Página anterior"
                      onClick={() => goTo(page - 1)}
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
                      className="shrink-0"
                      disabled={blocked || page >= totalPages}
                      aria-label="Próxima página"
                      onClick={() => goTo(page + 1)}
                    >
                      <ChevronRight className="size-4" />
                    </Button>
                  </div>
                ) : null}
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}
