---
"@grupoitss/prizm-ui": patch
---

**AlertDialog: fundo atrás do modal em `color/alpha-80`, como o Dialog**

- O fundo atrás do AlertDialog passa de `bg-black/80` (valor fixo) para `bg-alpha-80`, o mesmo token do Dialog, mantendo o desfoque. No claro, o fundo fica branco a 80%; no escuro, quase preto a 80% (`rgba(10, 10, 10, 0.8)`). Antes, no claro, o Dialog clareava a página e o AlertDialog escurecia.
