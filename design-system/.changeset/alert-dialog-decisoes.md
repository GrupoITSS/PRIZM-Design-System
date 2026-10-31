---
"@grupoitss/prizm-ui": minor
---

**AlertDialog: mídia, celular e tokens**

- **Mídia**: nova prop `icon` e novo subcomponente `AlertDialogMedia` (como no shadcn): quadrado de 64px em `bg-muted`, `rounded-md`, ícone de 32px. Fica acima do título no celular e à esquerda do título e da descrição a partir de 640px. É decorativa (`aria-hidden`); o nome do diálogo continua sendo o título.
- **Celular**: a caixa tem cantos `rounded-lg` em qualquer largura e 16px de margem até a borda da tela (`max-w-[calc(100%-2rem)]`). Antes, abaixo de 640px, ela encostava nas bordas e perdia o raio. Os botões empilhados ganham `gap-2` (antes, sem espaço entre eles).
- **Tokens**: título e descrição usam `text-foreground` e `text-muted-foreground`. Saem as variáveis `--alert-dialog-title` e `--alert-dialog-desc`, sem uso no repositório. Contraste medido nas 5 marcas, claro e escuro: título 18,16:1 e descrição 7,17:1 no pior caso.
- **Quebra:** quem sobrescrevia `--alert-dialog-title` ou `--alert-dialog-desc` passa a usar `className` em `AlertDialogTitle` e `AlertDialogDescription`.
