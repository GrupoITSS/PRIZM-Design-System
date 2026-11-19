/**
 * PRIZM Breadcrumb — styles use design tokens from @grupoitss/prizm-tokens.
 *
 * Baseado no componente Breadcrumb do shadcn/ui, com ajustes
 * para a tipografia e cores do design system.
 *
 * @see https://ui.shadcn.com/docs/components/breadcrumb
 */

// O anel de foco é o mesmo do Button (decisão BC4, 18/11/2026): 3px em ring,
// com 2px de espaço em ring-offset. O raio xs deixa o anel com cantos.
const breadcrumbFocusStyles =
  "rounded-xs outline-none focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-ring-offset";

// Ícone do item com 16px, como no Figma (decisão BC6).
const breadcrumbIconStyles = "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0";

export const breadcrumbListStyles =
  "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5";

export const breadcrumbItemStyles = "inline-flex items-center gap-1.5";

/** Link do item. Serve também para o gatilho de um item com menu (BC3). */
export const breadcrumbLinkStyles = `inline-flex items-center gap-1.5 transition-colors hover:text-foreground ${breadcrumbIconStyles} ${breadcrumbFocusStyles}`;

export const breadcrumbPageStyles = `inline-flex items-center gap-1.5 font-normal text-foreground ${breadcrumbIconStyles}`;

/** Item do meio sem link: texto simples, sem aria-current. */
export const breadcrumbTextStyles = `inline-flex items-center gap-1.5 ${breadcrumbIconStyles}`;

export const breadcrumbSeparatorStyles = "[&>svg]:h-3.5 [&>svg]:w-3.5 text-muted-foreground";

// Hover em accent, como o Button ghost (P1, 18/11/2026).
export const breadcrumbEllipsisStyles = `flex h-9 w-9 items-center justify-center text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground ${breadcrumbIconStyles} ${breadcrumbFocusStyles}`;
