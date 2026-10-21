import { Button } from "@grupoitss/prizm-ui/button";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { TagIcon } from "lucide-react";
import { type ReactNode, useState } from "react";
import { Item } from "@grupoitss/prizm-ui/item";
import type { ItemBadge } from "@grupoitss/prizm-ui/item";

const meta: Meta<typeof Item> = {
  title: "Primários/BadgeItem",
  component: Item,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "API preferencial **por props** (sem subcomponentes). Base: [shadcn/ui](https://ui.shadcn.com) + Radix, com tokens PRIZM.\n\n" +
          "Stories focados na variant de badges do Item. Use as props `badges`, `badgesRemovable`, `onBadgesChange` e `onBadgeRemove` diretamente no Item.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Item>;

const defaultBadges: ItemBadge[] = [
  { id: "react", label: "React", variant: "verified" },
  { id: "ts", label: "TypeScript", variant: "default" },
  { id: "node", label: "Node.js", variant: "outline" },
];

function BadgesInteractive({ actions }: { actions?: ReactNode }) {
  const [badges, setBadges] = useState<ItemBadge[]>(defaultBadges);

  return (
    <div className="flex w-full max-w-lg flex-col gap-4">
      <Item
        variant="badges"
        mediaVariant="icon"
        media={<TagIcon />}
        title="Tech Stack"
        description="Tags associated with this project."
        badges={badges}
        actions={actions}
        onBadgesChange={setBadges}
        onBadgeRemove={(removed) => console.log("Removed badge:", removed.label)}
      />
      <div className="text-muted-foreground text-xs">
        Current badges: {badges.map((b) => b.label).join(", ") || "none"}
      </div>
      <Button
        size="sm"
        variant="outline"
        className="w-fit"
        onClick={() => setBadges(defaultBadges)}
      >
        Reset badges
      </Button>
    </div>
  );
}

export const Badges: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Badges on the Item component. Each badge can be removed by clicking the X button. " +
          "In the `badges` variant, the `actions` slot defaults to a small outline Button (you can override it by passing `actions`, or hide it with `actions={null}`). " +
          "Use `onBadgesChange` to receive the updated array and `onBadgeRemove` for per-badge removal events.",
      },
    },
  },
  render: () => <BadgesInteractive />,
};

export const BadgesWithActions: Story = {
  parameters: {
    docs: {
      description: {
        story: "Badges variant with a custom action Button passed via the `actions` prop.",
      },
    },
  },
  render: () => (
    <BadgesInteractive
      actions={
        <Button size="sm" variant="outline">
          Add tag
        </Button>
      }
    />
  ),
};

export const BadgesWithoutActions: Story = {
  parameters: {
    docs: {
      description: {
        story: "Badges variant with `actions={null}` to hide the actions slot entirely.",
      },
    },
  },
  render: () => <BadgesInteractive actions={null} />,
};

export const BadgesReadonly: Story = {
  parameters: {
    docs: {
      description: {
        story: "Non-removable badges (`badgesRemovable={false}`). Useful for display-only tags.",
      },
    },
  },
  render: () => (
    <div className="flex w-full max-w-lg flex-col gap-4">
      <Item
        variant="outline"
        title="Published article"
        description="This item has read-only category badges."
        badges={[
          { id: "design", label: "Design", variant: "secondary" },
          { id: "ux", label: "UX", variant: "secondary" },
          { id: "a11y", label: "Accessibility", variant: "outline" },
        ]}
        badgesRemovable={false}
      />
    </div>
  ),
};

export const BadgesVariants: Story = {
  parameters: {
    docs: {
      description: {
        story: "Badges with different variant colors.",
      },
    },
  },
  render: () => (
    <div className="flex w-full max-w-lg flex-col gap-4">
      <Item
        variant="outline"
        title="Status indicators"
        description="Each badge uses a different variant for semantic meaning."
        badges={[
          { id: "1", label: "Default", variant: "default" },
          { id: "3", label: "Secondary", variant: "secondary" },
          { id: "6", label: "Verified", variant: "verified" },
          { id: "7", label: "Destructive", variant: "destructive" },
          { id: "8", label: "Outline", variant: "outline" },
        ]}
        badgesRemovable={false}
      />
    </div>
  ),
};

export const BadgesInteractiveRow: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Exemplo de Item na variant `badges` com prop `interactive` habilitada, para uso como linha clicável (por exemplo, filtro ou seleção).",
      },
    },
  },
  render: () => (
    <div className="flex w-full max-w-lg flex-col gap-4">
      <Item
        variant="badges"
        mediaVariant="icon"
        media={<TagIcon />}
        title="Tech Stack (interactive)"
        description="Clique para abrir detalhes ou aplicar este conjunto de tags."
        badges={defaultBadges}
        interactive
        onClick={() => {
          // noop — apenas demonstração
        }}
      />
    </div>
  ),
};
