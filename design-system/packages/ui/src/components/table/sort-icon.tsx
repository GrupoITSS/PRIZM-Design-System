import {
  ArrowDown,
  ArrowDown01,
  ArrowDown10,
  ArrowDownAZ,
  ArrowDownZA,
  ArrowUp,
  ArrowUpDown,
} from "../icons";

/**
 * Tipo de dado da coluna ordenável. Define o par de ícones do cabeçalho:
 * `default` usa setas, `text` usa A–Z / Z–A e `number` usa 0–1 / 1–0.
 */
export type SortType = "default" | "text" | "number";

/** Ícone do botão de ordenação para o tipo da coluna e a direção atual (sem direção = ArrowUpDown). */
export function getSortIcon(
  sortType: SortType = "default",
  direction?: "asc" | "desc" | false,
) {
  if (!direction) return ArrowUpDown;
  if (sortType === "text")
    return direction === "asc" ? ArrowDownAZ : ArrowDownZA;
  if (sortType === "number")
    return direction === "asc" ? ArrowDown01 : ArrowDown10;
  return direction === "asc" ? ArrowUp : ArrowDown;
}

/** Ícone de ordenação do cabeçalho; escolhe o par certo para o `sortType` e a direção. */
export function SortIcon({
  sortType = "default",
  direction,
}: {
  sortType?: SortType;
  direction?: "asc" | "desc" | false;
}) {
  if (!direction) return <ArrowUpDown aria-hidden />;
  const asc = direction === "asc";
  if (sortType === "text")
    return asc ? <ArrowDownAZ aria-hidden /> : <ArrowDownZA aria-hidden />;
  if (sortType === "number")
    return asc ? <ArrowDown01 aria-hidden /> : <ArrowDown10 aria-hidden />;
  return asc ? <ArrowUp aria-hidden /> : <ArrowDown aria-hidden />;
}
