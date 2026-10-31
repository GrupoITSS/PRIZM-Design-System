import type * as React from "react";
import type { AlertDialog as RadixAlertDialog } from "radix-ui";

interface AlertDialogBaseProps extends React.ComponentPropsWithoutRef<
  typeof RadixAlertDialog.Root
> {
  /**
   * Dialog description. **Highly recommended for accessibility**.
   * Provides context and consequences of the action.
   * @example "This action cannot be undone. This will permanently delete your account."
   */
  description?: React.ReactNode;
  /**
   * Decorative icon shown in AlertDialogMedia (64px square, icon at 32px).
   * Above the title on mobile; to its left from 640px.
   * @example <Trash2 />
   */
  icon?: React.ReactNode;
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
   * Callback when the dialog is cancelled: Cancel button or Escape. Optional.
   * Dialog will close automatically after execution.
   */
  onCancel?: () => void;
}

/**
 * Simplified API (props) or composition (children).
 * With `trigger`, `title` is required: without it the dialog has no accessible name.
 */
export type AlertDialogProps = AlertDialogBaseProps &
  (
    | {
        /**
         * Trigger element that opens the dialog (e.g. a Button).
         * @example <Button variant="destructive">Delete</Button>
         */
        trigger?: React.ReactNode;
        /**
         * Dialog title. **Required** in the simplified API: it names the dialog (ARIA).
         * Should be a clear, concise question or statement.
         * @example "Are you sure?"
         */
        title: React.ReactNode;
      }
    | {
        trigger?: undefined;
        title?: undefined;
      }
  );

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

export type AlertDialogMediaProps = React.HTMLAttributes<HTMLDivElement>;

export type AlertDialogTitleProps = React.ComponentPropsWithoutRef<typeof RadixAlertDialog.Title>;

export type AlertDialogDescriptionProps = React.ComponentPropsWithoutRef<
  typeof RadixAlertDialog.Description
>;

export type AlertDialogActionProps = React.ComponentPropsWithoutRef<typeof RadixAlertDialog.Action>;

export type AlertDialogCancelProps = React.ComponentPropsWithoutRef<typeof RadixAlertDialog.Cancel>;
