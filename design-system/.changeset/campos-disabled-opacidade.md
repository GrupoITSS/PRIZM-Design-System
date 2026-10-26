---
"@grupoitss/prizm-ui": minor
---

**Campos: disabled com opacidade 50%**

- **Input**, **Select**, **Textarea**, **DatePicker** e **InputGroup** passam a mostrar o disabled com a aparência normal do campo e opacidade 50% (`disabled:opacity-50`), como o Button. Antes, o disabled tinha fundo `bg-muted`, borda transparente e sem sombra (decisão de 21/10/2026, revista em 26/10/2026): o campo desabilitado parecia um botão secondary.
- **InputGroup**: a caixa inteira fica a 50%. O campo de dentro (`InputGroupInput`, `InputGroupTextarea`) e os complementos não somam outra opacidade; antes, os complementos ficavam a 50% dentro de uma caixa em `bg-muted`.
- O cursor continua `not-allowed`, e o atributo `disabled` continua no elemento.
