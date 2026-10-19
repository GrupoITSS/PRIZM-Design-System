import { Check, ChevronRight, Circle } from "../icons";
import { cn } from "../../lib/cn";
import { DropdownMenu as RadixDropdownMenu } from "radix-ui";
import * as React from "react";
import {
  dropdownMenuCheckboxItemStyles,
  dropdownMenuContentStyles,
  dropdownMenuItemStyles,
  dropdownMenuLabelStyles,
  dropdownMenuRadioItemStyles,
  dropdownMenuSeparatorStyles,
  dropdownMenuShortcutStyles,
  dropdownMenuSubContentStyles,
} from "./dropdown-menu.styles";
import type {
  DropdownMenuCheckboxItemProps,
  DropdownMenuContentProps,
  DropdownMenuSubContentProps,
  DropdownMenuItemData,
  DropdownMenuItemProps,
  DropdownMenuLabelProps,
  DropdownMenuProps,
  DropdownMenuRadioItemProps,
  DropdownMenuSection,
  DropdownMenuSeparatorProps,
  DropdownMenuShortcutProps,
  DropdownMenuSubTriggerProps,
} from "./dropdown-menu.types";
import { toText } from "../../lib/to-text";

/**
 * DropdownMenu root.
 *
 * **API simplificada (recomendada):** use `trigger` + `items` para montar menus
 * de ação sem precisar dos subcomponentes Radix.
 *
 * **API de composição:** use os subcomponentes `DropdownMenuContent`,
 * `DropdownMenuItem`, etc. quando precisar de layouts avançados.
 *
 * @see https://ui.shadcn.com/docs/components/dropdown-menu
 */
const DropdownMenu = ({
  trigger,
  items,
  children,
  align = "start",
  side,
  sideOffset = 4,
  ...props
}: DropdownMenuProps) => {
  const hasItems = items && (items as DropdownMenuItemData[]).length > 0;
  const useSimplifiedAPI = trigger != null;

  if (!useSimplifiedAPI) {
    // API de composição: o chamador é responsável por usar DropdownMenuTrigger / Content manualmente.
    return <RadixDropdownMenu.Root {...props}>{children}</RadixDropdownMenu.Root>;
  }

  return (
    <RadixDropdownMenu.Root {...props}>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      {hasItems ? (
        <DropdownMenuContent align={align} side={side} sideOffset={sideOffset}>
          {renderItemsOrSections(items)}
        </DropdownMenuContent>
      ) : (
        children
      )}
    </RadixDropdownMenu.Root>
  );
};

const DropdownMenuContent = ({
  className,
  sideOffset = 4,
  ref,
  ...props
}: DropdownMenuContentProps & {
  ref?: React.Ref<React.ComponentRef<typeof RadixDropdownMenu.Content>>;
}) => (
  <RadixDropdownMenu.Portal>
    <RadixDropdownMenu.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(dropdownMenuContentStyles, className)}
      {...props}
    />
  </RadixDropdownMenu.Portal>
);
DropdownMenuContent.displayName = RadixDropdownMenu.Content.displayName ?? "DropdownMenuContent";

const DropdownMenuItem = ({
  className,
  inset,
  ref,
  ...props
}: DropdownMenuItemProps & {
  ref?: React.Ref<React.ComponentRef<typeof RadixDropdownMenu.Item>>;
}) => (
  <RadixDropdownMenu.Item
    ref={ref}
    className={cn(dropdownMenuItemStyles, inset && "pl-8", className)}
    {...props}
  />
);
DropdownMenuItem.displayName = RadixDropdownMenu.Item.displayName ?? "DropdownMenuItem";

const DropdownMenuCheckboxItem = ({
  className,
  children,
  checked,
  ref,
  ...props
}: DropdownMenuCheckboxItemProps & {
  ref?: React.Ref<React.ComponentRef<typeof RadixDropdownMenu.CheckboxItem>>;
}) => (
  <RadixDropdownMenu.CheckboxItem
    ref={ref}
    className={cn(dropdownMenuCheckboxItemStyles, className)}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <RadixDropdownMenu.ItemIndicator>
        <Check className="h-4 w-4" aria-hidden="true" />
      </RadixDropdownMenu.ItemIndicator>
    </span>
    {children}
  </RadixDropdownMenu.CheckboxItem>
);
DropdownMenuCheckboxItem.displayName =
  RadixDropdownMenu.CheckboxItem.displayName ?? "DropdownMenuCheckboxItem";

const DropdownMenuRadioItem = ({
  className,
  children,
  ref,
  ...props
}: DropdownMenuRadioItemProps & {
  ref?: React.Ref<React.ComponentRef<typeof RadixDropdownMenu.RadioItem>>;
}) => (
  <RadixDropdownMenu.RadioItem
    ref={ref}
    className={cn(dropdownMenuRadioItemStyles, className)}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <RadixDropdownMenu.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" aria-hidden="true" />
      </RadixDropdownMenu.ItemIndicator>
    </span>
    {children}
  </RadixDropdownMenu.RadioItem>
);
DropdownMenuRadioItem.displayName =
  RadixDropdownMenu.RadioItem.displayName ?? "DropdownMenuRadioItem";

