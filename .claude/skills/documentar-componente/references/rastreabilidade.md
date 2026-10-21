# Rastreabilidade

Referência da etapa 7. O objetivo é que cada ponta (Figma, código, story, artigo, PRs, Jira) leve às outras, e que um teste avise quando Figma e código se separarem. Modelo: o Button (PR #100 do GrupoITSS/PRIZM-Design-System, já na main). Leia os 3 arquivos do modelo antes de começar:

```bash
cd "$(git rev-parse --show-toplevel)" && git fetch origin
git show origin/main:design-system/packages/ui/src/components/button/button.tokens.json
```

(Troque por `button.tokens.test.ts` e `apps/docs/stories/button.stories.tsx` para ler os outros dois.)

Os arquivos de código entram no mesmo worktree e PR da etapa 5 quando houver; senão, num worktree e PR só para isso (`feat/<nome>-rastreabilidade`), pelo passo a passo de `references/codigo.md`.

## 1. Mapa de tokens em arquivo

`design-system/packages/ui/src/components/<nome>/<nome>.tokens.json`, **extraído das ligações do component set no Figma**, nunca digitado. Rode `scripts/extrair-mapa-tokens.js` (use_figma, só leitura) e monte o JSON a partir da saída.

Campos, na ordem do modelo:

| Campo | Conteúdo |
| --- | --- |
| `component` | Nome do componente |
| `description` | O que o mapa é, de onde foi extraído (data) e qual teste o confere |
| `sources` | `figmaComponent` (URL do set com node-id), `figmaDocumentation` (frame de doc), `code`, `story` (caminhos no repo), `article` (URL do CMS), `pullRequests` (URLs), `jira` (chaves GIES) |
| `variants` | Por variante: `background`, `text`, `border` (`null` quando não há), `shadow` se houver, `hover` com `rule` (a regra por tipo de fundo, em texto) e os tokens e opacidades da regra |
| `states` | `focus` (`ring`, `ringWidth`, `ringOffset`, `ringOffsetWidth`), `pressed`, `disabled`, `loading` (opacidade e atributo) |
| `sizes` | Por tamanho: `height`, `width` (nos quadrados), `paddingX`, `gap`, `radius`, `fontSize` |
| `divergences` | Lista de `{ where, figma, code, status: "aberta" }` para cada diferença Figma × código, incluindo as da paridade do inventário (etapa 1) ainda sem decisão do dono do DS |

Nomes de token no formato do Figma (`color/primary`, `control-height/md`). Componente sem variantes de cor (ex.: Input) usa só as chaves que fazem sentido; não invente variante. O modelo desse caso é o `input.tokens.json` (PR #104):
- `states`: `default`, `focus`, `error`, `errorFocus` e `disabled`, cada um com fundo, texto, borda e anel.
- `parts`: as peças internas, como ícone inicial, botão de senha e botão do File.
- `sizes`: com `paddingY`.

O teste confere também o peso e o padding (`file:font-normal`, `px-3`, `py-2`).

Opacidade de hover **não sai da leitura do plugin**: ela lê 100% em hovers que o render mostra a 80%. Use a regra de hover conferida pelo render (`get_screenshot` + `px.py`), e escreva a opacidade da regra.

Ao extrair, procure nomes fora do padrão do Core (`base/*`, `custom/*`, `tailwind colors/*`, `alpha/*`, qualquer coisa sem prefixo `color/`, `spacing/`, `radius/`, `control-height/`…). Cada um é sobra do kit: vira divergência e entra na lista de pendências do Figma. Também compare estado a estado com as classes do código: no Button o mapa achou o foco do Destructive e do Text em `base/destructive` e o foco do Outline trocando a borda para `color/ring`, que o código não faz.

## 2. Teste do mapa

`design-system/packages/ui/src/components/<nome>/<nome>.tokens.test.ts`, no formato do `button.tokens.test.ts`: importa o `cva` do componente e o JSON, e confere:

- o mapa cobre todas as variantes e tamanhos do código (lista explícita no teste);
- fundo, texto e borda de cada variante estão nas classes (`color/primary` → `bg-primary`);
- anel e espaço de foco (`focus-visible:ring-*`, `ring-offset-*`);
- altura por tamanho (`control-height/md` → `h-control-height-md` ou `size-…`).

Componente sem `cva` (classes fixas): teste as classes do elemento renderizado com `@testing-library/react`. Rode com Node 24 (ver `codigo.md`). O teste falhar é informação: ou o mapa está errado, ou Figma e código divergem (registre em `divergences`, não ajuste o teste para passar).

## 3. Story

Em `design-system/apps/docs/stories/<nome>.stories.tsx`, na `parameters.docs.description.component`, os 3 links: `[Componente no Figma](…) · [Documentação no Figma](…) · [Artigo no CMS](…)`, em constantes no topo do arquivo, como no Button.

Confira o link que já existe em cada story. No Button ele apontava para o arquivo antigo "[TESTE LUCAS] Design Tokens Core" (`DKxVyaDsRPJGk3lvL630yS`); o certo é o `[PRIZM] Componentes` (`7NPb3iuxjitMdpudp4yHTl`).

O lint e o `tsc` do app `docs` dão erros de tipo locais porque `@grupoitss/prizm-ui` não está compilado. Antes de concluir que a mudança quebrou algo, rode o mesmo comando no arquivo da main e compare; só conta o erro que a main não tem.

## 4. Seção no artigo

Última seção do artigo, "## Rastreabilidade" (atualize o rascunho com `update_article_content`, com ok). Copie do artigo Button:

- frase de abertura: onde o componente vive em cada ponta e como uma leva à outra;
- tabela `Ponta | Onde | Leva a`, linhas: Figma · componente, Figma · documentação, Código (caminho e link do GitHub na main), Story, Mapa de tokens, Tokens, Decisões e mudanças (PRs), Acessibilidade (artigo do Critério e Jira), Base (shadcn);
- callout `> [!NOTE]` dizendo que o Code Connect não está disponível no plano Professional e que a ponte é o link de documentação e o mapa;
- lista das divergências abertas, as mesmas do `divergences`.

Na seção "Tokens por variante", aponte para o arquivo do mapa. Na nota do topo, "Links completos em Rastreabilidade, no fim da página".

## 5. Figma

`documentationLinks` do component set → artigo. É a etapa 8 (ver `references/figma.md`).

## O que não funciona

- **Code Connect:** o plano do Figma é Professional, e `add_code_connect_map` responde "Code connections can only be made in libraries that are in Organization or Enterprise plans". Não tente; cite no artigo.
- **Dev resources** (links no Dev Mode) pelo plugin: `getDevResourcesAsync` não é API suportada. Quem quiser adiciona à mão no Figma.
