---
"@grupoitss/prizm-ui": minor
---

**Badge em formato pill**

- **UI**: o Badge passa de `rounded-md` para `rounded-full` (`radius/full`) em todas as variantes e tamanhos, como o badge do shadcn. O espaço interno não muda (`px-2`, `py-0.5`). O `shape="number"` já era redondo e continua igual. Decisão de 03/11/2026.
- **Quebra visual:** todos os usos do Badge mudam de forma, inclusive BadgeItem e as colunas de status da tabela. Para manter o canto de antes num caso específico, passe `className="rounded-md"`.
