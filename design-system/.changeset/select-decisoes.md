---
"@grupoitss/prizm-ui": minor
---

**Select: erro, lista aberta, ícone e lista alinhados ao Figma**

- **Select** ganha o estado de erro do Input: `aria-invalid` (e `aria-describedby`) vão para o trigger, com borda `destructive`; no foco e com a lista aberta, o anel continua `ring`. Antes, `aria-invalid` passado ao Select ficava no Root do Radix e não chegava ao combobox, então o erro não era anunciado.
- **Select**: com a lista aberta, o trigger usa o mesmo anel do foco (2px em `ring`, borda transparente). Antes era um anel de 3px em `ring/50`.
- **Select**: o trigger usa `ChevronDown`, como o Figma e o shadcn. Antes era `ChevronsUpDown`, o ícone do Combobox.
- **Select**: a lista usa `border-border`, como os outros popovers (antes `border-input`, o cinza do campo), e o item usa `rounded-sm` (antes `rounded-md`).
