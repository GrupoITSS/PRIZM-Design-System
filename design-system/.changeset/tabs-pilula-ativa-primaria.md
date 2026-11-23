---
"@grupoitss/prizm-ui": minor
---

Tabs: aba ativa do `pills` na cor primária (DS-92, decisão de 23/11/2026).

- **Aba ativa:** fundo `primary` e texto `primary-foreground`, com a sombra de antes. Antes, era `background` sobre o `muted` da lista, quase invisível (1,09 a 1,37:1). Agora o fundo passa 3:1 em 8 dos 12 temas, e o texto passa 4,5:1 em todos.
- **Hover:** o texto da aba ativa continua em `primary-foreground`. Só a inativa escurece.
- **Badge numérico:** na aba ativa, inverte para fundo `primary-foreground` e texto `primary`, como o "Sobre primary" do Figma.
- O `underline` não muda.
