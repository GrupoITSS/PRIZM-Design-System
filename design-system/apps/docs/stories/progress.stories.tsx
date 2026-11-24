import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Field, FieldLabel } from "@grupoitss/prizm-ui/field";
import { Progress } from "@grupoitss/prizm-ui/progress";

const FIGMA_URL = "https://www.figma.com/design/7NPb3iuxjitMdpudp4yHTl?node-id=28105-1950";
const FIGMA_DOC_URL = "https://www.figma.com/design/7NPb3iuxjitMdpudp4yHTl?node-id=28116-2372";
const CMS_URL =
  "https://sgq.pas.app.br/cms/prizm_design_system/articles?articleId=3dfaefd7-e84f-437d-8d93-74f6cae77876&version=v1";

const meta: Meta<typeof Progress> = {
  title: "Primários/Progress",
  component: Progress,
  tags: ["autodocs", "documentado"],
  parameters: {
    docs: {
      description: {
        component:
          "Barra que mostra quanto de uma tarefa já foi feito, de 0 a 100%. API por props, sem subcomponentes. Base: [shadcn/ui](https://ui.shadcn.com/docs/components/radix/progress) + Radix, com tokens PRIZM.\n\n" +
          "Dê nome à barra com `aria-label` ou `aria-labelledby`. O status é o que o produto disser: chegar a 100% não vira `success` sozinho. Quando o valor importa, mostre o número em texto ao lado. Sem valor conhecido, use o Spinner.\n\n" +
          `[Componente no Figma](${FIGMA_URL}) · [Documentação no Figma](${FIGMA_DOC_URL}) · [Artigo no CMS](${CMS_URL}).`,
      },
    },
  },
  args: {
    value: 50,
    size: "md",
    status: "default",
    "aria-label": "Envio de relatorio.pdf",
  },
  argTypes: {
    value: {
      control: { type: "number", min: 0, max: 100 },
      description: "Valor atual, de 0 a 100. Fora disso, vai para a ponta mais próxima.",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Altura da barra: 4, 8 ou 12px.",
    },
    status: {
      control: "select",
      options: ["default", "success", "warning", "error"],
      description: "Status da barra, decidido pelo produto. `info` é apelido obsoleto de `default`.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Basic: Story = { name: "Básico" };

export const Sizes: Story = {
  name: "Tamanhos",
  render: (args) => (
    <div className="flex w-64 flex-col gap-4">
      <Progress {...args} size="sm" value={25} aria-label="Barra sm" />
      <Progress {...args} size="md" value={50} aria-label="Barra md" />
      <Progress {...args} size="lg" value={75} aria-label="Barra lg" />
    </div>
  ),
};

export const StatusVariants: Story = {
  name: "Status",
  render: () => (
    <div className="flex w-full max-w-sm flex-col gap-4">
      {(
        [
          ["default", 60, "Default"],
          ["success", 100, "Success"],
          ["warning", 80, "Warning"],
          ["error", 40, "Error"],
        ] as const
      ).map(([status, value, label]) => (
        <div key={status} className="space-y-1">
          <span id={`status-${status}`} className="text-xs text-muted-foreground">
            {label}
          </span>
          <Progress value={value} status={status} aria-labelledby={`status-${status}`} />
        </div>
      ))}
    </div>
  ),
};

/**
 * Rótulo e valor com o Field. O texto do rótulo nomeia a barra por `aria-labelledby` (o valor
 * fica fora do nome, porque o leitor de tela já lê o valor da barra). `htmlFor` só funciona com
 * campos de formulário e não dá nome a uma barra.
 */
export const WithLabelField: Story = {
  name: "Com rótulo e valor",
  render: () => (
    <Field className="w-full max-w-sm">
      <FieldLabel>
        <span id="rotulo-envio">Envio de relatorio.pdf</span>
        <span className="ml-auto text-xs text-muted-foreground">66%</span>
      </FieldLabel>
      <Progress value={66} aria-labelledby="rotulo-envio" />
    </Field>
  ),
};

/** Contador "x/y" à esquerda e porcentagem à direita, como no Processamento. */
export const WithCountAndPercent: Story = {
  name: "Com contador e porcentagem",
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
        <span className="w-10 shrink-0 text-right text-xs font-medium text-foreground">{percent}%</span>
      </div>
    );
  },
};

/**
 * O valor sobe até 100% e a barra continua em `default`. Só depois que o produto confirma
 * (aqui, meio segundo depois), o status passa a `success`.
 */
export const ProductConfirmsSuccess: Story = {
  name: "Produto confirma o sucesso",
  render: function Render() {
    const [value, setValue] = React.useState(0);
    const [confirmed, setConfirmed] = React.useState(false);

    React.useEffect(() => {
      const id = setInterval(() => setValue((prev) => Math.min(100, prev + 5)), 200);
      return () => clearInterval(id);
    }, []);

    React.useEffect(() => {
      if (value < 100) return;
      const id = setTimeout(() => setConfirmed(true), 500);
      return () => clearTimeout(id);
    }, [value]);

    return (
      <div className="flex w-full max-w-sm flex-col gap-2">
        <Progress value={value} status={confirmed ? "success" : "default"} aria-label="Envio" />
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{value}%</span>
          <span>{confirmed ? "Envio confirmado" : "Enviando…"}</span>
        </div>
      </div>
    );
  },
};

/** Valor controlado por um range nativo. */
export const ControlledWithRange: Story = {
  name: "Controlado",
  render: function Render() {
    const [value, setValue] = React.useState(50);

    return (
      <div className="flex w-full max-w-sm flex-col gap-4">
        <Progress value={value} aria-label="Valor controlado" />
        <div className="flex items-center gap-3">
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={value}
            aria-label="Valor"
            onChange={(event) => setValue(Number(event.target.value))}
            className="flex-1"
          />
          <span className="w-10 text-right text-xs text-muted-foreground">{value}%</span>
        </div>
      </div>
    );
  },
};
