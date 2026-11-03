import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@grupoitss/prizm-ui/field";
import { RadioGroup, RadioGroupItem } from "@grupoitss/prizm-ui/radio-group";
import type { RadioGroupOption } from "@grupoitss/prizm-ui/radio-group";

const FIGMA_COMPONENT = "https://www.figma.com/design/7NPb3iuxjitMdpudp4yHTl?node-id=65-326";
const FIGMA_DOC = "https://www.figma.com/design/7NPb3iuxjitMdpudp4yHTl?node-id=25852-3524";
const CMS_ARTICLE =
  "https://sgq.pas.app.br/cms/prizm_design_system/articles?articleId=2e856b5c-4d78-463d-b168-e5c09b90a5ce&version=v1";

const meta: Meta<typeof RadioGroup> = {
  title: "Primários/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs", "documentado"],
  parameters: {
    docs: {
      description: {
        component:
          `[Componente no Figma](${FIGMA_COMPONENT}) · [Documentação no Figma](${FIGMA_DOC}) · [Artigo no CMS](${CMS_ARTICLE})\n\n` +
          "API preferencial **por props** (sem subcomponentes). Base: [shadcn/ui](https://ui.shadcn.com) + Radix, com tokens PRIZM.\n\n" +
          "Grupo de botões de opção (radio) do design system PRIZM: escolha única entre poucas opções, todas visíveis.\n\n" +
          "- **API por props:** `items`, `value`, `defaultValue` e `onValueChange`.\n" +
          "- **Composição:** sem `items`, passe `RadioGroupItem` com `Field` e `FieldLabel` para cartão, descrição ou erro.\n" +
          "- O grupo precisa de nome: `aria-label`, ou `aria-labelledby` apontando para a legenda.\n\n" +
          '**Documentação:** <a href="https://ui.shadcn.com/docs/components/radio-group" target="_blank" rel="noopener noreferrer">Radio Group — shadcn/ui</a>',
      },
    },
  },
  args: {
    "aria-label": "Densidade",
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
    disabled: { control: "boolean" },
    "aria-invalid": { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

const densidade: RadioGroupOption[] = [
  { value: "padrao", label: "Padrão" },
  { value: "confortavel", label: "Confortável" },
  { value: "compacto", label: "Compacto" },
];

export const Demo: Story = {
  render: (args) => <RadioGroup {...args} defaultValue="confortavel" items={densidade} />,
};

export const WithDescription: Story = {
  name: "Com descrição",
  render: (args) => (
    <RadioGroup
      {...args}
      defaultValue="confortavel"
      items={[
        { value: "padrao", label: "Padrão", description: "Espaçamento para a maioria dos casos." },
        { value: "confortavel", label: "Confortável", description: "Mais espaço entre os elementos." },
        { value: "compacto", label: "Compacto", description: "Menos espaço, para telas densas." },
      ]}
    />
  ),
};

export const ChoiceCard: Story = {
  name: "Em cartão",
  render: () => (
    <FieldSet className="max-w-sm">
      <FieldLegend id="plano-legenda" variant="label">
        Plano
      </FieldLegend>
      <RadioGroup aria-labelledby="plano-legenda" defaultValue="mensal">
        {[
          { value: "mensal", title: "Mensal", description: "Cobrança todo mês." },
          { value: "anual", title: "Anual", description: "Cobrança uma vez por ano." },
        ].map((p) => (
          <FieldLabel key={p.value} htmlFor={`plano-${p.value}`}>
            <Field orientation="horizontal">
              <RadioGroupItem id={`plano-${p.value}`} value={p.value} />
              <FieldContent>
                <FieldTitle>{p.title}</FieldTitle>
                <FieldDescription>{p.description}</FieldDescription>
              </FieldContent>
            </Field>
          </FieldLabel>
        ))}
      </RadioGroup>
    </FieldSet>
  ),
};

export const InvalidState: Story = {
  name: "Erro",
  render: () => (
    <FieldSet>
      <FieldLegend id="entrega-legenda" variant="label">
        Entrega
      </FieldLegend>
      <RadioGroup
        aria-labelledby="entrega-legenda"
        aria-invalid
        aria-describedby="entrega-erro"
        items={[
          { value: "retirada", label: "Retirar na loja" },
          { value: "casa", label: "Receber em casa" },
        ]}
      />
      <FieldError id="entrega-erro">Escolha uma forma de entrega.</FieldError>
    </FieldSet>
  ),
};

export const DisabledItems: Story = {
  name: "Desabilitado",
  render: (args) => (
    <RadioGroup
      {...args}
      defaultValue="opcao2"
      items={[
        { value: "opcao1", label: "Desabilitada", disabled: true },
        { value: "opcao2", label: "Opção 2" },
        { value: "opcao3", label: "Opção 3" },
      ]}
    />
  ),
};

export const HorizontalSpacing: Story = {
  name: "Horizontal",
  render: (args) => (
    <RadioGroup
      {...args}
      orientation="horizontal"
      spacing={4}
      defaultValue="confortavel"
      items={densidade}
    />
  ),
};

export const Controlled: Story = {
  name: "Controlado",
  render: function Render(args) {
    const [value, setValue] = React.useState<string>("email");

    return (
      <div className="flex flex-col gap-3">
        <RadioGroup
          {...args}
          aria-label="Aviso"
          value={value}
          onValueChange={setValue}
          items={[
            { value: "email", label: "Só e-mail" },
            { value: "sms", label: "Só SMS" },
            { value: "ambos", label: "E-mail e SMS" },
          ]}
        />
        <span className="text-xs text-muted-foreground">
          Selecionado: <strong>{value}</strong>
        </span>
      </div>
    );
  },
};
