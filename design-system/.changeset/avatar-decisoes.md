---
"@grupoitss/prizm-ui": minor
---

**Avatar: decisões de 04/11/2026**

- **Tamanho padrão `md`** (32 px), como no shadcn e no Figma. Antes era `xl` (48 px).
- **Sem borda**: sai `border border-border` da raiz.
- **Iniciais por tamanho**: `text-xs` em `xs` e `sm`, `text-sm` de `md` para cima.
- **Prop `status`** (`online`, `away`, `busy`, `offline`), opcional, nas duas APIs: sem ela, não há badge; com ela, o badge aparece com a cor do status (`bg-success`, `bg-warning`, `bg-destructive`, `bg-muted-foreground`) e o texto oculto em pt-BR (Online, Ausente, Ocupado, Offline). `AvatarBadge` também aceita `status` (padrão `online`).
- **Badge no tamanho do avatar**: 6, 8, 10, 12 e 14 px. Antes, 10 px fixo.
- **Contador no tamanho do grupo**: `AvatarGroupCount` acompanha o `size` dos avatares (padrão `md`). Antes, 48 px fixo.
- **Nome acessível**: aviso no console em desenvolvimento quando há `src` sem `alt`. Com `alt`, as iniciais ficam `aria-hidden` e o leitor de tela lê o `alt`; com `alt=""`, o avatar é decorativo.
- **Tipos**: `AvatarBadgeProps` e `AvatarGroupCountProps` passam a `HTMLSpanElement`, o elemento que já era desenhado.
- **Migração:** `<Avatar>` sem `size` passa a ter 32 px. Para manter 48 px, passe `size="xl"`. Quem usava `<AvatarBadge className="bg-…" />` para trocar a cor pode passar `status`.
