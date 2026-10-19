import { cva, type VariantProps } from "class-variance-authority";

/**
 * PRIZM Alert — styles use design tokens from @grupoitss/prizm-tokens.
 *
 * @see [Alert — shadcn/ui](https://ui.shadcn.com/docs/components/alert)
 */
export const alertVariants = cva(
  "relative w-full rounded-lg border border-border bg-card p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-0.1875rem] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "text-foreground [&>svg]:text-muted-foreground",
        destructive: "text-destructive [&>svg]:text-destructive",
        warning: "text-warning [&>svg]:text-warning",
        success: "text-success [&>svg]:text-success",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export type AlertVariantProps = VariantProps<typeof alertVariants>;

export const alertTitleStyles = "mb-1 font-medium leading-none tracking-tight";

export const alertDescriptionStyles = "text-sm [&_p]:leading-relaxed";
