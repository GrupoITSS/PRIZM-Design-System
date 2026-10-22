# @grupoitss/prizm-tokens

## 5.1.0

### Minor Changes

- 840aab2: **Button: pendências de acessibilidade do critério WCAG 2.2 AA (DS-43)**

  - **Link sempre sublinhado.** Contra o texto ao redor, `primary-strong` tem de 1,39:1 a 2,72:1, então a cor sozinha não distingue o link (1.4.1). No hover, o sublinhado engrossa (`decoration-2`).
  - **Anel de foco com espaço de 2px** na cor `ring-offset` (acompanha o background). O `ring` é a cor primária em todas as marcas: sem o espaço, o anel tinha 1:1 contra o botão default e parecia só um botão maior.
  - **Loading mantém o foco.** Passa a usar `aria-disabled` e bloqueia o clique no código, em vez do atributo `disabled`, que mandava o foco para o `<body>` (e ele não voltava). Num botão `submit`, o formulário não é enviado durante o loading. `disabled` continua nativo.
  - **Hover do Secondary visível.** Sobrepõe o `foreground` a 10% (`color-mix`) em vez de `secondary/80`. O secondary é um cinza quase igual ao fundo, e a 80% a mudança era de 1,02 a 1,09:1; agora é de 1,24 a 1,36:1 nas 5 marcas.
  - **Hover do Text no fundo `destructive-weak`** (antes `destructive/10`): texto em tom sobre fundo da página usa `-strong`, e o hover dele é a superfície `-weak` do mesmo tom. `destructive-strong` sobre `destructive-weak`: 6,80 a 8,51:1.
  - **Tokens: `destructive-weak` do ITSS · Digitrol claro passa a `red.100`.** O background do Digitrol já é `neutral.100`, e `red.50` empatava com ele (1,00:1); `red.100` fica 1,12:1, como nas outras marcas sobre branco. Afeta também Alert e Badge destrutivos no Digitrol claro, que ficam um pouco mais visíveis.
  - **Aviso em desenvolvimento** quando um botão de ícone (`icon*`) não tem nome acessível (`aria-label`, `aria-labelledby`, `title`, texto ou `sr-only`).
  - **Combobox:** os botões de limpar, abrir opções e remover chip ganham `aria-label` ("Limpar", "Abrir opções", "Remover").

- 9889acf: **Button: Link legível no escuro, tamanho xs no token e sem a variante warning**

  - **Tokens:** novo `control-height.xs` = 24px em todas as marcas (o Digitrol também: 24px é o alvo mínimo do WCAG 2.2). No ITSS · Digitrol, `secondary` passa para a escala neutral (claro `neutral.200`, escuro `neutral.800`); antes era `gray.100`, que sumia sobre o fundo `neutral.100` (1,01:1).
  - **Tokens:** `muted` e `accent` ganham a camada por marca `palette.muted` / `palette.accent` (como o `secondary`), com os mesmos valores de antes em todas as marcas. Regra: os papéis neutros ficam um degrau acima do `background` da marca. No Digitrol claro, cujo fundo já é `neutral.100`, `muted` e `accent` passam a `neutral.200` — antes eram iguais ao fundo, e superfícies muted e o hover do Ghost sumiam.
  - **Button:** texto na cor de um tom sobre o fundo usa o degrau `-strong`. O Link passa a `text-primary-strong` (com `primary` reprovava no escuro nas 5 marcas, 3,53–4,06:1) e o Text a `text-destructive-strong` (com `destructive` reprovava no Docnix escuro, 4,22:1, e no Digitrol claro, 4,43:1). `xs` e `icon-xs` usam `control-height-xs`.
  - **Kbd:** dentro de um botão ou tooltip, a tecla herda a cor do texto do pai, com fundo dessa cor a 20% (`text-current bg-current/20`). Antes usava `text-background bg-background/20`, herdado do tooltip escuro do shadcn: sumia no tooltip claro do PRIZM (`bg-popover`) e ficava escura sobre o primary no modo escuro.
  - **Quebra:** a variante `warning` sai do Button (warning e success não são cor de botão, decisão de 15/10). Para migrar: ação reversível → `default`; irreversível → `destructive`.

