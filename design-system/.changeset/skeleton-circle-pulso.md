---
"@grupoitss/prizm-ui": patch
---

**Skeleton: `circle` sempre redondo e pulso que para (decisões de 27/10/2026)**

- **`shape="circle"` ganha `aspect-square`.** Antes, `pill` e `circle` geravam a mesma classe (`rounded-full`), e o círculo só ficava redondo com altura e largura iguais. Agora basta um tamanho: `<Skeleton shape="circle" className="size-10" />`. Quem já passa `h-10 w-10` não vê diferença.
- **O pulso roda 2 ciclos (4s) e para com o bloco cheio** (`[animation-iteration-count:2]!` sobre o `animate-pulse`). A WCAG 2.2.2 (nível A) pede um jeito de parar movimento que dura mais de 5s ao lado de outro conteúdo; o bloco cinza continua no lugar até o conteúdo chegar.
- **Sem `motion-reduce`:** o pulso é igual com reduzir movimento, para deixar claro que está carregando (WCAG 2.3.3 é AAA, fora do critério).
