import type { Meta, StoryObj } from "@storybook/react-vite";
import { Label } from "@grupoitss/prizm-ui/label";

const meta: Meta<typeof Label> = {
  title: "Primários/Label",
  component: Label,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "API preferencial **por props** (sem subcomponentes). Base: [shadcn/ui](https://ui.shadcn.com) + Radix, com tokens PRIZM.\n\n" +
          "Label do design system PRIZM. Rótulo acessível para campos de formulário.\n\n" +
          '**Documentação base:** <a href="https://ui.shadcn.com/docs/components/radix/label" target="_blank" rel="noopener noreferrer">Label — shadcn/ui (Radix)</a>',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Label>;

export const Basic: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-sm">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">Email</Label>
        <p className="text-xs text-muted-foreground">
          Contrato visual: cor `foreground` + font-light (300).
        </p>
      </div>
      <Label htmlFor="email-field">Email</Label>
    </div>
  ),
};

export const WithCheckbox: Story = {
  name: "Com checkbox",
  render: () => (
    <div className="flex items-center gap-2">
      <input id="terms" type="checkbox" className="size-4 rounded border" />
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
