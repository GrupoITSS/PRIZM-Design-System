---
"@grupoitss/prizm-ui": minor
---

**Pagination com o Button do Prizm, textos em pt-BR e acessibilidade**

- **Button**: os itens passam a usar o `buttonVariants` do Button: `ghost` nas páginas e nas setas, `outline` na página atual. Foco, hover, pressed e disabled seguem a família. O anel de foco passa de `ring-2` para o anel de 3px do Button, com o espaço de 2px. O fundo do outline passa a `bg-input-background`.
- **Página atual**: deixa de ser `disabled`. Antes, ficava a 50% de opacidade e saía do Tab. Agora é marcada só por `aria-current="page"`, e clicar nela não chama `onPageChange`. O contorno do outline (`color/input`, de 1,16 a 1,47:1) é mantido como exceção, pelo mesmo acordo da borda dos campos.
- **Setas nas pontas**: Anterior e Primeira, na primeira página, e Próxima e Última, na última, usam `aria-disabled` em vez de `disabled`. O foco não se perde quando a última página é alcançada.
- **Reticências**: "Mais páginas" passa a chegar ao leitor de tela. O `aria-hidden` sai do contêiner e fica só no ícone. O tamanho segue `control-height`; antes eram `h-9` e `h-8` fixos.
- **Textos padrão em pt-BR**: "Anterior", "Próxima", "Primeira", "Última", "Ir para a página anterior", "Ir para a próxima página", "Ir para a primeira página", "Ir para a última página" e "Paginação".
- **Tamanhos**: `icon` e `icon-sm` deixam os números quadrados e as setas só com ícone, como no Figma. O `icon-sm` saía no tamanho md e foi corrigido.
- **First e Last**: ganham os ícones `ChevronsLeft` e `ChevronsRight`, novos em `@grupoitss/prizm-ui/icons`, e `aria-label`. Não ficam mais com o estilo de página atual.
- **Nova prop `showIcons`** (padrão `true`): com `false`, as setas e First/Last ficam só com o texto.
- **Quebra:** sai o export `paginationLinkVariants`; use `buttonVariants` do Button. Os textos padrão mudam de inglês para pt-BR; quem dependia do inglês passa os rótulos por prop.
