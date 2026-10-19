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
