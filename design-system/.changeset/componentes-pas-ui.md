---
"@grupoitss/prizm-ui": minor
---

**58 componentes novos, trazidos do `@pas/ui` (pas-ui, Azure DevOps) com os tokens do PRIZM**

accordion, alert, alert-dialog, alert-message, aspect-ratio, avatar, badge, breadcrumb, button-group, calendar, card, carousel, chart, checkbox, collapsible, combobox, command, context-menu, date-picker, dialog, drawer, dropdown-menu, dropzone, empty, field, hover-card, icons, input, input-group, input-otp, item, kbd, label, masked-input, menubar, navigation-menu, pagination, photo-upload, popover, progress, radio-group, resizable, scroll-area, search-popover, select, separator, sheet, skeleton, slider, sonner, spinner, switch, table (Table e DataTable), tabs, textarea, toggle, toggle-group e tooltip. Cada um sai pelo próprio caminho (`@grupoitss/prizm-ui/dialog`) e todos pela raiz (`@grupoitss/prizm-ui`).

- Cores, alturas de controle, raios e sombras vêm dos tokens; hover dos preenchidos a 80%; modo escuro pelos tokens (`data-mode`), sem a variante `dark:`.
- **Button:** tamanhos `xs` e `icon-xs`, variante `text` (ação destrutiva em texto) e a prop `asChild`. O que já existia não muda.
- **CSS novo:** `@grupoitss/prizm-ui/styles.css` (animações, cor de borda padrão, `custom-scroll` e o `@source` das classes). Substitui o `@source "../node_modules/@grupoitss/prizm-ui/dist"` no CSS do app.
- **`react-dom` 19** passa a ser peer dependency (diálogos, menus e popovers usam portal).

Requer `@grupoitss/prizm-tokens` 5.0.0 ou superior (tokens `primary-weak`, `primary-strong` e os `-weak`/`-strong` de feedback).
