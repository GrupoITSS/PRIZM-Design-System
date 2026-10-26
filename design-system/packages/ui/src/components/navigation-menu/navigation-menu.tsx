import { cn } from "../../lib/cn";
import { Check, ChevronDown } from "../icons";
import { NavigationMenu as RadixNavigationMenu } from "radix-ui";
import * as React from "react";

import {
  navigationMenuContentInlineStyles,
  navigationMenuContentStyles,
  navigationMenuIndicatorInnerStyles,
  navigationMenuIndicatorStyles,
  navigationMenuListItemStyles,
  navigationMenuListStyles,
  navigationMenuRootStyles,
  navigationMenuTriggerVariants,
  navigationMenuViewportStyles,
  navigationMenuViewportWrapperStyles,
} from "./navigation-menu.styles";
import type {
  NavigationMenuItem,
  NavigationMenuPanelItem,
  NavigationMenuPanelLinkItem,
  NavigationMenuProps,
} from "./navigation-menu.types";

/**
 * NavigationMenu do design system PRIZM.
 *
 * Baseado no Radix NavigationMenu, com **API principal por props**:
 *
 * - `items`: lista de itens (links simples ou painéis com múltiplos links)
 * - Demais props do Radix NavigationMenu (`orientation`, `delayDuration`, etc.)
 *
 * Exemplo recomendado (sem subcomponentes):
 *
 * ```tsx
 * <NavigationMenu
 *   items={[
 *     { label: "Home", href: "/" },
 *     {
 *       type: "panel",
 *       label: "Products",
 *       items: [
 *         {
 *           label: "Analytics",
 *           description: "Dashboards & insights",
 *           href: "/analytics",
 *         },
 *         { label: "Automation", href: "/automation" },
 *       ],
 *     },
 *   ]}
 * />
 * ```
 *
 * Para cenários de composição extremamente avançados, use diretamente os
 * primitivos do Radix importando de `"radix-ui"`.
 */
const NavigationMenu = function NavigationMenu({
  items,
  className,
  listClassName,
  viewport = true,
  ref,
  ...rootProps
}: NavigationMenuProps & { ref?: React.Ref<React.ComponentRef<typeof RadixNavigationMenu.Root>> }) {
  return (
    <RadixNavigationMenu.Root
      ref={ref}
      data-slot="navigation-menu"
      data-viewport={viewport ? "true" : "false"}
      className={cn(navigationMenuRootStyles, className)}
      {...rootProps}
    >
      <RadixNavigationMenu.List
        data-slot="navigation-menu-list"
        className={cn(navigationMenuListStyles, listClassName)}
      >
        {items.map((item, index) => {
          const key = item.id ?? index;

          if (item.type === "panel") {
            return <NavigationMenuPanelInstance key={key} item={item} viewport={viewport} />;
          }

          return <NavigationMenuLinkInstance key={key} item={item} />;
        })}
      </RadixNavigationMenu.List>

      {viewport ? (
        <>
          <NavigationMenuIndicator />
          <NavigationMenuViewport />
        </>
      ) : null}
    </RadixNavigationMenu.Root>
  );
};

NavigationMenu.displayName = RadixNavigationMenu.Root.displayName ?? "NavigationMenu";

function NavigationMenuLinkInstance({
  item,
}: {
  item: Extract<NavigationMenuItem, { type?: "link" }> & Partial<NavigationMenuItem>;
}) {
  const { label, href, icon, badge, className, ...rest } = item as {
    label: React.ReactNode;
    href?: string;
    icon?: React.ReactNode;
    badge?: React.ReactNode;
    className?: string;
  };

  const content = (
    <>
      {icon}
      <span>{label}</span>
      {Boolean(badge) && <span className="ml-2">{badge}</span>}
    </>
  );

  return (
    <RadixNavigationMenu.Item data-slot="navigation-menu-item-link">
      {href ? (
        <RadixNavigationMenu.Link
          href={href}
          className={navigationMenuTriggerVariants({ className })}
          {...rest}
        >
          {content}
        </RadixNavigationMenu.Link>
      ) : (
        <RadixNavigationMenu.Trigger
          className={navigationMenuTriggerVariants({ className })}
          {...rest}
        >
          {content}
        </RadixNavigationMenu.Trigger>
      )}
    </RadixNavigationMenu.Item>
  );
}

