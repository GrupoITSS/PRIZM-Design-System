---
"@grupoitss/prizm-ui": minor
---

**Collapsible: decisões de 06/11/2026, alinhadas ao Accordion**

- **Gatilho**: o mesmo título do Accordion. `w-full`, `px-2 py-4`, `gap-4` até o ícone, `rounded-md`, `text-sm` à esquerda. Antes, `px-4 py-2` e largura do conteúdo.
- **Hover e pressed**: fundo `bg-accent`, com texto e ícone em `accent-foreground`, com classes de `hover:` e `active:`. Antes, `bg-muted/50`.
- **Foco**: fundo e offset em `ring-offset` (`focus-visible:bg-ring-offset`, `ring-offset-ring-offset`), como no Figma. Era `ring-offset-background`; o valor é o mesmo hoje.
- **Ícone**: o `triggerIcon` gira 180° com o painel aberto e fica com `aria-hidden`. Quem passava a classe `group-data-[state=open]/collapsible:rotate-180` no ícone deve tirá-la, senão ele gira duas vezes.
- **Composição com `asChild`**: o gatilho não soma mais as classes dele às do filho; o Button do Prizm fica com o estilo dele. Antes, `px-4 py-2` e o hover do gatilho iam parar no Button.
- **Quebra**: sai a variante `ghost`, com `triggerVariant` no `Collapsible` e `variant` no `CollapsibleTrigger`. Para um gatilho sem hover, use a composição com o Button `ghost`. `collapsibleTriggerVariants` continua exportado, sem variantes (obsoleto); use `collapsibleTriggerStyles`.
