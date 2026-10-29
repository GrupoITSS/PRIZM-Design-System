import { cn } from "../../lib/cn";
import { CircleAlert, TriangleAlert, CircleCheckBig } from "../icons";
import type { AlertMessageProps } from "./alert-message.types";

/**
 * @deprecated Use `Alert` (`@grupoitss/prizm-ui/alert`), decisão de 29/10/2026. O Alert já usa
 * o mesmo padrão de cores (fundo `-weak`, texto `-strong`). Migração do `kind` para o `variant`:
 * `info` → `info`, `warning` → `warning`, `error` → `destructive`, `success` → `success`.
 * `message` vira `title`; `items`, uma lista em `description`.
 *
 * Alerta **fixo / inline** (Figma: Callouts abaixo de campos).
 * Fundo claro, borda suave — ex.: domínio em "Nova organização" (node 31187:16026).
 *
 * Para feedback flutuante use Sonner via `useToast()` / `toast()`.
 */
const INLINE_KIND_STYLES = {
  // Callout (D1): <tom>-weak background, <tom>-strong text, border and icon in
  // the base tone (warning-strong for the icon, where warning is too light).
  info: {
    container: "bg-info-weak border-info",
    text: "text-info-strong",
    icon: "text-info",
    Icon: CircleAlert,
  },
  warning: {
    container: "bg-warning-weak border-warning",
    text: "text-warning-strong",
    icon: "text-warning-strong",
    Icon: TriangleAlert,
  },
  error: {
    container: "bg-destructive-weak border-destructive",
    text: "text-destructive-strong",
    icon: "text-destructive",
    Icon: CircleAlert,
  },
  success: {
    container: "bg-success-weak border-success",
    text: "text-success-strong",
    icon: "text-success",
    Icon: CircleCheckBig,
  },
} as const;

export function AlertMessage({
  message,
  items,
  kind = "info",
  className,
  showIcon = true,
}: AlertMessageProps) {
  const styles = INLINE_KIND_STYLES[kind];
  const Icon = styles.Icon;
  const hasIcon = showIcon && (message || !items?.length);

  return (
    <div
      role="alert"
      className={cn(
        "flex w-full items-center gap-3 rounded-lg border p-3 text-xs",
        styles.container,
        className,
      )}
    >
      {Boolean(hasIcon) && <Icon className={cn("size-5 shrink-0", styles.icon)} aria-hidden />}
      <div className={cn("min-w-0 flex flex-col gap-2", styles.text)}>
        {message ? (
          <div className="font-medium leading-4 [&_strong]:font-semibold">{message}</div>
        ) : null}
        {items && items.length > 0 ? (
          <ul className="list-disc space-y-1 pl-5 font-medium leading-5">
            {items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
