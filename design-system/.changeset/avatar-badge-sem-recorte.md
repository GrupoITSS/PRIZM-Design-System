---
"@grupoitss/prizm-ui": patch
---

**Avatar: o badge não é mais cortado**

- A raiz do Avatar tinha `overflow-hidden` com `rounded-full`, e o `AvatarBadge` fica dentro dela: o badge saía cortado em quarto de círculo. A raiz deixa de cortar; a imagem (`AvatarImage`) passa a `rounded-full`, como as iniciais já eram.
- Quem punha outro conteúdo dentro do Avatar contando com o recorte da raiz precisa arredondar esse conteúdo.
