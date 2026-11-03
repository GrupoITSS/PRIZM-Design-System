---
"@grupoitss/prizm-ui": patch
---

**Asterisco de obrigatório igual em todos os rótulos**

- **Select:** com `label` e `required`, o asterisco passa a vir do `required` do `FieldLabel`, em `destructive-strong`. Antes era feito à mão, em `destructive`, com 4,22:1 no pior caso.
- **FieldLabel:** o asterisco fica a `spacing/0-5` do texto, como no Figma. Antes, o `gap-2` do `FieldLabel` o deixava a cerca de 10px.
- **PhotoUpload:** asterisco em `destructive-strong`.
