---
"@grupoitss/prizm-ui": patch
---

**Calendar: decisões de 03/11/2026**

- **Correção: o dia focado voltou a mostrar o foco.** O `ring-0!` do dia apagava o anel, e o teclado andava pela grade sem sinal visível. Agora o dia usa o foco do Button: anel de 3px em `ring`, com offset de 2px em `ring-offset`, também no dia escolhido.
- **Dias da semana e número da semana em `text-xs`** (antes `text-[0.8rem]`), como no Figma.
- **Stories em pt-BR,** com a tag `documentado`. A story "Locale: pt-BR" virou "Outro idioma" (en-US), porque o padrão já é pt-BR. Nova story "Tamanho md (48px)".
