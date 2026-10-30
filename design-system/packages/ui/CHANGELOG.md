# @grupoitss/prizm-ui

## 0.3.0

### Minor Changes

- 3639d33: **Alert e Empty: decisões de 29/10/2026**

  - **Alert: tons no padrão de aviso.** `destructive`, `warning` e `success` passam de texto colorido sobre `bg-card` para fundo `<tom>-weak`, borda e ícone no tom e título e descrição em `<tom>-strong`. O texto warning tinha 2,15:1 nas 5 marcas no claro, e o destructive 3,84:1 no Docnix escuro; agora o pior caso é 5,69:1 (warning no Digitrol claro).
  - **Alert: nova variante `info`**, no mesmo padrão (`info-weak`, `info`, `info-strong`). Cobre o `kind="info"` do AlertMessage.
  - **Alert: `default` neutro.** Fundo `card`, borda `border`, ícone e título `foreground`, descrição `muted-foreground`.
  - **Alert: espaçamento 12/16** (`py-3 px-4`, antes `p-4`), como no Figma e no shadcn atual. O título ganha `text-sm` e `leading-5`, e o ícone fica alinhado à primeira linha.
  - **Alert: papel pela variante (WCAG 4.1.3).** `destructive` e `warning` usam `role="alert"`, que interrompe o leitor de tela; `default`, `success` e `info` usam `role="status"`. A prop `role` sobrescreve.
  - **Alert: `AlertTitle` vira `div`** (antes `h5`), para não entrar na estrutura de títulos da página (WCAG 1.3.1).
  - **AlertMessage marcado como `@deprecated`.** Use o Alert: `info` → `info`, `warning` → `warning`, `error` → `destructive`, `success` → `success`.
  - **Empty: `role="status"` por padrão (WCAG 4.1.3).** Uma busca sem resultado ou uma tabela vazia passam a ser anunciadas sem interromper a leitura. A prop `role` sobrescreve.
  - **Empty: link da descrição no padrão do Link do Button.** Sempre sublinhado, e no hover o sublinhado passa a 2px. Sai o hover em `text-primary`, que tinha 3,53:1 a 4,06:1 no escuro.

  **Quebra:** quem buscava o Alert por `getByRole("alert")` nas variantes `default`, `success` ou `info` passa a usar `getByRole("status")`, ou passa `role="alert"`. Quem estilizava `h5` dentro do Alert usa `[data-slot=alert-title]`.

- 783ee9f: **Badge dentro do Button**

  - **Button** marca `data-variant` (como o shadcn), além de `data-slot="button"`.
  - **Badge** dentro de um Button cheio (`default`, `destructive`) inverte as cores: fundo na cor do texto do botão e texto na cor do botão. Antes, um Badge `default` (`bg-primary`) sumia sobre o botão primary. Contraste do número: 4,88 a 13,41:1 no default e 4,53 a 5,84:1 no destructive, nas 5 marcas. Em botões neutros (secondary, outline, ghost) o Badge mantém as próprias cores, como no "Fixadas 8" e no "Limpar filtros 3" da AFIPE.

- 725f02c: **Campos: disabled com opacidade 50%**

  - **Input**, **Select**, **Textarea**, **DatePicker** e **InputGroup** passam a mostrar o disabled com a aparência normal do campo e opacidade 50% (`disabled:opacity-50`), como o Button. Antes, o disabled tinha fundo `bg-muted`, borda transparente e sem sombra (decisão de 21/10/2026, revista em 26/10/2026): o campo desabilitado parecia um botão secondary.
  - **InputGroup**: a caixa inteira fica a 50%. O campo de dentro (`InputGroupInput`, `InputGroupTextarea`) e os complementos não somam outra opacidade; antes, os complementos ficavam a 50% dentro de uma caixa em `bg-muted`.
  - O cursor continua `not-allowed`, e o atributo `disabled` continua no elemento.

