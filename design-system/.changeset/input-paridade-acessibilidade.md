---
"@grupoitss/prizm-ui": minor
"@grupoitss/prizm-tokens": minor
---

**Input: paridade com o Figma e pendências de acessibilidade do critério WCAG 2.2 AA (decisões de 21/10)**

- **Tokens: `color.input` sobe para o degrau 500 no claro e branco a 40% no escuro** (antes `neutral.200` e branco a 15%). A borda era a única coisa que separava o campo da página (o fundo do campo é igual ao da página, 1,00 a 1,07:1) e ficava entre 1,16:1 e 1,47:1 (1.4.11). Agora fica entre 3,62:1 e 4,83:1 contra `background`, `card`, `popover` e `muted`, nas 5 marcas e no Tchello. Muda todos os componentes com `border-input`: Input, Textarea, Select, Combobox, InputGroup, InputOTP, DatePicker, MaskedInput, Calendar, Checkbox, RadioGroup, Dropzone, Pagination, Toggle e o outline do Button.
- **Input: estado de erro.** `aria-invalid` passa a pintar a borda de `destructive`; no foco a borda continua `destructive` e o anel continua `ring`. Antes o campo inválido ficava igual ao Default.
- **Input: foco e disabled iguais em todos os tamanhos.** As regras que estavam só no `md` vão para a base: anel de 2px em `ring` com a borda transparente, disabled em `bg-muted` sem sombra e sem opacidade. O anel `ring/30` dos outros tamanhos ficava entre 1,28:1 e 1,84:1.
- **Input: botão de senha no teclado e com alvo de 24px.** Sai o `tabIndex={-1}`, que deixava mostrar e ocultar a senha só com ponteiro (2.1.1), e o botão passa de 16 × 16px para 24 × 24px (2.5.8).
- **Quebra:** os tamanhos do Input passam a ser `sm`, `md` e `lg`, todos em `control-height`. O antigo `default` vira `lg`, e o antigo `lg` (48px fixo, fora do Core) sai. Para migrar: `size="default"` → `size="lg"`; `size="lg"` → `size="lg"` (fica com a altura de controle da marca). Vale também para `InputGroup` e `InputGroupInput`.
