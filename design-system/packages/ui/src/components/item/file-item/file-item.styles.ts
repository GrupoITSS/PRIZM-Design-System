import { cva, type VariantProps } from "class-variance-authority";

// ---------------------------------------------------------------------------
// FileItem — icon color variants
// ---------------------------------------------------------------------------

export const fileIconColorVariants = cva(
  "flex shrink-0 items-center justify-center size-8 rounded-md [&_svg]:size-4",
  {
    variants: {
      color: {
        blue: "bg-primary/15 text-primary",
        red: "bg-primary/15 text-primary",
        green: "bg-primary/15 text-primary",
        orange: "bg-primary/15 text-primary",
        neutral: "bg-primary/15 text-primary",
      },
    },
    defaultVariants: {
      color: "neutral",
    },
  },
);

export type FileIconColorVariantProps = VariantProps<typeof fileIconColorVariants>;

// ---------------------------------------------------------------------------
// FileItem — title, meta and actions styles
// ---------------------------------------------------------------------------

export const fileItemTitleContainerStyles =
  "flex flex-col min-w-0 w-full flex-wrap justify-center gap-x-2 gap-y-0.5";

export const fileItemNameStyles =
  "block max-w-full overflow-hidden text-ellipsis whitespace-nowrap";

export const fileItemMetaTextStyles = "text-muted-foreground text-xs";

export const fileItemTitleSlotStyles = "min-w-0 flex-1 overflow-hidden";

export const fileItemContentSlotStyles = "min-w-0";

export const fileRemoveButtonStyles =
  "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-sm p-1 opacity-60 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring";

export const fileRemoveIconStyles = "size-4";

export const fileStatusVariants = cva("text-xs font-medium", {
  variants: {
    status: {
      WAITING: "text-primary",
      PROCESSING: "text-warning",
      PROCESSED: "text-success",
      ERROR: "text-destructive",
      UNKNOWN: "text-muted-foreground",
    },
  },
  defaultVariants: {
    status: "UNKNOWN",
  },
});

export type FileStatusVariantProps = VariantProps<typeof fileStatusVariants>;

// ---------------------------------------------------------------------------
// FileList
// ---------------------------------------------------------------------------

export const fileListVariants = cva("flex w-full flex-col gap-2", {
  variants: {
    scrollable: {
      true: "max-h-48 overflow-auto pr-1 border-4",
      false: "",
    },
  },
  defaultVariants: {
    scrollable: false,
  },
});