- 63e189f: **Checkbox: decisões de 30/10/2026**

  - **Tokens: novo `color/input-strong`** (`neutral.500` no claro, branco a 40% no escuro), para controles que só têm o contorno para identificar. Tem de 3,73 a 4,83:1 contra a página (WCAG 1.4.11). `color/input` não muda.
  - **Borda sem marcar em `input-strong`.** Com `color/input`, a caixa ficava entre 1,16 e 1,55:1.
  - **Erro visível.** `aria-invalid` agora pinta a borda de `destructive`, também com a caixa marcada ou indeterminada. Antes, o erro não aparecia na caixa.
  - **Fundo em `input-background`,** como os campos. Muda o visual no modo escuro.
  - **Raio em `rounded-xs`** (antes 4px fixo): 2px no PAS e no ITSS, 1px no Docnix.
  - **Alvo de ponteiro de 24px** nos dois tamanhos, sem mudar o layout (WCAG 2.5.8).
  - **Anel com `ring-offset-ring-offset`,** como o Button.

- 0fdbd2c: **Combobox: foco, erro, disabled, size e nomes em pt-BR**

  - **Combobox** passa a mostrar o foco como o Input: anel de 2px em `ring`, borda transparente. Antes, o Default não tinha indicador (o InputGroup por children zerava o anel) e o Multiple usava `ring-3 ring-ring/50` (1,66:1 no PAS · CMS escuro).
  - **Combobox**: `disabled` deixa a caixa inteira a 50% e o `disabled` nativo no input. Antes só marcava `data-disabled`, e o campo continuava no Tab.
  - **Combobox**: `aria-invalid` e `aria-describedby` na API por props chegam ao input, com borda `destructive`. Antes essas props paravam no Root.
  - **Combobox** ganha `size` (`sm` | `md` | `lg`), o mesmo do Input. Padrão `md`.
  - **Combobox**: padrões em pt-BR (`Selecionar…`, `Nenhum item encontrado.`). O botão do chip passa a se chamar `Remover {valor}`.

  **Quebra:** quem dependia de `placeholder="Select..."` ou `emptyMessage="No items found."` como padrão precisa passar o texto; os botões de ícone e o pt-BR dos padrões são a correção de acessibilidade (3.1.2, 4.1.2).

- a01defe: **DatePicker: erro, calendário nomeado e em pt-BR**

  - **DatePicker** ganha o estado de erro do Input: `aria-invalid`, `aria-describedby` e `aria-label` vão para o botão, com borda `destructive`. Antes, essas props não chegavam ao botão, e o erro não era anunciado.
  - **DatePicker**: o campo não muda no hover, como Input, Select e Textarea. Antes herdava o `hover:bg-accent` do Button outline.
  - **DatePicker**: com o calendário aberto, o botão usa o mesmo anel do foco (2px em `ring`, borda transparente).
  - **DatePicker**: o calendário aberto tem nome, pela prop nova `calendarLabel` (padrão "Escolher data"). Ao abrir, o foco vai para o dia escolhido (ou hoje), e não para o botão de mês anterior.
  - **Calendar**: rótulos em pt-BR por padrão (`locale` do `react-day-picker`), como "Ir para o mês anterior". A prop `locale` continua aceitando outro idioma.
  - **Calendar**: dias fora do mês sem opacidade de 50% (mediam 2,34:1), só com `text-muted-foreground`. O foco do dia e dos seletores de mês e ano usa o anel do sistema (2px em `ring`), no lugar de `ring/50` (mediam 1,53:1).
  - **Popover** ganha a prop opcional `contentProps` (`aria-label`, `aria-labelledby`, `onOpenAutoFocus`, `onCloseAutoFocus`), repassada ao conteúdo do Radix.

