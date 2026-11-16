---
"@grupoitss/prizm-ui": minor
---

Table: linhas que expandem. `getSubRows` dá sub-linhas (um nível) às linhas, com um botão de expandir (Button ghost icon-sm, `aria-expanded`, `aria-controls`) numa coluna à esquerda; as sub-linhas usam as mesmas colunas, com a primeira coluna de dados recuada (`pl-10`). Estado com `defaultExpanded` (lista de chaves ou `true`) ou controlado com `expanded` e `onExpandedChange`; nome do botão por `getExpandLabel` (padrão "Expandir"/"Recolher" + a primeira coluna). O `render` da coluna ganha um terceiro argumento, `{ depth, subRows, isExpanded }`, para a linha pai mostrar a soma das sub-linhas. No rodapé, a primeira célula ocupa a coluna de expandir. Sem `getSubRows`, nada muda. Novos exports: `TableRowMeta`, `tableExpandHead`, `tableExpandCell` e `tableSubRowIndent`.
