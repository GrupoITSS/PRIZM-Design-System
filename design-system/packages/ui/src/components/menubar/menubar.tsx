import { cn } from "../../lib/cn";
import { Check, ChevronRight, Circle } from "lucide-react";
import { Menubar as RadixMenubar } from "radix-ui";
import * as React from "react";

import {
  menubarCheckboxItemStyles,
  menubarContentStyles,
  menubarItemInsetStyles,
  menubarItemStyles,
  menubarLabelInsetStyles,
  menubarLabelStyles,
  menubarRadioItemStyles,
  menubarRootStyles,
  menubarSeparatorStyles,
  menubarShortcutStyles,
  menubarSubContentStyles,
  menubarSubTriggerInsetStyles,
  menubarSubTriggerStyles,
  menubarTriggerStyles,
} from "./menubar.styles";
import type {
  MenubarMenuConfig,
  MenubarMenuItem,
  MenubarProps,
  MenubarRadioGroupItem,
} from "./menubar.types";

/**
 * Menubar do design system PRIZM.
 *
 * Baseado no Radix Menubar, com **API principal por props**:
 *
 * - `menus`: lista de menus com itens (actions, checkbox, radio-group, separator, label, submenu)
 * - Demais props do Radix Menubar (`loop`, `orientation`, `dir`, etc.)
 *
 * Exemplo recomendado (sem subcomponentes):
 *
 * ```tsx
 * <Menubar
 *   menus={[
 *     {
 *       label: "File",
 *       items: [
 *         { label: "New Tab", shortcut: "⌘T", onSelect: () => {} },
 *         { label: "New Window", shortcut: "⌘N" },
 *         { type: "separator" },
 *         {
 *           type: "checkbox",
 *           label: "Show Status Bar",
 *           checked: showStatusBar,
 *           onCheckedChange: setShowStatusBar,
 *         },
 *       ],
 *     },
 *   ]}
 * />
 * ```
 *
 * Para cenários de composição extremamente avançados, use diretamente os
 * primitivos do Radix importando de `"radix-ui"`.
 */
const Menubar = function Menubar({
  menus,
  className,
  ref,
  ...rootProps
}: MenubarProps & { ref?: React.Ref<React.ComponentRef<typeof RadixMenubar.Root>> }) {
  return (
    <RadixMenubar.Root
      ref={ref}
      data-slot="menubar"
      className={cn(menubarRootStyles, className)}
      {...rootProps}
    >
      {menus.map((menu, index) => (
        <MenubarMenuInstance
          // eslint-disable-next-line @eslint-react/no-array-index-key -- positional list, items have no stable id
          key={menu.id ?? index}
          menu={menu}
        />
      ))}
    </RadixMenubar.Root>
  );
};

Menubar.displayName = RadixMenubar.Root.displayName ?? "Menubar";

function MenubarMenuInstance({ menu }: { menu: MenubarMenuConfig }) {
  return (
    <RadixMenubar.Menu>
      <RadixMenubar.Trigger data-slot="menubar-trigger" className={menubarTriggerStyles}>
        {menu.label}
      </RadixMenubar.Trigger>

      <RadixMenubar.Portal>
        <RadixMenubar.Content
          data-slot="menubar-content"
          className={cn(menubarContentStyles, menu.contentClassName)}
          align="start"
          alignOffset={-4}
          sideOffset={8}
        >
          <MenubarItemsList items={menu.items} />
        </RadixMenubar.Content>
      </RadixMenubar.Portal>
    </RadixMenubar.Menu>
  );
}

function MenubarItemsList({ items }: { items: MenubarMenuItem[] }) {
  return (
    <>
      {items.map((item, index) => {
        const key = (item as { id?: string })?.id ?? index;

        switch (item.type) {
          case "separator":
            return <MenubarSeparator key={key} />;
          case "label":
            return <MenubarLabel key={key} item={item} />;
          case "checkbox":
            return <MenubarCheckbox key={key} item={item} />;
          case "radio-group":
            return <MenubarRadioGroup key={key} item={item} />;
          case "submenu":
            return <MenubarSubmenu key={key} item={item} />;
          case "item":
          default:
            return <MenubarActionItemRow key={key} item={item} />;
        }
      })}
    </>
  );
}

