---
"@grupoitss/prizm-ui": minor
---

**InputOTP: escala, erro, foco e leitura da família do campo**

- **InputOTP** passa a `sm`, `md` e `lg` em `control-height`, com o slot quadrado (`size-control-height-*`), como o Input. Antes eram alturas fixas de 32, 40 e 48px.
- **Quebra:** `size="default"` sai. Para migrar: `size="default"` → `size="md"` (ou sem `size`, que já é `md`). O `lg` passa de 48px à altura de controle da marca.
- **InputOTP**: o contêiner usa `bg-input-background` e `shadow-xs`, como o Input (antes `bg-background`, sem sombra).
- **InputOTP** aceita `aria-invalid` e `aria-labelledby`. O erro mostra só a borda `destructive`; o anel `ring-destructive/20` saiu, e no foco o anel continua `ring`. `invalid` continua como apelido de `aria-invalid`.
- **InputOTP**: `separator={true}` desenha o traço (`Minus`) em `muted-foreground`, como o Figma e o shadcn. Antes era um ponto (`Dot`).
- **InputOTP**: o caractere de `placeholder` sai em `muted-foreground`, para não parecer preenchido.
- **InputOTP**: slots e separadores ficam com `aria-hidden`; o valor, o nome e o estado continuam no input. Antes o leitor de tela repetia o valor, caractere a caractere, e anunciava "separador".
- **InputOTP**: em desenvolvimento, avisa no console quando o campo não tem nome (sem `FieldLabel` ligado pelo `id`, `aria-label` nem `aria-labelledby`).
