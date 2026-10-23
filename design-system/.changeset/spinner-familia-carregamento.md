---
"@grupoitss/prizm-ui": patch
---

**Button, PhotoUpload e Sonner usam o Spinner**

- **Button**: o estado `loading` mostra o `<Spinner>`, decorativo (`aria-hidden`), no tamanho do ícone do botão (16px; 12px em `xs` e `icon-xs`). Antes era o ícone `LoaderCircle` com `animate-spin`, a 1s por volta; agora gira a 600ms e mais devagar com `prefers-reduced-motion`.
- **PhotoUpload**: o `loading` mostra o `<Spinner>` com o nome "Carregando foto" (`role="status"`). Antes o ícone não tinha nome nem papel, e o leitor de tela não anunciava nada.
- **Sonner**: o toast de carregamento usa o `<Spinner>` (`LoaderCircle`), decorativo, no lugar do ícone `Loader`. É o mesmo ícone dos outros componentes.
