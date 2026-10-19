---
"@grupoitss/prizm-tokens": minor
"@grupoitss/prizm-ui": minor
---

**Button: Link legível no escuro, tamanho xs no token e sem a variante warning**

- **Tokens:** novo `control-height.xs` = 24px em todas as marcas (o Digitrol também: 24px é o alvo mínimo do WCAG 2.2). No ITSS · Digitrol, `secondary` passa para a escala neutral (claro `neutral.200`, escuro `neutral.800`); antes era `gray.100`, que sumia sobre o fundo `neutral.100` (1,01:1).
- **Button:** texto na cor de um tom sobre o fundo usa o degrau `-strong`. O Link passa a `text-primary-strong` (com `primary` reprovava no escuro nas 5 marcas, 3,53–4,06:1) e o Text a `text-destructive-strong` (com `destructive` reprovava no Docnix escuro, 4,22:1, e no Digitrol claro, 4,43:1). `xs` e `icon-xs` usam `control-height-xs`.
- **Quebra:** a variante `warning` sai do Button (warning e success não são cor de botão, decisão de 15/10). Para migrar: ação reversível → `default`; irreversível → `destructive`.
