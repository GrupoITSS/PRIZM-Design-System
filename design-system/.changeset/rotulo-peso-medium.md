---
"@grupoitss/prizm-ui": patch
---

**Rótulos em `font-medium` (decisão de 03/11/2026)**

O peso `font-light` veio da migração do `@pas/ui` e não foi decisão do time. Os rótulos passam a medium, como no Figma (`font-weight/medium`) e no shadcn.

- Mudam `Label`, `FieldTitle`, `FieldLegend`, o rótulo do Checkbox e o do RadioGroup.
- Mudança visível: todos os rótulos de formulário ficam mais pesados.
- O produto precisa carregar o peso 500 da fonte da marca. Sem ele, o navegador simula o negrito.
- O `FieldTitle` desabilitado não fica mais pesado que o normal: a classe `font-medium` do disabled saiu, porque o peso já é medium.
