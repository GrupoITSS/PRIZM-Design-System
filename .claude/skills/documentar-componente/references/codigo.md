# Correções no código

Referência da etapa 5. Só com as correções aprovadas (ver Papéis no SKILL.md).

## Repositório

- Repo `GrupoITSS/PRIZM-Design-System`, monorepo em `design-system/` com pnpm e turbo. A raiz do checkout é `git rev-parse --show-toplevel`.
- Componente: `design-system/packages/ui/src/components/<nome>/` (`<nome>.tsx`, `<nome>.test.tsx`, `index.ts`; depois da etapa 7, também `<nome>.tokens.json` e `<nome>.tokens.test.ts`). Pacote `@grupoitss/prizm-ui`.
- Stories: `design-system/apps/docs/stories/<nome>.stories.tsx`.
- Tokens: `design-system/packages/tokens/` (`src/tokens-studio/tokens.json`, `build.mjs`, `build.test.mjs`). Pacote `@grupoitss/prizm-tokens`.
- O checkout principal pode estar atrasado ou em outra branch, e outras sessões podem estar nele. Não troque de branch nem faça stash ali.

## Worktree

```bash
cd "$(git rev-parse --show-toplevel)" && git fetch origin
git worktree add ../PRIZM-wt-<nome>-<assunto> -b feat/<nome>-<assunto> origin/main
cd ../PRIZM-wt-<nome>-<assunto>/design-system && pnpm install --frozen-lockfile
```

O repositório fixa o pnpm no `packageManager` do `design-system/package.json`. Com outra versão, o install falha ("Failed to switch pnpm" ou "lockfile is broken"). Instale a versão pedida (`corepack enable` e `corepack prepare pnpm@<versão> --activate`). Com o pnpm 12, o corepack falha ("Cannot find module …/bin/pnpm.cjs", porque o pacote traz um binário nativo); use `npx -y pnpm@<versão> install --frozen-lockfile` e `npx -y pnpm@<versão> --filter … test` no lugar de `pnpm`. Se não der, para só compilar e testar os tokens dá para apontar `packages/tokens/node_modules` para o de outro checkout já instalado (link simbólico) e rodar `node build.mjs` e `node --test build.test.mjs` direto; apague o link antes do commit.

Ao terminar, depois do merge, apague o worktree e a branch (`git worktree remove`, `git branch -D`).

## Verificar

vitest só roda com Node 24 (com Node 22 falha no undici):

```bash
nvm use 24   # ou qualquer Node 24 no PATH
pnpm --filter @grupoitss/prizm-ui test
pnpm --filter @grupoitss/prizm-ui lint
pnpm --filter @grupoitss/prizm-ui typecheck
pnpm --filter @grupoitss/prizm-tokens test     # se mexeu em token
```

Lint e `tsc` do app `docs` (stories) acusam erros de tipo locais quando `@grupoitss/prizm-ui` não está compilado. Compile antes (`pnpm --filter @grupoitss/prizm-tokens build` e `pnpm --filter @grupoitss/prizm-ui build`) e rode de novo: com o pacote compilado, a story tem de passar limpa.

Escreva o teste que prova a correção (ex.: foco continua no botão em loading; aviso quando falta nome). Se algo não roda, diga qual comando e o erro; não declare verde.

## Formatação

Não rode o prettier no repositório, nem o formatar ao salvar do editor (Cursor, VS Code). Não há config de prettier, e o padrão de 80 colunas reformata arquivos que não são do pedido: o #181 entrou com cerca de 46 linhas só de formatação. Antes de cada commit:

```bash
git diff --stat origin/main
```

A lista tem de trazer só os arquivos do pedido. Se aparecer outro, desfaça a mudança nele. Gerar JSON por script (`json.dump` do Python) também desdobra objetos de uma linha: preserve o formato do arquivo.

## Padrões que se repetem

- **`data-slot` em cada peça**, como no shadcn v4. O pai estiliza a peça pelo `data-slot` ou por grupo: `has-[[data-slot][readonly]]` (InputGroup), `group-data-[size=xs]/item:text-xs` (Item).
- **Somente leitura pelo atributo `[readonly]`**, não por `:read-only`, que também casa com `disabled` e com `type=file`.
- **Link e botão dentro de outro componente** (renderizadores da Table, link do Badge) usam o anel do Button: `focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-ring-offset`. É o que o dono do DS escolheu nas últimas pendências; proponha como recomendação, não aplique sem decisão.
- **Aviso no console para combinação inválida que o tipo não trava** (tratamento "avisar no console" do artigo). Só em desenvolvimento, em pt-BR, começando pelo nome do componente e dizendo o que fazer. Modelo do Item:

```tsx
React.useEffect(() => {
  if (process.env.NODE_ENV === "production" || !clickable) return;
  const control = actionsRef.current?.querySelector(
    "button, a[href], input, select, textarea, [tabindex]",
  );
  if (control) {
    console.warn(
      "Item: controle em actions dentro de um Item clicável (href ou interactive) é um controle dentro de outro. Tire o botão ou o clique do Item.",
    );
  }
});
```

- **Impacto em outros componentes.** Antes de escrever no PR ou no changeset que a mudança chega a outro componente, ache os consumidores e leia o `className` que cada um passa. O DataTable sobrescreve as classes de cabeçalho e célula da Table, e a densidade nova não chega nele.

## Changeset

Um arquivo em `design-system/.changeset/<nome>-<assunto>.md`, no formato dos que já existem (veja os da pasta ou o `CHANGELOG.md` do pacote): pacotes e bump no frontmatter, título em negrito, bullets por pacote com o porquê e o número medido, e uma linha **Quebra:** com como migrar, quando houver. Mudança só em story, mapa de tokens ou teste não muda o pacote publicado e dispensa changeset.

## Commit e PR

Commits pequenos no padrão do histórico: `fix(ui): …`, `feat(tokens): …`, `fix(ui,tokens): …`, em português. Push da branch e PR para `main` com `gh pr create`, descrição em português com o que mudou, as medições e como testar. Depois, `get_status`/`bind_pr` das ferramentas ccd_pr.

**Nunca mergeie sem pedido.** Quem mergeia é o dono do DS. Depois do merge, a doc (Figma e artigo) cita o número do PR.

Uma mudança que entrou numa branch cujo PR já foi mergeado não chega à main: precisa de PR novo.
