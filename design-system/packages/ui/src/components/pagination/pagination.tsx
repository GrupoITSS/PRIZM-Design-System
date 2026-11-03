import { cn } from "../../lib/cn";
import { buttonVariants } from "../button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Ellipsis } from "../icons";
import type * as React from "react";
import {
  paginationEllipsisVariants,
  paginationListVariants,
  paginationNavVariants,
  paginationPageVariants,
  type PaginationSize,
} from "./pagination.styles";
import type { PaginationProps } from "./pagination.types";

/** Returns array of page numbers and 'ellipsis' for rendering. */
function getPageItems(
  totalPages: number,
  page: number,
  siblingCount: number,
): (number | "ellipsis")[] {
  if (totalPages <= 0) return [];
  const needEllipsis = totalPages > 2 * siblingCount + 3 + 2;
  if (!needEllipsis) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const left = Math.max(2, page - siblingCount);
  const right = Math.min(totalPages - 1, page + siblingCount);
  const showLeftEllipsis = left > 2;
  const showRightEllipsis = right < totalPages - 1;
  const out: (number | "ellipsis")[] = [1];
  if (showLeftEllipsis) out.push("ellipsis");
  for (let i = left; i <= right; i++) out.push(i);
  if (showRightEllipsis) out.push("ellipsis");
  if (totalPages > 1) out.push(totalPages);
  return out;
}

const isSmall = (size: PaginationSize) => size === "sm" || size === "icon-sm";

type Nav = "first" | "previous" | "next" | "last";

const NAV_ARIA: Record<Nav, string> = {
  first: "Ir para a primeira página",
  previous: "Ir para a página anterior",
  next: "Ir para a próxima página",
  last: "Ir para a última página",
};

/**
 * Pagination do design system PRIZM. API 100% baseada em props: informe a página atual, o total de
 * páginas e `onPageChange` ou `getHref`. Os itens são o Button do Prizm (ghost; outline na atual).
 *
 * - `size`: `default` | `sm` | `icon` | `icon-sm`. Em `icon` e `icon-sm`, números quadrados e setas só com ícone.
 * - `iconsOnly`: só as setas, com ícone (tabelas). `showIcons={false}`: setas só com texto.
 * - A página atual tem `aria-current="page"` e não é desabilitada. Setas nas pontas ficam com
 *   `aria-disabled` (o foco não se perde).
 *
 * @see [Pagination — shadcn/ui](https://ui.shadcn.com/docs/components/pagination) — Documentação de referência.
 */
function Pagination({
  page,
  totalPages,
  onPageChange,
  getHref,
  showPrevNext = true,
  showFirstLast = false,
  iconsOnly = false,
  showIcons = true,
  siblingCount = 1,
  prevLabel = "Anterior",
  nextLabel = "Próxima",
  firstLabel = "Primeira",
  lastLabel = "Última",
  size: sizeProp,
  className,
  "aria-label": ariaLabel = "Paginação",
  ...navProps
}: PaginationProps) {
  const size: PaginationSize = sizeProp ?? "default";
  const pageItems = iconsOnly ? [] : getPageItems(totalPages, page, siblingCount);
  const isFirst = page <= 1;
  const isLast = page >= totalPages;
  // Arrows are icon only in iconsOnly and in the icon sizes (Figma: Size = icon · icon-sm).
  const arrowsIconOnly = iconsOnly || size === "icon" || size === "icon-sm";
  const arrowSize = arrowsIconOnly
    ? isSmall(size)
      ? "icon-sm"
      : "icon"
    : isSmall(size)
      ? "sm"
      : "default";
  const pageSize = size;

  const go = (target: number) => (e: React.MouseEvent) => {
    if (target === page || target < 1 || target > totalPages) {
      e.preventDefault();
      return;
    }
    if (getHref && !onPageChange) return; // plain navigation via href
    e.preventDefault();
    onPageChange?.(target);
  };

  const renderPage = (p: number) => {
    const isActive = p === page;
    const className = cn(
      buttonVariants({ variant: isActive ? "outline" : "ghost", size: pageSize }),
      paginationPageVariants({ size: pageSize }),
    );
    const href = getHref?.(p);
    if (href != null) {
      return (
        <a
          href={href}
          aria-current={isActive ? "page" : undefined}
          className={className}
          onClick={go(p)}
        >
          {p}
        </a>
      );
    }
    return (
      <button
        type="button"
        aria-current={isActive ? "page" : undefined}
        className={className}
        onClick={go(p)}
      >
        {p}
      </button>
    );
  };

  const renderNav = (kind: Nav) => {
    const target =
      kind === "first"
        ? 1
        : kind === "previous"
          ? page - 1
          : kind === "next"
            ? page + 1
            : totalPages;
    const unavailable = kind === "first" || kind === "previous" ? isFirst : isLast;
    const Icon = {
      first: ChevronsLeft,
      previous: ChevronLeft,
      next: ChevronRight,
      last: ChevronsRight,
    }[kind];
    const label = { first: firstLabel, previous: prevLabel, next: nextLabel, last: lastLabel }[
      kind
    ];
    const iconAtStart = kind === "first" || kind === "previous";
    const icon = arrowsIconOnly || showIcons ? <Icon aria-hidden="true" /> : null;
    const text = arrowsIconOnly ? null : <span>{label}</span>;
    const content = iconAtStart ? (
      <>
        {icon}
        {text}
      </>
    ) : (
      <>
        {text}
        {icon}
      </>
    );
    const className = buttonVariants({ variant: "ghost", size: arrowSize });
    const href = !unavailable ? getHref?.(target) : undefined;
    if (href != null) {
      return (
        <a href={href} aria-label={NAV_ARIA[kind]} className={className} onClick={go(target)}>
          {content}
        </a>
      );
    }
    // aria-disabled, not disabled: at the edges the button keeps the focus (WCAG 2.4.3) and
    // is announced as unavailable; the click is ignored.
    return (
      <button
        type="button"
        aria-label={NAV_ARIA[kind]}
        aria-disabled={unavailable || undefined}
        className={className}
        onClick={unavailable ? (e) => e.preventDefault() : go(target)}
      >
        {content}
      </button>
    );
  };

  return (
    <nav aria-label={ariaLabel} className={cn(paginationNavVariants(), className)} {...navProps}>
      <ul className={paginationListVariants()}>
        {showFirstLast && totalPages > 1 && <li>{renderNav("first")}</li>}
        {showPrevNext && <li>{renderNav("previous")}</li>}

        {pageItems.map((item, i) =>
          item === "ellipsis" ? (
            // eslint-disable-next-line @eslint-react/no-array-index-key -- positional list, items have no stable id
            <li key={`ellipsis-${i}`}>
              <span className={paginationEllipsisVariants({ size })}>
                <Ellipsis aria-hidden="true" />
                <span className="sr-only">Mais páginas</span>
              </span>
            </li>
          ) : (
            <li key={item}>{renderPage(item)}</li>
          ),
        )}

        {showPrevNext && <li>{renderNav("next")}</li>}
        {showFirstLast && totalPages > 1 && <li>{renderNav("last")}</li>}
      </ul>
    </nav>
  );
}

Pagination.displayName = "Pagination";

export { Pagination };
