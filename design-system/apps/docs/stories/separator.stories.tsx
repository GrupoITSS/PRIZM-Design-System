import type { Meta, StoryObj } from "@storybook/react-vite";
import { Separator } from "@grupoitss/prizm-ui/separator";

const meta: Meta<typeof Separator> = {
  title: "Primários/Separator",
  component: Separator,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "API preferencial **por props** (sem subcomponentes). Base: [shadcn/ui](https://ui.shadcn.com) + Radix, com tokens PRIZM.\n\n" +
          "Separator do design system PRIZM. Separa visualmente seções de conteúdo.\n\n" +
          '**Documentação base:** <a href="https://ui.shadcn.com/docs/components/radix/separator" target="_blank" rel="noopener noreferrer">Separator — shadcn/ui (Radix)</a>',
      },
    },
  },
  args: {
    orientation: "horizontal",
    decorative: true,
  },
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
    decorative: {
      control: "boolean",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Separator>;

export const Horizontal: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <div>Section 1</div>
      <Separator {...args} />
      <div>Section 2</div>
    </div>
  ),
};

export const Vertical: Story = {
  render: (args) => (
    <div className="flex h-16 items-center gap-4">
      <span>Item 1</span>
      <Separator {...args} orientation="vertical" />
      <span>Item 2</span>
    </div>
  ),
};

/**
 * Semântico: `decorative={false}` anuncia a linha como `role="separator"`. Use quando a linha separa
 * grupos que o leitor de tela precisa perceber; no resto, o padrão (decorativo) basta.
 */
export const Semantic: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Com `decorative={false}`, a linha sai com `role="separator"`. O padrão é decorativo (`role="none"`): a separação já vem do título e do espaço.',
      },
    },
  },
  args: { decorative: false },
  render: (args) => (
    <div className="flex w-full max-w-md flex-col gap-3 text-sm">
      <div>
        <p className="font-medium">Account</p>
        <p className="text-muted-foreground">Name, e-mail and password.</p>
      </div>
      <Separator {...args} />
      <div>
        <p className="font-medium">Preferences</p>
        <p className="text-muted-foreground">Language and notifications.</p>
      </div>
    </div>
  ),
};
