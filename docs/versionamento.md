# Política de versionamento

Como numeramos as versões do PRIZM, o que cada número significa e como avisamos quem usa quando algo quebra. Vale para os dois pacotes publicados no GitHub Packages:

| Pacote | O que é | Quem usa |
|---|---|---|
| `@grupoitss/prizm-tokens` | Design tokens (CSS, Tailwind, TypeScript, Android, iOS) | Apps web, Android e iOS |
| `@grupoitss/prizm-ui` | Componentes React | Apps web em React |

Cada pacote tem a **própria versão**. Eles são independentes: o `prizm-ui` não declara o `prizm-tokens` como dependência (o app instala os dois).

## O que significa cada número

Seguimos o [versionamento semântico](https://semver.org/lang/pt-BR/): `MAJOR.MINOR.PATCH`.

| Número | Significa | Para quem usa |
|---|---|---|
| **MAJOR** (`4.0.0`) | Mudança que **quebra** quem usa | Ler a nota de migração e ajustar o app antes de atualizar |
| **MINOR** (`4.1.0`) | Algo **novo**, sem quebrar o que existe | Atualizar é seguro; o novo está disponível |
| **PATCH** (`4.1.1`) | Correção ou ajuste, sem mudar a API | Atualizar é seguro |

## `@grupoitss/prizm-tokens`

| Mudança | Versão |
|---|---|
| Um token **deixa de existir** em todos os sets | **major** |
| **Renomear** uma variável CSS, um recurso Android, um enum Swift ou o prefixo (ex.: `--color-primary` → `--prizm-color-primary`) | **major** |
| Remover um tema (marca ou produto) ou um arquivo/caminho publicado (`exports` do pacote) | **major** |
| Token, set ou tema **novo** (inclui marca ou produto novos) | **minor** |
| Tema (`$themes`) criado ou alterado | **minor** |
| Só **valores** alterados (inclui cores, tamanhos, fontes, e o valor de um primitivo) | **patch** |
| Correção no build que não muda a saída | **patch** |
| Renomear, criar ou apagar um **primitivo** (`global/primitives`) | não muda a saída: primitivos não saem. Se a troca mudar referências em outros tokens, o script gera um **patch**, o que é inofensivo |

**Mudança de valor é patch**, mesmo em cores. É a regra de hoje e pode ser revista: trocar a cor principal de uma marca é uma mudança visual grande, que o patch não destaca.

### Como a versão dos tokens é decidida

- **Automática, para os syncs do Figma.** A cada merge na `main`, o script `.github/scripts/tokens-changeset.mjs` compara o `tokens.json` com o da **última versão publicada** e gera o changeset conforme a tabela acima. O resumo (`+113 adicionados · ~34 alterados · −10 removidos`) vai para o `CHANGELOG`.
- **Manual, para o que o script não enxerga.** Ele só compara o `tokens.json`. Renomeação de variáveis, remoção de um tema, mudança no build e mudança nos caminhos publicados exigem `pnpm changeset` na própria PR, escolhendo o tipo de versão. Enquanto houver um changeset pendente dos tokens, o script não gera o dele: **escreva o resumo no seu changeset**.

## `@grupoitss/prizm-ui`

| Mudança | Versão |
|---|---|
| **Remover ou renomear** componente, variante, tamanho ou prop | **major** |
| Mudar o **comportamento** ou o valor padrão de uma prop de um jeito que afeta quem usa | **major** |
| Subir a **versão mínima do React** (`peerDependencies`) | **major** |
| Componente, variante, tamanho ou prop **novos** | **minor** |
| **Correção** de bug | **patch** |
| **Ajuste visual** que não muda a API (ex.: hover de 90% para 80%) | **patch** |
| Correção de **acessibilidade** que não muda a API | **patch** |
| Só documentação, stories ou testes | nenhuma |

- Toda mudança em componente precisa de um changeset: `pnpm changeset`, escolhendo `@grupoitss/prizm-ui` e o tipo.
- Se um componente passar a depender de um **token novo**, a nota do changeset diz a versão mínima do `prizm-tokens` necessária, porque o `prizm-ui` não declara essa dependência.
- **Enquanto o `prizm-ui` estiver em `0.x`:** valem as mesmas regras da tabela. **A definir:** o critério para a `1.0.0`, e se, até lá, o que seria major entra como minor. O Changesets leva uma mudança major de `0.x` direto para a `1.0.0`.

## Como uma versão sai

1. A PR traz o changeset (manual nos componentes e nas mudanças que o script não vê; automático nos syncs do Figma).
2. Ao mergear na `main`, o workflow **Publicar pacotes** abre ou atualiza a PR **"chore: versão dos pacotes"**, com as versões novas e o `CHANGELOG`.
3. Mergear essa PR **publica** os pacotes, cria a tag (`@grupoitss/prizm-tokens@4.0.0`) e um GitHub Release por pacote. O release dos tokens leva os zips de Android e iOS.

Regras:
- **Depois de mergear uma PR na `main`, espere a PR de versão ser atualizada** (1 a 2 minutos) antes de mergeá-la. Se ela for mergeada antes, sai uma versão sem a mudança, ou pula um número (a `2.0.0` dos tokens nunca foi publicada por isso).
- **Não edite a versão no `package.json` à mão**: ela só muda pela PR de versão.

## Nota de migração (breaking change)

**Toda versão major leva uma nota de migração**, escrita no próprio changeset: ela vira o `CHANGELOG` e as notas do release. Modelo:

```markdown
**<A mudança, em uma frase>**

**Quem é afetado:** <quem usa o quê>. **Não é afetado:** <quem não precisa fazer nada>.

| Antes | Depois |
|---|---|
| `nome-antigo` | `nome-novo` |

**Como migrar:**
1. <passo concreto, de preferência com um buscar-e-substituir>
2. <...>

**Não muda:** <o que continua igual, para tranquilizar quem usa>.
```

Pontos que a nota precisa ter:
- **Quem é afetado, e quem não é.** Os tokens têm consumidores bem diferentes (web, Android, iOS), e a maioria não é afetada por uma mudança que mexe só em uma plataforma.
- **Antes e depois**, com os nomes exatos.
- **Passos de migração** que dê para executar, sem depender de ler o código.
- **O que não muda.**

Exemplo real, a `4.0.0` dos tokens:

> **Prefixo `prizm` também no Android e no iOS**, onde o nome é compartilhado com o app inteiro.
> - **Android:** os recursos passam a `prizm_color_primary`, `prizm_radius_md`… e os arquivos a `prizm_colors.xml`, `prizm_tokens.xml` e `prizm_platform.xml`.
> - **iOS:** os enums passam a `PrizmDocnixLight`, `PrizmDocnixDark`… As propriedades não mudam (`colorPrimary`).
>
> Não mudam: o CSS, o preset do Tailwind, o TypeScript e os valores de qualquer token.

## Histórico de versões

| Versão | Data | Tipo | Motivo |
|---|---|---|---|
| tokens `0.1.0` | 08/10/2026 | minor | Primeira publicação |
| ui `0.1.0` | 08/10/2026 | minor | Primeira publicação (Button) |
| tokens `0.2.0` | 09/10/2026 | minor | Temas alterados, nenhum valor |
| tokens `0.3.0` | 13/10/2026 | minor | 11 sets novos |
| tokens `1.0.0` | 13/10/2026 | major | Sombras (`shadow.*`, `inset-shadow.*`, `drop-shadow.*`) deixaram de existir |
| tokens `3.0.0` | 14/10/2026 | major | Prefixo `--prizm-` no CSS; tokens `warning-moderate` removidos |
| ui `0.1.1` | 14/10/2026 | patch | Hover do Button a 80% |
| tokens `4.0.0` | 14/10/2026 | major | Prefixo `prizm` no Android e no iOS |

A `2.0.0` dos tokens nunca foi publicada.

## Para quem usa os pacotes

- Antes de subir uma **major**, leia a nota no [CHANGELOG](../design-system/packages/tokens/CHANGELOG.md) ou nos [Releases](https://github.com/GrupoITSS/PRIZM-Design-System/releases).
- Para ser avisado de versões novas: no GitHub, **Watch > Custom > Releases**.
- Android e iOS baixam os zips do release dos tokens (ver o [README dos tokens](../design-system/packages/tokens/README.md#instalação)).
