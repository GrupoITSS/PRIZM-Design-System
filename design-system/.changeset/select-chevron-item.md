---
"@grupoitss/prizm-ui": patch
---

**Select: chevron e texto do item como no Figma**

- **Select**: o chevron do trigger passa a `text-muted-foreground`, sem opacidade, com ou sem valor escolhido. Antes era 60% da cor do texto, e o tom mudava quando havia valor. Novo export: `selectTriggerIconStyles`.
- **Select**: o item da lista herda `popover-foreground` da lista (antes `text-foreground`). No destaque, continua `accent-foreground`. Os valores são os mesmos hoje: nada muda na tela.
