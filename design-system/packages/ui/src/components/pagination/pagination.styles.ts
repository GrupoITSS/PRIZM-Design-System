import { cva, type VariantProps } from "class-variance-authority";

/**
 * PRIZM Pagination — styles use design tokens from @grupoitss/prizm-tokens.
 */

const navBase = "mx-auto flex w-full justify-center";

export const paginationNavVariants = cva(navBase, {
  variants: {},
  defaultVariants: {},
});

const listBase = "flex flex-row items-center gap-1";

export const paginationListVariants = cva(listBase, {
  variants: {},
  defaultVariants: {},
});

/** Link/button used for each page number and for prev/next. Aligned with button ghost/outline. */
const linkBase =
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-ring-offset";

export const paginationLinkVariants = cva(linkBase, {
  variants: {
    variant: {
      default:
        "border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground active:bg-accent/80",
      ghost: "hover:bg-accent hover:text-accent-foreground active:bg-accent/80",
    },
    size: {
      default: "h-control-height-md min-w-control-height-md px-4 py-2 has-[>svg]:px-3",
      sm: "h-control-height-sm min-w-control-height-sm rounded-md px-3 text-sm has-[>svg]:px-2.5",
      icon: "size-control-height-md",
      "icon-sm": "size-control-height-sm",
    },
  },
  defaultVariants: {
    variant: "ghost",
    size: "default",
  },
});

const ellipsisBase =
  "flex h-9 w-9 items-center justify-center text-muted-foreground [&_svg]:size-4";

export const paginationEllipsisVariants = cva(ellipsisBase, {
  variants: {
    size: {
      default: "h-9 w-9",
      sm: "h-8 w-8 [&_svg]:size-3.5",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

/** Public API: only size is exposed; variant is internal (active vs ghost). */
export type PaginationVariantProps = Pick<VariantProps<typeof paginationLinkVariants>, "size">;
