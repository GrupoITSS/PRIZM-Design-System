---
"@grupoitss/prizm-ui": minor
"@grupoitss/prizm-tokens": minor
---

**Checkbox: decisões de 30/10/2026**

- **Tokens: novo `color/input-strong`** (`neutral.500` no claro, branco a 40% no escuro), para controles que só têm o contorno para identificar. Tem de 3,73 a 4,83:1 contra a página (WCAG 1.4.11). `color/input` não muda.
- **Borda sem marcar em `input-strong`.** Com `color/input`, a caixa ficava entre 1,16 e 1,55:1.
- **Erro visível.** `aria-invalid` agora pinta a borda de `destructive`, também com a caixa marcada ou indeterminada. Antes, o erro não aparecia na caixa.
- **Fundo em `input-background`,** como os campos. Muda o visual no modo escuro.
- **Raio em `rounded-xs`** (antes 4px fixo): 2px no PAS e no ITSS, 1px no Docnix.
- **Alvo de ponteiro de 24px** nos dois tamanhos, sem mudar o layout (WCAG 2.5.8).
- **Anel com `ring-offset-ring-offset`,** como o Button.
