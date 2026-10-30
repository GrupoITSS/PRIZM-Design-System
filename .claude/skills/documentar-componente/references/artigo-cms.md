# Artigo no CMS

Referência da etapa 6. Workspace `prizm_design_system` em produção (`https://sgq.pas.app.br/cms/prizm_design_system/articles`), pelo MCP `prizm-cms`.

## IDs

| O quê | id |
| --- | --- |
| Pasta Componentes | `914832f9-305e-4fd5-8d18-414e3c16b8de` |
| Artigo modelo "Combobox" (0101) | `98920a34-adcb-4477-b99c-a51817140dc6` |
| Artigo "Critério de acessibilidade" (0002) | `27090792-48ee-49bb-a162-291c7c97c92e` |
| Versão de documentação v1 | `9aab337b-ff81-406a-bff1-1de369b6eedd` |

Confira com `get_content_tree` e `search` se algo não bater: a árvore pode ter mudado.

## Antes de escrever

1. `fetch` do artigo "Combobox" (0101, id `98920a34-adcb-4477-b99c-a51817140dc6`) e copie a estrutura e o tom. Ele é o modelo do formato novo (DS-61, 29/10/2026), não este resumo. O "Button" ficou no formato antigo até ser revisado.
2. `search` pelo nome do componente: o título é único no workspace inteiro. Se já houver artigo, atualize com `update_article_content` (com ok), não crie outro.
3. `list_content_nodes` se for usar bloco que não é texto simples.

## Estrutura (shadcn + seções Prizm)

```
<Uma ou duas frases: o que faz. Base shadcn/ui, ligado ao [PRIZM] Design Tokens_Core.>

> [!NOTE]
> Status: estável · Desde a 0.2.0

![Prévia · PAS claro](file:<id> "Prévia · PAS claro")

## Instalação        (npm install @grupoitss/prizm-ui)
## Uso               (import de @grupoitss/prizm-ui/<nome>, exemplo mínimo; marca/produto/modo vêm de data-brand, data-product, data-mode)
## Exemplos          (### por variante, tamanho, composição; imagem + bloco tsx)
## API               (tabela Prop | Tipo | Padrão | Descrição, conferida com o .tsx e o inventário; variante removida por decisão: diga como migrar; ### Figma × código; ### Prizm × shadcn)
---
## Quando usar       (tabela Preciso de… | Use; ### Não use para; ### Deve e não deve, com código)
## Anatomia          (imagem + lista numerada das partes, com tokens)
## Estados           (tabela Estado | Visual | Código; regra de hover se couber)
## Combinações inválidas (tabela Combinação | Por quê | Em vez disso | Tratamento)
## Tokens por variante   (ou Tokens por estado, quando o componente não tem variantes)
## Acessibilidade    (menção ao Critério; bullets; tabela de contraste marca · tema)
## Marcas            (playground; tabela control-height/raio por marca; diferenças por marca)
## Changelog         (Versão | Data | Mudança)
## Rastreabilidade   (tabela Ponta | Onde | Leva a, nota do Code Connect, divergências abertas; ver references/rastreabilidade.md)
```

A seção Rastreabilidade substitui a antiga "Referências": os links de Figma, código e shadcn ficam na tabela dela. Se ela ainda não pode ser escrita (mapa de tokens sem PR), escreva o artigo sem ela e complete na etapa 7.

Seções sem conteúdo para o componente saem; não deixe título vazio. As do formato novo (status, Prizm × shadcn, Não use para, Deve e não deve, Combinações inválidas) não saem: são o que um agente de IA precisa para não inventar.

## Formato novo (DS-61)

O artigo é lido por pessoas e por agentes (Cursor, Claude). O agente conhece o shadcn do treino, não o Prizm: ele precisa da regra em texto, da alternativa nomeada e do que muda em relação ao shadcn.

**Status e versão.** O aviso do topo tem só isto: `Status: <status> · Desde a <X.Y.Z>`. O status descreve o componente, nunca o artigo. A versão é a primeira em que o componente saiu no pacote. Histórico, PRs e mudanças ficam no Changelog: o que está no topo envelhece e ninguém volta para corrigir.

| Status | Quando |
| --- | --- |
| beta | A API ou o visual ainda podem mudar sem aviso. |
| estável | A API e o visual estão fechados. Mudança segue o versionamento. |
| obsoleto | Tem substituto. Sempre com link para ele e o caminho de migração. |

