import { Avatar } from "@grupoitss/prizm-ui/avatar";
import { Button } from "@grupoitss/prizm-ui/button";
import { Checkbox } from "@grupoitss/prizm-ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@grupoitss/prizm-ui/dropdown-menu";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@grupoitss/prizm-ui/field";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  BadgeCheck as BadgeCheckIcon,
  ChevronDown as ChevronDownIcon,
  ChevronRight as ChevronRightIcon,
  ExternalLink as ExternalLinkIcon,
  Home as HomeIcon,
  Inbox as InboxIcon,
  Plus as PlusIcon,
  ShieldAlert as ShieldAlertIcon,
} from "@grupoitss/prizm-ui/icons";
import { Item } from "@grupoitss/prizm-ui/item";

const meta: Meta<typeof Item> = {
  title: "Primários/Item",
  component: Item,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "API preferencial **por props** (sem subcomponentes). Base: [shadcn/ui](https://ui.shadcn.com) + Radix, com tokens PRIZM.\n\n" +
          'Item — componente versátil para exibir media, título, descrição e ações. **API props-based** (sem subcomponentes).\n\n**Documentação e API de referência:** <a href="https://ui.shadcn.com/docs/components/item" target="_blank" rel="noopener noreferrer">Item — shadcn/ui</a>',
      },
    },
  },
  args: {
    variant: "default",
    size: "default",
    title: "Item title",
    description: "Item description",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline", "muted", "badges"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "xs"],
    },
    mediaVariant: {
      control: "select",
      options: ["default", "icon", "image"],
    },
    asChild: {
      control: "boolean",
    },
    interactive: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Item>;

// (BadgeItem stories foram movidas para item/badge-item/badge-item.stories.tsx)

// (FileItem stories have been moved to file-item/file-item.stories.tsx)

export const Demo: Story = {
  parameters: {
    docs: {
      description: {
        story: "Demo of the Item component.",
      },
    },
  },
  render: () => (
    <div className="flex w-full max-w-md flex-col gap-6">
      <Item
        variant="outline"
        title="Basic Item"
        description="A simple item with title and description."
        actions={
          <Button variant="outline" size="sm">
            Action
          </Button>
        }
      />

      <Item
        variant="outline"
        size="sm"
        href="#"
        onClick={(e) => e.preventDefault()}
        media={<BadgeCheckIcon className="size-5" />}
        title="Your profile has been verified."
        actions={<ChevronRightIcon className="size-4" />}
      />
    </div>
  ),
};

export const Overview: Story = {
  parameters: {
    docs: {
      description: {
        story: "Overview of the Item component.",
      },
    },
  },
  render: () => (
    <div className="flex w-full max-w-md flex-col gap-3">
      <Item
        variant="outline"
        title="Notifications"
        description="Updates and alerts relevant to your account."
        actions={
          <Button variant="outline" size="sm">
            Manage
          </Button>
        }
      />
      <Item
        title="Team"
        description="Invite teammates and manage roles."
        actions={<ChevronRightIcon className="size-4" />}
      />
    </div>
  ),
};

export const Usage: Story = {
  parameters: {
    docs: {
      description: {
        story: "Usage of the Item component.",
      },
    },
  },
  render: () => (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Item
        mediaVariant="icon"
        media={<InboxIcon />}
        title="Title"
        description="Description"
        actions={<Button size="sm">Action</Button>}
      />
    </div>
  ),
};

export const ItemVsField: Story = {
  parameters: {
    docs: {
      description: {
        story: "Item vs Field.",
      },
    },
  },
  render: () => (
    <div className="grid w-full max-w-2xl grid-cols-1 gap-4 md:grid-cols-2">
      <div className="flex flex-col gap-3">
        <div className="text-muted-foreground text-sm font-medium">Item (conteúdo)</div>
        <Item
          variant="outline"
          title="Billing"
          description="Manage invoices and payment methods."
          actions={<ChevronRightIcon className="size-4" />}
        />
      </div>

      <div className="flex flex-col gap-3">
        <div className="text-muted-foreground text-sm font-medium">Field (input)</div>
        <Field>
          <FieldLabel className="w-full">
            <Checkbox aria-label="Enable feature" />
            <FieldContent>
              <FieldTitle>Enable feature</FieldTitle>
              <FieldDescription>Turns on the behavior for your account.</FieldDescription>
            </FieldContent>
          </FieldLabel>
        </Field>
      </div>
    </div>
  ),
};

