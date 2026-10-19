import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { RadioGroup } from "@grupoitss/prizm-ui/radio-group";
import type { RadioGroupOption } from "@grupoitss/prizm-ui/radio-group";

const meta: Meta<typeof RadioGroup> = {
  title: "Primários/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "API preferencial **por props** (sem subcomponentes). Base: [shadcn/ui](https://ui.shadcn.com) + Radix, com tokens PRIZM.\n\n" +
          "Grupo de botões de opção (radio) do design system PRIZM, baseado em Radix RadioGroup.\n\n" +
          "**API principal por props (recomendada):** use as props `items`, `value`, `defaultValue` e `onValueChange` para controlar o estado, sem necessidade de subcomponentes (`RadioGroupItem`).\n\n" +
          'Exemplo: `<RadioGroup items={[{ value: "default", label: "Default" }]} />`\n\n' +
          '**Documentação:** <a href="https://ui.shadcn.com/docs/components/radio-group" target="_blank" rel="noopener noreferrer">Radio Group — shadcn/ui</a>',
      },
    },
  },
  args: {
    orientation: "vertical",
    spacing: 2,
  },
  argTypes: {
    orientation: {
      control: "inline-radio",
      options: ["horizontal", "vertical"],
    },
    spacing: {
      control: "select",
      options: [0, 1, 2, 3, 4, 5, 6, 8],
    },
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

const comfortItems: RadioGroupOption[] = [
  { value: "default", label: "Default" },
  { value: "comfortable", label: "Comfortable" },
  { value: "compact", label: "Compact" },
];

// 1. Demo básico — equivalente ao RadioGroupDemo, mas 100% props-based
export const Demo: Story = {
  render: (args) => <RadioGroup {...args} defaultValue="comfortable" items={comfortItems} />,
};

// 2. Com descrição — equivalente a RadioGroupDescription usando `description`
export const WithDescription: Story = {
  render: (args) => (
    <RadioGroup
      {...args}
      defaultValue="comfortable"
      items={[
        {
          value: "default",
          label: "Default",
          description: "Standard spacing for most use cases.",
        },
        {
          value: "comfortable",
          label: "Comfortable",
          description: "More space between elements.",
        },
        {
          value: "compact",
          label: "Compact",
          description: "Minimal spacing for dense layouts.",
        },
      ]}
    />
  ),
};

// 3. Choice card-style — usa labels/descrições mais ricas, mas ainda via props
export const ChoiceCardLike: Story = {
  render: (args) => (
    <RadioGroup
      {...args}
      defaultValue="plus"
      items={[
        {
          value: "plus",
          label: "Plus",
          description: "For individuals and small teams.",
        },
        {
          value: "pro",
          label: "Pro",
          description: "For growing businesses.",
        },
        {
          value: "enterprise",
          label: "Enterprise",
          description: "For large teams and enterprises.",
        },
      ]}
    />
  ),
};

// 4. Disabled items — equivalente a RadioGroupDisabled
export const DisabledItems: Story = {
  render: (args) => (
    <RadioGroup
      {...args}
      defaultValue="option2"
      items={[
        {
          value: "option1",
          label: "Disabled",
          disabled: true,
        },
        {
          value: "option2",
          label: "Option 2",
        },
        {
          value: "option3",
          label: "Option 3",
        },
      ]}
    />
  ),
};

// 5. Orientação horizontal e espaçamento — inspirado nos exemplos de layout
export const HorizontalSpacing: Story = {
  render: (args) => (
    <RadioGroup
      {...args}
      orientation="horizontal"
      spacing={4}
      defaultValue="comfortable"
      items={comfortItems}
    />
  ),
};

// 6. Controlado externamente — demonstração de formulário controlado
export const Controlled: Story = {
  render: function Render(args) {
    const [value, setValue] = React.useState<string>("email");

    return (
      <div className="flex flex-col gap-3">
        <RadioGroup
          {...args}
          value={value}
          onValueChange={setValue}
          items={[
            { value: "email", label: "Email only" },
            { value: "sms", label: "SMS only" },
            { value: "both", label: "Both Email & SMS" },
          ]}
        />
        <span className="text-xs text-muted-foreground">
          Selected: <strong>{value}</strong>
        </span>
      </div>
    );
  },
};
