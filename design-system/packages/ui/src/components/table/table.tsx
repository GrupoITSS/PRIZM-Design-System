import { cn } from "../../lib/cn";
import * as React from "react";
import {
  alignCenter,
  alignLeft,
  alignRight,
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
import type { TableProps } from "./table.types";
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

/**
 * Table do design system PRIZM. API 100% baseada em props: columns, rows, caption, footerRows.
 * Não exige subcomponentes; cobre a maioria dos casos com uma única tag.
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
  ref,
  ...tableProps
}: TableProps<T> & { ref?: React.Ref<HTMLTableElement> }) {
  return (
    <div className={cn(tableWrapper, className)}>
      <table ref={ref} className={cn(tableBase, tableClassName)} {...tableProps}>
        {caption != null && <caption className={tableCaption}>{caption}</caption>}
        <thead className={tableHeader}>
          <tr className={tableRow}>
            {columns.map((col) => {
              const widthIsClass = typeof col.width === "string" && col.width.startsWith("w-");
              return (
                <th
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
        <tbody className={tableBody}>
          {rows.length === 0 && emptyMessage != null ? (
            <tr className={tableRow}>
              <td
                colSpan={columns.length}
                className={cn(tableCell, alignCenter, "text-muted-foreground")}
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            rows.map((row, index) => (
              <tr key={getRowKey(row, index)} className={tableRow}>
                {columns.map((col) => {
                  const value = (row as Record<string, unknown>)[col.key];
                  const content = col.render
                    ? col.render(value, row)
                    : col.contentRenderType ||
                        col.contentFormatType ||
                        col.link ||
                        col.renderPopover ||
                        col.onColumnClick ||
                        col.badgeMaxVisible ||
                        col.statusLabels ||
                        col.statusSummaryColumnHeaders
                      ? renderPrizmCell({
                          value,
                          row,
                          rowId:
                            toText((row as Record<string, unknown>)["id"]) || getRowKey(row, index),
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
                        })
                      : (value as React.ReactNode);
                  return (
                    <td
                      key={col.key}
                      className={cn(
                        tableCell,
                        getAlignClass(col.align),
                        col.cellClassName ?? col.className,
                      )}
                    >
                      {content}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
        {footerRows != null && footerRows.length > 0 && (
          <tfoot className={tableFooter}>
            {footerRows.map((footerRow, rowIndex) => (
              // eslint-disable-next-line @eslint-react/no-array-index-key -- positional list, items have no stable id
              <tr key={rowIndex} className={tableRow}>
                {footerRow.map((cell, cellIndex) => (
                  <td
                    // eslint-disable-next-line @eslint-react/no-array-index-key -- positional list, items have no stable id
                    key={cellIndex}
                    colSpan={cell.colSpan}
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
