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

Lint e `tsc` do app `docs` (stories) acusam erros de tipo locais porque `@grupoitss/prizm-ui` não está compilado. Rode o mesmo comando no arquivo da main e compare: só conta o erro novo.

Escreva o teste que prova a correção (ex.: foco continua no botão em loading; aviso quando falta nome). Se algo não roda, diga qual comando e o erro; não declare verde.

## Changeset

Um arquivo em `design-system/.changeset/<nome>-<assunto>.md`, no formato dos que já existem (veja os da pasta ou o `CHANGELOG.md` do pacote): pacotes e bump no frontmatter, título em negrito, bullets por pacote com o porquê e o número medido, e uma linha **Quebra:** com como migrar, quando houver. Mudança só em story, mapa de tokens ou teste não muda o pacote publicado e dispensa changeset.

## Commit e PR

Commits pequenos no padrão do histórico: `fix(ui): …`, `feat(tokens): …`, `fix(ui,tokens): …`, em português. Push da branch e PR para `main` com `gh pr create`, descrição em português com o que mudou, as medições e como testar. Depois, `get_status`/`bind_pr` das ferramentas ccd_pr.

**Nunca mergeie sem pedido.** Quem mergeia é o dono do DS. Depois do merge, a doc (Figma e artigo) cita o número do PR.

Uma mudança que entrou numa branch cujo PR já foi mergeado não chega à main: precisa de PR novo.
