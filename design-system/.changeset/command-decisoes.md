---
"@grupoitss/prizm-ui": minor
---

**Command: decisões de 03/11/2026**

- **Textos padrão em pt-BR:** "Digite um comando ou busque…" e "Nenhum resultado encontrado.". Testes que procuram os textos em inglês precisam mudar.
- **A busca tem nome:** prop `label`, padrão "Buscar comandos", lida pelo leitor de tela.
- **CommandDialog com descrição** escondida em pt-BR, e o Radix para de avisar no console.
- **Item de 32px** (antes 40px) e `rounded-sm`, como o Select. O título do grupo fica alinhado ao item (`px-2`).
- **Ícone de busca em `muted-foreground`,** sem opacidade, e contêiner em `rounded-lg`.
- **Correção: `CommandDialog` com `trigger` abria vazio.** O `trigger` ativava a API por props do Dialog, que ignorava o Command dos children. Agora o Dialog abre com a busca e a lista.
