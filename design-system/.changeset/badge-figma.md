---
"@grupoitss/prizm-ui": minor
---

**Badge: só as variantes do Figma, `verified`, `success`, `warning` e `shape="number"`**

O Figma é a fonte da verdade: o Badge passa a ter só o que o componente do Figma tem.

- **Visual:** `rounded-md` (`radius/md`), `font-semibold` e padding `px-2 py-0.5` (`spacing/2` e `spacing/0-5`), como no Figma. Antes era `rounded-full`, `font-normal` e `px-1.5`.
- **`variant="default"`** usa `color/primary` (`bg-primary text-primary-foreground`, hover a 80%). Antes usava `bg-foreground`.
- **`variant="outline"`** usa os mesmos tokens do outline do Button: `bg-input-background`, `border-input`, `shadow-xs` e hover em `accent`.
- **Hover do `secondary`:** sobreposição de `foreground` a 10% (`color-mix`), como no Button. Antes era `secondary/80`, que quase não mudava.
- **Novo `variant="verified"`**, no tom `info` (`bg-info text-info-foreground`). O ícone de check entra por `startIcon`.
- **Novo `variant="success"`** (`bg-success text-success-foreground`, hover a 80%), criado no Figma em 21/10/2026.
- **`variant="warning"`** (`bg-warning text-warning-foreground`, hover a 80%), criado no Figma em 21/10/2026.
- **Tamanhos:** `sm` (padrão, 20px), `md` (24px) e `lg` (28px), os mesmos de antes, agora também no Figma (`height/5`, `height/6` e `height/7`).
- **Nova prop `shape`** (`default` | `number`). `number` é o "Badge Number" do Figma: contador redondo, mínimo de 20px (`min-w-5 rounded-full px-1`), com `tabular-nums`.
- **Variantes:** ficam `default`, `secondary`, `outline`, `destructive`, `verified`, `success` e `warning`.
- **Tabela e coluna de status:** as tags neutras da tabela passam a `variant="outline"`. Os chips de status continuam com `success`, `warning`, `secondary` e `destructive`.
- **Quebra:** saem as variants `primary`, `info` e `violet` e a prop `appearance` (`outlined` e `text`). O atributo `data-appearance` some. Para as cores que saíram, use `className` com os tokens (`bg-info text-info-foreground`, ou o tom suave `bg-info-weak text-info-strong`). O Default deixa de ser `bg-foreground` e o raio deixa de ser `full`; para o visual antigo, use `variant="default" className="rounded-full bg-foreground text-background hover:bg-foreground/80"`.
