import { Button } from "@grupoitss/prizm-ui/button";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { DropdownMenu } from "@grupoitss/prizm-ui/dropdown-menu";
import type { DropdownMenuItemData, DropdownMenuProps } from "@grupoitss/prizm-ui/dropdown-menu";

const baseItems: DropdownMenuItemData[] = [
  { label: "Profile", description: "View and edit your profile" },
  { label: "Billing", description: "Manage billing and subscription" },
  { label: "Settings" },
  { label: "Sign out", disabled: true },
];

const meta: Meta<typeof DropdownMenu> = {
  title: "Primários/DropdownMenu",
  component: DropdownMenu,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "API preferencial **por props** (sem subcomponentes). Base: [shadcn/ui](https://ui.shadcn.com) + Radix, com tokens PRIZM.\n\n" +
          "DropdownMenu do design system PRIZM, baseado no componente DropdownMenu do shadcn/ui.\n\n" +
          "Oferece uma **API simplificada via `trigger` + `items`** para os casos mais comuns e " +
          "mantém a **API de composição** (`DropdownMenuContent`, `DropdownMenuItem`, etc.) como escape hatch avançado.\n\n" +
          '**Documentação base:** <a href="https://ui.shadcn.com/docs/components/dropdown-menu" target="_blank" rel="noopener noreferrer">DropdownMenu — shadcn/ui</a>',
      },
    },
  },
  args: {
    trigger: <Button variant="outline">Open menu</Button>,
    items: baseItems,
  } satisfies Partial<DropdownMenuProps>,
};

export default meta;

type Story = StoryObj<typeof DropdownMenu>;

export const Default: Story = {};

export const WithShortcuts: Story = {
  args: {
    items: [
      { label: "New Tab", shortcut: "⌘+T" },
      { label: "New Window", shortcut: "⌘+N" },
      { label: "Open Workspace...", shortcut: "⌘+Shift+O" },
    ],
  },
};

export const WithSections: Story = {
  args: {
    items: [
      {
        label: "Account",
        items: [{ label: "Profile" }, { label: "Billing" }],
      },
      {
        label: "Danger zone",
        items: [
          {
            label: "Delete account",
            description: "This action cannot be undone.",
          },
        ],
      },
    ],
  },
};

export const AlignExamples: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <DropdownMenu
        trigger={<Button variant="outline">Align start</Button>}
        items={baseItems}
        align="start"
      />
      <DropdownMenu
        trigger={<Button variant="outline">Align center</Button>}
        items={baseItems}
        align="center"
      />
      <DropdownMenu
        trigger={<Button variant="outline">Align end</Button>}
        items={baseItems}
        align="end"
      />
      <DropdownMenu
        trigger={<Button variant="outline">Side right</Button>}
        items={baseItems}
        side="right"
      />
      <DropdownMenu
        trigger={<Button variant="outline">Side top</Button>}
        items={baseItems}
        side="top"
      />
    </div>
  ),
};

export const WithIconsAndDescriptions: Story = {
  args: {
    items: [
      {
        label: "Profile",
        description: "View and edit your profile",
        icon: "👤",
        shortcut: "⇧⌘P",
      },
      {
        label: "Billing",
        description: "Manage billing and subscription",
        icon: "💳",
        shortcut: "⌘B",
      },
      {
        label: "Settings",
        description: "Update your preferences",
        icon: "⚙️",
        shortcut: "⌘S",
      },
    ],
  },
};

export const ComplexPropsExample: Story = {
  args: {
    items: [
      {
        label: "My Account",
        items: [
          {
            label: "Profile",
            description: "View and edit your profile",
            shortcut: "⇧⌘P",
          },
          {
            label: "Billing",
            description: "Invoices and subscriptions",
            shortcut: "⌘B",
          },
          {
            label: "Settings",
            description: "Team and workspace settings",
            shortcut: "⌘S",
          },
        ],
      },
      {
        label: "Team",
        items: [{ label: "Invite members" }, { label: "Manage roles" }, { label: "View activity" }],
      },
      {
        label: "Danger zone",
        items: [
          {
            label: "Delete workspace",
            description: "This action cannot be undone.",
          },
        ],
      },
    ],
  },
};