function NavigationMenuPanelInstance({
  item,
  viewport,
}: {
  item: NavigationMenuPanelItem;
  viewport: boolean;
}) {
  const {
    label,
    icon,
    badge,
    items,
    columns = 1,
    layout = "grid",
    className,
    disabled,
    // `type` é interno da API de itens e não deve vazar para o Trigger.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    type,
    ...rest
  } = item as NavigationMenuPanelItem & { type?: "panel" };

  const hasDescription = items.some(
    (child) => Boolean(child.description) || Boolean(child.highlight),
  );
  const isList = layout === "list";

  return (
    <RadixNavigationMenu.Item
      data-slot="navigation-menu-item-panel"
      className={cn(!viewport && "relative")}
    >
      <RadixNavigationMenu.Trigger
        className={navigationMenuTriggerVariants({ className })}
        disabled={disabled}
        {...rest}
      >
        {icon}
        <span className="max-w-[16rem] truncate">{label}</span>
        {Boolean(badge) && <span className="ml-2">{badge}</span>}
        <ChevronDown
          className="relative top-px ml-1 h-3 w-3 shrink-0 transition duration-200 group-data-[state=open]:rotate-180"
          aria-hidden="true"
        />
      </RadixNavigationMenu.Trigger>

      <RadixNavigationMenu.Content
        data-slot="navigation-menu-content"
        className={viewport ? navigationMenuContentStyles : navigationMenuContentInlineStyles}
      >
        <div
          className={cn(
            isList
              ? "flex max-h-80 min-w-[12rem] flex-col gap-1.5 overflow-y-auto p-1.5"
              : cn(
                  "grid gap-3 p-4 md:w-[400px] lg:w-[500px]",
                  hasDescription && "md:grid-cols-2",
                  columns === 2 && "md:grid-cols-2",
                  columns === 3 && "md:grid-cols-3",
                  columns === 4 && "md:grid-cols-4",
                ),
          )}
        >
          {items.map((child, index) => (
            <NavigationMenuPanelLinkInstance
              // eslint-disable-next-line @eslint-react/no-array-index-key -- positional list, items have no stable id
              key={child.id ?? index}
              item={child}
              layout={layout}
            />
          ))}
        </div>
      </RadixNavigationMenu.Content>
    </RadixNavigationMenu.Item>
  );
}

function NavigationMenuPanelLinkInstance({
  item,
  layout = "grid",
}: {
  item: NavigationMenuPanelLinkItem;
  layout?: "grid" | "list";
}) {
  const {
    label,
    description,
    href,
    icon,
    badge,
    highlight,
    className,
    children,
    selected,
    onSelect,
    disabled,
  } = item;

  if (layout === "list") {
    const content = (
      <>
        <span className="flex min-w-0 items-center gap-2">
          {icon}
          <span className="truncate">{label}</span>
        </span>
        {selected ? (
          <Check className="absolute right-2 size-4 opacity-80" aria-hidden="true" />
        ) : null}
      </>
    );

    const itemClassName = cn(navigationMenuListItemStyles, selected && "bg-accent [&_.text-muted-foreground]:text-accent-foreground", className);

    if (onSelect || !href) {
      return (
        <RadixNavigationMenu.Link asChild>
          <button
            type="button"
            disabled={disabled}
            className={itemClassName}
            onClick={() => onSelect?.()}
          >
            {content}
          </button>
        </RadixNavigationMenu.Link>
      );
    }

    return (
      <RadixNavigationMenu.Link href={href} className={itemClassName}>
        {content}
      </RadixNavigationMenu.Link>
    );
  }

  const baseCardStyles =
    "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent focus:bg-accent hover:[&_.text-muted-foreground]:text-accent-foreground focus:[&_.text-muted-foreground]:text-accent-foreground";
  const highlightStyles = "bg-accent/40 hover:bg-accent/60 focus:bg-accent/60 hover:[&_.text-muted-foreground]:text-accent-foreground focus:[&_.text-muted-foreground]:text-accent-foreground";

  if (onSelect && !href) {
    return (
      <RadixNavigationMenu.Link asChild>
        <button
          type="button"
          disabled={disabled}
          className={cn(
            baseCardStyles,
            "w-full text-left",
            highlight && highlightStyles,
            className,
          )}
          onClick={() => onSelect()}
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              {icon}
              <span className="text-sm font-normal leading-none">{label}</span>
            </div>
            {badge}
          </div>
          {Boolean(description) && (
            <p className="mt-1 line-clamp-2 text-sm leading-snug text-muted-foreground">
              {description}
            </p>
          )}
        </button>
      </RadixNavigationMenu.Link>
    );
  }

  return (
    <RadixNavigationMenu.Link asChild href={href}>
      <a className={cn(baseCardStyles, highlight && highlightStyles, className)}>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {icon}
            <span className="text-sm font-normal leading-none">{label}</span>
          </div>
          {badge}
        </div>
        {Boolean(description) && (
          <p className="mt-1 line-clamp-2 text-sm leading-snug text-muted-foreground">
            {description}
          </p>
        )}
        {children && children.length > 0 && (
          <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
            {children.map((child, index) => (
              // eslint-disable-next-line @eslint-react/no-array-index-key -- positional list, items have no stable id
              <li key={child.id ?? index}>
                {child.href ? (
                  <span className="underline underline-offset-2">{child.label}</span>
                ) : (
                  <span>{child.label}</span>
                )}
              </li>
            ))}
          </ul>
        )}
      </a>
    </RadixNavigationMenu.Link>
  );
}

function NavigationMenuViewport() {
  return (
    <div
      data-slot="navigation-menu-viewport-wrapper"
      className={navigationMenuViewportWrapperStyles}
    >
      <RadixNavigationMenu.Viewport
        data-slot="navigation-menu-viewport"
        className={navigationMenuViewportStyles}
      />
    </div>
  );
}

function NavigationMenuIndicator() {
  return (
    <RadixNavigationMenu.Indicator
      data-slot="navigation-menu-indicator"
      className={navigationMenuIndicatorStyles}
    >
      <div className={navigationMenuIndicatorInnerStyles} />
    </RadixNavigationMenu.Indicator>
  );
}

export { NavigationMenu };
