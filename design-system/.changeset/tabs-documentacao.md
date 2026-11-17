---
"@grupoitss/prizm-ui": minor
---

Tabs (documentação de 17/11/2026): foco visível no `underline`, que não tinha nenhum (WCAG 2.4.7): as duas variantes usam o anel do Prizm (`ring` de 3px com `ring-offset` de 2px), também no painel. Novos exports `TabsList`, `TabsTrigger` e `TabsContent`, para compor como no shadcn; a API por `items` usa as mesmas partes. Novo `items[].badge` (e `badge` no `TabsTrigger`): número ou texto vira um Badge `shape="number"` depois do rótulo e entra no nome da aba ("Pendentes 3"). Hover em `foreground` também no `pills`. O `pills` segue o shadcn atual e o Figma: lista com 36px (`h-9`, `p-[3px]`, `rounded-lg`) e aba com `px-2 py-1 rounded-md` (antes `h-10`, `p-1`, `px-3 py-1.5` e `rounded-sm`).

**Quebra:** a prop `orientation` saiu: não tinha estilo vertical, e nenhum produto usa abas verticais. Quem passava `orientation="horizontal"` pode só apagar a prop.
