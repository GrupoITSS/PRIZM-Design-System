---
"@grupoitss/prizm-ui": patch
---

**Pagination: avisos de combinação inválida**

- Em desenvolvimento, o Pagination avisa no console em dois casos: `iconsOnly` com `showPrevNext={false}`, que não mostra nada, e a falta de `onPageChange` e de `getHref`, em que os botões não fazem nada. Decisão de 03/11/2026.
