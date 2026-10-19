import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Slider } from "@grupoitss/prizm-ui/slider";

const meta: Meta<typeof Slider> = {
  title: "Primários/Slider",
  component: Slider,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "API preferencial **por props** (sem subcomponentes). Base: [shadcn/ui](https://ui.shadcn.com) + Radix, com tokens PRIZM.\n\n" +
          "Slider do design system PRIZM. Controle de valor contínuo com API simplificada por props (`value`, `defaultValue`, `onValueChange`).\n\n" +
          "Uso recomendado: `<Slider defaultValue={20} onValueChange={(v) => ...} />`.\n\n" +
          "**Documentação base:** " +
          '<a href="https://ui.shadcn.com/docs/components/slider" target="_blank" rel="noopener noreferrer">Slider — shadcn/ui</a>',
      },
    },
  },
  args: {
    defaultValue: 40,
    min: 0,
    max: 100,
    step: 1,
  },
};

export default meta;

type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  render: (args) => <Slider {...args} />,
};

export const Controlled: Story = {
  render: function Render() {
    const [value, setValue] = React.useState(30);

    return (
      <div className="flex flex-col gap-2">
        <Slider value={value} onValueChange={setValue} min={0} max={100} step={1} />
        <span className="text-sm text-muted-foreground">Valor: {value}</span>
      </div>
    );
  },
};

export const RangeAdvanced: Story = {
  render: function Render() {
    const [values, setValues] = React.useState<number[]>([20, 80]);

    return (
      <div className="flex flex-col gap-2">
        <Slider values={values} onValuesChange={setValues} min={0} max={100} />
        <span className="text-sm text-muted-foreground">
          Intervalo: {values[0]} - {values[1]}
        </span>
      </div>
    );
  },
};