- 3234d43: **Icons: sem nomes antigos do Lucide, importação única e ícones próprios acessíveis (22/10/2026)**

  - **Saem os nomes antigos do Lucide** que duplicavam um ícone da lista: `AlertCircle`, `AlertTriangle`, `CheckCircle`, `HelpCircle`, `XCircle`, `MoreHorizontal`, `Loader2` e `Layout`. Fica o nome atual de cada um.
  - **Entram 13 ícones**, que os componentes e as stories já usavam importando `lucide-react` direto: `CircleAlert`, `CircleCheckBig`, `PanelsTopLeft`, `Calendar`, `GripVertical`, `FileImage`, `FileSpreadsheet`, `ArrowUp`, `Maximize2`, `Minimize2`, `Tag`, `Inbox` e `ShieldAlert`. A lista passa a 138 ícones.
  - **Importação única.** Os componentes do prizm-ui importam de `../icons` e as stories de `@grupoitss/prizm-ui/icons`; nenhum arquivo importa `lucide-react` direto (o teste `icons.test.tsx` confere). O Spinner usa `LoaderCircle` como ícone padrão (o mesmo desenho do `Loader2Icon`).
  - **`FileCsv`, `FileDoc` e `FilePdf` saem com `aria-hidden="true"`** quando são decorativos, como os do Lucide (WCAG 1.1.1), e aceitam `size` e `color`. Antes, eram lidos pelo leitor de tela como uma imagem sem nome, e `size` ia parar como atributo inválido no `<svg>`.
  - **Na raiz do pacote**, `Calendar` continua sendo o componente e `Tag` o tipo da tabela. Os ícones com esses nomes saem por `@grupoitss/prizm-ui/icons`.

  **Quebra:** troque o nome antigo pelo atual, no import e no uso.

  | Antes            | Depois               |
  | ---------------- | -------------------- |
  | `AlertCircle`    | `CircleAlert`        |
  | `AlertTriangle`  | `TriangleAlert`      |
  | `CheckCircle`    | `CircleCheckBig`     |
  | `HelpCircle`     | `CircleQuestionMark` |
  | `XCircle`        | `CircleX`            |
  | `MoreHorizontal` | `Ellipsis`           |
  | `Loader2`        | `LoaderCircle`       |
  | `Layout`         | `PanelsTopLeft`      |

  O desenho de cada ícone não muda. Quem importa de `lucide-react` direto não é afetado, mas deve passar a importar de `@grupoitss/prizm-ui/icons`.

- bef7534: **InputOTP: escala, erro, foco e leitura da família do campo**

  - **InputOTP** passa a `sm`, `md` e `lg` em `control-height`, com o slot quadrado (`size-control-height-*`), como o Input. Antes eram alturas fixas de 32, 40 e 48px.
  - **Quebra:** `size="default"` sai. Para migrar: `size="default"` → `size="md"` (ou sem `size`, que já é `md`). O `lg` passa de 48px à altura de controle da marca.
  - **InputOTP**: o contêiner usa `bg-input-background` e `shadow-xs`, como o Input (antes `bg-background`, sem sombra).
  - **InputOTP** aceita `aria-invalid` e `aria-labelledby`. O erro mostra só a borda `destructive`; o anel `ring-destructive/20` saiu, e no foco o anel continua `ring`. `invalid` continua como apelido de `aria-invalid`.
  - **InputOTP**: `separator={true}` desenha o traço (`Minus`) em `muted-foreground`, como o Figma e o shadcn. Antes era um ponto (`Dot`).
  - **InputOTP**: o caractere de `placeholder` sai em `muted-foreground`, para não parecer preenchido.
  - **InputOTP**: slots e separadores ficam com `aria-hidden`; o valor, o nome e o estado continuam no input. Antes o leitor de tela repetia o valor, caractere a caractere, e anunciava "separador".
  - **InputOTP**: em desenvolvimento, avisa no console quando o campo não tem nome (sem `FieldLabel` ligado pelo `id`, `aria-label` nem `aria-labelledby`).

- 51cb71b: **Kbd: contexto no botão e separador**

  - **Kbd** dentro de um Button segue a regra do Badge (Figma "Contexto"): em botão cheio (`default`, `destructive`) usa a cor do texto do botão com fundo dela a 20%; em botão neutro (secondary, outline, ghost, link, text) mantém `bg-muted` e `text-muted-foreground`. Antes, ele pegava a cor do texto de qualquer botão. No tooltip nada muda.
  - **Kbd** ganha a prop `separator`, para teclas pressionadas juntas: `<Kbd keys={["Ctrl", "Alt", "B"]} separator="+" />`, como o KbdGroup "+ Separated" do Figma. O separador sai em `text-xs`, peso normal, na cor do texto da tecla.
  - Em aberto (decisão de 23/10/2026): em botão cheio, o texto da tecla fica abaixo de 4,5:1 (3,33 a 7,31:1 no primary, 3,47 a 4,23:1 no destructive), como já era antes.