Componente que ainda não saiu em pacote: `Desde a próxima versão`. Ao lançar a versão, os artigos que dizem "próxima versão" são atualizados (passo em `docs/versionamento.md`).

**Prizm × shadcn.** Subseção da API, ao lado de Figma × código. Tabela `Ponto | shadcn | Prizm`, com tudo o que um agente faria errado copiando o shadcn: API por props, tamanhos, foco, disabled, textos padrão em pt-BR, tokens próprios. O nosso código é a fonte da verdade: a coluna Prizm sai do `.tsx` e dos estilos da `origin/main`, nunca da memória nem de outro artigo. A coluna shadcn sai do código dele (`apps/v4/registry/new-york-v4/ui/<nome>.tsx`, no repositório do shadcn), com a data da consulta. O shadcn é só o ponto de comparação: uma diferença nesta tabela não é motivo para mudar o nosso componente. Uma diferença com a versão anterior do Prizm vai para o Changelog, não para esta tabela.

**Não use para.** Lista em Quando usar, depois da tabela `Preciso de… | Use`. Uma linha por item, sempre com a alternativa nomeada e mencionada: `Não use para lista curta e fechada, sem busca → use [Select](pas-mention:…)`. Quando a alternativa ainda não tem artigo, nomeie o componente em `código`.

**Deve e não deve.** Substitui o Faça/Evite. Cada regra é uma frase que começa com "Deve" ou "Não deve", uma por linha, e vem com um bloco `tsx` que mostra o certo e o errado:

```tsx
// Deve: rótulo visível ligado ao campo
<FieldLabel htmlFor="framework">Framework</FieldLabel>
<Combobox id="framework" items={frameworks} />

// Não deve: placeholder no lugar do rótulo
<Combobox items={frameworks} placeholder="Framework" />
```

As imagens de Faça e evite do frame de doc continuam, abaixo das regras. A regra não vive só na imagem.

**Combinações inválidas.** Seção própria, depois de Estados. Tabela `Combinação | Por quê | Em vez disso | Tratamento`: props que não funcionam juntas, prop que exige outra, estado que não existe numa variante, propriedade do Figma sem par no código. Saia do `cva`, dos tipos, dos testes e das divergências do mapa de tokens; não invente.

Combinação inválida também é suspeita de bug: leia o código de cada uma (no Combobox, foi assim que apareceu o PR #146). Cada linha leva um tratamento, proposto na etapa e decidido pelo dono do DS:

| Tratamento | Quando |
| --- | --- |
| documentar | O comportamento é esperado e não dá para impedir. |
| travar no tipo | O TypeScript consegue impedir a combinação. |
| avisar no console | Só dá para detectar em execução. O aviso aparece em desenvolvimento. |
| corrigir em PR | É bug: o componente devia funcionar. |

**Escrita para agente.**

- Em texto e tabelas, todo valor aparece com o nome de token do Figma (`color/ring`, `control-height/md`, `radius/lg`). Valor resolvido (px, hex) só nas tabelas de Marcas e de contraste.
- Dentro de bloco `tsx`, use a classe do Tailwind (`ring-ring`, `h-control-height-md`), que é o que o agente copia para o código. A conversão entre os dois está em [Regras de token](pas-mention:article/7601392c-e07b-4574-89c5-09d326f7cc66?version=9aab337b-ff81-406a-bff1-1de369b6eedd): mencione a página no artigo.
- Regra é frase de "deve" ou "não deve", uma por linha. Nada de regra só em imagem ou só em legenda.
- Nome igual em Figma, código e artigo. Divergência vai para "Figma × código" e para as divergências abertas.

## Pronto para revisão

O artigo só vai para o dono do DS revisar com tudo isto:

- [ ] Aviso do topo só com status e versão; histórico no Changelog
- [ ] API conferida com o `.tsx`, com todas as variantes e props em uso citadas (documentadas ou removidas com migração)
- [ ] Figma × código e Prizm × shadcn: coluna Prizm conferida no nosso código, coluna shadcn no código dele, com a data
- [ ] Não use para, com a alternativa nomeada
- [ ] Deve e não deve, uma regra por linha, cada uma com código
- [ ] Combinações inválidas, cada uma com o tratamento
- [ ] Nome de token do Figma em texto e tabelas; classe do Tailwind nos blocos `tsx`
- [ ] Acessibilidade com a tabela de contraste por marca e tema
- [ ] Rastreabilidade completa (ou marcada para a etapa 7)

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