const DropdownMenuLabel = ({
  className,
  inset,
  ref,
  ...props
}: DropdownMenuLabelProps & {
  ref?: React.Ref<React.ComponentRef<typeof RadixDropdownMenu.Label>>;
}) => (
  <RadixDropdownMenu.Label
    ref={ref}
    className={cn(dropdownMenuLabelStyles, inset && "pl-8", className)}
    {...props}
  />
);
DropdownMenuLabel.displayName = RadixDropdownMenu.Label.displayName ?? "DropdownMenuLabel";

const DropdownMenuSeparator = ({
  className,
  ref,
  ...props
}: DropdownMenuSeparatorProps & {
  ref?: React.Ref<React.ComponentRef<typeof RadixDropdownMenu.Separator>>;
}) => (
  <RadixDropdownMenu.Separator
    ref={ref}
    className={cn(dropdownMenuSeparatorStyles, className)}
    {...props}
  />
);
DropdownMenuSeparator.displayName =
  RadixDropdownMenu.Separator.displayName ?? "DropdownMenuSeparator";

const DropdownMenuShortcut = ({ className, ...props }: DropdownMenuShortcutProps) => (
  <span className={cn(dropdownMenuShortcutStyles, className)} {...props} />
);
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

const DropdownMenuSub = RadixDropdownMenu.Sub;
const DropdownMenuSubTrigger = ({
  className,
  inset,
  children,
  ref,
  ...props
}: DropdownMenuSubTriggerProps & {
  ref?: React.Ref<React.ComponentRef<typeof RadixDropdownMenu.SubTrigger>>;
}) => (
  <RadixDropdownMenu.SubTrigger
    ref={ref}
    className={cn(dropdownMenuItemStyles, inset && "pl-8", className)}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" aria-hidden="true" />
  </RadixDropdownMenu.SubTrigger>
);
DropdownMenuSubTrigger.displayName =
  RadixDropdownMenu.SubTrigger.displayName ?? "DropdownMenuSubTrigger";

const DropdownMenuSubContent = ({
  className,
  ref,
  ...props
}: DropdownMenuSubContentProps & {
  ref?: React.Ref<React.ComponentRef<typeof RadixDropdownMenu.SubContent>>;
}) => (
  <RadixDropdownMenu.SubContent
    ref={ref}
    className={cn(dropdownMenuSubContentStyles, className)}
    {...props}
  />
);
DropdownMenuSubContent.displayName =
  RadixDropdownMenu.SubContent.displayName ?? "DropdownMenuSubContent";

const DropdownMenuGroup = RadixDropdownMenu.Group;
const DropdownMenuPortal = RadixDropdownMenu.Portal;
const DropdownMenuRadioGroup = RadixDropdownMenu.RadioGroup;
const DropdownMenuTrigger = RadixDropdownMenu.Trigger;

function renderItemsOrSections(data: DropdownMenuProps["items"]): React.ReactNode {
  if (!data) return null;

  const isSection = (
    entry: DropdownMenuItemData | DropdownMenuSection,
  ): entry is DropdownMenuSection => "items" in entry;

  if (data.some(isSection)) {
    const sections = data as DropdownMenuSection[];
    return sections.map((section, index) => (
      // eslint-disable-next-line @eslint-react/no-array-index-key -- positional list, items have no stable id
      <React.Fragment key={index}>
        {section.label ? <DropdownMenuLabel>{section.label}</DropdownMenuLabel> : null}
        {section.items.map((item, itemIndex) => (
          <DropdownMenuItem
            // eslint-disable-next-line @eslint-react/no-array-index-key -- positional list, items have no stable id
            key={`${index}-${itemIndex}-${toText(item.label)}`}
            disabled={item.disabled}
            onSelect={item.onSelect}
          >
            {item.icon}
            <div className="flex flex-1 flex-col text-left">
              <span>{item.label}</span>
              {item.description ? (
                <span className="text-xs text-muted-foreground">{item.description}</span>
              ) : null}
            </div>
            {item.shortcut ? <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut> : null}
          </DropdownMenuItem>
        ))}
        {index < sections.length - 1 ? <DropdownMenuSeparator /> : null}
      </React.Fragment>
    ));
  }

  return (data as DropdownMenuItemData[]).map((item, index) => (
    <DropdownMenuItem
      // eslint-disable-next-line @eslint-react/no-array-index-key -- positional list, items have no stable id
      key={`${index}-${toText(item.label)}`}
      disabled={item.disabled}
      onSelect={item.onSelect}
    >
      {item.icon}
      <div className="flex flex-1 flex-col text-left">
        <span>{item.label}</span>
        {item.description ? (
          <span className="text-xs text-muted-foreground">{item.description}</span>
        ) : null}
      </div>
      {item.shortcut ? <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut> : null}
    </DropdownMenuItem>
  ));
}

export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
};
export type { DropdownMenuItemData };
