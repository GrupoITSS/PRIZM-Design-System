---
"@grupoitss/prizm-ui": minor
---

**Badge dentro do Button**

- **Button** marca `data-variant` (como o shadcn), além de `data-slot="button"`.
- **Badge** dentro de um Button cheio (`default`, `destructive`) inverte as cores: fundo na cor do texto do botão e texto na cor do botão. Antes, um Badge `default` (`bg-primary`) sumia sobre o botão primary. Contraste do número: 4,88 a 13,41:1 no default e 4,53 a 5,84:1 no destructive, nas 5 marcas. Em botões neutros (secondary, outline, ghost) o Badge mantém as próprias cores, como no "Fixadas 8" e no "Limpar filtros 3" da AFIPE.
