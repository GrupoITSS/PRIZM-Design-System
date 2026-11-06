---
"@grupoitss/prizm-ui": patch
---

**Separator: decisões de 06/11/2026**

- **Papel do semântico**: com `decorative={false}`, o separador volta a sair com `role="separator"` (e `aria-orientation` no vertical). O componente passava `role` por cima do que o Radix calcula, e o papel sumia.
- **`data-slot="separator"`**: novo, como no shadcn. Quem passa outro `data-slot` (o ButtonGroup) continua com o seu.