- 4309bea: **Select: erro, lista aberta, ícone e lista alinhados ao Figma**

  - **Select** ganha o estado de erro do Input: `aria-invalid` (e `aria-describedby`) vão para o trigger, com borda `destructive`; no foco e com a lista aberta, o anel continua `ring`. Antes, `aria-invalid` passado ao Select ficava no Root do Radix e não chegava ao combobox, então o erro não era anunciado.
  - **Select**: com a lista aberta, o trigger usa o mesmo anel do foco (2px em `ring`, borda transparente). Antes era um anel de 3px em `ring/50`.
  - **Select**: o trigger usa `ChevronDown`, como o Figma e o shadcn. Antes era `ChevronsUpDown`, o ícone do Combobox.
  - **Select**: a lista usa `border-border`, como os outros popovers (antes `border-input`, o cinza do campo), e o item usa `rounded-sm` (antes `rounded-md`).

- 2ae4990: **Spinner: escala do Figma, speed, nome em português e movimento reduzido**

  - **Spinner** ganha a escala do Figma: `xs` 12px, `sm` 16px, `md` 20px, `lg` 24px e `xl` 32px. O **Dropzone** passa a usar `lg`, sem `className`.
  - **Spinner** ganha a prop `speed` (`slow`, `normal`, `fast`). `degree` continua aceita até a próxima versão, com o mesmo efeito.
  - **Spinner** aplica sempre a velocidade: `normal` passa a ser 600ms por volta, como estava documentado. Antes, o `normal` não era aplicado e o spinner girava em 1s, mais devagar que o `slow` (800ms).
  - **Spinner** tem nome padrão "Carregando", e não mais "Loading" (WCAG 3.1.2). Com `aria-hidden`, não recebe `role` nem nome.
  - **Spinner** gira a 1,5s por volta com `prefers-reduced-motion`, sem parar.

  **Quebra:** `size="lg"` passa de 32px para 24px. Para manter os 32px, use `size="xl"`.

- a6f21b7: **Textarea: erro visível e Dialog de edição com nome**

  - **Textarea** ganha o estado de erro do Input e do Select: `aria-invalid` pinta a borda de `destructive`, também no foco (o anel continua `ring`). Antes, `aria-invalid` era repassado, mas a borda não mudava, embora a story `Invalid` dissesse que mudava.
  - **Textarea com `expandable`**: o Dialog de edição ganha título visível, da prop nova `expandTitle` (padrão "Editar texto"), e passa a ter nome para o leitor de tela. O textarea dentro do Dialog não repete mais o `id` do campo e é nomeado pelo título. Antes, o Dialog abria sem nome e havia dois elementos com o mesmo `id`.
  - **Textarea com `expandable`**: o botão passa a se chamar "Expandir campo" (antes "Expandir textarea") e usa o anel de foco padrão, sem `ring-offset-2`.

### Patch Changes

- 498c671: **Accent do escuro em neutral 700**

  - **Tokens**: `palette/accent/dark` passa de `neutral.800` para `neutral.700` nas marcas PAS, Docnix e ITSS (e nos produtos que herdam delas). Antes, accent e popover eram o mesmo cinza no escuro (1,00:1), e o item em destaque de Select, DropdownMenu, Command e afins não aparecia na lista (WCAG 2.4.7). Agora fica em 1,42–1,46:1 sobre o popover e 1,89–1,95:1 sobre o background. O claro não muda.
  - **UI**: `muted-foreground` sobre o novo accent fica em 4,06–4,13:1, abaixo de 4,5:1. No item em destaque de ContextMenu, DropdownMenu, Menubar, NavigationMenu e Command, o texto com `text-muted-foreground` (descrição, atalho) passa a `accent-foreground` (9,86–10,03:1).

