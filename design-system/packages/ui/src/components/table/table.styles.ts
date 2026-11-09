/**
 * PRIZM Table — styles use design tokens from @grupoitss/prizm-tokens.
 * Compatible with light/dark mode via :root and .dark CSS variables.
 *
 * Decisions of 06/11/2026 (Leonardo), as in Figma and in the current shadcn:
 * header 40px with 8px on the sides, in `foreground`, no wrapping; cell with 8px and wrapping
 * (product descriptions are long). Before, from pas-ui (older shadcn): 48px, 16px and 16px,
 * with the header in `muted-foreground`. DataTable keeps its own sizes, by className.
 */

export const tableWrapper = "relative w-full overflow-auto";
export const tableBase = "w-full caption-bottom text-sm border-collapse";
export const tableHeader = "[&_tr]:border-b border-border";
export const tableBody = "[&_tr:last-child]:border-0";
export const tableFooter = "border-t border-border bg-muted/50 font-medium [&>tr]:last:border-b-0";
export const tableRow =
  "border-b border-border transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted";
export const tableHead =
  "h-10 px-2 text-left align-middle font-medium whitespace-nowrap text-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]";
export const tableCell =
  "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]";
export const tableCaption = "mt-4 text-sm text-muted-foreground";

export const alignLeft = "text-left";
export const alignRight = "text-right";
export const alignCenter = "text-center";
