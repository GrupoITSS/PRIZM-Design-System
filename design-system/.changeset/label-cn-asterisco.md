---
"@grupoitss/prizm-ui": patch
---

**Label: decisões de 30/10/2026**

- **`className` agora vence as classes base.** A ordem do `cn` estava invertida. Efeito nos componentes que usam o Label: o `FieldLabel` passa a `leading-snug` e fica mais alto em uma linha; o Dropzone desabilitado passa a `text-muted-foreground`.
- **Asterisco em `destructive-strong`,** de 7,62 a 10,61:1. Com `destructive`, ficava em 4,22:1 no pior caso.
- **Disabled com opacidade 70,** sem mudar o peso.
