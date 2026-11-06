import { Badge } from "@grupoitss/prizm-ui/badge";
import { Button } from "@grupoitss/prizm-ui/button";
import {
  Bell,
  CircleCheckBig,
  Link,
  MessageSquare,
} from "@grupoitss/prizm-ui/icons";
import { Spinner } from "@grupoitss/prizm-ui/spinner";
import type { Meta, StoryObj } from "@storybook/react-vite";

// Traceability: the component sets in [PRIZM] Componentes (Badge and Badge Number), the
// documentation frame and the CMS article. The token map lives next to the component
// (badge.tokens.json) and is checked against the classes in a test.
const FIGMA_URL =
  "https://www.figma.com/design/7NPb3iuxjitMdpudp4yHTl?node-id=26-169";
const FIGMA_DOC_URL =
  "https://www.figma.com/design/7NPb3iuxjitMdpudp4yHTl?node-id=25145-2040";
const FIGMA_DOT_URL =
  "https://www.figma.com/design/7NPb3iuxjitMdpudp4yHTl?node-id=26273-2460";
const FIGMA_LINK_URL =
  "https://www.figma.com/design/7NPb3iuxjitMdpudp4yHTl?node-id=26156-3255";
const CMS_URL =
  "https://sgq.pas.app.br/cms/prizm_design_system/articles?articleId=f8204506-f907-446c-af39-cef645a878e1&version=v1";

const meta: Meta<typeof Badge> = {
  title: "Primários/Badge",
  component: Badge,
  tags: ["autodocs", "documentado"],
  parameters: {
    docs: {
      description: {
        component:
          "API preferencial **por props** (sem subcomponentes). Base: [shadcn/ui](https://ui.shadcn.com) + Radix, com tokens PRIZM.\n\n" +
          'Badge do design system PRIZM. Pequeno rótulo para status, contadores ou metadados.\n\nAs variantes são as do componente no Figma: `default`, `secondary`, `outline`, `destructive`, `verified`, `success` e `warning`. Tamanhos `sm` (padrão), `md` e `lg`. `shape="number"` é o "Badge Number" do Figma.\n\n- `startIcon` / `endIcon` para ícones alinhados com `data-icon="inline-start"` / `"inline-end"`\n\nPara outras cores, use `className` com os tokens, como no exemplo "Custom Colors" da doc do shadcn.\n\n**Documentação base:** <a href="https://ui.shadcn.com/docs/components/radix/badge" target="_blank" rel="noopener noreferrer">Badge — shadcn/ui</a>\n\n' +
          `[Componente no Figma](${FIGMA_URL}) · [Badge Link no Figma](${FIGMA_LINK_URL}) · [Badge Dot no Figma](${FIGMA_DOT_URL}) · [Documentação no Figma](${FIGMA_DOC_URL}) · [Artigo no CMS](${CMS_URL}).`,
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "secondary",
        "outline",
        "destructive",
        "verified",
        "success",
        "warning",
      ],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    shape: {
      control: "select",
      options: ["default", "number", "dot"],
    },
    loading: {
      control: "boolean",
    },
    pulse: {
      control: "boolean",
      description:
        "Só no dot: halo para o que está em andamento. Some com redução de movimento.",
    },
    asChild: {
      control: false,
      description:
        "Badge link: renderiza o `<a>` filho com hover e foco. Veja a story Link.",
    },
    children: {
      control: "text",
    },
  },
  args: {
    variant: "default",
    children: "Badge",
  },
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="verified" startIcon={<CircleCheckBig />}>
        Verified
      </Badge>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="default" size="sm">
        Small
      </Badge>
      <Badge variant="default" size="md">
        Medium
      </Badge>
      <Badge variant="default" size="lg">
        Large
      </Badge>
    </div>
  ),
};

// "Badge Number" in Figma: a round counter for digits.
export const NumberBadge: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="default" shape="number">
        8
      </Badge>
      <Badge variant="secondary" shape="number">
        99
      </Badge>
      <Badge variant="outline" shape="number">
        20+
      </Badge>
      <Badge variant="destructive" shape="number">
        3
      </Badge>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge
        variant="secondary"
        startIcon={<CircleCheckBig className="size-3" />}
      >
        Verified
      </Badge>
      <Badge variant="outline" endIcon={<Link className="size-3" />}>
        Bookmark
      </Badge>
    </div>
  ),
};

