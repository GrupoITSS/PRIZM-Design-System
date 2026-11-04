---
"@grupoitss/prizm-ui": minor
---

**DropdownMenu: decisões de 04/11/2026**

- **Item destrutivo**: `variant="destructive"` no `DropdownMenuItem` e `variant: "destructive"` nos `items`. Texto e ícone em `text-destructive-strong` em repouso (7,73 a 8,31:1 sobre o menu) e em `text-destructive` no destaque, sobre `bg-accent` (exceção do time: 2,24 a 4,43:1).
- **Rótulo**: sai `text-muted-foreground`; herda o `text-popover-foreground` do menu, como os itens.
- **Separador**: `bg-border` (era `bg-muted`). Regra F1: divisores usam `border`.
- **Atalho**: `text-muted-foreground` (era `opacity-60`), `accent-foreground` no destaque.
- **Ícone do item**: `text-muted-foreground`, `accent-foreground` no destaque. Ícone com classe `text-*` própria não muda. O chevron do submenu segue o texto.
- **Desabilitado**: `pointer-events-none` (era `cursor-not-allowed`), em item, checkbox e radio, como o ContextMenu, o Menubar e o shadcn.
- **Nome acessível (API por props)**: o nome do item é só o rótulo. O atalho fica com `aria-hidden` e a descrição é ligada por `aria-describedby`.
- **Novos exports**: `dropdownMenuItemDescriptionStyles` e o tipo `DropdownMenuItemVariant`.
