import { Check, ChevronRight, Circle } from "../icons";
import { cn } from "../../lib/cn";
import { ContextMenu as RadixContextMenu } from "radix-ui";
import * as React from "react";
import {
  contextMenuCheckboxItemStyles,
  contextMenuContentStyles,
  contextMenuItemDestructiveStyles,
  contextMenuItemStyles,
  contextMenuLabelStyles,
  contextMenuRadioItemStyles,
  contextMenuSeparatorStyles,
  contextMenuShortcutStyles,
  contextMenuSubContentStyles,
} from "./context-menu.styles";
import type {
  ContextMenuCheckboxItemProps,
  ContextMenuContentProps,
  ContextMenuItemData,
  ContextMenuItemProps,
  ContextMenuLabelProps,
  ContextMenuProps,
  ContextMenuRadioItemProps,
  ContextMenuRadioSection,
  ContextMenuSection,
  ContextMenuSeparatorProps,
  ContextMenuShortcutProps,
  ContextMenuSubTriggerProps,
} from "./context-menu.types";
import { toText } from "../../lib/to-text";

/**
 * ContextMenu root.
 *
 * **API simplificada (recomendada):** use `items` e envolva em `children` a área que recebe o clique direito.
 * O menu é exibido ao clicar com o botão direito nessa área.
 *
 * **API de composição:** use os subcomponentes `ContextMenuContent`,
 * `ContextMenuItem`, etc. quando precisar de layouts avançados.
 *
 * @see https://ui.shadcn.com/docs/components/context-menu
 */
const ContextMenu = ({ items, children, ...props }: ContextMenuProps) => {
  const hasItems = items && (items as ContextMenuItemData[]).length > 0;
  const useSimplifiedAPI = hasItems && children != null && children !== false;

  if (!useSimplifiedAPI) {
    return <RadixContextMenu.Root {...props}>{children}</RadixContextMenu.Root>;
  }

  return (
    <RadixContextMenu.Root {...props}>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent>{renderItemsOrSections(items)}</ContextMenuContent>
    </RadixContextMenu.Root>
  );
};

const ContextMenuContent = ({
  className,
  ref,
  ...props
}: ContextMenuContentProps & {
  ref?: React.Ref<React.ComponentRef<typeof RadixContextMenu.Content>>;
}) => (
  <RadixContextMenu.Portal>
    <RadixContextMenu.Content
      ref={ref}
      className={cn(contextMenuContentStyles, className)}
      {...props}
    />
  </RadixContextMenu.Portal>
);
ContextMenuContent.displayName = RadixContextMenu.Content.displayName ?? "ContextMenuContent";

const ContextMenuItem = ({
  className,
  inset,
  ref,
  ...props
}: ContextMenuItemProps & {
  ref?: React.Ref<React.ComponentRef<typeof RadixContextMenu.Item>>;
}) => (
  <RadixContextMenu.Item
    ref={ref}
    className={cn(contextMenuItemStyles, inset && "pl-8", className)}
    {...props}
  />
);
ContextMenuItem.displayName = RadixContextMenu.Item.displayName ?? "ContextMenuItem";

const ContextMenuCheckboxItem = ({
  className,
  children,
  checked,
  ref,
  ...props
}: ContextMenuCheckboxItemProps & {
  ref?: React.Ref<React.ComponentRef<typeof RadixContextMenu.CheckboxItem>>;
}) => (
  <RadixContextMenu.CheckboxItem
    ref={ref}
    className={cn(contextMenuCheckboxItemStyles, className)}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <RadixContextMenu.ItemIndicator>
        <Check className="h-4 w-4" aria-hidden="true" />
      </RadixContextMenu.ItemIndicator>
    </span>
    {children}
  </RadixContextMenu.CheckboxItem>
);
ContextMenuCheckboxItem.displayName =
  RadixContextMenu.CheckboxItem.displayName ?? "ContextMenuCheckboxItem";

const ContextMenuRadioItem = ({
  className,
  children,
  ref,
  ...props
}: ContextMenuRadioItemProps & {
  ref?: React.Ref<React.ComponentRef<typeof RadixContextMenu.RadioItem>>;
}) => (
  <RadixContextMenu.RadioItem
    ref={ref}
    className={cn(contextMenuRadioItemStyles, className)}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <RadixContextMenu.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" aria-hidden="true" />
      </RadixContextMenu.ItemIndicator>
    </span>
    {children}
  </RadixContextMenu.RadioItem>
);
ContextMenuRadioItem.displayName = RadixContextMenu.RadioItem.displayName ?? "ContextMenuRadioItem";

const ContextMenuLabel = ({
  className,
  inset,
  ref,
  ...props
}: ContextMenuLabelProps & {
  ref?: React.Ref<React.ComponentRef<typeof RadixContextMenu.Label>>;
}) => (
  <RadixContextMenu.Label
    ref={ref}
    className={cn(contextMenuLabelStyles, inset && "pl-8", className)}
    {...props}
  />
);
ContextMenuLabel.displayName = RadixContextMenu.Label.displayName ?? "ContextMenuLabel";

const ContextMenuSeparator = ({
  className,
  ref,
  ...props
}: ContextMenuSeparatorProps & {
  ref?: React.Ref<React.ComponentRef<typeof RadixContextMenu.Separator>>;
}) => (
  <RadixContextMenu.Separator
    ref={ref}
    className={cn(contextMenuSeparatorStyles, className)}
    {...props}
  />
);
ContextMenuSeparator.displayName = RadixContextMenu.Separator.displayName ?? "ContextMenuSeparator";

