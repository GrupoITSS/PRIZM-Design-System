import type * as React from "react";
import type { AlertVariantProps } from "./alert.styles";

export interface AlertProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">, AlertVariantProps {
  /**
   * Alert title. Optional: `description` or `icon` alone also use the props-based layout
   * (the Figma set lets the title be turned off). With props, `children` (e.g. an action
   * Button) render after the description. Omit all three to compose with AlertTitle/AlertDescription.
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
   * Commonly used: icons from @grupoitss/prizm-ui/icons (Info, CircleCheckBig, TriangleAlert, CircleAlert).
   * @example <CircleCheckBig className="size-4" />
   */
  icon?: React.ReactNode;
}

/** Title of the alert. Rendered as a `div`, so it does not enter the page heading outline. */
export type AlertTitleProps = React.HTMLAttributes<HTMLDivElement>;

export type AlertDescriptionProps = React.HTMLAttributes<HTMLDivElement>;
