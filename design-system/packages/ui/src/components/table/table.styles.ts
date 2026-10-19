/**
 * PRIZM Table — styles use design tokens from @grupoitss/prizm-tokens.
 * Compatible with light/dark mode via :root and .dark CSS variables.
 */

export const tableWrapper = "relative w-full overflow-auto";
export const tableBase = "w-full caption-bottom text-sm border-collapse";
export const tableHeader = "[&_tr]:border-b border-border";
export const tableBody = "[&_tr:last-child]:border-0";
export const tableFooter = "border-t border-border bg-muted/50 font-medium [&>tr]:last:border-b-0";
export const tableRow =
  "border-b border-border transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted";
export const tableHead =
  "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0";
export const tableCell = "p-4 align-middle [&:has([role=checkbox])]:pr-0";
export const tableCaption = "mt-4 text-sm text-muted-foreground";

export const alignLeft = "text-left";
export const alignRight = "text-right";
export const alignCenter = "text-center";
