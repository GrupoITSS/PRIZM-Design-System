import { cn } from "../../lib/cn";
import { AlertDialog as RadixAlertDialog } from "radix-ui";
import * as React from "react";
import {
  alertDialogContentStyles,
  alertDialogDescriptionStyles,
  alertDialogFooterStyles,
  alertDialogHeaderStyles,
  alertDialogMediaStyles,
  alertDialogOverlayStyles,
  alertDialogTitleStyles,
} from "./alert-dialog.styles";
import type {
  AlertDialogActionProps,
  AlertDialogCancelProps,
  AlertDialogContentProps,
  AlertDialogDescriptionProps,
  AlertDialogFooterProps,
  AlertDialogHeaderProps,
  AlertDialogMediaProps,
  AlertDialogProps,
  AlertDialogTitleProps,
  AlertDialogTriggerProps,
} from "./alert-dialog.types";
import { Button } from "../button";

/**
 * AlertDialog (root). Modal for confirmations and important actions.
 *
 * **Simplified API:** Pass `trigger`, `title`, `description`, `icon`, `cancelText`, `actionText`, `onAction` as props.
 * For an action that takes time, use the composition API with `<Button loading>` inside
 * `AlertDialogAction` and a controlled `open`, so the dialog only closes when the action ends.
 * **Composition API:** Pass AlertDialogTrigger, AlertDialogContent, etc. as children for advanced use.
 *
 * @see [Alert Dialog — shadcn/ui (Radix)](https://ui.shadcn.com/docs/components/radix/alert-dialog)
 */
function AlertDialogRoot({
  trigger,
  title,
  description,
  icon,
  cancelText = "Cancelar",
  actionText = "Continuar",
  onAction,
  onCancel,
  children,
  ...props
}: AlertDialogProps) {
  // Se trigger ou title são passados, usar API simplificada
  const useSimplifiedAPI = trigger !== undefined || title !== undefined;
  const hasChildren = children != null && children !== false;

  // Na API por props, children não é desenhado (combinação inválida, decisão de 31/10).
  React.useEffect(() => {
    if (process.env.NODE_ENV !== "production" && useSimplifiedAPI && hasChildren) {
      console.warn(
        "AlertDialog: children é ignorado quando há trigger ou title (API por props). Use só props, ou só composição.",
      );
    }
  }, [useSimplifiedAPI, hasChildren]);

  if (useSimplifiedAPI) {
    return (
      <RadixAlertDialog.Root {...props}>
        {Boolean(trigger) && <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>}
        <AlertDialogContent onEscapeKeyDown={() => onCancel?.()}>
          <AlertDialogHeader>
            {Boolean(icon) && <AlertDialogMedia>{icon}</AlertDialogMedia>}
            {Boolean(title) && <AlertDialogTitle>{title}</AlertDialogTitle>}
            {Boolean(description) && <AlertDialogDescription>{description}</AlertDialogDescription>}
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel asChild onClick={onCancel}>
              <Button variant="outline">{cancelText}</Button>
            </AlertDialogCancel>
            <AlertDialogAction asChild onClick={onAction}>
              <Button>{actionText}</Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </RadixAlertDialog.Root>
    );
  }

  return <RadixAlertDialog.Root {...props}>{children}</RadixAlertDialog.Root>;
}
AlertDialogRoot.displayName = "AlertDialog";

const AlertDialog = AlertDialogRoot;

const AlertDialogTrigger = ({
  className,
  ref,
  ...props
}: AlertDialogTriggerProps & {
  ref?: React.Ref<React.ComponentRef<typeof RadixAlertDialog.Trigger>>;
}) => (
  <RadixAlertDialog.Trigger
    ref={ref}
    data-slot="alert-dialog-trigger"
    className={cn(className)}
    {...props}
  />
);
AlertDialogTrigger.displayName = RadixAlertDialog.Trigger.displayName ?? "AlertDialogTrigger";

const AlertDialogPortal = RadixAlertDialog.Portal;
AlertDialogPortal.displayName = "AlertDialogPortal";

