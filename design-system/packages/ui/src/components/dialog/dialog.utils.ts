/**
 * Normaliza texto para comparação em confirmações destrutivas:
 * ignora maiúsculas/minúsculas, acentuação e espaços.
 */
export function normalizeConfirmText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, "");
}

export function matchesConfirmText(inputValue: string, expectedValue: string): boolean {
  if (!expectedValue.trim()) return false;
  return normalizeConfirmText(inputValue) === normalizeConfirmText(expectedValue);
}
