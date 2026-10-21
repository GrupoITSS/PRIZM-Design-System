import { Button } from "@grupoitss/prizm-ui/button";
import { Field, FieldDescription, FieldLabel } from "@grupoitss/prizm-ui/field";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Textarea } from "@grupoitss/prizm-ui/textarea";

const meta: Meta<typeof Textarea> = {
  title: "Primários/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "API preferencial **por props** (sem subcomponentes). Base: [shadcn/ui](https://ui.shadcn.com) + Radix, com tokens PRIZM.\n\n" +
          "Textarea do design system PRIZM. Wrapper estilizado para o `<textarea />` nativo, com tamanhos (`size`) e tokens de cor alinhados ao tema PRIZM.\n\n" +
          "Esta página também demonstra exemplos de uso em conjunto com `Field`, baseados na documentação do shadcn/ui.\n\n" +
          "**Props adicionais PRIZM:**\n\n" +
          "- `expandable`: controla se o textarea pode ser expandido para preencher o espaço disponível. Padrão: `false`.\n" +
          "- `resizable`: controla se o textarea pode ser redimensionado pelo usuário (handle de resize na borda inferior). Padrão: `false`.\n" +
          "O estado de erro é controlado via atributo nativo `aria-invalid`, geralmente aplicado por libs de formulário (ex.: React Hook Form).\n\n" +
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
