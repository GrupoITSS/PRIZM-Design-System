import { Field, FieldLabel } from "@grupoitss/prizm-ui/field";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { REGEXP_ONLY_DIGITS, REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useState } from "react";
import { InputOTP } from "@grupoitss/prizm-ui/input-otp";

const meta: Meta<typeof InputOTP> = {
  title: "Primários/InputOTP",
  component: InputOTP,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "API preferencial **por props** (sem subcomponentes). Base: [shadcn/ui](https://ui.shadcn.com) + Radix, com tokens PRIZM.\n\n" +
          "Input OTP do design system PRIZM. **API 100% por props** (sem subcomponentes). " +
          "Uso: `<InputOTP length={6} value={value} onChange={setValue} />`. " +
          "Suporta separador (incl. `separatorEvery` para grupos), pattern, invalid, tamanhos.\n\n" +
          "**Documentação base:** " +
          '<a href="https://ui.shadcn.com/docs/components/input-otp" target="_blank" rel="noopener noreferrer">Input OTP — shadcn/ui</a>',
      },
    },
  },
  args: {
    length: 6,
    size: "default",
    disabled: false,
    invalid: false,
  },
  argTypes: {
    length: {
      control: { type: "number", min: 4, max: 8 },
      description: "Number of OTP digits",
    },
    size: {
      control: "select",
      options: ["sm", "default", "lg"],
    },
    separator: {
      control: "select",
      options: [undefined, true, "-", "·"],
      description: "Separator (true = dot, string = character)",
    },
    separatorEvery: {
      control: { type: "number", min: 0 },
      description: "Show separator every N slots (e.g. 2 → 12-34-56)",
    },
    disabled: { control: "boolean" },
    invalid: { control: "boolean", description: "Error state (aria-invalid + visual)" },
  },
};

export default meta;

type Story = StoryObj<typeof InputOTP>;

/** 1. Uso básico: 6 slots, controlado (equivalente ao demo original sem subcomponentes). */
export const Basic: Story = {
  render: function BasicRender(args) {
    const [value, setValue] = useState("");
    return (
      <InputOTP
        {...args}
        length={6}
        value={value}
        onChange={setValue}
        aria-label="Código de verificação"
      />
    );
  },
};

/** 2. Pattern: aceita apenas dígitos e letras (REGEXP_ONLY_DIGITS_AND_CHARS). */
export const PatternAlphanumeric: Story = {
  render: function PatternAlphanumericRender(args) {
    const [value, setValue] = useState("");
    return (
      <InputOTP
        {...args}
        length={6}
        pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
        value={value}
        onChange={setValue}
        aria-label="Código alfanumérico"
      />
    );
  },
};

/** 3. Com Field + label, apenas dígitos (REGEXP_ONLY_DIGITS). */
export const PatternDigitsOnly: Story = {
  render: function PatternDigitsOnlyRender(args) {
    const [value, setValue] = useState("");
    return (
      <Field className="w-fit">
        <FieldLabel htmlFor="digits-only">Digits Only</FieldLabel>
        <InputOTP
          {...args}
          id="digits-only"
          length={6}
          pattern={REGEXP_ONLY_DIGITS}
          value={value}
          onChange={setValue}
          aria-label="Apenas dígitos"
        />
      </Field>
    );
  },
};

/** 4. Separador entre grupos de 2 dígitos (12-34-56). */
export const SeparatorGroups: Story = {
  render: function SeparatorGroupsRender(args) {
    const [value, setValue] = useState("");
    return (
      <InputOTP
        {...args}
        length={6}
        separator="-"
        separatorEvery={2}
        value={value}
        onChange={setValue}
        aria-label="Código com grupos"
      />
    );
  },
};

/** 5. Desabilitado com valor pré-preenchido (123-456). */
export const Disabled: Story = {
  render: function DisabledRender(args) {
    return (
      <InputOTP
        {...args}
        length={6}
        value="123456"
        disabled
        separator="-"
        separatorEvery={3}
        aria-label="OTP desabilitado"
      />
    );
  },
};

