import type * as React from "react";
import type { AlertDialog as RadixAlertDialog } from "radix-ui";

export interface AlertDialogProps extends React.ComponentPropsWithoutRef<
  typeof RadixAlertDialog.Root
> {
  /**
   * Trigger element that opens the dialog (e.g. a Button).
   * **Required** when using simplified API.
   * @example <Button variant="destructive">Delete</Button>
   */
  trigger?: React.ReactNode;
  /**
   * Dialog title. **Required for accessibility** (ARIA).
   * Should be a clear, concise question or statement.
   * @example "Are you sure?"
   */
  title?: React.ReactNode;
  /**
   * Dialog description. **Highly recommended for accessibility**.
   * Provides context and consequences of the action.
   * @example "This action cannot be undone. This will permanently delete your account."
   */
  description?: React.ReactNode;
  /**
   * Cancel button text. Optional.
   * @default "Cancelar"
   */
  cancelText?: string;
  /**
   * Action button text. Optional.
   * @default "Continuar"
   */
  actionText?: string;
  /**
   * Callback when action button is clicked. Optional.
   * Dialog will close automatically after execution.
   */
  onAction?: () => void;
  /**
   * Callback when cancel button is clicked. Optional.
   * Dialog will close automatically after execution.
   */
  onCancel?: () => void;
}

export type AlertDialogTriggerProps = React.ComponentPropsWithoutRef<
  typeof RadixAlertDialog.Trigger
>;

export interface AlertDialogContentProps extends Omit<
  React.ComponentPropsWithoutRef<typeof RadixAlertDialog.Content>,
  "className"
> {
  className?: string;
}

export type AlertDialogHeaderProps = React.HTMLAttributes<HTMLDivElement>;

export type AlertDialogFooterProps = React.HTMLAttributes<HTMLDivElement>;

export type AlertDialogTitleProps = React.ComponentPropsWithoutRef<typeof RadixAlertDialog.Title>;

export type AlertDialogDescriptionProps = React.ComponentPropsWithoutRef<
  typeof RadixAlertDialog.Description
>;

export type AlertDialogActionProps = React.ComponentPropsWithoutRef<typeof RadixAlertDialog.Action>;

export type AlertDialogCancelProps = React.ComponentPropsWithoutRef<typeof RadixAlertDialog.Cancel>;
