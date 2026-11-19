---
"@grupoitss/prizm-ui": minor
---

Breadcrumb: foco, nomes e página atual, com as decisões de 18/11/2026.

- **Foco:** o link, o gatilho de item com menu e as reticências ganham o anel do Prizm (3px em `ring`, com 2px de espaço em `ring-offset`), como o Button. Antes, o link só tinha o contorno do navegador.
- **Nomes em pt-BR:** a navegação passa a se chamar "Trilha de navegação" (antes, "breadcrumb"). O `aria-label` continua aceitando outro nome.
- **Reticências:** `BreadcrumbEllipsis` passa a ser um botão com o nome "Mais páginas", para abrir as páginas escondidas num `DropdownMenu` (`<DropdownMenuTrigger asChild><BreadcrumbEllipsis /></DropdownMenuTrigger>`). Antes, era um `span` decorativo, e o "More" nunca era lido. O hover fica em `accent`, como o Button ghost. Quem usava as reticências só como enfeite, sem menu, deve montar o menu ou tirar as reticências.
- **Página atual:** `BreadcrumbPage` fica só com `aria-current="page"`, sem `role="link"` e `aria-disabled`. O leitor de tela deixa de anunciar "link, indisponível".
- **Uma página atual só:** na prop `items`, só um item recebe `aria-current`, o primeiro com `isCurrent` ou, sem nenhum, o último. Um item do meio sem `href` vira texto simples (`data-slot="breadcrumb-text"`). Antes, os dois casos anunciavam duas páginas atuais.
- **Ícone do item:** os ícones dentro do link, da página atual e do texto ficam com 16px.
- **Novo export:** `breadcrumbTextStyles`.
