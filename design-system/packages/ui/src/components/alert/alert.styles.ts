import { cva, type VariantProps } from "class-variance-authority";

/**
 * PRIZM Alert — styles use design tokens from @grupoitss/prizm-tokens.
 *
 * Tones follow the callout pattern (decisions of 29/10/2026): `<tone>-weak`
 * background, border and icon in the base tone, title and description in
 * `<tone>-strong`. `default` stays neutral, with a secondary description.
 *
 * @see [Alert — shadcn/ui](https://ui.shadcn.com/docs/components/alert)
 */
export const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 [&>svg~*]:pl-7 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-3.5 [&>svg]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-card border-border text-foreground [&>svg]:text-foreground [&_[data-slot=alert-description]]:text-muted-foreground",
        destructive:
          "bg-destructive-weak border-destructive text-destructive-strong [&>svg]:text-destructive",
        warning: "bg-warning-weak border-warning text-warning-strong [&>svg]:text-warning",
        success: "bg-success-weak border-success text-success-strong [&>svg]:text-success",
        info: "bg-info-weak border-info text-info-strong [&>svg]:text-info",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export type AlertVariantProps = VariantProps<typeof alertVariants>;

/**
 * Role per variant: `alert` interrupts the screen reader, so it is reserved for
 * what needs attention now. The rest is announced politely (`status`).
 */
export const alertRoles = {
  default: "status",
  destructive: "alert",
  warning: "alert",
  success: "status",
  info: "status",
} as const;

export const alertTitleStyles = "mb-1 text-sm font-medium leading-5 tracking-tight";

export const alertDescriptionStyles = "text-sm [&_p]:leading-relaxed";

/**
 * Com `action` (decisão de 11/11/2026): o texto e a ação na mesma linha, a ação à direita e
 * centralizada, a 16px (`spacing/4`). Em largura estreita, a ação desce para baixo do texto, a 8px.
 */
export const alertMainStyles = "flex flex-wrap items-center gap-x-4 gap-y-2";

/** Texto do Alert com ação: ocupa o espaço que sobra e deixa a ação descer quando não cabe. */
export const alertBodyStyles = "min-w-0 flex-1 basis-48";

/** Ação do Alert: um Button Outline sm do Prizm, por padrão. */
export const alertActionStyles = "flex shrink-0 items-center gap-2";
