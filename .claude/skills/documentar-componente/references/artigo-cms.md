# Artigo no CMS

Referência da etapa 6. Workspace `prizm_design_system` em produção (`https://sgq.pas.app.br/cms/prizm_design_system/articles`), pelo MCP `prizm-cms`.

## IDs

| O quê | id |
| --- | --- |
| Pasta Componentes | `914832f9-305e-4fd5-8d18-414e3c16b8de` |
| Artigo modelo "Button" (0001) | `978a4aa8-4d01-484f-a0bb-93d10c59c219` |
| Artigo "Critério de acessibilidade" (0002) | `27090792-48ee-49bb-a162-291c7c97c92e` |
| Versão de documentação v1 | `9aab337b-ff81-406a-bff1-1de369b6eedd` |

Confira com `get_content_tree` e `search` se algo não bater: a árvore pode ter mudado.

## Antes de escrever

1. `fetch` do artigo "Button" e copie a estrutura e o tom. Ele é o modelo, não este resumo.
2. `search` pelo nome do componente: o título é único no workspace inteiro. Se já houver artigo, atualize com `update_article_content` (com ok), não crie outro.
3. `list_content_nodes` se for usar bloco que não é texto simples.

## Estrutura (shadcn + seções Prizm)

```
<Uma ou duas frases: o que faz. Base shadcn/ui, ligado ao [PRIZM] Design Tokens_Core.>

> [!NOTE]
> Versão X. Código na main do PRIZM-Design-System: PRs que entraram.

![Prévia · PAS claro](file:<id> "Prévia · PAS claro")

## Instalação        (npm install @grupoitss/prizm-ui)
## Uso               (import de @grupoitss/prizm-ui/<nome>, exemplo mínimo; marca/produto/modo vêm de data-brand, data-product, data-mode)
## Exemplos          (### por variante, tamanho, composição; imagem + bloco tsx)
## API               (tabela Prop | Tipo | Padrão | Descrição, conferida com o .tsx e o inventário; variante removida por decisão: diga como migrar; ### Figma × código)
---
## Quando usar       (hierarquia, Faça, Evite)
## Estados           (tabela Estado | Visual | Código; regra de hover se couber)
## Tokens por variante
## Acessibilidade    (menção ao Critério; bullets; tabela de contraste marca · tema)
## Marcas            (playground; tabela control-height/raio por marca; diferenças por marca)
## Changelog         (Versão | Data | Mudança)
## Rastreabilidade   (tabela Ponta | Onde | Leva a, nota do Code Connect, divergências abertas; ver references/rastreabilidade.md)
```

A seção Rastreabilidade substitui a antiga "Referências": os links de Figma, código e shadcn ficam na tabela dela. Se ela ainda não pode ser escrita (mapa de tokens sem PR), escreva o artigo sem ela e complete na etapa 7.

Seções sem conteúdo para o componente saem; não deixe título vazio.

Menção a outro artigo: `[Critério de acessibilidade](pas-mention:article/27090792-48ee-49bb-a162-291c7c97c92e?version=9aab337b-ff81-406a-bff1-1de369b6eedd)`. Use `id` e `version.id` do `search`, não o código 0002. Menção a alvo inexistente faz a escrita falhar.

Escrita: português do Brasil, frases curtas, sem emoji. Números com vírgula (4,53:1). Nomes de token e prop em `código`.

## Imagens

1. Exporte cada seção do frame de doc com `get_screenshot` do MCP do Figma (`fileKey`, `nodeId`, `maxDimension` até 2400). O resultado traz uma URL de asset; baixe com `curl -sfL -o <nome>.png "<url>"` para uma pasta no scratchpad. A exportação sai em 1x: `maxDimension` não amplia.
2. Olhe cada PNG antes de subir. Se algo foi alterado pelo plugin nesta sessão, leia um pixel com `scripts/px.py` para conferir que gravou.
3. Suba todas de uma vez: `bash "$(git rev-parse --show-toplevel)/.claude/skills/documentar-componente/scripts/subir-imagem.sh" <pasta>/*.png`. Ele imprime `arquivo  file:<id>`.
4. No Markdown: `![alt descritivo](file:<id> "Legenda")`. A `url` da resposta aponta para localhost (bug do CMS); ignore.

Não comprima nem redimensione as imagens. Não use o base64 de `images` quando há shell: gasta contexto.

## Escrever

`create_article` com `title` = nome do componente, `folderId` da pasta Componentes e o Markdown. O artigo nasce rascunho. Mostre o link a quem pediu, para revisão; o dono do DS aprova antes de publicar.

**Nunca chame `publish_article` sem pedido explícito.** O MCP não apaga nem despublica: publicar só se desfaz publicando outra versão por cima.
