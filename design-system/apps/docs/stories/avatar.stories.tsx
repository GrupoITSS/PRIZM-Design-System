import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@grupoitss/prizm-ui/avatar";

// Traceability: the component set in [PRIZM] Componentes, the documentation frame and the
// CMS article. The token map lives next to the component (avatar.tokens.json) and is
// checked against the classes in a test.
const FIGMA_URL = "https://www.figma.com/design/7NPb3iuxjitMdpudp4yHTl?node-id=17100-29935";
const FIGMA_DOC_URL = "https://www.figma.com/design/7NPb3iuxjitMdpudp4yHTl?node-id=25984-2039";
const CMS_URL =
  "https://sgq.pas.app.br/cms/prizm_design_system/articles?articleId=d07ef09c-7e8d-4ade-b4d4-14af3af5d19d&version=v1";

const meta: Meta<typeof Avatar> = {
  title: "Primários/Avatar",
  component: Avatar,
  tags: ["autodocs", "documentado"],
  parameters: {
    docs: {
      description: {
        component:
          "API preferencial **por props** (sem subcomponentes). Base: [shadcn/ui](https://ui.shadcn.com) + Radix, com tokens PRIZM.\n\n" +
          'Avatar do design system PRIZM. Uso recomendado: `<Avatar src={} alt={} fallback={} />`. Passe as iniciais em `fallback` e o nome em `alt` (`alt=""` quando o nome está escrito ao lado). `status` mostra o badge. Padrão `md`.\n\n' +
          `**Rastreabilidade:** <a href="${FIGMA_URL}" target="_blank" rel="noopener noreferrer">Componente no Figma</a> · <a href="${FIGMA_DOC_URL}" target="_blank" rel="noopener noreferrer">Documentação no Figma</a> · <a href="${CMS_URL}" target="_blank" rel="noopener noreferrer">Artigo no CMS</a> · <a href="https://ui.shadcn.com/docs/components/radix/avatar" target="_blank" rel="noopener noreferrer">Avatar — shadcn/ui (Radix)</a>`,
      },
    },
  },
  args: {
    fallback: "JD",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      table: { defaultValue: { summary: "md" } },
    },
    status: {
      control: "select",
      options: [undefined, "online", "away", "busy", "offline"],
      description: "Sem status, sem badge.",
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
 * size-9 + borda `border` (o Avatar não tem borda própria desde 04/11/2026).
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
            className="!size-9 border border-border"
          />
          <span className="text-xs text-muted-foreground">Com foto</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Avatar size="md" fallback="AS" className="!size-9 border border-border" />
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

export const Status: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`status` mostra o badge no canto inferior direito, com o texto do status oculto para o leitor de tela (Online, Ausente, Ocupado, Offline). O badge acompanha o tamanho do avatar.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4">
      {(["online", "away", "busy", "offline"] as const).map((status) => (
        <div key={status} className="flex items-center gap-4">
          {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
            <Avatar
              key={size}
              size={size}
              src={defaultImage}
              alt="shadcn"
              fallback="CN"
              status={status}
            />
          ))}
          <span className="text-xs text-muted-foreground">{status}</span>
        </div>
      ))}
    </div>
  ),
};

export const WithBadge: Story = {
  name: "Badge na composição",
  parameters: {
    docs: {
      description: {
        story: "Na composição, use `AvatarBadge` com `status`. Na API por props, use `status`.",
      },
    },
  },
  render: () => (
    <Avatar>
      <AvatarImage src={defaultImage} alt="shadcn" />
      <AvatarFallback>CN</AvatarFallback>
      <AvatarBadge status="busy" />
    </Avatar>
  ),
};

export const AvatarGroupDemo: Story = {
  render: () => (
    <AvatarGroup>
      <Avatar src={defaultImage} alt="User 1" fallback="U1" />
      <Avatar src={altImage} alt="User 2" fallback="U2" />
      <Avatar alt="User 3" fallback="U3" />
    </AvatarGroup>
  ),
};

export const AvatarGroupWithCount: Story = {
  render: () => (
    <AvatarGroup>
      <Avatar src={defaultImage} alt="User 1" fallback="U1" size="xl" />
      <Avatar src={altImage} alt="User 2" fallback="U2" size="xl" />
      <AvatarGroupCount aria-label="Mais 3 pessoas">+3</AvatarGroupCount>
    </AvatarGroup>
  ),
};

export const AvatarGroupSizes: Story = {
  name: "Grupo nos tamanhos",
  parameters: {
    docs: {
      description: { story: "O contador acompanha o tamanho dos avatares do grupo." },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4">
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <AvatarGroup key={size}>
          <Avatar size={size} src={defaultImage} alt="User 1" fallback="U1" />
          <Avatar size={size} src={altImage} alt="User 2" fallback="U2" />
          <Avatar size={size} alt="User 3" fallback="U3" />
          <AvatarGroupCount aria-label="Mais 3 pessoas">+3</AvatarGroupCount>
        </AvatarGroup>
      ))}
    </div>
  ),
};
