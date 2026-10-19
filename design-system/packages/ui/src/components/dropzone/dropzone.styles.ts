import { cva, type VariantProps } from "class-variance-authority";

/**
 * PRIZM Dropzone — styles use design tokens from @grupoitss/prizm-tokens.
 * Compatible with light/dark mode via :root and .dark CSS variables.
 */

const dropzoneBase =
  "group flex w-full max-w-2xl min-h-40 flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-muted-foreground bg-input/30 p-9 text-center text-sm transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-ring-offset data-[state=invalid]:focus-visible:ring-destructive";

export const dropzoneVariants = cva(dropzoneBase, {
  variants: {
    state: {
      idle: "hover:bg-muted",
      active: "border-muted-foreground bg-muted/80",
      loading: "border-muted-foreground bg-muted/80 cursor-wait",
      invalid:
        "border-destructive bg-destructive/5 aria-invalid:ring-2 aria-invalid:ring-destructive/30",
      disabled: "border-input/50 bg-muted/30 text-muted-foreground cursor-not-allowed opacity-60",
    },
  },
  defaultVariants: {
    state: "idle",
  },
});

export type DropzoneVariantProps = VariantProps<typeof dropzoneVariants>;

export const dropzoneIconWrapperStyles =
  "flex size-14 items-center justify-center text-foreground group-data-[state=loading]:text-muted-foreground group-data-[state=invalid]:text-destructive";

export const dropzoneInnerInputStyles =
  "flex min-h-9 w-full min-w-0 max-w-xl flex-col items-center justify-center gap-1 rounded-md px-3 text-center text-sm font-medium sm:flex-row sm:text-left";

export const dropzoneInnerPrimaryTextStyles =
  "text-sm font-normal text-foreground group-data-[state=invalid]:text-destructive";

export const dropzoneInnerSecondaryTextStyles =
  "text-sm font-normal text-muted-foreground/70 group-data-[state=invalid]:text-destructive";

export const dropzoneDescriptionStyles = "mt-2 text-xs text-muted-foreground/90";
