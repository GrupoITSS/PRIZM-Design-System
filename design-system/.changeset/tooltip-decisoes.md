---
"@grupoitss/prizm-ui": minor
---

**Tooltip: decisões de 06/11/2026**

- **Balão**: `bg-tooltip` com texto em `text-tooltip-foreground` (escuro nos dois modos, igual em todas as marcas). Antes, `bg-popover` claro, como o Popover.
- **Texto**: `text-xs`, peso normal, com quebra equilibrada. Antes, `text-sm`.
- **Seta**: nova, na cor do balão (`tooltipArrowStyles`).
- **Sombra e borda**: saem `shadow-md` e `border-sidebar-border`, que não tinha efeito.
- **Largura máxima**: `max-w-sm`.
- **Atalho**: o conteúdo ganha `data-slot="tooltip-content"`; o Kbd dentro do balão fica claro sobre o fundo escuro, como já previa o Kbd.
- **Novo `TooltipProvider`**: em volta de uma região, os Tooltips de dentro usam ele e o atraso curto entre vizinhos (`skipDelayDuration`) funciona. Sem ele, cada Tooltip cria o próprio provider, como antes. Dentro do provider, `delayDuration` no Tooltip vale só para ele.
