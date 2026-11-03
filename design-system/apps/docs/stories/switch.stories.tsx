import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@grupoitss/prizm-ui/field";
import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { Switch } from "@grupoitss/prizm-ui/switch";

const FIGMA_COMPONENT = "https://www.figma.com/design/7NPb3iuxjitMdpudp4yHTl?node-id=60-450";
const FIGMA_DOC = "https://www.figma.com/design/7NPb3iuxjitMdpudp4yHTl?node-id=25876-2405";

const meta: Meta<typeof Switch> = {
  title: "Primários/Switch",
  component: Switch,
  tags: ["autodocs", "documentado"],
  parameters: {
    docs: {
      description: {
        component:
          `[Componente no Figma](${FIGMA_COMPONENT}) · [Documentação no Figma](${FIGMA_DOC})\n\n` +
          "API preferencial **por props** (sem subcomponentes). Base: [shadcn/ui](https://ui.shadcn.com) + Radix, com tokens PRIZM.\n\n" +
          "Switch do design system PRIZM: liga ou desliga algo com efeito imediato.\n\n" +
          "- Controle com `checked`, `defaultChecked` e `onCheckedChange` (o `onChange` segue funcionando, obsoleto).\n" +
          "- Rótulo, descrição e erro por composição com `Field` e `FieldLabel`.\n" +
          "- O Switch precisa de nome: `FieldLabel` ligado pelo `id`, ou `aria-label`.\n\n" +
          '**Documentação de referência (Radix/shadcn):** <a href="https://ui.shadcn.com/docs/components/radix/switch" target="_blank" rel="noopener noreferrer">Switch — shadcn/ui (Radix)</a>',
      },
    },
  },
  args: {
    size: "default",
    disabled: false,
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "default", "lg"],
    },
    disabled: { control: "boolean" },
    "aria-invalid": { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Basic: Story = {
  render: function Render(args) {
    const [ativo, setAtivo] = React.useState(false);
    return <Switch {...args} checked={ativo} onCheckedChange={setAtivo} aria-label="Modo avião" />;
  },
};

export const WithLabel: Story = {
  name: "Com rótulo",
  render: function Render(args) {
    const [ativo, setAtivo] = React.useState(false);

    return (
      <Field orientation="horizontal" className="w-fit">
        <Switch {...args} checked={ativo} onCheckedChange={setAtivo} id="modo-aviao" />
        <FieldLabel htmlFor="modo-aviao">Modo avião</FieldLabel>
      </Field>
    );
  },
};

export const Sizes: Story = {
  name: "Tamanhos",
  render: (args) => (
    <FieldGroup className="w-fit">
      {(["sm", "default", "lg"] as const).map((size) => (
        <Field key={size} orientation="horizontal">
          <Switch {...args} id={`switch-${size}`} size={size} defaultChecked={size === "default"} />
          <FieldLabel htmlFor={`switch-${size}`}>Tamanho {size}</FieldLabel>
        </Field>
      ))}
    </FieldGroup>
  ),
};

export const Disabled: Story = {
  name: "Desabilitado",
  render: (args) => (
    <FieldGroup className="w-fit">
      <Field orientation="horizontal" data-disabled>
        <Switch {...args} id="switch-desligado" disabled />
        <FieldLabel htmlFor="switch-desligado">Desabilitado, desligado</FieldLabel>
      </Field>
      <Field orientation="horizontal" data-disabled>
        <Switch {...args} id="switch-ligado" disabled defaultChecked />
        <FieldLabel htmlFor="switch-ligado">Desabilitado, ligado</FieldLabel>
      </Field>
    </FieldGroup>
  ),
};

export const WithDescription: Story = {
  name: "Com descrição",
  render: function Render(args) {
    const [ativo, setAtivo] = React.useState(false);

    return (
      <Field orientation="horizontal" className="max-w-sm">
        <FieldContent>
          <FieldLabel htmlFor="switch-foco">Compartilhar entre aparelhos</FieldLabel>
          <FieldDescription>
            O modo foco vale em todos os aparelhos e desliga quando você sai do app.
          </FieldDescription>
        </FieldContent>
        <Switch {...args} id="switch-foco" checked={ativo} onCheckedChange={setAtivo} />
      </Field>
    );
  },
};

export const ChoiceCard: Story = {
  name: "Em cartão",
  render: function Render(args) {
    const [compartilhar, setCompartilhar] = React.useState(false);
    const [avisos, setAvisos] = React.useState(true);

    return (
      <FieldGroup className="w-full max-w-sm">
        <FieldLabel htmlFor="switch-compartilhar">
          <Field orientation="horizontal">
            <FieldContent>
              <FieldTitle>Compartilhar entre aparelhos</FieldTitle>
              <FieldDescription>O modo foco vale em todos os aparelhos.</FieldDescription>
            </FieldContent>
            <Switch
              {...args}
              id="switch-compartilhar"
              checked={compartilhar}
              onCheckedChange={setCompartilhar}
            />
          </Field>
        </FieldLabel>
        <FieldLabel htmlFor="switch-avisos">
          <Field orientation="horizontal">
            <FieldContent>
              <FieldTitle>Avisos</FieldTitle>
              <FieldDescription>Receber um aviso quando o modo foco mudar.</FieldDescription>
            </FieldContent>
            <Switch {...args} id="switch-avisos" checked={avisos} onCheckedChange={setAvisos} />
          </Field>
        </FieldLabel>
      </FieldGroup>
    );
  },
};

export const DisabledField: Story = {
  name: "Desabilitado no Field",
  render: (args) => (
    <Field orientation="horizontal" data-disabled className="w-fit">
      <Switch {...args} id="switch-field-desabilitado" disabled />
      <FieldLabel htmlFor="switch-field-desabilitado">Desabilitado</FieldLabel>
    </Field>
  ),
};

export const Invalid: Story = {
  name: "Erro",
  render: (args) => (
    <Field orientation="horizontal" className="max-w-sm" data-invalid>
      <FieldContent>
        <FieldLabel htmlFor="switch-termos">Aceito os termos de uso</FieldLabel>
        <FieldError id="switch-termos-erro">Aceite os termos para continuar.</FieldError>
      </FieldContent>
      <Switch {...args} id="switch-termos" aria-invalid aria-describedby="switch-termos-erro" />
    </Field>
  ),
};
