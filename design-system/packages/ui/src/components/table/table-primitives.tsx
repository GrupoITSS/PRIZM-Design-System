import { cn } from "../../lib/cn";
import * as React from "react";
import {
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
 * Subcomponentes primitivos de Table para composição avançada.
 * Use quando precisar de controle total sobre a estrutura (ex.: TanStack Table).
 * Para casos comuns, prefira o componente <Table> com API por props.
 */

const TableRoot = ({
  className,
  ref,
  ...props
}: React.HTMLAttributes<HTMLTableElement> & { ref?: React.Ref<HTMLTableElement> }) => (
  <div className={tableWrapper}>
    <table ref={ref} className={cn("w-full caption-bottom text-sm", className)} {...props} />
  </div>
);
TableRoot.displayName = "TableRoot";

const TableHeader = ({
  className,
  ref,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement> & {
  ref?: React.Ref<HTMLTableSectionElement>;
}) => <thead ref={ref} className={cn(tableHeader, className)} {...props} />;
TableHeader.displayName = "TableHeader";

const TableBody = ({
  className,
  ref,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement> & {
  ref?: React.Ref<HTMLTableSectionElement>;
}) => <tbody ref={ref} className={cn(tableBody, className)} {...props} />;
TableBody.displayName = "TableBody";

const TableFooter = ({
  className,
  ref,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement> & {
  ref?: React.Ref<HTMLTableSectionElement>;
}) => <tfoot ref={ref} className={cn(tableFooter, className)} {...props} />;
TableFooter.displayName = "TableFooter";

const TableRow = ({
  className,
  ref,
  ...props
}: React.HTMLAttributes<HTMLTableRowElement> & { ref?: React.Ref<HTMLTableRowElement> }) => (
  <tr ref={ref} className={cn(tableRow, className)} {...props} />
);
TableRow.displayName = "TableRow";

const TableHead = ({
  className,
  ref,
  ...props
}: React.ThHTMLAttributes<HTMLTableCellElement> & { ref?: React.Ref<HTMLTableCellElement> }) => (
  <th ref={ref} className={cn(tableHead, className)} {...props} />
);
TableHead.displayName = "TableHead";

const TableCell = ({
  className,
  ref,
  ...props
}: React.TdHTMLAttributes<HTMLTableCellElement> & { ref?: React.Ref<HTMLTableCellElement> }) => (
  <td ref={ref} className={cn(tableCell, className)} {...props} />
);
TableCell.displayName = "TableCell";

const TableCaption = ({
  className,
  ref,
  ...props
}: React.HTMLAttributes<HTMLTableCaptionElement> & {
  ref?: React.Ref<HTMLTableCaptionElement>;
}) => <caption ref={ref} className={cn(tableCaption, className)} {...props} />;
TableCaption.displayName = "TableCaption";

export {
  TableRoot,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
};
