import { cn } from "../../lib/cn";
import { Badge } from "../badge";
import { Tooltip } from "../tooltip";
import { Tabs as RadixTabs } from "radix-ui";
import * as React from "react";
import {
  tabsContentVariants,
  tabsListVariants,
  tabsRootVariants,
  tabsTriggerVariants,
} from "./tabs.styles";
import type {
  TabsContentProps,
  TabsListProps,
  TabsProps,
  TabsTriggerProps,
  TabsVariant,
} from "./tabs.types";

const TabsVariantContext = React.createContext<TabsVariant>("underline");

/**
 * Tabs do design system PRIZM.
 *
 * Variante padrão **`underline`** — visual do Cockpit (PAS):
 * indicador na cor `primary`, `font-normal`, sem fundo.
 *
 * Use `variant="pills"` para a troca compacta (formato do shadcn).
 *
 * Duas formas de uso: a API simples, por `items`, e a composição com
 * `TabsList`, `TabsTrigger` e `TabsContent`, como no shadcn.
 *
 * ```tsx
 * <Tabs
 *   items={[
 *     { value: "accounts", label: "Contas", content: <Accounts /> },
 *     { value: "solutions", label: "Soluções", content: <Solutions />, badge: 3 },
 *   ]}
 * />
 * ```
 *
 * @see [Tabs — shadcn/ui (Radix)](https://ui.shadcn.com/docs/components/tabs)
 */
const Tabs = ({
  className,
  items,
  value,
  defaultValue,
  fullWidth = false,
  variant = "underline",
  size = "md",
  activationMode = "automatic",
  children,
  onValueChange,
  listClassName,
  ref,
  ...props
}: TabsProps & { ref?: React.Ref<React.ElementRef<typeof RadixTabs.Root>> }) => {
  const hasItems = Array.isArray(items) && items.length > 0;
  const computedDefaultValue = defaultValue ?? (hasItems ? items[0]?.value : undefined);
  const resolvedVariant: TabsVariant = variant ?? "underline";

  return (
    <TabsVariantContext value={resolvedVariant}>
      <RadixTabs.Root
        ref={ref}
        data-slot="tabs"
        data-variant={resolvedVariant}
        data-size={size}
        className={cn(tabsRootVariants({ variant: resolvedVariant, size }), className)}
        value={value}
        defaultValue={computedDefaultValue}
        activationMode={activationMode}
        onValueChange={onValueChange}
        {...props}
      >
        {hasItems ? (
          <>
            <TabsList fullWidth={fullWidth} containerClassName={listClassName}>
              {items.map((item) => {
                const trigger = (
                  <TabsTrigger
                    key={item.tooltip ? undefined : item.value}
                    value={item.value}
                    disabled={item.disabled}
                    icon={item.icon}
                    badge={item.badge}
                  >
                    {item.label}
                  </TabsTrigger>
                );
                if (!item.tooltip) return trigger;
                return (
                  <Tooltip key={item.value} content={item.tooltip}>
                    <span className="inline-flex">{trigger}</span>
                  </Tooltip>
                );
              })}
            </TabsList>

            {items.map((item) => (
              <TabsContent key={item.value} value={item.value}>
                {item.content}
              </TabsContent>
            ))}
          </>
        ) : (
          children
        )}
      </RadixTabs.Root>
    </TabsVariantContext>
  );
};

Tabs.displayName = "Tabs";

/**
 * Lista de abas. No `underline`, fica dentro de um contêiner com a borda inferior; use
 * `containerClassName` para ajustar esse contêiner (ex.: `-mx-8 px-8`, divisor de ponta a ponta).
 */
const TabsList = ({
  className,
  containerClassName,
  fullWidth = false,
  ref,
  ...props
}: TabsListProps & { ref?: React.Ref<React.ElementRef<typeof RadixTabs.List>> }) => {
  const variant = React.use(TabsVariantContext);
  return (
    <div
      data-slot="tabs-list-container"
      className={cn(
        "relative shrink-0 overflow-visible",
        variant === "underline" && "border-b border-border",
        containerClassName,
      )}
    >
      <RadixTabs.List
        ref={ref}
        data-slot="tabs-list"
        className={cn(
          tabsListVariants({ variant }),
          fullWidth && "grid w-full grid-cols-[repeat(auto-fit,minmax(0,1fr))]",
          className,
        )}
        {...props}
      />
    </div>
  );
};

TabsList.displayName = "TabsList";

/** Aba. `icon` vem antes do rótulo; `badge` (número ou texto vira Badge `shape="number"`) vem depois. */
const TabsTrigger = ({
  className,
  icon,
  badge,
  children,
  ref,
  ...props
}: TabsTriggerProps & { ref?: React.Ref<React.ElementRef<typeof RadixTabs.Trigger>> }) => {
  const variant = React.use(TabsVariantContext);
  const hasBadge = badge !== undefined && badge !== null && badge !== false;
  return (
    <RadixTabs.Trigger
      ref={ref}
      data-slot="tabs-trigger"
      className={cn(tabsTriggerVariants({ variant }), className)}
      {...props}
    >
      {icon ? <span className="mr-2 inline-flex shrink-0">{icon}</span> : null}
      {children}
      {/* Espaço de texto: o nome da aba fica "Pendentes 3", não "Pendentes3". */}
      {hasBadge ? " " : null}
      {hasBadge ? (
        <span data-slot="tabs-trigger-badge" className="ml-1 inline-flex shrink-0">
          {typeof badge === "number" || typeof badge === "string" ? (
            <Badge variant="default" shape="number">
              {badge}
            </Badge>
          ) : (
            badge
          )}
        </span>
      ) : null}
    </RadixTabs.Trigger>
  );
};

TabsTrigger.displayName = "TabsTrigger";

/** Painel de uma aba (`role="tabpanel"`), ligado a ela pelo `value`. */
const TabsContent = ({
  className,
  ref,
  ...props
}: TabsContentProps & { ref?: React.Ref<React.ElementRef<typeof RadixTabs.Content>> }) => {
  const variant = React.use(TabsVariantContext);
  return (
    <RadixTabs.Content
      ref={ref}
      data-slot="tabs-content"
      className={cn(tabsContentVariants({ variant }), className)}
      {...props}
    />
  );
};

TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };
