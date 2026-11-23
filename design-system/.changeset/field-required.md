---
"@grupoitss/prizm-ui": minor
---

Field (DS-89): nova prop `required`. O `FieldLabel` mostra o asterisco sozinho e os controles dentro do Field (Input, Textarea, Select, Checkbox, RadioGroup, Switch, InputOTP, Combobox, InputGroup e MaskedInput) recebem `aria-required`. Não liga a validação nativa do navegador: para isso, o controle segue com o próprio `required`. O `required` do `FieldLabel` e o `aria-required` do controle, quando passados, ganham do Field. O DatePicker fica de fora: o gatilho é um `button`, onde `aria-required` não é válido. Novo hook `useFieldRequired`. O Field ganha `data-required`.
