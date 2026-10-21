import { Badge } from "@grupoitss/prizm-ui/badge";
import { CheckCircle, Link } from "@grupoitss/prizm-ui/icons";
import { Spinner } from "@grupoitss/prizm-ui/spinner";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Badge> = {
  title: "Primários/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "API preferencial **por props** (sem subcomponentes). Base: [shadcn/ui](https://ui.shadcn.com) + Radix, com tokens PRIZM.\n\n" +
          'Badge do design system PRIZM. Pequeno rótulo para status, contadores ou metadados.\n\nAPI baseada em shadcn/ui (`variant` + `className`) com helpers extras:\n- `startIcon` / `endIcon` para ícones alinhados com `data-icon="inline-start"` / `"inline-end"`\n\nPara cores totalmente customizadas, use diretamente `className`, como no exemplo "Custom Colors" da doc do shadcn.\n\n**Documentação base:** <a href="https://ui.shadcn.com/docs/components/radix/badge" target="_blank" rel="noopener noreferrer">Badge — shadcn/ui</a>',
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "primary",
        "secondary",
        "success",
        "warning",
        "info",
        "verified",
        "violet",
        "destructive",
        "outline",
      ],
    },
    appearance: {
      control: "select",
      options: ["contained", "outlined", "text"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    shape: {
      control: "select",
      options: ["default", "number"],
    },
    loading: {
      control: "boolean",
    },
    children: {
      control: "text",
    },
  },
  args: {
    variant: "default",
    size: "md",
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
      <Badge variant="primary">Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="violet">Violet</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
};

// "Verified" in Figma: the info tone with a check icon.
export const Verified: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="verified" startIcon={<CheckCircle />}>
        Verified
      </Badge>
      <Badge variant="verified" appearance="outlined" startIcon={<CheckCircle />}>
        Verified
      </Badge>
      <Badge variant="verified" appearance="text" startIcon={<CheckCircle />}>
        Verified
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

export const Appearances: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      {(["contained", "outlined", "text"] as const).map((appearance) => (
        <div key={appearance} className="flex flex-wrap gap-2">
          <Badge variant="primary" appearance={appearance}>
            Primary
          </Badge>
          <Badge variant="success" appearance={appearance}>
            Success
          </Badge>
          <Badge variant="warning" appearance={appearance}>
            Warning
          </Badge>
          <Badge variant="destructive" appearance={appearance}>
            Destructive
          </Badge>
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
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

export const WithIcon: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="secondary" startIcon={<CheckCircle className="size-3" />}>
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

// Soft tones from the tokens (<tom>-weak + <tom>-strong), instead of Tailwind's
// palette: they follow the brand and the mode.
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
      <Badge variant="default" className="bg-primary-weak text-primary-strong">
        Primary
      </Badge>
      <Badge variant="default" className="bg-destructive-weak text-destructive-strong">
        Destructive
      </Badge>
    </div>
  ),
};
