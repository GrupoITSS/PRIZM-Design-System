# @grupoitss/prizm-ui

## 0.3.0

### Minor Changes

- 30ab520: **Accordion: decisões de 05/11/2026**

  - **Hover e pressed**: fundo `bg-accent`, com texto e chevron em `accent-foreground`, no lugar do sublinhado. Para o fundo ter respiro, o título ganha `px-2` e `rounded-md`, e o conteúdo, `px-2`, para os dois continuarem alinhados.
  - **Foco**: anel do Prizm, `ring-2 ring-ring` com `ring-offset-2 ring-offset-ring-offset`, só no foco por teclado. Antes, sem estilo, aparecia o contorno do navegador.
  - **Disabled**: o item inteiro fica a 50% (`data-[disabled]:opacity-50`) e o título sem clique (`pointer-events-none`), como o Button. Antes, `disabled` funcionava sem mudança visual.
  - **Título**: `text-sm` (antes herdava o tamanho da página), `text-left`, para o título longo não sair centralizado, e `gap-4` até o chevron, como no shadcn, para o título longo não encostar nele.
  - **Conteúdo**: `text-foreground` (era `text-muted-foreground`), como no Figma e no shadcn, e `pt-1`, para o anel de foco não cobrir a primeira linha.

- 53d796c: **AlertDialog: mídia, celular e tokens**

  - **Mídia**: nova prop `icon` e novo subcomponente `AlertDialogMedia` (como no shadcn): quadrado de 64px em `bg-muted`, `rounded-md`, ícone de 32px. Fica acima do título no celular e à esquerda do título e da descrição a partir de 640px. É decorativa (`aria-hidden`); o nome do diálogo continua sendo o título.
  - **Celular**: a caixa tem cantos `rounded-lg` em qualquer largura e 16px de margem até a borda da tela (`max-w-[calc(100%-2rem)]`). Antes, abaixo de 640px, ela encostava nas bordas e perdia o raio. Os botões empilhados ganham `gap-2` (antes, sem espaço entre eles).
  - **Tokens**: título e descrição usam `text-foreground` e `text-muted-foreground`. Saem as variáveis `--alert-dialog-title` e `--alert-dialog-desc`, sem uso no repositório. Contraste medido nas 5 marcas, claro e escuro: título 18,16:1 e descrição 7,17:1 no pior caso.
  - **Quebra:** quem sobrescrevia `--alert-dialog-title` ou `--alert-dialog-desc` passa a usar `className` em `AlertDialogTitle` e `AlertDialogDescription`.

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

- a1232a2: **Avatar: decisões de 04/11/2026**

  - **Tamanho padrão `md`** (32 px), como no shadcn e no Figma. Antes era `xl` (48 px).
  - **Sem borda**: sai `border border-border` da raiz.
  - **Iniciais por tamanho**: `text-xs` em `xs` e `sm`, `text-sm` de `md` para cima.
  - **Prop `status`** (`online`, `away`, `busy`, `offline`), opcional, nas duas APIs: sem ela, não há badge; com ela, o badge aparece com a cor do status (`bg-success`, `bg-warning`, `bg-destructive`, `bg-muted-foreground`) e o texto oculto em pt-BR (Online, Ausente, Ocupado, Offline). `AvatarBadge` também aceita `status` (padrão `online`).
  - **Badge no tamanho do avatar**: 6, 8, 10, 12 e 14 px. Antes, 10 px fixo.
  - **Contador no tamanho do grupo**: `AvatarGroupCount` acompanha o `size` dos avatares (padrão `md`). Antes, 48 px fixo.
  - **Nome acessível**: aviso no console em desenvolvimento quando há `src` sem `alt`. Com `alt`, as iniciais ficam `aria-hidden` e o leitor de tela lê o `alt`; com `alt=""`, o avatar é decorativo.
  - **Tipos**: `AvatarBadgeProps` e `AvatarGroupCountProps` passam a `HTMLSpanElement`, o elemento que já era desenhado.
  - **Migração:** `<Avatar>` sem `size` passa a ter 32 px. Para manter 48 px, passe `size="xl"`. Quem usava `<AvatarBadge className="bg-…" />` para trocar a cor pode passar `status`.

