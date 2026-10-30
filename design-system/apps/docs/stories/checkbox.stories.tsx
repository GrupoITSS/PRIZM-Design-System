import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@grupoitss/prizm-ui/field";
import { Checkbox } from "@grupoitss/prizm-ui/checkbox";

const FIGMA_COMPONENT = "https://www.figma.com/design/7NPb3iuxjitMdpudp4yHTl?node-id=46-112";
const FIGMA_DOC = "https://www.figma.com/design/7NPb3iuxjitMdpudp4yHTl?node-id=25747-16210";
const CMS_ARTICLE =
  "https://sgq.pas.app.br/cms/prizm_design_system/articles?articleId=4fa0bf53-0fcf-4282-b437-cfb63216ed42&version=v1";

const meta: Meta<typeof Checkbox> = {
  title: "Primários/Checkbox",
  component: Checkbox,
  tags: ["autodocs", "documentado"],
  argTypes: {
    size: { control: "select", options: ["default", "sm"] },
    checked: { control: "select", options: [false, true, "indeterminate"] },
    disabled: { control: "boolean" },
  },
  parameters: {
    docs: {
      description: {
        component:
          `[Componente no Figma](${FIGMA_COMPONENT}) · [Documentação no Figma](${FIGMA_DOC}) · [Artigo no CMS](${CMS_ARTICLE})\n\n` +
          "API preferencial **por props** (sem subcomponentes). Base: [shadcn/ui](https://ui.shadcn.com) + Radix, com tokens PRIZM.\n\n" +
          "Checkbox do design system PRIZM.\n\n" +
          "Uso recomendado:\n" +
          '- **API simplificada:** `<Checkbox label="..." checked={} onCheckedChange={} />`.\n' +
          "- **Composição:** com `Field`, `FieldGroup`, `FieldLabel`, etc., seguindo os exemplos oficiais do shadcn/ui.\n\n" +
          '**Documentação base:** <a href="https://ui.shadcn.com/docs/components/checkbox" target="_blank" rel="noopener noreferrer">Checkbox — shadcn/ui</a> | ' +
          '<a href="https://www.radix-ui.com/docs/primitives/components/checkbox" target="_blank" rel="noopener noreferrer">Radix Checkbox</a>',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

/** Filtros de lista no Cockpit — mesma linha. */
export const CockpitFiltros: Story = {
  name: "Cockpit filtros (mesma linha)",
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <label className="flex items-center gap-2 text-sm text-foreground">
        <Checkbox defaultChecked />
        Somente ativos
      </label>
      <label className="flex items-center gap-2 text-sm text-foreground">
        <Checkbox />
        Incluir inativos
      </label>
      <Checkbox label="Com label prop" defaultChecked />
    </div>
  ),
};

/**
 * Demonstra a API simplificada por props (`label`).
 */
export const PropsLabel: Story = {
  args: {
    label: "Accept terms and conditions",
    defaultChecked: true,
  },
};

/**
 * 1. Invalid State
 * Set `aria-invalid` no checkbox e `data-invalid` no `Field` para mostrar estilos de erro.
 */
export const InvalidState: Story = {
  render: () => (
    <FieldGroup className="mx-auto w-56">
      <Field orientation="horizontal" data-invalid>
        <Checkbox id="terms-checkbox-invalid" name="terms-checkbox-invalid" aria-invalid />
        <FieldLabel htmlFor="terms-checkbox-invalid">Accept terms and conditions</FieldLabel>
      </Field>
    </FieldGroup>
  ),
};

/**
 * 2. Basic
 * Par com `Field` e `FieldLabel` para layout e label corretos.
 */
export const Basic: Story = {
  render: () => (
    <FieldGroup className="mx-auto w-56">
      <Field orientation="horizontal">
        <Checkbox id="terms-checkbox-basic" name="terms-checkbox-basic" />
        <FieldLabel htmlFor="terms-checkbox-basic">Accept terms and conditions</FieldLabel>
      </Field>
    </FieldGroup>
  ),
};

/**
 * 3. Description
 * Usa `FieldContent` e `FieldDescription` para texto de ajuda.
 */
export const Description: Story = {
  render: () => (
    <FieldGroup className="mx-auto w-72">
      <Field orientation="horizontal">
        <Checkbox id="terms-checkbox-desc" name="terms-checkbox-desc" defaultChecked />
        <FieldContent>
          <FieldLabel htmlFor="terms-checkbox-desc">Accept terms and conditions</FieldLabel>
          <FieldDescription>
            By clicking this checkbox, you agree to the terms and conditions.
          </FieldDescription>
        </FieldContent>
      </Field>
    </FieldGroup>
  ),
};

/**
 * 4. Disabled
 * `disabled` no checkbox e `data-disabled` no `Field` para estados desabilitados.
 */
export const Disabled: Story = {
  render: () => (
    <FieldGroup className="mx-auto w-56">
      <Field orientation="horizontal" data-disabled>
        <Checkbox id="toggle-checkbox-disabled" name="toggle-checkbox-disabled" disabled />
        <FieldLabel htmlFor="toggle-checkbox-disabled">Enable notifications</FieldLabel>
      </Field>
    </FieldGroup>
  ),
};

/**
 * Tamanhos: `sm` reduz só a caixa e o ícone.
 */
export const Sizes: Story = {
  name: "Tamanhos",
  render: () => (
    <div className="flex flex-col gap-3">
      <Checkbox label="Padrão" defaultChecked />
      <Checkbox label="Pequeno" size="sm" defaultChecked />
    </div>
  ),
};

/**
 * Indeterminado: o valor vem do estado da tela, quando parte do grupo está marcada.
 */
export const Indeterminate: Story = {
  name: "Indeterminado",
  args: { label: "Selecionar todos", checked: "indeterminate" },
};

/**
 * Em cartão: o `FieldLabel` que envolve um `Field` ganha borda, raio e padding.
 * No Figma, é o Type Box.
 */
export const Card: Story = {
  name: "Em cartão",
  render: () => (
    <FieldGroup className="mx-auto w-72">
      <FieldLabel>
        <Field orientation="horizontal">
          <Checkbox id="plano-anual" defaultChecked />
          <FieldContent>
            <FieldTitle>Plano anual</FieldTitle>
            <FieldDescription>Cobrança uma vez por ano.</FieldDescription>
          </FieldContent>
        </Field>
      </FieldLabel>
      <FieldLabel>
        <Field orientation="horizontal">
          <Checkbox id="plano-mensal" />
          <FieldContent>
            <FieldTitle>Plano mensal</FieldTitle>
            <FieldDescription>Cobrança todo mês.</FieldDescription>
          </FieldContent>
        </Field>
      </FieldLabel>
    </FieldGroup>
  ),
};

/**
 * 5. Group
 * Vários checkboxes em lista usando `FieldSet`, `FieldLegend`, `FieldDescription` e `FieldGroup`.
 */
export const Group: Story = {
  render: () => (
    <FieldSet>
      <FieldLegend variant="label">Show these items on the desktop:</FieldLegend>
      <FieldDescription>Select the items you want to show on the desktop.</FieldDescription>
      <FieldGroup className="gap-3" data-slot="checkbox-group">
        <Field orientation="horizontal">
          <Checkbox
            id="finder-pref-9k2-hard-disks-ljj-checkbox"
            name="finder-pref-9k2-hard-disks-ljj-checkbox"
            defaultChecked
          />
          <FieldLabel htmlFor="finder-pref-9k2-hard-disks-ljj-checkbox" className="font-normal">
            Hard disks
          </FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <Checkbox
            id="finder-pref-9k2-external-disks-1yg-checkbox"
            name="finder-pref-9k2-external-disks-1yg-checkbox"
            defaultChecked
          />
          <FieldLabel htmlFor="finder-pref-9k2-external-disks-1yg-checkbox" className="font-normal">
            External disks
          </FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <Checkbox
            id="finder-pref-9k2-cds-dvds-fzt-checkbox"
            name="finder-pref-9k2-cds-dvds-fzt-checkbox"
          />
          <FieldLabel htmlFor="finder-pref-9k2-cds-dvds-fzt-checkbox" className="font-normal">
            CDs, DVDs, and iPods
          </FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <Checkbox
            id="finder-pref-9k2-connected-servers-6l2-checkbox"
            name="finder-pref-9k2-connected-servers-6l2-checkbox"
          />
          <FieldLabel
            htmlFor="finder-pref-9k2-connected-servers-6l2-checkbox"
            className="font-normal"
          >
            Connected servers
          </FieldLabel>
        </Field>
      </FieldGroup>
    </FieldSet>
  ),
};
