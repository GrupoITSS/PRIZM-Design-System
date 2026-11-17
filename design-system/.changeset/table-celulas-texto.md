---
"@grupoitss/prizm-ui": minor
---

Table: decisões do teste de tela da Proposta (17/11/2026).

- Uma densidade só: linha de 52px (`h-13`), como altura mínima, com a borda da linha.
- Texto cortado numa linha por padrão, com Tooltip do texto inteiro só quando corta. `wrap: true` na coluna quebra a linha.
- Coluna com `align: "right"` usa `tabular-nums`.
- `isRowSelected` marca a linha com `data-state="selected"`.
- Exporta `tableCellMinHeight`, `tableCellTruncate`, `tableCellText` e `tableCellNumeric`.
