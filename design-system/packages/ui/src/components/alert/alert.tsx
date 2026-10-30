import { cn } from "../../lib/cn";
import * as React from "react";
import { alertDescriptionStyles, alertRoles, alertTitleStyles, alertVariants } from "./alert.styles";
import type { AlertDescriptionProps, AlertProps, AlertTitleProps } from "./alert.types";

/**
 * Alert — message that stays on the page (variants: default, destructive, warning, success, info).
 *
 * `destructive` and `warning` render with `role="alert"` (interrupts the screen reader);
 * `default`, `success` and `info` with `role="status"` (polite). Pass `role` to override.
 *
 * **Simplified API:** Pass `title`, `description`, `icon` as props (any of them; `title` is optional) (e.g. `<Alert variant="success" title="Saved" description="Changes saved." />`).
 * **Composition API:** Pass AlertTitle and AlertDescription as children for advanced use.
 *
 * @see [Alert — shadcn/ui](https://ui.shadcn.com/docs/components/alert)
 */
const Alert = ({
  className,
  variant,
  title,
  description,
  icon,
  children,
  ref,
  ...props
}: AlertProps & { ref?: React.Ref<HTMLDivElement> }) => {
  // API por props quando há title, description ou icon (o Figma permite Alert sem título).
  // Sem nenhum deles, é composição: só children. Na API por props, children entram depois
  // da descrição (ex.: um Button de ação), para nada sumir sem aviso.
  const useSimplifiedAPI = title != null || description != null || icon != null;

  return (
    <div
      ref={ref}
      role={alertRoles[variant ?? "default"]}
      data-slot="alert"
      data-variant={variant}
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      {useSimplifiedAPI ? (
        <>
          {icon}
          {title != null && <AlertTitle>{title}</AlertTitle>}
          {description != null && <AlertDescription>{description}</AlertDescription>}
          {children}
        </>
      ) : (
        children
      )}
    </div>
  );
};
Alert.displayName = "Alert";

const AlertTitle = ({
  className,
  ref,
  ...props
}: AlertTitleProps & { ref?: React.Ref<HTMLDivElement> }) => (
  <div ref={ref} data-slot="alert-title" className={cn(alertTitleStyles, className)} {...props} />
);
AlertTitle.displayName = "AlertTitle";

const AlertDescription = ({
  className,
  ref,
  ...props
}: AlertDescriptionProps & { ref?: React.Ref<HTMLDivElement> }) => (
  <div
    ref={ref}
    data-slot="alert-description"
    className={cn(alertDescriptionStyles, className)}
    {...props}
  />
);
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertDescription, AlertTitle };
