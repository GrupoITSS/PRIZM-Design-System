import { ChevronRight, Ellipsis } from "../icons";
import { cn } from "../../lib/cn";
import { Slot } from "radix-ui";
import * as React from "react";
import {
  breadcrumbEllipsisStyles,
  breadcrumbItemStyles,
  breadcrumbLinkStyles,
  breadcrumbListStyles,
  breadcrumbPageStyles,
  breadcrumbSeparatorStyles,
  breadcrumbTextStyles,
} from "./breadcrumb.styles";
import type {
  BreadcrumbEllipsisProps,
  BreadcrumbItemData,
  BreadcrumbItemProps,
  BreadcrumbLinkProps,
  BreadcrumbListProps,
  BreadcrumbPageProps,
  BreadcrumbProps,
  BreadcrumbSeparatorProps,
} from "./breadcrumb.types";
import { toText } from "../../lib/to-text";

/** Nome padrão da navegação (decisão BC5, 18/11/2026). */
const NAV_LABEL = "Trilha de navegação";

/**
 * Breadcrumb root.
 *
 * **API simplificada (recomendada):** use a prop `items` para montar o breadcrumb
 * sem precisar conhecer os subcomponentes.
 *
 * **API de composição:** use BreadcrumbList, BreadcrumbItem, BreadcrumbLink, etc.
 *
 * @see https://ui.shadcn.com/docs/components/breadcrumb
 */
const Breadcrumb = ({
  items,
  separator,
  children,
  className,
  ref,
  ...props
}: BreadcrumbProps & { ref?: React.Ref<HTMLElement> }) => {
  const hasItems = Array.isArray(items) && items.length > 0;

  if (!hasItems) {
    return (
      <nav
        ref={ref}
        aria-label={NAV_LABEL}
        data-slot="breadcrumb"
        className={className}
        {...props}
      >
        {children}
      </nav>
    );
  }

  const resolvedItems = items;
  // Só um item é a página atual: o primeiro com isCurrent ou, sem nenhum, o último.
  // Antes, um item marcado e o último ganhavam aria-current juntos.
  const explicitCurrent = resolvedItems.findIndex((item) => item.isCurrent);
  const currentIndex = explicitCurrent === -1 ? resolvedItems.length - 1 : explicitCurrent;

  return (
    <nav ref={ref} aria-label={NAV_LABEL} data-slot="breadcrumb" className={className} {...props}>
      <BreadcrumbList>
        {resolvedItems.map((item, index) => {
          const isLast = index === resolvedItems.length - 1;
          const isCurrent = index === currentIndex;
          const separatorNode = !isLast ? (
            <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>
          ) : null;

          let content: React.ReactNode;
          if (isCurrent) {
            content = (
              <BreadcrumbPage>
                {item.icon}
                {item.label}
              </BreadcrumbPage>
            );
          } else if (item.href) {
            content = (
              <BreadcrumbLink href={item.href}>
                {item.icon}
                {item.label}
              </BreadcrumbLink>
            );
          } else {
            // Item do meio sem link: texto simples, para não anunciar duas páginas atuais.
            content = (
              <span data-slot="breadcrumb-text" className={breadcrumbTextStyles}>
                {item.icon}
                {item.label}
              </span>
            );
          }

          return (
            // eslint-disable-next-line @eslint-react/no-array-index-key -- positional list, items have no stable id
            <React.Fragment key={`${index}-${item.href ?? toText(item.label)}`}>
              <BreadcrumbItem>{content}</BreadcrumbItem>
              {separatorNode}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </nav>
  );
};
Breadcrumb.displayName = "Breadcrumb";

const BreadcrumbList = ({
  className,
  ref,
  ...props
}: BreadcrumbListProps & { ref?: React.Ref<HTMLOListElement> }) => (
  <ol
    ref={ref}
    data-slot="breadcrumb-list"
    className={cn(breadcrumbListStyles, className)}
    {...props}
  />
);
BreadcrumbList.displayName = "BreadcrumbList";

const BreadcrumbItem = ({
  className,
  ref,
  ...props
}: BreadcrumbItemProps & { ref?: React.Ref<HTMLLIElement> }) => (
  <li
    ref={ref}
    data-slot="breadcrumb-item"
    className={cn(breadcrumbItemStyles, className)}
    {...props}
  />
);
BreadcrumbItem.displayName = "BreadcrumbItem";

const BreadcrumbLink = ({
  asChild,
  className,
  ref,
  ...props
}: BreadcrumbLinkProps & { ref?: React.Ref<HTMLAnchorElement> }) => {
  const Comp = (asChild ? Slot : "a") as React.ElementType;

  return (
    <Comp
      ref={ref}
      data-slot="breadcrumb-link"
      className={cn(breadcrumbLinkStyles, className)}
      {...props}
    />
  );
};
BreadcrumbLink.displayName = "BreadcrumbLink";

const BreadcrumbPage = ({
  className,
  ref,
  ...props
}: BreadcrumbPageProps & { ref?: React.Ref<HTMLSpanElement> }) => (
  // Só aria-current: role="link" com aria-disabled fazia o leitor de tela
  // anunciar "link, indisponível" (pendência 2 de acessibilidade, 18/11/2026).
  <span
    ref={ref}
    aria-current="page"
    data-slot="breadcrumb-page"
    className={cn(breadcrumbPageStyles, className)}
    {...props}
  />
);
BreadcrumbPage.displayName = "BreadcrumbPage";

const BreadcrumbSeparator = ({ children, className, ...props }: BreadcrumbSeparatorProps) => (
  <li
    role="presentation"
    aria-hidden="true"
    data-slot="breadcrumb-separator"
    className={cn(breadcrumbSeparatorStyles, className)}
    {...props}
  >
    {children ?? <ChevronRight />}
  </li>
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

/**
 * Reticências de um caminho recolhido (decisão BC2, 18/11/2026).
 *
 * É um botão com nome, para abrir as páginas escondidas num DropdownMenu:
 *
 * @example
 * <DropdownMenu>
 *   <DropdownMenuTrigger asChild>
 *     <BreadcrumbEllipsis />
 *   </DropdownMenuTrigger>
 *   <DropdownMenuContent align="start">…</DropdownMenuContent>
 * </DropdownMenu>
 */
const BreadcrumbEllipsis = ({
  className,
  type = "button",
  "aria-label": ariaLabel = "Mais páginas",
  ref,
  ...props
}: BreadcrumbEllipsisProps & { ref?: React.Ref<HTMLButtonElement> }) => (
  <button
    ref={ref}
    type={type}
    aria-label={ariaLabel}
    data-slot="breadcrumb-ellipsis"
    className={cn(breadcrumbEllipsisStyles, className)}
    {...props}
  >
    <Ellipsis aria-hidden="true" />
  </button>
);
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";

export {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
};
export type { BreadcrumbItemData };
