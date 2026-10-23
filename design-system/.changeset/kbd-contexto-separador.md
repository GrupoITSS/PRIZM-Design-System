---
"@grupoitss/prizm-ui": minor
---

**Kbd: contexto no botão e separador**

- **Kbd** dentro de um Button segue a regra do Badge (Figma "Contexto"): em botão cheio (`default`, `destructive`) usa a cor do texto do botão com fundo dela a 20%; em botão neutro (secondary, outline, ghost, link, text) mantém `bg-muted` e `text-muted-foreground`. Antes, ele pegava a cor do texto de qualquer botão. No tooltip nada muda.
- **Kbd** ganha a prop `separator`, para teclas pressionadas juntas: `<Kbd keys={["Ctrl", "Alt", "B"]} separator="+" />`, como o KbdGroup "+ Separated" do Figma. O separador sai em `text-xs`, peso normal, na cor do texto da tecla.
- Em aberto (decisão de 23/10/2026): em botão cheio, o texto da tecla fica abaixo de 4,5:1 (3,33 a 7,31:1 no primary, 3,47 a 4,23:1 no destructive), como já era antes.
