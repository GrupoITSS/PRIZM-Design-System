export function normalizeAccept(accept?: string | string[]): string[] {
  if (!accept) return [];
  if (Array.isArray(accept)) {
    return accept
      .join(",")
      .split(",")
      .map((token) => token.trim())
      .filter(Boolean);
  }
  return accept
    .split(",")
    .map((token) => token.trim())
    .filter(Boolean);
}

export function fileMatchesAccept(file: File, tokens: string[]): boolean {
  if (!tokens.length) return true;
  const fileType = file.type.toLowerCase();
  const fileName = file.name.toLowerCase();

  return tokens.some((raw) => {
    const token = raw.toLowerCase();
    if (token === "*") return true;

    // MIME type (e.g. image/png, application/pdf, image/*)
    if (token.includes("/")) {
      if (token.endsWith("/*")) {
        const prefix = token.slice(0, token.length - 1); // keep the slash
        return fileType.startsWith(prefix);
      }
      return fileType === token;
    }

    // Extension (e.g. "pdf" or ".pdf")
    const ext = token.startsWith(".") ? token : `.${token}`;
    return fileName.endsWith(ext);
  });
}

export function formatAcceptForInput(tokens: string[]): string | undefined {
  if (!tokens.length) return undefined;
  return tokens.join(",");
}

export function formatAcceptDescription(tokens: string[]): string | undefined {
  if (!tokens.length) return undefined;
  const pretty = tokens.map((raw) => {
    const token = raw.trim();
    if (!token) return token;
    if (token.includes("/")) return token;
    if (token.startsWith(".")) return token;
    return `.${token}`;
  });
  return `Arquivos permitidos: ${pretty.join(", ")}`;
}
