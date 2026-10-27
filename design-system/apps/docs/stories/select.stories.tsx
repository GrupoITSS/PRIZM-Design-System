import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from "@grupoitss/prizm-ui/avatar";
import { Select } from "@grupoitss/prizm-ui/select";
import { EstadosGrade } from "./_estados";

// Traceability: the component set in [PRIZM] Componentes, its documentation
// frame and the CMS article. The token map lives next to the component
// (select.tokens.json) and is checked against the classes in a test.
const FIGMA_URL = "https://www.figma.com/design/7NPb3iuxjitMdpudp4yHTl?node-id=345-11530";
const FIGMA_DOC_URL = "https://www.figma.com/design/7NPb3iuxjitMdpudp4yHTl?node-id=25389-2241";
const CMS_URL =
  "https://sgq.pas.app.br/cms/prizm_design_system/articles?articleId=0f1ab357-c2a5-4bc4-b568-67b715331ac8&version=v1";

const meta: Meta<typeof Select> = {
  title: "Primários/Select",
  component: Select,
  tags: ["autodocs", "documentado"],
  parameters: {
    docs: {
      description: {
        component:
          "API preferencial **por props** (sem subcomponentes). Base: [shadcn/ui](https://ui.shadcn.com) + Radix, com tokens PRIZM.\n\n" +
          'Select do design system PRIZM com API **100% baseada em props** (sem subcomponentes). Internamente usa Radix `Select` para acessibilidade e comportamento, mas a composição é totalmente encapsulada.\n\nUso recomendado:\n\n```tsx\nconst options = [\n  { value: "apple", label: "Apple" },\n  { value: "banana", label: "Banana" },\n  { value: "orange", label: "Orange" },\n];\n\n<Select\n  placeholder="Selecione uma fruta"\n  value={value}\n  onChange={setValue}\n  options={options}\n/>\n```\n\n' +
          `[Componente no Figma](${FIGMA_URL}) · [Documentação no Figma](${FIGMA_DOC_URL}) · [Artigo no CMS](${CMS_URL}).\n\n` +
          '**Documentação de referência (Radix/shadcn):** <a href="https://ui.shadcn.com/docs/components/radix/select" target="_blank" rel="noopener noreferrer">Select — shadcn/ui (Radix)</a>',
      },
    },
  },
  args: {
    size: "md",
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
      options: ["sm", "md", "lg"],
    },
    placeholder: {
      control: "text",
    },
    label: {
      control: "text",
    },
    disabled: {
      control: "boolean",
    },
    loading: {
      control: "boolean",
    },
    required: {
      control: "boolean",
    },
    "aria-invalid": {
      control: "boolean",
    },
    hideCheckIcon: {
      control: "boolean",
    },
    align: {
      control: "select",
      options: ["start", "center", "end"],
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
      <Select {...args} size="md" placeholder="Tamanho md" />
      <Select {...args} size="lg" placeholder="Tamanho lg" />
    </div>
  ),
};

const opcoesEstados = [
  { value: "pas", label: "Organização Prizm" },
  { value: "docnix", label: "Docnix" },
];

/**
 * Os 7 estados do Figma lado a lado. Os de foco usam o foco forçado pelo
 * storybook-addon-pseudo-states; a lista aberta usa o mesmo anel do foco.
 */
export const Estados: Story = {
  parameters: {
    pseudo: {
      focusVisible: ["#select-estado-focus", "#select-estado-filled-focus", "#select-estado-erro-focus"],
    },
    controls: { disable: true },
  },
  render: () => (
    <EstadosGrade
      estados={[
        { nome: "Default", gatilho: "sem valor, fechado", campo: <Select aria-label="Default" placeholder="Placeholder" options={opcoesEstados} /> },
        { nome: "Focus", gatilho: ":focus-visible ou lista aberta", campo: <Select id="select-estado-focus" aria-label="Focus" placeholder="Placeholder" options={opcoesEstados} /> },
        { nome: "Filled", gatilho: "com value", campo: <Select aria-label="Filled" value="pas" options={opcoesEstados} /> },
        { nome: "Filled (Focus)", gatilho: "com value + foco", campo: <Select id="select-estado-filled-focus" aria-label="Filled (Focus)" value="pas" options={opcoesEstados} /> },
        { nome: "Disabled", gatilho: "disabled", campo: <Select aria-label="Disabled" disabled value="pas" options={opcoesEstados} /> },
        { nome: "Error", gatilho: "aria-invalid", campo: <Select aria-label="Error" aria-invalid placeholder="Placeholder" options={opcoesEstados} /> },
        { nome: "Error (Focus)", gatilho: "aria-invalid + foco", campo: <Select id="select-estado-erro-focus" aria-label="Error (Focus)" aria-invalid placeholder="Placeholder" options={opcoesEstados} /> },
      ]}
    />
  ),
};
