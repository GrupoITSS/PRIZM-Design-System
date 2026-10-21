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

// The Badge has only the Figma variants, so the success tone and the neutral chip take their
// colors from the tokens via `className`. `indicator` keeps the surface off and colors the icon.
const CHIP_BADGE = {
  active: { variant: "default", className: "bg-success text-success-foreground hover:bg-success/80" },
  inactive: { variant: "secondary", className: undefined },
  error: { variant: "destructive", className: undefined },
  default: { variant: "default", className: "bg-foreground text-background hover:bg-foreground/80" },
} as const;

const INDICATOR_SURFACE = "bg-transparent text-foreground hover:bg-transparent";

const INDICATOR_BADGE = {
  active: { variant: "default", className: `${INDICATOR_SURFACE} [&_[data-icon]]:text-success` },
  inactive: {
    variant: "secondary",
    className: `${INDICATOR_SURFACE} [&_[data-icon]]:text-muted-foreground`,
  },
  error: {
    variant: "destructive",
    className: `${INDICATOR_SURFACE} [&_[data-icon]]:text-destructive`,
  },
  default: { variant: "default", className: `${INDICATOR_SURFACE} [&_[data-icon]]:text-foreground` },
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
      {...(appearance === "indicator" ? INDICATOR_BADGE : CHIP_BADGE)[config.variant]}
      startIcon={<StatusGlyph variant={config.variant} />}
    >
      {displayLabel}
    </Badge>
  );
};

StatusColumnComponent.displayName = "StatusColumn";

export { StatusColumnComponent };