/** 6. Controlado com mensagem abaixo (equivalente ao Controlled do doc). */
export const Controlled: Story = {
  render: function ControlledRender(args) {
    const [value, setValue] = useState("");
    return (
      <div className="space-y-2">
        <InputOTP
          {...args}
          length={6}
          value={value}
          onChange={setValue}
          aria-label="One-time password"
        />
        <div className="text-center text-sm text-muted-foreground">
          {value === "" ? <>Enter your one-time password.</> : <>You entered: {value}</>}
        </div>
      </div>
    );
  },
};

/** 7. Estado de erro (invalid): aria-invalid + estilo visual. */
export const Invalid: Story = {
  render: function InvalidRender(args) {
    const [value, setValue] = useState("000000");
    return (
      <InputOTP
        {...args}
        length={6}
        value={value}
        onChange={setValue}
        separator="-"
        separatorEvery={2}
        invalid
        aria-label="Código inválido"
      />
    );
  },
};

/** 8. Quatro dígitos (PIN) com pattern apenas dígitos. */
export const FourDigits: Story = {
  render: function FourDigitsRender(args) {
    const [value, setValue] = useState("");
    return (
      <InputOTP
        {...args}
        length={4}
        pattern={REGEXP_ONLY_DIGITS}
        value={value}
        onChange={setValue}
        aria-label="PIN de 4 dígitos"
      />
    );
  },
};

/** 9. Alfanumérico com separador a cada 3 (123-456). */
export const Alphanumeric: Story = {
  render: function AlphanumericRender(args) {
    const [value, setValue] = useState("");
    return (
      <InputOTP
        {...args}
        length={6}
        pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
        separator="-"
        separatorEvery={3}
        value={value}
        onChange={setValue}
        aria-label="Código alfanumérico com separador"
      />
    );
  },
};

/** Separador traço entre cada dígito (1-2-3-4-5-6). */
export const SeparatorDash: Story = {
  render: function SeparatorDashRender(args) {
    const [value, setValue] = useState("");
    return (
      <InputOTP
        {...args}
        length={6}
        separator="-"
        value={value}
        onChange={setValue}
        aria-label="Código com traço"
      />
    );
  },
};

/** Separador dot (•) entre cada dígito. */
export const SeparatorDot: Story = {
  render: function SeparatorDotRender(args) {
    const [value, setValue] = useState("");
    return (
      <InputOTP
        {...args}
        length={6}
        separator
        value={value}
        onChange={setValue}
        aria-label="Código com ponto"
      />
    );
  },
};

/** Tamanhos: sm, default, lg. */
export const Sizes: Story = {
  render: function SizesRender() {
    const [v1, setV1] = useState("");
    const [v2, setV2] = useState("");
    const [v3, setV3] = useState("");
    return (
      <div className="flex flex-col gap-6">
        <div>
          <p className="mb-2 text-sm text-muted-foreground">sm</p>
          <InputOTP length={6} size="sm" value={v1} onChange={setV1} aria-label="OTP small" />
        </div>
        <div>
          <p className="mb-2 text-sm text-muted-foreground">default</p>
          <InputOTP
            length={6}
            size="default"
            value={v2}
            onChange={setV2}
            aria-label="OTP default"
          />
        </div>
        <div>
          <p className="mb-2 text-sm text-muted-foreground">lg</p>
          <InputOTP length={6} size="lg" value={v3} onChange={setV3} aria-label="OTP large" />
        </div>
      </div>
    );
  },
};

/** Callback quando todos os dígitos forem preenchidos. */
export const OnComplete: Story = {
  render: function OnCompleteRender() {
    const [value, setValue] = useState("");
    const [completed, setCompleted] = useState<string | null>(null);
    return (
      <div className="flex flex-col gap-2">
        <InputOTP
          length={6}
          value={value}
          onChange={setValue}
          onComplete={setCompleted}
          aria-label="OTP completo"
        />
        {completed !== null && (
          <p className="text-sm text-muted-foreground">
            Completou com: <strong>{completed}</strong>
          </p>
        )}
      </div>
    );
  },
};
