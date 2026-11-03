import { cva, type VariantProps } from "class-variance-authority";

/**
 * PRIZM Pagination — the items are the Prizm Button (`buttonVariants`): ghost for pages and
 * arrows, outline for the current page (decisions of 03/11/2026). Focus, hover, pressed and
 * disabled come from the Button. These styles only add what the Button doesn't have.
 */

export const paginationNavVariants = cva("mx-auto flex w-full justify-center", {
  variants: {},
  defaultVariants: {},
});

export const paginationListVariants = cva("flex flex-row items-center gap-1", {
  variants: {},
  defaultVariants: {},
});

/**
 * Pagination size, as in Figma (Size = default · sm · icon · icon-sm). `icon` and `icon-sm`
 * make everything square: page numbers and arrows (icon only).
 */
export const paginationSizes = ["default", "sm", "icon", "icon-sm"] as const;
export type PaginationSize = (typeof paginationSizes)[number];

/** Page number: never narrower than tall (`min-w-control-height-*`); square in icon sizes. */
export const paginationPageVariants = cva("", {
  variants: {
    size: {
      default: "min-w-control-height-md",
      sm: "min-w-control-height-sm",
      icon: "",
      "icon-sm": "",
    },
  },
  defaultVariants: { size: "default" },
});

/** Ellipsis: the control height of the brand, icon in muted-foreground (not clickable). */
export const paginationEllipsisVariants = cva(
  "flex shrink-0 items-center justify-center text-muted-foreground [&_svg]:pointer-events-none",
  {
    variants: {
      size: {
        default: "size-control-height-md [&_svg]:size-4",
        sm: "size-control-height-sm [&_svg]:size-3.5",
        icon: "size-control-height-md [&_svg]:size-4",
        "icon-sm": "size-control-height-sm [&_svg]:size-3.5",
      },
    },
    defaultVariants: { size: "default" },
  },
);

/** Public API: only size is exposed. */
export type PaginationVariantProps = { size?: VariantProps<typeof paginationPageVariants>["size"] };
