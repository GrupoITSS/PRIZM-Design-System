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

/**
 * Linhas que expandem (decisão de 16/11/2026): coluna de 48px (`w-12`) com o Button ghost icon-sm
 * (32px) e o padding da célula (8px dos lados). A sub-linha recua a primeira coluna de dados para
 * 40px: o padding da célula (`spacing/2`) mais o recuo (`spacing/6`) e o espaço (`spacing/2`),
 * como a booleana Sub-row da Table / Cell no Figma.
 */
export const tableExpandHead = "w-12";
export const tableExpandCell = "w-12";
export const tableSubRowIndent = "pl-10";

/**
 * Decisões de 17/11/2026 (teste da tela da Proposta):
 * - densidade: linha de 52px no padrão (`h-13`, com `p-2`) e 36px na compacta (`h-9`, com `py-1.5`);
 *   as duas medidas contam a borda de 1px da linha e são altura mínima: conteúdo maior cresce;
 * - texto cortado numa linha por padrão, com Tooltip quando corta; `wrap` na coluna quebra;
 * - números à direita com algarismos de largura fixa (`tabular-nums`), para os valores alinharem.
 */
export const tableCellDefaultDensity = "h-13";
export const tableCellCompactDensity = "h-9 py-1.5";
export const tableCellTruncate = "max-w-0";
export const tableCellText = "block truncate";
export const tableCellNumeric = "tabular-nums";
