import { cn } from "../../lib/cn";
import * as React from "react";
import { TruncatedText } from "./table-truncated-text";
import { Button } from "../button";
import { ChevronDown, ChevronRight } from "../icons";
import {
  alignCenter,
  alignLeft,
  alignRight,
  tableBase,
  tableBody,
  tableCaption,
  tableCell,
  tableCellMinHeight,
  tableCellNumeric,
  tableCellTruncate,
  tableExpandCell,
  tableExpandHead,
  tableFooter,
  tableHead,
  tableHeader,
  tableRow,
  tableSubRowIndent,
  tableWrapper,
} from "./table.styles";
import type { TableColumn, TableProps, TableRowMeta } from "./table.types";
import { renderPrizmCell } from "./table-cell-renderers";
import { toText } from "../../lib/to-text";

function getAlignClass(align: "left" | "right" | "center" | undefined): string {
  switch (align) {
    case "right":
      return alignRight;
    case "center":
      return alignCenter;
    default:
      return alignLeft;
  }
}

/** Texto cortado numa linha; o Tooltip com o texto todo só aparece quando ele corta. */
function renderCellContent<T extends Record<string, unknown>>(
  col: TableColumn<T>,
  row: T,
  rowId: string,
  meta: TableRowMeta<T>,
): React.ReactNode {
  const value = (row as Record<string, unknown>)[col.key];
  if (col.render) return col.render(value, row, meta);
  if (
    col.contentRenderType ||
    col.contentFormatType ||
    col.link ||
    col.renderPopover ||
    col.onColumnClick ||
    col.badgeMaxVisible ||
    col.statusLabels ||
    col.statusSummaryColumnHeaders
  ) {
    return renderPrizmCell({
      value,
      row,
      rowId: toText((row as Record<string, unknown>)["id"]) || rowId,
      getValue: () => value,
      meta: {
        contentRenderType: col.contentRenderType,
        contentFormatType: col.contentFormatType,
        link: col.link,
        onColumnClick: col.onColumnClick,
        renderPopover: col.renderPopover ?? null,
        statusLabels: col.statusLabels,
        statusSummaryColumnHeaders: col.statusSummaryColumnHeaders,
        badgeMaxVisible: col.badgeMaxVisible,
      },
    });
  }
  return value as React.ReactNode;
}

/**
 * Table do design system PRIZM. API 100% baseada em props: columns, rows, caption, footerRows.
 * Não exige subcomponentes; cobre a maioria dos casos com uma única tag.
 *
 * Linhas que expandem (16/11/2026): com `getSubRows`, a linha com sub-linhas ganha um botão de
 * expandir (Button ghost icon-sm, `aria-expanded`, `aria-controls`) numa coluna à esquerda. As
 * sub-linhas usam as mesmas colunas, com a primeira coluna de dados recuada. Um nível só.
 *
 * @see [Table — shadcn/ui](https://ui.shadcn.com/docs/components/table) — Documentação e API de referência.
 */
