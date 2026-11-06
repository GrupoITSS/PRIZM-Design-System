---
"@grupoitss/prizm-ui": minor
---

Item: decisões de 06/11/2026.

- **Quebra:** saem as variantes `badges` e `file`. Para badges, use `variant="outline"` com a prop `badges`. O FileItem segue com o mesmo visual (borda e fundo `card`).
- **Quebra:** sem `actions`, nenhum botão aparece. O "Manage" padrão da variante `badges` saiu.
- Com `interactive` e sem `href`, o Item vira `<button type="button">`: o teclado e o leitor de tela chegam nele (antes era um `div` sem foco).
- Foco com o anel do Button (`ring` de 3px e `ring-offset` de 2px). O `ring/50` passava 3:1 em 1 de 12 temas.
- Aviso no console quando há um controle em `actions` num Item clicável.
- Remover badge: rótulo "Remover …" e área de toque de 24px.
