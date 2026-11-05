---
"@grupoitss/prizm-ui": minor
---

**Input: estado somente leitura (DS-64, 05/11/2026)**

- `readOnly` no Input passa a ter visual próprio: fundo `muted`, sem borda e sem sombra, texto `muted-foreground`. Serve para o valor que já foi preenchido e não se edita direto, como no Cockpit e no Assistente.
- O campo continua focável, com o mesmo anel de 2px em `ring`, e o valor vai junto no formulário.
- O estilo vale só com o atributo `readonly`: campos `disabled` e `type="file"` não mudam.
- Telas que já usam `readOnly` no Input passam a ver o fundo cinza.
