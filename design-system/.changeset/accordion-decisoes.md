---
"@grupoitss/prizm-ui": minor
---

**Accordion: decisões de 05/11/2026**

- **Hover e pressed**: fundo `bg-accent`, com texto e chevron em `accent-foreground`, no lugar do sublinhado. Para o fundo ter respiro, o título ganha `px-2` e `rounded-md`, e o conteúdo, `px-2`, para os dois continuarem alinhados.
- **Foco**: anel do Prizm, `ring-2 ring-ring` com `ring-offset-2 ring-offset-ring-offset`, só no foco por teclado. Antes, sem estilo, aparecia o contorno do navegador.
- **Disabled**: o item inteiro fica a 50% (`data-[disabled]:opacity-50`) e o título sem clique (`pointer-events-none`), como o Button. Antes, `disabled` funcionava sem mudança visual.
- **Título**: `text-sm` (antes herdava o tamanho da página) e `text-left`, para o título longo não sair centralizado.
- **Conteúdo**: `text-foreground` (era `text-muted-foreground`), como no Figma e no shadcn, e `pt-1`, para o anel de foco não cobrir a primeira linha.
