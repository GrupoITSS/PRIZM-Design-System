import type { ReactNode } from "react";

export type KindAlertMessage = "error" | "warning" | "success" | "info";

/** @deprecated Use `AlertProps` de `@grupoitss/prizm-ui/alert`. */
export type AlertMessageProps = React.HTMLAttributes<HTMLDivElement> & {
  message?: ReactNode;
  items?: string[];
  kind?: KindAlertMessage;
  canDismiss?: boolean;
  showIcon?: boolean;
};
