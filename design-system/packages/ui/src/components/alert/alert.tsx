import { cn } from "../../lib/cn";
import * as React from "react";
import { alertDescriptionStyles, alertTitleStyles, alertVariants } from "./alert.styles";
import type { AlertDescriptionProps, AlertProps, AlertTitleProps } from "./alert.types";

/**
 * Alert — container for important messages (variants: default/primary, destructive, warning, success).
 *
 * **Simplified API:** Pass `title`, `description`, `icon` as props (e.g. `<Alert variant="success" title="Saved" description="Changes saved." />`).
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
  // Se title é fornecido, usar API simplificada por props; senão, renderizar children (composição)
  const useSimplifiedAPI = title !== undefined;

  return (
    <div
      ref={ref}
      role="alert"
      data-slot="alert"
      data-variant={variant}
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      {useSimplifiedAPI ? (
        <>
          {icon}
          <AlertTitle>{title}</AlertTitle>
          {Boolean(description) && <AlertDescription>{description}</AlertDescription>}
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
}: AlertTitleProps & { ref?: React.Ref<HTMLParagraphElement> }) => (
  <h5 ref={ref} data-slot="alert-title" className={cn(alertTitleStyles, className)} {...props} />
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
