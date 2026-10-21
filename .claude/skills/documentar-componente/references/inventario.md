# Inventário de uso

Referência da etapa 1.2. Antes de documentar, levante o que o time de desenvolvimento usa hoje do componente: variantes, tamanhos, combinações, props e estados. O inventário dá contexto às decisões; não decide nada sozinho.

## O papel do inventário

A referência do componente é o shadcn e o `[PRIZM] Componentes`, com as decisões de variante, estado e tamanho tomadas pelo dono do DS. O inventário não substitui essa referência: o `@pas/ui` não é fonte da verdade.

Os componentes do `@grupoitss/prizm-ui` vieram do `@pas/ui` (Azure), adaptados aos tokens do Prizm, e mostram como os produtos usam cada componente hoje. Esse uso serve para:

- ver o que o shadcn e o Figma ainda não cobrem, e levar ao dono do DS para decidir;
- saber o que uma decisão obriga a migrar (uma variante que sai do código está em uso em algum lugar);
- não deixar uma variante em uso sem menção na documentação: ou ela está documentada, ou consta como removida, com a migração.

Exemplo do Badge: o do `@pas/ui` tinha 9 variantes (`default`, `primary`, `secondary`, `success`, `warning`, `info`, `violet`, `destructive`, `outline`), 3 aparências (`contained`, `outlined`, `text`), 3 tamanhos e 25 combinações com estilo próprio. O Figma não tinha `primary`, `info`, `violet` nem `appearance`. A decisão (PR #103, 21/10/2026) foi ficar com o Figma, que ganhou `success`, `warning`, `verified` e os 3 tamanhos; no código saíram as variantes e a prop, e a coluna de status da tabela, que usava `appearance="text"` no modo indicador, foi migrada. O inventário é o que mostra, antes da decisão, o tamanho dessa migração.

O inventário é um retrato da `origin/main` na data da leitura. Registre o commit e a data, e refaça se a documentação for retomada dias depois.

Não leia o `@pas/ui` do Azure nem o `pas-web`: são versões antigas. O que valia de lá já está no `prizm-ui`.

## Fontes, em ordem

1. **Código** (`design-system/packages/ui/src/components/<nome>/`, de `origin/main`): o `cva` (`variants`, `defaultVariants`, `compoundVariants`), as interfaces `*Props`, os padrões na desestruturação da função e as classes de estado (`hover:`, `focus-visible:`, `active:`, `disabled:`, `aria-invalid:`, `data-[state=…]:`). Mostra o que existe e está disponível para os produtos.
2. **Stories** (`design-system/apps/docs/stories/<nome>.stories.tsx`): o que foi pensado para ser mostrado e os controles do Storybook. Os controles costumam estar incompletos: no Badge, antes do PR #103, o controle `variant` não listava `violet` e não havia controle de `appearance`. Story incompleta não quer dizer que a variante não é usada.
3. **Uso no repositório**: valores passados em JSX nas stories de outros componentes e dentro de outros componentes (o Badge aparece no `badge-item` e nas colunas da `table`). Mostra as combinações reais. Antes de uma decisão que remove um valor, procure também nos componentes compostos: a coluna de status da tabela usava `appearance="text"` do Badge.
4. **Storybook publicado** (https://grupoitss.github.io/PRIZM-Design-System/): os ids e links das stories, para citar no artigo e na story. O `index.json` dele lista todas as entradas. Ele é gerado a cada push na `main` que mexe no `design-system`; se estiver atrás da `main`, vale o repositório.
5. **Storybook local com MCP** (opcional): com `pnpm --filter docs dev`, o addon `@storybook/addon-mcp` responde em `http://localhost:6006/mcp` e entrega o manifesto de componentes (props com tipos e padrões). Use quando o `cva` não explicar o componente, por exemplo em composições sem variantes (Dialog, Table).

## Rodar

Na raiz do checkout, com `git fetch origin` feito e o `pnpm install` do `design-system` (o script usa o `typescript` do repositório):

```bash
SK="$(git rev-parse --show-toplevel)/.claude/skills/documentar-componente"
node "$SK/scripts/inventario-uso.mjs" <nome> --out <scratchpad>/<nome>-inventario.json
```

Para a paridade com o Figma, leia as propriedades do component set com `scripts/propriedades-figma.js` (use_figma, só leitura, troque `__SET__`), grave o resultado em `<scratchpad>/<nome>-figma-props.json` e rode de novo:

```bash
node "$SK/scripts/inventario-uso.mjs" <nome> --figma <scratchpad>/<nome>-figma-props.json --out <scratchpad>/<nome>-inventario.json
```

Sem rede, use `--sem-storybook`; o resto sai do repositório. Guarde o caminho do JSON no `<nome>-doc-state.json`.

## O que o script entrega

| Seção | Conteúdo |
| --- | --- |
| Variantes do código | Cada `cva`: propriedades, valores, padrão e quantas combinações há em `compoundVariants` (e sobre quais eixos) |
| Props | Interfaces `*Props`: prop, obrigatória ou não, tipo, padrão (do JSDoc ou da função) e descrição |
| Estados | Prefixos de classe tratados no CSS e os atributos `aria-*`/`data-*` do JSX |
| Stories | Título, stories e controles; avisa variante do código sem controle |
| Valores usados | Cada prop e valor passados em JSX no repositório, com contagem e arquivos; lista os valores do código sem uso literal |
| Uso em outros componentes | Pastas do `prizm-ui` que usam este componente |
| Paridade (com `--figma`) | Só as diferenças: valor que existe só no Figma, só no código, ou propriedade que não existe do outro lado |

Os números de uso contam só o repositório do DS. Valor do código "sem uso literal" pode estar em uso nos produtos: ao decidir removê-lo, conte com a migração deles.

A paridade compara nomes normalizados (minúsculas, sem o `#id` do Figma). O estado do Figma (`State`) é comparado com as classes de estado do CSS: `Hover` com `hover:`, `Focus` com `focus-visible:`, `Pressed` com `active:`, `Disabled` com `disabled:`, `Loading` com `aria-busy`. Propriedades booleanas, de texto e de troca de instância do Figma saem como "conferir à mão": compare com as props pelo papel, não pelo nome (no Figma, "Show Icon"; no código, `startIcon`).

## Fechar a etapa

Mostre a quem pediu, em poucas linhas:

1. O que o Figma e o shadcn definem para o componente, com as decisões já tomadas.
2. O que está em uso: propriedades e valores, tamanhos, combinações, props e estados.
3. A tabela de paridade, em três grupos, cada um com a pergunta para o dono do DS:
   - **Em uso e fora do Figma:** entra no Figma, ou sai do código com migração dos usos? Até a decisão, fica em "Propostas para decidir" (etapa 3) e no `divergences` do mapa de tokens (etapa 7).
   - **No Figma e fora do código:** é uma decisão de design ainda não implementada (vai para o código, etapa 5) ou sobra do kit shadcn (sai do Figma)?
   - **Nome diferente** (mesmo papel): qual nome fica? Se for o do Figma, o código migra.
4. Controles do Storybook incompletos: corrigir a story entra na etapa 7, junto com os links.

**⏸ O dono do DS decide.** A documentação segue o Figma com as decisões; o inventário entra como checagem de que nada em uso ficou sem destino.
