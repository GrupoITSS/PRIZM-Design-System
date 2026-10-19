/**
 * PRIZM Breadcrumb — styles use design tokens from @grupoitss/prizm-tokens.
 *
 * Baseado no componente Breadcrumb do shadcn/ui, com ajustes
 * para a tipografia e cores do design system.
 *
 * @see https://ui.shadcn.com/docs/components/breadcrumb
 */

export const breadcrumbListStyles =
  "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5";

export const breadcrumbItemStyles = "inline-flex items-center gap-1.5";

export const breadcrumbLinkStyles =
  "inline-flex items-center gap-1.5 transition-colors hover:text-foreground";

export const breadcrumbPageStyles = "inline-flex items-center gap-1.5 font-normal text-foreground";

export const breadcrumbSeparatorStyles = "[&>svg]:h-3.5 [&>svg]:w-3.5 text-muted-foreground";

export const breadcrumbEllipsisStyles =
  "flex h-9 w-9 items-center justify-center text-muted-foreground";
