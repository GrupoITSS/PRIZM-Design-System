---
name: documentar-componente
description: Documenta um componente do design system Prizm (Grupo ITSS) de ponta a ponta, no processo do piloto do Button (19–20/10/2026) — lê código e Figma, confere a ligação ao [PRIZM] Design Tokens_Core, monta o frame de documentação no Figma, aplica o checklist de acessibilidade WCAG 2.2 AA com contraste medido nos tokens, abre PR com as correções aprovadas, escreve o artigo no CMS (prizm_design_system) como rascunho e liga as pontas (mapa de tokens em arquivo com teste, links na story, seção Rastreabilidade no artigo, link no Figma). Use SEMPRE que o usuário pedir "documentar o componente X", "doc do X", "doc do X no CMS", "montar a página do X", "página de documentação do X no Figma", "artigo do X", "fazer o X como fizemos o Button", "levar o X pelo mesmo fluxo do Button", "auditar a acessibilidade do X", "mapa de tokens do X", "rastreabilidade do X" ou variação sobre documentar, religar ao Core ou publicar a doc de um componente do Prizm (Input, Badge, Select, Dialog…), mesmo citando só uma etapa.
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

### 1. Fontes

Leia, nesta ordem:

1. **Código, sempre de `origin/main`**: `git fetch origin` na raiz do checkout e leia com `git show origin/main:design-system/packages/ui/src/components/<nome>/<arquivo>`. O checkout local pode estar dias atrás ou em outra branch (no piloto estava em 14/10, com o arquivo em outro caminho). Nunca use o `@pas/ui` do pas-web: é uma versão antiga, com outros padrões.
   Anote: variantes e tamanhos do `cva`, props, classes de cada estado (hover, foco, active, disabled), atributos ARIA, dependências (outros componentes, ícones).
2. **Stories**: `design-system/apps/docs/stories/<nome>.stories.tsx` (também de `origin/main`). Mostram os usos previstos e servem de exemplos para o artigo.
3. **Figma**: no `[PRIZM] Componentes` (fileKey `7NPb3iuxjitMdpudp4yHTl`), ache a página do componente e o component set com `get_metadata`. Leia `componentPropertyDefinitions` e as variantes.
4. **CMS**: `search` pelo nome, para saber se já existe artigo.

Feche a etapa com um resumo curto: o que existe, o que diverge entre Figma e código (paridade de variantes, tamanhos, props) e se já há doc.

### 2. Figma ligado ao Core

Confira se o component set (e as dependências que ele usa) está ligado ao `[PRIZM] Design Tokens_Core` (fileKey `fbf1czT8pszRGYspjl0VV4`). Use `scripts/inventario-ligacoes.js`.

Se não estiver: levante as ligações, monte o mapa local → Core, **⏸ valide o mapa com o dono do DS**, e religue com `scripts/rebind-core.js`. Detalhes, mapa de partida e defeitos do kit para conferir em `references/figma.md`.

### 3. Doc no Figma

Monte o frame "<Componente> — Documentação Prizm" com as 11 seções do template do Button: cabeçalho, playground por tema (5 marcas × claro/escuro, com modo explícito), variantes, quando usar (hierarquia, faça/evite), API (gerada de `componentPropertyDefinitions` e conferida com o código), anatomia, tamanhos (gerado das ligações + `control-height` por marca), tokens por variante (gerado), estados, acessibilidade e changelog. Como montar cada uma, a regra de hover, a regra de foco e as regras de token em `references/figma.md`.

Divergências que pedem decisão (variante que só existe de um lado, token que falha, regra que o kit não segue) vão para uma seção "Propostas para decidir". **⏸ O dono do DS valida o frame e decide as propostas.**

### 4. Acessibilidade

Aplique o checklist do artigo "Critério de acessibilidade" do CMS (WCAG 2.2 AA, 4 blocos: contraste, foco, teclado, nomes). Contraste medido a partir dos tokens compilados em `packages/tokens/dist/ts/<marca>/<modo>.js`, com `scripts/contraste.mjs`. Como gerar o `dist` de `origin/main`, quais pares medir e como testar foco e teclado em `references/acessibilidade.md`.

Preencha a seção 10 do frame com o resultado. As falhas viram uma lista numerada de pendências, cada uma com critério, número medido, onde falha e opções. **⏸ O dono do DS decide cada pendência.**

### 5. Correções no código

Só o que foi aprovado na etapa 3 ou 4. Em worktree separado a partir de `origin/main`, com teste que prova a correção, lint, typecheck, changeset e PR novo. Passo a passo em `references/codigo.md`. Não mergeie: o dono do DS mergeia.

