---
"@grupoitss/prizm-ui": patch
---

**Alert e Empty: props sem título e children junto das props (decisões de 30/10/2026)**

- **`description`, `icon` (e `content`, no Empty) aparecem sem `title`.** O Figma deixa desligar o título (booleana Title / Show Title), mas o código só montava pelas props com `title`: sem ele, `<Alert variant="warning" description="…" />` não mostrava nada, sem aviso. Agora qualquer uma dessas props usa a API por props, sem título vazio.
- **`children` junto das props entram no fim.** Antes eram descartados sem aviso quando havia `title`: no Alert, um `Button` de ação depois da descrição sumia. Agora aparecem depois da descrição (Alert) ou das ações (Empty). Sem nenhuma prop, continua a composição só com `children`.
