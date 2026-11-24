---
"@grupoitss/prizm-ui": minor
---

Progress: documentação (decisões de 24/11/2026).

- `status` ganha `default` (padrão, na primária). `info` continua aceito como apelido obsoleto de `default`.
- Chegar a 100% não troca mais o status para `success`: o status é o que o produto passar.
- O indicador de `warning` passa a `warning-strong` (o `warning` ficava abaixo de 3:1 no claro). O trilho segue no tom a 20%.
- Aviso no console, em desenvolvimento, quando a barra não tem `aria-label` nem `aria-labelledby`.
- Exporta `progressStatuses` e o tipo `ProgressStatus`. Sai a classe sem uso `data-[status=complete]`.
- Stories em pt-BR; o rótulo do Field nomeia a barra por `aria-labelledby`.
