import { Button } from "@grupoitss/prizm-ui/button";
import { Field, FieldGroup, FieldLabel } from "@grupoitss/prizm-ui/field";
import { Input } from "@grupoitss/prizm-ui/input";
import { Label } from "@grupoitss/prizm-ui/label";
import { Switch } from "@grupoitss/prizm-ui/switch";
import { Trash2 } from "@grupoitss/prizm-ui/icons";
import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { Dialog, dialogSizes } from "@grupoitss/prizm-ui/dialog";

// Traceability: the Dialog component set in [PRIZM] Componentes, the documentation frame and the
// CMS article. The token map lives next to the component (dialog.tokens.json) and is checked
// against the classes in a test.
const FIGMA_URL = "https://www.figma.com/design/7NPb3iuxjitMdpudp4yHTl?node-id=112-602";
const FIGMA_DOC_URL = "https://www.figma.com/design/7NPb3iuxjitMdpudp4yHTl?node-id=26345-2157";
const CMS_URL =
  "https://sgq.pas.app.br/cms/prizm_design_system/articles?articleId=ec8d2380-ceb3-4867-842d-76750f80dcfc&version=v1";

const meta: Meta<typeof Dialog> = {
  title: "Primários/Dialog",
  component: Dialog,
  tags: ["autodocs", "documentado"],
  parameters: {
    docs: {
      description: {
        component:
          "API preferencial **por props** (sem subcomponentes). Base: [shadcn/ui](https://ui.shadcn.com) + Radix, com tokens PRIZM.\n\n" +
          "Dialog do design system PRIZM. Janela modal genérica baseada em Radix Dialog, usando tokens de `@grupoitss/prizm-tokens` e **API simplificada por props** (`trigger`, `title`, `description`, `body`, `footer`).\n\n" +
          'O botão de fechar (X) é o `Button` ghost `icon-sm` do Prizm, a 8px do canto (`dialogCloseStyles`), com o nome "Fechar" para o leitor de tela (`closeLabel`).\n\n' +
          "Subcomponentes (`DialogContent`, `DialogHeader`, etc.) existem apenas como escape hatch para composição avançada — os exemplos principais usam sempre props.\n\n" +
          '**Documentação base:** <a href="https://www.radix-ui.com/docs/primitives/components/dialog" target="_blank" rel="noopener noreferrer">Radix Dialog</a>' +
          `\n\n**Rastreabilidade:** <a href="${FIGMA_URL}" target="_blank" rel="noopener noreferrer">Componente no Figma</a> · <a href="${FIGMA_DOC_URL}" target="_blank" rel="noopener noreferrer">Documentação no Figma</a> · <a href="${CMS_URL}" target="_blank" rel="noopener noreferrer">Artigo no CMS</a> · <a href="https://ui.shadcn.com/docs/components/radix/dialog" target="_blank" rel="noopener noreferrer">Dialog — shadcn/ui</a>`,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Dialog>;

export const Basic: Story = {
  render: () => (
    <Dialog
      trigger={<Button variant="outline">Open Dialog</Button>}
      title="Edit profile"
      description="Make changes to your profile here. Click save when you're done."
      body={
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="name-1">Name</FieldLabel>
            <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
          </Field>
          <Field>
            <FieldLabel htmlFor="username-1">Username</FieldLabel>
            <Input id="username-1" name="username" defaultValue="@peduarte" />
          </Field>
        </FieldGroup>
      }
      footer={
        <>
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit">Save changes</Button>
        </>
      }
    />
  ),
};

const larguraPorSize = {
  sm: "384px",
  md: "448px",
  lg: "512px · padrão",
  xl: "576px",
  "2xl": "672px",
  "3xl": "768px",
  "4xl": "896px",
  full: "sem limite",
} as const;

/**
 * `size` limita a largura na escala `max-width/*` do Core. A largura é sempre a tela menos 32px:
 * numa tela menor que o size, o Dialog fica com 16px de folga de cada lado.
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {dialogSizes.map((size) => (
        <Dialog
          key={size}
          size={size}
          trigger={<Button variant="outline">size=&quot;{size}&quot;</Button>}
          title={`size="${size}"`}
          description={`Largura máxima: ${larguraPorSize[size]}.`}
          footer={<Button type="button">Ok</Button>}
        />
      ))}
    </div>
  ),
};

/** Formulário em duas colunas num `size="4xl"` (896px), como o cadastro de produto do Pricing. */
export const TwoColumnForm: Story = {
  render: () => (
    <Dialog
      size="4xl"
      trigger={<Button variant="outline">Cadastrar produto</Button>}
      title="Cadastrar produto"
      description="Preencha os dados do produto e das variantes."
      body={
        <div className="grid gap-4 sm:grid-cols-2">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="produto-nome">Nome</FieldLabel>
              <Input id="produto-nome" />
            </Field>
            <Field>
              <FieldLabel htmlFor="produto-codigo">Código</FieldLabel>
              <Input id="produto-codigo" />
            </Field>
          </FieldGroup>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="produto-variante">Variante</FieldLabel>
              <Input id="produto-variante" />
            </Field>
            <Field>
              <FieldLabel htmlFor="produto-preco">Preço</FieldLabel>
              <Input id="produto-preco" inputMode="decimal" />
            </Field>
          </FieldGroup>
        </div>
      }
      footer={
        <>
          <Button type="button" variant="outline">
            Cancelar
          </Button>
          <Button type="submit">Salvar</Button>
        </>
      }
    />
  ),
};

/**
 * `titleAdornment`: status ou ação ao lado do título, como o Switch "Ativo" do cadastro de produto
 * do Pricing. Fica fora do título, então o nome do Dialog continua "Editar produto".
 */
export const WithTitleAdornment: Story = {
  render: () => (
    <Dialog
      size="xl"
      trigger={<Button variant="outline">Editar produto</Button>}
      title="Editar produto"
      titleAdornment={
        <>
          <Switch id="produto-ativo" defaultChecked />
          <Label htmlFor="produto-ativo">Ativo</Label>
        </>
      }
      description="Defina o produto, sua categoria e as variantes."
      body={
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="produto-nome-adorno">Nome do produto</FieldLabel>
            <Input id="produto-nome-adorno" defaultValue="Licença Docnix" />
          </Field>
        </FieldGroup>
      }
      footer={
        <>
          <Button type="button" variant="outline">
            Cancelar
          </Button>
          <Button type="submit">Salvar</Button>
        </>
      }
    />
  ),
};

export const NoCloseButton: Story = {
  render: () => (
    <Dialog
      trigger={<Button variant="outline">No Close Button</Button>}
      title="No Close Button"
      description="This dialog doesn't have a close button in the top-right corner."
      showCloseButton={false}
    />
  ),
};

const LICENSE_TYPES = [
  ["Concurrent", "R$ 150,00"],
  ["Named", "R$ 250,00"],
  ["Read-only", "R$ 10,00"],
  ["Full", "R$ 10.000,00"],
  ["Mobile", "R$ 90,00"],
  ["Integration", "R$ 400,00"],
  ["Auditor", "R$ 60,00"],
  ["Guest", "R$ 0,00"],
] as const;

export const StickyFooter: Story = {
  name: "Scrollable body",
  parameters: {
    docs: {
      description: {
        story:
          "Altura máxima: a tela menos 32px. Cabeçalho e rodapé ficam fixos e só o corpo (`DialogBody`) rola. Na API por props, o `body` já vai dentro dele (DS-77).",
      },
    },
  },
  render: () => (
    <Dialog
      trigger={<Button variant="outline">Edit category</Button>}
      title="Edit category"
      description="License types and their unit prices apply to every product in this category."
      body={
        <FieldGroup>
          {LICENSE_TYPES.map(([name, price]) => (
            <div key={name} className="grid grid-cols-[1fr_140px] gap-3">
              <Field>
                <FieldLabel htmlFor={`type-${name}`}>License type</FieldLabel>
                <Input id={`type-${name}`} defaultValue={name} />
              </Field>
              <Field>
                <FieldLabel htmlFor={`price-${name}`}>Unit price</FieldLabel>
                <Input id={`price-${name}`} defaultValue={price} />
              </Field>
            </div>
          ))}
        </FieldGroup>
      }
      footer={
        <>
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit">Save changes</Button>
        </>
      }
    />
  ),
};

export const WithConfirmInput: Story = {
  render: function Render() {
    const [isConfirmValid, setIsConfirmValid] = React.useState(false);

    return (
      <Dialog
        trigger={<Button variant="outline">Delete assistant</Button>}
        title="Pretende deletar esse assistente?"
        description="Esta ação é irreversível. Ao deletar o assistente, todas as conversas serão permanentemente removidas e não poderão ser recuperadas."
        confirmInput={{
          expectedValue: "Leo",
          label: (
            <>
              Digite <span className="font-medium text-foreground">Leo</span> para confirmar a
              deleção:
            </>
          ),
        }}
        onConfirmValidityChange={setIsConfirmValid}
        footer={
          <>
            <Button type="button" variant="outline">
              Cancelar
            </Button>
            <Button type="button" variant="destructive" disabled={!isConfirmValid}>
              Deletar
            </Button>
          </>
        }
      />
    );
  },
};

export const WithDestructiveAction: Story = {
  name: "Destructive action (footerLeading)",
  parameters: {
    docs: {
      description: {
        story:
          "A ação destrutiva fica isolada à esquerda do rodapé, em `footerLeading`, como um Button `ghost`. Ela não apaga direto: abre um AlertDialog para confirmar. No máximo três botões no rodapé (DS-77).",
      },
    },
  },
  render: () => (
    <Dialog
      trigger={<Button variant="outline">Edit product</Button>}
      title="Edit product"
      description="Change the product name and code. Click save when you're done."
      body={
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="product-name">Product name</FieldLabel>
            <Input id="product-name" defaultValue="Documents" />
          </Field>
          <Field>
            <FieldLabel htmlFor="product-code">Product code</FieldLabel>
            <Input id="product-code" defaultValue="P-1.01" />
          </Field>
        </FieldGroup>
      }
      footerLeading={
        <Button type="button" variant="ghost">
          <Trash2 aria-hidden="true" />
          Delete product
        </Button>
      }
      footer={
        <>
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit">Save changes</Button>
        </>
      }
    />
  ),
};
