---
"@grupoitss/prizm-ui": minor
---

DataTable: decisões de 18/11/2026 (documentação, etapas 1 a 4).

- Sub-linhas: `getSubRows` e `getExpandLabel`, um nível, com o botão, a coluna de 48px e o recuo da Table. A linha pai aberta fica em `accent`. Usa o mesmo estado de linhas abertas do detalhe (`defaultExpandedRows`, `expandedRows`, `onExpandedRowsChange`); com `renderRowDetail` junto, ficam as sub-linhas e sai um aviso no console.
- `filters` com `type`: `search` (com `columnId`, a tabela filtra; com `onChange`, o produto filtra, com espera entre teclas), `select` (o padrão) e `status`. Selects e status à esquerda, a busca depois deles.
- `pagination` com dois modos: sem `onPageChange`, a tabela pagina `data` (`perPage`, 10 por padrão); com `onPageChange`, o produto pagina. Contagem, `footer` e paginação na mesma faixa do rodapé.
- `@deprecated`, com aviso no console em desenvolvimento: `showFilter`, `filterColumn`, `filterPlaceholder`, `toolbarFilters`, `showPagination`, `showSelectedCount`, `getRowClassName`, `selectionBar.color` e o componente `DataTableWithFilters`.
- `selectionBar.entityName` aceita singular e plural: `{ one: "proposta selecionada", other: "propostas selecionadas" }`.
- Contagem da seleção e do rodapé em `role="status"`, para o leitor de tela anunciar.
- Contagem da linha de grupo num Badge secondary `sm` (número), como no Figma.
- Vazio e erro com `py-20`, como no Figma (antes `py-8`).
- Menu de colunas com o título "Colunas visíveis" (antes "Mostrar colunas").
