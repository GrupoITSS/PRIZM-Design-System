---
"@grupoitss/prizm-ui": minor
---

DataTable: decisões do teste de tela da Proposta (17/11/2026).

- Visual da Table: cabeçalho com 40px, 8px dos lados e em `foreground` (antes, a 40%); linha com 52px de altura mínima e célula com 8px (antes, 16px dos lados). Texto simples corta numa linha, com Tooltip quando corta; `meta.prizm.wrap` quebra. Coluna à direita com `tabular-nums`.
- Ordenação: `DataTableColumnHeader` no cabeçalho, `aria-sort` na célula, `sorting`, `defaultSorting`, `onSortingChange` e `manualSorting`.
- Linha clicável pelo teclado: com `onRowClick`, a linha recebe foco e abre com Enter ou Espaço.
- Textos padrão em português: "Nenhum resultado.", "Filtrar...", "Colunas", "Mostrar colunas". Quebra para quem dependia dos textos em inglês.
- `getRowEmphasis` (info, success, warning, destructive), `groupBy` e `renderGroupLabel`, `toolbarActions`, `summaryRow`, `renderRowDetail` (com `defaultExpandedRows`, `expandedRows`, `onExpandedRowsChange` e `getDetailLabel`).
- `DataTableEditableCell`: Input `sm` na célula, com nome, estado inválido e mensagem.
- Carregando com linhas de Skeleton (`loadingRows`) no lugar do Spinner; `error`, `onRetry` e `retryLabel`.
- `stickyHeader`, `stickyFirstColumn` e `stickyLastColumn`.
- `aria-label` dá nome à tabela.