- 783ee9f: **Badge dentro do Button**

  - **Button** marca `data-variant` (como o shadcn), além de `data-slot="button"`.
  - **Badge** dentro de um Button cheio (`default`, `destructive`) inverte as cores: fundo na cor do texto do botão e texto na cor do botão. Antes, um Badge `default` (`bg-primary`) sumia sobre o botão primary. Contraste do número: 4,88 a 13,41:1 no default e 4,53 a 5,84:1 no destructive, nas 5 marcas. Em botões neutros (secondary, outline, ghost) o Badge mantém as próprias cores, como no "Fixadas 8" e no "Limpar filtros 3" da AFIPE.

- c9978dd: Badge: `shape="dot"` e `pulse` (DS-66). O dot é um ponto de 8px, sem conteúdo visível, com anel de 2px em `background` para aparecer sobre qualquer superfície. O texto de `children` vai só para o leitor de tela e é obrigatório. Existe em `default`, `destructive`, `success`, `warning` (em `warning-strong`) e `verified`. `pulse` liga um halo para o que está em andamento, que some com redução de movimento.
- 63d6d2b: Badge: `asChild` para o Badge link (DS-63). Com um `<a>` filho, o badge ganha hover (a mesma regra do Button de cada variante) e o anel de foco do Button. O badge comum continua estático. O Badge link não vai dentro de um Button: no trailing, use o badge estático.
- aa64d38: **Badge em formato pill**

  - **UI**: o Badge passa de `rounded-md` para `rounded-full` (`radius/full`) em todas as variantes e tamanhos, como o badge do shadcn. O espaço interno não muda (`px-2`, `py-0.5`). O `shape="number"` já era redondo e continua igual. Decisão de 03/11/2026.
  - **Quebra visual:** todos os usos do Badge mudam de forma, inclusive BadgeItem e as colunas de status da tabela. Para manter o canto de antes num caso específico, passe `className="rounded-md"`.

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

- bfd442a: **Collapsible: decisões de 06/11/2026, alinhadas ao Accordion**

  - **Gatilho**: o mesmo título do Accordion. `w-full`, `px-2 py-4`, `gap-4` até o ícone, `rounded-md`, `text-sm` à esquerda. Antes, `px-4 py-2` e largura do conteúdo.
  - **Hover e pressed**: fundo `bg-accent`, com texto e ícone em `accent-foreground`, com classes de `hover:` e `active:`. Antes, `bg-muted/50`.
  - **Foco**: fundo e offset em `ring-offset` (`focus-visible:bg-ring-offset`, `ring-offset-ring-offset`), como no Figma. Era `ring-offset-background`; o valor é o mesmo hoje.
  - **Ícone**: o `triggerIcon` gira 180° com o painel aberto e fica com `aria-hidden`. Quem passava a classe `group-data-[state=open]/collapsible:rotate-180` no ícone deve tirá-la, senão ele gira duas vezes.
  - **Composição com `asChild`**: o gatilho não soma mais as classes dele às do filho; o Button do Prizm fica com o estilo dele. Antes, `px-4 py-2` e o hover do gatilho iam parar no Button.
  - **Quebra**: sai a variante `ghost`, com `triggerVariant` no `Collapsible` e `variant` no `CollapsibleTrigger`. Para um gatilho sem hover, use a composição com o Button `ghost`. `collapsibleTriggerVariants` continua exportado, sem variantes (obsoleto); use `collapsibleTriggerStyles`.

- f4930cf: **Collapsible: novo `CollapsibleToggle`**

  Gatilho só com ícone para a composição: o Button ghost icon-sm do Prizm com ChevronRight, que gira 90° com o painel aberto. Para cabeçalhos com outras ações ao lado (caso do Catálogo do Pricing): só ele abre e fecha, e as outras ações continuam independentes. Nome padrão "Mostrar ou ocultar"; passe o nome do que abre em `aria-label`. Com `disabled` no `Collapsible`, o toggle também fica desabilitado.

