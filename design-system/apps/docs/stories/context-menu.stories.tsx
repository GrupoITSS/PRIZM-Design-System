import { Copy, Pencil, Trash2 } from "@grupoitss/prizm-ui/icons";
import { Button } from "@grupoitss/prizm-ui/button";
import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@grupoitss/prizm-ui/context-menu";
import type { ContextMenuRadioSection, ContextMenuSection } from "@grupoitss/prizm-ui/context-menu";

const triggerArea = (fine = "Right click here", coarse = "Long press here") => (
  <div className="flex aspect-video w-full max-w-xs items-center justify-center rounded-xl border border-dashed border-muted-foreground/25 bg-muted/50 text-sm text-muted-foreground">
    <span className="hidden pointer-fine:inline-block">{fine}</span>
    <span className="hidden pointer-coarse:inline-block">{coarse}</span>
  </div>
);

const meta: Meta<typeof ContextMenu> = {
  title: "Primários/ContextMenu",
  component: ContextMenu,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "API preferencial **por props** (sem subcomponentes). Base: [shadcn/ui](https://ui.shadcn.com) + Radix, com tokens PRIZM.\n\n" +
          "ContextMenu do design system PRIZM. Menu de contexto ao **clique com o botão direito** (ou long press).\n\n" +
          '**Uso recomendado:** API por **props** — passe `items` (e opcionalmente seções com `label`, `subItems`, `variant: "destructive"`, ou seções do tipo `radio`) e use `children` como área de clique direito. ' +
          "Composição com subcomponentes é escape hatch.\n\n" +
          '**Documentação base:** <a href="https://ui.shadcn.com/docs/components/context-menu" target="_blank" rel="noopener noreferrer">Context Menu — shadcn/ui</a>',
      },
    },
  },
  args: {
    children: triggerArea(),
  },
};

export default meta;

type Story = StoryObj<typeof ContextMenu>;

/** 1. Basic — menu simples com algumas ações (100% props). */
export const Basic: Story = {
  args: {
    items: [
      { label: "Back", onSelect: () => {} },
      { label: "Forward", disabled: true, onSelect: () => {} },
      { label: "Reload", onSelect: () => {} },
    ],
    children: triggerArea(),
  },
};

/** 2. Submenu — item com subitens (submenu) via `subItems`. */
export const Submenu: Story = {
  args: {
    items: [
      {
        label: "Copy",
        shortcut: "⌘C",
        onSelect: () => {},
      },
      {
        label: "Cut",
        shortcut: "⌘X",
        onSelect: () => {},
      },
      {
        label: "More Tools",
        subItems: [
          { label: "Save Page...", onSelect: () => {} },
          { label: "Create Shortcut...", onSelect: () => {} },
          { label: "Name Window...", onSelect: () => {} },
          { label: "Developer Tools", onSelect: () => {} },
          { label: "Delete", variant: "destructive", onSelect: () => {} },
        ],
      },
    ],
    children: triggerArea(),
  },
};

/** 3. Shortcuts — itens com atalhos de teclado (dois grupos com separador). */
export const Shortcuts: Story = {
  args: {
    items: [
      {
        items: [
          { label: "Back", shortcut: "⌘[", onSelect: () => {} },
          { label: "Forward", shortcut: "⌘]", disabled: true, onSelect: () => {} },
          { label: "Reload", shortcut: "⌘R", onSelect: () => {} },
        ],
      },
      {
        items: [
          { label: "Save", shortcut: "⌘S", onSelect: () => {} },
          { label: "Save As...", shortcut: "⇧⌘S", onSelect: () => {} },
        ],
      },
    ] as ContextMenuSection[],
    children: triggerArea(),
  },
};

/** 4. Groups — seções com label e separadores. */
export const Groups: Story = {
  args: {
    items: [
      {
        label: "File",
        items: [
          { label: "New File", shortcut: "⌘N", onSelect: () => {} },
          { label: "Open File", shortcut: "⌘O", onSelect: () => {} },
          { label: "Save", shortcut: "⌘S", onSelect: () => {} },
        ],
      },
      {
        label: "Edit",
        items: [
          { label: "Undo", shortcut: "⌘Z", onSelect: () => {} },
          { label: "Redo", shortcut: "⇧⌘Z", onSelect: () => {} },
        ],
      },
      {
        items: [
          { label: "Cut", shortcut: "⌘X", onSelect: () => {} },
          { label: "Copy", shortcut: "⌘C", onSelect: () => {} },
          { label: "Paste", shortcut: "⌘V", onSelect: () => {} },
        ],
      },
      {
        items: [
          {
            label: "Delete",
            shortcut: "⌫",
            variant: "destructive",
            onSelect: () => {},
          },
        ],
      },
    ] as ContextMenuSection[],
    children: triggerArea(),
  },
};

