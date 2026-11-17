import { tableRowHighlighted, tableSortButton } from "../table.styles";

/**
 * Estilos do DataTable.
 *
 * Decisões de 17/11/2026 (teste de tela da Proposta): o DataTable segue a Table. Cabeçalho com 40px,
 * 8px dos lados, em `foreground`; linha com 52px de altura mínima e célula com 8px. Antes, o
 * cabeçalho ficava em `foreground` a 40% e a célula com 16px dos lados.
 */

/** Cabeçalho: `height/10`, `spacing/2` dos lados, `foreground`, sem quebra. */
export const dataTableHead =
  "h-10 min-w-0 px-2 text-sm font-medium whitespace-nowrap text-foreground";

/** Célula: 52px de altura mínima, com a borda, e `spacing/2`. */
export const dataTableCell = "h-13 min-w-0 p-2";

/** Números à direita com algarismos de largura fixa. */
export const dataTableCellNumeric = "tabular-nums";

/** Linha clicável: foco pelo teclado com o contorno do anel do Prizm, por dentro da linha. */
export const dataTableRowClickable =
  "cursor-pointer focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring";

/** Botão de ordenar no cabeçalho: ocupa o padding da célula para o texto não mudar de lugar. */
export const dataTableSortButton = tableSortButton;

/**
 * Linha em destaque (decisão de 17/11/2026): só o fundo `muted`, para diferenciar linhas da tabela,
 * como a Table / Cell com State=Selected no Figma (referência: catálogo da proposta, Redesign
 * Pricing). Sem tons nem barra.
 */
export const dataTableRowHighlighted = tableRowHighlighted;

/** Linha de grupo: `muted`, 40px, texto `medium`, com a contagem em `muted-foreground`. */
export const dataTableGroupRow = "border-b border-border bg-muted hover:bg-muted";
export const dataTableGroupCell = "h-10 px-2 py-2 text-left text-sm font-medium text-foreground";
export const dataTableGroupCount = "ml-2 font-normal text-muted-foreground";
/**
 * Botão de recolher o grupo: chevron e o conteúdo da linha de grupo. Ocupa o padding da célula, como
 * o botão de ordenar, para o texto não mudar de lugar entre grupo que recolhe e que não recolhe.
 */
export const dataTableGroupToggle =
  "-mx-1 inline-flex min-h-8 items-center gap-2 rounded-md px-1 text-left font-medium text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring [&_svg]:size-4 [&_svg]:shrink-0";

/** Linha de resumo (totais): como o rodapé da Table. */
export const dataTableSummaryRow =
  "border-t border-border bg-muted/50 font-medium hover:bg-muted/50";

/** Coluna de abrir o detalhe: 48px, como a coluna de expandir da Table. */
export const dataTableExpandCell = "w-12";

/** Linha de detalhe: ocupa a largura toda, abaixo da linha que a abre. */
export const dataTableDetailRow = "border-b border-border hover:bg-transparent";
export const dataTableDetailCell = "px-2 py-4 pl-14";

/**
 * Coluna fixa. A célula fixa precisa de fundo opaco: repete o fundo da linha (hover, selecionada,
 * destaque), já que o da linha é transparente ou fica por baixo das células que rolam.
 */
export const dataTableStickyCell =
  "sticky z-10 bg-background [tr:hover>&]:bg-[color-mix(in_oklab,var(--prizm-color-muted)_50%,var(--prizm-color-background))] [tr[data-state=selected]>&]:bg-muted [tr[data-highlighted=true]>&]:bg-muted";
/** Cabeçalho da coluna fixa. */
export const dataTableStickyHead = "sticky z-20 bg-background";
/** Borda que separa a coluna fixa das que rolam. */
export const dataTableStickyEdgeLeft = "shadow-[inset_-1px_0_0_var(--prizm-color-border)]";
export const dataTableStickyEdgeRight = "shadow-[inset_1px_0_0_var(--prizm-color-border)]";

/** Cabeçalho fixo no topo, quando a tabela rola na vertical. */
export const dataTableStickyHeader = "sticky top-0 z-30 bg-background";

/** Estado de carregando: linhas de Skeleton no lugar dos dados. */
export const dataTableSkeleton = "h-4 w-full max-w-40";
