import type * as React from "react";
import type { AlertVariantProps } from "./alert.styles";

export interface AlertProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">, AlertVariantProps {
  /**
   * Alert title. Recommended for semantic clarity when using simplified API.
   * When using composition (AlertTitle/AlertDescription as children), omit this prop.
   * @example "Changes saved"
   */
  title?: React.ReactNode;
  /**
   * Alert description. Provides additional context. Optional but recommended.
   * @example "Your preferences have been saved successfully."
   */
  description?: React.ReactNode;
  /**
   * Icon element displayed at the left. Optional.
   * Commonly used: lucide-react icons (Info, CheckCircle, AlertTriangle, AlertCircle).
   * @example <CheckCircle className="size-4" />
   */
  icon?: React.ReactNode;
}

export type AlertTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

export type AlertDescriptionProps = React.HTMLAttributes<HTMLDivElement>;