/** 5. Icons — itens com ícone antes do label. */
export const Icons: Story = {
  args: {
    items: [
      { label: "Copy", icon: <Copy className="h-4 w-4" />, onSelect: () => {} },
      { label: "Cut", icon: <Pencil className="h-4 w-4" />, onSelect: () => {} },
      { label: "Paste", icon: <Copy className="h-4 w-4" />, onSelect: () => {} },
      {
        label: "Delete",
        icon: <Trash2 className="h-4 w-4" />,
        variant: "destructive",
        onSelect: () => {},
      },
    ],
    children: triggerArea(),
  },
};

/** 6. Radio — escolhas exclusivas via seção do tipo `radio`. */
export const Radio: Story = {
  render: function RadioStory() {
    const [user, setUser] = React.useState("pedro");
    const [theme, setTheme] = React.useState("light");

    const radioSections: ContextMenuRadioSection[] = [
      {
        type: "radio",
        label: "People",
        value: user,
        onValueChange: setUser,
        options: [
          { value: "pedro", label: "Pedro Duarte" },
          { value: "colm", label: "Colm Tuite" },
        ],
      },
      {
        type: "radio",
        label: "Theme",
        value: theme,
        onValueChange: setTheme,
        options: [
          { value: "light", label: "Light" },
          { value: "dark", label: "Dark" },
          { value: "system", label: "System" },
        ],
      },
    ];

    return <ContextMenu items={radioSections}>{triggerArea()}</ContextMenu>;
  },
};

/** 7. Destructive — item com `variant: "destructive"`. */
export const Destructive: Story = {
  args: {
    items: [
      {
        label: "Edit",
        icon: <Pencil className="h-4 w-4" />,
        onSelect: () => {},
      },
      {
        label: "Share",
        icon: <Copy className="h-4 w-4" />,
        onSelect: () => {},
      },
      {
        label: "Delete",
        icon: <Trash2 className="h-4 w-4" />,
        variant: "destructive",
        onSelect: () => {},
      },
    ],
    children: triggerArea(),
  },
};

/** Trigger como botão (props). */
export const WithButtonTrigger: Story = {
  args: {
    items: [
      { label: "Profile", description: "View and edit your profile" },
      { label: "Billing", description: "Manage billing and subscription" },
      { label: "Settings" },
      { label: "Sign out", disabled: true },
    ],
    children: <Button variant="outline">Right-click to open context menu</Button>,
  },
};

/** Múltiplas seções + atalhos + descrições (props). */
export const WithSectionsAndShortcuts: Story = {
  args: {
    items: [
      {
        label: "Account",
        items: [
          {
            label: "Profile",
            description: "View and edit your profile",
            shortcut: "⇧⌘P",
            onSelect: () => {},
          },
          {
            label: "Billing",
            description: "Invoices and subscriptions",
            shortcut: "⌘B",
            onSelect: () => {},
          },
        ],
      },
      {
        label: "Danger zone",
        items: [
          {
            label: "Delete account",
            description: "This action cannot be undone.",
            variant: "destructive",
            onSelect: () => {},
          },
        ],
      },
    ] as ContextMenuSection[],
    children: triggerArea("Right-click for sections"),
  },
};

/** Sem controles visíveis na área (apenas área de texto). */
export const MinimalTrigger: Story = {
  args: {
    items: [{ label: "Action", onSelect: () => {} }],
    children: (
      <div className="rounded border p-4 text-sm">
        Clique com o botão direito em qualquer lugar aqui.
      </div>
    ),
  },
};

/** Escape hatch: composição com subcomponentes. */
export const Composition: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div className="flex h-[120px] w-[280px] items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground">
          Composition: right-click here
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onSelect={() => {}}>Back</ContextMenuItem>
        <ContextMenuItem onSelect={() => {}}>Forward</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onSelect={() => {}}>Reload</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};
