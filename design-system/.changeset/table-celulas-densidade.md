---
"@grupoitss/prizm-ui": minor
---

Table: decisões do teste de tela da Proposta (17/11/2026).

- `density`: `"default"` (52px, `h-13`) ou `"compact"` (36px, `h-9` com `py-1.5`). As duas são altura mínima, com a borda da linha.
- Texto cortado numa linha por padrão, com Tooltip do texto inteiro só quando corta. `wrap: true` na coluna quebra a linha.
- Coluna com `align: "right"` usa `tabular-nums`.
- `isRowSelected` marca a linha com `data-state="selected"`.
- Renderizadores com a altura de linha do `text-sm` (20px), como o texto simples. Antes, 24px.
- Exporta `tableCellDefaultDensity`, `tableCellCompactDensity`, `tableCellTruncate`, `tableCellText` e `tableCellNumeric`.
