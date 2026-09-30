# Progresso: pipeline de tokens (Tokens Studio → PR → Teams)

> Documento de passagem entre sessões do Claude Code. Para retomar em outra máquina:
> `git pull` e, no Claude Code, peça: *"Leia `docs/ai/progresso-pipeline-tokens.md` e continue de onde paramos."*
>
> Última atualização: 30/09/2026 (pipeline testada de ponta a ponta).

## Onde estamos

### Pronto e na `main`

| Peça | Arquivo | Estado |
|---|---|---|
| Notificações no Teams | `.github/workflows/design-tokens-notifications.yml` | **Testado em 30/09.** Um card por evento: "PR de tokens aberta" (1º sync), "PR de tokens atualizada" (novo sync numa PR da `design` já aberta, só com o que mudou naquele sync) e "PR de tokens mergeada". O push na `design` não notifica; push na `main` só notifica quando não vem de PR. Também notifica reviews de PRs de tokens e releases. O card traz o diff dos tokens e avisa sobre formato antigo e tokens que deixaram de existir. |
| PR automática | `.github/workflows/tokens-studio-pr.yml` | **Testado em 30/09** (PR #31): a cada push na `design`, abre ou atualiza a PR `design → main` com a label `token` e o template de tokens preenchido. A PR é criada antes da label; se a label falhar, vira aviso no log. |
| Check de validação | `.github/workflows/tokens-validate.yml` | Funcionando (passou nas PRs #23 e #31 e na `main`), mas **não é obrigatório** (ver pendências). Job **"Validar tokens"**: formato W3C DTCG + build do Style Dictionary sem referências quebradas. |
| Scripts compartilhados | `.github/scripts/` | `tokens-diff.mjs` (diff e resumo), `tokens-check.mjs` (formato), `tokens-pr-body.mjs` + `tokens-pr-template.md` (corpo da PR). |
| Permissões do Claude Code | `.claude/settings.json` | Regras de git (fetch, pull, switch, branch, add, commit, merge, rebase, commit-tree, push) versionadas. |
| GitHub CLI | `gh` 2.102 | Instalado e autenticado nesta máquina (conta `lucsgrcia`). No Git Bash, se o terminal não achar o `gh`, use `"/c/Program Files/GitHub CLI/gh.exe"` ou reinicie o VS Code. Na outra máquina, instale (`winget install GitHub.cli`) e rode `gh auth login`. |

Secrets configurados no repositório: `TEAMS_WEBHOOK_URL` e `TOKENS_PR_TOKEN` (regravado em 30/09; fine-grained, só `prizm-ds`, com Pull requests e Issues: Read and write e Contents: Read). **Quando o token expirar, a PR automática falha com `HTTP 401: Bad credentials`**: gere um novo e grave com `gh secret set TOKENS_PR_TOKEN`.

Label `token` criada no repositório.

### Pendente

1. **Mergear a PR #31** (teste da pipeline) e conferir que chega um único card "PR de tokens mergeada", sem card do push na `main`.
2. **Depois de cada merge na `main`, avançar a `design`** (`git push origin origin/main:refs/heads/design`, fast-forward). Em push, o GitHub usa os workflows da própria branch; a `design` precisa ter as versões atuais de `.github/`.
3. **Check obrigatório "Validar tokens" na `main`: bloqueado.** Proteção de branch e rulesets não estão disponíveis em repositório **privado** no plano gratuito (a API responde 403 "Upgrade to GitHub Pro or make this repository public"). Opções: GitHub Pro, mover o repositório para uma organização com plano pago, ou deixá-lo público. Enquanto isso, o check roda em toda PR, mas não impede o merge.

### Próxima etapa (ainda não iniciada)

Agente de governança de issues (Teams → issue no template, com Claude). A especificação está no documento `agente-governanca-issues.md` que o Lucas tem; ele tem pontos **[CONFIRMAR]** que dependem do Lucas antes de implementar.

## Decisões e convenções

- **Formato dos tokens:** W3C DTCG (`$value`/`$type`). O `build.mjs` falha com o formato antigo (`value`/`type`); o check "Validar tokens" acusa isso na PR (mas não impede o merge enquanto não for obrigatório).
- **Nomes dos sets:** os que vêm do Figma, sem prefixo `brand/` (ex.: `pas/base/colors`, `pas/cockpit`, `global/mode/dark`). O build funciona com eles.
- **Fluxo de branches:** o Figma sincroniza na `design`; a `design` só entra na `main` por PR. A `design` nunca recebe merges da `main` pelo Figma, então precisa ser avançada manualmente depois de merges na `main` (pendência 2).
- **Entrega de mudanças de código:** branch + PR para revisão. Com o `gh` instalado, o Claude pode abrir a PR; o merge fica com o Lucas.
- **Configurações do Claude Code:** vão em `.claude/settings.json` (versionado), porque o Lucas trabalha em duas máquinas. O `.claude/settings.local.json` é só da máquina.
- **PR automática com token pessoal (`TOKENS_PR_TOKEN`)**, não `GITHUB_TOKEN`: PRs abertas pelo `GITHUB_TOKEN` não disparam outros workflows (notificação e check).
- **Check sem filtro de paths:** check obrigatório com filtro de paths fica pendente para sempre em PRs que não mexem em tokens.

## Histórico de problemas já resolvidos

- Tokens Studio configurado com caminho absoluto do Windows (`C:\Users\...`) criou arquivos inválidos na raiz; removidos. O caminho correto é relativo, com `/`.
- PRs #20 e #21 levaram o formato antigo e nomes antigos de sets para a `main` e quebraram o build; o `tokens.json` foi restaurado (`f4362a0`) e depois a PR #22 trouxe o arquivo já em DTCG.
- O repositório foi renomeado de `jellyfish` para `prizm-ds`; o remote local já aponta para o nome novo.
- O GitHub não dispara workflows de `pull_request` enquanto a PR tem conflito. Até 30/09 o card de push na `design` cobria esse caso; ele foi removido para acabar com os cards repetidos.
- A PR automática falhou em todos os syncs de 30/09 de manhã com `HTTP 401: Bad credentials`: o valor salvo em `TOKENS_PR_TOKEN` não era um token válido (ajustar permissões não resolveu; foi preciso regravar o secret). O primeiro diagnóstico, sem acesso aos logs, apontou a label `token`; ele estava errado, mas a correção feita (criar a PR antes de aplicar a label) foi mantida.
- Cada alteração de tokens gerava 3 cards no Teams (push na `design`, PR aberta, merge); o card do push na `design` foi removido.
- O repositório ficou privado: a API pública do GitHub deixou de responder. Para consultar Actions, PRs e labels, use o `gh` autenticado.
