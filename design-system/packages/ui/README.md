# `@grupoitss/prizm-ui`

Componentes React do PRIZM. Documentação e exemplos: https://grupoitss.github.io/PRIZM-Design-System/

Os componentes são estilizados com classes do Tailwind que apontam para os design tokens, então o app precisa de **React 19**, **Tailwind CSS v4** e **`@grupoitss/prizm-tokens`**.

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

/* Classes usadas pelos componentes (o Tailwind não varre node_modules sozinho). */
@source "../node_modules/@grupoitss/prizm-ui/dist";
```

Os caminhos de `@config` e `@source` são relativos ao arquivo CSS; ajuste conforme a pasta dele.

No `<html>`, a marca, o produto, o modo e a plataforma:

```html
<html data-brand="docnix" data-mode="light" data-platform="desktop">
```

## Uso

```tsx
import { Button } from "@grupoitss/prizm-ui/button";

<Button variant="outline" size="sm">Cancelar</Button>
```

Cada componente é importado pelo próprio caminho (`@grupoitss/prizm-ui/<componente>`).
