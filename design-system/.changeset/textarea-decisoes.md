---
"@grupoitss/prizm-ui": minor
---

**Textarea: erro visível e Dialog de edição com nome**

- **Textarea** ganha o estado de erro do Input e do Select: `aria-invalid` pinta a borda de `destructive`, também no foco (o anel continua `ring`). Antes, `aria-invalid` era repassado, mas a borda não mudava, embora a story `Invalid` dissesse que mudava.
- **Textarea com `expandable`**: o Dialog de edição ganha título visível, da prop nova `expandTitle` (padrão "Editar texto"), e passa a ter nome para o leitor de tela. O textarea dentro do Dialog não repete mais o `id` do campo e é nomeado pelo título. Antes, o Dialog abria sem nome e havia dois elementos com o mesmo `id`.
- **Textarea com `expandable`**: o botão passa a se chamar "Expandir campo" (antes "Expandir textarea") e usa o anel de foco padrão, sem `ring-offset-2`.
