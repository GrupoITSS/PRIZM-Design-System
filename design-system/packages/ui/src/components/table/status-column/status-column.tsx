import { Badge } from "../../badge";
import { Check, Inactive, X } from "../../icons";
import { getStatusConfig, normalizeStatus, type StatusVariant } from "./status-column.constants";

export type StatusColumnAppearance = "chip" | "indicator";

export type StatusColumnComponentProps = {
  status: string | boolean;
  label?: Partial<Record<string, string>>;
  /** `chip` = Badge contained; `indicator` = Badge text. */
  appearance?: StatusColumnAppearance;
};

const STATUS_TO_BADGE = {
  active: "success",
  inactive: "secondary",
  error: "destructive",
  default: "default",
} as const;

const glyphClassName = "size-3 shrink-0";

function StatusGlyph({ variant }: { variant: StatusVariant }) {
  if (variant === "error") {
    return <X className={glyphClassName} strokeWidth={2.5} aria-hidden />;
  }
  if (variant === "inactive" || variant === "default") {
    return <Inactive className={glyphClassName} strokeWidth={2.5} aria-hidden />;
  }
  return <Check className={glyphClassName} strokeWidth={2.5} aria-hidden />;
}

const StatusColumnComponent = ({
  status,
  label,
  appearance = "chip",
}: StatusColumnComponentProps) => {
  const normalizedKey = normalizeStatus(status);
  const config = getStatusConfig(normalizedKey);
  const displayLabel = label?.[normalizedKey] ?? config.label;

  return (
    <Badge
      variant={STATUS_TO_BADGE[config.variant]}
      appearance={appearance === "indicator" ? "text" : "contained"}
      size="sm"
      startIcon={<StatusGlyph variant={config.variant} />}
    >
      {displayLabel}
    </Badge>
  );
};

StatusColumnComponent.displayName = "StatusColumn";

export { StatusColumnComponent };
