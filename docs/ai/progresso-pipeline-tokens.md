# Progresso: pipeline de tokens (Tokens Studio → PR → Teams)

> Documento de passagem entre sessões do Claude Code. Para retomar em outra máquina:
> `git pull` e, no Claude Code, peça: *"Leia `docs/ai/progresso-pipeline-tokens.md` e continue de onde paramos."*
>
> Última atualização: 30/09/2026 (pipeline concluída).

## Onde estamos

### Pronto e na `main`

| Peça | Arquivo | Estado |
|---|---|---|
| Notificações no Teams | `.github/workflows/design-tokens-notifications.yml` | **Testado em 30/09.** Um card por evento: "PR de tokens aberta" (1º sync), "PR de tokens atualizada" (novo sync numa PR da `design` já aberta, só com o que mudou naquele sync) e "PR de tokens mergeada". O push na `design` não notifica; push na `main` só notifica quando não vem de PR. Também notifica reviews de PRs de tokens e releases. O card traz as mensagens de commit (a mensagem digitada no sync do Figma), o diff dos tokens e avisos sobre formato antigo e tokens que deixaram de existir. |
| PR automática | `.github/workflows/tokens-studio-pr.yml` | **Testado em 30/09** (PR #31): a cada push na `design`, abre ou atualiza a PR `design → main` com a label `token` e o template de tokens preenchido. A PR é criada antes da label; se a label falhar, vira aviso no log. |
| Check de validação | `.github/workflows/tokens-validate.yml` | Funcionando e **obrigatório na `main`** desde 30/09 (proteção de branch: "Validar tokens" do GitHub Actions; não exige a branch atualizada com a `main`; admins podem ignorar). Job **"Validar tokens"**: formato W3C DTCG + build do Style Dictionary sem referências quebradas. |
| Scripts compartilhados | `.github/scripts/` | `tokens-diff.mjs` (diff e resumo), `tokens-check.mjs` (formato), `tokens-pr-body.mjs` + `tokens-pr-template.md` (corpo da PR). |
| Permissões do Claude Code | `.claude/settings.json` | Regras de git (fetch, pull, switch, branch, add, commit, merge, rebase, commit-tree, push) versionadas. |
| GitHub CLI | `gh` 2.102 | Instalado e autenticado nesta máquina (conta `lucsgrcia`). No Git Bash, se o terminal não achar o `gh`, use `"/c/Program Files/GitHub CLI/gh.exe"` ou reinicie o VS Code. Na outra máquina, instale (`winget install GitHub.cli`) e rode `gh auth login`. |

Secrets configurados no repositório: `TEAMS_WEBHOOK_URL` e `TOKENS_PR_TOKEN` (regravado em 30/09; fine-grained, só `prizm-ds`, com Pull requests e Issues: Read and write e Contents: Read). **Quando o token expirar, a PR automática falha com `HTTP 401: Bad credentials`**: gere um novo e grave com `gh secret set TOKENS_PR_TOKEN`.

Label `token` criada no repositório.

### Pendente

Nada pendente na pipeline. Testada de ponta a ponta em 30/09: PR #31 aberta sozinha com a label `token`, um card por evento (aberta, atualizada e mergeada) e check "Validar tokens" verde.

Rotina: **só é preciso avançar a `design` quando a `main` recebe mudanças na PR automática** (`.github/workflows/tokens-studio-pr.yml` ou os scripts que ela usa em `.github/scripts/`): `git push origin origin/main:refs/heads/design` (fast-forward). Ela é disparada por push na `design` e, em push, o GitHub usa a versão da própria branch. As notificações e a validação são disparadas pela PR e usam a versão da `main`, então mudanças só nelas não exigem avançar a `design`. Depois de merges de tokens também não: a `design` fica "atrás" da `main` só pelo commit de merge, sem conteúdo diferente, e a próxima PR funciona normalmente.

### Próxima etapa (ainda não iniciada)

Agente de governança de issues (Teams → issue no template, com Claude). A especificação está no documento `agente-governanca-issues.md` que o Lucas tem; ele tem pontos **[CONFIRMAR]** que dependem do Lucas antes de implementar.

## Decisões e convenções

- **Formato dos tokens:** W3C DTCG (`$value`/`$type`). O `build.mjs` falha com o formato antigo (`value`/`type`); o check obrigatório "Validar tokens" bloqueia o merge.
- **Nomes dos sets:** os que vêm do Figma, sem prefixo `brand/` (ex.: `pas/base/colors`, `pas/cockpit`, `global/mode/dark`). O build funciona com eles.
- **Fluxo de branches:** o Figma sincroniza na `design`; a `design` só entra na `main` por PR. A `design` nunca recebe merges da `main` pelo Figma, então precisa ser avançada manualmente quando a PR automática muda (ver "Pendente"). Automatizar isso exigiria um token com permissão de escrita em workflows (o `GITHUB_TOKEN` não pode atualizar uma branch com mudanças em `.github/workflows/`), por isso é manual.
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
- Com o repositório privado, a proteção de branch não estava disponível no plano gratuito (403); o repositório voltou a ser **público** em 30/09 e o check foi tornado obrigatório. Para consultar Actions, PRs e labels, use o `gh` autenticado.