- 0fdbd2c: **Combobox: foco, erro, disabled, size e nomes em pt-BR**

  - **Combobox** passa a mostrar o foco como o Input: anel de 2px em `ring`, borda transparente. Antes, o Default não tinha indicador (o InputGroup por children zerava o anel) e o Multiple usava `ring-3 ring-ring/50` (1,66:1 no PAS · CMS escuro).
  - **Combobox**: `disabled` deixa a caixa inteira a 50% e o `disabled` nativo no input. Antes só marcava `data-disabled`, e o campo continuava no Tab.
  - **Combobox**: `aria-invalid` e `aria-describedby` na API por props chegam ao input, com borda `destructive`. Antes essas props paravam no Root.
  - **Combobox** ganha `size` (`sm` | `md` | `lg`), o mesmo do Input. Padrão `md`.
  - **Combobox**: padrões em pt-BR (`Selecionar…`, `Nenhum item encontrado.`). O botão do chip passa a se chamar `Remover {valor}`.

  **Quebra:** quem dependia de `placeholder="Select..."` ou `emptyMessage="No items found."` como padrão precisa passar o texto; os botões de ícone e o pt-BR dos padrões são a correção de acessibilidade (3.1.2, 4.1.2).

- bc616a9: **Command: decisões de 03/11/2026**

  - **Textos padrão em pt-BR:** "Digite um comando ou busque…" e "Nenhum resultado encontrado.". Testes que procuram os textos em inglês precisam mudar.
  - **A busca tem nome:** prop `label`, padrão "Buscar comandos", lida pelo leitor de tela.
  - **CommandDialog com descrição** escondida em pt-BR, e o Radix para de avisar no console.
  - **Item de 32px** (antes 40px) e `rounded-sm`, como o Select. O título do grupo fica alinhado ao item (`px-2`).
  - **Ícone de busca em `muted-foreground`,** sem opacidade, e contêiner em `rounded-lg`.
  - **Correção: `CommandDialog` com `trigger` abria vazio.** O `trigger` ativava a API por props do Dialog, que ignorava o Command dos children. Agora o Dialog abre com a busca e a lista.

- a01defe: **DatePicker: erro, calendário nomeado e em pt-BR**

  - **DatePicker** ganha o estado de erro do Input: `aria-invalid`, `aria-describedby` e `aria-label` vão para o botão, com borda `destructive`. Antes, essas props não chegavam ao botão, e o erro não era anunciado.
  - **DatePicker**: o campo não muda no hover, como Input, Select e Textarea. Antes herdava o `hover:bg-accent` do Button outline.
  - **DatePicker**: com o calendário aberto, o botão usa o mesmo anel do foco (2px em `ring`, borda transparente).
  - **DatePicker**: o calendário aberto tem nome, pela prop nova `calendarLabel` (padrão "Escolher data"). Ao abrir, o foco vai para o dia escolhido (ou hoje), e não para o botão de mês anterior.
  - **Calendar**: rótulos em pt-BR por padrão (`locale` do `react-day-picker`), como "Ir para o mês anterior". A prop `locale` continua aceitando outro idioma.
  - **Calendar**: dias fora do mês sem opacidade de 50% (mediam 2,34:1), só com `text-muted-foreground`. O foco do dia e dos seletores de mês e ano usa o anel do sistema (2px em `ring`), no lugar de `ring/50` (mediam 1,53:1).
  - **Popover** ganha a prop opcional `contentProps` (`aria-label`, `aria-labelledby`, `onOpenAutoFocus`, `onCloseAutoFocus`), repassada ao conteúdo do Radix.