const AlertDialogOverlay = ({
  className,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof RadixAlertDialog.Overlay> & {
  ref?: React.Ref<React.ComponentRef<typeof RadixAlertDialog.Overlay>>;
}) => (
  <RadixAlertDialog.Overlay
    ref={ref}
    data-slot="alert-dialog-overlay"
    className={cn(alertDialogOverlayStyles, className)}
    {...props}
  />
);
AlertDialogOverlay.displayName = RadixAlertDialog.Overlay.displayName ?? "AlertDialogOverlay";

const AlertDialogContent = ({
  className,
  children,
  ref,
  ...props
}: AlertDialogContentProps & {
  ref?: React.Ref<React.ComponentRef<typeof RadixAlertDialog.Content>>;
}) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <RadixAlertDialog.Content
      ref={ref}
      data-slot="alert-dialog-content"
      className={cn(alertDialogContentStyles, className)}
      {...props}
    >
      {children}
    </RadixAlertDialog.Content>
  </AlertDialogPortal>
);
AlertDialogContent.displayName = RadixAlertDialog.Content.displayName ?? "AlertDialogContent";

const AlertDialogHeader = ({ className, ...props }: AlertDialogHeaderProps) => (
  <div
    data-slot="alert-dialog-header"
    className={cn(alertDialogHeaderStyles, className)}
    {...props}
  />
);
AlertDialogHeader.displayName = "AlertDialogHeader";

const AlertDialogFooter = ({ className, ...props }: AlertDialogFooterProps) => (
  <div
    data-slot="alert-dialog-footer"
    className={cn(alertDialogFooterStyles, className)}
    {...props}
  />
);
AlertDialogFooter.displayName = "AlertDialogFooter";

/**
 * Decorative media (an icon) shown above the title on mobile and to its left from 640px.
 * `aria-hidden` by default: the title already names the dialog.
 */
const AlertDialogMedia = ({ className, ...props }: AlertDialogMediaProps) => (
  <div
    aria-hidden="true"
    data-slot="alert-dialog-media"
    className={cn(alertDialogMediaStyles, className)}
    {...props}
  />
);
AlertDialogMedia.displayName = "AlertDialogMedia";

const AlertDialogTitle = ({
  className,
  ref,
  ...props
}: AlertDialogTitleProps & {
  ref?: React.Ref<React.ComponentRef<typeof RadixAlertDialog.Title>>;
}) => (
  <RadixAlertDialog.Title
    ref={ref}
    data-slot="alert-dialog-title"
    className={cn(alertDialogTitleStyles, className)}
    {...props}
  />
);
AlertDialogTitle.displayName = RadixAlertDialog.Title.displayName ?? "AlertDialogTitle";

const AlertDialogDescription = ({
  className,
  ref,
  ...props
}: AlertDialogDescriptionProps & {
  ref?: React.Ref<React.ComponentRef<typeof RadixAlertDialog.Description>>;
}) => (
  <RadixAlertDialog.Description
    ref={ref}
    data-slot="alert-dialog-description"
    className={cn(alertDialogDescriptionStyles, className)}
    {...props}
  />
);
AlertDialogDescription.displayName =
  RadixAlertDialog.Description.displayName ?? "AlertDialogDescription";

const AlertDialogAction = ({
  className,
  ref,
  ...props
}: AlertDialogActionProps & {
  ref?: React.Ref<React.ComponentRef<typeof RadixAlertDialog.Action>>;
}) => (
  <RadixAlertDialog.Action
    ref={ref}
    data-slot="alert-dialog-action"
    className={cn(className)}
    {...props}
  />
);
AlertDialogAction.displayName = RadixAlertDialog.Action.displayName ?? "AlertDialogAction";

const AlertDialogCancel = ({
  className,
  ref,
  ...props
}: AlertDialogCancelProps & {
  ref?: React.Ref<React.ComponentRef<typeof RadixAlertDialog.Cancel>>;
}) => (
  <RadixAlertDialog.Cancel
    ref={ref}
    data-slot="alert-dialog-cancel"
    className={cn(className)}
    {...props}
  />
);
AlertDialogCancel.displayName = RadixAlertDialog.Cancel.displayName ?? "AlertDialogCancel";

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
};