export const Loading: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="destructive" loading>
        <Spinner data-icon="inline-start" size="xs" aria-label="Deleting" />
        Deleting
      </Badge>
      <Badge variant="secondary" loading>
        Generating
        <Spinner data-icon="inline-end" size="xs" aria-label="Generating" />
      </Badge>
    </div>
  ),
};

// Colors outside the Figma variants come from the tokens via className
// (<tone> + <tone>-foreground, or the soft <tone>-weak + <tone>-strong). They follow the brand
// and the mode.
export const CustomColorsWithClassName: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default" className="bg-info-weak text-info-strong">
        Info
      </Badge>
      <Badge variant="default" className="bg-success-weak text-success-strong">
        Success
      </Badge>
      <Badge variant="default" className="bg-warning-weak text-warning-strong">
        Warning
      </Badge>
      <Badge
        variant="default"
        className="bg-destructive-weak text-destructive-strong"
      >
        Destructive
      </Badge>
    </div>
  ),
};

// Badge link (DS-63): asChild with an <a>. Hover and focus exist only here; use Tab to see the ring.
export const BadgeLink: Story = {
  name: "Link",
  parameters: {
    docs: {
      description: {
        story:
          "Badge que leva a outro lugar, como uma tag que abre a tarefa ou filtra a lista. Use `asChild` com um `<a>` (ou o Link do roteador). Hover e foco valem só aqui; o badge comum é estático.",
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default" asChild>
        <a href="#tarefa-42">Tarefa 42</a>
      </Badge>
      <Badge variant="secondary" asChild>
        <a href="#filtro-pendentes">Pendentes</a>
      </Badge>
      <Badge variant="outline" asChild>
        <a href="#filtro-financeiro">Financeiro</a>
      </Badge>
      <Badge variant="verified" asChild startIcon={<CircleCheckBig />}>
        <a href="#auditoria">Auditado</a>
      </Badge>
    </div>
  ),
};

// The static badge in the Button trailing (DS-63). Inside a filled button it inverts its colors.
// Never put a Badge link here: the whole button is the action.
export const InButton: Story = {
  name: "Dentro do Button",
  parameters: {
    docs: {
      description: {
        story:
          "No trailing do Button vai o badge estático. Num botão cheio ele inverte as cores sozinho. Não use o Badge link dentro do botão: seria um link dentro de outro controle. Quando o destino é a tarefa, o próprio botão navega (`asChild` do Button).",
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button>
        Agendamentos
        <Badge variant="default">Novo</Badge>
      </Button>
      <Button variant="secondary">
        Agendamentos
        <Badge variant="default">Novo</Badge>
      </Button>
      <Button variant="destructive">
        Pendências
        <Badge variant="default" shape="number">
          3
        </Badge>
      </Button>
      <Button variant="outline" asChild>
        <a href="#tarefa-42">
          Ver tarefa
          <Badge variant="secondary">42</Badge>
        </a>
      </Button>
    </div>
  ),
};

// Badge dot (DS-66): an 8px point, the text only for screen readers.
export const Dot: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Ponto sem conteúdo visível: notificação não lida (`default`), atendimento em andamento (`success`), ação em curso (`warning`) ou erro (`destructive`). O texto em `children` é lido só pelo leitor de tela e é obrigatório. O anel de 2px em `background` separa o ponto de qualquer superfície. `pulse` liga o halo, que some com redução de movimento.",
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-8">
      <div className="relative inline-flex">
        <Button variant="ghost" size="icon" aria-label="Notificações">
          <Bell />
        </Button>
        <Badge variant="default" shape="dot" className="absolute top-1 right-1">
          Há notificações não lidas
        </Badge>
      </div>
      <div className="relative inline-flex">
        <Button variant="ghost" size="icon" aria-label="Atendimentos">
          <MessageSquare />
        </Button>
        <Badge
          variant="success"
          shape="dot"
          pulse
          className="absolute top-1 right-1"
        >
          Atendimento em andamento
        </Badge>
      </div>
      <span className="inline-flex items-center gap-2 text-sm font-medium">
        Atendimentos
        <Badge variant="destructive" shape="dot">
          Com erro
        </Badge>
      </span>
      <span className="inline-flex items-center gap-2 text-sm font-medium">
        Exportação
        <Badge variant="warning" shape="dot" pulse>
          Em curso
        </Badge>
      </span>
    </div>
  ),
};
