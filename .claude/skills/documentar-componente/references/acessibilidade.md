# Acessibilidade: checklist e medição

Referência da etapa 4. A fonte é o artigo "Critério de acessibilidade" (0002) do CMS, id `27090792-48ee-49bb-a162-291c7c97c92e`. Leia com `fetch` antes de começar: se o artigo mudou, ele vale mais que este resumo.

## Regras do critério

- Alvo: WCAG 2.2 AA, nas 5 marcas, claro e escuro. Tchello herda do PAS.
- Um item só passa com número medido ou teste feito, nunca por avaliação visual.
- Uma linha por item: ✓ passa, ✗ falha, n.a. não se aplica. Contraste vai com o número e o pior caso.
- Falha vira pendência. O componente só é publicado sem ✗ nos 4 blocos.

## Os 4 blocos

1. **Contraste.** Texto 4,5:1 (texto grande 3:1). Borda, ícone ou forma que identifica o componente: 3:1 contra o adjacente. Indicador de estado: 3:1. Informação que não depende só de cor. Disabled está isento, mas precisa do atributo nativo.
2. **Foco visível.** Foco em todo interativo (2.4.7). `color/ring` contra `color/background` 3:1. Quando o componente tem a cor do anel, 2px de `ring-offset`. Só `:focus-visible`. `outline-none` sempre com anel. Foco não coberto (2.4.11). Focar não muda o contexto. Foco não se perde ao mudar de estado (loading, fechar camada).
3. **Teclado.** Tudo funciona com teclado. Sem armadilha; Esc fecha camadas. Ordem segue a leitura. Teclas no padrão do WAI-ARIA APG para o tipo de componente. Atalho de uma tecla desligável. Alvo de ponteiro 24 × 24px (2.5.8).
4. **Nomes acessíveis.** Nome, função e estado expostos. Só ícone tem nome. Ícone decorativo com `aria-hidden`. Rótulo visível faz parte do nome. Estado por atributo (`disabled`, `aria-disabled`, `aria-busy`, `aria-expanded`, `aria-pressed`, `aria-invalid`). Mudança de status em `aria-live` ou `role="status"`.

## Medir contraste

Os tokens compilados estão em `packages/tokens/dist/ts/<marca>/<modo>.js`, mas `dist/` é ignorado pelo git: o que está no checkout pode ser de outro dia. Gere a partir de `origin/main` antes de medir:

```bash
cd "$(git rev-parse --show-toplevel)" && git fetch origin
git worktree add ../PRIZM-wt-tokens-main origin/main --detach   # ou use o worktree da etapa 5
cd ../PRIZM-wt-tokens-main/design-system && pnpm install --frozen-lockfile && pnpm --filter @grupoitss/prizm-tokens build
```

Ao terminar, remova o worktree descartável com `git worktree remove ../PRIZM-wt-tokens-main`.

Depois, com o script da skill (pares `texto/fundo`, `@0.8` para opacidade no fundo):

```bash
node "$(git rev-parse --show-toplevel)/.claude/skills/documentar-componente/scripts/contraste.mjs" packages/tokens/dist/ts \
  primary-foreground/primary secondary-foreground/secondary foreground/input-background primary-strong/background
node "$(git rev-parse --show-toplevel)/.claude/skills/documentar-componente/scripts/contraste.mjs" packages/tokens/dist/ts ring/background --min 3
```

A saída já é a tabela Markdown marca · modo para o Figma e o artigo. Pares com alfa (ex.: `input-background` no escuro) são misturados sobre `--sobre` (padrão `background`); troque quando o componente fica sobre `card` ou `popover`.

Quais pares medir: leia as classes do `.tsx` (cada `bg-*` com o `text-*` do mesmo estado), mais o anel de foco, bordas que identificam o componente (`border-input` contra o fundo, 3:1) e o texto do componente contra o texto ao redor quando só a cor o diferencia (caso do link).

Para conferir o render, não o token: exporte com `get_screenshot` e leia o pixel com `scripts/px.py`.

## Testar foco e teclado

Para foco e teclado, um teste no navegador vale mais que ler o código. Duas formas que funcionaram:

- Um HTML mínimo no scratchpad com o componente compilado, aberto no navegador embutido (`mcp__Claude_Browser__*`), navegando com `computer` (Tab, Enter, Espaço, Esc) e lendo `document.activeElement` pelo `javascript_tool`.
- Um teste no vitest com `@testing-library/user-event` (`user.tab()`, `user.keyboard('{Enter}')`), que já fica como regressão no PR.

Caso que custou tempo no Button: com `disabled`, o navegador tira o foco do botão e manda para o `body`. Estado que bloqueia sem perder o foco usa `aria-disabled`.

## Entregar as pendências

Monte uma lista numerada para o dono do DS decidir (ver Papéis no SKILL.md). Para cada item: critério WCAG, o que falha (com número), onde (marca · modo · variante), opções de correção (token, código ou Figma) e a recomendação. Pare aqui e espere a decisão. Decisões de token mudam todos os componentes que usam o token: diga quais.
