---
name: documentar-componente
description: Documenta um componente do design system Prizm (Grupo ITSS) de ponta a ponta, no processo do piloto do Button (19–20/10/2026) — lê código e Figma, levanta pelo repositório e pelo Storybook as variantes, tamanhos e estados que o time usa hoje (vindos do @pas/ui) e a paridade com o Figma, confere a ligação ao [PRIZM] Design Tokens_Core, monta o frame de documentação no Figma, aplica o checklist de acessibilidade WCAG 2.2 AA com contraste medido nos tokens, abre PR com as correções aprovadas, escreve o artigo no CMS (prizm_design_system) como rascunho e liga as pontas (mapa de tokens em arquivo com teste, links na story, seção Rastreabilidade no artigo, link no Figma). Use SEMPRE que o usuário pedir "documentar o componente X", "doc do X", "doc do X no CMS", "montar a página do X", "página de documentação do X no Figma", "artigo do X", "fazer o X como fizemos o Button", "levar o X pelo mesmo fluxo do Button", "auditar a acessibilidade do X", "mapa de tokens do X", "rastreabilidade do X", "inventário do X", "quais variantes e tamanhos o X tem", "paridade Figma × código do X" ou variação sobre documentar, religar ao Core ou publicar a doc de um componente do Prizm (Input, Badge, Select, Dialog…), mesmo citando só uma etapa.
---

# Documentar um componente do Prizm

Esta skill repete, para qualquer componente, o que foi feito com o Button em 19–20/10/2026: Figma religado ao Core, doc completa no Figma, acessibilidade medida, correções no código em PR, artigo no CMS e rastreabilidade entre as pontas. O resultado do piloto é o modelo de tudo: frame `25019:4489` no Figma e artigo "Button" no CMS.

## Papéis

- **Quem roda a skill** pode ser qualquer pessoa do time (designer ou dev). Você levanta, mede, propõe e executa o que foi aprovado.
- **O dono do DS** é o Leonardo (designer, dono do Prizm). As decisões de design são dele: o mapa local → Core, as propostas da seção "Propostas para decidir", as pendências de acessibilidade, qualquer mudança de token, a aprovação do artigo e o merge dos PRs.

Por isso a skill para em pontos de validação (marcados **⏸**). Em cada um, mostre o que achou de forma curta e espere a resposta. Não emende uma etapa na outra sem o ok. Se quem pediu não é o Leonardo, ele decide o que é operacional (seguir para a próxima etapa, nome de branch, ordem); para as decisões de design, monte um resumo curto que a pessoa possa levar ao Leonardo, e espere a decisão dele antes de gravar.

O que nunca acontece sem pedido explícito, nesta conversa: publicar no CMS (`publish_article`), mergear PR, publicar a biblioteca do Core, alterar outro componente além do pedido.

## Requisitos

Confira antes da etapa 1 e diga o que falta:

- **Figma:** conector do Figma com acesso de edição ao `[PRIZM] Componentes` e ao `[PRIZM] Design Tokens_Core`. Publicar o Core exige ser editor da biblioteca; o plugin não publica, a pessoa publica pela interface. Antes de qualquer `use_figma`, carregue a skill `figma:figma-use`.
- **CMS:** conector `prizm-cms` (MCP em `https://sgq.pas.app.br/cms/api/mcp`, headers `Authorization: Bearer mcp_…` e `X-Tenant-ID: sgq`), com o token da própria pessoa, cadastrado em escopo user (`claude mcp add --scope user`). O `subir-imagem.sh` lê a config dele.
- **GitHub:** `gh` logado, com acesso a `GrupoITSS/PRIZM-Design-System`.
- **Node 24** (vitest não roda no 22), `jq`, `python3` e a versão de pnpm do `packageManager` do `design-system/package.json`.

## Caminhos

A skill mora no próprio repositório, em `.claude/skills/documentar-componente/`. Os comandos usam a raiz do checkout, `git rev-parse --show-toplevel`; os scripts ficam em `"$(git rev-parse --show-toplevel)/.claude/skills/documentar-componente/scripts/"`. Os scripts `use_figma` não rodam no shell: leia o arquivo, troque os placeholders e envie o texto pelo `use_figma`.

