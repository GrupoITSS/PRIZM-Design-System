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
          'Badge do design system PRIZM. Pequeno rótulo para status, contadores ou metadados.\n\nAs variantes são as do componente no Figma: `default`, `secondary`, `outline`, `destructive` e `verified`. `shape="number"` é o "Badge Number" do Figma.\n\n- `startIcon` / `endIcon` para ícones alinhados com `data-icon="inline-start"` / `"inline-end"`\n\nPara outras cores, use `className` com os tokens, como no exemplo "Custom Colors" da doc do shadcn.\n\n**Documentação base:** <a href="https://ui.shadcn.com/docs/components/radix/badge" target="_blank" rel="noopener noreferrer">Badge — shadcn/ui</a>',
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "outline", "destructive", "verified"],
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
      <Badge variant="verified" startIcon={<CheckCircle />}>
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

// Colors outside the Figma variants come from the tokens via className
// (<tone> + <tone>-foreground, or the soft <tone>-weak + <tone>-strong). They follow the brand
// and the mode.
export const CustomColorsWithClassName: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default" className="bg-success text-success-foreground hover:bg-success/80">
        Success
      </Badge>
      <Badge variant="default" className="bg-warning text-warning-foreground hover:bg-warning/80">
        Warning
      </Badge>
      <Badge variant="default" className="bg-info-weak text-info-strong">
        Info
      </Badge>
      <Badge variant="default" className="bg-success-weak text-success-strong">
        Success
      </Badge>
      <Badge variant="default" className="bg-warning-weak text-warning-strong">
        Warning
      </Badge>
      <Badge variant="default" className="bg-destructive-weak text-destructive-strong">
        Destructive
      </Badge>
    </div>
  ),
};
