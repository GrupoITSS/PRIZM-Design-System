import { cva, type VariantProps } from "class-variance-authority";

/**
 * PRIZM Card — container for grouped content with header, body and footer.
 * All styles use design tokens from @grupoitss/prizm-tokens (`bg-card`, `text-card-foreground`, etc.).
 * Compatible with light/dark mode via :root and .dark CSS variables.
 *
 * Decisions of 09/11/2026 (Leonardo): `radius/xl` (`rounded-xl`), title `text/base`, no `size`
 * axis (Figma and shadcn have a single density). CardAction sits in the header grid, top-right.
 *
 * @see https://ui.shadcn.com/docs/components/card
 */
export const cardVariants = cva(
  "rounded-xl border border-border bg-card text-card-foreground shadow-sm",
);

export type CardVariantProps = VariantProps<typeof cardVariants>;

/**
 * CardHeader — title, description and optional action.
 * With `CardAction`, the grid places the action in the top-right (shadcn pattern).
 */
export const cardHeaderStyles =
  "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 p-6 has-data-[slot=card-action]:grid-cols-[1fr_auto]";

/**
 * CardContent — main body section of the card.
 */
export const cardContentStyles = "p-6 pt-0";

/**
 * CardFooter — bottom section used for actions and secondary content.
 */
export const cardFooterStyles = "flex items-center p-6 pt-0";

/**
 * CardAction — top-right of the header when present.
 */
export const cardActionStyles =
  "col-start-2 row-span-2 row-start-1 self-start justify-self-end flex items-center gap-2";

/**
 * CardTitle — text/base semibold, matching Figma (`text/base` + `font-weight/semibold`).
 */
export const cardTitleStyles = "text-base font-semibold leading-none tracking-tight";

/**
 * CardDescription — text/sm muted.
 */
export const cardDescriptionStyles = "text-sm text-muted-foreground";