- 2829f9e: **DropdownMenu: decisões de 04/11/2026**

  - **Item destrutivo**: `variant="destructive"` no `DropdownMenuItem` e `variant: "destructive"` nos `items`. Texto e ícone em `text-destructive`, em repouso e no destaque sobre `bg-accent` (exceção do time: 3,24:1 no Docnix escuro e 2,24 a 4,43:1 sobre `accent`).
  - **Rótulo**: sai `text-muted-foreground`; herda o `text-popover-foreground` do menu, como os itens.
  - **Separador**: `bg-border` (era `bg-muted`). Regra F1: divisores usam `border`.
  - **Atalho**: `text-muted-foreground` (era `opacity-60`), `accent-foreground` no destaque.
  - **Ícone do item**: `text-muted-foreground`, `accent-foreground` no destaque. Ícone com classe `text-*` própria não muda. O chevron do submenu segue o texto.
  - **Desabilitado**: `pointer-events-none` (era `cursor-not-allowed`), em item, checkbox e radio, como o ContextMenu, o Menubar e o shadcn.
  - **Nome acessível (API por props)**: o nome do item é só o rótulo. O atalho fica com `aria-hidden` e a descrição é ligada por `aria-describedby`.
  - **Novos exports**: `dropdownMenuItemDescriptionStyles` e o tipo `DropdownMenuItemVariant`.

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

- 1e1ce68: InputGroup: estado somente leitura. Quando o campo de dentro tem `readOnly`, a caixa fica em `muted`, sem borda e sem sombra, e o texto em `muted-foreground`, como o Input. O campo continua focável. Não há prop nova: basta passar `readOnly`, pela API simples ou no `InputGroupInput`/`InputGroupTextarea`.
- 51e2147: **Input: estado somente leitura (DS-64, 05/11/2026)**

  - `readOnly` no Input passa a ter visual próprio: fundo `muted`, sem borda e sem sombra, texto `muted-foreground`. Serve para o valor que já foi preenchido e não se edita direto, como no Cockpit e no Assistente.
  - O campo continua focável, com o mesmo anel de 2px em `ring`, e o valor vai junto no formulário.
  - O estilo vale só com o atributo `readonly`: campos `disabled` e `type="file"` não mudam.
  - Telas que já usam `readOnly` no Input passam a ver o fundo cinza.

- bef7534: **InputOTP: escala, erro, foco e leitura da família do campo**

  - **InputOTP** passa a `sm`, `md` e `lg` em `control-height`, com o slot quadrado (`size-control-height-*`), como o Input. Antes eram alturas fixas de 32, 40 e 48px.
  - **Quebra:** `size="default"` sai. Para migrar: `size="default"` → `size="md"` (ou sem `size`, que já é `md`). O `lg` passa de 48px à altura de controle da marca.
  - **InputOTP**: o contêiner usa `bg-input-background` e `shadow-xs`, como o Input (antes `bg-background`, sem sombra).
  - **InputOTP** aceita `aria-invalid` e `aria-labelledby`. O erro mostra só a borda `destructive`; o anel `ring-destructive/20` saiu, e no foco o anel continua `ring`. `invalid` continua como apelido de `aria-invalid`.
  - **InputOTP**: `separator={true}` desenha o traço (`Minus`) em `muted-foreground`, como o Figma e o shadcn. Antes era um ponto (`Dot`).
  - **InputOTP**: o caractere de `placeholder` sai em `muted-foreground`, para não parecer preenchido.
  - **InputOTP**: slots e separadores ficam com `aria-hidden`; o valor, o nome e o estado continuam no input. Antes o leitor de tela repetia o valor, caractere a caractere, e anunciava "separador".
  - **InputOTP**: em desenvolvimento, avisa no console quando o campo não tem nome (sem `FieldLabel` ligado pelo `id`, `aria-label` nem `aria-labelledby`).

- 94350ea: Item: decisões de 06/11/2026.

  - **Quebra:** saem as variantes `badges` e `file`. Para badges, use `variant="outline"` com a prop `badges`. O FileItem segue com o mesmo visual (borda e fundo `card`).
  - **Quebra:** sem `actions`, nenhum botão aparece. O "Manage" padrão da variante `badges` saiu.
  - Com `interactive` e sem `href`, o Item vira `<button type="button">`: o teclado e o leitor de tela chegam nele (antes era um `div` sem foco).
  - Foco com o anel do Button (`ring` de 3px e `ring-offset` de 2px). O `ring/50` passava 3:1 em 1 de 12 temas.
  - Aviso no console quando há um controle em `actions` num Item clicável.
  - Remover badge: rótulo "Remover …" e área de toque de 24px.
  - No `xs`, título e descrição passam a `text-xs`, como no Figma (antes ficavam em `text-sm`).

