import { Button } from "@grupoitss/prizm-ui/button";
import { Field, FieldGroup, FieldLabel } from "@grupoitss/prizm-ui/field";
import { Input } from "@grupoitss/prizm-ui/input";
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

export const StickyFooter: Story = {
  render: () => (
    <Dialog
      trigger={<Button variant="outline">Sticky Footer</Button>}
      title="Sticky Footer"
      description="This dialog has a sticky footer that stays visible while the content scrolls."
      body={
        <div className="no-scrollbar -mx-4 max-h-[50vh] overflow-y-auto px-4">
          {Array.from({ length: 8 }).map((_, index) => (
            // eslint-disable-next-line @eslint-react/no-array-index-key -- static placeholder list
            <p key={index} className="mb-4 leading-normal">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          ))}
        </div>
      }
      footer={
        <>
          <Button type="button" variant="outline">
            Close
          </Button>
          <Button type="submit">Confirm</Button>
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
  render: () => (
    <Dialog
      trigger={<Button variant="outline">Delete item</Button>}
      title="Dialog title"
      description="This is a dialog description."
      body={
        <div className="rounded-md border border-dashed border-purple-200 bg-purple-50 p-6 text-center text-sm text-purple-800">
          Slot (swap it with your content)
        </div>
      }
      footer={
        <>
          <Button type="button" variant="destructive">
            Delete
          </Button>
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit">Save changes</Button>
        </>
      }
    />
  ),
};
