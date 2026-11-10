---
"@grupoitss/prizm-tokens": minor
---

**Novos tokens `color/decoration-*`: decoração por marca (DS-67)**

- **Tokens**: seis intensidades para ilustração e fundo decorativo, `color/decoration-subtle`, `-soft`, `-muted`, `decoration`, `-strong` e `-bold` (classes `bg-decoration-*`, `border-decoration-*` etc.). Cada marca tem a sua paleta: PAS e Tchello em blue, PAS · CMS em violet, Docnix em docnix purple, ITSS · AFIPE em afipe petrol e ITSS · Digitrol em cyan.
- **Claro e escuro**: os degraus são escolhidos por contraste, não por número, para o peso visual ser parecido nos dois modos (o 500 espelhado no escuro ficaria bem mais forte). Por isso são 6 intensidades, não 11.
- **Uso**: só ilustração, capa, skeleton decorativo e fundo de marca; nunca em componente, texto ou estado. Não há `decoration-neutral`. O decoration da Digitrol é ciano; a `digitrol.navy` continua em uso na sidebar da Digitrol.
- **Estrutura**: pontes `palette/decoration-*` por marca (`pas/base`, `pas/cms`, `docnix/base`, `itss/afipe`, `itss/digitrol`) e semânticos em `themes/light` e `themes/dark`. Não há mudança em componentes.
