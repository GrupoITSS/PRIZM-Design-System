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
} from "./dialog";

export {
  dialogCloseButtonStyles,
  dialogCloseStyles,
  dialogConfirmLabelStyles,
  dialogConfirmSectionStyles,
  dialogContentStyles,
  dialogContentVariants,
  dialogDescriptionStyles,
  dialogFooterStyles,
  dialogHeaderStyles,
  dialogOverlayStyles,
  dialogSizes,
  dialogTitleStyles,
} from "./dialog.styles";

export { matchesConfirmText, normalizeConfirmText } from "./dialog.utils";

export type { DialogContentVariantProps, DialogSize } from "./dialog.styles";

export type {
  DialogCloseProps,
  DialogConfirmInputConfig,
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