Se a correção muda um token, ela vale para o Core no Figma também: aplique no `fbf1cz` (com ok), avise que alguém com acesso de edição ao Core precisa publicar a biblioteca, e depois da publicação religue só as variáveis que mudaram (ver Armadilhas).

### 6. Artigo no CMS

Escreva o artigo no workspace `prizm_design_system` pelo MCP `prizm-cms`, na pasta Componentes, no formato do shadcn + seções Prizm. O artigo "Button" é o modelo: leia com `fetch` o id `978a4aa8-4d01-484f-a0bb-93d10c59c219` antes de escrever. Imagens exportadas com `get_screenshot` e subidas por `POST /cms/api/mcp/images` (`scripts/subir-imagem.sh`). Sempre como rascunho. Estrutura, ids e passo a passo em `references/artigo-cms.md`.

**⏸ O dono do DS revisa o rascunho.** Publicar só com pedido explícito, com essas palavras.

### 7. Rastreabilidade

Ligue as pontas, para que cada uma leve às outras e um teste avise quando Figma e código se separarem. Modelo: o Button (PR #100, já na main). Passo a passo em `references/rastreabilidade.md`.

1. **Mapa de tokens** em `packages/ui/src/components/<nome>/<nome>.tokens.json`, extraído das ligações do component set (`scripts/extrair-mapa-tokens.js`), nunca digitado: `sources`, `variants`, `states`, `sizes` e `divergences`.
2. **Teste** `<nome>.tokens.test.ts` que confere o mapa contra as classes do `cva`.
3. **Story** com os links do component set, do frame de doc e do artigo em `parameters.docs.description.component`. Confira o link antigo de cada story.
4. **Artigo**: seção final "Rastreabilidade" (tabela Ponta | Onde | Leva a, nota sobre o Code Connect, divergências abertas).

Os arquivos de código vão em worktree e PR, como na etapa 5. Divergências que o mapa achar (nome fora do padrão do Core, estado diferente do código) **⏸ vão para o dono do DS decidir**: corrigir o Figma, o código, ou deixar registrada como aberta.

### 8. Figma → link

**⏸ Com o ok**, atualize `description` e `documentationLinks` do component set apontando para o artigo (ver `references/figma.md`).

Ao terminar, resuma: o que mudou no Figma (ids), PRs abertos, artigo (código e id, rascunho), divergências do mapa, pendências que ficaram e o que depende do dono do DS (publicar o Core, mergear, publicar o artigo, ajustes à mão no Figma).

## Armadilhas

Cada uma custou horas no piloto. Leia antes da etapa 2.

**Opacidade de paint ligado a variável não grava de forma confiável pelo plugin.** `setBoundVariableForPaint` zera a opacidade, e `{...paint, opacity: 0.8}` lê 0.8 na sessão mas não chega ao arquivo. O que grava, com **um** fill: o paint como objeto literal com `boundVariables` explícito: `{type:'SOLID', visible:true, opacity:0.8, blendMode:'NORMAL', color:{r,g,b}, boundVariables:{color:{type:'VARIABLE_ALIAS', id}}}`. Mesmo assim falha às vezes (21 de 22 hovers gravaram na primeira). Com **dois** fills, o segundo vira 100%: nunca tente. Para sobreposição use uma camada à parte com **opacidade de camada** (`node.opacity`), que grava sempre (a "Hover overlay" do Secondary), ou faça à mão no Figma: copiar as linhas de Fill de uma variante certa (Cmd+C no painel) e colar nas outras; Paste properties leva padding e layout junto.

**No paint literal, o render do servidor usa o `color` do paint, não a variável.** Um paint criado com `color:{r:0,g:0,b:0}` e `boundVariables` lê certo no plugin, mas o `get_screenshot` mostra preto: no Input, a borda de erro saiu preta. Grave sempre a cor resolvida: `const r = variable.resolveForConsumer(node).value` e `color:{r:r.r, g:r.g, b:r.b}`. O alfa da variável também é ignorado: `color/transparent` com `opacity: 1` sai branco. Para borda transparente, use `opacity: 0` no paint. O `rebind-core.js` já grava a cor resolvida.

**Confira sempre pelo `get_screenshot`, lendo pixels, nunca pelo `node.screenshot()` do plugin.** O plugin mostra o estado da sessão, não o do arquivo. Override em instância aninhada (id `I…;…`) aparece certo nas leituras e no `node.screenshot()`, e não existe no arquivo. Depois de cada gravação de cor ou opacidade, exporte a variante com `get_screenshot`, baixe o PNG e leia o pixel com `python3 -I scripts/px.py arquivo.png x y`. Override aninhado que não grava: corrigir à mão no Figma.

**Depois de publicar o Core, as ligações ficam presas à versão antiga.** "Aceitar atualização da biblioteca" não move nada: a variável remota tem id `VariableID:<key>/<versão>` e os nós continuam na cópia antiga, com o valor velho no render (o mesmo vale para modos explícitos de coleção). Rode `scripts/upgrade-core.js` passando em `__ONLY__` **só as variáveis cujo valor mudou**: a variável da coleção Theme (`palette/…`) e a da coleção Mode que aponta para ela (`color/…`). Religar tudo regrava todos os paints e perde as opacidades que custaram para gravar. O script deixa de fora nós com dois fills e instâncias aninhadas e os lista em `manual`. Os arquivos que consomem o Core são o `[PRIZM] Componentes` (só as páginas já religadas) e o Workshop (`mT2EFkoROfOi5ohgYlckp5`); rode uma página por chamada, em paralelo.

**Degrau "acima do fundo" se mede, não se conta.** No Digitrol claro o fundo é `neutral.100`, e um tom no degrau 100 pode ser tão claro quanto ele (green, amber, sky e cyan 100 ficam em 1,01–1,05:1). Antes de propor um degrau, meça a superfície contra o fundo com o `contraste.mjs`; a referência é o `neutral.200` (1,16:1).

**Jira:** o conector Atlassian pode responder 403 ("The app is not installed on this instance"). Nesse caso, leia pelo Claude in Chrome com a pessoa logada. Digite no Jira só com o editor aberto e focado: fora do editor, cada letra vira atalho (muda status, abre outro ticket, atribui). Clique no campo, confirme pelo screenshot que o cursor está nele, e só então digite. Menção digitada com `@` não pega; use o atalho "+ Nome" da barra de pessoas embaixo do editor.

**vitest só roda com Node 24.** Com Node 22 falha no undici. Antes dos testes: `nvm use 24` (ou outro Node 24 no PATH).

**Code Connect não está disponível.** O plano do Figma é Professional, e `add_code_connect_map` responde "Code connections can only be made in libraries that are in Organization or Enterprise plans". Não tente; cite no artigo. Dev resources (links no Dev Mode) também não funcionam pelo plugin (`getDevResourcesAsync` não é API suportada): quem quiser adiciona à mão.

**Na extração do mapa, a opacidade lida pelo plugin não vale.** Ele leu 100% em hovers que o render mostra a 80%. A opacidade de hover vem da regra conferida pelo render, não da leitura.

**Lint e `tsc` do app `docs` dão erros de tipo locais**, porque `@grupoitss/prizm-ui` não está compilado. Antes de concluir que a mudança quebrou algo, rode o mesmo comando no arquivo da main e compare.

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
| `references/figma.md` | Etapas 2, 3 e 8: mapa local → Core, seções do frame, regras de hover e foco, link no set |
| `references/acessibilidade.md` | Etapa 4: checklist, pares a medir, teste de foco e teclado, formato das pendências |
| `references/codigo.md` | Etapa 5: worktree, pnpm, testes, changeset, PR |
| `references/artigo-cms.md` | Etapa 6: ids do CMS, estrutura do artigo, imagens |
| `references/rastreabilidade.md` | Etapa 7: mapa de tokens, teste, story, seção no artigo |
| `scripts/extrair-mapa-tokens.js` | use_figma, leitura: ligações de cada variante, para o `<nome>.tokens.json` |
| `scripts/inventario-ligacoes.js` | use_figma, leitura: o que está ligado ao Core e o que não está |
| `scripts/rebind-core.js` | use_figma: religa variáveis locais ao Core pelo mapa aprovado |
| `scripts/upgrade-core.js` | use_figma: move ligações presas a uma versão antiga do Core |
| `scripts/contraste.mjs` | Contraste WCAG de pares de tokens em todas as marcas e modos |
| `scripts/px.py` | Cor de um pixel de PNG, para conferir o render do servidor |
| `scripts/subir-imagem.sh` | Sobe PNGs para o CMS e devolve `file:<id>` |

Os scripts `use_figma` têm placeholders (`__ROOTS__`, `__MAP__`…): leia o arquivo, troque os valores e envie o texto. Rode primeiro com `__DRY__ = true`.
