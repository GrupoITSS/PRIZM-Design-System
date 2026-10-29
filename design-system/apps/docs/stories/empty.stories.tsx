import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from "@grupoitss/prizm-ui/avatar";
import { Button } from "@grupoitss/prizm-ui/button";
import { InputGroup } from "@grupoitss/prizm-ui/input-group";
import {
  Bell,
  ExternalLink,
  File,
  FolderOpen,
  FolderSearch,
  Plus,
  Search,
} from "@grupoitss/prizm-ui/icons";
import { Empty } from "@grupoitss/prizm-ui/empty";

// Traceability: the component set in [PRIZM] Componentes, the documentation frame and the
// CMS article. The token map lives next to the component (empty.tokens.json) and is
// checked against the classes in a test.
const FIGMA_URL = "https://www.figma.com/design/7NPb3iuxjitMdpudp4yHTl?node-id=25616-2715";
const FIGMA_DOC_URL = "https://www.figma.com/design/7NPb3iuxjitMdpudp4yHTl?node-id=25617-2403";
const CMS_URL =
  "https://sgq.pas.app.br/cms/prizm_design_system/articles?articleId=18074c86-a32b-40df-9974-b1dc0357a22f&version=v1";

const meta: Meta<typeof Empty> = {
  title: "Primários/Empty",
  component: Empty,
  tags: ["autodocs", "documentado"],
  parameters: {
    docs: {
      description: {
        component:
          "Estado vazio (`title`, `description`, `icon`, `content`). `appearance`: `dashed` (padrão) ou `plain` (dentro de tabela, lista ou card). Anuncia com `role=\"status\"`.\n\n" +
          '**Documentação:** <a href="https://ui.shadcn.com/docs/components/empty" target="_blank" rel="noopener noreferrer">Empty — shadcn/ui</a>\n\n' +
          "Padrão de listagem do Cockpit (fallback centralizado + CTA): ver a story **Cockpit List Fallback**." +
          `\n\n[Componente no Figma](${FIGMA_URL}) · [Documentação no Figma](${FIGMA_DOC_URL}) · [Artigo no CMS](${CMS_URL}).`,
      },
    },
  },
  args: {
    title: "No items yet",
    description: "Get started by creating your first item.",
    mediaVariant: "icon",
  },
  argTypes: {
    appearance: { control: "select", options: ["dashed", "plain"] },
    mediaVariant: {
      control: "select",
      options: ["default", "icon"],
    },
    title: { control: "text" },
    description: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Empty>;

/** Uso básico: título, descrição e ícone. */
export const Default: Story = {
  args: {
    title: "No items yet",
    description: "Get started by creating your first item.",
    icon: <File className="size-6" />,
    mediaVariant: "icon",
  },
  render: (args) => <Empty {...args} />,
};

/** Um botão de ação principal em `content`. */
export const WithAction: Story = {
  args: {
    title: "No items yet",
    description: "Get started by creating your first item.",
    icon: <File className="size-6" />,
    mediaVariant: "icon",
    content: <Button>Create item</Button>,
  },
  render: (args) => <Empty {...args} />,
};

/** Sem resultados de busca: ícone de busca + botão para limpar filtros. */
export const NoResults: Story = {
  args: {
    title: "No results found",
    description: "Try adjusting your search or filters to find what you're looking for.",
    icon: <Search className="size-6" />,
    mediaVariant: "icon",
    content: <Button variant="outline">Clear filters</Button>,
  },
  render: (args) => <Empty {...args} />,
};

/** Pasta vazia. */
export const EmptyFolder: Story = {
  args: {
    title: "This folder is empty",
    description: "Upload files or create a new folder to get started.",
    icon: <FolderSearch className="size-6" />,
    mediaVariant: "icon",
  },
  render: (args) => <Empty {...args} />,
};

/** mediaVariant="default" — ícone sem pill de fundo. */
export const MediaDefault: Story = {
  args: {
    title: "No data",
    description: 'mediaVariant="default" — icon without background pill.',
    icon: <File className="size-6" />,
    mediaVariant: "default",
  },
  render: (args) => <Empty {...args} />,
};

/** Apenas título, sem descrição nem ícone. */
export const TitleOnly: Story = {
  args: {
    title: "Nothing here",
  },
  render: (args) => <Empty {...args} />,
};

// ----- Exemplos do Untitled-1.md (todos em props-based) -----

/** No Projects Yet — dois botões + link "Learn More". Conteúdo via prop `content`. */
export const NoProjectsYet: Story = {
  render: () => (
    <Empty
      title="No Projects Yet"
      description="You haven't created any projects yet. Get started by creating your first project."
      icon={<FolderSearch className="size-6" />}
      mediaVariant="icon"
      content={
        <div className="flex flex-col items-center gap-3">
          <div className="flex flex-row flex-wrap justify-center gap-2">
            <Button>Create Project</Button>
            <Button variant="outline">Import Project</Button>
          </div>
          <Button variant="link" asChild className="text-muted-foreground text-sm" size="sm">
            <a href="#">
              Learn More <ExternalLink className="ml-1 inline size-3.5" />
            </a>
          </Button>
        </div>
      }
    />
  ),
};

/** Outline — borda tracejada via className. Cloud storage vazio. */
export const Outline: Story = {
  render: () => (
    <Empty
      className="border border-dashed"
      title="Cloud Storage Empty"
      description="Upload files to your cloud storage to access them anywhere."
      icon={<FolderOpen className="size-6" />}
      mediaVariant="icon"
      content={
        <Button variant="outline" size="sm">
          Upload Files
        </Button>
      }
    />
  ),
};

/** Background — fundo muted e altura cheia. No notifications. */
export const Background: Story = {
  render: () => (
    <Empty
      className="bg-muted/30 h-full"
      title="No Notifications"
      description="You're all caught up. New notifications will appear here."
      icon={<Bell className="size-6" />}
      mediaVariant="icon"
      content={
        <Button variant="outline" size="sm">
          Refresh
        </Button>
      }
    />
  ),
};

/** Avatar no media — usuário offline. mediaVariant="default" e icon = Avatar. */
export const AvatarMedia: Story = {
  render: () => (
    <Empty
      title="User Offline"
      description="This user is currently offline. You can leave a message to notify them or try again later."
      icon={
        <Avatar
          className="size-12 grayscale"
          src="https://github.com/shadcn.png"
          alt="User"
          fallback="LR"
        />
      }
      mediaVariant="default"
      content={<Button size="sm">Leave Message</Button>}
    />
  ),
};

/** Grupo de avatares no media — no team members. */
export const AvatarGroupMedia: Story = {
  render: () => (
    <Empty
      title="No Team Members"
      description="Invite your team to collaborate on this project."
      icon={
        <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:size-12 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
          <Avatar src="https://github.com/shadcn.png" alt="@shadcn" fallback="CN" />
          <Avatar src="https://github.com/maxleiter.png" alt="@maxleiter" fallback="ML" />
          <Avatar src="https://github.com/evilrabbit.png" alt="@evilrabbit" fallback="ER" />
        </div>
      }
      mediaVariant="default"
      content={
        <Button size="sm">
          <Plus className="size-4" />
          Invite Members
        </Button>
      }
    />
  ),
};

/** 404 Not Found — título, descrição e campo de busca + link de suporte em content. */
export const NotFoundInputGroup: Story = {
  render: () => (
    <Empty
      title="404 - Not Found"
      description="The page you're looking for doesn't exist. Try searching for what you need below."
      content={
        <div className="flex w-full max-w-sm flex-col items-center gap-4">
          <InputGroup
            className="sm:w-3/4"
            addonInlineEnd={<Search className="size-4" aria-hidden />}
          />
          <p className="text-muted-foreground text-center text-sm [&>a]:underline [&>a]:underline-offset-4">
            Need help? <a href="#">Contact support</a>
          </p>
        </div>
      }
    />
  ),
};

// ----- Casos extras -----

/** Múltiplas ações: primary + secondary. */
export const MultipleActions: Story = {
  args: {
    title: "No data to show",
    description: "Add a new record or import from file.",
    icon: <File className="size-6" />,
    mediaVariant: "icon",
    content: (
      <div className="flex flex-wrap justify-center gap-2">
        <Button>Add record</Button>
        <Button variant="outline">Import</Button>
      </div>
    ),
  },
  render: (args) => <Empty {...args} />,
};

/** Sem ícone: só título e descrição. */
export const NoIcon: Story = {
  args: {
    title: "No activity",
    description: "When something happens here, it will show up.",
  },
  render: (args) => <Empty {...args} />,
};

/** Escape hatch: layout totalmente customizado via children (sem title). */
export const Composition: Story = {
  render: () => (
    <Empty>
      <div className="flex flex-col items-center gap-2 text-center">
        <span className="text-lg font-medium">Custom empty state</span>
        <p className="text-muted-foreground text-sm">Fully custom content via children.</p>
        <Button size="sm">Custom action</Button>
      </div>
    </Empty>
  ),
};

/**
 * Fallback de listagem (Cockpit): centralizado, sem borda, 2 linhas + CTA.
 * Fallback de listagem com CTA.
 */
export const CockpitListFallback: Story = {
  render: () => (
    <div className="flex flex-1 items-center justify-center py-24">
      <Empty
        className="gap-4 border-none p-0"
        mediaVariant="icon"
        icon={<FolderOpen className="size-6 text-muted-foreground" />}
        title="Nenhuma organização encontrada"
        description={
          <>
            <span className="block">Ainda não há organizações cadastradas no sistema.</span>
            <span className="block">Crie uma nova organização para provisionar a conta.</span>
          </>
        }
        content={
          <Button type="button" variant="default" size="sm">
            <Plus className="size-4" />
            Nova organização
          </Button>
        }
      />
    </div>
  ),
};
