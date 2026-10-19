import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from "@grupoitss/prizm-ui/avatar";
import { Select } from "@grupoitss/prizm-ui/select";

const meta: Meta<typeof Select> = {
  title: "Primários/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "API preferencial **por props** (sem subcomponentes). Base: [shadcn/ui](https://ui.shadcn.com) + Radix, com tokens PRIZM.\n\n" +
          'Select do design system PRIZM com API **100% baseada em props** (sem subcomponentes). Internamente usa Radix `Select` para acessibilidade e comportamento, mas a composição é totalmente encapsulada.\n\nUso recomendado:\n\n```tsx\nconst options = [\n  { value: "apple", label: "Apple" },\n  { value: "banana", label: "Banana" },\n  { value: "orange", label: "Orange" },\n];\n\n<Select\n  placeholder="Selecione uma fruta"\n  value={value}\n  onChange={setValue}\n  options={options}\n/>\n```\n\n**Documentação de referência (Radix/shadcn):** <a href="https://ui.shadcn.com/docs/components/radix/select" target="_blank" rel="noopener noreferrer">Select — shadcn/ui (Radix)</a>',
      },
    },
  },
  args: {
    size: "default",
    placeholder: "Selecione uma opção",
    options: [
      { value: "apple", label: "Apple" },
      { value: "banana", label: "Banana" },
      { value: "orange", label: "Orange" },
    ],
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "default", "lg"],
    },
    placeholder: {
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Basic: Story = {
  render: (args) => <Select {...args} />,
};

export const WithLabel: Story = {
  args: {
    label: "Organização",
    placeholder: "Selecione uma organização",
  },
  render: (args) => <Select {...args} />,
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => <Select {...args} />,
};

export const ManyOptions: Story = {
  render: (args) => (
    <Select
      {...args}
      options={Array.from({ length: 20 }).map((_, index) => ({
        value: `option-${index + 1}`,
        label: `Opção ${index + 1}`,
      }))}
      placeholder="Selecione uma opção (lista longa)"
    />
  ),
};

export const WithAvatarOptions: Story = {
  parameters: {
    docs: {
      description: {
        story: "Exemplo de uso do `Select` com avatars nas opções, usando a prop `startContent`.",
      },
    },
  },
  render: (args) => (
    <Select
      {...args}
      placeholder="Selecione um assistente"
      options={[
        {
          value: "manu",
          label: "Manu",
          startContent: (
            <Avatar size="sm" src="https://github.com/shadcn.png" alt="Manu" fallback="M" />
          ),
        },
        {
          value: "aura",
          label: "Aura",
          startContent: (
            <Avatar
              size="sm"
              src="https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?&w=128&h=128&dpr=2&q=80"
              alt="Aura"
              fallback="A"
            />
          ),
        },
        {
          value: "logika",
          label: "Logika",
          startContent: (
            <Avatar
              size="sm"
              src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?&w=128&h=128&dpr=2&q=80"
              alt="Logika"
              fallback="L"
            />
          ),
        },
      ]}
    />
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Select {...args} size="sm" placeholder="Tamanho sm" />
      <Select {...args} size="default" placeholder="Tamanho default" />
      <Select {...args} size="lg" placeholder="Tamanho lg" />
    </div>
  ),
};