- 0e4172b: **Input: paridade com o Figma e pendências de acessibilidade do critério WCAG 2.2 AA (decisões de 21/10)**

  - **Tokens: `color.input` sobe para o degrau 500 no claro e branco a 40% no escuro** (antes `neutral.200` e branco a 15%). A borda era a única coisa que separava o campo da página (o fundo do campo é igual ao da página, 1,00 a 1,07:1) e ficava entre 1,16:1 e 1,47:1 (1.4.11). Agora fica entre 3,62:1 e 4,83:1 contra `background`, `card`, `popover` e `muted`, nas 5 marcas e no Tchello. Muda todos os componentes com `border-input`: Input, Textarea, Select, Combobox, InputGroup, InputOTP, DatePicker, MaskedInput, Calendar, Checkbox, RadioGroup, Dropzone, Pagination, Toggle e o outline do Button.
  - **Input: estado de erro.** `aria-invalid` passa a pintar a borda de `destructive`; no foco a borda continua `destructive` e o anel continua `ring`. Antes o campo inválido ficava igual ao Default.
  - **Input: foco e disabled iguais em todos os tamanhos.** As regras que estavam só no `md` vão para a base: anel de 2px em `ring` com a borda transparente, disabled em `bg-muted` sem sombra e sem opacidade. O anel `ring/30` dos outros tamanhos ficava entre 1,28:1 e 1,84:1.
  - **Input: botão de senha no teclado e com alvo de 24px.** Sai o `tabIndex={-1}`, que deixava mostrar e ocultar a senha só com ponteiro (2.1.1), e o botão passa de 16 × 16px para 24 × 24px (2.5.8).
  - **Quebra:** os tamanhos do Input passam a ser `sm`, `md` e `lg`, todos em `control-height`. O antigo `default` vira `lg`, e o antigo `lg` (48px fixo, fora do Core) sai. Para migrar: `size="default"` → `size="lg"`; `size="lg"` → `size="lg"` (fica com a altura de controle da marca). Vale também para `InputGroup` e `InputGroupInput`.

### Patch Changes

- 0bf0d15: **Digitrol claro: superfícies weak um degrau acima do fundo**

  - **Tokens:** no ITSS · Digitrol claro, `success-weak`, `warning-weak`, `info-weak` e `primary-weak` passam ao degrau 200 (`green.200`, `amber.200`, `sky.200`, `cyan.200`). O fundo do Digitrol é `neutral.100`, e o degrau 50 empatava com ele (1,02 a 1,05:1). O 100 também não resolvia: nesses tons ele é tão claro quanto o fundo (1,01 a 1,05:1). No 200 a superfície fica entre 1,11 e 1,22:1, na faixa do `destructive-weak` (red.100, 1,12:1) e do `neutral.200` (1,16:1).
  - O texto `-strong` sobre essas superfícies continua acima de 4,5:1 (5,69 a 5,88:1). O modo escuro e as outras marcas não mudam.

## 5.0.0

### Major Changes

- 583adaa: Tokens sincronizados do Figma desde 4.0.0: +24 adicionados · ~12 alterados · −30 removidos.

  Tokens que deixaram de existir: foundations.tertiary.light, foundations.tertiary.dark, foundations.tertiary-foreground.light, foundations.tertiary-foreground.dark, palette.tertiary.light, palette.tertiary.dark, palette.tertiary-foreground.light, palette.tertiary-foreground.dark, palette.brand-color.light, palette.brand-color.dark, color.tertiary, color.tertiary-foreground.
  Temas ($themes) alterados.

## 4.0.0

### Major Changes

- 10793fc: **Prefixo `prizm` também no Android e no iOS**, onde o nome é compartilhado com o app inteiro (o CSS já o tinha desde a 3.0.0).

  - **Android:** os recursos passam a `prizm_color_primary`, `prizm_radius_md`, `prizm_font_sans`… e os arquivos a `prizm_colors.xml`, `prizm_tokens.xml` e `prizm_platform.xml`. Antes, copiar a pasta para `res/` sobrescrevia o `colors.xml` do app. Uso: `@color/prizm_color_primary`.
  - **iOS:** os enums passam a `PrizmDocnixLight`, `PrizmDocnixDark`, `PrizmDocnixMobile` e `PrizmDocnixDesktop` (e os arquivos `.swift` com o mesmo nome). As propriedades não mudam (`colorPrimary`).

  Não mudam: o CSS, o preset do Tailwind, o TypeScript (`ts/<tema>` e `ts/vars`) e os valores de qualquer token.

