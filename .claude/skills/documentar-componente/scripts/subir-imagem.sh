#!/usr/bin/env bash
# Sobe PNGs para o CMS de produção (workspace prizm_design_system) e imprime "arquivo  file:<id>".
# O token sai da config do Claude Code (conector prizm-cms, escopo user) e nunca é impresso.
# Outra config: CLAUDE_CONFIG=/caminho/.claude.json bash subir-imagem.sh ...
# Uso: subir-imagem.sh imagem1.png [imagem2.png ...]
#
# A resposta traz uma "url" em http://localhost:4200/... (bug do CMS). Ignore: use file:<id> no Markdown.
set -euo pipefail
CFG="${CLAUDE_CONFIG:-$HOME/.claude.json}"
URL=$(jq -r '.mcpServers["prizm-cms"].url' "$CFG")
AUTH=$(jq -r '.mcpServers["prizm-cms"].headers.Authorization' "$CFG")
TENANT=$(jq -r '.mcpServers["prizm-cms"].headers["X-Tenant-ID"]' "$CFG")
[ "$URL" = "null" ] && { echo "Conector prizm-cms não encontrado em $CFG" >&2; exit 1; }
for f in "$@"; do
  id=$(curl -sf -X POST "${URL%/}/images" -H "Authorization: $AUTH" -H "X-Tenant-ID: $TENANT" -F "file=@$f" | jq -r .id)
  printf '%s\tfile:%s\n' "$(basename "$f")" "$id"
done
