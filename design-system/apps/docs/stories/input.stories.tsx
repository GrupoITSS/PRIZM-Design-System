import { Badge } from "@grupoitss/prizm-ui/badge";
import { Button } from "@grupoitss/prizm-ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@grupoitss/prizm-ui/field";
import { Eye, EyeOff, Search } from "@grupoitss/prizm-ui/icons";
import { InputGroup } from "@grupoitss/prizm-ui/input-group";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Input } from "@grupoitss/prizm-ui/input";
import { EstadosGrade } from "./_estados";

// Traceability: the component set in [PRIZM] Componentes, its documentation
// frame and the CMS article. The token map lives next to the component
// (input.tokens.json) and is checked against the classes in a test.
const FIGMA_URL = "https://www.figma.com/design/7NPb3iuxjitMdpudp4yHTl?node-id=65-533";
const FIGMA_DOC_URL = "https://www.figma.com/design/7NPb3iuxjitMdpudp4yHTl?node-id=25188-1959";
const CMS_URL =
  "https://sgq.pas.app.br/cms/prizm_design_system/articles?articleId=e01cbbac-8a47-44ab-a16f-a9975c9d7cb5&version=v1";

const meta: Meta<typeof Input> = {
  title: "Primários/Input",
  component: Input,
  tags: ["autodocs", "documentado"],
  parameters: {
    docs: {
      description: {
        component:
          "API preferencial **por props** (sem subcomponentes). Base: [shadcn/ui](https://ui.shadcn.com) + Radix, com tokens PRIZM.\n\n" +
          "Input do design system PRIZM. Wrapper estilizado para o `<input />` nativo, com tamanhos (`size`) e tokens de cor alinhados ao tema PRIZM.\n\n" +
          "Esta página também demonstra exemplos de uso em conjunto com `Field`, baseados na documentação do shadcn/ui.\n\n" +
          `[Componente no Figma](${FIGMA_URL}) · [Documentação no Figma](${FIGMA_DOC_URL}) · [Artigo no CMS](${CMS_URL}).\n\n` +
          "**Documentação base:** " +
          '<a href="https://ui.shadcn.com/docs/components/radix/input" target="_blank" rel="noopener noreferrer">Input — shadcn/ui (Radix)</a>',
      },
    },
    controls: {
      include: ["placeholder", "type", "size", "disabled"],
      expanded: true,
    },
  },
  args: {
    placeholder: "Digite algo...",
    type: "text",
    size: "md",
    disabled: false,
  },
  argTypes: {
    placeholder: { control: "text" },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    type: {
      control: "text",
    },
    disabled: {
      control: "boolean",
    },
    startIcon: { control: false },
    className: { control: false },
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

/**
 * API simples do Input isolado.
 */
export const Basic: Story = {};

/** Controles como no Cockpit — o primeiro campo responde ao painel Controls. */
export const CockpitNaMesmaLinha: Story = {
  name: "Cockpit (mesma linha)",
  args: {
    placeholder: "Buscar…",
    size: "md",
    disabled: false,
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-end gap-3">
        <Input {...args} className="w-48" />
        <Input size="md" defaultValue="Acme Ltda" className="w-48" />
        <Input size="sm" placeholder="sm" className="w-32" />
      </div>
      <div className="flex flex-wrap items-end gap-3">
        <Input size="md" disabled defaultValue="Somente leitura" className="w-48" />
        <Input size="md" disabled placeholder="Desabilitado vazio" className="w-48" />
        <Field data-disabled className="w-48 gap-1.5">
          <FieldLabel htmlFor="cockpit-disabled-field">Com Field</FieldLabel>
          <Input id="cockpit-disabled-field" size="md" disabled defaultValue="Campo + label" />
        </Field>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-3">
      <Input {...args} size="sm" placeholder="Pequeno (sm)" />
      <Input {...args} size="md" placeholder="Cockpit (md)" />
      <Input {...args} size="lg" placeholder="Grande (lg)" />
    </div>
  ),
};

export const CockpitField: Story = {
  name: "Cockpit — label + input (md)",
  args: {
    placeholder: "minha-org",
    size: "md",
  },
  render: (args) => (
    <div className="flex max-w-sm flex-col gap-1.5">
      <FieldLabel htmlFor="cockpit-sub">Subdomínio</FieldLabel>
      <Input id="cockpit-sub" defaultValue="minha-org" {...args} />
    </div>
  ),
};

/**
 * Estados desabilitados juntos: Input isolado + Field com `data-disabled`.
 */
export const Disabled: Story = {
  name: "Desabilitado (agrupado)",
  args: {
    disabled: true,
    placeholder: "Input desabilitado",
  },
  render: (args) => (
    <div className="flex max-w-md flex-col gap-4">
      <Field>
        <FieldLabel htmlFor="input-disabled-plain">Input disabled</FieldLabel>
        <Input id="input-disabled-plain" defaultValue="Somente leitura" {...args} />
        <FieldDescription>Prop `disabled` no Input.</FieldDescription>
      </Field>
      <Field data-disabled>
        <FieldLabel htmlFor="input-demo-disabled">Email</FieldLabel>
        <Input
          id="input-demo-disabled"
          type="email"
          placeholder="Email"
          disabled
          defaultValue="user@empresa.com"
        />
        <FieldDescription>
          `data-disabled` no Field + `disabled` no Input (label/descrição também atenuados).
        </FieldDescription>
      </Field>
    </div>
  ),
};

/**
 * 1. InputDemo — exemplo de campo de API Key.
 */
export const InputDemo: Story = {
  args: {
    type: "password",
    placeholder: "sk-...",
  },
  render: (args) => (
    <Field>
      <FieldLabel htmlFor="input-demo-api-key">API Key</FieldLabel>
      <Input id="input-demo-api-key" {...args} />
      <FieldDescription>Your API key is encrypted and stored securely.</FieldDescription>
    </Field>
  ),
};

/**
 * 2. InputBasic — exemplo mínimo com placeholder.
 */
export const InputBasic: Story = {
  args: {
    placeholder: "Enter text",
  },
  render: (args) => <Input {...args} />,
};

/**
 * 3. InputPasswordWithToggle — exemplo de campo de senha com botão para mostrar/ocultar o conteúdo.
 */
export const PasswordWithToggle: Story = {
  args: {
    placeholder: "••••••••",
  },
  render: function Render(args) {
    const [visible, setVisible] = useState(false);

    return (
      <Field>
        <FieldLabel htmlFor="input-password-toggle">Password</FieldLabel>
        <div className="relative">
          <Input
            id="input-password-toggle"
            {...args}
            type={visible ? "text" : "password"}
            className="pr-10"
          />
          <button
            type="button"
            aria-label={visible ? "Hide password" : "Show password"}
            className="text-muted-foreground hover:text-foreground absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
            onClick={() => setVisible((prev) => !prev)}
          >
            {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
        <FieldDescription>Click the icon to toggle password visibility.</FieldDescription>
      </Field>
    );
  },
};

/**
 * 4. InputField — Input dentro de um Field básico.
 */
export const InputField: Story = {
  args: {
    type: "text",
    placeholder: "Enter your username",
  },
  render: (args) => (
    <Field>
      <FieldLabel htmlFor="input-field-username">Username</FieldLabel>
      <Input id="input-field-username" {...args} />
      <FieldDescription>Choose a unique username for your account.</FieldDescription>
    </Field>
  ),
};

/**
 * 5. InputFieldGroup — múltiplos campos em um FieldGroup com ações.
 */
export const InputFieldGroup: Story = {
  args: {
    placeholder: "Jordan Lee",
  },
  render: (args) => (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="fieldgroup-name">Name</FieldLabel>
        <Input id="fieldgroup-name" {...args} />
      </Field>
      <Field>
        <FieldLabel htmlFor="fieldgroup-email">Email</FieldLabel>
        <Input id="fieldgroup-email" type="email" placeholder="name@example.com" />
        <FieldDescription>We&apos;ll send updates to this address.</FieldDescription>
      </Field>
      <Field orientation="horizontal">
        <Button type="reset" variant="outline">
          Reset
        </Button>
        <Button type="submit">Submit</Button>
      </Field>
    </FieldGroup>
  ),
};

/**
 * 6. InputInvalid — `data-invalid` no Field + `aria-invalid` no Input.
 */
export const InputInvalid: Story = {
  args: {
    placeholder: "Error",
  },
  render: (args) => (
    <Field data-invalid>
      <FieldLabel htmlFor="input-invalid">Invalid Input</FieldLabel>
      <Input id="input-invalid" aria-invalid {...args} />
      <FieldDescription>This field contains validation errors.</FieldDescription>
    </Field>
  ),
};

/**
 * 8. InputFile — exemplo de campo de upload de arquivo.
 */
export const InputFile: Story = {
  args: {
    type: "file",
    placeholder: undefined,
  },
  render: (args) => (
    <Field>
      <FieldLabel htmlFor="picture">Picture</FieldLabel>
      <Input id="picture" {...args} />
      <FieldDescription>Select a picture to upload.</FieldDescription>
    </Field>
  ),
};

/**
 * 9. InputInline — uso com `orientation="horizontal"` e botão de ação.
 */
export const InputInline: Story = {
  args: {
    type: "search",
    placeholder: "Search...",
  },
  render: (args) => (
    <Field orientation="horizontal">
      <Input {...args} />
      <Button>Search</Button>
    </Field>
  ),
};

/**
 * 10. InputGrid — dois campos lado a lado usando grid utilitária.
 */
export const InputGrid: Story = {
  args: {
    placeholder: "Jordan",
  },
  render: (args) => (
    <FieldGroup className="grid max-w-sm grid-cols-2 gap-4">
      <Field>
        <FieldLabel htmlFor="first-name">First Name</FieldLabel>
        <Input id="first-name" {...args} />
      </Field>
      <Field>
        <FieldLabel htmlFor="last-name">Last Name</FieldLabel>
        <Input id="last-name" placeholder="Lee" />
      </Field>
    </FieldGroup>
  ),
};

/**
 * 11. InputRequired — exemplo de campo obrigatório com indicação visual.
 */
export const InputRequired: Story = {
  args: {
    placeholder: "This field is required",
  },
  render: (args) => (
    <Field>
      <FieldLabel htmlFor="input-required">
        Required Field <span className="text-destructive">*</span>
      </FieldLabel>
      <Input id="input-required" required {...args} />
      <FieldDescription>This field must be filled out.</FieldDescription>
    </Field>
  ),
};

/**
 * 12. InputBadge — label com `Badge` indicando beta.
 */
export const InputBadge: Story = {
  args: {
    type: "url",
    placeholder: "https://api.example.com/webhook",
  },
  render: (args) => (
    <Field>
      <FieldLabel htmlFor="input-badge">
        Webhook URL{" "}
        <Badge variant="secondary" className="ml-auto">
          Beta
        </Badge>
      </FieldLabel>
      <Input id="input-badge" {...args} />
    </Field>
  ),
};

/**
 * 13. InputInputGroup — busca com ícone via `InputGroup` (API por props).
 */
export const InputInputGroup: Story = {
  name: "Com InputGroup",
  args: {
    placeholder: "Buscar usuários…",
  },
  render: (args) => (
    <Field>
      <FieldLabel htmlFor="input-with-group">Buscar</FieldLabel>
      <InputGroup
        id="input-with-group"
        placeholder={args.placeholder}
        disabled={args.disabled}
        addonInlineStart={<Search className="size-4" />}
      />
      <FieldDescription>
        Campo composto da lib (`InputGroup` + ícone), sem classes ad-hoc no Input.
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
    pseudo: { focusVisible: ["#input-estado-focus", "#input-estado-erro-focus"] },
    controls: { disable: true },
  },
  render: () => (
    <EstadosGrade
      estados={[
        { nome: "Default", gatilho: "vazio, sem foco", campo: <Input aria-label="Default" placeholder="Digite seu nome" /> },
        { nome: "Focus", gatilho: ":focus-visible", campo: <Input id="input-estado-focus" aria-label="Focus" placeholder="Digite seu nome" /> },
        { nome: "Filled", gatilho: "com value", campo: <Input aria-label="Filled" defaultValue="Acme Ltda" /> },
        { nome: "Disabled", gatilho: "disabled", campo: <Input aria-label="Disabled" disabled defaultValue="Somente leitura" /> },
        { nome: "Error", gatilho: "aria-invalid", campo: <Input aria-label="Error" aria-invalid defaultValue="nome@empresa" /> },
        { nome: "Error (Focus)", gatilho: "aria-invalid + :focus-visible", campo: <Input id="input-estado-erro-focus" aria-label="Error (Focus)" aria-invalid defaultValue="nome@empresa" /> },
      ]}
    />
  ),
};
