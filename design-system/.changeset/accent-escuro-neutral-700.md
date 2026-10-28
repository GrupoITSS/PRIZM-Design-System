---
"@grupoitss/prizm-tokens": minor
"@grupoitss/prizm-ui": patch
---

**Accent do escuro em neutral 700**

- **Tokens**: `palette/accent/dark` passa de `neutral.800` para `neutral.700` nas marcas PAS, Docnix e ITSS (e nos produtos que herdam delas). Antes, accent e popover eram o mesmo cinza no escuro (1,00:1), e o item em destaque de Select, DropdownMenu, Command e afins não aparecia na lista (WCAG 2.4.7). Agora fica em 1,42–1,46:1 sobre o popover e 1,89–1,95:1 sobre o background. O claro não muda.
- **UI**: `muted-foreground` sobre o novo accent fica em 4,06–4,13:1, abaixo de 4,5:1. No item em destaque de ContextMenu, DropdownMenu, Menubar, NavigationMenu e Command, o texto com `text-muted-foreground` (descrição, atalho) passa a `accent-foreground` (9,86–10,03:1).