const ContextMenuShortcut = ({ className, ...props }: ContextMenuShortcutProps) => (
  <span className={cn(contextMenuShortcutStyles, className)} {...props} />
);
ContextMenuShortcut.displayName = "ContextMenuShortcut";

const ContextMenuSub = RadixContextMenu.Sub;
const ContextMenuSubTrigger = ({
  className,
  inset,
  children,
  ref,
  ...props
}: ContextMenuSubTriggerProps & {
  ref?: React.Ref<React.ComponentRef<typeof RadixContextMenu.SubTrigger>>;
}) => (
  <RadixContextMenu.SubTrigger
    ref={ref}
    className={cn(contextMenuItemStyles, inset && "pl-8", className)}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" aria-hidden="true" />
  </RadixContextMenu.SubTrigger>
);
ContextMenuSubTrigger.displayName =
  RadixContextMenu.SubTrigger.displayName ?? "ContextMenuSubTrigger";

const ContextMenuSubContent = ({
  className,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof RadixContextMenu.SubContent> & {
  ref?: React.Ref<React.ComponentRef<typeof RadixContextMenu.SubContent>>;
}) => (
  <RadixContextMenu.SubContent
    ref={ref}
    className={cn(contextMenuSubContentStyles, className)}
    {...props}
  />
);
ContextMenuSubContent.displayName =
  RadixContextMenu.SubContent.displayName ?? "ContextMenuSubContent";

const ContextMenuGroup = RadixContextMenu.Group;
const ContextMenuPortal = RadixContextMenu.Portal;
const ContextMenuRadioGroup = RadixContextMenu.RadioGroup;
const ContextMenuTrigger = RadixContextMenu.Trigger;

function isRadioSection(
  x: ContextMenuSection | ContextMenuRadioSection,
): x is ContextMenuRadioSection {
  return "type" in x && x.type === "radio";
}

function isItemsSection(x: ContextMenuSection | ContextMenuRadioSection): x is ContextMenuSection {
  return "items" in x && Array.isArray(x.items);
}

function renderItem(item: ContextMenuItemData, key: string): React.ReactNode {
  const raw = item.subItems;
  const hasSubItems =
    Array.isArray(raw) &&
    raw.length > 0 &&
    (!("items" in raw[0]) || (raw as ContextMenuSection[]).some((s) => (s.items?.length ?? 0) > 0));

  const itemContent = (
    <>
      {item.icon}
      <div className="flex flex-1 flex-col text-left">
        <span>{item.label}</span>
        {item.description ? (
          <span className="text-xs text-muted-foreground">{item.description}</span>
        ) : null}
      </div>
      {item.shortcut ? <ContextMenuShortcut>{item.shortcut}</ContextMenuShortcut> : null}
    </>
  );

  const itemClassName = cn(item.variant === "destructive" && contextMenuItemDestructiveStyles);

  if (hasSubItems) {
    return (
      <ContextMenuSub key={key}>
        <ContextMenuSubTrigger className={itemClassName}>
          {item.icon}
          <div className="flex flex-1 flex-col text-left">
            <span>{item.label}</span>
          </div>
        </ContextMenuSubTrigger>
        <ContextMenuSubContent>{renderItemsOrSections(item.subItems)}</ContextMenuSubContent>
      </ContextMenuSub>
    );
  }

  return (
    <ContextMenuItem
      key={key}
      className={itemClassName}
      disabled={item.disabled}
      onSelect={item.onSelect}
    >
      {itemContent}
    </ContextMenuItem>
  );
}

function renderItemsOrSections(data: ContextMenuProps["items"]): React.ReactNode {
  if (!data || (Array.isArray(data) && data.length === 0)) return null;

  const arr = data as (ContextMenuSection | ContextMenuRadioSection | ContextMenuItemData)[];
  const isSections =
    arr.length > 0 &&
    (isRadioSection(arr[0] as ContextMenuRadioSection) ||
      isItemsSection(arr[0] as ContextMenuSection));

  if (isSections) {
    return (
      <>
        {(arr as (ContextMenuSection | ContextMenuRadioSection)[]).map((section, sectionIndex) => (
          // eslint-disable-next-line @eslint-react/no-array-index-key -- positional list, items have no stable id
          <React.Fragment key={sectionIndex}>
            {isRadioSection(section) ? (
              <ContextMenuGroup>
                {section.label ? <ContextMenuLabel>{section.label}</ContextMenuLabel> : null}
                <ContextMenuRadioGroup value={section.value} onValueChange={section.onValueChange}>
                  {section.options.map((opt) => (
                    <ContextMenuRadioItem
                      key={opt.value}
                      value={opt.value}
                      onSelect={() => section.onValueChange(opt.value)}
                    >
                      {opt.label}
                    </ContextMenuRadioItem>
                  ))}
                </ContextMenuRadioGroup>
              </ContextMenuGroup>
            ) : (
              <ContextMenuGroup>
                {section.label ? <ContextMenuLabel>{section.label}</ContextMenuLabel> : null}
                {section.items.map((item, itemIndex) =>
                  renderItem(item, `s${sectionIndex}-${itemIndex}-${toText(item.label)}`),
                )}
              </ContextMenuGroup>
            )}
            {sectionIndex < arr.length - 1 ? <ContextMenuSeparator /> : null}
          </React.Fragment>
        ))}
      </>
    );
  }

  return (arr as ContextMenuItemData[]).map((item, index) =>
    renderItem(item, `${index}-${toText(item.label)}`),
  );
}

export {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuPortal,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
};
export type { ContextMenuItemData };
