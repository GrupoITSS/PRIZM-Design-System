import { Button } from "@grupoitss/prizm-ui/button";
import { Field, FieldDescription, FieldLabel } from "@grupoitss/prizm-ui/field";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Textarea } from "@grupoitss/prizm-ui/textarea";
import { EstadosGrade } from "./_estados";

// Traceability: the component set in [PRIZM] Componentes, its documentation
// frame and the CMS article. The token map lives next to the component
// (textarea.tokens.json) and is checked against the classes in a test.
const FIGMA_URL = "https://www.figma.com/design/7NPb3iuxjitMdpudp4yHTl?node-id=183-74";
const FIGMA_DOC_URL = "https://www.figma.com/design/7NPb3iuxjitMdpudp4yHTl?node-id=25419-2501";
const CMS_URL =
  "https://sgq.pas.app.br/cms/prizm_design_system/articles?articleId=eb800a83-0027-43be-871d-94e91541b92b&version=v1";

const meta: Meta<typeof Textarea> = {
  title: "Primários/Textarea",
  component: Textarea,
  tags: ["autodocs", "documentado"],
  parameters: {
    docs: {
      description: {
        component:
          "API preferencial **por props** (sem subcomponentes). Base: [shadcn/ui](https://ui.shadcn.com) + Radix, com tokens PRIZM.\n\n" +
          "Textarea do design system PRIZM. Wrapper estilizado para o `<textarea />` nativo, com tamanhos (`size`) e tokens de cor alinhados ao tema PRIZM.\n\n" +
          "Esta página também demonstra exemplos de uso em conjunto com `Field`, baseados na documentação do shadcn/ui.\n\n" +
          "**Props adicionais PRIZM:**\n\n" +
          "- `expandable`: mostra o botão \"Expandir campo\", que abre o mesmo texto num Dialog grande. Padrão: `false`.\n" +
          "- `resizable`: controla se o textarea pode ser redimensionado pelo usuário (handle de resize na borda inferior). Padrão: `false`.\n" +
          "- `expandTitle`: título do Dialog de edição expandida. Padrão: `\"Editar texto\"`.\n" +
          "O estado de erro é controlado via atributo nativo `aria-invalid`, geralmente aplicado por libs de formulário (ex.: React Hook Form).\n\n" +
          `[Componente no Figma](${FIGMA_URL}) · [Documentação no Figma](${FIGMA_DOC_URL}) · [Artigo no CMS](${CMS_URL}).\n\n` +
          "**Documentação base:** " +
          '<a href="https://ui.shadcn.com/docs/components/radix/textarea" target="_blank" rel="noopener noreferrer">Textarea — shadcn/ui (Radix)</a>',
      },
    },
  },
  args: {
    placeholder: "Digite sua mensagem...",
    size: "md",
    disabled: false,
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    disabled: {
      control: "boolean",
    },
    resizable: {
      control: "boolean",
      description: "Controla se o textarea pode ser redimensionado pelo usuário. Padrão: false.",
    },
    expandable: {
      control: "boolean",
      description: "Quando verdadeiro, exibe um botão para expandir o conteúdo em um Dialog.",
    },
    expandTitle: {
      control: "text",
      description: "Título do Dialog de edição expandida. Padrão: \"Editar texto\".",
    },
    "aria-invalid": {
      control: "boolean",
      description: "Marca o campo como inválido: borda destructive.",
    },
    placeholder: {
      control: "text",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Textarea>;

/**
 * API simples do Textarea isolado.
 */
export const Basic: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-3">
      <Textarea {...args} size="sm" placeholder="Pequeno (sm)" />
      <Textarea {...args} size="md" placeholder="Padrão (md)" />
      <Textarea {...args} size="lg" placeholder="Grande (lg)" />
    </div>
  ),
};

export const Expandable: Story = {
  args: {
    expandable: true,
    placeholder: "Digite sua mensagem e clique no ícone para expandir.",
    rows: 4,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Textarea desabilitado",
  },
};

export const WithField: Story = {
  render: () => (
    <Field>
      <FieldLabel htmlFor="textarea-message">Mensagem</FieldLabel>
      <Textarea id="textarea-message" placeholder="Digite sua mensagem aqui..." rows={4} />
      <FieldDescription>Use o campo acima para descrever sua dúvida ou mensagem.</FieldDescription>
    </Field>
  ),
};

export const WithButton: Story = {
  render: () => (
    <Field>
      <FieldLabel htmlFor="textarea-with-button">Enviar mensagem</FieldLabel>
      <Textarea
        id="textarea-with-button"
        placeholder="Digite sua mensagem e clique em Enviar."
        rows={4}
      />
      <div className="mt-2 flex justify-end">
        <Button type="button">Enviar</Button>
      </div>
    </Field>
  ),
};

export const Resizable: Story = {
  render: (args) => (
    <div className="flex max-w-md flex-col gap-3">
      <Textarea
        {...args}
        resizable
        rows={4}
        placeholder="Textarea redimensionável (resizable = true)"
      />
      <p className="text-muted-foreground text-sm">
        Arraste o canto inferior para ajustar a altura do campo.
      </p>
    </div>
  ),
};

export const Invalid: Story = {
  render: (args) => (
    <Field>
      <FieldLabel htmlFor="textarea-invalid">Mensagem</FieldLabel>
      <Textarea
        {...args}
        id="textarea-invalid"
        placeholder="Campo em estado de erro"
        rows={4}
        aria-invalid="true"
      />
      <FieldDescription>
        Este exemplo demonstra o estilo destructive aplicado quando o campo está inválido.
      </FieldDescription>
    </Field>
  ),
};

export const InvalidWithResizable: Story = {
  render: (args) => (
    <Field>
      <FieldLabel htmlFor="textarea-invalid-resizable">Comentários</FieldLabel>
      <Textarea
        {...args}
        id="textarea-invalid-resizable"
        placeholder="Campo inválido e redimensionável"
        rows={4}
        resizable
        aria-invalid="true"
      />
      <FieldDescription>
        Combina o estado inválido com a possibilidade de redimensionar o textarea.
      </FieldDescription>
    </Field>
  ),
};

/**
 * Os 6 estados do Figma lado a lado. Focus e Error (Focus) usam o foco forçado
 * pelo storybook-addon-pseudo-states; nos outros exemplos, clique no campo ou use Tab.
 */
export const Estados: Story = {
  parameters: {
    pseudo: { focusVisible: ["#textarea-estado-focus", "#textarea-estado-erro-focus"] },
    controls: { disable: true },
  },
  render: () => (
    <EstadosGrade
      estados={[
        { nome: "Default", gatilho: "vazio, sem foco", campo: <Textarea aria-label="Default" placeholder="Descreva o problema" /> },
        { nome: "Focus", gatilho: ":focus-visible", campo: <Textarea id="textarea-estado-focus" aria-label="Focus" placeholder="Descreva o problema" /> },
        { nome: "Filled", gatilho: "com value", campo: <Textarea aria-label="Filled" defaultValue="Trocar o endereço de entrega do pedido 4521." /> },
        { nome: "Disabled", gatilho: "disabled", campo: <Textarea aria-label="Disabled" disabled defaultValue="Trocar o endereço de entrega do pedido 4521." /> },
        { nome: "Error", gatilho: "aria-invalid", campo: <Textarea aria-label="Error" aria-invalid placeholder="Descreva o problema" /> },
        { nome: "Error (Focus)", gatilho: "aria-invalid + :focus-visible", campo: <Textarea id="textarea-estado-erro-focus" aria-label="Error (Focus)" aria-invalid placeholder="Descreva o problema" /> },
      ]}
    />
  ),
};
