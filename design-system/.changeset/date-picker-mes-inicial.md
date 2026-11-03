---
"@grupoitss/prizm-ui": patch
---

**DatePicker abre no mês da data escolhida**

- Antes, o calendário abria sempre no mês de hoje: com uma data de outro mês, o dia escolhido ficava fora da tela e o foco ia para hoje (WCAG 2.4.3, pendência 2 da documentação de 27/10). Agora o calendário abre no mês do `value` (no intervalo, no mês de `value.from`). Quem passa `calendarProps.defaultMonth` continua no controle.