- 51cb71b: **Kbd: contexto no botão e separador**

  - **Kbd** dentro de um Button segue a regra do Badge (Figma "Contexto"): em botão cheio (`default`, `destructive`) usa a cor do texto do botão com fundo dela a 20%; em botão neutro (secondary, outline, ghost, link, text) mantém `bg-muted` e `text-muted-foreground`. Antes, ele pegava a cor do texto de qualquer botão. No tooltip nada muda.
  - **Kbd** ganha a prop `separator`, para teclas pressionadas juntas: `<Kbd keys={["Ctrl", "Alt", "B"]} separator="+" />`, como o KbdGroup "+ Separated" do Figma. O separador sai em `text-xs`, peso normal, na cor do texto da tecla.
  - Em aberto (decisão de 23/10/2026): em botão cheio, o texto da tecla fica abaixo de 4,5:1 (3,33 a 7,31:1 no primary, 3,47 a 4,23:1 no destructive), como já era antes.

- 339726b: **Pagination com o Button do Prizm, textos em pt-BR e acessibilidade**

  - **Button**: os itens passam a usar o `buttonVariants` do Button: `ghost` nas páginas e nas setas, `outline` na página atual. Foco, hover, pressed e disabled seguem a família. O anel de foco passa de `ring-2` para o anel de 3px do Button, com o espaço de 2px. O fundo do outline passa a `bg-input-background`.
  - **Página atual**: deixa de ser `disabled`. Antes, ficava a 50% de opacidade e saía do Tab. Agora é marcada só por `aria-current="page"`, e clicar nela não chama `onPageChange`. O contorno do outline (`color/input`, de 1,16 a 1,47:1) é mantido como exceção, pelo mesmo acordo da borda dos campos.
  - **Setas nas pontas**: Anterior e Primeira, na primeira página, e Próxima e Última, na última, usam `aria-disabled` em vez de `disabled`. O foco não se perde quando a última página é alcançada.
  - **Reticências**: "Mais páginas" passa a chegar ao leitor de tela. O `aria-hidden` sai do contêiner e fica só no ícone. O tamanho segue `control-height`; antes eram `h-9` e `h-8` fixos.
  - **Textos padrão em pt-BR**: "Anterior", "Próxima", "Primeira", "Última", "Ir para a página anterior", "Ir para a próxima página", "Ir para a primeira página", "Ir para a última página" e "Paginação".
  - **Tamanhos**: `icon` e `icon-sm` deixam os números quadrados e as setas só com ícone, como no Figma. O `icon-sm` saía no tamanho md e foi corrigido.
  - **First e Last**: ganham os ícones `ChevronsLeft` e `ChevronsRight`, novos em `@grupoitss/prizm-ui/icons`, e `aria-label`. Não ficam mais com o estilo de página atual.
  - **Nova prop `showIcons`** (padrão `true`): com `false`, as setas e First/Last ficam só com o texto.
  - **Quebra:** sai o export `paginationLinkVariants`; use `buttonVariants` do Button. Os textos padrão mudam de inglês para pt-BR; quem dependia do inglês passa os rótulos por prop.

- c1688a7: **RadioGroup: decisões de 03/11/2026**

  - **`RadioGroupItem` novo,** para composição com `Field`, `FieldLabel` e `FieldDescription` (cartão, descrição e erro). Sem `items`, o grupo renderiza os `children`. A API por `items` continua igual.
  - **Borda sem marcar em `input-strong`,** de 3,73 a 4,83:1 contra a página. Com `input`, ficava entre 1,16 e 1,47:1.
  - **Marcado:** borda e ponto em `primary`, fundo de campo (`input-background`). Antes, o fundo era `primary` a 10%.
  - **Erro:** `aria-invalid` no grupo ou no item pinta a borda de `destructive`, também marcado.
  - **Ponto de 8px** (antes 10px), alvo de ponteiro de 24px e anel com `ring-offset-ring-offset`, como o Checkbox.
  - **Descrição em `text-sm`** (antes `text-xs`), a 6px do rótulo (antes 4px).
  - **Aviso no console** em desenvolvimento quando o grupo não tem `aria-label` nem `aria-labelledby`.

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

