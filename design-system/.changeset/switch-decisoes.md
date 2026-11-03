---
"@grupoitss/prizm-ui": minor
---

**Switch: decisões de 03/11/2026**

- **`onCheckedChange` novo,** como no Radix e no Checkbox. O `onChange` continua funcionando, marcado como obsoleto.
- **Erro:** `aria-invalid` pinta a borda de 2px de `destructive`, também ligado. Antes, nada mudava.
- **Alça sem sombra** (antes `shadow-lg`), como o shadcn e a família.
- **Anel com `ring-offset-ring-offset`** e alvo de ponteiro de 24px no `sm`.
- **Aviso no console** em desenvolvimento quando o Switch não tem nome (`FieldLabel` ligado pelo `id` ou `aria-label`).
- O trilho desligado continua em `input`, por decisão do time: 1,16 a 1,47:1 contra a página, exceção registrada no Critério de acessibilidade.
