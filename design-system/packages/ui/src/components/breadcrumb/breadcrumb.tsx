import { ChevronRight, MoreHorizontal } from "../icons";
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
        aria-label="breadcrumb"
        data-slot="breadcrumb"
        className={className}
        {...props}
      >
        {children}
      </nav>
    );
  }

  const resolvedItems = items;

  return (
    <nav ref={ref} aria-label="breadcrumb" data-slot="breadcrumb" className={className} {...props}>
      <BreadcrumbList>
        {resolvedItems.map((item, index) => {
          const isLast = index === resolvedItems.length - 1;
          const isCurrent = item.isCurrent ?? isLast;
          const separatorNode = !isLast ? (
            <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>
          ) : null;

          return (
            // eslint-disable-next-line @eslint-react/no-array-index-key -- positional list, items have no stable id
            <React.Fragment key={`${index}-${item.href ?? toText(item.label)}`}>
              <BreadcrumbItem>
                {item.href && !isCurrent ? (
                  <BreadcrumbLink href={item.href}>
                    {item.icon}
                    {item.label}
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>
                    {item.icon}
                    {item.label}
                  </BreadcrumbPage>
                )}
              </BreadcrumbItem>
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
  <span
    ref={ref}
    role="link"
    aria-disabled="true"
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

const BreadcrumbEllipsis = ({ className, ...props }: BreadcrumbEllipsisProps) => (
  <span
    role="presentation"
    aria-hidden="true"
    data-slot="breadcrumb-ellipsis"
    className={cn(breadcrumbEllipsisStyles, className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More</span>
  </span>
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
