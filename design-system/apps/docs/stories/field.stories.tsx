import { Checkbox } from "@grupoitss/prizm-ui/checkbox";
import { Input } from "@grupoitss/prizm-ui/input";
import { Switch } from "@grupoitss/prizm-ui/switch";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@grupoitss/prizm-ui/field";

const FIGMA_COMPONENT = "https://www.figma.com/design/7NPb3iuxjitMdpudp4yHTl?node-id=18684-15220";
const FIGMA_DOC = "https://www.figma.com/design/7NPb3iuxjitMdpudp4yHTl?node-id=25991-5586";
const CMS_ARTICLE =
  "https://sgq.pas.app.br/cms/prizm_design_system/articles?articleId=d2e1be9f-70d7-41e7-82fd-bc69b36e6340&version=v1";

const meta: Meta<typeof Field> = {
  title: "Primários/Field",
  component: Field,
  tags: ["autodocs", "documentado"],
  parameters: {
    docs: {
      description: {
        component:
          `[Componente no Figma](${FIGMA_COMPONENT}) · [Documentação no Figma](${FIGMA_DOC}) · [Artigo no CMS](${CMS_ARTICLE})\n\n` +
          "Base: [shadcn/ui](https://ui.shadcn.com), com tokens PRIZM. O Field é composição: não há API por props.\n\n" +
          "Field do design system PRIZM: monta um campo de formulário com rótulo, controle, descrição e erro.\n\n" +
          "- **Peças:** `FieldSet`, `FieldLegend`, `FieldGroup`, `Field`, `FieldContent`, `FieldLabel`, `FieldTitle`, `FieldDescription`, `FieldSeparator` e `FieldError`.\n" +
          '- **Orientação:** `orientation="vertical"` (padrão), `"horizontal"` (controle ao lado, como Checkbox e Switch) e `"responsive"` (lado a lado a partir de @md do `FieldGroup`).\n' +
          "- **Erro:** `data-invalid` no `Field` e `aria-invalid` no controle. O `FieldError` tem `role=alert`.\n" +
          "- **Ligação:** o Field não liga a descrição e o erro ao controle. Dê `id` ao `FieldDescription` e ao `FieldError` e passe os dois em `aria-describedby` no controle.\n\n" +
          '**Documentação base:** <a href="https://ui.shadcn.com/docs/components/radix/field" target="_blank" rel="noopener noreferrer">Field — shadcn/ui</a>',
      },
    },
  },
  args: {
    orientation: "vertical",
  },
  argTypes: {
    orientation: {
      control: "select",
      options: ["vertical", "horizontal", "responsive"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Field>;

export const CompositionBasicInputField: Story = {
  name: "Campo com descrição e erro",
  render: (args) => (
    <FieldSet>
      <FieldLegend>Perfil</FieldLegend>
      <FieldGroup>
        <Field {...args}>
          <FieldLabel htmlFor="nome">Nome completo</FieldLabel>
          <Input id="nome" placeholder="Maria Souza" aria-describedby="nome-descricao" />
          <FieldDescription id="nome-descricao">
            Aparece nas notas fiscais e nos e-mails.
          </FieldDescription>
        </Field>
        <Field {...args} data-invalid="true">
          <FieldLabel htmlFor="usuario">Nome de usuário</FieldLabel>
          <Input
            id="usuario"
            autoComplete="off"
            aria-invalid="true"
            aria-describedby="usuario-erro"
          />
          <FieldError id="usuario-erro">Esse nome já está em uso. Escolha outro.</FieldError>
        </Field>
      </FieldGroup>
    </FieldSet>
  ),
};

export const Horizontal: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Controle ao lado do rótulo, com `orientation="horizontal"`. É o jeito de usar Checkbox, Switch e Radio com rótulo.',
      },
    },
  },
  render: () => (
    <FieldGroup className="max-w-md">
      <Field orientation="horizontal">
        <Checkbox id="termos" />
        <FieldLabel htmlFor="termos">Aceito os termos de uso</FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <FieldContent>
          <FieldLabel htmlFor="avisos">Avisos por e-mail</FieldLabel>
          <FieldDescription id="avisos-descricao">
            Mandamos só o que muda no seu acesso.
          </FieldDescription>
        </FieldContent>
        <Switch id="avisos" aria-describedby="avisos-descricao" />
      </Field>
    </FieldGroup>
  ),
};

export const CompositionWithSeparator: Story = {
  name: "Com separador",
  render: (args) => (
    <FieldSet>
      <FieldLegend>Notificações</FieldLegend>
      <FieldGroup>
        <Field {...args}>
          <FieldContent>
            <FieldTitle>Atualizações por e-mail</FieldTitle>
            <FieldDescription>Receba avisos das atividades importantes.</FieldDescription>
          </FieldContent>
        </Field>
        <FieldSeparator>Ou</FieldSeparator>
        <Field {...args}>
          <FieldContent>
            <FieldTitle>Notificações no celular</FieldTitle>
            <FieldDescription>Receba os avisos direto no aparelho.</FieldDescription>
          </FieldContent>
        </Field>
      </FieldGroup>
    </FieldSet>
  ),
};

export const CompositionRequiredFields: Story = {
  name: "Campos obrigatórios",
  render: (args) => (
    <FieldSet>
      <FieldLegend>Dados da conta</FieldLegend>
      <FieldGroup>
        <Field {...args}>
          <FieldLabel htmlFor="email" required>
            E-mail
          </FieldLabel>
          <Input
            id="email"
            type="email"
            required
            placeholder="voce@empresa.com.br"
            aria-describedby="email-descricao"
          />
          <FieldDescription id="email-descricao">
            Usamos este e-mail para falar com você.
          </FieldDescription>
        </Field>
        <Field {...args} data-invalid="true">
          <FieldLabel htmlFor="senha" required>
            Senha
          </FieldLabel>
          <Input
            id="senha"
            type="password"
            required
            aria-invalid="true"
            aria-describedby="senha-erro"
          />
          <FieldError id="senha-erro">Preencha a senha.</FieldError>
        </Field>
      </FieldGroup>
    </FieldSet>
  ),
};

export const Disabled: Story = {
  name: "Desabilitado",
  parameters: {
    docs: {
      description: {
        story:
          "`data-disabled` no `Field` deixa o rótulo a 50%. O controle recebe `disabled` e segue a regra dele.",
      },
    },
  },
  render: () => (
    <Field data-disabled="true" className="max-w-sm">
      <FieldLabel htmlFor="codigo">Código do cliente</FieldLabel>
      <Input id="codigo" disabled defaultValue="PAS-0042" />
    </Field>
  ),
};
