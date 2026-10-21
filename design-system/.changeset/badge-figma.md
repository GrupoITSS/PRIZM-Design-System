---
"@grupoitss/prizm-ui": minor
---

**Badge: só as variantes do Figma, `verified`, `success` e `shape="number"`**

O Figma é a fonte da verdade: o Badge passa a ter só o que o componente do Figma tem.

- **Visual:** `rounded-md` (`radius/md`), `font-semibold` e padding `px-2 py-0.5` (`spacing/2` e `spacing/0-5`), como no Figma. Antes era `rounded-full`, `font-normal` e `px-1.5`.
- **`variant="default"`** usa `color/primary` (`bg-primary text-primary-foreground`, hover a 80%). Antes usava `bg-foreground`.
- **`variant="outline"`** usa os mesmos tokens do outline do Button: `bg-input-background`, `border-input`, `shadow-xs` e hover em `accent`.
- **Hover do `secondary`:** sobreposição de `foreground` a 10% (`color-mix`), como no Button. Antes era `secondary/80`, que quase não mudava.
- **Novo `variant="verified"`**, no tom `info` (`bg-info text-info-foreground`). O ícone de check entra por `startIcon`.
- **Novo `variant="success"`** (`bg-success text-success-foreground`, hover a 80%), criado no Figma em 21/10/2026.
- **Nova prop `shape`** (`default` | `number`). `number` é o "Badge Number" do Figma: contador redondo, mínimo de 20px (`min-w-5 rounded-full px-1`), com `tabular-nums`.
- **Variantes:** ficam `default`, `secondary`, `outline`, `destructive`, `verified` e `success`.
- **Tabela e coluna de status:** o chip de sucesso usa `variant="success"`. O de atenção mantém a cor por `className` com os tokens (`bg-warning text-warning-foreground`), porque `warning` saiu do Badge. As tags neutras da tabela passam a `variant="outline"`.
- **Quebra:** saem as variants `primary`, `warning`, `info` e `violet`, a prop `appearance` (`outlined` e `text`) e os valores de `size` (`sm`, `md` e `lg`; o Figma tem um tamanho só, 20px, e `size` aceita `default`). O atributo `data-appearance` some. Para as cores que saíram, use `className` com os tokens (`bg-warning text-warning-foreground`, ou o tom suave `bg-info-weak text-info-strong`). O Default deixa de ser `bg-foreground` e o raio deixa de ser `full`; para o visual antigo, use `variant="default" className="rounded-full bg-foreground text-background hover:bg-foreground/80"`.
