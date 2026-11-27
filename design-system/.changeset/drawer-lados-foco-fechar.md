---
"@grupoitss/prizm-ui": minor
---

Drawer: os quatro lados funcionam, o foco entra no painel e `dismissible={false}` fecha pelo `DrawerClose`.

- `side` top, right e left ganham estilo próprio (antes abriam fora da tela): painel preso à borda, raio `radius/lg` e borda só do lado de dentro, laterais em 3/4 da tela até 384px, topo e base até 85% da altura.
- Fundo `color/card` e texto `color/card-foreground`, como Sheet e Dialog (antes `color/background`).
- `autoFocus` passa a ser `true` por padrão: ao abrir, o foco vai para dentro do painel (WCAG 2.4.3).
- Com `dismissible={false}`, o `DrawerClose` fecha (o vaul ignorava o fechamento e prendia o usuário, WCAG 2.1.2).
- A alça fica fora da árvore de acessibilidade (`aria-hidden`), com 100 × 8px; embaixo no top e vertical nas laterais.
- Stories em `Primários/Drawer`, em pt-BR, com a tag `documentado`.
