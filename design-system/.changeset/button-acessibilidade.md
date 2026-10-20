---
"@grupoitss/prizm-ui": minor
"@grupoitss/prizm-tokens": minor
---

**Button: pendências de acessibilidade do critério WCAG 2.2 AA (DS-43)**

- **Link sempre sublinhado.** Contra o texto ao redor, `primary-strong` tem de 1,39:1 a 2,72:1, então a cor sozinha não distingue o link (1.4.1). No hover, o sublinhado engrossa (`decoration-2`).
- **Anel de foco com espaço de 2px** na cor `ring-offset` (acompanha o background). O `ring` é a cor primária em todas as marcas: sem o espaço, o anel tinha 1:1 contra o botão default e parecia só um botão maior.
- **Loading mantém o foco.** Passa a usar `aria-disabled` e bloqueia o clique no código, em vez do atributo `disabled`, que mandava o foco para o `<body>` (e ele não voltava). Num botão `submit`, o formulário não é enviado durante o loading. `disabled` continua nativo.
- **Hover do Secondary visível.** Sobrepõe o `foreground` a 10% (`color-mix`) em vez de `secondary/80`. O secondary é um cinza quase igual ao fundo, e a 80% a mudança era de 1,02 a 1,09:1; agora é de 1,24 a 1,36:1 nas 5 marcas.
- **Hover do Text no fundo `destructive-weak`** (antes `destructive/10`): texto em tom sobre fundo da página usa `-strong`, e o hover dele é a superfície `-weak` do mesmo tom. `destructive-strong` sobre `destructive-weak`: 6,80 a 8,51:1.
- **Tokens: `destructive-weak` do ITSS · Digitrol claro passa a `red.100`.** O background do Digitrol já é `neutral.100`, e `red.50` empatava com ele (1,00:1); `red.100` fica 1,12:1, como nas outras marcas sobre branco. Afeta também Alert e Badge destrutivos no Digitrol claro, que ficam um pouco mais visíveis.
- **Aviso em desenvolvimento** quando um botão de ícone (`icon*`) não tem nome acessível (`aria-label`, `aria-labelledby`, `title`, texto ou `sr-only`).
- **Combobox:** os botões de limpar, abrir opções e remover chip ganham `aria-label` ("Limpar", "Abrir opções", "Remover").
