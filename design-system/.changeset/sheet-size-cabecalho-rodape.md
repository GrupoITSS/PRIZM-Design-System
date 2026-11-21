---
"@grupoitss/prizm-ui": minor
---

Sheet: `size`, cabeçalho completo, rodapé fixo e botão fechar do Prizm, com as decisões de 21/11/2026.

- **`size`:** `sm` (384px, padrão nas laterais), `md`, `lg`, `xl`, `2xl` e `full`, na escala `max-width/*` do Core, a mesma do Dialog. `full` é o padrão em `top` e `bottom` (a largura da tela, como antes); com `size` menor, o painel de topo e de base fica centralizado. Nas laterais, `full` vale como `2xl`. No celular, as laterais ocupam 75% da tela.
- **Cabeçalho:** a prop `titleAdornment` (status ao lado do título) e a `eyebrow` e a `headerActions`, que deixam de ser exclusivas do `layout="panel"`.
- **Rodapé:** fixo embaixo, com a nova prop `footerLeading` à esquerda das ações. No celular, a ação principal fica em cima. Só o corpo rola.
- **Botão fechar:** passa a ser o `Button` ghost `icon-sm` do Prizm, com o anel de foco do Button e alvo de 32px (antes, 16px, com `focus:ring-2`). O nome padrão continua "Close". Sem `title`, o painel se chama "Painel" (`sr-only`; antes, "Sheet").
- **Removidos:** as props `layout` e `icon`. O layout `panel` vira o único: fundo `bg-background`, cabeçalho e rodapé fixos, rodapé com linha em cima. Quem usava `layout="panel"` passa `size` no lugar da largura de 550px. As constantes `SHEET_PANEL_WIDTH_PX`, `sheetPanelWidthClass` e `sheetPanelWidthClasses` ficam marcadas como `@deprecated`.
- **Overlay:** já usa só `color/overlay`, sem desfoque.
- Teste de teclado e nomes em `sheet.a11y.test.tsx`. Story movida para `Primários/Sheet`, com a tag `documentado`.