function MenubarSeparator({ className }: { className?: string }) {
  return (
    <RadixMenubar.Separator
      data-slot="menubar-separator"
      className={cn(menubarSeparatorStyles, className)}
    />
  );
}

function MenubarLabel({ item }: { item: Extract<MenubarMenuItem, { type: "label" }> }) {
  const { inset, label, className, ...rest } = item as {
    inset?: boolean;
    label?: React.ReactNode;
    className?: string;
  };

  return (
    <RadixMenubar.Label
      data-slot="menubar-label"
      className={cn(menubarLabelStyles, inset && menubarLabelInsetStyles, className)}
      {...rest}
    >
      {label}
    </RadixMenubar.Label>
  );
}

function MenubarActionItemRow({
  item,
}: {
  item: Extract<MenubarMenuItem, { type?: "item" }> & Partial<MenubarMenuItem>;
}) {
  const { inset, label, shortcut, icon, onSelect, className, ...rest } = item as {
    inset?: boolean;
    label?: React.ReactNode;
    shortcut?: React.ReactNode;
    icon?: React.ReactNode;
    onSelect?: () => void;
    className?: string;
  };

  return (
    <RadixMenubar.Item
      data-slot="menubar-item"
      className={cn(menubarItemStyles, inset && menubarItemInsetStyles, className)}
      onSelect={onSelect}
      {...rest}
    >
      {icon}
      {label}
      {Boolean(shortcut) && <span className={menubarShortcutStyles}>{shortcut}</span>}
    </RadixMenubar.Item>
  );
}

function MenubarCheckbox({ item }: { item: Extract<MenubarMenuItem, { type: "checkbox" }> }) {
  const { label, shortcut, className, onCheckedChange, checked, ...rest } = item as {
    label?: React.ReactNode;
    shortcut?: React.ReactNode;
    className?: string;
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
  };

  return (
    <RadixMenubar.CheckboxItem
      data-slot="menubar-checkbox-item"
      className={cn(menubarCheckboxItemStyles, className)}
      checked={checked}
      // Radix pode passar "indeterminate" como estado; a API simplificada usa boolean.
      onCheckedChange={(value) => {
        if (typeof onCheckedChange === "function") {
          onCheckedChange(value === true);
        }
      }}
      {...rest}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <RadixMenubar.ItemIndicator>
          <Check className="h-4 w-4" />
        </RadixMenubar.ItemIndicator>
      </span>
      {label}
      {Boolean(shortcut) && <span className={menubarShortcutStyles}>{shortcut}</span>}
    </RadixMenubar.CheckboxItem>
  );
}

function MenubarRadioGroup({ item }: { item: MenubarRadioGroupItem }) {
  const { value, onValueChange, items, ...rest } = item;

  return (
    <RadixMenubar.RadioGroup value={value} onValueChange={onValueChange} {...rest}>
      {items.map((radio, index) => {
        const key = radio.id ?? index;
        const { label, className, value: radioValue, inset } = radio;

        return (
          <RadixMenubar.RadioItem
            key={key}
            value={radioValue}
            data-slot="menubar-radio-item"
            className={cn(menubarRadioItemStyles, inset && menubarItemInsetStyles, className)}
          >
            <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
              <RadixMenubar.ItemIndicator>
                <Circle className="h-2 w-2 fill-current" />
              </RadixMenubar.ItemIndicator>
            </span>
            {label}
          </RadixMenubar.RadioItem>
        );
      })}
    </RadixMenubar.RadioGroup>
  );
}

function MenubarSubmenu({ item }: { item: Extract<MenubarMenuItem, { type: "submenu" }> }) {
  const { label, inset, className, items, ...rest } = item as {
    label?: React.ReactNode;
    inset?: boolean;
    className?: string;
    items: MenubarMenuItem[];
  };

  return (
    <RadixMenubar.Sub {...rest}>
      <RadixMenubar.SubTrigger
        data-slot="menubar-sub-trigger"
        className={cn(menubarSubTriggerStyles, inset && menubarSubTriggerInsetStyles, className)}
      >
        {label}
        <ChevronRight className="ml-auto h-4 w-4" />
      </RadixMenubar.SubTrigger>

      <RadixMenubar.SubContent data-slot="menubar-sub-content" className={menubarSubContentStyles}>
        <MenubarItemsList items={items} />
      </RadixMenubar.SubContent>
    </RadixMenubar.Sub>
  );
}

export { Menubar };