- e13b9a5: **Switch: decisões de 03/11/2026**

  - **`onCheckedChange` novo,** como no Radix e no Checkbox. O `onChange` continua funcionando, marcado como obsoleto.
  - **Erro:** `aria-invalid` pinta a borda de 2px de `destructive`, também ligado. Antes, nada mudava.
  - **Alça sem sombra** (antes `shadow-lg`), como o shadcn e a família.
  - **Anel com `ring-offset-ring-offset`** e alvo de ponteiro de 24px no `sm`.
  - **Aviso no console** em desenvolvimento quando o Switch não tem nome (`FieldLabel` ligado pelo `id` ou `aria-label`).
  - O trilho desligado continua em `input`, por decisão do time: 1,16 a 1,47:1 contra a página, exceção registrada no Critério de acessibilidade.

- a6f21b7: **Textarea: erro visível e Dialog de edição com nome**

  - **Textarea** ganha o estado de erro do Input e do Select: `aria-invalid` pinta a borda de `destructive`, também no foco (o anel continua `ring`). Antes, `aria-invalid` era repassado, mas a borda não mudava, embora a story `Invalid` dissesse que mudava.
  - **Textarea com `expandable`**: o Dialog de edição ganha título visível, da prop nova `expandTitle` (padrão "Editar texto"), e passa a ter nome para o leitor de tela. O textarea dentro do Dialog não repete mais o `id` do campo e é nomeado pelo título. Antes, o Dialog abria sem nome e havia dois elementos com o mesmo `id`.
  - **Textarea com `expandable`**: o botão passa a se chamar "Expandir campo" (antes "Expandir textarea") e usa o anel de foco padrão, sem `ring-offset-2`.

- b49c4e7: **Tooltip: decisões de 06/11/2026**

  - **Balão**: `bg-tooltip` com texto em `text-tooltip-foreground` (escuro nos dois modos, igual em todas as marcas). Antes, `bg-popover` claro, como o Popover.
  - **Texto**: `text-xs`, peso normal, com quebra equilibrada. Antes, `text-sm`.
  - **Seta**: nova, na cor do balão (`tooltipArrowStyles`).
  - **Sombra e borda**: saem `shadow-md` e `border-sidebar-border`, que não tinha efeito.
  - **Largura máxima**: `max-w-sm`.
  - **Atalho**: o conteúdo ganha `data-slot="tooltip-content"`; o Kbd dentro do balão fica claro sobre o fundo escuro, como já previa o Kbd.
  - **Novo `TooltipProvider`**: em volta de uma região, os Tooltips de dentro usam ele e o atraso curto entre vizinhos (`skipDelayDuration`) funciona. Sem ele, cada Tooltip cria o próprio provider, como antes. Dentro do provider, `delayDuration` no Tooltip vale só para ele.

### Patch Changes

- 498c671: **Accent do escuro em neutral 700**

  - **Tokens**: `palette/accent/dark` passa de `neutral.800` para `neutral.700` nas marcas PAS, Docnix e ITSS (e nos produtos que herdam delas). Antes, accent e popover eram o mesmo cinza no escuro (1,00:1), e o item em destaque de Select, DropdownMenu, Command e afins não aparecia na lista (WCAG 2.4.7). Agora fica em 1,42–1,46:1 sobre o popover e 1,89–1,95:1 sobre o background. O claro não muda.
  - **UI**: `muted-foreground` sobre o novo accent fica em 4,06–4,13:1, abaixo de 4,5:1. No item em destaque de ContextMenu, DropdownMenu, Menubar, NavigationMenu e Command, o texto com `text-muted-foreground` (descrição, atalho) passa a `accent-foreground` (9,86–10,03:1).

