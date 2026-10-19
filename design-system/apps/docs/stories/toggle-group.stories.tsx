import type { Meta, StoryObj } from "@storybook/react-vite";

import { Bold, Italic, Underline } from "@grupoitss/prizm-ui/icons";

import { ToggleGroup } from "@grupoitss/prizm-ui/toggle-group";
import type { ToggleGroupItemOption } from "@grupoitss/prizm-ui/toggle-group";

const meta: Meta<typeof ToggleGroup> = {
  title: "Primários/ToggleGroup",
  component: ToggleGroup,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "API preferencial **por props** (sem subcomponentes). Base: [shadcn/ui](https://ui.shadcn.com) + Radix, com tokens PRIZM.\n\n" +
          "Grupo de toggles do design system PRIZM, baseado em Radix ToggleGroup.\n\n" +
          "**API principal por props (recomendada):** use as props `type`, `items`, `value`, `defaultValue` e `onValueChange` para controlar o estado, sem necessidade de subcomponentes.\n\n" +
          'Exemplo: `<ToggleGroup type="multiple" items={[{ value: "bold", icon: <Bold /> }]}/>`\n\n' +
          '**Documentação:** <a href="https://ui.shadcn.com/docs/components/toggle-group" target="_blank" rel="noopener noreferrer">Toggle Group — shadcn/ui</a>',
      },
    },
  },
  args: {
    type: "multiple",
    spacing: 1,
    orientation: "horizontal",
    variant: "default",
    size: "default",
  },
  argTypes: {
    type: { control: "inline-radio", options: ["single", "multiple"] },
    spacing: { control: "select", options: [0, 1, 2, 3, 4, 5, 6, 8] },
    orientation: { control: "inline-radio", options: ["horizontal", "vertical"] },
    variant: { control: "select", options: ["default", "outline"] },
    size: { control: "select", options: ["sm", "default", "lg"] },
  },
};

export default meta;

type Story = StoryObj<typeof ToggleGroup>;

const formattingItems: ToggleGroupItemOption[] = [
  {
    value: "bold",
    icon: <Bold className="size-4" />,
    ariaLabel: "Negrito",
  },
  {
    value: "italic",
    icon: <Italic className="size-4" />,
    ariaLabel: "Itálico",
  },
  {
    value: "underline",
    icon: <Underline className="size-4" />,
    ariaLabel: "Sublinhado",
  },
];

// 1. Demo — grupo múltiplo com ícones
export const Demo: Story = {
  render: (args) => <ToggleGroup {...args} items={formattingItems} />,
};

// 2. Outline — grupo single com labels de texto
export const Outline: Story = {
  render: (args) => (
    <ToggleGroup
      {...args}
      type="single"
      variant="outline"
      defaultValue="all"
      items={[
        { value: "all", label: "All", ariaLabel: "Mostrar todos" },
        { value: "missed", label: "Missed", ariaLabel: "Mostrar perdidos" },
      ]}
    />
  ),
};

// 3. Sizes — variação de tamanhos via prop `size`
export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <ToggleGroup
        {...args}
        type="single"
        size="sm"
        variant="outline"
        defaultValue="top"
        items={[
          { value: "top", label: "Top", ariaLabel: "Top" },
          { value: "bottom", label: "Bottom", ariaLabel: "Bottom" },
          { value: "left", label: "Left", ariaLabel: "Left" },
          { value: "right", label: "Right", ariaLabel: "Right" },
        ]}
      />
      <ToggleGroup
        {...args}
        type="single"
        size="default"
        variant="outline"
        defaultValue="top"
        items={[
          { value: "top", label: "Top", ariaLabel: "Top" },
          { value: "bottom", label: "Bottom", ariaLabel: "Bottom" },
          { value: "left", label: "Left", ariaLabel: "Left" },
          { value: "right", label: "Right", ariaLabel: "Right" },
        ]}
      />
    </div>
  ),
};

// 4. Spacing & Orientation — usando `spacing` e `orientation`
export const SpacingAndOrientation: Story = {
  render: (args) => (
    <ToggleGroup
      {...args}
      type="multiple"
      spacing={2}
      orientation="vertical"
      defaultValue={["bold", "italic"]}
      items={formattingItems}
    />
  ),
};
