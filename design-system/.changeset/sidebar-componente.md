---
"@grupoitss/prizm-ui": minor
---

Sidebar: componente novo, a partir do shadcn/ui (new-york-v4), com as decisões de 10/11/2026.

- **Novo:** `@grupoitss/prizm-ui/sidebar`, com `SidebarProvider`, `Sidebar`, `SidebarTrigger`, `SidebarRail`, `SidebarInset`, as peças de grupo e de menu e o hook `useSidebar`.
- Fica abaixo do header global: `headerHeight` no `SidebarProvider` (S2). Recolhe para uma faixa de ícones de 48px por padrão (`collapsible="icon"`, S4); no celular, abre numa gaveta.
- Só `variant="sidebar"` (S3). O `SidebarMenuButton` tem os tamanhos `default` (32px) e `lg` (48px); saem `variant="outline"` e `size="sm"` do shadcn (S7).
- Item ativo em `sidebar-primary`, com `aria-current="page"`; o subitem ativo fica em `sidebar-accent` (S5, P2 e pendência 4). Rótulo do grupo em `text-xs` a 70% (P1).
- Acessibilidade (WCAG 2.2 AA):
  - anel de foco em `sidebar-foreground` com espaço em `sidebar`, que passa 3:1 nas 12 combinações (10,14 a 19,27:1); o `ring` ficava em 1,00 a 2,75:1 na sidebar colorida do Docnix, do AFIPE escuro e da Digitrol;
  - o conteúdo fica num `<nav>` com nome ("Navegação"); grupo com rótulo vira `role="group"` com `aria-labelledby`;
  - ações com área de toque de 24px no desktop e aviso no console, em desenvolvimento, quando a ação só de ícone não tem nome;
  - textos padrão em pt-BR ("Mostrar ou ocultar a navegação", "Navegação").
- O atalho Ctrl ou Cmd + B não age com o foco num campo editável (input, textarea, contenteditable), para não roubar o negrito dos editores, e pode ser desligado com `keyboardShortcut={false}`.
