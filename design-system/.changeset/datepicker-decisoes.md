---
"@grupoitss/prizm-ui": minor
---

**DatePicker: erro, calendário nomeado e em pt-BR**

- **DatePicker** ganha o estado de erro do Input: `aria-invalid`, `aria-describedby` e `aria-label` vão para o botão, com borda `destructive`. Antes, essas props não chegavam ao botão, e o erro não era anunciado.
- **DatePicker**: o campo não muda no hover, como Input, Select e Textarea. Antes herdava o `hover:bg-accent` do Button outline.
- **DatePicker**: com o calendário aberto, o botão usa o mesmo anel do foco (2px em `ring`, borda transparente).
- **DatePicker**: o calendário aberto tem nome, pela prop nova `calendarLabel` (padrão "Escolher data"). Ao abrir, o foco vai para o dia escolhido (ou hoje), e não para o botão de mês anterior.
- **Calendar**: rótulos em pt-BR por padrão (`locale` do `react-day-picker`), como "Ir para o mês anterior". A prop `locale` continua aceitando outro idioma.
- **Calendar**: dias fora do mês sem opacidade de 50% (mediam 2,34:1), só com `text-muted-foreground`. O foco do dia e dos seletores de mês e ano usa o anel do sistema (2px em `ring`), no lugar de `ring/50` (mediam 1,53:1).
- **Popover** ganha a prop opcional `contentProps` (`aria-label`, `aria-labelledby`, `onOpenAutoFocus`, `onCloseAutoFocus`), repassada ao conteúdo do Radix.