- 7e3ee4c: **Alert e Empty: props sem título e children junto das props (decisões de 30/10/2026)**

  - **`description`, `icon` (e `content`, no Empty) aparecem sem `title`.** O Figma deixa desligar o título (booleana Title / Show Title), mas o código só montava pelas props com `title`: sem ele, `<Alert variant="warning" description="…" />` não mostrava nada, sem aviso. Agora qualquer uma dessas props usa a API por props, sem título vazio.
  - **`children` junto das props entram no fim.** Antes eram descartados sem aviso quando havia `title`: no Alert, um `Button` de ação depois da descrição sumia. Agora aparecem depois da descrição (Alert) ou das ações (Empty). Sem nenhuma prop, continua a composição só com `children`.

- e7d1f0a: **Combobox: a caixa do Multiple segue o Default e a família do campo**

  - **Combobox** com `multiple`: a caixa dos chips passa a usar `bg-input-background`, `rounded-md` e `shadow-xs`, como o Default (InputGroup) e o Input. Antes era transparente, com `rounded-lg` e sem sombra.
  - **Combobox** com `multiple`: o texto acompanha o `size` (`text-xs` no `sm`, `text-sm` no `md`, `text-base` e `text-sm` a partir do breakpoint md no `lg`). Antes ficava em `text-sm` em todos os tamanhos.

- e426abd: Combobox: na API por props, a seleção única passa a respeitar `value` e `onValueChange`. Antes, as duas props eram ignoradas sem aviso e o valor não ficava controlado; só o `multiple` e a composição por `children` funcionavam.
- 1c30557: **Select: chevron e texto do item como no Figma**

  - **Select**: o chevron do trigger passa a `text-muted-foreground`, sem opacidade, com ou sem valor escolhido. Antes era 60% da cor do texto, e o tom mudava quando havia valor. Novo export: `selectTriggerIconStyles`.
  - **Select**: o item da lista herda `popover-foreground` da lista (antes `text-foreground`). No destaque, continua `accent-foreground`. Os valores são os mesmos hoje: nada muda na tela.

- 7caeef6: **Skeleton: `circle` sempre redondo e pulso que para (decisões de 27/10/2026)**

  - **`shape="circle"` ganha `aspect-square`.** Antes, `pill` e `circle` geravam a mesma classe (`rounded-full`), e o círculo só ficava redondo com altura e largura iguais. Agora basta um tamanho: `<Skeleton shape="circle" className="size-10" />`. Quem já passa `h-10 w-10` não vê diferença.
  - **O pulso roda 2 ciclos (4s) e para com o bloco cheio** (`[animation-iteration-count:2]!` sobre o `animate-pulse`). A WCAG 2.2.2 (nível A) pede um jeito de parar movimento que dura mais de 5s ao lado de outro conteúdo; o bloco cinza continua no lugar até o conteúdo chegar.
  - **Sem `motion-reduce`:** o pulso é igual com reduzir movimento, para deixar claro que está carregando (WCAG 2.3.3 é AAA, fora do critério).

- 989b350: **Button, PhotoUpload e Sonner usam o Spinner**

  - **Button**: o estado `loading` mostra o `<Spinner>`, decorativo (`aria-hidden`), no tamanho do ícone do botão (16px; 12px em `xs` e `icon-xs`). Antes era o ícone `LoaderCircle` com `animate-spin`, a 1s por volta; agora gira a 600ms e mais devagar com `prefers-reduced-motion`.
  - **PhotoUpload**: o `loading` mostra o `<Spinner>` com o nome "Carregando foto" (`role="status"`). Antes o ícone não tinha nome nem papel, e o leitor de tela não anunciava nada.
  - **Sonner**: o toast de carregamento usa o `<Spinner>` (`LoaderCircle`), decorativo, no lugar do ícone `Loader`. É o mesmo ícone dos outros componentes.

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
