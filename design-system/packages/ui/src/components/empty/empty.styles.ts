import { cva, type VariantProps } from "class-variance-authority";

/**
 * PRIZM Empty — styles use design tokens from @grupoitss/prizm-tokens.
 * Root container for empty state.
 */
export const emptyRootStyles =
  "flex min-w-0 flex-1 flex-col items-center justify-center gap-6 text-balance rounded-lg border border-dashed p-6 text-center md:p-12";

export const emptyHeaderStyles = "flex max-w-sm flex-col items-center gap-2 text-center";

/**
 * Media (icon) area variants.
 */
export const emptyMediaVariants = cva(
  "mb-2 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      mediaVariant: {
        default: "bg-transparent",
        icon: "bg-muted text-foreground flex size-10 shrink-0 items-center justify-center rounded-lg [&_svg:not([class*='size-'])]:size-6",
      },
    },
    defaultVariants: {
      mediaVariant: "default",
    },
  },
);

export type EmptyMediaVariantProps = VariantProps<typeof emptyMediaVariants>;

/**
 * `appearance="plain"` — sem borda/padding, para estados vazios dentro de
 * listagens (ex.: `DataTable.emptyMessage`).
 */
export const emptyPlainStyles = {
  root: "border-none p-0 text-pretty",
  header: "max-w-none",
  description: "max-w-xl text-pretty",
  icon: "text-muted-foreground",
} as const;

export const emptyTitleStyles = "text-lg font-medium tracking-tight";

/**
 * Link in the description follows the Button `link` rule: always underlined,
 * 2px underline on hover, no color change (decision of 29/10/2026).
 */
export const emptyDescriptionStyles =
  "text-muted-foreground text-sm/relaxed [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:decoration-2";

export const emptyContentStyles =
  "flex w-full min-w-0 max-w-sm flex-col items-center gap-4 text-balance text-sm";
