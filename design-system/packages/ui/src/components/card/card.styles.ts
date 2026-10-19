import { cva, type VariantProps } from "class-variance-authority";

/**
 * PRIZM Card — container for grouped content with header, body and footer.
 * All styles use design tokens from @grupoitss/prizm-tokens (`bg-card`, `text-card-foreground`, etc.).
 * Compatible with light/dark mode via :root and .dark CSS variables.
 *
 * @see https://ui.shadcn.com/docs/components/card
 */
export const cardVariants = cva(
  "rounded-lg border border-border bg-card text-card-foreground shadow-sm",
  {
    variants: {
      size: {
        default: "",
        /**
         * Small card: slightly reduced typography and density.
         */
        sm: "text-sm",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

export type CardVariantProps = VariantProps<typeof cardVariants>;

/**
 * CardHeader — top section used for title, description and optional action.
 * Padding is controlled by the card size to keep density consistent.
 */
export const cardHeaderVariants = cva("flex flex-col space-y-1.5", {
  variants: {
    size: {
      default: "p-6",
      sm: "p-4 pb-3",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

/**
 * CardContent — main body section of the card.
 */
export const cardContentVariants = cva("", {
  variants: {
    size: {
      default: "p-6 pt-0",
      sm: "p-4 pt-0",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

/**
 * CardFooter — bottom section used for actions and secondary content.
 */
export const cardFooterVariants = cva("flex items-center", {
  variants: {
    size: {
      default: "p-6 pt-0",
      sm: "p-4 pt-0",
    },
  },
  defaultVariants: {
    size: "default",
  },
});
