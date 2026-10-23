import { Input } from "../input";
import { cn } from "../../lib/cn";
import { X } from "../icons";
import { Dialog as RadixDialog } from "radix-ui";
import * as React from "react";
import {
  dialogCloseButtonStyles,
  dialogConfirmLabelStyles,
  dialogConfirmSectionStyles,
  dialogContentStyles,
  dialogDescriptionStyles,
  dialogFooterStyles,
  dialogHeaderStyles,
  dialogOverlayStyles,
  dialogTitleStyles,
} from "./dialog.styles";
import type {
  DialogCloseProps,
  DialogContentProps,
  DialogDescriptionProps,
  DialogFooterProps,
  DialogHeaderProps,
  DialogOverlayProps,
  DialogPortalProps,
  DialogProps,
  DialogTitleProps,
  DialogTriggerProps,
} from "./dialog.types";
import { matchesConfirmText } from "./dialog.utils";

/**
 * Dialog (root). Modal genérico para exibir conteúdo sobre a interface atual.
 *
 * **API recomendada (props diretas):**
 *
 * ```tsx
 * <Dialog
 *   trigger={<Button variant="outline">Open Dialog</Button>}
 *   title="Edit profile"
 *   description="Make changes to your profile here. Click save when you're done."
 *   body={
 *     <FieldGroup>
 *       <Field>...</Field>
 *     </FieldGroup>
 *   }
 *   footer={
 *     <>
 *       <Button variant="outline">Cancel</Button>
 *       <Button>Save changes</Button>
 *     </>
 *   }
 * />
 * ```
 *
 * **API de composição (escape hatch):**
 *
 * ```tsx
 * <Dialog>
 *   <DialogTrigger asChild>...</DialogTrigger>
 *   <DialogContent>...</DialogContent>
 * </Dialog>
 * ```
 *
 * @see https://ui.shadcn.com/docs/components/radix/dialog
 */
function DialogRoot({
  trigger,
  title,
  description,
  body,
  footer,
  showCloseButton,
  closeLabel,
  contentClassName,
  confirmInput,
  onConfirmValidityChange,
  open,
  onOpenChange,
  children,
  ...props
}: DialogProps) {
  const confirmInputId = React.useId();
  const [confirmValue, setConfirmValue] = React.useState("");

  const useSimplifiedAPI =
    trigger !== undefined ||
    title !== undefined ||
    description !== undefined ||
    body !== undefined ||
    footer !== undefined ||
    confirmInput !== undefined;

  const isConfirmValid = confirmInput
    ? matchesConfirmText(confirmValue, confirmInput.expectedValue)
    : true;

  React.useEffect(() => {
    onConfirmValidityChange?.(isConfirmValid);
  }, [isConfirmValid, onConfirmValidityChange]);

  const resetConfirmValue = React.useCallback(() => {
    setConfirmValue("");
  }, []);

  const handleOpenChange = React.useCallback(
    (nextOpen: boolean) => {
      if (!nextOpen) {
        resetConfirmValue();
      }
      onOpenChange?.(nextOpen);
    },
    [onOpenChange, resetConfirmValue],
  );

  if (useSimplifiedAPI) {
    return (
      <RadixDialog.Root {...props} open={open} onOpenChange={handleOpenChange}>
        {Boolean(trigger) && <DialogTrigger asChild>{trigger}</DialogTrigger>}
        <DialogContent
          showCloseButton={showCloseButton}
          closeLabel={closeLabel}
          className={contentClassName}
        >
          {Boolean(title || description) && (
            <DialogHeader>
              {Boolean(title) && <DialogTitle>{title}</DialogTitle>}
              {Boolean(description) && <DialogDescription>{description}</DialogDescription>}
            </DialogHeader>
          )}
          {body}
          {confirmInput && (
            <div className={dialogConfirmSectionStyles}>
              <p
                id={`${confirmInputId}-label`}
                className={dialogConfirmLabelStyles}
                onCopy={(event) => event.preventDefault()}
                onCut={(event) => event.preventDefault()}
              >
                {confirmInput.label}
              </p>
              <Input
                id={confirmInputId}
                value={confirmValue}
                onChange={(event) => setConfirmValue(event.target.value)}
                placeholder={confirmInput.placeholder ?? confirmInput.expectedValue}
                aria-labelledby={`${confirmInputId}-label`}
                autoComplete="off"
                size="sm"
              />
            </div>
          )}
          {Boolean(footer) && <DialogFooter>{footer}</DialogFooter>}
        </DialogContent>
      </RadixDialog.Root>
    );
  }

  return (
    <RadixDialog.Root open={open} onOpenChange={handleOpenChange} {...props}>
      {children}
    </RadixDialog.Root>
  );
}

