---
"@grupoitss/prizm-ui": minor
---

**Alert e Empty: decisões de 29/10/2026**

- **Alert: tons no padrão de aviso.** `destructive`, `warning` e `success` passam de texto colorido sobre `bg-card` para fundo `<tom>-weak`, borda e ícone no tom e título e descrição em `<tom>-strong`. O texto warning tinha 2,15:1 nas 5 marcas no claro, e o destructive 3,84:1 no Docnix escuro; agora o pior caso é 5,69:1 (warning no Digitrol claro).
- **Alert: nova variante `info`**, no mesmo padrão (`info-weak`, `info`, `info-strong`). Cobre o `kind="info"` do AlertMessage.
- **Alert: `default` neutro.** Fundo `card`, borda `border`, ícone e título `foreground`, descrição `muted-foreground`.
- **Alert: espaçamento 12/16** (`py-3 px-4`, antes `p-4`), como no Figma e no shadcn atual. O título ganha `text-sm` e `leading-5`, e o ícone fica alinhado à primeira linha.
- **Alert: papel pela variante (WCAG 4.1.3).** `destructive` e `warning` usam `role="alert"`, que interrompe o leitor de tela; `default`, `success` e `info` usam `role="status"`. A prop `role` sobrescreve.
- **Alert: `AlertTitle` vira `div`** (antes `h5`), para não entrar na estrutura de títulos da página (WCAG 1.3.1).
- **AlertMessage marcado como `@deprecated`.** Use o Alert: `info` → `info`, `warning` → `warning`, `error` → `destructive`, `success` → `success`.
- **Empty: `role="status"` por padrão (WCAG 4.1.3).** Uma busca sem resultado ou uma tabela vazia passam a ser anunciadas sem interromper a leitura. A prop `role` sobrescreve.
- **Empty: link da descrição no padrão do Link do Button.** Sempre sublinhado, e no hover o sublinhado passa a 2px. Sai o hover em `text-primary`, que tinha 3,53:1 a 4,06:1 no escuro.

**Quebra:** quem buscava o Alert por `getByRole("alert")` nas variantes `default`, `success` ou `info` passa a usar `getByRole("status")`, ou passa `role="alert"`. Quem estilizava `h5` dentro do Alert usa `[data-slot=alert-title]`.
