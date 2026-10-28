# Figma: ligação ao Core, doc e link

Referência das etapas 2, 3 e 8. Antes de qualquer `use_figma`, carregue a skill `figma:figma-use`.

## Arquivos

| Arquivo | fileKey | Papel |
| --- | --- | --- |
| [PRIZM] Componentes | `7NPb3iuxjitMdpudp4yHTl` | Componentes (duplicado do kit shadcn). Uma página por componente. |
| [PRIZM] Design Tokens_Core | `fbf1czT8pszRGYspjl0VV4` | Biblioteca de variáveis: coleções Primitives, Theme (marcas) e Mode (claro/escuro). |

Template: frame `25019:4489` "Button — Documentação Prizm", na página "Button 🟠 TESTE" (`25003:8634`). Component set do Button: `25003:8948`.

## Etapa 2 — Ligado ao Core?

1. Ache o component set na página do componente (`get_metadata` na página).
2. Rode `scripts/inventario-ligacoes.js` (troque `__ROOT__`). Ele separa as variáveis em `core`, `local`, `outra biblioteca`, e lista estilos locais e cores soltas.
3. Tudo em `core` e nada em `estilosLocais`/`coresSoltas` (fora transparente): siga para a etapa 3.
4. Senão, monte o mapa local → Core e mostre a quem decide **antes** de gravar. Comece por este, que serviu no Button:

| Local (kit shadcn) | Core |
| --- | --- |
| `base/*` (foreground, background, muted, primary, secondary, accent, input, ring…) | `color/*` com o mesmo nome |
| `tailwind colors/base/transparent` | `color/transparent` |
| `custom/bg-background…` | `color/background` (com opacidade de camada, se havia alfa) |
| `custom/*` restantes | o papel equivalente: `color/input-background`, `color/accent`, `color/destructive` |
| `alpha/90`, `alpha/80` | `color/alpha-10`, `color/alpha-20` (no Core o número é a opacidade) |
| `border-radius/rounded-md`, `rounded-sm` | `radius/md`, `radius/sm` |
| `spacing/N` | `spacing/N` |
| `width/w-N`, `height/h-N` | `width/N`, `height/N` |
| `height/h-8`, `h-9`, `h-10` (altura de controle) | `control-height/sm`, `md`, `lg` |
| `border-width/border` | `border-width/1` |
| `stroke-width/stroke-[1-33]` | `stroke-width/1-33` |
| `opacity/opacity-50`, `-60` | `opacity/50`, `opacity/60` |
| `font/font-sans`, `font-weight/*`, `text/<t>/font-size`, `line-height` | `font/sans`, `font-weight/*`, `text/<t>/*` |
| estilo de texto local | desligar; a tipografia fica nas variáveis |
| sombra local | `style/shadow/xs` (estilo do Core) |

5. Com o ok, rode `scripts/rebind-core.js` primeiro com `__DRY__ = true`, mostre `unmapped` e `manual`, depois com `false`. Inclua nos `__ROOTS__` as dependências (ícones, Spinner, Kbd…) **e os componentes de apoio da página** (item de lista, busca, menus de exemplo, avatar dentro do set). No Combobox (27/10), só o set principal foi religado: o Menu Item, a busca, os quatro Command Menus e o avatar ficaram no kit, e o artigo afirmou o contrário.
6. Os nós em `manual` (overrides em instância aninhada, id `I…;…`): quando o valor do override é o mesmo do componente principal, que já está no Core, `resetOverrides()` na instância grava e passa a herdar (os 30 chevrons do Combobox). Trocar o paint do nó `I…` pode não gravar; liste esses para conferir à mão.
7. Recontar as variáveis locais em todas as raízes da página numa chamada nova. O que sobrar tem de vir de outro componente ainda não religado (no Combobox, o Checkbox e o título de grupo do Command): registre quais, no frame e no artigo.
8. Confira 2 ou 3 variantes em temas diferentes pelo `get_screenshot` (ver Armadilhas no SKILL.md).

Defeitos de kit que apareceram no Button e valem conferir em todo componente: tamanhos de ícone com min/max fixos e proporção travada (não seguem `control-height`), estado hover sem mudança visual, altura fixa em px em vez do token.

**Textos de exemplo em inglês (regra de 28/10/2026).** Dentro dos componentes do `[PRIZM] Componentes`, o texto de exemplo fica em inglês, como no kit e em Input, Select e Textarea: "Placeholder", "Group Label", "Search", "Backlog", "Add new". Não traduza ao religar nem ao documentar (no DatePicker e no Combobox a tradução teve de ser desfeita). O que o time lê (frame de doc, artigo, stories) e os padrões do código seguem em pt-BR; a tabela Figma × código do artigo registra os dois ("Placeholder" no Figma, padrão "Selecionar…" no código).

