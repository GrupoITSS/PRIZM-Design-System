---
"@grupoitss/prizm-ui": minor
---

Card: decisões de 09/11/2026.

- **Quebra:** sai a prop `size` (`default` | `sm`). O Card tem uma densidade só, como o Figma. Quem usava `size="sm"` passa ao Card padrão.
- Raio `rounded-xl` (`radius/xl`, 14px), alinhado ao Core (“raio de cartão”). Antes era `rounded-lg`.
- Título em `text-base font-semibold` (antes `text-2xl`), como o Figma.
- `CardAction` no canto superior direito do cabeçalho (grade com `has-data-[slot=card-action]`).
