---
"@grupoitss/prizm-ui": minor
---

**Dialog: decisões de 06/11/2026, alinhadas ao AlertDialog**

- **Fundo**: `bg-background` com `text-foreground`. Antes, `bg-sidebar`, a cor da barra lateral: no Docnix e no Digitrol, o Dialog saía roxo ou azul-marinho.
- **Raio**: `rounded-lg` sempre. Antes, `sm:rounded-2xl`, sem raio no celular.
- **Largura**: 16px de folga no celular (`max-w-[calc(100%-2rem)]`) e 512px a partir de 640px (`sm:max-w-lg`). Antes, encostava nas bordas no celular.
- **Altura**: até a tela menos 32px (`max-h-[calc(100dvh-2rem)]`), com rolagem por dentro. Antes, o conteúdo longo passava da tela.
- **Rodapé**: `gap-2` também no celular, com a ação principal em cima. Antes, os botões empilhavam sem espaço.
- **Botão fechar**: o Button ghost `icon-sm` do Prizm (32px), a 8px do canto, com o foco do Prizm (`dialogCloseStyles`). Antes, um X de 16px com o foco antigo. O nome padrão passa a ser "Fechar" (era "Close"); testes que procuram o botão por "Close" precisam mudar. `dialogCloseButtonStyles` continua exportado para o Sheet e fica obsoleto.
- **Story**: sai de Compositions/Dialog para Primários/Dialog.
