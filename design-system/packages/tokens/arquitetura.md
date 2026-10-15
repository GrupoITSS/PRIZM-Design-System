## Export de tokens para Style Dictionary — seguir a árvore de herança

A fonte da verdade são os sets do Tokens Studio em `tokens/` e o `$themes.json`.
O build NÃO deve achatar tudo num arquivo por combinação. A saída precisa
espelhar a árvore de herança: cada camada gera só os tokens que ela define.

### Árvore (ordem de merge: quem vem depois sobrescreve)

1. global/primitives.json   → nunca é emitido; só serve para resolver valores
2. global/foundations.json  → padrões comuns a todas as marcas
3. <marca>/base.json        → tema completo da marca
4. <marca>/<produto>.json   → SÓ o que o produto sobrescreve da base
5. themes/light.json | dark.json   → color.<papel> → {palette.<papel>.light|dark}
6. platforms/desktop.json | mobile.json

Marcas e produtos:
- pas/base.json + pas/cms.json (o CMS altera só cores e fonte)
- itss/base.json + itss/afipe.json + itss/digitrol.json (podem alterar tudo)
- docnix/base.json (os produtos não sobrescrevem nada → sem arquivo de produto)
- tchello/base.json herda de pas/base.json até ter dados próprios
  (merge: pas/base → tchello/base)

### Regras do build
- Uma instância/plataforma do Style Dictionary por set. Inclua no `include`
  todos os sets abaixo dele na cadeia (para resolver referências) e emita
  só os tokens cujo `filePath` é o próprio set (filter por filePath).
- `outputReferences: true`, exceto quando a referência aponta para um
  primitivo: aí o valor sai resolvido (primitivos nunca viram variável CSS).
- Usar @tokens-studio/sd-transforms (preprocessor "tokens-studio") para
  tipos, cores com alpha, dimensões e tipografia composta.
- Seletores CSS (a troca acontece por cascata, como os modos do Figma):
  - foundations → :root
  - <marca>/base → [data-brand="<marca>"]
  - <marca>/<produto> → [data-brand="<marca>"][data-product="<produto>"]
  - light/dark → [data-mode="light"] / [data-mode="dark"]
  - desktop/mobile → [data-platform="desktop"] / [data-platform="mobile"]
- Saída espelhando a árvore: dist/css/foundations.css, dist/css/pas/base.css,
  dist/css/pas/cms.css, dist/css/themes/dark.css… e um index.css que importa
  na ordem da cadeia.

### Critério de aceite (obrigatório)
Escreva um teste que, para cada uma das 5 combinações do Figma
(PAS, PAS·CMS, Docnix, ITSS·AFIPE, ITSS·Digitrol) × Light/Dark × Desktop/Mobile,
aplique as camadas em ordem, resolva todos os color.* e o restante dos tokens
semânticos, e compare com o export achatado do Tokens Studio
(themes com permutateThemes). Zero diferenças = pronto.
Também deve falhar se um arquivo de produto contiver um token com o mesmo
valor da base (seria repetição, não sobrescrita).