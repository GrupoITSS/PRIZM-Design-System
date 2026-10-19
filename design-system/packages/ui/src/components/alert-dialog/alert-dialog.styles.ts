/**
 * PRIZM Alert Dialog — styles use design tokens from @grupoitss/prizm-tokens.
 * Radix Alert Dialog primitive with shadcn-style layout and tokens.
 *
 * @see [Alert Dialog — shadcn/ui (Radix)](https://ui.shadcn.com/docs/components/radix/alert-dialog)
 */

/** Overlay: escurece o fundo + blur (estilo shadcn). */
export const alertDialogOverlayStyles =
  "fixed inset-0 z-50 bg-black/80 backdrop-blur-[0.125rem] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0";

/** Content: apenas zoom (scale) + fade, sem slide — igual ao padrão shadcn. */
export const alertDialogContentStyles =
  "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg";

export const alertDialogHeaderStyles = "flex flex-col space-y-2 text-center sm:text-left";

export const alertDialogFooterStyles =
  "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2";

export const alertDialogTitleStyles =
  "text-lg font-semibold [color:var(--alert-dialog-title,var(--prizm-color-foreground))]";

export const alertDialogDescriptionStyles =
  "text-sm [color:var(--alert-dialog-desc,var(--prizm-color-muted-foreground))]";
