---
"@grupoitss/prizm-ui": minor
---

**Badge: alinhado ao Figma (fonte da verdade) + `verified` e `shape="number"`**

- **Visual:** o Badge passa a `rounded-md` (`radius/md`), `font-semibold` e padding `px-2 py-0.5` (`spacing/2` e `spacing/0-5`), como no Figma. Antes era `rounded-full`, `font-normal` e `px-1.5`.
- **`variant="default"`** passa a usar `color/primary` (`bg-primary text-primary-foreground`, hover a 80%), como o Default do Figma. Antes usava `bg-foreground`.
- **Novo `variant="verified"`**, no tom `info` (`bg-info text-info-foreground`), com as três `appearance`. É o "Verified" do Figma; o ícone de check entra por `startIcon`.
- **Nova prop `shape`** (`default` | `number`). `number` é o "Badge Number" do Figma: contador redondo, mínimo de 20px (`min-w-5 rounded-full px-1`), com `tabular-nums`.
- **Quebra:** quem dependia do Default escuro (`bg-foreground`) ou do raio `full` nos rótulos passa a ver o novo visual. Para o raio antigo, use `className="rounded-full"`; para a cor antiga, `variant="default" className="bg-foreground text-background hover:bg-foreground/80"`.
