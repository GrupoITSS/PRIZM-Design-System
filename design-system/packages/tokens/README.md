# `tokens`

Design tokens do design system, gerados com [Style Dictionary](https://styledictionary.com) a partir do export do Tokens Studio (Figma). A arquitetura está descrita em [`arquitetura.md`](../../../arquitetura.md), na raiz do repositório.

## Fonte

`src/tokens-studio/tokens.json` — export do Tokens Studio no formato DTCG (`$value`/`$type`), com os sets nomeados pela árvore de herança. Quem vem depois sobrescreve:

| Set | Conteúdo |
|---|---|
| `global/primitives` | Valores crus. **Nunca vai para a saída**; só resolve valores |
| `global/foundations` | Padrões comuns a todas as marcas |
| `<marca>/base` | Tema da marca |
| `<marca>/<produto>` | **Só** o que o produto sobrescreve da base |
| `themes/light`, `themes/dark` | `color.<papel>` → `{palette.<papel>.light\|dark}` |
| `platforms/desktop`, `platforms/mobile` | Espaçamentos e estilos de texto por plataforma |

Marcas e produtos hoje:

- `pas/base` + `pas/cms` (o CMS altera só cores);
- `itss/base` + `itss/afipe` + `itss/digitrol` (a base tem o que é comum aos dois; cada produto, o que difere);
- `docnix/base` (os produtos não sobrescrevem nada, então não têm set);
- `tchello/base` herda o `pas/base` até ter dados próprios (o tema Tchello habilita `pas/base` e `tchello/base`).

Os temas do Tokens Studio (`$themes`) combinam três grupos: **Theme** (PAS, PAS · CMS, Tchello, Docnix, ITSS · AFIPE, ITSS · Digitrol), **Mode** (Light, Dark) e **Platform** (Desktop, Mobile). Até 07/10 os grupos se chamavam Marca · Produto e Plataforma; o build ainda aceita os dois nomes. O build lê marcas, produtos, modos e plataformas dos nomes dos sets e dos temas, sem nada fixo no código.

Sombras e tipografias compostas (que o Figma não exporta como variáveis) são tokens do Tokens Studio, junto dos seus átomos: `style.shadow.*` nos sets de marca e `style.heading.*` nos de plataforma.

## Comandos

- `pnpm build` — gera os arquivos em `dist/`
- `pnpm dev` — gera e observa `src/tokens-studio`, refazendo o build a cada alteração
- `pnpm test` — gera e roda o teste de aceite (`build.test.mjs`): cada combinação marca · produto × modo × plataforma, aplicando as camadas do CSS em cascata, tem de dar os mesmos valores que o export achatado do Tokens Studio; e nenhum produto pode repetir um valor da base. O check "Validar tokens" roda o mesmo teste em toda PR.

## Saída (`dist/`)

| Pasta | Formato | Valores |
|---|---|---|
| `css/` | Variáveis CSS, uma camada por set | Referências `var(--...)`, trocadas em tempo real por marca, produto, modo e plataforma |
| `tailwind/` | Preset do Tailwind | Apontam para as variáveis CSS |
| `ts/` | ES modules + `.d.ts` | `vars.js` aponta para as variáveis CSS; `<tema>/` tem os valores resolvidos |
| `android/` | Resources XML | Resolvidos por tema de marca, em `dp`/`sp` |
| `ios/` | Swift (SwiftUI) | Resolvidos por tema de marca, em `CGFloat` e `Color` |

Nas saídas nativas, 1px do Figma = 1dp (Android) = 1pt (iOS). Sombras (valores compostos) só existem nas saídas web. Primitivos não vão para nenhuma saída.

### CSS

A saída espelha a árvore: cada arquivo tem só os tokens do seu set.

| Arquivo | Seletor |
|---|---|
| `css/foundations.css` | `:root` |
| `css/<marca>/base.css` | `[data-brand="<marca>"]` |
| `css/<marca>/<produto>.css` | `[data-brand="<marca>"][data-product="<produto>"]` |
| `css/themes/light.css`, `css/themes/dark.css` | `[data-mode="light"]`, `[data-mode="dark"]` |
| `css/platforms/desktop.css`, `css/platforms/mobile.css` | `[data-platform="desktop"]`, `[data-platform="mobile"]` |
| `css/index.css` | `@import` de todos, na ordem da cadeia |
| `tailwind/preset.cjs` | Preset do Tailwind apontando para as variáveis CSS |

Referências viram `var(--...)`, exceto as que apontam para primitivos (saem resolvidas). Sombras são escritas campo a campo (`var(--shadow-xs-1-offset-x) var(--shadow-xs-1-offset-y) …`), para continuarem certas quando uma camada sobrescreve um átomo.

### TypeScript (`ts/`)

- `vars.js` — cada token como referência à variável CSS (`colorPrimary = 'var(--color-primary)'`). É o que usar em estilos inline e CSS-in-JS, porque continua seguindo o tema ativo.
- `<tema>/index.js` — valores resolvidos de um tema de marca (`pas`, `pas-cms`, `tchello`, `docnix`, `itss-afipe`, `itss-digitrol`), separados em camadas: `light` e `dark` (tudo o que o tema mostra naquele modo) e `desktop` e `mobile` (só os tokens de plataforma). Útil onde CSS não chega (canvas, gráficos, e-mail).

```ts
import { colorPrimary } from 'tokens/dist/ts/vars.js';
import { light, desktop } from 'tokens/dist/ts/pas-cms/index.js';

const theme = { ...light, ...desktop };
```

### Android (`android/<tema>/`)

Copie a pasta do tema para `res/`. O Android escolhe o arquivo sozinho pelos qualificadores:

| Pasta | Quando vale | Conteúdo |
|---|---|---|
| `values/` | Sempre (padrão) | `colors.xml` (modo claro), `tokens.xml` (fontes, radius...), `platform.xml` (mobile) |
| `values-night/` | Dark mode do sistema | `colors.xml` do modo escuro |
| `values-w768dp/` | Largura ≥ breakpoint `md` | `platform.xml` de desktop |

Tamanhos de texto saem em `sp` (seguem o tamanho de fonte do usuário); os demais, em `dp`. Uso: `@color/color_primary`, `@dimen/radius_md`. O breakpoint vem do token `breakpoint.md`.

### iOS (`ios/<tema>/`)

Um `public enum` por camada, com `Color` do SwiftUI e `CGFloat`: `PasCmsLight`, `PasCmsDark`, `PasCmsMobile`, `PasCmsDesktop`.

```swift
Text("Olá")
    .foregroundStyle(colorScheme == .dark ? PasCmsDark.colorPrimary : PasCmsLight.colorPrimary)
    .padding(PasCmsMobile.containerPaddingX)
```

## Uso na web

Importe o CSS (tudo com `index.css`, ou só as camadas que a aplicação usa) e marque o `<html>`:

```html
<html data-brand="pas" data-product="cms" data-mode="dark" data-platform="desktop">
```

- `data-brand` escolhe a marca e `data-product` o produto (opcional: sem ele, vale a base da marca; produtos sem set próprio, como os do Docnix, não precisam dele).
- `data-mode` e `data-platform` escolhem modo e plataforma. A troca é por cascata, como os modos do Figma.
- Coloque todos os atributos **no mesmo elemento** (o `<html>`): as cores do modo apontam para a palette da marca, e uma variável CSS é resolvida no elemento em que é declarada.

Os comentários de `build.mjs` documentam as regras das camadas, as referências quebradas e os avisos do Style Dictionary.
