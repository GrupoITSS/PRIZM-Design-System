---
"@grupoitss/prizm-ui": minor
---

Table: decisões de 17/11/2026 (etapa 1 da documentação).

- Ordenação: `sortable` e `sortValue` na coluna; `defaultSort`, `sort`, `onSortChange` e `manualSort` na Table. O cabeçalho vira botão, com `aria-sort`, como no DataTable.
- Vazio com o Empty, numa linha da largura toda, com "Nenhum resultado." por padrão. Antes, só o texto, e nada sem `emptyMessage`.
- `isRowSelected` passa a se chamar `isRowHighlighted`, o mesmo nome do DataTable, com `data-highlighted` na linha.
- Exporta `TableSort`, `tableSortButton` e `tableRowHighlighted`, usados também pelo DataTable.
- O ícone de ordenar fica na cor do texto do cabeçalho (`foreground`), com ou sem ordem, na Table e no `DataTableColumnHeader` (decisão de 17/11/2026).
