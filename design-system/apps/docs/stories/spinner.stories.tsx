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
import { Loader2 } from "@grupoitss/prizm-ui/icons";
import { ArrowUpIcon, LoaderIcon } from "lucide-react";
import { Spinner } from "@grupoitss/prizm-ui/spinner";

const meta: Meta<typeof Spinner> = {
  title: "Primários/Spinner",
  component: Spinner,
  args: {
    size: "md",
  },
  parameters: {
    docs: {
      description: {
        component:
          "API preferencial **por props** (sem subcomponentes). Base: [shadcn/ui](https://ui.shadcn.com) + Radix, com tokens PRIZM.\n\n" +
          "Indicador de carregamento simples do design system PRIZM, baseado no Spinner do shadcn/ui. " +
          "API 100% baseada em props (`size`, `className`, `aria-*`), sem subcomponentes.",
      },
    },
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
    </div>
  ),
};

export const InButton: Story = {
  name: "With Button",
  render: () => (
    <div className="flex flex-col items-center gap-4">
      <Button disabled size="sm">
        <Spinner data-icon="inline-start" size="sm" aria-label="Loading" />
        Loading...
      </Button>
      <Button variant="outline" disabled size="sm">
        <Spinner data-icon="inline-start" size="sm" aria-label="Please wait" />
        Please wait
      </Button>
      <Button variant="secondary" disabled size="sm">
        <Spinner data-icon="inline-start" size="sm" aria-label="Processing" />
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
        <Spinner data-icon="inline-start" size="sm" aria-label="Syncing" />
        Syncing
      </Badge>
      <Badge variant="secondary">
        <Spinner data-icon="inline-start" size="sm" aria-label="Updating" />
        Updating
      </Badge>
      <Badge variant="outline">
        <Spinner data-icon="inline-start" size="sm" aria-label="Processing" />
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
          <Spinner aria-label="Validating" /> Validating...
          <InputGroupButton className="ml-auto" variant="default">
            <ArrowUpIcon />
            <span className="sr-only">Send</span>
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
};

export const DegreeAndColor: Story = {
  name: "Degree & Color",
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Spinner degree="slow" aria-label="Slow" />
        <span className="text-sm text-muted-foreground">Slow (800ms)</span>
      </div>
      <div className="flex items-center gap-4">
        <Spinner degree="normal" aria-label="Normal" />
        <span className="text-sm text-muted-foreground">Normal (600ms)</span>
      </div>
      <div className="flex items-center gap-4">
        <Spinner degree="fast" aria-label="Fast" />
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
        <Spinner icon={Loader2} aria-label="Custom Loader icon from DS" />
        <span className="text-sm text-muted-foreground">
          Using <code>Loader2</code> icon from <code>@/components/icons</code>
        </span>
      </div>
      <div className="flex items-center gap-4">
        <Spinner icon={LoaderIcon} aria-label="Custom LoaderIcon from lucide" />
        <span className="text-sm text-muted-foreground">
          Using <code>LoaderIcon</code> from <code>lucide-react</code>
        </span>
      </div>
    </div>
  ),
};
