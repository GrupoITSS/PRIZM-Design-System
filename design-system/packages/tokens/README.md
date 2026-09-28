# `tokens`

Design tokens do design system, gerados com [Style Dictionary](https://styledictionary.com) a partir do export do Tokens Studio (Figma).

## Fonte

`src/tokens-studio/tokens.json` — export do Tokens Studio no formato DTCG (`$value`/`$type`). Os temas e sets são lidos do próprio arquivo (`$themes[].selectedTokenSets`), sem nada fixo no código.

Os temas são organizados em três dimensões, combinadas entre si:

| Grupo no Tokens Studio | Opções | Sets |
|---|---|---|
| **Marca · Produto** | PAS · Cockpit, Docnix · MaxDoc, … | `global/foundations/*` + `brand/<marca>/base/*` + `brand/<marca>/<produto>` |
| **Mode** | Light, Dark | `global/mode/<modo>` |
| **Plataforma** | Desktop, Mobile | `global/platform/<plataforma>` |

Os sets `global/primitives/*` são **source**: servem só para resolver referências e não vão para a saída. Um token que aponta para um primitivo sai com o valor já resolvido; um token que aponta para outro token exportado sai como `var(--...)`.

## Comandos

- `pnpm build` — gera os arquivos em `dist/`
- `pnpm dev` — gera e observa `src/tokens-studio`, refazendo o build a cada alteração

## Saída (`dist/`)

| Pasta | Formato | Valores |
|---|---|---|
| `css/` | Variáveis CSS | Referências `var(--...)`, trocadas em tempo real por produto, modo e plataforma |
| `tailwind/` | Preset do Tailwind | Apontam para as variáveis CSS |
| `ts/` | ES modules + `.d.ts` | `vars.js` aponta para as variáveis CSS; `<produto>/` tem os valores resolvidos |
| `android/` | Resources XML | Resolvidos por produto, em `dp`/`sp` |
| `ios/` | Swift (SwiftUI) | Resolvidos por produto, em `CGFloat` e `Color` |

Nas saídas nativas, 1px do Figma = 1dp (Android) = 1pt (iOS). Sombras (valores compostos) só existem nas saídas web.

### CSS

| Arquivo | Seletor | Conteúdo |
|---|---|---|
| `css/foundations.css` | `:root` | Palette, fontes e radius padrão (`global/foundations/*`) |
| `css/products/<produto>.css` | `:root[data-product="<produto>"]` | O que a marca e o produto sobrescrevem |
| `css/modes/light.css` | `:root` | Cores semânticas (`--color-*`) do modo claro, padrão |
| `css/modes/dark.css` | `:root.dark` | Cores semânticas do modo escuro |
| `css/platforms/desktop.css` | `@media (width >= 768px)` | Espaçamentos e headings de desktop |
| `css/platforms/mobile.css` | `@media (width < 768px)` | Espaçamentos e headings de mobile |
| `css/index.css` | — | `@import` de todos os arquivos acima |
| `tailwind/preset.cjs` | — | Preset do Tailwind apontando para as variáveis CSS |

O breakpoint das plataformas vem do token `breakpoint.md`. Os seletores têm especificidade suficiente para que a ordem de import não importe.

### TypeScript (`ts/`)

- `vars.js` — cada token como referência à variável CSS (`colorPrimary = 'var(--color-primary)'`). É o que usar em estilos inline e CSS-in-JS, porque continua seguindo o tema ativo.
- `<produto>/index.js` — valores resolvidos, separados em camadas como no CSS: `light` e `dark` (tudo o que o produto mostra naquele modo) e `desktop` e `mobile` (só os tokens de plataforma). Útil onde CSS não chega (canvas, gráficos, e-mail).

```ts
import { colorPrimary } from 'tokens/dist/ts/vars.js';
import { light, desktop } from 'tokens/dist/ts/pas-cockpit/index.js';

const theme = { ...light, ...desktop };
```

### Android (`android/<produto>/`)

Copie a pasta do produto para `res/`. O Android escolhe o arquivo sozinho pelos qualificadores:

| Pasta | Quando vale | Conteúdo |
|---|---|---|
| `values/` | Sempre (padrão) | `colors.xml` (modo claro), `tokens.xml` (fontes, radius...), `platform.xml` (mobile) |
| `values-night/` | Dark mode do sistema | `colors.xml` do modo escuro |
| `values-w768dp/` | Largura ≥ breakpoint `md` | `platform.xml` de desktop |

Tamanhos de texto saem em `sp` (seguem o tamanho de fonte do usuário); os demais, em `dp`. Uso: `@color/color_primary`, `@dimen/radius_md`.

### iOS (`ios/<produto>/`)

Um `public enum` por camada, com `Color` do SwiftUI e `CGFloat`: `PasCockpitLight`, `PasCockpitDark`, `PasCockpitMobile`, `PasCockpitDesktop`.

```swift
Text("Olá")
    .foregroundStyle(colorScheme == .dark ? PasCockpitDark.colorPrimary : PasCockpitLight.colorPrimary)
    .padding(PasCockpitMobile.containerPaddingX)
```

## Uso na web

Importe o CSS (tudo com `index.css`, ou só o produto que a aplicação usa) e marque o `<html>`:

```html
<html data-product="pas-cockpit" class="dark">
```

- `data-product` escolhe a marca/produto. Precisa estar no `<html>`, porque as cores do modo são calculadas ali a partir da palette do produto.
- A classe `dark` ativa o modo escuro. Sem ela, vale o modo claro.
- Desktop e mobile trocam sozinhos pela largura da tela.

Os comentários de `build.mjs` documentam as regras de agrupamento, as referências quebradas e os avisos do Style Dictionary.
