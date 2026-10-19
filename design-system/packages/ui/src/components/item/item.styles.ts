import { cva, type VariantProps } from "class-variance-authority";

/**
 * PRIZM Item — a versatile row container (media + content + actions).
 * Styles use design tokens from @grupoitss/prizm-tokens and support light/dark themes.
 *
 * @see https://ui.shadcn.com/docs/components/item
 */
export const itemVariants = cva(
  [
    "group/item",
    "flex flex-wrap items-center space-between",
    "rounded-md border border-transparent",
    "text-sm outline-none transition-colors duration-100",
    "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border-border bg-transparent",
        muted: "bg-muted/50",
        badges: "border-border bg-transparent",
        file: "border-border bg-card",
      },
      size: {
        default: "gap-4 p-4",
        sm: "gap-2.5 px-4 py-3",
        xs: "gap-2 px-3 py-2 text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export type ItemVariantProps = VariantProps<typeof itemVariants>;

export const itemMediaVariants = cva(
  ["flex shrink-0 items-center justify-center gap-2", "[&_svg]:pointer-events-none"].join(" "),
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "bg-muted size-8 rounded-sm border [&_svg:not([class*='size-'])]:size-4",
        image: "size-10 overflow-hidden rounded-sm [&_img]:size-full [&_img]:object-cover",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export type ItemMediaVariantProps = VariantProps<typeof itemMediaVariants>;

export const itemHeaderStyles = "flex basis-full items-center justify-between gap-2 ";
export const itemFooterStyles = "flex basis-full items-center justify-between gap-2";
export const itemContentStyles =
  "flex flex-1 space-between flex-col gap-1 [&+[data-slot=item-meta]]:flex-none";
export const itemTitleStyles = "flex w-full items-center gap-2 text-sm font-medium leading-snug";
export const itemDescriptionStyles = [
  "text-muted-foreground line-clamp-2 text-balance text-sm font-normal leading-normal",
  "[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4",
].join(" ");
export const itemMetaStyles = "flex flex-none flex-col text-center";
export const itemActionsStyles = "flex items-center gap-2";
