---
"@grupoitss/prizm-ui": minor
---

Dialog (DS-77): cabeçalho e rodapé fixos, e só o corpo rola. Novo `DialogBody` (na API por props, o `body` e o `confirmInput` já vão dentro dele). Nova prop `footerLeading`, para a ação destrutiva à esquerda do rodapé. Dialog, AlertDialog e Sheet passam a usar o fundo `color/card` (branco no claro), com o texto em `color/card-foreground`.
