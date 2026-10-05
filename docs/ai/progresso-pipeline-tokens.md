# Progresso: pipeline de tokens (Tokens Studio → PR → Teams)

> Documento de passagem entre sessões do Claude Code. Para retomar em outra máquina:
> `git pull` e, no Claude Code, peça: *"Leia `docs/ai/progresso-pipeline-tokens.md` e continue de onde paramos."*
>
> Última atualização: 03/10/2026 (conversão automática para W3C DTCG testada no GitHub).

## Onde estamos

### Pronto e na `main`

| Peça | Arquivo | Estado |
|---|---|---|
| Notificações no Teams | `.github/workflows/design-tokens-notifications.yml` | **Testado em 30/09.** Um card por evento: "PR de tokens aberta" (1º sync), "PR de tokens atualizada" (novo sync numa PR da `design` já aberta, só com o que mudou naquele sync) e "PR de tokens mergeada". O push na `design` não notifica; push na `main` só notifica quando não vem de PR. Também notifica reviews de PRs de tokens e releases. O card traz as mensagens de commit (a mensagem digitada no sync do Figma), o diff dos tokens e avisos sobre formato antigo e tokens que deixaram de existir. |
| PR automática | `.github/workflows/tokens-studio-pr.yml` | **Testado em 30/09** (PR #31): a cada push na `design`, abre ou atualiza a PR `design → main` com a label `token` e o template de tokens preenchido. O título da PR é a mensagem do sync que a abriu (a digitada no Tokens Studio); syncs seguintes mantêm o título. A PR é criada antes da label; se a label falhar, vira aviso no log. **Merge automático** (decidido em 30/09): a PR entra na `main` sozinha quando o check "Validar tokens" passa, **exceto** quando remove tokens que deixam de existir em todos os sets; aí espera revisão manual, e o card avisa no campo "Merge". Depende de "Allow auto-merge" (ligado no repositório em 30/09). **Conversão automática para W3C DTCG** (**testada em 03/10**: PR #46 chegou em formato antigo, foi convertida e mergeada sozinha; PR #47, também convertida, esperou revisão manual por apagar um token): se o sync chega no formato antigo, a Action converte o `tokens.json`, regrava o próprio commit do sync na `design` (mesma mensagem e autor; trailer `Tokens-Converted`) com `--force-with-lease` e a execução seguinte abre/atualiza a PR com a mesma regra de merge automático. O card do sync em formato antigo é pulado; o do sync convertido mostra a mudança real. |
| Check de validação | `.github/workflows/tokens-validate.yml` | Funcionando e **obrigatório na `main`** desde 30/09 (proteção de branch: "Validar tokens" do GitHub Actions; não exige a branch atualizada com a `main`; admins podem ignorar). Job **"Validar tokens"**: formato W3C DTCG + build do Style Dictionary sem referências quebradas. |
| Scripts compartilhados | `.github/scripts/` | `tokens-diff.mjs` (diff e resumo), `tokens-check.mjs` (formato), `tokens-pr-body.mjs` + `tokens-pr-template.md` (corpo da PR), `tokens-to-dtcg.mjs` (conversão do formato antigo; saída idêntica byte a byte ao DTCG que o Tokens Studio grava, conferido com o estado da PR #22). |
| Permissões do Claude Code | `.claude/settings.json` | Regras de git (fetch, pull, switch, branch, add, commit, merge, rebase, commit-tree, push) versionadas. |
| GitHub CLI | `gh` 2.102 | Instalado no notebook (autenticado com a conta `lucsgrcia`, que perdeu o acesso na migração: rode `gh auth login` com a conta profissional `lucas-docnix`). Não instalado no desktop (`winget install GitHub.cli` + `gh auth login`). No Git Bash, se o terminal não achar o `gh`, use `"/c/Program Files/GitHub CLI/gh.exe"` ou reinicie o VS Code. |

Secrets configurados no repositório: `TEAMS_WEBHOOK_URL` e `TOKENS_PR_TOKEN`. Desde a migração (02/10), o `TOKENS_PR_TOKEN` é um token **da conta da empresa (`GrupoITSS`)**: fine-grained, resource owner `GrupoITSS`, só o repositório `PRIZM-Design-System`, com Pull requests, Issues e **Contents: Read and write** (Contents precisa de escrita para o merge automático). Secrets só podem ser alterados pela conta `GrupoITSS` (dona do repositório). **Quando o token expirar, a PR automática falha com `HTTP 401: Bad credentials`**: gere um novo na conta da empresa e regrave o secret.

Tokens Studio no Figma: **cada pessoa usa um token da própria conta profissional** (classic, escopo `repo`, porque colaboradores de um repositório de conta de usuário não conseguem criar token fine-grained para ele). Ninguém compartilha token; os commits de sync ficam com o nome de quem sincronizou.

Label `token` criada no repositório.

### Pendente

Nada pendente na pipeline. Depois da migração (02/10):
- A proteção da `main` foi recriada à mão (**não vem na transferência de repositório**): classic branch protection rule em `main`, check obrigatório **Validar tokens** (GitHub Actions), sem exigir branch atualizada e com bypass de admins permitido. Sem check obrigatório, o `gh pr merge --auto` da PR automática mergeia na hora, sem esperar a validação; se o repositório mudar de dono de novo, recriar a regra antes do próximo sync.
- Pipeline testada de ponta a ponta: PR #42 (token alterado) aberta sozinha pela conta `GrupoITSS` com a label `token` e mergeada automaticamente depois do check verde; PR #43 (token apagado) com o merge automático desligado, mergeada manualmente pela `lucas-docnix`.

Se a PR automática falhar, ver o log em Actions > Tokens Studio PR (401 = token inválido ou expirado; 403 = permissão faltando no token).

Rotina: **só é preciso avançar a `design` quando a `main` recebe mudanças na PR automática** (`.github/workflows/tokens-studio-pr.yml` ou os scripts que ela usa em `.github/scripts/`): `git push origin origin/main:refs/heads/design` (fast-forward). Ela é disparada por push na `design` e, em push, o GitHub usa a versão da própria branch. **Avance a `design` logo depois do merge e antes do próximo sync do Figma**: em 03/10, um sync feito um minuto depois do merge da conversão automática (PR #44) rodou com o workflow antigo, levou o formato legado para a PR #45 e o check barrou. Se isso acontecer e a `design` já tiver um commit novo (o fast-forward não funciona), reaplique-o sobre a `main` e regrave a `design`: `git switch -c design-fix origin/design && git rebase origin/main && git push --force-with-lease=design:<sha antigo da design> origin HEAD:design`; o push dispara a PR automática já com a versão nova. As notificações e a validação são disparadas pela PR e usam a versão da `main`, então mudanças só nelas não exigem avançar a `design`. Depois de merges de tokens também não: a `design` fica "atrás" da `main` só pelo commit de merge, sem conteúdo diferente, e a próxima PR funciona normalmente.

### Próxima etapa (ainda não iniciada)

Agente de governança de issues (Teams → issue no template, com Claude). A especificação está no documento `agente-governanca-issues.md` que o Lucas tem; ele tem pontos **[CONFIRMAR]** que dependem do Lucas antes de implementar.

## Decisões e convenções

- **Formato dos tokens:** W3C DTCG (`$value`/`$type`). O `build.mjs` falha com o formato antigo (`value`/`type`); o check obrigatório "Validar tokens" bloqueia o merge. Desde 02/10 a PR automática converte sozinha um sync que chegue no formato antigo, então **não é preciso usar o "Convert to W3C DTCG" do plugin**: basta fazer push na `design`. A conversão só renomeia chaves, não muda valores, e por isso segue a regra normal de merge automático (decisão do Lucas: sem revisão manual por conversão).
- **Nomes dos sets:** os que vêm do Figma, sem prefixo `brand/` (ex.: `pas/base/colors`, `pas/cockpit`, `global/mode/dark`). O build funciona com eles.
- **Só o Lucas faz push do Tokens Studio para o GitHub durante a fase de arquitetura** (decidido em 02/10). A estrutura do `tokens.json` ainda está mudando e o Tokens Studio grava o arquivo inteiro a cada push: pushes de duas pessoas sobrescrevem o trabalho uma da outra (mesmo na mesma branch), e branches por pessoa só levam o problema para o merge, com conflitos num JSON de milhares de linhas. Os outros colaboradores trabalham no Figma e fazem só Pull no plugin; o Lucas sincroniza. Num repositório de conta de usuário todo colaborador tem escrita, então isso é um combinado, não uma trava do GitHub.
  - Quando a arquitetura estabilizar e mais pessoas fizerem push: todos na `design` (sem branch por pessoa), Pull antes de editar e push logo depois, com mudanças pequenas. O merge automático mantém a `design` próxima da `main`, e um sync que apaga tokens (sintoma de alguém sobrescrevendo com estado antigo) fica esperando revisão. Se ainda houver conflitos demais, avaliar o sync do Tokens Studio em vários arquivos (um por set), o que exige adaptar o `build.mjs` e a automação.
- **Fluxo de branches:** o Figma sincroniza na `design`; a `design` só entra na `main` por PR. A `design` nunca recebe merges da `main` pelo Figma, então precisa ser avançada manualmente quando a PR automática muda (ver "Pendente"). Automatizar isso exigiria um token com permissão de escrita em workflows (o `GITHUB_TOKEN` não pode atualizar uma branch com mudanças em `.github/workflows/`), por isso é manual.
- **Entrega de mudanças de código:** branch + PR para revisão. Com o `gh` instalado, o Claude pode abrir a PR; o merge fica com o Lucas.
- **Configurações do Claude Code:** vão em `.claude/settings.json` (versionado), porque o Lucas trabalha em duas máquinas. O `.claude/settings.local.json` é só da máquina.
- **PR automática com token pessoal (`TOKENS_PR_TOKEN`)**, não `GITHUB_TOKEN`: PRs abertas pelo `GITHUB_TOKEN` não disparam outros workflows (notificação e check).
- **Check sem filtro de paths:** check obrigatório com filtro de paths fica pendente para sempre em PRs que não mexem em tokens.

## Histórico de problemas já resolvidos

- Tokens Studio configurado com caminho absoluto do Windows (`C:\Users\...`) criou arquivos inválidos na raiz; removidos. O caminho correto é relativo, com `/`.
- PRs #20 e #21 levaram o formato antigo e nomes antigos de sets para a `main` e quebraram o build; o `tokens.json` foi restaurado (`f4362a0`) e depois a PR #22 trouxe o arquivo já em DTCG.
- O repositório foi renomeado de `jellyfish` para `prizm-ds` e, em 02/10, transferido para a conta da empresa como **`GrupoITSS/PRIZM-Design-System`** (conta de usuário, repositório público). O Lucas trabalha nele como colaborador com a conta profissional `lucas-docnix`. Em cada máquina: `git remote set-url origin https://github.com/GrupoITSS/PRIZM-Design-System.git` (o desktop já foi atualizado).
- O botão "Convert to W3C DTCG" do Tokens Studio cria a branch `w3c-dtcg-conversion` e abre uma PR própria (PRs #22, #24 e #40). Com o arquivo já em DTCG, o commit vem vazio; pode ser mergeado ou fechado. Essa branch não dispara a PR automática, que só reage à `design`. Desde 03/10 o botão não é mais necessário: a PR automática converte sozinha.
- O GitHub não dispara workflows de `pull_request` enquanto a PR tem conflito. Até 30/09 o card de push na `design` cobria esse caso; ele foi removido para acabar com os cards repetidos.
- A PR automática falhou em todos os syncs de 30/09 de manhã com `HTTP 401: Bad credentials`: o valor salvo em `TOKENS_PR_TOKEN` não era um token válido (ajustar permissões não resolveu; foi preciso regravar o secret). O primeiro diagnóstico, sem acesso aos logs, apontou a label `token`; ele estava errado, mas a correção feita (criar a PR antes de aplicar a label) foi mantida.
- Cada alteração de tokens gerava 3 cards no Teams (push na `design`, PR aberta, merge); o card do push na `design` foi removido.
- Com o repositório privado, a proteção de branch não estava disponível no plano gratuito (403); o repositório voltou a ser **público** em 30/09 e o check foi tornado obrigatório. Para consultar Actions, PRs e labels, use o `gh` autenticado.
