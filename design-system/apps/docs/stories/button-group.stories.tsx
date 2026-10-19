import { ButtonGroup } from "@grupoitss/prizm-ui/button-group";
import { Plus, Search, Trash2 } from "@grupoitss/prizm-ui/icons";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof ButtonGroup> = {
  title: "Primários/ButtonGroup",
  component: ButtonGroup,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "API preferencial **por props** (sem subcomponentes). Base: [shadcn/ui](https://ui.shadcn.com) + Radix, com tokens PRIZM.\n\n" +
          "ButtonGroup do design system PRIZM. **Uso recomendado: apenas via props** (`buttons`, `orientation`, `separatorBetween`, `text`, `aria-label`). " +
          "Agrupa botões com bordas compartilhadas e estilo consistente.\n\n" +
          "Subcomponentes (ButtonGroupSeparator, ButtonGroupText) existem apenas como escape hatch para composição avançada.\n\n" +
          "**Documentação base:** " +
          '<a href="https://ui.shadcn.com/docs/components/radix/button-group" target="_blank" rel="noopener noreferrer">Button Group — shadcn/ui (Radix)</a>',
      },
    },
  },
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
    separatorBetween: { control: "boolean" },
    "aria-label": { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof ButtonGroup>;

export const Default: Story = {
  args: {
    "aria-label": "Button group",
    buttons: [
      { label: "Button 1", onClick: () => {} },
      { label: "Button 2", onClick: () => {} },
    ],
  },
};

export const Orientation: Story = {
  parameters: {
    docs: {
      description: {
        story: "Use `orientation` para layout horizontal ou vertical.",
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-start gap-8">
      <div className="flex flex-col gap-2">
        <span className="text-muted-foreground text-sm">Horizontal</span>
        <ButtonGroup
          aria-label="Horizontal group"
          orientation="horizontal"
          buttons={[
            { label: "One", onClick: () => {} },
            { label: "Two", onClick: () => {} },
            { label: "Three", onClick: () => {} },
          ]}
        />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-muted-foreground text-sm">Vertical</span>
        <ButtonGroup
          aria-label="Vertical group"
          orientation="vertical"
          buttons={[
            { label: "One", onClick: () => {} },
            { label: "Two", onClick: () => {} },
            { label: "Three", onClick: () => {} },
          ]}
        />
      </div>
    </div>
  ),
};

export const Size: Story = {
  parameters: {
    docs: {
      description: {
        story: "Controle o tamanho dos botões via `buttons[].size`.",
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-6">
      <ButtonGroup
        aria-label="Small buttons"
        buttons={[
          { label: "XS", size: "xs", onClick: () => {} },
          { label: "SM", size: "sm", onClick: () => {} },
        ]}
      />
      <ButtonGroup
        aria-label="Default buttons"
        buttons={[
          { label: "Default", onClick: () => {} },
          { label: "Default", onClick: () => {} },
        ]}
      />
      <ButtonGroup
        aria-label="Large buttons"
        buttons={[
          { label: "LG", size: "lg", onClick: () => {} },
          { label: "LG", size: "lg", onClick: () => {} },
        ]}
      />
    </div>
  ),
};

export const Variants: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Cada botão pode ter sua própria `variant` em `buttons[]`. `default` agora é neutro e `primary` concentra o estilo principal (brand).",
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-4">
      <ButtonGroup
        aria-label="Default group"
        buttons={[
          { label: "Default", variant: "default", onClick: () => {} },
          { label: "Default", variant: "default", onClick: () => {} },
        ]}
      />
      <ButtonGroup
        aria-label="Outline group"
        buttons={[
          { label: "Outline", variant: "outline", onClick: () => {} },
          { label: "Outline", variant: "outline", onClick: () => {} },
        ]}
      />
      <ButtonGroup
        aria-label="Mixed group"
        buttons={[
          { label: "Primary", variant: "default", onClick: () => {} },
          { label: "Secondary", variant: "outline", onClick: () => {} },
          { label: "Ghost", variant: "ghost", onClick: () => {} },
        ]}
      />
    </div>
  ),
};

export const Separator: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use `separatorBetween` para separadores visuais entre botões (recomendado quando não for variant outline).",
      },
    },
  },
  render: () => (
    <ButtonGroup
      aria-label="Group with separators"
      separatorBetween
      buttons={[
        { label: "Button 1", variant: "default", onClick: () => {} },
        { label: "Button 2", variant: "default", onClick: () => {} },
        { label: "Button 3", variant: "default", onClick: () => {} },
      ]}
    />
  ),
};

export const WithText: Story = {
  parameters: {
    docs: {
      description: {
        story: "Use a prop `text` para exibir um label no início do grupo.",
      },
    },
  },
  render: () => (
    <ButtonGroup
      aria-label="Actions"
      text="Actions"
      buttons={[
        { label: "Save", onClick: () => {} },
        { label: "Cancel", variant: "outline", onClick: () => {} },
      ]}
    />
  ),
};

export const WithIcons: Story = {
  render: () => (
    <ButtonGroup
      aria-label="Actions with icons"
      buttons={[
        {
          label: "Add",
          icon: <Plus className="size-4" />,
          onClick: () => {},
        },
        {
          label: "Search",
          icon: <Search className="size-4" />,
          variant: "outline",
          onClick: () => {},
        },
        {
          label: "Delete",
          icon: <Trash2 className="size-4" />,
          variant: "destructive",
          onClick: () => {},
        },
      ]}
    />
  ),
};

export const Nested: Story = {
  parameters: {
    docs: {
      description: {
        story: "Dois ButtonGroups lado a lado (cada um com `buttons`).",
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <ButtonGroup
        aria-label="First group"
        buttons={[
          { label: "One", onClick: () => {} },
          { label: "Two", onClick: () => {} },
        ]}
      />
      <ButtonGroup
        aria-label="Second group"
        buttons={[
          { label: "Three", onClick: () => {} },
          { label: "Four", onClick: () => {} },
        ]}
      />
    </div>
  ),
};
