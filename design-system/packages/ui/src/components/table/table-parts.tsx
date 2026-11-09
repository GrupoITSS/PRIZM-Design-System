import { cn } from "../../lib/cn";
import * as React from "react";
import {
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

/**
 * Subcomponentes da tabela para uso com TanStack Table ou composição manual.
 * Estes componentes são wrappers dos elementos HTML com estilos PRIZM.
 *
 * @deprecated (06/11/2026) Duplicam as primitivas de `table-primitives` e não têm uso no
 * repositório. Use `TableRoot`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow`,
 * `TableHead`, `TableCell` e `TableCaption`. Saem na próxima versão com quebra.
 */

/** @deprecated Use a primitiva de `table-primitives`. */
const TableWrapper = ({
  className,
  ref,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }) => (
  <div ref={ref} className={cn(tableWrapper, className)} {...props} />
);
TableWrapper.displayName = "TableWrapper";

/** @deprecated Use a primitiva de `table-primitives`. */
const TableElement = ({
  className,
  ref,
  ...props
}: React.HTMLAttributes<HTMLTableElement> & { ref?: React.Ref<HTMLTableElement> }) => (
  <table ref={ref} className={cn(tableBase, className)} {...props} />
);
TableElement.displayName = "TableElement";

/** @deprecated Use a primitiva de `table-primitives`. */
const TableHeader = ({
  className,
  ref,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement> & {
  ref?: React.Ref<HTMLTableSectionElement>;
}) => <thead ref={ref} className={cn(tableHeader, className)} {...props} />;
TableHeader.displayName = "TableHeader";

/** @deprecated Use a primitiva de `table-primitives`. */
const TableBody = ({
  className,
  ref,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement> & {
  ref?: React.Ref<HTMLTableSectionElement>;
}) => <tbody ref={ref} className={cn(tableBody, className)} {...props} />;
TableBody.displayName = "TableBody";

/** @deprecated Use a primitiva de `table-primitives`. */
const TableFooter = ({
  className,
  ref,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement> & {
  ref?: React.Ref<HTMLTableSectionElement>;
}) => <tfoot ref={ref} className={cn(tableFooter, className)} {...props} />;
TableFooter.displayName = "TableFooter";

/** @deprecated Use a primitiva de `table-primitives`. */
const TableRow = ({
  className,
  ref,
  ...props
}: React.HTMLAttributes<HTMLTableRowElement> & { ref?: React.Ref<HTMLTableRowElement> }) => (
  <tr ref={ref} className={cn(tableRow, className)} {...props} />
);
TableRow.displayName = "TableRow";

/** @deprecated Use a primitiva de `table-primitives`. */
const TableHead = ({
  className,
  ref,
  ...props
}: React.ThHTMLAttributes<HTMLTableCellElement> & { ref?: React.Ref<HTMLTableCellElement> }) => (
  <th ref={ref} className={cn(tableHead, className)} {...props} />
);
TableHead.displayName = "TableHead";

/** @deprecated Use a primitiva de `table-primitives`. */
const TableCell = ({
  className,
  ref,
  ...props
}: React.TdHTMLAttributes<HTMLTableCellElement> & { ref?: React.Ref<HTMLTableCellElement> }) => (
  <td ref={ref} className={cn(tableCell, className)} {...props} />
);
TableCell.displayName = "TableCell";

/** @deprecated Use a primitiva de `table-primitives`. */
const TableCaption = ({
  className,
  ref,
  ...props
}: React.HTMLAttributes<HTMLTableCaptionElement> & {
  ref?: React.Ref<HTMLTableCaptionElement>;
}) => <caption ref={ref} className={cn(tableCaption, className)} {...props} />;
TableCaption.displayName = "TableCaption";

export {
  TableWrapper,
  TableElement,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
};
