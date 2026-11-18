---
"@grupoitss/prizm-ui": patch
---

DataTable: mapa de tokens aponta para a Data Table / Group Cell no Figma, que substitui a Data Table / Group Row e a variante Content=Groups. A linha de grupo vira um tipo de célula no slot Cells de cada coluna. Divergência registrada: o Figma não tem colSpan, e o rótulo fica na largura da primeira coluna. A variante Content=Selection também saiu do Data Table: a barra de seleção é a booleana Show Selection Bar, e a coluna de checkbox e as linhas marcadas vêm da Table.
