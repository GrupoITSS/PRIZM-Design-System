import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bookmark, Bold, Italic } from "@grupoitss/prizm-ui/icons";
import { Toggle } from "@grupoitss/prizm-ui/toggle";

const meta: Meta<typeof Toggle> = {
  title: "Primários/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "API preferencial **por props** (sem subcomponentes). Base: [shadcn/ui](https://ui.shadcn.com) + Radix, com tokens PRIZM.\n\n" +
          "Toggle do design system PRIZM, baseado em Radix Toggle.\n\n" +
          "**API por props (recomendada):** use `pressed`, `defaultPressed` e `onPressedChange` para controlar o estado. Não há subcomponentes; o uso é sempre direto via `<Toggle>`.\n\n" +
          "Exemplo: `<Toggle defaultPressed>Negrito</Toggle>`\n\n" +
          '**Documentação:** <a href="https://ui.shadcn.com/docs/components/toggle" target="_blank" rel="noopener noreferrer">Toggle — shadcn/ui</a>',
      },
    },
  },
  args: {
    variant: "default",
    size: "default",
  },
  argTypes: {
    variant: { control: "select", options: ["default", "outline"] },
    size: { control: "select", options: ["sm", "default", "lg"] },
  },
};

export default meta;

type Story = StoryObj<typeof Toggle>;

// 1. Demo — toggle simples com ícone e texto (bookmark)
export const Demo: Story = {
  render: (args) => (
    <Toggle
      {...args}
      className="group/toggle"
      aria-label="Toggle bookmark"
      size="sm"
      variant="outline"
    >
      <Bookmark className="size-4 group-data-[state=on]/toggle:fill-foreground" />
      Bookmark
    </Toggle>
  ),
};

// 2. Outline — grupo de toggles em outline (italic / bold)
export const OutlineGroup: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-2">
      <Toggle {...args} variant="outline" aria-label="Toggle italic">
        <Italic className="size-4" />
        Italic
      </Toggle>
      <Toggle {...args} variant="outline" aria-label="Toggle bold">
        <Bold className="size-4" />
        Bold
      </Toggle>
    </div>
  ),
};

// 3. WithText — toggle com ícone + texto
export const WithText: Story = {
  render: (args) => (
    <Toggle {...args} aria-label="Toggle italic">
      <Italic className="size-4" />
      Italic
    </Toggle>
  ),
};

// 4. Sizes — variação de tamanhos via prop `size`
export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-2">
      <Toggle {...args} variant="outline" size="sm" aria-label="Toggle small">
        Small
      </Toggle>
      <Toggle {...args} variant="outline" size="default" aria-label="Toggle default">
        Default
      </Toggle>
      <Toggle {...args} variant="outline" size="lg" aria-label="Toggle large">
        Large
      </Toggle>
    </div>
  ),
};

// 5. Disabled — estados desabilitados com e sem outline
export const Disabled: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-2">
      <Toggle {...args} disabled aria-label="Toggle disabled">
        Disabled
      </Toggle>
      <Toggle {...args} disabled variant="outline" aria-label="Toggle disabled outline">
        Disabled
      </Toggle>
    </div>
  ),
};
