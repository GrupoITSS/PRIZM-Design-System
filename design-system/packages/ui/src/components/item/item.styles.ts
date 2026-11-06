import { cva, type VariantProps } from "class-variance-authority";

/**
 * PRIZM Item — a versatile row container (media + content + actions).
 * Styles use design tokens from @grupoitss/prizm-tokens and support light/dark themes.
 *
 * Decisions of 06/11/2026 (Leonardo): variants default, outline and muted, as in Figma (badges and
 * file left the variant: badges is the `badges` prop, FileItem sets its own surface). Focus with
 * the Button ring (3px `ring`, 2px `ring-offset`): `ring/50` passed 3:1 in 1 of 12 themes.
 *
 * @see https://ui.shadcn.com/docs/components/item
 */
export const itemVariants = cva(
  [
    "group/item",
    "flex flex-wrap items-center space-between",
    "rounded-md border border-transparent",
    "text-sm outline-none transition-colors duration-100",
    "focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-ring-offset",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border-border bg-transparent",
        muted: "bg-muted/50",
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

/** Interactive Item without href renders as a <button>: reset the native button look. */
export const itemButtonStyles = "w-full cursor-pointer text-left font-[inherit]";

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
// Title and description follow the Item size: text/sm, and text/xs in size xs (Figma, 06/11/2026).
export const itemTitleStyles =
  "flex w-full items-center gap-2 text-sm font-medium leading-snug group-data-[size=xs]/item:text-xs";
export const itemDescriptionStyles = [
  "text-muted-foreground line-clamp-2 text-balance text-sm font-normal leading-normal group-data-[size=xs]/item:text-xs",
  "[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4",
].join(" ");
export const itemMetaStyles = "flex flex-none flex-col text-center";
export const itemActionsStyles = "flex items-center gap-2";
