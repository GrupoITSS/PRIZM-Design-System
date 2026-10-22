# @grupoitss/prizm-ui

## 0.2.0

### Minor Changes

- aba0c3a: **Badge: só as variantes do Figma, `verified`, `success`, `warning` e `shape="number"`**

  O Figma é a fonte da verdade: o Badge passa a ter só o que o componente do Figma tem.

  - **Visual:** `rounded-md` (`radius/md`), `font-semibold` e padding `px-2 py-0.5` (`spacing/2` e `spacing/0-5`), como no Figma. Antes era `rounded-full`, `font-normal` e `px-1.5`.
  - **`variant="default"`** usa `color/primary` (`bg-primary text-primary-foreground`). Antes usava `bg-foreground`.
  - **`variant="outline"`** usa os mesmos tokens do outline do Button: `bg-input-background`, `border-input` e `shadow-xs`.
  - **Novo `variant="verified"`**, no tom `info` (`bg-info text-info-foreground`). O ícone de check entra por `startIcon`.
  - **Novo `variant="success"`** (`bg-success text-success-foreground`), criado no Figma em 21/10/2026.
  - **`variant="warning"`** (`bg-warning text-warning-foreground`), criado no Figma em 21/10/2026.
  - **Tamanhos:** `sm` (padrão, 20px), `md` (24px) e `lg` (28px), os mesmos de antes, agora também no Figma (`height/5`, `height/6` e `height/7`).
  - **Nova prop `shape`** (`default` | `number`). `number` é o "Badge Number" do Figma: contador redondo, mínimo de 20px (`min-w-5 rounded-full px-1`), com `tabular-nums`.
  - **Sem estados:** o Badge é estático, como no Figma. Saem as classes de hover de todas as variantes e a transição de cor.
  - **Variantes:** ficam `default`, `secondary`, `outline`, `destructive`, `verified`, `success` e `warning`.
  - **Tabela e coluna de status:** as tags neutras da tabela passam a `variant="outline"`. Os chips de status continuam com `success`, `warning`, `secondary` e `destructive`.
  - **Quebra:** saem as variants `primary`, `info` e `violet` e a prop `appearance` (`outlined` e `text`). O atributo `data-appearance` some. Para as cores que saíram, use `className` com os tokens (`bg-info text-info-foreground`, ou o tom suave `bg-info-weak text-info-strong`). O Default deixa de ser `bg-foreground`, o raio deixa de ser `full` e o hover sai; para o visual antigo, use `variant="default" className="rounded-full bg-foreground text-background"`.

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

- fc95197: **Select, Textarea, DatePicker e InputGroup: mesma escala e mesmos estados do Input (decisões de 21/10)**

  - **InputGroup: a altura do contêiner segue o Input.** Depois do PR #104, um InputGroup `lg` ficava com o contêiner de 48px (`h-12`) e o campo de 40px dentro. Agora `sm`, `md` e `lg` usam `control-height`, e a regra do `default` sai.
  - **Select, Textarea e DatePicker em `sm`, `md` e `lg`**, como o Input. No Select e no DatePicker a altura vem de `control-height`. O antigo `default` vira `lg`, e o `lg` antigo sai: no Select e no DatePicker era 48px fixo, fora do Core; no Textarea, `min-h-24`.
  - **Foco e disabled iguais em todos os tamanhos.** As regras do `md` vão para a base: anel de 2px em `ring` com a borda transparente, disabled em `bg-muted` sem sombra e sem opacidade. Antes, `sm`, `default` e `lg` usavam `ring/30` (de 1,28:1 a 1,84:1 contra o fundo, abaixo do 3:1) e `opacity-50`.
  - **Select:** o texto do disabled passa de `foreground` a `muted-foreground`, como no Input. O hover deixa de pintar o fundo de `accent` nos tamanhos que não eram `md`.
  - **DatePicker:** `ring-offset-0` anula o espaço de 2px do anel que o Button (gatilho) traz.
  - **Quebra:** `size="default"` sai do Select, do Textarea e do DatePicker. Para migrar: `size="default"` → `size="lg"`; `size="lg"` → `size="lg"` (no Select e no DatePicker, fica com a altura de controle da marca, em vez de 48px).