function Table<T extends Record<string, unknown>>({
  columns,
  rows,
  caption,
  footerRows,
  emptyMessage,
  getRowKey = (_, i) => String(i),
  className,
  tableClassName,
  getSubRows,
  defaultExpanded,
  expanded,
  onExpandedChange,
  getExpandLabel,
  expandColumnLabel = "Expandir",
  isRowSelected,
  ref,
  ...tableProps
}: TableProps<T> & { ref?: React.Ref<HTMLTableElement> }) {
  const baseId = React.useId();
  const expandable = getSubRows != null;
  const [innerExpanded, setInnerExpanded] = React.useState<string[]>(() =>
    defaultExpanded === true
      ? rows.flatMap((row, i) => (getSubRows?.(row)?.length ? [getRowKey(row, i)] : []))
      : (defaultExpanded ?? []),
  );
  const open = new Set(expanded ?? innerExpanded);

  const toggle = (key: string) => {
    const next = new Set(open);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    const list = [...next];
    if (expanded === undefined) setInnerExpanded(list);
    onExpandedChange?.(list);
  };

  const firstKey = columns[0]?.key;
  const labelOf = (row: T, isOpen: boolean) =>
    getExpandLabel?.(row, isOpen) ??
    `${isOpen ? "Recolher" : "Expandir"} ${toText(firstKey ? (row as Record<string, unknown>)[firstKey] : "")}`.trim();

  const renderRow = (
    row: T,
    key: string,
    meta: TableRowMeta<T>,
    extra: { id?: string; expandCell?: React.ReactNode },
  ) => (
    <tr
      key={key}
      id={extra.id}
      data-slot="table-row"
      data-depth={expandable ? meta.depth : undefined}
      data-expanded={meta.subRows ? (meta.isExpanded ? "true" : "false") : undefined}
      data-state={isRowSelected?.(row) ? "selected" : undefined}
      className={tableRow}
    >
      {expandable && (
        <td
          data-slot="table-expand-cell"
          className={cn(tableCell, tableExpandCell, tableCellMinHeight)}
        >
          {extra.expandCell}
        </td>
      )}
      {columns.map((col, colIndex) => {
        const content = renderCellContent(col, row, key, meta);
        const isText = typeof content === "string" || typeof content === "number";
        const cut = isText && !col.wrap;
        return (
          <td
            data-slot="table-cell"
            key={col.key}
            className={cn(
              tableCell,
              tableCellMinHeight,
              getAlignClass(col.align),
              col.align === "right" ? tableCellNumeric : undefined,
              cut ? tableCellTruncate : undefined,
              col.cellClassName ?? col.className,
              meta.depth > 0 && colIndex === 0 ? tableSubRowIndent : undefined,
            )}
          >
            {cut ? <TruncatedText>{content}</TruncatedText> : content}
          </td>
        );
      })}
    </tr>
  );

  const bodyRows = rows.flatMap((row, index) => {
    const key = getRowKey(row, index);
    const subRows = expandable ? getSubRows?.(row) : undefined;
    const hasSub = subRows != null && subRows.length > 0;
    const isOpen = hasSub && open.has(key);
    const subIds = hasSub ? subRows.map((_, i) => `${baseId}-${index}-${i}`) : [];
    const button = hasSub ? (
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        aria-expanded={isOpen}
        aria-controls={isOpen ? subIds.join(" ") : undefined}
        aria-label={labelOf(row, isOpen)}
        onClick={() => toggle(key)}
      >
        {isOpen ? <ChevronDown /> : <ChevronRight />}
      </Button>
    ) : null;
    const out = [
      renderRow(
        row,
        key,
        { depth: 0, ...(hasSub ? { subRows, isExpanded: isOpen } : {}) },
        { expandCell: button },
      ),
    ];
    if (isOpen) {
      subRows.forEach((sub, i) => {
        out.push(renderRow(sub, `${key}:${getRowKey(sub, i)}`, { depth: 1 }, { id: subIds[i] }));
      });
    }
    return out;
  });

  return (
    <div data-slot="table-container" className={cn(tableWrapper, className)}>
      <table ref={ref} data-slot="table" className={cn(tableBase, tableClassName)} {...tableProps}>
        {caption != null && (
          <caption data-slot="table-caption" className={tableCaption}>
            {caption}
          </caption>
        )}
        <thead data-slot="table-header" className={tableHeader}>
          <tr data-slot="table-row" className={tableRow}>
            {expandable && (
              <th data-slot="table-head" className={cn(tableHead, tableExpandHead)}>
                <span className="sr-only">{expandColumnLabel}</span>
              </th>
            )}
            {columns.map((col) => {
              const widthIsClass = typeof col.width === "string" && col.width.startsWith("w-");
              return (
                <th
                  data-slot="table-head"
                  key={col.key}
                  className={cn(
                    tableHead,
                    getAlignClass(col.align),
                    col.className,
                    widthIsClass ? col.width : undefined,
                  )}
                  style={col.width && !widthIsClass ? { width: col.width } : undefined}
                >
                  {col.header}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody data-slot="table-body" className={tableBody}>
          {rows.length === 0 && emptyMessage != null ? (
            <tr data-slot="table-row" className={tableRow}>
              <td
                data-slot="table-cell"
                colSpan={columns.length + (expandable ? 1 : 0)}
                className={cn(tableCell, alignCenter, "text-muted-foreground")}
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            bodyRows
          )}
        </tbody>
        {footerRows != null && footerRows.length > 0 && (
          <tfoot data-slot="table-footer" className={tableFooter}>
            {footerRows.map((footerRow, rowIndex) => (
              // eslint-disable-next-line @eslint-react/no-array-index-key -- positional list, items have no stable id
              <tr key={rowIndex} data-slot="table-row" className={tableRow}>
                {footerRow.map((cell, cellIndex) => (
                  <td
                    data-slot="table-cell"
                    // eslint-disable-next-line @eslint-react/no-array-index-key -- positional list, items have no stable id
                    key={cellIndex}
                    colSpan={expandable && cellIndex === 0 ? (cell.colSpan ?? 1) + 1 : cell.colSpan}
                    className={cn(tableCell, getAlignClass(cell.align), cell.className)}
                  >
                    {cell.content}
                  </td>
                ))}
              </tr>
            ))}
          </tfoot>
        )}
      </table>
    </div>
  );
}

export { Table };
