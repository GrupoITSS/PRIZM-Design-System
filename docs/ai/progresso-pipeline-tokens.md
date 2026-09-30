# Progresso: pipeline de tokens (Tokens Studio → PR → Teams)

> Documento de passagem entre sessões do Claude Code. Para retomar em outra máquina:
> `git pull` e, no Claude Code, peça: *"Leia `docs/ai/progresso-pipeline-tokens.md` e continue de onde paramos."*
>
> Última atualização: 30/09/2026 (tarde).

## Onde estamos

### Pronto e na `main`

| Peça | Arquivo | Estado |
|---|---|---|
| Notificações no Teams | `.github/workflows/design-tokens-notifications.yml` | Funcionando, mas com cards repetidos (3 por alteração: push na `design`, PR aberta, merge). Correção na branch `fix/tokens-pr-label` (pendência 1). Notifica push na `main` (sem PR), PR aberta/reaberta/mergeada/fechada, reviews de PRs de tokens e releases. O card traz o diff dos tokens e avisa sobre formato antigo e tokens que deixaram de existir. |
| PR automática | `.github/workflows/tokens-studio-pr.yml` | **Falhou nos testes de 30/09** (syncs `44e7069` e `5fbb79b`): a label `token` não existe e o `TOKENS_PR_TOKEN` não conseguiu criá-la; o `gh pr create --label token` falha antes de criar a PR. As PRs #25 e #26 foram abertas à mão. Correção na branch `fix/tokens-pr-label` (pendência 1). A cada push na `design`, abre ou atualiza a PR `design → main` com o template de tokens preenchido. |
| Check de validação | `.github/workflows/tokens-validate.yml` | Funcionando (passou na PR #23 e na `main`). Job **"Validar tokens"**: formato W3C DTCG + build do Style Dictionary sem referências quebradas. |
| Scripts compartilhados | `.github/scripts/` | `tokens-diff.mjs` (diff e resumo), `tokens-check.mjs` (formato), `tokens-pr-body.mjs` + `tokens-pr-template.md` (corpo da PR). |
| Permissões do Claude Code | `.claude/settings.json` | Regras de git (fetch, pull, switch, branch, add, commit, merge, rebase, commit-tree, push) versionadas. |

Secrets já configurados no repositório: `TEAMS_WEBHOOK_URL` e `TOKENS_PR_TOKEN`.

### Pendente

1. **PR da branch `fix/tokens-pr-label`**: abrir e mergear (<https://github.com/lucsgrcia/prizm-ds/compare/main...fix/tokens-pr-label?expand=1>). Duas correções:
   - **PR automática:** a PR passa a ser criada sem depender da label; a label `token` é aplicada depois e, se falhar, vira aviso no log.
   - **Cards repetidos:** o push na `design` deixa de notificar. Ficam "PR de tokens aberta" (1º sync), "PR de tokens atualizada" (novo sync numa PR da `design` já aberta, só com o que mudou naquele sync) e "PR de tokens mergeada". Commits em PRs de outras branches não notificam. Limitação aceita: com a PR em conflito, o GitHub não roda workflows de PR e não sai card.
2. **PR da branch `fix/tokens-pr-camada-marca`**: abrir e mergear (<https://github.com/lucsgrcia/prizm-ds/compare/main...fix/tokens-pr-camada-marca?expand=1>). Corrige a seção "Camada (set)" da PR automática, que só reconhecia sets de marca com prefixo `brand/`. Revisada e testada em 30/09.
3. **Label `token`**: criar em Issues > Labels (cor `1D76DB`), ou dar ao `TOKENS_PR_TOKEN` a permissão **Issues: Read and write**. Sem isso a PR abre, mas sem a label.
4. **Depois dos merges acima, avançar a `design` até a `main`** (`git push origin origin/main:refs/heads/design`, fast-forward). Em push, o GitHub usa os workflows da própria branch; a `design` precisa ter as versões atuais.
5. **Tornar o check obrigatório**: Settings > Branches > regra da `main` > "Require status checks to pass before merging" > selecionar **Validar tokens**.
6. **Conferir o Tokens Studio no Figma**: o sync deve apontar para a branch **`design`**, com Token Format = **W3C DTCG** e arquivo `design-system/packages/tokens/src/tokens-studio/tokens.json` no repositório `lucsgrcia/prizm-ds`. Os testes de 30/09 já sincronizaram na `design`.
7. **Teste ponta a ponta** (depois da pendência 4): alterar um token no Figma e fazer push na `design`, **sem abrir a PR à mão**. Esperado: PR aberta sozinha com a label `token` e o template preenchido, um único card "PR de tokens aberta" e check "Validar tokens" verde. Um segundo sync antes do merge deve gerar o card "PR de tokens atualizada".

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
- O GitHub não dispara workflows de `pull_request` enquanto a PR tem conflito. Até 30/09 o card de push na `design` cobria esse caso; ele foi removido para acabar com os cards repetidos.
- `gh pr create --label X` falha antes de criar a PR se a label não existir. O `2>/dev/null || true` no `gh label create` escondia o erro de permissão.
