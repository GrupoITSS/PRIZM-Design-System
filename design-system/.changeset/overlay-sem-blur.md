---
"@grupoitss/prizm-ui": patch
---

Dialog e AlertDialog: o fundo atrás do modal usa só `color/overlay`, sem desfoque.

- **Antes:** `bg-overlay` com `backdrop-blur-[0.125rem]` (2px). O desfoque veio em 03/11/2026, antes do token de overlay (04/11); com o token, já não faz falta.
- **Agora:** `bg-overlay` puro, igual ao Sheet, ao Drawer e ao Figma. O `dialogOverlayStyles` e o `alertDialogOverlayStyles` perdem a classe `backdrop-blur-[0.125rem]`. Quem sobrescrevia o overlay por `className` não é afetado.
- Mapas de tokens e testes do Dialog e do AlertDialog atualizados: agora conferem que não há desfoque.
