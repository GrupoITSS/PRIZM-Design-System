---
"@grupoitss/prizm-ui": minor
---

Field (DS-89): nova prop `required`. O `FieldLabel` mostra o asterisco sozinho e os controles dentro do Field (Input, Textarea, Select, Checkbox, RadioGroup e Switch) recebem `aria-required`. Não liga a validação nativa do navegador: para isso, o controle segue com o próprio `required`. O `required` do `FieldLabel` e o `aria-required` do controle, quando passados, ganham do Field. Novo hook `useFieldRequired`. O Field ganha `data-required`.