- cd3a4aa: **58 componentes novos, trazidos do `@pas/ui` (pas-ui, Azure DevOps) com os tokens do PRIZM**

  accordion, alert, alert-dialog, alert-message, aspect-ratio, avatar, badge, breadcrumb, button-group, calendar, card, carousel, chart, checkbox, collapsible, combobox, command, context-menu, date-picker, dialog, drawer, dropdown-menu, dropzone, empty, field, hover-card, icons, input, input-group, input-otp, item, kbd, label, masked-input, menubar, navigation-menu, pagination, photo-upload, popover, progress, radio-group, resizable, scroll-area, search-popover, select, separator, sheet, skeleton, slider, sonner, spinner, switch, table (Table e DataTable), tabs, textarea, toggle, toggle-group e tooltip. Cada um sai pelo próprio caminho (`@grupoitss/prizm-ui/dialog`) e todos pela raiz (`@grupoitss/prizm-ui`).

  - Cores, alturas de controle, raios e sombras vêm dos tokens; hover dos preenchidos a 80%; modo escuro pelos tokens (`data-mode`), sem a variante `dark:`.
  - **Button:** tamanhos `xs` e `icon-xs`, variante `text` (ação destrutiva em texto) e a prop `asChild`. O que já existia não muda.
  - **CSS novo:** `@grupoitss/prizm-ui/styles.css` (animações, cor de borda padrão, `custom-scroll` e o `@source` das classes). Substitui o `@source "../node_modules/@grupoitss/prizm-ui/dist"` no CSS do app.
  - **`react-dom` 19** passa a ser peer dependency (diálogos, menus e popovers usam portal).

  Requer `@grupoitss/prizm-tokens` 5.0.0 ou superior (tokens `primary-weak`, `primary-strong` e os `-weak`/`-strong` de feedback).

- 0e4172b: **Input: paridade com o Figma e pendências de acessibilidade do critério WCAG 2.2 AA (decisões de 21/10)**

  - **Tokens: `color.input` sobe para o degrau 500 no claro e branco a 40% no escuro** (antes `neutral.200` e branco a 15%). A borda era a única coisa que separava o campo da página (o fundo do campo é igual ao da página, 1,00 a 1,07:1) e ficava entre 1,16:1 e 1,47:1 (1.4.11). Agora fica entre 3,62:1 e 4,83:1 contra `background`, `card`, `popover` e `muted`, nas 5 marcas e no Tchello. Muda todos os componentes com `border-input`: Input, Textarea, Select, Combobox, InputGroup, InputOTP, DatePicker, MaskedInput, Calendar, Checkbox, RadioGroup, Dropzone, Pagination, Toggle e o outline do Button.
  - **Input: estado de erro.** `aria-invalid` passa a pintar a borda de `destructive`; no foco a borda continua `destructive` e o anel continua `ring`. Antes o campo inválido ficava igual ao Default.
  - **Input: foco e disabled iguais em todos os tamanhos.** As regras que estavam só no `md` vão para a base: anel de 2px em `ring` com a borda transparente, disabled em `bg-muted` sem sombra e sem opacidade. O anel `ring/30` dos outros tamanhos ficava entre 1,28:1 e 1,84:1.
  - **Input: botão de senha no teclado e com alvo de 24px.** Sai o `tabIndex={-1}`, que deixava mostrar e ocultar a senha só com ponteiro (2.1.1), e o botão passa de 16 × 16px para 24 × 24px (2.5.8).
  - **Quebra:** os tamanhos do Input passam a ser `sm`, `md` e `lg`, todos em `control-height`. O antigo `default` vira `lg`, e o antigo `lg` (48px fixo, fora do Core) sai. Para migrar: `size="default"` → `size="lg"`; `size="lg"` → `size="lg"` (fica com a altura de controle da marca). Vale também para `InputGroup` e `InputGroupInput`.

### Patch Changes

- 00a73be: **InputGroup: foco, erro e disabled como no Input, ordem do Tab e nomes (acessibilidade WCAG 2.2 AA, 22/10/2026)**

  - **Anel de foco igual ao do Input.** O grupo usava `ring-[3px] ring-ring/50` (entre 1,66:1 e 3,00:1 contra o fundo) e, no erro, `ring-destructive/20` (entre 1,16:1 e 1,37:1), abaixo do 3:1 (1.4.11). Agora é `ring-2 ring-ring` com a borda transparente; no erro, a borda fica `destructive` e o anel continua `ring` (entre 3,32:1 e 13,41:1).
  - **Disabled igual ao do Input.** O grupo usava `opacity-50`; agora fica em `bg-muted`, sem sombra e sem opacidade na caixa (os complementos continuam a 50%).
  - **Ordem do Tab segue a tela.** Na API por props, o complemento do início (e o `addonBlockStart`) passa a vir antes do campo no DOM. Antes, um botão no início recebia o foco depois do campo (2.4.3). Na API por children, a ordem continua a do JSX de quem usa.
  - **`aria-invalid` sai do `role="group"`**, onde não é suportado. Continua no campo, e o grupo mantém `data-invalid`.
  - **`InputGroupButton` passa o `size` ao Button**, e o aviso de dev para botão só de ícone sem nome acessível (`icon-xs`, `icon-sm`) passa a disparar.

## 0.1.1

### Patch Changes

- 583adaa: Button: o hover das variantes default, destructive e warning passa a usar 80% de opacidade da cor (era 90%), como a secondary.

## 0.1.0

### Minor Changes

- e33ea60: Primeira publicação no GitHub Packages. Tokens em CSS, preset do Tailwind, TypeScript, Android e iOS; componente Button.
