---
"@grupoitss/prizm-ui": minor
---

Toggle e ToggleGroup: decisões da documentação de 23/11/2026 (DS-91).

**Toggle**

- **Tamanhos:** altura e largura mínima em `control-height` sm, md e lg, como o Button (antes, `h-9`, `h-10` e `h-11`). O texto fica em `text-sm` nos três; o Toggle só de ícone fica quadrado.
- **Ligado:** fundo `primary` e texto `primary-foreground` (antes, `accent`, quase igual ao fundo). No hover, o véu preto de 10% do Button.
- **Foco:** anel do Prizm (3px em `ring`, com 2px de espaço em `ring-offset`).
- **Outline:** fundo `input-background` e `shadow-xs`, como o Button Outline; borda `primary` quando ligado.
- **Nome:** Toggle só de ícone sem `aria-label` avisa no console em desenvolvimento.

**ToggleGroup**

- **Itens colados por padrão:** `spacing` passa a ter padrão 0, com a borda compartilhada e os cantos só nas pontas. Antes, o padrão era 1 (`gap-1`). Para os itens separados, passe `spacing={1}` ou mais.
- **Variante padrão `outline`:** antes, `default`, sem borda.
- **Largura:** a raiz deixa de ocupar a largura toda com os itens centralizados; fica do tamanho dos itens. Nova prop `fullWidth` para ocupar a largura, com os itens dividindo o espaço.
- **`required`:** com `type="single"`, o item ligado não desliga, e o grupo nunca fica sem valor. Use em filtro.
- **Nome:** os itens aceitam `"aria-label"`, como os do ButtonGroup (`ariaLabel` continua como alias). Item com ícone e sem `label` deixa de mostrar o `value` ao lado do ícone. Grupo sem nome e item só de ícone sem nome avisam no console em desenvolvimento.
- **Composição:** novo `ToggleGroupItem`, que recebe a variante, o tamanho e o espaçamento do grupo.
- **Novos exports:** `ToggleGroupItem`, `getToggleGroupItemClasses` e o tipo `ToggleGroupItemProps`.
