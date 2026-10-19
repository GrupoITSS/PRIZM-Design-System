import { Input } from "@grupoitss/prizm-ui/input";
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

const meta: Meta<typeof Field> = {
  title: "Compositions/Field",
  component: Field,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "API preferencial **por props** (sem subcomponentes). Base: [shadcn/ui](https://ui.shadcn.com) + Radix, com tokens PRIZM.\n\n" +
          "Componentes de formulário de baixo nível do design system PRIZM (`Field`, `FieldLabel`, `FieldDescription`, etc.), usados para compor layouts acessíveis mais complexos.\n\n" +
          "**Para 90% dos casos, prefira a API por props do `TextField`**, que já combina label, input, descrição e erro em um único componente.\n\n" +
          '**Documentação base:** <a href="https://ui.shadcn.com/docs/components/radix/field" target="_blank" rel="noopener noreferrer">Field — shadcn/ui (Radix)</a>',
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
  render: (args) => (
    <FieldSet>
      <FieldLegend>Profile</FieldLegend>
      <FieldGroup>
        <Field {...args}>
          <FieldLabel htmlFor="name">Full name</FieldLabel>
          <Input id="name" placeholder="Evil Rabbit" />
          <FieldDescription>This appears on invoices and emails.</FieldDescription>
        </Field>
        <Field {...args}>
          <FieldLabel htmlFor="username">Username</FieldLabel>
          <Input id="username" autoComplete="off" />
          <FieldError>Choose another username.</FieldError>
        </Field>
      </FieldGroup>
    </FieldSet>
  ),
};

export const CompositionWithSeparator: Story = {
  render: (args) => (
    <FieldSet>
      <FieldLegend>Notifications</FieldLegend>
      <FieldGroup>
        <Field {...args}>
          <FieldContent>
            <FieldTitle>Email updates</FieldTitle>
            <FieldDescription>Get notified about important activity.</FieldDescription>
          </FieldContent>
        </Field>
        <FieldSeparator>Or</FieldSeparator>
        <Field {...args}>
          <FieldContent>
            <FieldTitle>Push notifications</FieldTitle>
            <FieldDescription>Receive notifications directly on your device.</FieldDescription>
          </FieldContent>
        </Field>
      </FieldGroup>
    </FieldSet>
  ),
};

export const CompositionRequiredFields: Story = {
  render: (args) => (
    <FieldSet>
      <FieldLegend>Account information</FieldLegend>
      <FieldGroup>
        <Field {...args}>
          <FieldLabel htmlFor="email">
            Email
            <span className="text-destructive ml-0.5" aria-hidden="true">
              *
            </span>
          </FieldLabel>
          <Input id="email" type="email" required placeholder="you@example.com" />
          <FieldDescription>
            Required field. We&apos;ll use this email to contact you.
          </FieldDescription>
        </Field>
        <Field {...args}>
          <FieldLabel htmlFor="password">
            Password
            <span className="text-destructive ml-0.5" aria-hidden="true">
              *
            </span>
          </FieldLabel>
          <Input id="password" type="password" required aria-invalid="true" />
          <FieldError>This field is required.</FieldError>
        </Field>
      </FieldGroup>
    </FieldSet>
  ),
};
