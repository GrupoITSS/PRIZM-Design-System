import { Label } from "@grupoitss/prizm-ui/label";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@grupoitss/prizm-ui/field";
import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { Switch } from "@grupoitss/prizm-ui/switch";

const meta: Meta<typeof Switch> = {
  title: "Primários/Switch",
  component: Switch,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "API preferencial **por props** (sem subcomponentes). Base: [shadcn/ui](https://ui.shadcn.com) + Radix, com tokens PRIZM.\n\n" +
          'Switch do design system PRIZM com API **100% baseada em props** (sem subcomponentes). Internamente usa Radix `Switch` para acessibilidade e comportamento, mas a composição é totalmente encapsulada.\n\nUso recomendado:\n\n```tsx\nconst [enabled, setEnabled] = React.useState(false);\n\n<Switch\n  checked={enabled}\n  onChange={setEnabled}\n  aria-label="Airplane mode"\n/>\n```\n\n**Documentação de referência (Radix/shadcn):** <a href="https://ui.shadcn.com/docs/components/radix/switch" target="_blank" rel="noopener noreferrer">Switch — shadcn/ui (Radix)</a>',
      },
    },
  },
  args: {
    size: "default",
    disabled: false,
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "default", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Basic: Story = {
  render: function Render(args) {
    const [enabled, setEnabled] = React.useState(false);
    return <Switch {...args} checked={enabled} onChange={setEnabled} aria-label="Airplane mode" />;
  },
};

export const WithLabel: Story = {
  render: function Render(args) {
    const [enabled, setEnabled] = React.useState(false);

    return (
      <div className="flex items-center space-x-2">
        <Switch {...args} checked={enabled} onChange={setEnabled} id="airplane-mode" />
        <Label htmlFor="airplane-mode">Airplane mode</Label>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: function Render(args) {
    const [small, setSmall] = React.useState(false);
    const [medium, setMedium] = React.useState(true);
    const [large, setLarge] = React.useState(false);

    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Switch
            {...args}
            size="sm"
            checked={small}
            onChange={setSmall}
            aria-label="Small switch"
          />
          <span className="text-sm text-muted-foreground">Tamanho `sm`</span>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            {...args}
            size="default"
            checked={medium}
            onChange={setMedium}
            aria-label="Default switch"
          />
          <span className="text-sm text-muted-foreground">Tamanho `default`</span>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            {...args}
            size="lg"
            checked={large}
            onChange={setLarge}
            aria-label="Large switch"
          />
          <span className="text-sm text-muted-foreground">Tamanho `lg`</span>
        </div>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Switch {...args} disabled aria-label="Disabled off" />
        <span className="text-sm text-muted-foreground">Desativado (off)</span>
      </div>
      <div className="flex items-center gap-2">
        <Switch {...args} disabled defaultChecked aria-label="Disabled on" />
        <span className="text-sm text-muted-foreground">Desativado (on)</span>
      </div>
    </div>
  ),
};

export const WithDescription: Story = {
  render: function Render(args) {
    const [enabled, setEnabled] = React.useState(false);

    return (
      <Field orientation="horizontal" className="max-w-sm">
        <FieldContent>
          <FieldLabel htmlFor="switch-focus-mode">Share across devices</FieldLabel>
          <FieldDescription>
            Focus is shared across devices, and turns off when you leave the app.
          </FieldDescription>
        </FieldContent>
        <Switch {...args} id="switch-focus-mode" checked={enabled} onChange={setEnabled} />
      </Field>
    );
  },
};

export const ChoiceCard: Story = {
  render: function Render(args) {
    const [share, setShare] = React.useState(false);
    const [notifications, setNotifications] = React.useState(true);

    return (
      <FieldGroup className="w-full max-w-sm">
        <FieldLabel htmlFor="switch-share">
          <Field orientation="horizontal">
            <FieldContent>
              <FieldTitle>Share across devices</FieldTitle>
              <FieldDescription>
                Focus is shared across devices, and turns off when you leave the app.
              </FieldDescription>
            </FieldContent>
            <Switch {...args} id="switch-share" checked={share} onChange={setShare} />
          </Field>
        </FieldLabel>
        <FieldLabel htmlFor="switch-notifications">
          <Field orientation="horizontal">
            <FieldContent>
              <FieldTitle>Enable notifications</FieldTitle>
              <FieldDescription>
                Receive notifications when focus mode is enabled or disabled.
              </FieldDescription>
            </FieldContent>
            <Switch
              {...args}
              id="switch-notifications"
              checked={notifications}
              onChange={setNotifications}
            />
          </Field>
        </FieldLabel>
      </FieldGroup>
    );
  },
};

export const DisabledField: Story = {
  render: (args) => (
    <Field orientation="horizontal" data-disabled className="w-fit">
      <Switch {...args} id="switch-disabled-unchecked" disabled />
      <FieldLabel htmlFor="switch-disabled-unchecked">Disabled</FieldLabel>
    </Field>
  ),
};

export const Invalid: Story = {
  render: (args) => (
    <Field orientation="horizontal" className="max-w-sm" data-invalid>
      <FieldContent>
        <FieldLabel htmlFor="switch-terms">Accept terms and conditions</FieldLabel>
        <FieldDescription>You must accept the terms and conditions to continue.</FieldDescription>
      </FieldContent>
      <Switch {...args} id="switch-terms" aria-invalid />
    </Field>
  ),
};

export const SizesWithField: Story = {
  render: (args) => (
    <FieldGroup className="w-full max-w-[10rem]">
      <Field orientation="horizontal">
        <Switch {...args} id="switch-size-sm" size="sm" />
        <FieldLabel htmlFor="switch-size-sm">Small</FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <Switch {...args} id="switch-size-default" size="default" />
        <FieldLabel htmlFor="switch-size-default">Default</FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <Switch {...args} id="switch-size-lg" size="lg" />
        <FieldLabel htmlFor="switch-size-lg">Large</FieldLabel>
      </Field>
    </FieldGroup>
  ),
};
