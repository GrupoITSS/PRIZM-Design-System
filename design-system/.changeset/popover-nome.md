---
"@grupoitss/prizm-ui": patch
---

**Popover: aviso de painel sem nome (04/11/2026)**

- O conteúdo do Popover é `role="dialog"`. Sem `aria-label` ou `aria-labelledby` em `contentProps`, o Popover avisa no console ao abrir, só em desenvolvimento.
- O `onOpenAutoFocus` de `contentProps` continua sendo chamado.
- Os Popover da Table (menu de ações e células) ganharam nome: "Ações" e "Detalhes", ou o título do popover.
