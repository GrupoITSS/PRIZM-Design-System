---
"@grupoitss/prizm-ui": minor
---

Table: decisões de 06/11/2026.

- Densidade do Figma e do shadcn atual: cabeçalho com 40px e 8px dos lados, célula com 8px (antes 48px, 16px e 16px). O DataTable mantém as medidas próprias.
- Cabeçalho em `foreground` (antes `muted-foreground`) e sem quebra de linha; a célula continua quebrando.
- `data-slot` em todas as peças (`table-container`, `table`, `table-header`, `table-body`, `table-footer`, `table-row`, `table-head`, `table-cell`, `table-caption`), e o `TableRoot` ganha `border-collapse`.
- `TableWrapper`, `TableElement` e os componentes `*Part` ficam `@deprecated`: use as primitivas (`TableRoot`, `TableHeader`…).
- Renderizador `hover`: o gatilho vira `<button>`, e o teclado abre o Popover e o HoverCard.
- Renderizador `text-image`: a imagem fica decorativa (`alt=""`).
- Links e botões dos renderizadores com o anel de foco do Button.
- Renderizador `actions`: com uma lista de ações como valor da célula, mostra o `ActionMenu` (antes, mostrava o valor como texto). Abrir o menu não dispara o clique da linha.
