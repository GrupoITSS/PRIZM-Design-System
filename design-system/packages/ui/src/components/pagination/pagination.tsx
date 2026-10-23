import { cn } from "../../lib/cn";
import { ChevronLeft, ChevronRight, Ellipsis } from "../icons";
import * as React from "react";
import {
  paginationEllipsisVariants,
  paginationLinkVariants,
  paginationListVariants,
  paginationNavVariants,
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

/**
 * Pagination do design system PRIZM. API 100% baseada em props: informa página atual, total de páginas e callbacks/links.
 * Suporta modo simples (apenas números), com prev/next, primeiro/último e modo só ícones (útil para tabelas).
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
  siblingCount = 1,
  prevLabel = "Previous",
  nextLabel = "Next",
  firstLabel = "First",
  lastLabel = "Last",
  size = "default",
  className,
  "aria-label": ariaLabel = "pagination",
  ...navProps
}: PaginationProps) {
  const pageItems = iconsOnly ? [] : getPageItems(totalPages, page, siblingCount);
  const isFirst = page <= 1;
  const isLast = page >= totalPages;
  const ellipsisSize = size === "sm" || size === "icon-sm" ? "sm" : "default";

  const handleClick = (nextPage: number) => (e: React.MouseEvent) => {
    if (getHref) return; // navigation via href
    e.preventDefault();
    onPageChange?.(nextPage);
  };

  const linkContent = (
    label: React.ReactNode,
    icon: React.ReactNode,
    iconPosition: "start" | "end",
  ) => (
    <>
      {iconPosition === "start" && icon}
      {label}
      {iconPosition === "end" && icon}
    </>
  );

  const renderLink = (p: number, content: React.ReactNode, isActive: boolean) => {
    const href = getHref?.(p);
    const common = {
      "aria-current": isActive ? ("page" as const) : undefined,
      className: cn(
        paginationLinkVariants({
          variant: isActive ? "default" : "ghost",
          size: size === "icon" || size === "icon-sm" ? "icon" : size,
        }),
      ),
    };
    if (href != null) {
      return (
        <a
          href={href}
          onClick={
            onPageChange
              ? (e) => {
                  handleClick(p)(e);
                }
              : undefined
          }
          {...common}
        >
          {content}
        </a>
      );
    }
    return (
      <button type="button" onClick={handleClick(p)} disabled={isActive} {...common}>
        {content}
      </button>
    );
  };

  const navClassName = cn(paginationNavVariants(), className);
  const listClassName = paginationListVariants();

  return (
    <nav role="navigation" aria-label={ariaLabel} className={navClassName} {...navProps}>
      <ul className={listClassName}>
        {showFirstLast && totalPages > 1 && (
          <li>{renderLink(1, linkContent(firstLabel, null, "end"), page === 1)}</li>
        )}
        {showPrevNext && (
          <li>
            {getHref && !isFirst ? (
              <a
                href={getHref(page - 1)}
                aria-label="Go to previous page"
                className={cn(
                  paginationLinkVariants({
                    variant: "ghost",
                    size: size === "icon" || size === "icon-sm" ? "default" : size,
                  }),
                  "gap-1 pl-2.5",
                )}
                onClick={
                  onPageChange
                    ? (e) => {
                        e.preventDefault();
                        onPageChange(page - 1);
                      }
                    : undefined
                }
              >
                <ChevronLeft className="h-4 w-4" />
                {!iconsOnly && <span>{prevLabel}</span>}
              </a>
            ) : (
              <button
                type="button"
                aria-label="Go to previous page"
                disabled={isFirst}
                className={cn(
                  paginationLinkVariants({
                    variant: "ghost",
                    size: size === "icon" || size === "icon-sm" ? "default" : size,
                  }),
                  "gap-1 pl-2.5",
                )}
                onClick={handleClick(page - 1)}
              >
                <ChevronLeft className="h-4 w-4" />
                {!iconsOnly && <span>{prevLabel}</span>}
              </button>
            )}
          </li>
        )}

        {pageItems.map((item, i) =>
          item === "ellipsis" ? (
            // eslint-disable-next-line @eslint-react/no-array-index-key -- positional list, items have no stable id
            <li key={`ellipsis-${i}`}>
              <span aria-hidden className={cn(paginationEllipsisVariants({ size: ellipsisSize }))}>
                <Ellipsis className="h-4 w-4" />
                <span className="sr-only">More pages</span>
              </span>
            </li>
          ) : (
            <li key={item}>{renderLink(item, item, page === item)}</li>
          ),
        )}

        {showPrevNext && (
          <li>
            {getHref && !isLast ? (
              <a
                href={getHref(page + 1)}
                aria-label="Go to next page"
                className={cn(
                  paginationLinkVariants({
                    variant: "ghost",
                    size: size === "icon" || size === "icon-sm" ? "default" : size,
                  }),
                  "gap-1 pr-2.5",
                )}
                onClick={
                  onPageChange
                    ? (e) => {
                        e.preventDefault();
                        onPageChange(page + 1);
                      }
                    : undefined
                }
              >
                {!iconsOnly && <span>{nextLabel}</span>}
                <ChevronRight className="h-4 w-4" />
              </a>
            ) : (
              <button
                type="button"
                aria-label="Go to next page"
                disabled={isLast}
                className={cn(
                  paginationLinkVariants({
                    variant: "ghost",
                    size: size === "icon" || size === "icon-sm" ? "default" : size,
                  }),
                  "gap-1 pr-2.5",
                )}
                onClick={handleClick(page + 1)}
              >
                {!iconsOnly && <span>{nextLabel}</span>}
                <ChevronRight className="h-4 w-4" />
              </button>
            )}
          </li>
        )}

        {showFirstLast && totalPages > 1 && (
          <li>
            {renderLink(totalPages, linkContent(lastLabel, null, "end"), page === totalPages)}
          </li>
        )}
      </ul>
    </nav>
  );
}

Pagination.displayName = "Pagination";

export { Pagination };
