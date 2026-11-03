---
"@grupoitss/prizm-ui": patch
---

**Label: decisões de 30/10/2026**

- **`className` agora vence as classes base.** A ordem do `cn` estava invertida. Efeito nos componentes que usam o Label: o `FieldLabel` passa a `leading-snug` e fica mais alto em uma linha; o Dropzone desabilitado passa a `text-muted-foreground`.
- **Asterisco em `destructive`,** o mesmo vermelho do erro. Tem 4,22:1 no Docnix escuro e 4,43:1 no Digitrol claro, abaixo de 4,5:1: exceção registrada pelo time em 03/11.
- **Disabled com opacidade 70,** sem mudar o peso.