const Dialog = DialogRoot;

const DialogTrigger = ({
  className,
  ref,
  ...props
}: DialogTriggerProps & { ref?: React.Ref<React.ComponentRef<typeof RadixDialog.Trigger>> }) => (
  <RadixDialog.Trigger ref={ref} data-slot="dialog-trigger" className={cn(className)} {...props} />
);
DialogTrigger.displayName = RadixDialog.Trigger.displayName ?? "DialogTrigger";

const DialogPortal = (props: DialogPortalProps) => <RadixDialog.Portal {...props} />;
DialogPortal.displayName = "DialogPortal";

const DialogOverlay = ({
  className,
  ref,
  ...props
}: DialogOverlayProps & { ref?: React.Ref<React.ComponentRef<typeof RadixDialog.Overlay>> }) => (
  <RadixDialog.Overlay
    ref={ref}
    data-slot="dialog-overlay"
    className={cn(dialogOverlayStyles, className)}
    {...props}
  />
);
DialogOverlay.displayName = RadixDialog.Overlay.displayName ?? "DialogOverlay";

const DialogClose = ({
  className,
  ref,
  ...props
}: DialogCloseProps & { ref?: React.Ref<React.ComponentRef<typeof RadixDialog.Close>> }) => (
  <RadixDialog.Close ref={ref} data-slot="dialog-close" className={cn(className)} {...props} />
);
DialogClose.displayName = RadixDialog.Close.displayName ?? "DialogClose";

const DialogContent = ({
  className,
  children,
  portalProps,
  showCloseButton = true,
  closeLabel = "Close",
  overlayClassName,
  ref,
  ...props
}: DialogContentProps & { ref?: React.Ref<React.ComponentRef<typeof RadixDialog.Content>> }) => (
  <DialogPortal {...portalProps}>
    <DialogOverlay className={overlayClassName} />
    <RadixDialog.Content
      ref={ref}
      data-slot="dialog-content"
      className={cn(dialogContentStyles, className)}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogClose className={cn(dialogCloseButtonStyles)}>
          <X className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only">{closeLabel}</span>
        </DialogClose>
      )}
    </RadixDialog.Content>
  </DialogPortal>
);
DialogContent.displayName = RadixDialog.Content.displayName ?? "DialogContent";

const DialogHeader = ({ className, ...props }: DialogHeaderProps) => (
  <div data-slot="dialog-header" className={cn(dialogHeaderStyles, className)} {...props} />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({ className, ...props }: DialogFooterProps) => (
  <div data-slot="dialog-footer" className={cn(dialogFooterStyles, className)} {...props} />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = ({
  className,
  ref,
  ...props
}: DialogTitleProps & { ref?: React.Ref<React.ComponentRef<typeof RadixDialog.Title>> }) => (
  <RadixDialog.Title
    ref={ref}
    data-slot="dialog-title"
    className={cn(dialogTitleStyles, className)}
    {...props}
  />
);
DialogTitle.displayName = RadixDialog.Title.displayName ?? "DialogTitle";

const DialogDescription = ({
  className,
  ref,
  ...props
}: DialogDescriptionProps & {
  ref?: React.Ref<React.ComponentRef<typeof RadixDialog.Description>>;
}) => (
  <RadixDialog.Description
    ref={ref}
    data-slot="dialog-description"
    className={cn(dialogDescriptionStyles, className)}
    {...props}
  />
);
DialogDescription.displayName = RadixDialog.Description.displayName ?? "DialogDescription";

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