export const Size: Story = {
  parameters: {
    docs: {
      description: {
        story: "Size of the Item component.",
      },
    },
  },
  render: () => (
    <div className="flex w-full max-w-md flex-col gap-6">
      <Item
        variant="outline"
        mediaVariant="icon"
        media={<InboxIcon />}
        title="Default Size"
        description="The standard size for most use cases."
      />
      <Item
        variant="outline"
        size="sm"
        mediaVariant="icon"
        media={<InboxIcon />}
        title="Small Size"
        description="A compact size for dense layouts."
      />
      <Item
        variant="outline"
        size="xs"
        mediaVariant="icon"
        media={<InboxIcon />}
        title="Extra Small Size"
        description="The most compact size available."
      />
    </div>
  ),
};

export const Icon: Story = {
  parameters: {
    docs: {
      description: {
        story: "Icon of the Item component.",
      },
    },
  },
  render: () => (
    <div className="flex w-full max-w-lg flex-col gap-6">
      <Item
        variant="outline"
        mediaVariant="icon"
        media={<ShieldAlertIcon />}
        title="Security Alert"
        description="New login detected from unknown device."
        actions={
          <Button size="sm" variant="outline">
            Review
          </Button>
        }
      />
    </div>
  ),
};

export const AvatarExample: Story = {
  parameters: {
    docs: {
      description: {
        story: "Avatar of the Item component.",
      },
    },
  },
  render: () => (
    <div className="flex w-full max-w-lg flex-col gap-6">
      <Item
        variant="outline"
        media={<Avatar src="https://github.com/evilrabbit.png" fallback="ER" />}
        title="Evil Rabbit"
        description="Last seen 5 months ago"
        actions={
          <Button size="icon-sm" variant="outline" className="rounded-full" aria-label="Invite">
            <PlusIcon />
          </Button>
        }
      />

      <Item
        variant="outline"
        media={
          <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
            <Avatar src="https://github.com/shadcn.png" fallback="CN" className="hidden sm:flex" />
            <Avatar
              src="https://github.com/maxleiter.png"
              fallback="LR"
              className="hidden sm:flex"
            />
            <Avatar src="https://github.com/evilrabbit.png" fallback="ER" />
          </div>
        }
        title="No Team Members"
        description="Invite your team to collaborate on this project."
        actions={
          <Button size="sm" variant="outline">
            Invite
          </Button>
        }
      />
    </div>
  ),
};

const music = [
  {
    title: "Midnight City Lights",
    artist: "Neon Dreams",
    album: "Electric Nights",
    duration: "3:45",
  },
  {
    title: "Coffee Shop Conversations",
    artist: "The Morning Brew",
    album: "Urban Stories",
    duration: "4:05",
  },
  {
    title: "Digital Rain",
    artist: "Cyber Symphony",
    album: "Binary Beats",
    duration: "3:30",
  },
];

export const Image: Story = {
  parameters: {
    docs: {
      description: {
        story: "Image of the Item component.",
      },
    },
  },
  render: () => (
    <div className="flex w-full max-w-md flex-col gap-4">
      {music.map((song) => (
        <Item
          key={song.title}
          variant="outline"
          href="#"
          onClick={(e) => e.preventDefault()}
          mediaVariant="image"
          media={
            <img
              src={`https://avatar.vercel.sh/${encodeURIComponent(song.title)}`}
              alt={song.title}
              className="object-cover grayscale"
            />
          }
          title={
            <span className="line-clamp-1">
              {song.title} - <span className="text-muted-foreground">{song.album}</span>
            </span>
          }
          description={song.artist}
          meta={<span className="text-muted-foreground text-sm">{song.duration}</span>}
        />
      ))}
    </div>
  ),
};

const people = [
  {
    username: "shadcn",
    avatar: "https://github.com/shadcn.png",
    email: "shadcn@vercel.com",
  },
  {
    username: "maxleiter",
    avatar: "https://github.com/maxleiter.png",
    email: "maxleiter@vercel.com",
  },
  {
    username: "evilrabbit",
    avatar: "https://github.com/evilrabbit.png",
    email: "evilrabbit@vercel.com",
  },
];

