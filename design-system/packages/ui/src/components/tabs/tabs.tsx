import { cn } from "../../lib/cn";
import { Tooltip } from "../tooltip";
import { Tabs as RadixTabs } from "radix-ui";
import * as React from "react";
import {
  tabsContentVariants,
  tabsListVariants,
  tabsRootVariants,
  tabsTriggerVariants,
} from "./tabs.styles";
import type { TabsProps } from "./tabs.types";

/**
 * Tabs do design system PRIZM.
 *
 * Variante padrão **`underline`** — visual do Cockpit (PAS):
 * underline na cor `primary`, `font-normal`, sem pill cinza.
 *
 * Use `variant="pills"` para o estilo clássico shadcn.
 *
 * ```tsx
 * <Tabs
 *   items={[
 *     { value: "accounts", label: "Contas", content: <Accounts /> },
 *     { value: "solutions", label: "Soluções", content: <Solutions /> },
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
  orientation = "horizontal",
  activationMode = "automatic",
  children,
  onValueChange,
  listClassName,
  ref,
  ...props
}: TabsProps & { ref?: React.Ref<React.ElementRef<typeof RadixTabs.Root>> }) => {
  const hasItems = Array.isArray(items) && items.length > 0;
  const computedDefaultValue = defaultValue ?? (hasItems ? items[0]?.value : undefined);
  const resolvedVariant = variant ?? "underline";

  return (
    <RadixTabs.Root
      ref={ref}
      data-slot="tabs"
      data-variant={resolvedVariant}
      data-size={size}
      className={cn(tabsRootVariants({ variant: resolvedVariant, size }), className)}
      value={value}
      defaultValue={computedDefaultValue}
      orientation={orientation}
      activationMode={activationMode}
      onValueChange={onValueChange}
      {...props}
    >
      {hasItems ? (
        <>
          <div
            className={cn(
              "relative shrink-0 overflow-visible",
              resolvedVariant === "underline" && "border-b border-border",
              listClassName,
            )}
          >
            <RadixTabs.List
              data-slot="tabs-list"
              className={cn(
                tabsListVariants({ variant: resolvedVariant }),
                fullWidth && "grid w-full grid-cols-[repeat(auto-fit,minmax(0,1fr))]",
              )}
            >
              {items.map((item) => {
                const trigger = (
                  <RadixTabs.Trigger
                    key={item.tooltip ? undefined : item.value}
                    value={item.value}
                    disabled={item.disabled}
                    data-slot="tabs-trigger"
                    className={tabsTriggerVariants({
                      variant: resolvedVariant,
                    })}
                  >
                    {item.icon ? (
                      <span className="mr-2 inline-flex shrink-0">{item.icon}</span>
                    ) : null}
                    {item.label}
                  </RadixTabs.Trigger>
                );
                if (!item.tooltip) return trigger;
                return (
                  <Tooltip key={item.value} content={item.tooltip}>
                    <span className="inline-flex">{trigger}</span>
                  </Tooltip>
                );
              })}
            </RadixTabs.List>
          </div>

          {items.map((item) => (
            <RadixTabs.Content
              key={item.value}
              value={item.value}
              data-slot="tabs-content"
              className={tabsContentVariants({ variant: resolvedVariant })}
            >
              {item.content}
            </RadixTabs.Content>
          ))}
        </>
      ) : (
        children
      )}
    </RadixTabs.Root>
  );
};

Tabs.displayName = RadixTabs.Root.displayName ?? "Tabs";

export { Tabs };