## Entrada

O nome do componente, como no código (`button`, `input`, `badge`, `combobox`…). Se vier em português ou em outro formato ("o campo de texto", "Select"), confirme o nome da pasta em `packages/ui/src/components/` antes de seguir. Se o usuário pedir só uma etapa ("só o artigo", "só a acessibilidade"), faça a etapa pedida, lendo as fontes de que ela depende.

## Escrita

Tudo que o time vai ler (Figma, artigo, PR, changeset, mensagens) é em português do Brasil, frases curtas, sem emoji. Números no formato brasileiro (4,53:1). Nome de token, prop e classe em `código`.

## Plano

Abra o plano de tarefas com as 8 etapas e avance uma por vez. Guarde ids encontrados (página, set, frame de doc, seções, artigo) num `<nome>-doc-state.json` no scratchpad, para retomar sem procurar de novo.

### 1. Fontes e inventário de uso

A referência do componente é o shadcn e o `[PRIZM] Componentes`, com as decisões de variante, estado e tamanho já tomadas pelo dono do DS. Antes de documentar, levante também o que o time de desenvolvimento usa hoje: os componentes do `@grupoitss/prizm-ui` vieram do `@pas/ui` (Azure), e o repositório e o Storybook mostram as variantes, tamanhos, combinações, props e estados em uso. Esse inventário é contexto, não fonte da verdade: ele mostra o que o shadcn e o Figma ainda não cobrem e o que uma decisão vai obrigar a migrar. No Badge, o uso tinha a prop `appearance` e as variantes `primary`, `info` e `violet`, que o Figma não tinha; a decisão (PR #103, 21/10/2026) foi ficar com o Figma, e a coluna de status da tabela, que usava `appearance="text"`, foi migrada. Leia, nesta ordem:

1. **Código, sempre de `origin/main`**: `git fetch origin` na raiz do checkout e leia com `git show origin/main:design-system/packages/ui/src/components/<nome>/<arquivo>`. O checkout local pode estar dias atrás ou em outra branch (no piloto estava em 14/10, com o arquivo em outro caminho). Não leia o `@pas/ui` do Azure nem o do pas-web: são versões antigas, com outros padrões, e o que valia de lá já está no `prizm-ui`.
   Anote: variantes e tamanhos do `cva` (também os `compoundVariants`), props, classes de cada estado (hover, foco, active, disabled), atributos ARIA, dependências (outros componentes, ícones).
2. **Inventário de uso**: rode `scripts/inventario-uso.mjs <nome>`. Ele cruza o código, as stories, os usos em JSX no repositório (stories de outros componentes e composições dentro do `prizm-ui`) e o Storybook publicado (https://grupoitss.github.io/PRIZM-Design-System/). Os controles das stories costumam estar incompletos: para saber o que é usado, valem o `cva` e as props. Como rodar, como ler e o que fazer com cada diferença em `references/inventario.md`.
3. **Família do componente no Storybook publicado**: o componente não vive sozinho. Ache os irmãos que dividem o mesmo papel no Storybook (https://grupoitss.github.io/PRIZM-Design-System/, pela lista do `index.json`) e rode o inventário de cada um.
   - Exemplos de família: campo = Input, InputGroup, Select, Textarea, DatePicker, MaskedInput, InputOTP e Field; ação = Button, ButtonGroup e Toggle.
   - Compare a escala de tamanhos, as regras de foco, de disabled e de erro, e as props de rótulo, obrigatório e loading.
   - Decisão tomada só num componente da família deixa os outros com outra escala. No Input (21/10/2026), sm/md/lg e o foco na base entraram só nele (PR #104). O contêiner do InputGroup ficou com 48px em volta de um campo de 40px, e o alinhamento foi para um segundo PR (#107).

   Detalhes em `references/inventario.md`, seção Família.
4. **Stories**: `design-system/apps/docs/stories/<nome>.stories.tsx` (também de `origin/main`). Mostram os usos previstos e servem de exemplos para o artigo; o inventário traz os links publicados de cada uma.
5. **Figma**: no `[PRIZM] Componentes` (fileKey `7NPb3iuxjitMdpudp4yHTl`), ache a página do componente e o component set com `get_metadata`. Leia as propriedades com `scripts/propriedades-figma.js` e rode o inventário de novo com `--figma`, para a tabela de paridade.
6. **CMS**: `search` pelo nome, para saber se já existe artigo.

Feche a etapa com um resumo curto: o que o Figma e o shadcn definem, o que está em uso (inventário), a paridade em três grupos (em uso e fora do Figma, no Figma e fora do código, nome diferente), o que diverge na família e se já há doc. **⏸ O dono do DS decide** cada diferença: entra no Figma, ou sai do código com migração dos usos. A documentação segue o Figma com essas decisões; o inventário aponta o que conferir e o que migrar.

### 2. Figma ligado ao Core

Confira se o component set (e as dependências que ele usa) está ligado ao `[PRIZM] Design Tokens_Core` (fileKey `fbf1czT8pszRGYspjl0VV4`). Use `scripts/inventario-ligacoes.js`.

Se não estiver: levante as ligações, monte o mapa local → Core, **⏸ valide o mapa com o dono do DS**, e religue com `scripts/rebind-core.js`. Detalhes, mapa de partida e defeitos do kit para conferir em `references/figma.md`.

### 3. Doc no Figma

Monte o frame "<Componente> — Documentação Prizm" com as 11 seções do template do Button. Variantes, tamanhos, props e estados seguem o component set com as decisões da etapa 1; o que está em uso e ainda não tem decisão entra em "Propostas para decidir". As seções: cabeçalho, playground por tema (5 marcas × claro/escuro, com modo explícito), variantes, quando usar (hierarquia, faça/evite), API (gerada de `componentPropertyDefinitions` e conferida com o código), anatomia, tamanhos (gerado das ligações + `control-height` por marca), tokens por variante (gerado), estados, acessibilidade e changelog. Como montar cada uma, a regra de hover, a regra de foco e as regras de token em `references/figma.md`.

Divergências que pedem decisão (variante que só existe de um lado, token que falha, regra que o kit não segue) vão para uma seção "Propostas para decidir". **⏸ O dono do DS valida o frame e decide as propostas.**

### 4. Acessibilidade

Aplique o checklist do artigo "Critério de acessibilidade" do CMS (WCAG 2.2 AA, 4 blocos: contraste, foco, teclado, nomes). Contraste medido a partir dos tokens compilados em `packages/tokens/dist/ts/<marca>/<modo>.js`, com `scripts/contraste.mjs`. Como gerar o `dist` de `origin/main`, quais pares medir e como testar foco e teclado em `references/acessibilidade.md`.

Preencha a seção 10 do frame com o resultado. As falhas viram uma lista numerada de pendências, cada uma com critério, número medido, onde falha e opções. **⏸ O dono do DS decide cada pendência.**

### 5. Correções no código

Só o que foi aprovado na etapa 3 ou 4. Em worktree separado a partir de `origin/main`, com teste que prova a correção, lint, typecheck, changeset e PR novo. Passo a passo em `references/codigo.md`. Não mergeie: o dono do DS mergeia.

Se a correção muda um token, ela vale para o Core no Figma também: aplique no `fbf1cz` (com ok), avise que alguém com acesso de edição ao Core precisa publicar a biblioteca, e depois da publicação religue só as variáveis que mudaram (ver Armadilhas).

### 6. Artigo no CMS

Escreva o artigo no workspace `prizm_design_system` pelo MCP `prizm-cms`, na pasta Componentes, no formato do shadcn + seções Prizm. A API segue o código já alinhado às decisões, conferida com o inventário (nenhuma variante em uso fica sem menção: ou está documentada, ou consta como removida, com a migração). Use os links das stories publicadas. O artigo "Button" é o modelo: leia com `fetch` o id `978a4aa8-4d01-484f-a0bb-93d10c59c219` antes de escrever. Imagens exportadas com `get_screenshot` e subidas por `POST /cms/api/mcp/images` (`scripts/subir-imagem.sh`). Sempre como rascunho. Estrutura, ids e passo a passo em `references/artigo-cms.md`.

**⏸ O dono do DS revisa o rascunho.** Publicar só com pedido explícito, com essas palavras.

### 7. Rastreabilidade

Ligue as pontas, para que cada uma leve às outras e um teste avise quando Figma e código se separarem. Modelo: o Button (PR #100, já na main). Passo a passo em `references/rastreabilidade.md`.

1. **Mapa de tokens** em `packages/ui/src/components/<nome>/<nome>.tokens.json`, extraído das ligações do component set (`scripts/extrair-mapa-tokens.js`), nunca digitado: `sources`, `variants`, `states`, `sizes` e `divergences`.
2. **Teste** `<nome>.tokens.test.ts` que confere o mapa contra as classes do `cva`.
3. **Story** com os links do component set, do frame de doc e do artigo em `parameters.docs.description.component`. Confira o link antigo de cada story. Complete os controles que o inventário apontou como incompletos (valor do `cva` fora do `options`, prop sem controle).
4. **Artigo**: seção final "Rastreabilidade" (tabela Ponta | Onde | Leva a, nota sobre o Code Connect, divergências abertas).
5. **Tag `documentado`** na story: acrescente `"documentado"` ao `tags` do `meta` (`tags: ["autodocs", "documentado"]`). É o que separa, no filtro de tags do Storybook, o que já passou por este fluxo do que ainda falta revisar. O título da story fica em `Primários/<Nome>`.

Os arquivos de código vão em worktree e PR, como na etapa 5. Divergências que o mapa achar (nome fora do padrão do Core, estado diferente do código) e as da paridade do inventário que seguirem abertas **⏸ vão para o dono do DS decidir**: corrigir o Figma, o código, ou deixar registrada como aberta.

### 8. Figma → link

**⏸ Com o ok**, atualize `description` e `documentationLinks` do component set apontando para o artigo (ver `references/figma.md`).

Ao terminar, resuma: o que mudou no Figma (ids), PRs abertos, artigo (código e id, rascunho), divergências do mapa, pendências que ficaram e o que depende do dono do DS (publicar o Core, mergear, publicar o artigo, ajustes à mão no Figma).

## Armadilhas

Cada uma custou horas no piloto. Leia antes da etapa 2.

**Encaixe com troca de instância (22/10, Trailing do Button).** Três cuidados ao criar um INSTANCE_SWAP que recebe peças diferentes: (1) `preferredValues` precisa trazer a lista inteira de ícones **locais**, montada das chaves dos componentes `Icon / *` da página Icons (`1:433`, 1.468 ícones), mais as peças e as variantes de contexto como opção direta (Badge "Sobre primary"). Não copie a lista de outro encaixe: a do Left Icon tinha 318 chaves de uma biblioteca antiga, que o seletor ignora (só mostrava KbdGroup e Badge); (2) marque a camada do encaixe com `isExposedInstance = true` em todas as variantes, e as instâncias internas da peça também (os Kbd do KbdGroup), senão o painel não mostra quantidade de teclas, texto nem variante; (3) escolher explicitamente o componente que já é o padrão (o Circle) zera as sobrescritas de cor e traço do ícone — com os outros ícones não acontece. Teste o encaixe numa instância temporária, trocando a peça e lendo `exposedInstances`, e confira pelo render antes de dizer que funciona. **Encaixe com tipos (versão final do Button):** um componente auxiliar com variante Tipo (e Contexto para a cor), exposto no componente principal; cada variante do auxiliar contém SÓ a peça do seu tipo. Deixar as outras peças ocultas na variante faz uma troca feita num tipo reaparecer, sem cor, ao mudar de tipo; e camada oculta dentro de instância não aceita override pelo plugin.

**Regra (22/10): opacidade de estado nunca vai no paint, vai na camada.** Mesmo quando grava, a opacidade do paint se perde no próximo religamento: o plugin lê 100% num paint que está a 80% no arquivo, e o script regrava 100%. Foi o que zerou os hovers do Button depois do religamento de `color/input`. Para hover "cor a 80%": variante sem fill e uma camada "Hover fill" (retângulo absoluto, constraints STRETCH, raio ligado ao da variante, fill da variável a 100%, cor resolvida) com `node.opacity = 0.8`. Para sobreposição: camada "Hover overlay", igual, com a opacidade da regra. O religamento só troca a cor; a opacidade de camada fica.

**Opacidade de paint ligado a variável não grava de forma confiável pelo plugin.** `setBoundVariableForPaint` zera a opacidade, e `{...paint, opacity: 0.8}` lê 0.8 na sessão mas não chega ao arquivo. O que grava, com **um** fill: o paint como objeto literal com `boundVariables` explícito: `{type:'SOLID', visible:true, opacity:0.8, blendMode:'NORMAL', color:{r,g,b}, boundVariables:{color:{type:'VARIABLE_ALIAS', id}}}`. Mesmo assim falha às vezes (21 de 22 hovers gravaram na primeira). Com **dois** fills, o segundo vira 100%: nunca tente. Para sobreposição use uma camada à parte com **opacidade de camada** (`node.opacity`), que grava sempre (a "Hover overlay" do Secondary), ou faça à mão no Figma: copiar as linhas de Fill de uma variante certa (Cmd+C no painel) e colar nas outras; Paste properties leva padding e layout junto.

**No paint literal, o render do servidor usa o `color` do paint, não a variável.** Um paint criado com `color:{r:0,g:0,b:0}` e `boundVariables` lê certo no plugin, mas o `get_screenshot` mostra preto: no Input, a borda de erro saiu preta. Grave sempre a cor resolvida: `const r = variable.resolveForConsumer(node).value` e `color:{r:r.r, g:r.g, b:r.b}`. O alfa da variável também é ignorado: `color/transparent` com `opacity: 1` sai branco. Para borda transparente, use `opacity: 0` no paint. O `rebind-core.js` já grava a cor resolvida.

**Confira sempre pelo `get_screenshot`, lendo pixels, nunca pelo `node.screenshot()` do plugin.** O plugin mostra o estado da sessão, não o do arquivo. Override em instância aninhada (id `I…;…`) aparece certo nas leituras e no `node.screenshot()`, e não existe no arquivo. Depois de cada gravação de cor ou opacidade, exporte a variante com `get_screenshot`, baixe o PNG e leia o pixel com `python3 -I scripts/px.py arquivo.png x y`. Override aninhado que não grava: corrigir à mão no Figma.

**Depois de publicar o Core, as ligações ficam presas à versão antiga.** "Aceitar atualização da biblioteca" não move nada: a variável remota tem id `VariableID:<key>/<versão>` e os nós continuam na cópia antiga, com o valor velho no render (o mesmo vale para modos explícitos de coleção). Rode `scripts/upgrade-core.js` passando em `__ONLY__` **só as variáveis cujo valor mudou**: a variável da coleção Theme (`palette/…`) e a da coleção Mode que aponta para ela (`color/…`). Religar tudo regrava todos os paints e perde as opacidades que custaram para gravar. O script deixa de fora nós com dois fills e instâncias aninhadas e os lista em `manual`. Os arquivos que consomem o Core são o `[PRIZM] Componentes` (só as páginas já religadas) e o Workshop (`mT2EFkoROfOi5ohgYlckp5`); rode uma página por chamada, em paralelo.

**Degrau "acima do fundo" se mede, não se conta.** No Digitrol claro o fundo é `neutral.100`, e um tom no degrau 100 pode ser tão claro quanto ele (green, amber, sky e cyan 100 ficam em 1,01–1,05:1). Antes de propor um degrau, meça a superfície contra o fundo com o `contraste.mjs`; a referência é o `neutral.200` (1,16:1).

**Jira:** o conector Atlassian pode responder 403 ("The app is not installed on this instance"). Nesse caso, leia pelo Claude in Chrome com a pessoa logada. Digite no Jira só com o editor aberto e focado: fora do editor, cada letra vira atalho (muda status, abre outro ticket, atribui). Clique no campo, confirme pelo screenshot que o cursor está nele, e só então digite. Menção digitada com `@` não pega; use o atalho "+ Nome" da barra de pessoas embaixo do editor.

**vitest só roda com Node 24.** Com Node 22 falha no undici. Antes dos testes: `nvm use 24` (ou outro Node 24 no PATH).

**Code Connect não está disponível.** O plano do Figma é Professional, e `add_code_connect_map` responde "Code connections can only be made in libraries that are in Organization or Enterprise plans". Não tente; cite no artigo. Dev resources (links no Dev Mode) também não funcionam pelo plugin (`getDevResourcesAsync` não é API suportada): quem quiser adiciona à mão.

**Os controles do Storybook não dizem o que está em uso.** Os `argTypes` foram escritos à mão: no Badge, antes do PR #103, o controle `variant` não listava `violet` e não havia controle de `appearance`. Para saber o uso, valem o `cva` e as props de `origin/main`; o `scripts/inventario-uso.mjs` aponta as diferenças. Valor sem uso no repositório pode estar em uso nos produtos: ao decidir remover, considere a migração deles.

**Na extração do mapa, a opacidade lida pelo plugin não vale.** Ele leu 100% em hovers que o render mostra a 80%. A opacidade de hover vem da regra conferida pelo render, não da leitura.

**Lint e `tsc` do app `docs` dão erros de tipo locais**, porque `@grupoitss/prizm-ui` não está compilado. Antes de concluir que a mudança quebrou algo, rode o mesmo comando no arquivo da main e compare.

**"No changes" ao publicar o Core não quer dizer que a mudança não subiu (26/10, accent do escuro).** O botão Publish fica desabilitado também quando a biblioteca já foi publicada com a mudança, inclusive quando a variável alterada é oculta da publicação (`palette/*`). Antes de concluir, compare o id da variável ligada num nó (`VariableID:<key>/<versão>`) com o de `figma.variables.importVariableByKeyAsync(key)`: se forem diferentes e a versão nova tiver o valor novo, o Core está publicado e falta só o `upgrade-core.js`.

**Clonar o frame de doc de um irmão da família economiza a etapa 3 (26/10, Textarea a partir do Select).** Clone o frame, troque as instâncias com `swapComponent` (mapeando State e Size) e reescreva os textos seção por seção. Três cuidados: (1) os `hyperlink` do cabeçalho (código, Storybook) vêm junto e continuam apontando para o componente de origem: troque-os; (2) a seção de acessibilidade traz os números do outro componente: esvazie até a etapa 4; (3) procure sobras com `findAll` de TEXT pelo nome do componente de origem antes de mostrar o frame.

**Instância oculta por propriedade booleana não mostra os filhos ao plugin.** Num botão ligado a `Expandable` (padrão `false`), `children` da instância do ícone vem vazio, e a leitura de cor ou ligação falha. Leia da camada que não é instância, ou ligue a propriedade numa instância temporária.

**A ligação de tamanho não fica na instância de ícone do kit.** `setBoundVariable('width', …)` numa instância de `Icon / *` não dá erro e não grava (proporção travada no componente do ícone). O tamanho fica certo em px; registre no mapa de tokens e peça a ligação à mão.

**No jsdom, o foco não volta ao gatilho do Dialog do Radix ao fechar; no navegador, volta.** Antes de registrar falha de 2.4.3, confira no Storybook publicado (`iframe.html?id=<story>`) pelo navegador embutido: abra, feche com Esc e leia `document.activeElement`.

**O Tokens Studio do Core sincroniza com a branch `design`, não com a main.** O workflow `design-acompanha-main.yml` (PR #129) avança a `design` a cada push na main; se ela tiver um sync esperando a PR, não mexe. Com sync no GitHub, o plugin não guarda os tokens no arquivo (`values` = `{}` em `sharedPluginData('tokens')`): para conferir o que ele carregou, olhe na interface do plugin, não no arquivo.

Outras, menores:

- `packages/tokens/dist/` é ignorado pelo git: o `dist` do checkout pode ser de outro dia. Gere de `origin/main` antes de medir contraste.
- `pnpm install` falha com outra versão de pnpm que não a do `packageManager` (ver `references/codigo.md`). O pnpm 12 pelo corepack também falha ("Cannot find module …/bin/pnpm.cjs"); `npx -y pnpm@<versão>` funciona.
- Rótulos do component set com constraint SCALE esticam quando o pai é redimensionado: use `resizeWithoutConstraints`.
- Variante com proporção travada aceita só uma ligação entre width e height: `unlockAspectRatio()` antes.
- `clone()` de variante cai na página, não no set: `set.appendChild(clone)`. O clone também perde as `componentPropertyReferences` (texto, booleana, troca de instância): religue nos clones. Ao religar texto, não ligue os textos que não estavam ligados (no Input, o "No file chosen" do File virou "Placeholder").
- Ligar o `mainComponent` de uma instância a uma propriedade INSTANCE_SWAP desfaz o override de cor do ícone. Recolora depois de ligar.
- `set.description` grava o `&` de uma URL como `&amp;`, e o link quebra. Use `set.descriptionMarkdown` com `[texto](url)` (ver `references/figma.md`, etapa 8).
- Contraste com token de alfa (`input-background` no escuro) exige misturar contra o fundo; o `contraste.mjs` já faz.
- `get_screenshot` exporta em 1x; `maxDimension` não amplia.
- Upload de imagem no CMS responde com `url` em localhost (bug): use o `file:<id>`.
- Título de artigo é único no workspace inteiro.

## Arquivos da skill

| Arquivo | Para quê |
| --- | --- |
| `references/inventario.md` | Etapa 1: inventário de uso pelo código, stories e Storybook, e paridade com o Figma |
| `references/figma.md` | Etapas 2, 3 e 8: mapa local → Core, seções do frame, regras de hover e foco, link no set |
| `references/acessibilidade.md` | Etapa 4: checklist, pares a medir, teste de foco e teclado, formato das pendências |
| `references/codigo.md` | Etapa 5: worktree, pnpm, testes, changeset, PR |
| `references/artigo-cms.md` | Etapa 6: ids do CMS, estrutura do artigo, imagens |
| `references/rastreabilidade.md` | Etapa 7: mapa de tokens, teste, story, seção no artigo |
| `scripts/inventario-uso.mjs` | Node: variantes, combinações, props, estados, stories e usos do componente; paridade com `--figma` |
| `scripts/propriedades-figma.js` | use_figma, leitura: `componentPropertyDefinitions` do set, para o `--figma` do inventário |
| `scripts/extrair-mapa-tokens.js` | use_figma, leitura: ligações de cada variante, para o `<nome>.tokens.json` |
| `scripts/inventario-ligacoes.js` | use_figma, leitura: o que está ligado ao Core e o que não está |
| `scripts/rebind-core.js` | use_figma: religa variáveis locais ao Core pelo mapa aprovado |
| `scripts/upgrade-core.js` | use_figma: move ligações presas a uma versão antiga do Core |
| `scripts/contraste.mjs` | Contraste WCAG de pares de tokens em todas as marcas e modos |
| `scripts/px.py` | Cor de um pixel de PNG, para conferir o render do servidor |
| `scripts/subir-imagem.sh` | Sobe PNGs para o CMS e devolve `file:<id>` |

Os scripts `use_figma` têm placeholders (`__ROOTS__`, `__MAP__`, `__SET__`…): leia o arquivo, troque os valores e envie o texto. Rode primeiro com `__DRY__ = true`.
