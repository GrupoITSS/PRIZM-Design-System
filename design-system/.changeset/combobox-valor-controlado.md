---
"@grupoitss/prizm-ui": patch
---

Combobox: na API por props, a seleção única passa a respeitar `value` e `onValueChange`. Antes, as duas props eram ignoradas sem aviso e o valor não ficava controlado; só o `multiple` e a composição por `children` funcionavam.
