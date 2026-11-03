import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox } from "@grupoitss/prizm-ui/checkbox";
import { Input } from "@grupoitss/prizm-ui/input";
import { Label } from "@grupoitss/prizm-ui/label";

const FIGMA_COMPONENT = "https://www.figma.com/design/7NPb3iuxjitMdpudp4yHTl?node-id=25789-2017";
const FIGMA_DOC = "https://www.figma.com/design/7NPb3iuxjitMdpudp4yHTl?node-id=25790-2423";
const CMS_ARTICLE =
  "https://sgq.pas.app.br/cms/prizm_design_system/articles?articleId=ff93a9a3-9c47-4362-b421-5b02d6ed0375&version=v1";

const meta: Meta<typeof Label> = {
  title: "Primários/Label",
  component: Label,
  tags: ["autodocs", "documentado"],
  argTypes: {
    required: { control: "boolean" },
  },
  parameters: {
    docs: {
      description: {
        component:
          `[Componente no Figma](${FIGMA_COMPONENT}) · [Documentação no Figma](${FIGMA_DOC}) · [Artigo no CMS](${CMS_ARTICLE})\n\n` +
          "API preferencial **por props** (sem subcomponentes). Base: [shadcn/ui](https://ui.shadcn.com) + Radix, com tokens PRIZM.\n\n" +
          "Label do design system PRIZM. Rótulo acessível para campos de formulário. Em formulário, prefira o `FieldLabel`.\n\n" +
          '**Documentação base:** <a href="https://ui.shadcn.com/docs/components/radix/label" target="_blank" rel="noopener noreferrer">Label — shadcn/ui (Radix)</a>',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Label>;

export const Basic: Story = {
  render: () => (
    <div className="flex max-w-sm flex-col gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" />
    </div>
  ),
};

export const Required: Story = {
  name: "Obrigatório",
  render: () => (
    <div className="flex max-w-sm flex-col gap-1.5">
      <Label htmlFor="nome" required>
        Nome
      </Label>
      <Input id="nome" required />
    </div>
  ),
};

export const Disabled: Story = {
  name: "Desabilitado",
  render: () => (
    <div className="flex items-center gap-2">
      <input id="avisos" type="checkbox" disabled className="peer sr-only" />
      <Label htmlFor="avisos">Receber avisos</Label>
    </div>
  ),
};

export const WithCheckbox: Story = {
  name: "Com checkbox",
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Aceitar termos e condições</Label>
    </div>
  ),
};

export const FormLabelsGallery: Story = {
  name: "Galeria (formulário)",
  render: () => (
    <div className="flex max-w-sm flex-col gap-4">
      <Label>Nome da organização</Label>
      <Label>Subdomínio</Label>
      <Label>Tipo de documento</Label>
      <Label>Arquiteto PAS responsável</Label>
    </div>
  ),
};