export const Group: Story = {
  parameters: {
    docs: {
      description: {
        story: "Group of the Item component.",
      },
    },
  },
  render: () => (
    <div className="flex w-full max-w-sm flex-col gap-3">
      {people.map((person) => (
        <Item
          key={person.username}
          variant="outline"
          media={
            <Avatar
              src={person.avatar}
              fallback={person.username[0] ?? "?"}
              className="grayscale"
            />
          }
          title={person.username}
          description={person.email}
          actions={
            <Button variant="ghost" size="icon" className="rounded-full" aria-label="Invite">
              <PlusIcon />
            </Button>
          }
        />
      ))}
    </div>
  ),
};

const models = [
  {
    name: "v0-1.5-sm",
    description: "Everyday tasks and UI generation.",
    image:
      "https://images.unsplash.com/photo-1650804068570-7fb2e3dbf888?q=80&w=640&auto=format&fit=crop",
  },
  {
    name: "v0-1.5-lg",
    description: "Advanced thinking or reasoning.",
    image:
      "https://images.unsplash.com/photo-1610280777472-54133d004c8c?q=80&w=640&auto=format&fit=crop",
  },
  {
    name: "v0-2.0-mini",
    description: "Open Source model for everyone.",
    image:
      "https://images.unsplash.com/photo-1602146057681-08560aee8cde?q=80&w=640&auto=format&fit=crop",
  },
];

export const Header: Story = {
  parameters: {
    docs: {
      description: {
        story: "Header of the Item component.",
      },
    },
  },
  render: () => (
    <div className="grid w-full max-w-xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {models.map((model) => (
        <Item
          key={model.name}
          variant="outline"
          header={
            <img
              src={model.image}
              alt={model.name}
              className="aspect-square w-full rounded-sm object-cover"
            />
          }
          title={model.name}
          description={model.description}
        />
      ))}
    </div>
  ),
};

export const Link: Story = {
  parameters: {
    docs: {
      description: {
        story: "Link of the Item component.",
      },
    },
  },
  render: () => (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Item
        href="#"
        onClick={(e) => e.preventDefault()}
        title="Visit our documentation"
        description="Learn how to get started with our components."
        actions={<ChevronRightIcon className="size-4" />}
      />

      <Item
        variant="outline"
        href="#"
        target="_blank"
        onClick={(e) => e.preventDefault()}
        title="External resource"
        description="Opens in a new tab with security attributes."
        actions={<ExternalLinkIcon className="size-4" />}
      />

      <Item
        href="/dashboard"
        onClick={(e) => e.preventDefault()}
        mediaVariant="icon"
        media={<HomeIcon />}
        title="Dashboard"
        description="Overview of your account and activity."
      />
    </div>
  ),
};

export const DropdownMenuExample: Story = {
  parameters: {
    docs: {
      description: {
        story: "DropdownMenu of the Item component.",
      },
    },
  },
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          Select <ChevronDownIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48" align="end">
        <DropdownMenuGroup>
          {people.map((person) => (
            <DropdownMenuItem key={person.username}>
              <Item
                interactive
                size="xs"
                className="w-full p-2"
                media={
                  <Avatar
                    src={person.avatar}
                    fallback={person.username[0] ?? "?"}
                    className="size-6.5 grayscale"
                  />
                }
                title={person.username}
                description={person.email}
                classes={{
                  content: "gap-0",
                  description: "leading-none",
                }}
              />
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const Interactive: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Item interativo com hover habilitado via prop `interactive`. Útil para rows clicáveis, triggers de popover ou itens de menu.",
      },
    },
  },
  render: () => (
    <div className="flex w-full max-w-md flex-col gap-3">
      <Item
        interactive
        variant="outline"
        title="Clickable item"
        description="Este item se comporta como um botão com estado de hover."
        onClick={() => {
          // noop — apenas demonstração
        }}
      />

      <Item
        interactive
        href="#"
        onClick={(e) => e.preventDefault()}
        title="Interactive link"
        description="Exemplo de item link com hover habilitado."
        actions={<ChevronRightIcon className="size-4" />}
      />
    </div>
  ),
};
