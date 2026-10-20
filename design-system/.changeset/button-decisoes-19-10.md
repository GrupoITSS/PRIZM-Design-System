---
"@grupoitss/prizm-tokens": minor
"@grupoitss/prizm-ui": minor
---

**Button: Link legível no escuro, tamanho xs no token e sem a variante warning**

- **Tokens:** novo `control-height.xs` = 24px em todas as marcas (o Digitrol também: 24px é o alvo mínimo do WCAG 2.2). No ITSS · Digitrol, `secondary` passa para a escala neutral (claro `neutral.200`, escuro `neutral.800`); antes era `gray.100`, que sumia sobre o fundo `neutral.100` (1,01:1).
- **Tokens:** `muted` e `accent` ganham a camada por marca `palette.muted` / `palette.accent` (como o `secondary`), com os mesmos valores de antes em todas as marcas. Regra: os papéis neutros ficam um degrau acima do `background` da marca. No Digitrol claro, cujo fundo já é `neutral.100`, `muted` e `accent` passam a `neutral.200` — antes eram iguais ao fundo, e superfícies muted e o hover do Ghost sumiam.
- **Button:** texto na cor de um tom sobre o fundo usa o degrau `-strong`. O Link passa a `text-primary-strong` (com `primary` reprovava no escuro nas 5 marcas, 3,53–4,06:1) e o Text a `text-destructive-strong` (com `destructive` reprovava no Docnix escuro, 4,22:1, e no Digitrol claro, 4,43:1). `xs` e `icon-xs` usam `control-height-xs`.
- **Kbd:** dentro de um botão ou tooltip, a tecla herda a cor do texto do pai, com fundo dessa cor a 20% (`text-current bg-current/20`). Antes usava `text-background bg-background/20`, herdado do tooltip escuro do shadcn: sumia no tooltip claro do PRIZM (`bg-popover`) e ficava escura sobre o primary no modo escuro.
- **Quebra:** a variante `warning` sai do Button (warning e success não são cor de botão, decisão de 15/10). Para migrar: ação reversível → `default`; irreversível → `destructive`.
