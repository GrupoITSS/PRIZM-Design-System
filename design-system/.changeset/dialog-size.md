---
"@grupoitss/prizm-ui": minor
---

Dialog: prop `size` (padrão `lg`), a pedido do Pricing. Limita a largura na escala `max-width/*` do Core: `sm` 384px, `md` 448px, `lg` 512px, `xl` 576px, `2xl` 672px, `3xl` 768px, `4xl` 896px e `full`, sem limite. Vale no `Dialog` (API por props) e no `DialogContent`, que sai com `data-size`.

A largura passa a ser sempre a tela menos 32px, limitada pelo `size`. Antes, entre 544px e 640px de tela o Dialog passava de 512px; agora fica em 512px.

Novos exports: `dialogContentVariants`, `dialogSizes` e os tipos `DialogSize` e `DialogContentVariantProps`. `dialogContentStyles` não traz mais largura máxima: quem usa só a string precisa somar `max-w-*`.

O `contentClassName` volta a trocar a largura em telas grandes (o Textarea expandido usa `max-w-6xl`, que o `sm:max-w-lg` anterior travava em 512px).
