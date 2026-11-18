---
"@grupoitss/prizm-ui": minor
---

ButtonGroup: acessibilidade e separador, com as decisões de 17 e 18/11/2026.

- **Nome do grupo:** sem `aria-label` nem `aria-labelledby`, o grupo avisa no console em desenvolvimento.
- **Botão só de ícone na lista `buttons`:** cada item aceita `aria-label`, repassado ao Button.
- **Separador automático:** `separatorBetween` passa a ter o padrão `"auto"`, que põe o separador quando nenhum botão é `outline`. Antes, o padrão era `false`. Para manter o comportamento antigo, passe `separatorBetween={false}`.
- **Cor do separador:** segue a variante do botão anterior. Fica em `primary-foreground` a 20% depois de `default` e `destructive`, e em `border` nos outros. Antes, era sempre `primary-foreground` a 20%, e sumia sobre o `secondary`.
