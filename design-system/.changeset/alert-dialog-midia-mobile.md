---
"@grupoitss/prizm-ui": patch
---

**AlertDialog: mídia a 8px do título no celular**

- No celular, a mídia ficava a 16px do título (`mb-2` na mídia mais o `gap-2` do cabeçalho), contra 8px (`spacing/2`) no Figma. Sai o `mb-2`: fica só o `gap-2`, como no Figma. A partir de 640px, nada muda (mídia ao lado do texto, `gap-x-6`).
