---
"@grupoitss/prizm-ui": minor
---

**RadioGroup: decisões de 03/11/2026**

- **`RadioGroupItem` novo,** para composição com `Field`, `FieldLabel` e `FieldDescription` (cartão, descrição e erro). Sem `items`, o grupo renderiza os `children`. A API por `items` continua igual.
- **Borda sem marcar em `input-strong`,** de 3,73 a 4,83:1 contra a página. Com `input`, ficava entre 1,16 e 1,47:1.
- **Marcado:** borda e ponto em `primary`, fundo de campo (`input-background`). Antes, o fundo era `primary` a 10%.
- **Erro:** `aria-invalid` no grupo ou no item pinta a borda de `destructive`, também marcado.
- **Ponto de 8px** (antes 10px), alvo de ponteiro de 24px e anel com `ring-offset-ring-offset`, como o Checkbox.
- **Descrição em `text-sm`** (antes `text-xs`), a 6px do rótulo (antes 4px).
- **Aviso no console** em desenvolvimento quando o grupo não tem `aria-label` nem `aria-labelledby`.
