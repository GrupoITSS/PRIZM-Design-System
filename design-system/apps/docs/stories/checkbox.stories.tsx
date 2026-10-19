import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@grupoitss/prizm-ui/field";
import { Checkbox } from "@grupoitss/prizm-ui/checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Primários/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
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
        <Checkbox defaultChecked className="!size-4 !rounded !border-border" />
        Somente ativos
      </label>
      <label className="flex items-center gap-2 text-sm text-foreground">
        <Checkbox className="!size-4 !rounded !border-border" />
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
