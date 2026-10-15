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
| Um valor muda de **tipo**, de **forma** (simples × composto) ou de **unidade** (ex.: `sizing` → `fontSizes`, `16px` → `1rem`) | **major** |
| Token, set ou tema **novo** (inclui marca ou produto novos) | **minor** |
| Tema (`$themes`) criado ou alterado | **minor** |
| **Mudança visual intencional e perceptível**: nova cor de marca, troca de escala, nova fonte | **minor** (changeset manual) |
| Só **valores** alterados: ajuste ou correção de cor, tamanho, raio, fonte (inclui o valor de um primitivo) | **patch** |
| Correção no build que não muda a saída | **patch** |
| Renomear, criar ou apagar um **primitivo** (`global/primitives`) | não muda a saída: primitivos não saem. Se a troca mudar referências em outros tokens, o script gera um **patch**, o que é inofensivo |

### Mudança de valor: patch, minor ou major?

Num pacote de tokens, o que o app usa no código são os **nomes** (`--prizm-color-primary`, `prizm_color_primary`, `PrizmDocnixLight`). Trocar o valor não quebra nada: o app compila e roda igual, só muda a aparência. Por isso:

- **Patch é o padrão.** É o que o script gera para qualquer valor alterado, e é o que chega sozinho aos apps que instalam com `^4.0.0`, junto com as correções.
- **Minor quando a mudança visual é intencional e grande** (nova cor de marca, troca de escala, nova fonte). Assim ela aparece no `CHANGELOG` como novidade, com uma nota "mudança visual: o que muda e em quais temas", em vez de passar como correção. O script não distingue um ajuste fino de um redesign, então esse changeset é escrito à mão (ver abaixo).
- **Major só quando o valor muda de natureza**: outro tipo, simples virando composto (ou o contrário), outra unidade. Aí quebra de verdade: o Android e o iOS geram saída tipada (`dp` × `sp`, `CGFloat` × `Color`) e leem só o número (`1rem` viraria `1dp`). O script detecta esses casos e gera major.

Major para toda mudança de valor seria pior: cada ajuste no Figma viraria uma versão major, quem usa aprenderia a ignorá-las e os apps deixariam de receber as correções automaticamente.

### Como a versão dos tokens é decidida

- **Automática, para os syncs do Figma.** A cada merge na `main`, o script `.github/scripts/tokens-changeset.mjs` compara o `tokens.json` com o da **última versão publicada** e gera o changeset conforme a tabela acima: major se um token sumiu ou mudou de tipo/unidade, minor se entrou token, set ou tema, patch nos demais casos. O resumo (`+113 adicionados · ~34 alterados · −10 removidos`) vai para o `CHANGELOG`.
- **Manual, para o que o script não enxerga.** Ele só compara o `tokens.json`. Mudança visual intencional, renomeação de variáveis, remoção de um tema, mudança no build e mudança nos caminhos publicados exigem `pnpm changeset`, escolhendo o tipo de versão. Enquanto houver um changeset pendente dos tokens, o script não gera o dele: **escreva o resumo no seu changeset** e escolha o maior tipo que se aplica (se o mesmo sync também apaga um token, é major).
- **Mudança visual num sync do Figma.** A PR `design → main` entra sozinha assim que o check passa, então o changeset manual precisa chegar à branch `design` **antes do push do Tokens Studio**: rode `pnpm changeset` (pacote `@grupoitss/prizm-tokens`, tipo `minor`), descreva a mudança visual ("o que muda e em quais temas"), faça commit e push na `design` e só então faça o push no Tokens Studio. O commit do changeset sozinho não dispara a PR (o workflow só olha `packages/tokens/src/`); o sync seguinte leva os dois para a `main`, e o script respeita o changeset manual.

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
- **Compatibilidade com os tokens.** Os componentes usam classes do Tailwind (como `bg-primary` e `h-control-height-md`) que só funcionam se o `prizm-tokens` instalado no app tiver o token correspondente, e o `prizm-ui` não declara o `prizm-tokens` como dependência (o npm não avisa de incompatibilidade). Por isso, se um componente passar a usar um token que **só existe numa versão recente dos tokens**, a nota do changeset diz a **versão mínima dos tokens**. Exemplo ilustrativo: "Requer `@grupoitss/prizm-tokens` 4.1.0 ou superior (token `success`)". Sem esse aviso, o app que atualiza só o `prizm-ui` fica com o componente sem a cor, e nada acusa erro.
- **Critério para a `1.0.0`:** a biblioteca só é considerada completa quando **todos os componentes do shadcn/ui estiverem no Storybook**. A lista de referência é a da documentação do shadcn/ui: https://ui.shadcn.com/docs/components.
- **Até a `1.0.0`**, uma mudança que seria major (ver a tabela acima) entra como **minor** (`0.2.0`, `0.3.0`…), sempre com a nota de migração. Isso evita que o Changesets, que leva uma mudança major de `0.x` direto para a `1.0.0`, publique a `1.0.0` antes de a biblioteca estar completa. A `1.0.0` é publicada de propósito, com um changeset major escrito para isso.

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