- 1764435: **AlertDialog: combinações inválidas da API por props**

  - **`onCancel` no Esc**: antes, só o clique em Cancelar chamava `onCancel`; o Esc fechava o diálogo sem chamá-lo. Agora os dois chamam.
  - **`trigger` exige `title`**: com `trigger`, o TypeScript passa a exigir `title`. Sem ele, o diálogo abria sem nome acessível (WCAG 4.1.2).
  - **Aviso no console**: com `trigger` ou `title`, a API por props monta o diálogo e `children` não é desenhado. Agora há um aviso em desenvolvimento.
  - **Quebra:** `<AlertDialog trigger={…} />` sem `title` deixa de compilar. Passe `title`.

- 383b7f7: **AlertDialog: mídia a 8px do título no celular**

  - No celular, a mídia ficava a 16px do título (`mb-2` na mídia mais o `gap-2` do cabeçalho), contra 8px (`spacing/2`) no Figma. Sai o `mb-2`: fica só o `gap-2`, como no Figma. A partir de 640px, nada muda (mídia ao lado do texto, `gap-x-6`).

- f70f092: **AlertDialog: fundo atrás do modal em `color/alpha-80`, como o Dialog**

  - O fundo atrás do AlertDialog passa de `bg-black/80` (valor fixo) para `bg-alpha-80`, o mesmo token do Dialog, mantendo o desfoque. No claro, o fundo fica branco a 80%; no escuro, quase preto a 80% (`rgba(10, 10, 10, 0.8)`). Antes, no claro, o Dialog clareava a página e o AlertDialog escurecia.

- 7e3ee4c: **Alert e Empty: props sem título e children junto das props (decisões de 30/10/2026)**

  - **`description`, `icon` (e `content`, no Empty) aparecem sem `title`.** O Figma deixa desligar o título (booleana Title / Show Title), mas o código só montava pelas props com `title`: sem ele, `<Alert variant="warning" description="…" />` não mostrava nada, sem aviso. Agora qualquer uma dessas props usa a API por props, sem título vazio.
  - **`children` junto das props entram no fim.** Antes eram descartados sem aviso quando havia `title`: no Alert, um `Button` de ação depois da descrição sumia. Agora aparecem depois da descrição (Alert) ou das ações (Empty). Sem nenhuma prop, continua a composição só com `children`.

- 19e3fbf: **Asterisco de obrigatório igual em todos os rótulos**

  - **Select:** com `label` e `required`, o asterisco passa a vir do `required` do `FieldLabel`. Antes era feito à mão.
  - **FieldLabel:** o asterisco fica a `spacing/0-5` do texto, como no Figma. Antes, o `gap-2` do `FieldLabel` o deixava a cerca de 10px.

- 6e12335: **Avatar: o badge não é mais cortado**

  - A raiz do Avatar tinha `overflow-hidden` com `rounded-full`, e o `AvatarBadge` fica dentro dela: o badge saía cortado em quarto de círculo. A raiz deixa de cortar; a imagem (`AvatarImage`) passa a `rounded-full`, como as iniciais já eram.
  - Quem punha outro conteúdo dentro do Avatar contando com o recorte da raiz precisa arredondar esse conteúdo.

- e9fccca: **Calendar: decisões de 03/11/2026**

  - **Correção: o dia focado voltou a mostrar o foco.** O `ring-0!` do dia apagava o anel, e o teclado andava pela grade sem sinal visível. Agora o dia usa o foco do Button: anel de 3px em `ring`, com offset de 2px em `ring-offset`, também no dia escolhido.
  - **Dias da semana e número da semana em `text-xs`** (antes `text-[0.8rem]`), como no Figma.
  - **Stories em pt-BR,** com a tag `documentado`. A story "Locale: pt-BR" virou "Outro idioma" (en-US), porque o padrão já é pt-BR. Nova story "Tamanho md (48px)".

- e7d1f0a: **Combobox: a caixa do Multiple segue o Default e a família do campo**

  - **Combobox** com `multiple`: a caixa dos chips passa a usar `bg-input-background`, `rounded-md` e `shadow-xs`, como o Default (InputGroup) e o Input. Antes era transparente, com `rounded-lg` e sem sombra.
  - **Combobox** com `multiple`: o texto acompanha o `size` (`text-xs` no `sm`, `text-sm` no `md`, `text-base` e `text-sm` a partir do breakpoint md no `lg`). Antes ficava em `text-sm` em todos os tamanhos.

