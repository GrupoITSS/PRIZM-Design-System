---
"@grupoitss/prizm-ui": minor
---

Table e DataTable: saem as APIs `@deprecated`, já que nenhum produto usa a biblioteca ainda (decisão de 18/11/2026).

- Sai o `DataTableWithFilters`: use `<DataTable filters={…} showColumnVisibility />`. O tipo `DataTableSelectFilter` passa a sair do DataTable.
- Saem do DataTable `showFilter`, `filterColumn`, `filterPlaceholder` e `toolbarFilters` (use `filters` com `type`), `showPagination` (use `pagination={{ perPage: 10 }}`), `showSelectedCount` (a barra de seleção já mostra a contagem), `getRowClassName` e `selectionBar.color`. `selectionBar.entityName` aceita só `{ one, other }`.
- Saem os `table-parts`: `TableWrapper`, `TableElement` e os `*Part` (`TableHeadPart`, `TableCellPart`…). Use as primitivas (`TableRoot`, `TableHead`, `TableCell`…).
