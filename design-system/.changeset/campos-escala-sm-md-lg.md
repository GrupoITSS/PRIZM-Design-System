---
"@grupoitss/prizm-ui": minor
---

**Select, Textarea, DatePicker e InputGroup: mesma escala e mesmos estados do Input (decisões de 21/10)**

- **InputGroup: a altura do contêiner segue o Input.** Depois do PR #104, um InputGroup `lg` ficava com o contêiner de 48px (`h-12`) e o campo de 40px dentro. Agora `sm`, `md` e `lg` usam `control-height`, e a regra do `default` sai.
- **Select, Textarea e DatePicker em `sm`, `md` e `lg`**, como o Input. No Select e no DatePicker a altura vem de `control-height`. O antigo `default` vira `lg`, e o `lg` antigo sai: no Select e no DatePicker era 48px fixo, fora do Core; no Textarea, `min-h-24`.
- **Foco e disabled iguais em todos os tamanhos.** As regras do `md` vão para a base: anel de 2px em `ring` com a borda transparente, disabled em `bg-muted` sem sombra e sem opacidade. Antes, `sm`, `default` e `lg` usavam `ring/30` (de 1,28:1 a 1,84:1 contra o fundo, abaixo do 3:1) e `opacity-50`.
- **Select:** o texto do disabled passa de `foreground` a `muted-foreground`, como no Input. O hover deixa de pintar o fundo de `accent` nos tamanhos que não eram `md`.
- **DatePicker:** `ring-offset-0` anula o espaço de 2px do anel que o Button (gatilho) traz.
- **Quebra:** `size="default"` sai do Select, do Textarea e do DatePicker. Para migrar: `size="default"` → `size="lg"`; `size="lg"` → `size="lg"` (no Select e no DatePicker, fica com a altura de controle da marca, em vez de 48px).
