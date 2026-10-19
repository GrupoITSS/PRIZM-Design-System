import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@grupoitss/prizm-ui/avatar";

const meta: Meta<typeof Avatar> = {
  title: "Primários/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "API preferencial **por props** (sem subcomponentes). Base: [shadcn/ui](https://ui.shadcn.com) + Radix, com tokens PRIZM.\n\n" +
          'Avatar do design system PRIZM. Uso recomendado: `<Avatar src={} fallback={} />`. Fallback é obrigatório. Baseado em shadcn/ui (Radix).\n\n**Documentação:** <a href="https://ui.shadcn.com/docs/components/radix/avatar" target="_blank" rel="noopener noreferrer">Avatar — shadcn/ui (Radix)</a>',
      },
    },
  },
  args: {
    size: "xl",
    fallback: "JD",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    src: { control: "text" },
    alt: { control: "text" },
    fallback: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

/** Tamanhos do Cockpit (navbar md + fallback) — mesma linha. */
export const CockpitNaMesmaLinha: Story = {
  name: "Cockpit (mesma linha)",
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <Avatar key={size} size={size} fallback="MG" />
      ))}
    </div>
  ),
};

/**
 * Avatar do menu do usuário no navbar do Cockpit (abre popover com Sair).
 * size-9 + borda `border` — sem border-border lilás do theme Cockpit.
 */
export const CockpitMenuUsuario: Story = {
  name: "Cockpit — menu do usuário",
  parameters: {
    docs: {
      description: {
        story:
          "Trigger do menu de conta no navbar (Cockpit): `size-9`, borda `border`, com foto ou iniciais. Abre o popover com opção de sair.",
      },
    },
  },
  render: () => {
    const withPhoto = "https://github.com/shadcn.png";
    return (
      <div className="flex flex-wrap items-center gap-6">
        <div className="flex flex-col items-center gap-2">
          <Avatar
            size="md"
            src={withPhoto}
            alt="Ana Silva"
            fallback="AS"
            className="!size-9 !border-border"
          />
          <span className="text-xs text-muted-foreground">Com foto</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Avatar size="md" fallback="AS" className="!size-9 !border-border" />
          <span className="text-xs text-muted-foreground">Só iniciais</span>
        </div>
      </div>
    );
  },
};

const defaultImage = "https://github.com/shadcn.png";
const altImage =
  "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80";

export const Basic: Story = {
  args: {
    src: defaultImage,
    alt: "@shadcn",
    fallback: "CN",
  },
  render: (args) => <Avatar {...args} />,
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-4">
      <Avatar {...args} src={defaultImage} alt="XS" fallback="XS" size="xs" />
      <Avatar {...args} src={defaultImage} alt="SM" fallback="SM" size="sm" />
      <Avatar {...args} src={defaultImage} alt="MD" fallback="MD" size="md" />
      <Avatar {...args} src={defaultImage} alt="LG" fallback="LG" size="lg" />
      <Avatar {...args} src={defaultImage} alt="XL" fallback="XL" size="xl" />
    </div>
  ),
};

export const FallbackOnly: Story = {
  args: {
    fallback: "PD",
  },
  render: (args) => <Avatar {...args} />,
};

export const WithBadge: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Badge requer composição (AvatarImage + AvatarFallback + AvatarBadge como children). Demais casos use props: src, fallback.",
      },
    },
  },
  render: () => (
    <Avatar>
      <AvatarImage src={defaultImage} alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
      <AvatarBadge className="bg-success" />
    </Avatar>
  ),
};

export const AvatarGroupDemo: Story = {
  render: () => (
    <AvatarGroup>
      <Avatar src={defaultImage} alt="User 1" fallback="U1" />
      <Avatar src={altImage} alt="User 2" fallback="U2" />
      <Avatar fallback="U3" size="xl" />
    </AvatarGroup>
  ),
};

export const AvatarGroupWithCount: Story = {
  render: () => (
    <AvatarGroup>
      <Avatar src={defaultImage} alt="User 1" fallback="U1" size="xl" />
      <Avatar src={altImage} alt="User 2" fallback="U2" size="xl" />
      <AvatarGroupCount>+3</AvatarGroupCount>
    </AvatarGroup>
  ),
};
