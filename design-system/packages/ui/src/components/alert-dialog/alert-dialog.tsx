import { cn } from "../../lib/cn";
import { AlertDialog as RadixAlertDialog } from "radix-ui";
import * as React from "react";
import {
  alertDialogContentStyles,
  alertDialogDescriptionStyles,
  alertDialogFooterStyles,
  alertDialogHeaderStyles,
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
  AlertDialogProps,
  AlertDialogTitleProps,
  AlertDialogTriggerProps,
} from "./alert-dialog.types";
import { Button } from "../button";

/**
 * AlertDialog (root). Modal for confirmations and important actions.
 *
 * **Simplified API:** Pass `trigger`, `title`, `description`, `cancelText`, `actionText`, `onAction` as props.
 * **Composition API:** Pass AlertDialogTrigger, AlertDialogContent, etc. as children for advanced use.
 *
 * @see [Alert Dialog — shadcn/ui (Radix)](https://ui.shadcn.com/docs/components/radix/alert-dialog)
 */
function AlertDialogRoot({
  trigger,
  title,
  description,
  cancelText = "Cancelar",
  actionText = "Continuar",
  onAction,
  onCancel,
  children,
  ...props
}: AlertDialogProps) {
  // Se trigger ou title são passados, usar API simplificada
  const useSimplifiedAPI = trigger !== undefined || title !== undefined;

  if (useSimplifiedAPI) {
    return (
      <RadixAlertDialog.Root {...props}>
        {Boolean(trigger) && <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>}
        <AlertDialogContent>
          <AlertDialogHeader>
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
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
};
