export type StatusVariant = "active" | "inactive" | "error" | "default";

export type StatusConfig = {
  label: string;
  variant: StatusVariant;
};

/** Chips de ciclo de vida: só Ativo / Inativo (+ erro operacional). */
export const STATUS_DICTIONARY: Record<string, StatusConfig> = {
  active: { label: "Ativo", variant: "active" },
  inactive: { label: "Inativo", variant: "inactive" },
  error: { label: "Erro", variant: "error" },
  failed: { label: "Falhou", variant: "error" },
  failure: { label: "Falhou", variant: "error" },
};

const DEFAULT_CONFIG: StatusConfig = {
  label: "Outro",
  variant: "default",
};

const ACTIVE_ALIASES = new Set(["active", "created", "ativo"]);
const INACTIVE_ALIASES = new Set(["inactive", "deactivated", "deleted", "inativo"]);

/**
 * Normaliza qualquer status de entidade para a chave canônica do chip.
 * Legado created/deactivated/deleted → active|inactive.
 */
export function normalizeStatus(value: unknown): string {
  if (value === true) return "active";
  if (value === false) return "inactive";
  if (typeof value !== "string" || value.trim() === "") return "default";

  const key = value.toLowerCase().trim();
  if (ACTIVE_ALIASES.has(key)) return "active";
  if (INACTIVE_ALIASES.has(key)) return "inactive";
  if (key === "error" || key === "failed" || key === "failure") return key;
  return key;
}

export function getStatusConfig(normalizedKey: string): StatusConfig {
  const config = STATUS_DICTIONARY[normalizedKey];
  if (config) return config;
  if (normalizedKey === "default") return DEFAULT_CONFIG;
  return {
    label: normalizedKey.charAt(0).toUpperCase() + normalizedKey.slice(1).toLowerCase(),
    variant: "default",
  };
}

export const FALLBACK_LABEL = {
  active: "Ativo",
  inactive: "Inativo",
} as const;
