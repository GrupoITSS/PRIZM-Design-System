---
"@grupoitss/prizm-tokens": major
---

**Todas as variáveis CSS passam a ter o prefixo `--prizm-`** (`--color-primary` → `--prizm-color-primary`, `--radius-md` → `--prizm-radius-md`, `--control-height-md` → `--prizm-control-height-md`…). Vale para os arquivos de CSS, para o preset do Tailwind e para o `ts/vars` (que mantém os nomes de export: `colorPrimary`). O prefixo evita colisão com as variáveis do Tailwind (`--font-sans`, `--radius-md`…) e com as do próprio app. Quem usa as classes do Tailwind (`bg-primary`) não precisa mudar nada; quem escreve `var(--...)` à mão precisa acrescentar o prefixo. Os valores por tema em TypeScript, o Android e o iOS mantêm os nomes simples.

Tokens sincronizados do Figma desde 1.0.0: +113 adicionados · ~34 alterados · −10 removidos.

Tokens que deixaram de existir: foundations.warning-moderate.light, foundations.warning-moderate.dark, palette.warning-moderate.light, palette.warning-moderate.dark, color.warning-moderate.
Temas ($themes) alterados.
