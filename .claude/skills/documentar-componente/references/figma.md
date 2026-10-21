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

5. Com o ok, rode `scripts/rebind-core.js` primeiro com `__DRY__ = true`, mostre `unmapped` e `manual`, depois com `false`. Inclua as dependências (ícones, Spinner, Kbd…) nos `__ROOTS__`.
6. Confira 2 ou 3 variantes em temas diferentes pelo `get_screenshot` (ver Armadilhas no SKILL.md).

Defeitos de kit que apareceram no Button e valem conferir em todo componente: tamanhos de ícone com min/max fixos e proporção travada (não seguem `control-height`), estado hover sem mudança visual, altura fixa em px em vez do token.

## Etapa 3 — Frame de documentação

Crie o frame "<Componente> — Documentação Prizm" na página do componente, ao lado do component set. Copie a estrutura visual do template `25019:4489` (leia com `get_metadata` e `get_screenshot`); tudo no frame ligado ao Core, nenhum hex solto. Construa seção por seção e mostre o screenshot de cada uma; o dono do DS valida no fim da etapa.

| # | Seção | Como montar |
| --- | --- | --- |
| 01 | Cabeçalho | Nome, uma frase do que faz, versão, base (shadcn/ui), links Figma/código/CMS. |
| 02 | Playground por tema | Grade 5 marcas (PAS, PAS · CMS, Docnix, ITSS · AFIPE, ITSS · Digitrol) × claro/escuro. Cada célula é um frame com **modo explícito** nas coleções Theme e Mode do Core (`setExplicitVariableModeForCollection`), fundo `color/background`. Não troque cor à mão: só o modo. |
| 03 | Variantes | Uma instância de cada variante, tamanho padrão, rótulo com o nome do código. |
| 04 | Quando usar | Hierarquia (quando o componente tem ênfases) e cards Faça / Evite, com instâncias reais. |
| 05 | API | Gerada de `componentPropertyDefinitions` do set: propriedade Figma, tipo, valores, padrão. Confira com as props do `.tsx` e marque o que só existe de um lado (paridade). |
| 06 | Anatomia | Instância com marcadores numerados nas partes (ícone, rótulo, atalho…). |
| 07 | Tamanhos | Gerado das ligações: altura (`control-height/*`), padding, gap, ícone, texto. Tabela de `control-height` por marca (Digitrol é um degrau abaixo). |
| 08 | Tokens por variante | Gerado: para cada variante, a variável ligada a fundo, texto, borda, sombra, e o hover. |
| 09 | Estados | Default, hover, foco, pressed, disabled, loading (os que existirem) e a regra de hover que se aplica. |
| 10 | Acessibilidade | Resultado da etapa 4: tabela de contraste por marca·modo e os 4 blocos. |
| 11 | Changelog | Versão, data, mudança. Junte dependências aqui, se houver. |

Quando houver decisões em aberto, crie uma seção "Propostas para decidir" logo após o cabeçalho, borda `color/primary`, e mostre as alternativas lado a lado. Quando o dono do DS decidir, ela vira "Decisões de <data>".

Regra de hover por tipo de fundo (decidida em 20/10/2026), aplicar no Figma e no código:

| Fundo | Hover | Figma |
| --- | --- | --- |
| Tom saturado (primary, destructive) | A cor a 80% | Fill único com opacidade 0.8, gravado como paint literal |
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
