# `@grupoitss/prizm-ui`

Componentes React do PRIZM. Documentação e exemplos: https://grupoitss.github.io/PRIZM-Design-System/

Os componentes são estilizados com classes do Tailwind que apontam para os design tokens, então o app precisa de **React 19**, **Tailwind CSS v4** e **`@grupoitss/prizm-tokens` 5.0.0 ou superior**.

## Instalação

Os pacotes ficam no GitHub Packages: instalar exige um token do GitHub com a permissão `read:packages`. No `.npmrc` do app:

```
@grupoitss:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

```sh
npm install @grupoitss/prizm-ui @grupoitss/prizm-tokens
```

## Configuração

No CSS de entrada do app (o que importa o Tailwind):

```css
@import "tailwindcss";

/* Tokens: uma camada por marca, produto, modo e plataforma. */
@import "@grupoitss/prizm-tokens/css";

/* Utilitários do Tailwind ligados aos tokens (bg-primary, h-control-height-md…). */
@config "../node_modules/@grupoitss/prizm-tokens/dist/tailwind/preset.cjs";

/* O que os componentes precisam além dos tokens: as classes deles (o Tailwind
   não varre node_modules sozinho), as animações (tw-animate-css), a cor de borda
   padrão e o utilitário custom-scroll. */
@import "@grupoitss/prizm-ui/styles.css";
```

O caminho de `@config` é relativo ao arquivo CSS; ajuste conforme a pasta dele.

As variáveis dos tokens têm o prefixo `--prizm-` (`var(--prizm-color-primary)`). Nas classes do Tailwind (`bg-primary`, `rounded-md`) o prefixo não aparece.

No `<html>`, a marca, o produto, o modo e a plataforma. Diálogos, menus, popovers e toasts são renderizados no fim do `<body>`, então os atributos ficam no `<html>`, não num elemento interno:

```html
<html data-brand="docnix" data-mode="light" data-platform="desktop">
```

## Uso

```tsx
import { Button } from "@grupoitss/prizm-ui/button";

<Button variant="outline" size="sm">Cancelar</Button>
```

Cada componente é importado pelo próprio caminho (`@grupoitss/prizm-ui/<componente>`), com o nome da pasta em `src/components` (`dialog`, `date-picker`…; o `DataTable` sai de `table`). Tudo também sai pela raiz (`@grupoitss/prizm-ui`).

O modo escuro vem dos tokens (`data-mode="dark"`); os componentes não usam a variante `dark:` do Tailwind.

## Componentes

Os componentes vieram do `@pas/ui` (repositório pas-ui do Azure DevOps), com os tokens do PRIZM: accordion, alert, alert-dialog, alert-message, aspect-ratio, avatar, badge, breadcrumb, button, button-group, calendar, card, carousel, chart, checkbox, collapsible, combobox, command, context-menu, date-picker, dialog, drawer, dropdown-menu, dropzone, empty, field, hover-card, icons, input, input-group, input-otp, item, kbd, label, masked-input, menubar, navigation-menu, pagination, photo-upload, popover, progress, radio-group, resizable, scroll-area, search-popover, select, separator, sheet, skeleton, slider, sonner, spinner, switch, table, tabs, textarea, toggle, toggle-group e tooltip.

Ícones: `@grupoitss/prizm-ui/icons` reexporta os do [lucide-react](https://lucide.dev) usados pelos componentes e tem três próprios no mesmo formato (`FileCsv`, `FileDoc`, `FilePdf`).

## Desenvolvimento

```sh
pnpm build   # dist/ (um arquivo por componente, ESM e CJS, com tipos)
pnpm test    # testes dos componentes (Vitest + Testing Library)
pnpm lint
pnpm typecheck
```

Cada componente fica em `src/components/<nome>/`: o componente, `*.styles.ts` (classes), `*.types.ts`, `*.test.tsx` e `index.ts` (o que é publicado). As stories ficam em `apps/docs/stories`. Um componente novo precisa do caminho dele em `exports` no `package.json`.
