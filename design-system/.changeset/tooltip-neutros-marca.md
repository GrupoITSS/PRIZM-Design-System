---
"@grupoitss/prizm-tokens": major
---

**Tooltip pelos neutros de cada marca**, com o escuro invertido (decisão da revisão de componentes de 12/11/2026).

O `color.tooltip` e o `color.tooltip-foreground` saem da Foundations e passam a usar a escala neutra de cada marca (`palette.neutral.*`):

| Modo | `tooltip` | `tooltip-foreground` |
|---|---|---|
| Claro | neutral 800 | neutral 50 |
| Escuro | neutral 50 (invertido) | neutral 900 |

**Mudança visual:**
- **Claro:** a PAS e o Tchello não mudam (o neutral 800 deles é o `gray.800`). O Docnix passa ao roxo neutro (`#262338`), e a ITSS (AFIPE, Digitrol) ao cinza neutro (`#262626`).
- **Escuro:** o balão inverte, fundo claro com texto escuro, em todas as marcas. Antes ele ficava em `gray.800`, quase igual ao fundo (1,3:1) e idêntico ao popover.
- **Contraste do texto:** de 14,05:1 a 17,21:1 nas 6 combinações de tema, no claro e no escuro.

**Quem é afetado:** só quem usa direto as variáveis `--prizm-foundations-tooltip-light`, `--prizm-foundations-tooltip-dark`, `--prizm-foundations-tooltip-foreground-light` ou `--prizm-foundations-tooltip-foreground-dark`, que deixam de existir. **Não é afetado:** quem usa `--prizm-color-tooltip`, `--prizm-color-tooltip-foreground` ou as classes `bg-tooltip` e `text-tooltip-foreground` (é o caso do Tooltip do `@grupoitss/prizm-ui`).

**Como migrar:** trocar `--prizm-foundations-tooltip-*` por `--prizm-color-tooltip` ou `--prizm-color-tooltip-foreground`.
