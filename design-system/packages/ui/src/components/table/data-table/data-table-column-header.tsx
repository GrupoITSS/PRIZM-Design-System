import type { Column } from "@tanstack/react-table";
import * as React from "react";
import { cn } from "../../../lib/cn";
import { ArrowDown, ArrowUp, ArrowUpDown } from "../../icons";
import { dataTableSortButton } from "./data-table.styles";

export interface DataTableColumnHeaderProps<TData, TValue> {
  /** A coluna do TanStack, que vem do `header` da coluna (`({ column }) => …`). */
  column: Column<TData, TValue>;
  /** Texto do cabeçalho. */
  title: React.ReactNode;
  className?: string;
}

/**
 * Cabeçalho que ordena a coluna. Um clique ordena em ordem crescente, o segundo em decrescente.
 * O estado vai para o leitor de tela pelo `aria-sort` da célula do cabeçalho, que o DataTable põe.
 * Sem ordenação na coluna (`enableSorting: false`), mostra só o texto.
 *
 * @example
 * { accessorKey: "valor", header: ({ column }) => <DataTableColumnHeader column={column} title="Valor" /> }
 */
export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) return <span className={className}>{title}</span>;
  const sorted = column.getIsSorted();
  const Icon = sorted === "asc" ? ArrowUp : sorted === "desc" ? ArrowDown : ArrowUpDown;
  return (
    <button
      type="button"
      data-slot="data-table-sort"
      className={cn(dataTableSortButton, className)}
      onClick={() => column.toggleSorting(sorted === "asc")}
    >
      {title}
      <Icon aria-hidden />
    </button>
  );
}