- e426abd: Combobox: na API por props, a seleção única passa a respeitar `value` e `onValueChange`. Antes, as duas props eram ignoradas sem aviso e o valor não ficava controlado; só o `multiple` e a composição por `children` funcionavam.
- 133f4a5: **DatePicker abre no mês da data escolhida**

  - Antes, o calendário abria sempre no mês de hoje: com uma data de outro mês, o dia escolhido ficava fora da tela e o foco ia para hoje (WCAG 2.4.3, pendência 2 da documentação de 27/10). Agora o calendário abre no mês do `value` (no intervalo, no mês de `value.from`). Quem passa `calendarProps.defaultMonth` continua no controle.

- 5ff4502: DropdownMenu: o SubTrigger fica com o fundo `accent` enquanto o submenu está aberto, como no Figma (Active=Yes). Antes, ele perdia o destaque quando o foco entrava no submenu. Novo export `dropdownMenuSubTriggerStyles`.
- e058ad3: **Label: decisões de 30/10/2026**

  - **`className` agora vence as classes base.** A ordem do `cn` estava invertida. Efeito nos componentes que usam o Label: o `FieldLabel` passa a `leading-snug` e fica mais alto em uma linha; o Dropzone desabilitado passa a `text-muted-foreground`.
  - **Asterisco em `destructive`,** o mesmo vermelho do erro. Tem 4,22:1 no Docnix escuro e 4,43:1 no Digitrol claro, abaixo de 4,5:1: exceção registrada pelo time em 03/11.
  - **Disabled com opacidade 70,** sem mudar o peso.

- 76119c7: **Pagination: avisos de combinação inválida**

  - Em desenvolvimento, o Pagination avisa no console em dois casos: `iconsOnly` com `showPrevNext={false}`, que não mostra nada, e a falta de `onPageChange` e de `getHref`, em que os botões não fazem nada. Decisão de 03/11/2026.

- bd916a2: **Popover: aviso de painel sem nome (04/11/2026)**

  - O conteúdo do Popover é `role="dialog"`. Sem `aria-label` ou `aria-labelledby` em `contentProps`, o Popover avisa no console ao abrir, só em desenvolvimento.
  - O `onOpenAutoFocus` de `contentProps` continua sendo chamado.
  - Os Popover da Table (menu de ações e células) ganharam nome: "Ações" e "Detalhes", ou o título do popover.

- 19e3fbf: **Rótulos em `font-medium` (decisão de 03/11/2026)**

  O peso `font-light` veio da migração do `@pas/ui` e não foi decisão do time. Os rótulos passam a medium, como no Figma (`font-weight/medium`) e no shadcn.

  - Mudam `Label`, `FieldTitle`, `FieldLegend`, o rótulo do Checkbox e o do RadioGroup.
  - Mudança visível: todos os rótulos de formulário ficam mais pesados.
  - O produto precisa carregar o peso 500 da fonte da marca. Sem ele, o navegador simula o negrito.
  - O `FieldTitle` desabilitado não fica mais pesado que o normal: a classe `font-medium` do disabled saiu, porque o peso já é medium.

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

- f8386dd: **Novo token `color/overlay` para o fundo atrás de modal, sheet e drawer**

  - **Tokens**: `color/overlay` (classe `bg-overlay`), `black-alpha/80` (quase preto a 80%) no claro e no escuro. O `color/alpha-*` não muda.
  - **UI**: Dialog e AlertDialog saem de `bg-alpha-80` (que no claro virava branco a 80% e clareava a tela) e Sheet e Drawer saem de `bg-black/80` (valor fixo) para `bg-overlay`. Os quatro passam a escurecer a tela atrás nos dois modos, com o mesmo token. Este changeset substitui o `alert-dialog-overlay` quanto ao claro. O desfoque do Dialog e do AlertDialog continua.
  - **Cor**: o preto do token é `#0a0a0a` (o do `black-alpha`), não `#000`, o que no overlay não se distingue a olho.

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
