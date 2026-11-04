import * as React from "react";
import { Button } from "@grupoitss/prizm-ui/button";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@grupoitss/prizm-ui/dropdown-menu";
import type { DropdownMenuItemData, DropdownMenuProps } from "@grupoitss/prizm-ui/dropdown-menu";
import { CreditCard, LogOut, Settings, Trash2, User } from "@grupoitss/prizm-ui/icons";

// Traceability: the item component set in [PRIZM] Componentes, the documentation frame and the
// CMS article. The token map lives next to the component (dropdown-menu.tokens.json) and is
// checked against the classes in a test.
const FIGMA_URL = "https://www.figma.com/design/7NPb3iuxjitMdpudp4yHTl?node-id=330-8549";
const FIGMA_DOC_URL = "https://www.figma.com/design/7NPb3iuxjitMdpudp4yHTl?node-id=26023-2857";
const CMS_URL =
  "https://sgq.pas.app.br/cms/prizm_design_system/articles?articleId=216a0231-4880-461e-9336-f519d056f56d&version=v1";

const baseItems: DropdownMenuItemData[] = [
  { label: "Profile", description: "View and edit your profile" },
  { label: "Billing", description: "Manage billing and subscription" },
  { label: "Settings" },
  { label: "Sign out", disabled: true },
];

const meta: Meta<typeof DropdownMenu> = {
  title: "Primários/DropdownMenu",
  component: DropdownMenu,
  tags: ["autodocs", "documentado"],
  parameters: {
    docs: {
      description: {
        component:
          "API preferencial **por props** (sem subcomponentes). Base: [shadcn/ui](https://ui.shadcn.com) + Radix, com tokens PRIZM.\n\n" +
          "DropdownMenu do design system PRIZM, baseado no componente DropdownMenu do shadcn/ui.\n\n" +
          "Oferece uma **API simplificada via `trigger` + `items`** para os casos mais comuns e " +
          "mantém a **API de composição** (`DropdownMenuContent`, `DropdownMenuItem`, etc.) como escape hatch avançado.\n\n" +
          'Item destrutivo: `variant: "destructive"` no item (props) ou `variant="destructive"` no `DropdownMenuItem`.\n\n' +
          `**Rastreabilidade:** <a href="${FIGMA_URL}" target="_blank" rel="noopener noreferrer">Componente no Figma</a> · <a href="${FIGMA_DOC_URL}" target="_blank" rel="noopener noreferrer">Documentação no Figma</a> · <a href="${CMS_URL}" target="_blank" rel="noopener noreferrer">Artigo no CMS</a> · <a href="https://ui.shadcn.com/docs/components/dropdown-menu" target="_blank" rel="noopener noreferrer">DropdownMenu — shadcn/ui</a>`,
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
            variant: "destructive",
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
        icon: <User />,
        shortcut: "⇧⌘P",
      },
      {
        label: "Billing",
        description: "Manage billing and subscription",
        icon: <CreditCard />,
        shortcut: "⌘B",
      },
      {
        label: "Settings",
        description: "Update your preferences",
        icon: <Settings />,
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
            variant: "destructive",
          },
        ],
      },
    ],
  },
};

export const Destructive: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Item destrutivo em `destructive` em repouso e no destaque. Fica por último, depois de um separador, e leva a uma confirmação (AlertDialog).",
      },
    },
  },
  args: {
    items: [
      {
        items: [
          { label: "Profile", icon: <User /> },
          { label: "Settings", icon: <Settings /> },
        ],
      },
      { items: [{ label: "Delete", icon: <Trash2 />, variant: "destructive" }] },
    ],
  },
};

const CompositionExample = () => {
  const [statusBar, setStatusBar] = React.useState(true);
  const [position, setPosition] = React.useState("top");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuItem>
          <User />
          Profile
          <DropdownMenuShortcut aria-hidden="true">⇧⌘P</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CreditCard />
          Billing
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <Settings />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked={statusBar} onCheckedChange={setStatusBar}>
          Status bar
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel inset>Panel position</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>Email</DropdownMenuItem>
            <DropdownMenuItem>Message</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const Composition: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "API de composição: rótulo, ícones, atalho, item desabilitado, checkbox, radio com rótulo recuado (`inset`), submenu e item destrutivo.",
      },
    },
  },
  render: () => <CompositionExample />,
};
