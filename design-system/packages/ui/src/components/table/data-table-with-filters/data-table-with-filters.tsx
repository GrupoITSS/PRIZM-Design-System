import { cn } from "../../../lib/cn";
import { DataTable, type DataTableProps, type DataTableSelectFilter } from "../data-table";

export type { DataTableSelectFilter };

export interface DataTableWithFiltersProps<TData, TValue> extends DataTableProps<TData, TValue> {
  filters: DataTableSelectFilter[];
}

/**
 * DataTable com toolbar de filtros (selects) e visibilidade de colunas.
 * Padrão da listagem de Acessos (Grupo, Objeto, Papel, Status + Colunas).
 */
export function DataTableWithFilters<TData, TValue>({
  showColumnVisibility = true,
  columnVisibilityLabel = "Colunas",
  columnVisibilityMenuLabel = "Colunas visíveis",
  className,
  ...props
}: DataTableWithFiltersProps<TData, TValue>) {
  return (
    <DataTable
      {...props}
      className={cn("min-h-0 flex-1", className)}
      showColumnVisibility={showColumnVisibility}
      columnVisibilityLabel={columnVisibilityLabel}
      columnVisibilityMenuLabel={columnVisibilityMenuLabel}
    />
  );
}
