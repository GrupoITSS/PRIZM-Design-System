# Progresso: pipeline de tokens (Tokens Studio → PR → Teams)

> Documento de passagem entre sessões do Claude Code. Para retomar em outra máquina:
> `git pull` e, no Claude Code, peça: *"Leia `docs/ai/progresso-pipeline-tokens.md` e continue de onde paramos."*
>
> Última atualização: 30/09/2026.

## Onde estamos

### Pronto e na `main`

| Peça | Arquivo | Estado |
|---|---|---|
| Notificações no Teams | `.github/workflows/design-tokens-notifications.yml` | Funcionando. Notifica push na `design` (sync do Figma) e na `main` (sem PR), PR aberta/reaberta/mergeada/fechada, reviews de PRs de tokens e releases. O card traz o diff dos tokens e avisa sobre formato antigo e tokens que deixaram de existir. |
| PR automática | `.github/workflows/tokens-studio-pr.yml` | Na `main`, **ainda não testado com um sync real**. A cada push na `design`, abre ou atualiza a PR `design → main` com a label `token` e o template de tokens preenchido. |
| Check de validação | `.github/workflows/tokens-validate.yml` | Funcionando (passou na PR #23 e na `main`). Job **"Validar tokens"**: formato W3C DTCG + build do Style Dictionary sem referências quebradas. |
| Scripts compartilhados | `.github/scripts/` | `tokens-diff.mjs` (diff e resumo), `tokens-check.mjs` (formato), `tokens-pr-body.mjs` + `tokens-pr-template.md` (corpo da PR). |
| Permissões do Claude Code | `.claude/settings.json` | Regras de git (fetch, pull, switch, branch, add, commit, merge, rebase, commit-tree, push) versionadas. |

Secrets já configurados no repositório: `TEAMS_WEBHOOK_URL` e `TOKENS_PR_TOKEN`.

### Pendente

1. **PR da branch `fix/tokens-pr-camada-marca`**: abrir e mergear (<https://github.com/lucsgrcia/prizm-ds/compare/main...fix/tokens-pr-camada-marca?expand=1>). Corrige a seção "Camada (set)" da PR automática, que só reconhecia sets de marca com prefixo `brand/`.
2. **Depois do merge acima, avançar a `design` até a `main`** (`git push origin origin/main:refs/heads/design`, fast-forward). Em push, o GitHub usa os workflows da própria branch; a `design` precisa ter as versões atuais.
3. **Tornar o check obrigatório**: Settings > Branches > regra da `main` > "Require status checks to pass before merging" > selecionar **Validar tokens**.
4. **Conferir o Tokens Studio no Figma**: o sync deve apontar para a branch **`design`** (a PR #22 veio da `w3c-dtcg-conversion`, que a automação ignora), com Token Format = **W3C DTCG** e arquivo `design-system/packages/tokens/src/tokens-studio/tokens.json` no repositório `lucsgrcia/prizm-ds`.
5. **Teste ponta a ponta**: alterar um token no Figma e fazer push na `design`. Esperado: card "Tokens sincronizados na branch design", PR aberta sozinha com o template preenchido, card "PR de tokens aberta" e check "Validar tokens" verde.

### Próxima etapa (ainda não iniciada)

Agente de governança de issues (Teams → issue no template, com Claude). A especificação está no documento `agente-governanca-issues.md` que o Lucas tem; ele tem pontos **[CONFIRMAR]** que dependem do Lucas antes de implementar.

## Decisões e convenções

- **Formato dos tokens:** W3C DTCG (`$value`/`$type`). O `build.mjs` falha com o formato antigo (`value`/`type`); o check bloqueia isso.
- **Nomes dos sets:** os que vêm do Figma, sem prefixo `brand/` (ex.: `pas/base/colors`, `pas/cockpit`, `global/mode/dark`). O build funciona com eles.
- **Fluxo de branches:** o Figma sincroniza na `design`; a `design` só entra na `main` por PR. A `design` nunca recebe merges da `main` pelo Figma, então precisa ser avançada manualmente quando `.github/` mudar (pendência 2).
- **Entrega de mudanças de código:** branch + PR para revisão (o Lucas abre a PR pelo link; o `gh` CLI não está instalado).
- **Configurações do Claude Code:** vão em `.claude/settings.json` (versionado), porque o Lucas trabalha em duas máquinas. O `.claude/settings.local.json` é só da máquina.
- **PR automática com token pessoal (`TOKENS_PR_TOKEN`)**, não `GITHUB_TOKEN`: PRs abertas pelo `GITHUB_TOKEN` não disparam outros workflows (notificação e check).
- **Check sem filtro de paths:** check obrigatório com filtro de paths fica pendente para sempre em PRs que não mexem em tokens.

## Histórico de problemas já resolvidos

- Tokens Studio configurado com caminho absoluto do Windows (`C:\Users\...`) criou arquivos inválidos na raiz; removidos. O caminho correto é relativo, com `/`.
- PRs #20 e #21 levaram o formato antigo e nomes antigos de sets para a `main` e quebraram o build; o `tokens.json` foi restaurado (`f4362a0`) e depois a PR #22 trouxe o arquivo já em DTCG.
- O repositório foi renomeado de `jellyfish` para `prizm-ds`; o remote local já aponta para o nome novo.
- O GitHub não dispara workflows de `pull_request` enquanto a PR tem conflito; o card de push na `design` cobre esse caso.
