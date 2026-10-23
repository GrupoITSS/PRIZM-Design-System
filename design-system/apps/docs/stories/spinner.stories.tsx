import type { Meta, StoryObj } from "@storybook/react-vite";

import { Badge } from "@grupoitss/prizm-ui/badge";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupTextarea,
} from "@grupoitss/prizm-ui/input-group";
import { Button } from "@grupoitss/prizm-ui/button";
import { LoaderCircle } from "@grupoitss/prizm-ui/icons";
import { ArrowUp as ArrowUpIcon, Loader as LoaderIcon } from "@grupoitss/prizm-ui/icons";
import { Spinner } from "@grupoitss/prizm-ui/spinner";

// Traceability: the component set in [PRIZM] Componentes, the documentation frame and the
// CMS article. The token map lives next to the component (spinner.tokens.json) and is
// checked against the classes in a test.
const FIGMA_URL = "https://www.figma.com/design/7NPb3iuxjitMdpudp4yHTl?node-id=18665-25956";
const FIGMA_DOC_URL = "https://www.figma.com/design/7NPb3iuxjitMdpudp4yHTl?node-id=25351-69773";
const CMS_URL =
  "https://sgq.pas.app.br/cms/prizm_design_system/articles?articleId=67a0dda1-03da-4685-953f-eeac0a8f361e&version=v1";

const meta: Meta<typeof Spinner> = {
  title: "Primários/Spinner",
  component: Spinner,
  tags: ["autodocs", "documentado"],
  args: {
    size: "md",
  },
  parameters: {
    docs: {
      description: {
        component:
          "API preferencial **por props** (sem subcomponentes). Base: [shadcn/ui](https://ui.shadcn.com) + Radix, com tokens PRIZM.\n\n" +
          "Indicador de carregamento simples do design system PRIZM, baseado no Spinner do shadcn/ui. " +
          "API 100% baseada em props (`size`, `speed`, `className`, `aria-*`), sem subcomponentes.\n\n" +
          "Tamanhos `xs` a `xl` (12 a 32px), os mesmos do Figma. Nome padrão \"Carregando\"; dentro de um botão ou ao lado de um texto que já diz o que carrega, use `aria-hidden`. No Button, use a prop `loading`.\n\n" +
          `[Componente no Figma](${FIGMA_URL}) · [Documentação no Figma](${FIGMA_DOC_URL}) · [Artigo no CMS](${CMS_URL}).`,
      },
    },
  },
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
    speed: { control: "select", options: ["slow", "normal", "fast"] },
    "aria-label": { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  render: (args) => <Spinner {...args} />,
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <Spinner size="xs" />
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
      <Spinner size="xl" />
    </div>
  ),
};

export const InButton: Story = {
  name: "With Button",
  render: () => (
    <div className="flex flex-col items-center gap-4">
      <Button loading size="sm">
        Loading...
      </Button>
      <Button variant="outline" loading size="sm">
        Please wait
      </Button>
      <Button variant="secondary" loading size="sm">
        Processing
      </Button>
    </div>
  ),
};

export const InBadge: Story = {
  name: "With Badge",
  render: () => (
    <div className="flex items-center gap-4 [--radius:1.2rem]">
      <Badge variant="default">
        <Spinner data-icon="inline-start" size="sm" aria-hidden="true" />
        Syncing
      </Badge>
      <Badge variant="secondary">
        <Spinner data-icon="inline-start" size="sm" aria-hidden="true" />
        Updating
      </Badge>
      <Badge variant="outline">
        <Spinner data-icon="inline-start" size="sm" aria-hidden="true" />
        Processing
      </Badge>
    </div>
  ),
};

export const InInputGroup: Story = {
  name: "With InputGroup",
  render: () => (
    <div className="flex w-full max-w-md flex-col gap-4">
      <InputGroup>
        <InputGroupInput placeholder="Send a message..." disabled />
        <InputGroupAddon align="inline-end">
          <Spinner aria-label="Sending" />
        </InputGroupAddon>
      </InputGroup>

      <InputGroup>
        <InputGroupTextarea placeholder="Send a message..." disabled />
        <InputGroupAddon align="block-end">
          <Spinner aria-hidden="true" /> Validating...
          <InputGroupButton className="ml-auto" variant="default">
            <ArrowUpIcon />
            <span className="sr-only">Send</span>
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
};

export const SpeedAndColor: Story = {
  name: "Speed & Color",
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Spinner speed="slow" aria-label="Slow" />
        <span className="text-sm text-muted-foreground">Slow (800ms)</span>
      </div>
      <div className="flex items-center gap-4">
        <Spinner speed="normal" aria-label="Normal" />
        <span className="text-sm text-muted-foreground">Normal (600ms)</span>
      </div>
      <div className="flex items-center gap-4">
        <Spinner speed="fast" aria-label="Fast" />
        <span className="text-sm text-muted-foreground">Fast (400ms)</span>
      </div>
      <div className="flex items-center gap-4">
        <Spinner className="text-destructive" aria-label="Destructive color" />
        <Spinner className="text-primary" aria-label="Primary color" />
        <Spinner className="text-muted-foreground" aria-label="Muted color" />
      </div>
    </div>
  ),
};

export const CustomIcon: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Spinner icon={LoaderCircle} aria-label="Custom Loader icon from DS" />
        <span className="text-sm text-muted-foreground">
          Using <code>LoaderCircle</code> from <code>@grupoitss/prizm-ui/icons</code>
        </span>
      </div>
      <div className="flex items-center gap-4">
        <Spinner icon={LoaderIcon} aria-label="Custom Loader icon from DS" />
        <span className="text-sm text-muted-foreground">
          Using <code>Loader</code> from <code>@grupoitss/prizm-ui/icons</code>
        </span>
      </div>
    </div>
  ),
};
