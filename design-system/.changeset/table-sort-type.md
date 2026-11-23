---
"@grupoitss/prizm-ui": minor
---

Table e DataTable (DS-81): nova prop `sortType` (`default`, `text`, `number`) na coluna (`TableColumn`) e no `DataTableColumnHeader`. Ela escolhe o ícone de ordenação: setas, A–Z/Z–A ou 0–1/1–0. Novos ícones exportados: `ArrowDownAZ`, `ArrowDownZA`, `ArrowDown01`, `ArrowDown10`. O `align="center"` (e o `cellAlign: "center"` do DataTable) fica obsoleto: o padrão é `left` e o Figma passa a ter só `Align=Left | Right`. Segue funcionando para não quebrar usos, e sai numa major.
