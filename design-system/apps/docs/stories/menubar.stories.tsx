import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FileIcon,
  FolderIcon,
  HelpCircleIcon,
  SaveIcon,
  SettingsIcon,
  TrashIcon,
} from "lucide-react";

import { Menubar } from "@grupoitss/prizm-ui/menubar";

const meta: Meta<typeof Menubar> = {
  title: "Primários/Menubar",
  component: Menubar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "API preferencial **por props** (sem subcomponentes). Base: [shadcn/ui](https://ui.shadcn.com) + Radix, com tokens PRIZM.\n\n" +
          "Menubar do design system PRIZM, baseado em Radix Menubar.\n\n" +
          "**API principal por props (recomendada):** use a prop `menus` para definir a estrutura da barra (menus, itens, submenus, checkboxes, radios, separadores, labels), sem necessidade de subcomponentes.\n\n" +
          "As stories abaixo replicam os exemplos oficiais (demo, checkbox, radio, submenu, ícones) usando **apenas a API por props**.\n\n" +
          '**Documentação:** <a href="https://ui.shadcn.com/docs/components/menubar" target="_blank" rel="noopener noreferrer">Menubar — shadcn/ui</a>',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Menubar>;

// 1. Demo principal — equivalente ao MenubarDemo
export const Demo: Story = {
  args: {
    className: "w-72",
    menus: [
      {
        label: "File",
        items: [
          { label: "New Tab", shortcut: "⌘T" },
          { label: "New Window", shortcut: "⌘N" },
          { label: "New Incognito Window", disabled: true },
          { type: "separator" },
          {
            type: "submenu",
            label: "Share",
            items: [{ label: "Email link" }, { label: "Messages" }, { label: "Notes" }],
          },
          { type: "separator" },
          { label: "Print...", shortcut: "⌘P" },
        ],
      },
      {
        label: "Edit",
        items: [
          { label: "Undo", shortcut: "⌘Z" },
          { label: "Redo", shortcut: "⇧⌘Z" },
          { type: "separator" },
          {
            type: "submenu",
            label: "Find",
            items: [
              { label: "Search the web" },
              { type: "separator" },
              { label: "Find..." },
              { label: "Find Next" },
              { label: "Find Previous" },
            ],
          },
          { type: "separator" },
          { label: "Cut" },
          { label: "Copy" },
          { label: "Paste" },
        ],
      },
      {
        label: "View",
        contentClassName: "w-44",
        items: [
          { type: "checkbox", label: "Bookmarks Bar" },
          { type: "checkbox", label: "Full URLs", checked: true },
          { type: "separator" },
          {
            label: "Reload",
            inset: true,
            shortcut: "⌘R",
          },
          {
            label: "Force Reload",
            inset: true,
            disabled: true,
            shortcut: "⇧⌘R",
          },
          { type: "separator" },
          { label: "Toggle Fullscreen", inset: true },
          { type: "separator" },
          { label: "Hide Sidebar", inset: true },
        ],
      },
      {
        label: "Profiles",
        items: [
          {
            type: "radio-group",
            value: "benoit",
            items: [
              { value: "andy", label: "Andy" },
              { value: "benoit", label: "Benoit" },
              { value: "luis", label: "Luis" },
            ],
          },
          { type: "separator" },
          { label: "Edit...", inset: true },
          { type: "separator" },
          { label: "Add Profile...", inset: true },
        ],
      },
    ],
  },
};

// 2. Checkbox — equivalente ao MenubarCheckbox
export const CheckboxMenus: Story = {
  args: {
    className: "w-72",
    menus: [
      {
        label: "View",
        contentClassName: "w-64",
        items: [
          {
            type: "checkbox",
            label: "Always Show Bookmarks Bar",
          },
          {
            type: "checkbox",
            label: "Always Show Full URLs",
            checked: true,
          },
          { type: "separator" },
          {
            label: "Reload",
            inset: true,
            shortcut: "⌘R",
          },
          {
            label: "Force Reload",
            inset: true,
            disabled: true,
            shortcut: "⇧⌘R",
          },
        ],
      },
      {
        label: "Format",
        items: [
          {
            type: "checkbox",
            label: "Strikethrough",
            checked: true,
          },
          { type: "checkbox", label: "Code" },
          { type: "checkbox", label: "Superscript" },
        ],
      },
    ],
  },
};

// 3. Radio — equivalente ao MenubarRadio (estático, valor controlado externamente)
export const RadioGroups: Story = {
  args: {
    className: "w-72",
    menus: [
      {
        label: "Profiles",
        items: [
          {
            type: "radio-group",
            value: "benoit",
            items: [
              { value: "andy", label: "Andy" },
              { value: "benoit", label: "Benoit" },
              { value: "luis", label: "Luis" },
            ],
          },
          { type: "separator" },
          { label: "Edit...", inset: true },
          { label: "Add Profile...", inset: true },
        ],
      },
      {
        label: "Theme",
        items: [
          {
            type: "radio-group",
            value: "system",
            items: [
              { value: "light", label: "Light" },
              { value: "dark", label: "Dark" },
              { value: "system", label: "System" },
            ],
          },
        ],
      },
    ],
  },
};

// 4. Submenu — equivalente ao MenubarSubmenu
export const Submenus: Story = {
  args: {
    className: "w-72",
    menus: [
      {
        label: "File",
        items: [
          {
            type: "submenu",
            label: "Share",
            items: [{ label: "Email link" }, { label: "Messages" }, { label: "Notes" }],
          },
          { type: "separator" },
          { label: "Print...", shortcut: "⌘P" },
        ],
      },
      {
        label: "Edit",
        items: [
          { label: "Undo", shortcut: "⌘Z" },
          { label: "Redo", shortcut: "⇧⌘Z" },
          { type: "separator" },
          {
            type: "submenu",
            label: "Find",
            items: [{ label: "Find..." }, { label: "Find Next" }, { label: "Find Previous" }],
          },
          { type: "separator" },
          { label: "Cut" },
          { label: "Copy" },
          { label: "Paste" },
        ],
      },
    ],
  },
};

// 5. Com ícones — equivalente ao MenubarIcons
export const WithIcons: Story = {
  args: {
    className: "w-72",
    menus: [
      {
        label: "File",
        items: [
          {
            label: "New File",
            icon: <FileIcon />,
            shortcut: "⌘N",
          },
          {
            label: "Open Folder",
            icon: <FolderIcon />,
          },
          { type: "separator" },
          {
            label: "Save",
            icon: <SaveIcon />,
            shortcut: "⌘S",
          },
        ],
      },
      {
        label: "More",
        items: [
          {
            label: "Settings",
            icon: <SettingsIcon />,
          },
          {
            label: "Help",
            icon: <HelpCircleIcon />,
          },
          { type: "separator" },
          {
            label: "Delete",
            icon: <TrashIcon />,
            className: "text-destructive",
          },
        ],
      },
    ],
  },
};
