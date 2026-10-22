---
"@grupoitss/prizm-ui": patch
---

**InputGroup: foco, erro e disabled como no Input, ordem do Tab e nomes (acessibilidade WCAG 2.2 AA, 22/10/2026)**

- **Anel de foco igual ao do Input.** O grupo usava `ring-[3px] ring-ring/50` (entre 1,66:1 e 3,00:1 contra o fundo) e, no erro, `ring-destructive/20` (entre 1,16:1 e 1,37:1), abaixo do 3:1 (1.4.11). Agora é `ring-2 ring-ring` com a borda transparente; no erro, a borda fica `destructive` e o anel continua `ring` (entre 3,32:1 e 13,41:1).
- **Disabled igual ao do Input.** O grupo usava `opacity-50`; agora fica em `bg-muted`, sem sombra e sem opacidade na caixa (os complementos continuam a 50%).
- **Ordem do Tab segue a tela.** Na API por props, o complemento do início (e o `addonBlockStart`) passa a vir antes do campo no DOM. Antes, um botão no início recebia o foco depois do campo (2.4.3). Na API por children, a ordem continua a do JSX de quem usa.
- **`aria-invalid` sai do `role="group"`**, onde não é suportado. Continua no campo, e o grupo mantém `data-invalid`.
- **`InputGroupButton` passa o `size` ao Button**, e o aviso de dev para botão só de ícone sem nome acessível (`icon-xs`, `icon-sm`) passa a disparar.
