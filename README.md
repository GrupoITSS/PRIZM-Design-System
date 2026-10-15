# PRIZM Design System

Design system multimarca: tokens gerados a partir do Figma, componentes React e documentação em Storybook. Cada marca e produto (PAS, PAS · CMS, Tchello, Docnix, ITSS · AFIPE, ITSS · Digitrol) tem o próprio tema, em light e dark, para desktop e mobile.

| | |
|---|---|
| **Storybook** | https://grupoitss.github.io/PRIZM-Design-System/ (atualizado a cada merge na `main`) |
| **Pacotes** | [`@grupoitss/prizm-tokens`](design-system/packages/tokens/README.md) e [`@grupoitss/prizm-ui`](design-system/packages/ui/README.md), no GitHub Packages |
| **Versões e arquivos para Android e iOS** | [Releases](https://github.com/GrupoITSS/PRIZM-Design-System/releases) |

## Como funciona

1. O design edita as variáveis no **Figma** e sincroniza pelo **Tokens Studio**, que faz push na branch `design`.
2. Uma **PR automática** leva a mudança para a `main`: converte para o formato W3C DTCG se precisar, valida o build e entra sozinha (exceto quando apaga tokens, que espera revisão).
3. Na `main`, o build gera os tokens (CSS, Tailwind, TypeScript, Android, iOS) e o **Storybook** é publicado.
4. A cada mudança, a PR **"chore: versão dos pacotes"** acumula as versões novas. Mergeá-la **publica** os pacotes.

## Estrutura do repositório

```
.
├── .github/
│   ├── workflows/              # automações (tabela abaixo)
│   └── scripts/                # usados pelos workflows: diff de tokens, conversão para DTCG,
│                               # versão automática dos tokens e corpo da PR de tokens
├── .claude/settings.json       # permissões compartilhadas do Claude Code
├── CLAUDE.md                   # instruções do projeto para o Claude Code
├── docs/
│   ├── versionamento.md        # política de versionamento (semver) e nota de migração
│   └── ai/                     # registro de decisões e de andamento do projeto
└── design-system/              # o monorepo (pnpm + Turborepo): rode os comandos aqui
    ├── apps/
    │   └── docs/               # Storybook
    │       ├── .storybook/     # configuração e barra de marca, modo e plataforma
    │       └── stories/        # uma story por componente
    ├── packages/
    │   ├── tokens/             # @grupoitss/prizm-tokens
    │   │   ├── src/tokens-studio/tokens.json   # fonte, sincronizada pelo Tokens Studio
    │   │   ├── build.mjs       # build do Style Dictionary
    │   │   ├── build.test.mjs  # teste de aceite das camadas
    │   │   ├── arquitetura.md  # árvore de herança dos sets
    │   │   └── dist/           # gerado: css, tailwind, ts, android, ios
    │   ├── ui/                 # @grupoitss/prizm-ui
    │   │   ├── src/            # um arquivo por componente (button.tsx)
    │   │   └── src/lib/        # utilitários compartilhados (cn)
    │   ├── eslint-config/      # @repo/eslint-config (regras compartilhadas)
    │   └── typescript-config/  # @repo/typescript-config (tsconfigs compartilhados)
    ├── .changeset/             # mudanças pendentes de versão
    ├── .mcp.json               # servidores MCP do Claude Code
    ├── package.json            # scripts do monorepo
    ├── pnpm-workspace.yaml     # quais pastas são pacotes
    └── turbo.json              # ordem e cache das tarefas
```

`dist/`, `storybook-static/`, `node_modules/` e `.turbo/` são gerados e ficam fora do Git.

### Automações (`.github/workflows/`)

| Workflow | Quando roda | O que faz |
|---|---|---|
| **Tokens Studio PR** | Push na `design` | Converte para DTCG se precisar e abre ou atualiza a PR `design → main`, com merge automático |
| **Validar tokens** | Toda PR para a `main` | Formato DTCG, build do Style Dictionary sem referências quebradas e teste de aceite. **Obrigatório** |
| **Validar componentes** | Toda PR para a `main` | Lint, tipos e build do `@grupoitss/prizm-ui` e do Storybook. **Obrigatório** |
| **Design Tokens Notifications** | PRs e merges de tokens | Card no Teams com o que mudou |
| **Storybook no GitHub Pages** | Push na `main` | Publica o Storybook |
| **Publicar pacotes** | Push na `main` | Abre ou atualiza a PR de versão; quando ela é mergeada, publica os pacotes e cria os releases |

## Ferramentas

- [Turborepo](https://turborepo.dev): orquestra build, dev e lint entre os pacotes, com cache
- [pnpm workspaces](https://pnpm.io/workspaces): instala e liga os pacotes entre si (`workspace:*`)
- [Style Dictionary](https://styledictionary.com) + [Tokens Studio](https://tokens.studio): transformam os tokens do Figma em CSS, preset do Tailwind, TypeScript, Android e iOS
- [tsdown](https://tsdown.dev): compila os componentes React
- [Storybook](https://storybook.js.org): documentação e playground dos componentes
- [Changesets](https://github.com/changesets/changesets): versionamento e changelog

## Comandos

Rode na pasta `design-system/`:

- `pnpm install`: instala as dependências
- `pnpm dev`: gera tokens e componentes uma vez, deixa os dois em watch e abre o Storybook em `localhost:6006` (funciona também num clone novo)
- `pnpm build`: build de todos os pacotes, incluindo o Storybook estático
- `pnpm lint`: lint de todos os pacotes
- `pnpm typecheck`: checagem de tipos do `@grupoitss/prizm-ui` e das stories
- `pnpm test`: teste de aceite dos tokens (`packages/tokens/build.test.mjs`)
- `pnpm preview-storybook`: serve o Storybook estático gerado pelo build
- `pnpm changeset`: registra uma mudança para a próxima versão
- `pnpm clean`: apaga `node_modules`, `dist` e caches

Para rodar a tarefa de um pacote só: `pnpm turbo run build --filter=@grupoitss/prizm-tokens`.

## Adicionando um componente

Caminhos a partir de `design-system/`:

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

**Depois de mergear uma PR na `main`, espere a PR de versão ser atualizada (1 a 2 minutos) antes de mergeá-la.** Se ela for mergeada antes, sai uma versão sem a mudança.

O que é patch, minor e major em cada pacote, e como escrever a nota de migração de uma breaking change: [política de versionamento](docs/versionamento.md).

Como instalar nos apps: ver os READMEs de [`tokens`](design-system/packages/tokens/README.md#instalação) e [`ui`](design-system/packages/ui/README.md#instalação).
