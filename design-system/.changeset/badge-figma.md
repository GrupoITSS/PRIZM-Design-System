---
"@grupoitss/prizm-ui": minor
---

**Badge: só as variantes do Figma, `verified` e `shape="number"`**

O Figma é a fonte da verdade: o Badge passa a ter só o que o componente do Figma tem.

- **Visual:** `rounded-md` (`radius/md`), `font-semibold` e padding `px-2 py-0.5` (`spacing/2` e `spacing/0-5`), como no Figma. Antes era `rounded-full`, `font-normal` e `px-1.5`.
- **`variant="default"`** usa `color/primary` (`bg-primary text-primary-foreground`, hover a 80%). Antes usava `bg-foreground`.
- **`variant="outline"`** usa os mesmos tokens do outline do Button: `bg-input-background`, `border-input`, `shadow-xs` e hover em `accent`.
- **Novo `variant="verified"`**, no tom `info` (`bg-info text-info-foreground`). O ícone de check entra por `startIcon`.
- **Nova prop `shape`** (`default` | `number`). `number` é o "Badge Number" do Figma: contador redondo, mínimo de 20px (`min-w-5 rounded-full px-1`), com `tabular-nums`.
- **Variantes:** ficam `default`, `secondary`, `outline`, `destructive` e `verified`.
- **Tabela e coluna de status:** continuam com os chips de sucesso e atenção. Como `success` e `warning` saíram do Badge, a cor vem dos tokens por `className` (`bg-success text-success-foreground`, `bg-warning text-warning-foreground`). As tags neutras da tabela passam a `variant="outline"`.
- **Quebra:** saem as variants `primary`, `success`, `warning`, `info` e `violet`, a prop `appearance` (`outlined` e `text`) e os valores de `size` (`sm`, `md` e `lg`; o Figma tem um tamanho só, 20px, e `size` aceita `default`). O atributo `data-appearance` some. Para as cores que saíram, use `className` com os tokens (`bg-success text-success-foreground`, ou o tom suave `bg-success-weak text-success-strong`). O Default deixa de ser `bg-foreground` e o raio deixa de ser `full`; para o visual antigo, use `variant="default" className="rounded-full bg-foreground text-background hover:bg-foreground/80"`.
