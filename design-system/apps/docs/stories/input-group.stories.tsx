import { Button } from "@grupoitss/prizm-ui/button";
import { Field, FieldDescription, FieldError, FieldLabel } from "@grupoitss/prizm-ui/field";
import { ExternalLink, Search } from "@grupoitss/prizm-ui/icons";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { InputGroup } from "@grupoitss/prizm-ui/input-group";

const meta: Meta<typeof InputGroup> = {
  title: "Primários/InputGroup",
  component: InputGroup,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "API preferencial **por props** (sem subcomponentes). Base: [shadcn/ui](https://ui.shadcn.com) + Radix, com tokens PRIZM.\n\n" +
          "InputGroup do design system PRIZM. **Uso recomendado: apenas via props** (`placeholder`, `addonInlineStart`, `addonInlineEnd`, `addonBlockStart`, `addonBlockEnd`, `control`).\n\n" +
          "Subcomponentes existem apenas como escape hatch para composição avançada.\n\n" +
          "**Documentação base:** " +
          '<a href="https://ui.shadcn.com/docs/components/radix/input-group" target="_blank" rel="noopener noreferrer">Input Group — shadcn/ui (Radix)</a>',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof InputGroup>;

export const Basic: Story = {
  render: () => (
    <InputGroup placeholder="Buscar..." addonInlineEnd={<Search className="size-4" />} />
  ),
};

export const InlineStart: Story = {
  render: () => (
    <InputGroup
      placeholder="Email"
      type="email"
      addonInlineStart={<span className="text-muted-foreground text-sm">@</span>}
    />
  ),
};

export const InlineEnd: Story = {
  render: () => (
    <InputGroup
      placeholder="URL"
      type="url"
      addonInlineEnd={<span className="text-muted-foreground text-sm">.com</span>}
    />
  ),
};

export const WithButtons: Story = {
  render: () => (
    <InputGroup
      placeholder="https://api.example.com"
      type="url"
      addonInlineEnd={
        <>
          <Button type="button" variant="outline" size="sm">
            Copiar
          </Button>
          <Button type="button" variant="ghost" size="icon" aria-label="Abrir">
            <ExternalLink className="size-3.5" />
          </Button>
        </>
      }
    />
  ),
};

export const WithField: Story = {
  render: () => (
    <Field>
      <FieldLabel htmlFor="input-group-search">Buscar</FieldLabel>
      <InputGroup
        id="input-group-search"
        placeholder="Buscar por usuário, email..."
        addonInlineEnd={
          <Button type="button" variant="ghost" size="icon" aria-label="Buscar">
            <Search className="size-3.5" />
          </Button>
        }
      />
      <FieldDescription>
        Digite um termo de busca e clique no botão ou pressione Enter.
      </FieldDescription>
    </Field>
  ),
};

export const WithError: Story = {
  render: () => (
    <Field>
      <FieldLabel htmlFor="input-group-error">Email</FieldLabel>
      <InputGroup
        id="input-group-error"
        type="email"
        placeholder="email@empresa.com"
        aria-invalid="true"
        addonInlineEnd={
          <Button type="button" variant="ghost" size="icon" aria-label="Verificar email">
            <ExternalLink className="size-3.5" />
          </Button>
        }
      />
      <FieldError>Informe um email válido.</FieldError>
    </Field>
  ),
};

export const Disabled: Story = {
  render: () => (
    <InputGroup
      placeholder="Campo desabilitado"
      disabled
      addonInlineEnd={<Search className="size-4" />}
    />
  ),
};

export const TextareaBlockEnd: Story = {
  render: () => (
    <Field>
      <FieldLabel htmlFor="input-group-textarea">Mensagem</FieldLabel>
      <InputGroup
        control="textarea"
        id="input-group-textarea"
        placeholder="Digite sua mensagem..."
        rows={4}
        addonBlockEnd={
          <>
            <span className="text-muted-foreground text-sm">0/280</span>
            <Button type="button" size="sm" variant="ghost">
              Enviar
            </Button>
          </>
        }
      />
    </Field>
  ),
};

export const InputAndTextarea: Story = {
  render: () => (
    <div className="space-y-4">
      <InputGroup
        placeholder="Input com ícone no final"
        addonInlineEnd={<Search className="size-4" />}
      />
      <InputGroup
        control="textarea"
        placeholder="Textarea com botão abaixo"
        rows={3}
        addonBlockEnd={
          <Button type="button" size="sm" variant="secondary">
            Publicar
          </Button>
        }
      />
    </div>
  ),
};