**Layout do set: grade padrão (28/10/2026).** Depois de criar, remover ou clonar variantes, confira o set pelo `get_screenshot`: no Combobox, as 42 variantes estavam empilhadas no mesmo ponto, e só se via uma. O set fica encaixado sobre a grade do kit:

- um frame `" "` com um filho `Instances` em auto-layout vertical: contorno `#9747ff`, 1px, tracejado `[10, 5]`, raio 5;
- linhas (`Row`) de células `Instance` com 84px de altura, divisórias tracejadas só à direita e embaixo (a última coluna e a última linha sem divisória);
- rótulos em Inter Medium 12, `#9747ff`: estados à esquerda, colunas em cima (`Type · Size`);
- o set sem fill e sem contorno, do tamanho de `Instances`, posicionado sobre ela, com cada variante centralizada na célula.

Propriedades booleanas que mudam o visual (Avatar, Group Label, Clear) não aparecem na grade das variantes, porque o valor padrão é falso: monte logo abaixo uma grade igual, com instâncias e essas propriedades ligadas, para que se vejam. A seção Components fica de cima para baixo: set principal, grade de propriedades, peças auxiliares (item de lista) e exemplos. Sem espaço vazio sobrando.

**Remover variante (Hover e Pressed do Combobox, 28/10/2026).** Antes de apagar, procure as instâncias com `variante.getInstancesAsync()` (frame de doc, grades, outras páginas) e troque ou apague cada uma; depois, atualize no frame de doc os textos que citam o estado (API, Estados, Tokens, Decisões, Changelog).

## Etapa 3 — Frame de documentação

Crie o frame "<Componente> — Documentação Prizm" na página do componente, ao lado do component set. Copie a estrutura visual do template `25019:4489` (leia com `get_metadata` e `get_screenshot`); tudo no frame ligado ao Core, nenhum hex solto. Construa seção por seção e mostre o screenshot de cada uma; o dono do DS valida no fim da etapa.

| # | Seção | Como montar |
| --- | --- | --- |
| 01 | Cabeçalho | Nome, uma frase do que faz, versão, base (shadcn/ui), links Figma/código/CMS. |
| 02 | Playground por tema | Grade 5 marcas (PAS, PAS · CMS, Docnix, ITSS · AFIPE, ITSS · Digitrol) × claro/escuro. Cada célula é um frame com **modo explícito** nas coleções Theme e Mode do Core (`setExplicitVariableModeForCollection`), fundo `color/background`. Não troque cor à mão: só o modo. Se a instância md não cabe na célula (InputOTP), use o tamanho sm e diga no subtítulo. |
| 03 | Variantes | Uma instância de cada variante do component set, com as decisões da etapa 1, tamanho padrão, rótulo com o nome do código. Com mais de um eixo, uma grade com as combinações. |
| 04 | Quando usar | Sempre no formato do Input (seção `25189:2021`, ver "Quando usar" abaixo). Copie a seção e troque o conteúdo; não monte outro layout. |
| 05 | API | Gerada de `componentPropertyDefinitions` do set: propriedade Figma, tipo, valores, padrão. Confira com as props do código e marque o que só existe de um lado (a tabela de paridade da etapa 1). |
| 06 | Anatomia | Instância com marcadores numerados nas partes (ícone, rótulo, atalho…). |
| 07 | Tamanhos | Gerado das ligações: altura (`control-height/*`), padding, gap, ícone, texto. Tabela de `control-height` por marca (Digitrol é um degrau abaixo). |
| 08 | Tokens por variante | Gerado: para cada variante, a variável ligada a fundo, texto, borda, sombra, e o hover. |
| 09 | Estados | Os estados do component set (hover, foco, pressed, disabled, loading, erro…), conferidos com o que o código trata, e a regra de hover que se aplica. |
| 10 | Acessibilidade | Resultado da etapa 4: tabela de contraste por marca·modo e os 4 blocos. |
| 11 | Changelog | Versão, data, mudança. Junte dependências aqui, se houver. |

### Quando usar

A seção tem um formato só, o da doc do Input (`25189:2021`, página Input, frame `25188:1959`), decidido em 23/10/2026. Até então cada doc saiu de um jeito (Button com hierarquia, Badge com listas em duas colunas, InputGroup com grade de cards), porque cada sessão copiava a doc anterior mais parecida. Copie a seção do Input para o frame novo (`clone()` e `insertChild` no lugar da seção) e troque só o conteúdo:

