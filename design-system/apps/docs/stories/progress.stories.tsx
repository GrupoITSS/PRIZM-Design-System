import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Field, FieldLabel } from "@grupoitss/prizm-ui/field";
import { Progress } from "@grupoitss/prizm-ui/progress";

const meta: Meta<typeof Progress> = {
  title: "Primários/Progress",
  component: Progress,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "API preferencial **por props** (sem subcomponentes). Base: [shadcn/ui](https://ui.shadcn.com) + Radix, com tokens PRIZM.\n\n" +
          "Barra de progresso linear do design system PRIZM. Uso recomendado via API simplificada: `<Progress value={50} />`.\n\n" +
          "**Documentação e API de referência:** " +
          '<a href="https://ui.shadcn.com/docs/components/radix/progress" target="_blank" rel="noopener noreferrer">' +
          "Progress — shadcn/ui (Radix)" +
          "</a>",
      },
    },
  },
  args: {
    value: 50,
    size: "md",
  },
  argTypes: {
    value: {
      control: { type: "number", min: 0, max: 100 },
      description: "Valor atual de progresso (0–100). Valores fora do range são clampados.",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Tamanho da barra de progresso.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Basic: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex w-64 flex-col gap-4">
      <Progress {...args} size="sm" value={25} aria-label="Progress small" />
      <Progress {...args} size="md" value={50} aria-label="Progress medium" />
      <Progress {...args} size="lg" value={75} aria-label="Progress large" />
    </div>
  ),
};

export const DynamicValue: Story = {
  args: {
    value: 70,
  },
};

/**
 * Exemplo controlado com efeito: começa em 13% e vai para 66% após 500ms.
 * Equivalente ao `ProgressDemo` do arquivo de referência.
 */
export const WithEffectDemo: Story = {
  render: function Render() {
    const [progress, setProgress] = React.useState(13);

    React.useEffect(() => {
      const timer = setTimeout(() => setProgress(66), 500);
      return () => clearTimeout(timer);
    }, []);

    return (
      <div className="flex w-full max-w-xs flex-col gap-4">
        <Progress value={progress} className="w-[60%]" />
        <span className="text-xs text-muted-foreground">Progresso: {progress}%</span>
      </div>
    );
  },
};

/**
 * Progress com label e valor ao lado, usando o componente `Field` do design system.
 * Equivalente ao `ProgressWithLabel` do arquivo de referência.
 */
export const WithLabelField: Story = {
  render: () => (
    <Field className="w-full max-w-sm">
      <FieldLabel htmlFor="progress-upload">
        <span>Upload progress</span>
        <span className="ml-auto text-xs text-muted-foreground">66%</span>
      </FieldLabel>
      <Progress value={66} id="progress-upload" />
    </Field>
  ),
};

/**
 * Progress controlado por um input range nativo (slider simples).
 * Equivalente ao `ProgressControlled` do arquivo de referência, mas sem depender
 * de um componente `Slider` ainda não exposto no design system.
 */
export const ControlledWithRange: Story = {
  render: function Render() {
    const [value, setValue] = React.useState(50);

    return (
      <div className="flex w-full max-w-sm flex-col gap-4">
        <Progress value={value} />
        <div className="flex items-center gap-3">
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={value}
            onChange={(event) => setValue(Number(event.target.value))}
            className="flex-1"
          />
          <span className="w-10 text-right text-xs text-muted-foreground">{value}%</span>
        </div>
      </div>
    );
  },
};

/**
 * Demonstração com animação contínua de 0 até 100%, mudando a cor para "success"
 * quando chega em 100%. Mostra bem o comportamento de status automático.
 */
export const AnimatedFromZeroToHundred: Story = {
  render: function Render() {
    const [value, setValue] = React.useState(0);

    React.useEffect(() => {
      const id = setInterval(() => {
        setValue((prev) => {
          if (prev >= 100) {
            return 100;
          }
          return prev + 5;
        });
      }, 300);

      return () => clearInterval(id);
    }, []);

    return (
      <div className="flex w-full max-w-sm flex-col gap-3">
        <Progress value={value} />
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Valor atual: {value}%</span>
          <span>Status: {value === 100 ? "success (barra verde)" : "info (barra padrão)"}</span>
        </div>
      </div>
    );
  },
};

/**
 * Exemplos explícitos de status para mostrar as cores:
 * info, success, warning, error.
 */
export const StatusVariants: Story = {
  render: () => (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <div className="space-y-1">
        <span className="text-xs text-muted-foreground">Info</span>
        <Progress value={60} status="info" />
      </div>
      <div className="space-y-1">
        <span className="text-xs text-muted-foreground">Success</span>
        <Progress value={100} status="success" />
      </div>
      <div className="space-y-1">
        <span className="text-xs text-muted-foreground">Warning</span>
        <Progress value={80} status="warning" />
      </div>
      <div className="space-y-1">
        <span className="text-xs text-muted-foreground">Error</span>
        <Progress value={40} status="error" />
      </div>
    </div>
  ),
};

/**
 * Layout com contador "x/y" à esquerda e porcentagem à direita,
 * conforme o design de "Processamento" no Figma.
 */
export const WithCountAndPercent: Story = {
  render: function Render() {
    const current = 24;
    const total = 60;
    const percent = Math.round((current / total) * 100);

    return (
      <div className="flex w-full max-w-sm items-center gap-2">
        <span className="shrink-0 text-xs font-medium text-foreground">
          {current}/{total}
        </span>
        <Progress value={percent} aria-label="Processamento" className="flex-1" />
        <span className="shrink-0 w-10 text-right text-xs font-medium text-foreground">
          {percent}%
        </span>
      </div>
    );
  },
};
