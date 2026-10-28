---
"@grupoitss/prizm-ui": patch
---

**Combobox: a caixa do Multiple segue o Default e a família do campo**

- **Combobox** com `multiple`: a caixa dos chips passa a usar `bg-input-background`, `rounded-md` e `shadow-xs`, como o Default (InputGroup) e o Input. Antes era transparente, com `rounded-lg` e sem sombra.
- **Combobox** com `multiple`: o texto acompanha o `size` (`text-xs` no `sm`, `text-sm` no `md`, `text-base` e `text-sm` a partir do breakpoint md no `lg`). Antes ficava em `text-sm` em todos os tamanhos.
