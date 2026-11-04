---
"@grupoitss/prizm-tokens": minor
"@grupoitss/prizm-ui": patch
---

**Novo token `color/overlay` para o fundo atrás de modal, sheet e drawer**

- **Tokens**: `color/overlay` (classe `bg-overlay`), `black-alpha/80` (quase preto a 80%) no claro e no escuro. O `color/alpha-*` não muda.
- **UI**: Dialog e AlertDialog saem de `bg-alpha-80` (que no claro virava branco a 80% e clareava a tela) e Sheet e Drawer saem de `bg-black/80` (valor fixo) para `bg-overlay`. Os quatro passam a escurecer a tela atrás nos dois modos, com o mesmo token. Este changeset substitui o `alert-dialog-overlay` quanto ao claro. O desfoque do Dialog e do AlertDialog continua.
- **Cor**: o preto do token é `#0a0a0a` (o do `black-alpha`), não `#000`, o que no overlay não se distingue a olho.
