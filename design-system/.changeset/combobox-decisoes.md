---
"@grupoitss/prizm-ui": minor
---

**Combobox: foco, erro, disabled, size e nomes em pt-BR**

- **Combobox** passa a mostrar o foco como o Input: anel de 2px em `ring`, borda transparente. Antes, o Default não tinha indicador (o InputGroup por children zerava o anel) e o Multiple usava `ring-3 ring-ring/50` (1,66:1 no PAS · CMS escuro).
- **Combobox**: `disabled` deixa a caixa inteira a 50% e o `disabled` nativo no input. Antes só marcava `data-disabled`, e o campo continuava no Tab.
- **Combobox**: `aria-invalid` e `aria-describedby` na API por props chegam ao input, com borda `destructive`. Antes essas props paravam no Root.
- **Combobox** ganha `size` (`sm` | `md` | `lg`), o mesmo do Input. Padrão `md`.
- **Combobox**: padrões em pt-BR (`Selecionar…`, `Nenhum item encontrado.`). O botão do chip passa a se chamar `Remover {valor}`.

**Quebra:** quem dependia de `placeholder="Select..."` ou `emptyMessage="No items found."` como padrão precisa passar o texto; os botões de ícone e o pt-BR dos padrões são a correção de acessibilidade (3.1.2, 4.1.2).
