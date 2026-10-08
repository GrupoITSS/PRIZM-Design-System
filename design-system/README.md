# Design System

Monorepo do design system: tokens gerados a partir do Figma, componentes React e documentação em Storybook.

Storybook publicado: https://grupoitss.github.io/PRIZM-Design-System/ (atualizado a cada merge na `main`).

Ferramentas:

- [Turborepo](https://turborepo.dev) — orquestra build, dev e lint entre os pacotes, com cache
- [pnpm workspaces](https://pnpm.io/workspaces) — instala e liga os pacotes entre si (`workspace:*`)
- [Style Dictionary](https://styledictionary.com) + [Tokens Studio](https://tokens.studio) — transforma os tokens do Figma em CSS, JS e preset Tailwind
- [tsdown](https://tsdown.dev) — compila os componentes React
- [Storybook](https://storybook.js.org) — documentação e playground dos componentes
- [Changesets](https://github.com/changesets/changesets) — versionamento e changelog

## Estrutura

| Caminho | Pacote | Descrição |
|---|---|---|
| `packages/tokens` | `@grupoitss/prizm-tokens` | Design tokens (ver [README](packages/tokens/README.md)) |
| `packages/ui` | `@grupoitss/prizm-ui` | Componentes React (ver [README](packages/ui/README.md)) |
| `apps/docs` | `docs` | Storybook |
| `packages/eslint-config` | `@repo/eslint-config` | Configurações de ESLint compartilhadas |
| `packages/typescript-config` | `@repo/typescript-config` | `tsconfig`s compartilhados |

## Comandos

Rode na pasta `design-system/`:

- `pnpm install` — instala as dependências
- `pnpm dev` — gera tokens e componentes uma vez, deixa os dois em watch e abre o Storybook em `localhost:6006` (funciona também num clone novo)
- `pnpm build` — build de todos os pacotes, incluindo o Storybook estático
- `pnpm lint` — lint de todos os pacotes
- `pnpm typecheck` — checagem de tipos do `@grupoitss/prizm-ui` e das stories
- `pnpm test` — teste de aceite dos tokens (`packages/tokens/build.test.mjs`)
- `pnpm preview-storybook` — serve o Storybook estático gerado pelo build
- `pnpm changeset` — registra uma mudança para o próximo versionamento
- `pnpm clean` — apaga `node_modules`, `dist` e caches

Para rodar a tarefa de um pacote só: `pnpm turbo run build --filter=@grupoitss/prizm-tokens`.

## Adicionando um componente

1. Crie o arquivo em `packages/ui/src/` (ex.: `input.tsx`).
2. Adicione-o em `entry` no `packages/ui/tsdown.config.ts`.
3. Exporte-o em `exports` no `packages/ui/package.json`:

   ```json
   "./input": {
     "import": { "types": "./dist/input.d.mts", "default": "./dist/input.mjs" },
     "require": { "types": "./dist/input.d.cts", "default": "./dist/input.cjs" }
   }
   ```

4. Crie a story em `apps/docs/stories/` (ex.: `input.stories.tsx`).
5. Rode `pnpm changeset`, escolha `@grupoitss/prizm-ui` e `minor`, e descreva o componente novo. O arquivo gerado em `.changeset/` vai junto na PR.

## Publicação

`@grupoitss/prizm-tokens` e `@grupoitss/prizm-ui` são publicados no GitHub Packages pelo workflow **Publicar pacotes** (`.github/workflows/release.yml`):

1. A cada merge na `main`, os changesets pendentes viram (ou atualizam) a PR **"chore: versão dos pacotes"**, com as versões novas e o CHANGELOG. Mudanças de tokens vindas do Figma ganham changeset automático (major se um token sumiu, minor se entrou token, patch se só mudaram valores); mudanças nos componentes precisam de `pnpm changeset` na PR.
2. Ao mergear essa PR, os pacotes são publicados e cada um ganha um GitHub Release. O release dos tokens leva os zips de Android e iOS.

Como instalar nos apps: ver os READMEs de [`tokens`](packages/tokens/README.md#instalação) e [`ui`](packages/ui/README.md#instalação).
