import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { Bold, Italic, Pin } from "@grupoitss/prizm-ui/icons";
import { Toggle } from "@grupoitss/prizm-ui/toggle";

const meta: Meta<typeof Toggle> = {
  title: "Primários/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Botão que liga e desliga um estado, como negrito ou fixar. Fica ligado até o próximo clique (`aria-pressed`). Para várias opções de um mesmo assunto, use o ToggleGroup.\n\n" +
          "- Estado por props: `pressed`, `defaultPressed` e `onPressedChange`.\n" +
          "- Ligado em `primary`; hover em `accent`; anel de foco do Prizm.\n" +
          "- Toggle só de ícone precisa de `aria-label`. Com texto visível, não passe `aria-label`: o nome tem de conter o texto que a pessoa vê.\n\n" +
          '**Base:** <a href="https://ui.shadcn.com/docs/components/toggle" target="_blank" rel="noopener noreferrer">Toggle — shadcn/ui</a>',
      },
    },
  },
  args: {
    variant: "default",
    size: "default",
  },
  argTypes: {
    variant: { control: "inline-radio", options: ["default", "outline"] },
    size: { control: "inline-radio", options: ["sm", "default", "lg"] },
  },
};

export default meta;

type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  name: "Padrão",
  render: (args) => (
    <Toggle {...args}>
      <Bold />
      Negrito
    </Toggle>
  ),
};

/** Desligado e ligado, nas duas variantes. */
export const Variantes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-2">
      <Toggle {...args} variant="default">
        <Bold />
        Negrito
      </Toggle>
      <Toggle {...args} variant="default" defaultPressed>
        <Bold />
        Negrito
      </Toggle>
      <Toggle {...args} variant="outline">
        <Bold />
        Negrito
      </Toggle>
      <Toggle {...args} variant="outline" defaultPressed>
        <Bold />
        Negrito
      </Toggle>
    </div>
  ),
};

/** Só de ícone: quadrado, com `aria-label`. */
export const SoIcone: Story = {
  name: "Só ícone",
  render: (args) => (
    <div className="flex flex-wrap items-center gap-2">
      <Toggle {...args} variant="outline" aria-label="Negrito">
        <Bold />
      </Toggle>
      <Toggle {...args} variant="outline" aria-label="Itálico" defaultPressed>
        <Italic />
      </Toggle>
    </div>
  ),
};

/** Altura e largura mínima em `control-height`, como o Button. */
export const Tamanhos: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-2">
      <Toggle {...args} variant="outline" size="sm">
        Pequeno
      </Toggle>
      <Toggle {...args} variant="outline" size="default">
        Padrão
      </Toggle>
      <Toggle {...args} variant="outline" size="lg">
        Grande
      </Toggle>
      <Toggle {...args} variant="outline" size="sm" aria-label="Fixar">
        <Pin />
      </Toggle>
      <Toggle {...args} variant="outline" size="default" aria-label="Fixar">
        <Pin />
      </Toggle>
      <Toggle {...args} variant="outline" size="lg" aria-label="Fixar">
        <Pin />
      </Toggle>
    </div>
  ),
};

/** Controlado: o rótulo não muda; o estado aparece no fundo e em `aria-pressed`. */
export const Controlado: Story = {
  render: function Render(args) {
    const [fixado, setFixado] = React.useState(false);
    return (
      <div className="flex items-center gap-3">
        <Toggle {...args} variant="outline" pressed={fixado} onPressedChange={setFixado}>
          <Pin />
          Fixar
        </Toggle>
        <span className="text-sm text-muted-foreground">{fixado ? "Fixado no topo" : "Fora do topo"}</span>
      </div>
    );
  },
};

export const Desabilitado: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-2">
      <Toggle {...args} disabled>
        Negrito
      </Toggle>
      <Toggle {...args} disabled variant="outline">
        Negrito
      </Toggle>
    </div>
  ),
};