## 3.0.0

### Major Changes

- 583adaa: **Todas as variáveis CSS passam a ter o prefixo `--prizm-`** (`--color-primary` → `--prizm-color-primary`, `--radius-md` → `--prizm-radius-md`, `--control-height-md` → `--prizm-control-height-md`…). Vale para os arquivos de CSS, para o preset do Tailwind e para o `ts/vars` (que mantém os nomes de export: `colorPrimary`). O prefixo evita colisão com as variáveis do Tailwind (`--font-sans`, `--radius-md`…) e com as do próprio app. Quem usa as classes do Tailwind (`bg-primary`) não precisa mudar nada; quem escreve `var(--...)` à mão precisa acrescentar o prefixo. Os valores por tema em TypeScript, o Android e o iOS mantêm os nomes simples.

  Tokens sincronizados do Figma desde 1.0.0: +113 adicionados · ~34 alterados · −10 removidos.

  Tokens que deixaram de existir: foundations.warning-moderate.light, foundations.warning-moderate.dark, palette.warning-moderate.light, palette.warning-moderate.dark, color.warning-moderate.
  Temas ($themes) alterados.

## 1.0.0

### Major Changes

- Tokens sincronizados do Figma desde 0.3.0: +10 adicionados · ~20 alterados · −0 removidos · sets: +0 / −11.

  Tokens que deixaram de existir: shadow.xs, shadow.sm, shadow.md, shadow.lg, shadow.2xs, shadow.xl, shadow.2xl, inset-shadow.2xs, inset-shadow.xs, inset-shadow.sm, drop-shadow.xs, drop-shadow.sm, drop-shadow.md, drop-shadow.lg, drop-shadow.xl, drop-shadow.2xl, fontWeights.inter-0, fontSize.0, fontSize.1, fontSize.2, fontSize.3, letterSpacing.0, paragraphSpacing.0, heading.xl, heading.lg, heading.md, heading.sm, textCase.none, textDecoration.none, paragraphIndent.0, color.black, color.white, color.transparent, color.slate.50, color.slate.100, color.slate.200, color.slate.300, color.slate.400, color.slate.500, color.slate.600, color.slate.700, color.slate.800, color.slate.900, color.slate.950, color.gray.50, color.gray.100, color.gray.200, color.gray.300, color.gray.400, color.gray.500, color.gray.600, color.gray.700, color.gray.800, color.gray.900, color.gray.950, color.zinc.50, color.zinc.100, color.zinc.200, color.zinc.300, color.zinc.400, color.zinc.500, color.zinc.600, color.zinc.700, color.zinc.800, color.zinc.900, color.zinc.950, color.neutral.50, color.neutral.100, color.neutral.200, color.neutral.300, color.neutral.400, color.neutral.500, color.neutral.600, color.neutral.700, color.neutral.800, color.neutral.900, color.neutral.950, color.stone.50, color.stone.100, color.stone.200, color.stone.300, color.stone.400, color.stone.500, color.stone.600, color.stone.700, color.stone.800, color.stone.900, color.stone.950, color.red.50, color.red.100, color.red.200, color.red.300, color.red.400, color.red.500, color.red.600, color.red.700, color.red.800, color.red.900, color.red.950, color.orange.50, color.orange.100, color.orange.200, color.orange.300, color.orange.400, color.orange.500, color.orange.600, color.orange.700, color.orange.800, color.orange.900, color.orange.950, color.amber.50, color.amber.100, color.amber.200, color.amber.300, color.amber.400, color.amber.500, color.amber.600, color.amber.700, color.amber.800, color.amber.900, color.amber.950, color.yellow.50, color.yellow.100, color.yellow.200, color.yellow.300, color.yellow.400, color.yellow.500, color.yellow.600, color.yellow.700, color.yellow.800, color.yellow.900, color.yellow.950, color.lime.50, color.lime.100, color.lime.200, color.lime.300, color.lime.400, color.lime.500, color.lime.600, color.lime.700, color.lime.800, color.lime.900, color.lime.950, color.green.50, color.green.100, color.green.200, color.green.300, color.green.400, color.green.500, color.green.600, color.green.700, color.green.800, color.green.900, color.green.950, color.emerald.50, color.emerald.100, color.emerald.200, color.emerald.300, color.emerald.400, color.emerald.500, color.emerald.600, color.emerald.700, color.emerald.800, color.emerald.900, color.emerald.950, color.teal.50, color.teal.100, color.teal.200, color.teal.300, color.teal.400, color.teal.500, color.teal.600, color.teal.700, color.teal.800, color.teal.900, color.teal.950, color.cyan.50, color.cyan.100, color.cyan.200, color.cyan.300, color.cyan.400, color.cyan.500, color.cyan.600, color.cyan.700, color.cyan.800, color.cyan.900, color.cyan.950, color.sky.50, color.sky.100, color.sky.200, color.sky.300, color.sky.400, color.sky.500, color.sky.600, color.sky.700, color.sky.800, color.sky.900, color.sky.950, color.blue.50, color.blue.100, color.blue.200, color.blue.300, color.blue.400, color.blue.500, color.blue.600, color.blue.700, color.blue.800, color.blue.900, color.blue.950, color.indigo.50, color.indigo.100, color.indigo.200, color.indigo.300, color.indigo.400, color.indigo.500, color.indigo.600, color.indigo.700, color.indigo.800, color.indigo.900, color.indigo.950, color.violet.50, color.violet.100, color.violet.200, color.violet.300, color.violet.400, color.violet.500, color.violet.600, color.violet.700, color.violet.800, color.violet.900, color.violet.950, color.purple.50, color.purple.100, color.purple.200, color.purple.300, color.purple.400, color.purple.500, color.purple.600, color.purple.700, color.purple.800, color.purple.900, color.purple.950, color.fuchsia.50, color.fuchsia.100, color.fuchsia.200, color.fuchsia.300, color.fuchsia.400, color.fuchsia.500, color.fuchsia.600, color.fuchsia.700, color.fuchsia.800, color.fuchsia.900, color.fuchsia.950, color.pink.50, color.pink.100, color.pink.200, color.pink.300, color.pink.400, color.pink.500, color.pink.600, color.pink.700, color.pink.800, color.pink.900, color.pink.950, color.rose.50, color.rose.100, color.rose.200, color.rose.300, color.rose.400, color.rose.500, color.rose.600, color.rose.700, color.rose.800, color.rose.900, color.rose.950, color.white-alpha.4, color.white-alpha.5, color.white-alpha.10, color.white-alpha.15, color.white-alpha.20, color.white-alpha.30, color.white-alpha.40, color.white-alpha.50, color.white-alpha.60, color.white-alpha.70, color.white-alpha.80, color.white-alpha.90, color.white-alpha.95, color.black-alpha.5, color.black-alpha.10, color.black-alpha.20, color.black-alpha.30, color.black-alpha.40, color.black-alpha.50, color.black-alpha.60, color.black-alpha.70, color.black-alpha.80, color.black-alpha.90, color.black-alpha.95, color.afipe.petrol.200, color.afipe.petrol.600, color.afipe.petrol.900, color.digitrol.navy.200, color.digitrol.navy.900, color.digitrol.navy.950, color.docnix.purple.50, color.docnix.purple.100, color.docnix.purple.200, color.docnix.purple.300, color.docnix.purple.400, color.docnix.purple.500, color.docnix.purple.600, color.docnix.purple.700, color.docnix.purple.800, color.docnix.purple.900, color.docnix.purple.950, color.docnix.cyan.200, color.docnix.cyan.500, color.docnix.green.200, color.docnix.red.600, color.docnix.purple-neutral.50, color.docnix.purple-neutral.100, color.docnix.purple-neutral.200, color.docnix.purple-neutral.300, color.docnix.purple-neutral.400, color.docnix.purple-neutral.500, color.docnix.purple-neutral.600, color.docnix.purple-neutral.700, color.docnix.purple-neutral.800, color.docnix.purple-neutral.900, color.docnix.purple-neutral.950, font.serif, font.serif 2, spacing.0, spacing.1, spacing.2, spacing.3, spacing.4, spacing.5, spacing.6, spacing.7, spacing.8, spacing.9, spacing.10, spacing.11, spacing.12, spacing.14, spacing.16, spacing.20, spacing.24, spacing.28, spacing.32, spacing.36, spacing.40, spacing.44, spacing.48, spacing.52, spacing.56, spacing.60, spacing.64, spacing.72, spacing.80, spacing.96, spacing.px, spacing.0-5, spacing.1-5, spacing.2-5, spacing.3-5, width.0, width.1, width.2, width.3, width.4, width.5, width.6, width.7, width.8, width.9, width.10, width.11, width.12, width.14, width.16, width.20, width.24, width.28, width.32, width.36, width.44, width.48, width.52, width.56, width.64, width.72, width.80, width.96, width.px, width.0-5, width.1-5, width.2-5, width.3-5, min-width.px, min-width.3xs, min-width.2xs, min-width.xs, min-width.sm, min-width.md, min-width.lg, min-width.xl, min-width.2xl, min-width.3xl, min-width.4xl, min-width.5xl, min-width.6xl, min-width.7xl, max-width.none, max-width.px, max-width.3xs, max-width.2xs, max-width.xs, max-width.sm, max-width.md, max-width.lg, max-width.xl, max-width.2xl, max-width.3xl, max-width.4xl, max-width.5xl, max-width.6xl, max-width.7xl, height.0, height.1, height.2, height.3, height.4, height.5, height.6, height.7, height.8, height.9, height.10, height.11, height.12, height.14, height.16, height.20, height.24, height.28, height.32, height.36, height.44, height.48, height.52, height.56, height.64, height.72, height.80, height.96, height.px, height.0-5, height.1-5, height.2-5, height.3-5, breakpoint.sm, breakpoint.md, breakpoint.lg, breakpoint.xl, breakpoint.2xl, border-width.0, border-width.1, border-width.2, border-width.3, border-width.4, border-width.5, border-width.6, border-width.7, border-width.8, stroke-width.0, stroke-width.1, stroke-width.2, stroke-width.3, stroke-width.4, stroke-width.5, stroke-width.6, stroke-width.7, stroke-width.8, stroke-width.1-33, stroke-width.1-5, stroke-width.1-67, opacity.0, opacity.5, opacity.10, opacity.15, opacity.20, opacity.25, opacity.30, opacity.35, opacity.40, opacity.45, opacity.50, opacity.55, opacity.60, opacity.65, opacity.70, opacity.75, opacity.80, opacity.85, opacity.90, opacity.95, opacity.100, leading.1, leading.2, leading.3, leading.4, leading.5, leading.6, leading.7, leading.8, leading.9, leading.10, leading.11, leading.12, leading.13, leading.14, leading.15, leading.16, leading.17, leading.18, leading.19, leading.20, container.3xs, container.2xs, container.xs, container.sm, container.md, container.lg, container.xl, container.2xl, container.3xl, container.4xl, container.5xl, container.6xl, container.7xl, text.xs.font-size, text.xs.line-height, text.sm.font-size, text.sm.line-height, text.base.font-size, text.base.line-height, text.lg.font-size, text.lg.line-height, text.xl.font-size, text.xl.line-height, text.2xl.font-size, text.2xl.line-height, text.3xl.font-size, text.3xl.line-height, text.4xl.font-size, text.4xl.line-height, text.5xl.font-size, text.5xl.line-height, text.6xl.font-size, text.6xl.line-height, text.7xl.font-size, text.7xl.line-height, text.8xl.font-size, text.8xl.line-height, text.9xl.font-size, text.9xl.line-height, font-weight.thin, font-weight.extralight, font-weight.light, font-weight.normal, font-weight.medium, font-weight.semibold, font-weight.bold, font-weight.extrabold, font-weight.black, blur.xs, blur.sm, blur.md, blur.lg, blur.xl, blur.2xl, blur.3xl, heading.xl.font-family, heading.lg.font-family, heading.md.font-family, heading.sm.font-family.

## 0.3.0

### Minor Changes

- Tokens sincronizados do Figma desde 0.2.0: sets: +11 / −0.

  Temas ($themes) alterados.

## 0.2.0

### Minor Changes

- Tokens sincronizados do Figma desde 0.1.0: nenhum valor alterado.

  Temas ($themes) alterados.

## 0.1.0

### Minor Changes

- e33ea60: Primeira publicação no GitHub Packages. Tokens em CSS, preset do Tailwind, TypeScript, Android e iOS; componente Button.