1. **Subtítulo:** uma frase do que o componente é e do que ele não é.
2. **Tabela "Preciso de… / Use":** 4 a 6 linhas, cada uma uma necessidade e o componente que a atende, este e os irmãos da família (etapa 1). É ela que tira a dúvida "uso este ou outro?".
3. **Pares Faça / Evite:** 2 ou 3 linhas, cada uma com um card Faça e um Evite sobre o mesmo tema, lado a lado. Cada card tem título "Faça · <tema>" ou "Evite · <tema>", uma ou duas frases do porquê e o bloco "Exemplo" com instância real do component set (nada desenhado por fora). Para uma linha a mais, clone a linha inteira.

Componente com ênfases (Button, Badge) ganha a hierarquia num bloco antes da tabela, com os níveis em ordem; o resto do formato não muda.

Quando houver decisões em aberto, crie uma seção "Propostas para decidir" logo após o cabeçalho, borda `color/primary`, e mostre as alternativas lado a lado. Quando o dono do DS decidir, ela vira "Decisões de <data>".

Regra de hover por tipo de fundo (decidida em 20/10/2026), aplicar no Figma e no código:

| Fundo | Hover | Figma |
| --- | --- | --- |
| Tom saturado (primary, destructive) | A cor a 80% | Variante sem fill + camada "Hover fill" (absolute, STRETCH, raio ligado, fill 100%, `node.opacity = 0.8`). Paint com opacidade 0.8 se perde no religamento (22/10) |
| Neutro ≈ fundo (secondary) | Sobreposição de `color/foreground` a 10% | Camada "Hover overlay" (absolute, STRETCH, raio ligado, fill 100%, `node.opacity = 0.1`) |
| Sem fundo (outline, ghost) | Fundo `color/accent` | Fill `color/accent` |
| Texto em tom (text) | Fundo `-weak` do tom | Fill `color/<tom>-weak` |
| Link | Sublinhado de 2px | Decoração de texto |

Regra de foco (decidida em 20/10/2026): o anel é sempre `color/ring`, em todas as variantes, inclusive as de tom (destructive, text). O foco é um sinal do sistema, não da variante; anel vermelho é a convenção de erro; e anel translúcido na cor da variante reprova o 3:1 da WCAG 1.4.11 em todas as marcas (destructive a 20% fica em 1,16–1,37:1). No Figma, o anel é um DROP_SHADOW de spread 5 em `color/ring` sobre outro de spread 2 em `color/ring-offset`. Confira se nenhuma variante Focus herdou um anel de outra cor do kit.

Outras regras que valem: texto na cor de um tom sobre o fundo da página ou sobre `-weak` usa `-strong`. Papéis de superfície (secondary, muted, accent, `-weak`) ficam um degrau acima do background da marca; no Digitrol claro o fundo é `neutral/100`, então eles vão para `neutral/200`.

Fontes Motiva Sans (Docnix) e Effra (AFIPE) podem não estar instaladas: o `loadFontAsync` falha nessas células. Registre e siga; não troque a fonte.

## Etapa 8 — Link no component set

Só com o ok de quem decide e depois do artigo existir no CMS. Link do artigo no formato usado no Button: `https://sgq.pas.app.br/cms/prizm_design_system/articles?articleId=<id do artigo>&version=v1` (o `id` uuid, não o código 0001).

```js
const set = await figma.getNodeByIdAsync('<id do set>');
// descriptionMarkdown, não description: a description grava o & da URL como &amp; e o link quebra
set.descriptionMarkdown = '<uma frase do que faz>.\n\nCódigo: @grupoitss/prizm-ui/<nome> — <props principais>.\n\nDoc: [artigo <Componente> no CMS](<link do artigo>)';
set.documentationLinks = [{ uri: '<link do artigo no CMS>' }]; // aceita um link só
```

Confira lendo `set.descriptionMarkdown` de volta: o link tem de sair com `&version=v1`, sem `&amp;`. No cabeçalho do frame de doc, troque o link "Artigo no CMS · em breve" pelo do artigo (`hyperlink` do texto).

Se o set apontava para o shadcn, o shadcn passa a ficar só na seção Rastreabilidade do artigo. Dev resources (links no Dev Mode) não se criam pelo plugin.

Ponha o mesmo link nos outros sets da página (o slot do InputOTP, o Menu Item do Combobox). Para fechar: acrescente 🟣 ao nome da página (é como se vê, na lista de páginas, o que já passou por este fluxo) e confira se o frame de exemplo do kit tem o selo "Legado do kit · não usar como referência" no topo; se não tiver, clone o selo de outra página já documentada (o do DatePicker, dentro do frame `17086:199333`).
