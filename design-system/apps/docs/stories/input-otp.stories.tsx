import { Field, FieldLabel } from "@grupoitss/prizm-ui/field";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { REGEXP_ONLY_DIGITS, REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useState } from "react";
import { InputOTP } from "@grupoitss/prizm-ui/input-otp";
import { EstadosGrade } from "./_estados";

const meta: Meta<typeof InputOTP> = {
  title: "Primários/InputOTP",
  component: InputOTP,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "API preferencial **por props** (sem subcomponentes). Base: [shadcn/ui](https://ui.shadcn.com) + input-otp, com tokens PRIZM.\n\n" +
          "Código de uso único (OTP, PIN) digitado em slots, um por caractere. " +
          "Uso: `<InputOTP length={6} value={value} onChange={setValue} aria-label=\"Código de verificação\" />`. " +
          "Suporta separador (incl. `separatorEvery` para grupos), pattern, erro com `aria-invalid` e tamanhos `sm`, `md` e `lg`.\n\n" +
          "O campo precisa de nome: ligue um `FieldLabel` pelo `id` ou passe `aria-label` (não os dois: o `aria-label` substitui o rótulo visível). " +
          "Os slots são só visuais; o valor, o nome e o estado ficam no input.\n\n" +
          "**Documentação base:** " +
          '<a href="https://ui.shadcn.com/docs/components/input-otp" target="_blank" rel="noopener noreferrer">Input OTP — shadcn/ui</a>',
      },
    },
  },
  args: {
    length: 6,
    size: "md",
    disabled: false,
    "aria-invalid": false,
    "aria-label": "Código de verificação",
  },
  argTypes: {
    length: {
      control: { type: "number", min: 4, max: 8 },
      description: "Número de slots.",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    separator: {
      control: "select",
      options: [undefined, true, "-"],
      description: "Separador (true = traço, string = caractere).",
    },
    separatorEvery: {
      control: { type: "number", min: 0 },
      description: "Separador a cada N slots (ex.: 2 → 12-34-56).",
    },
    placeholder: { control: "text", description: "Caractere dos slots vazios." },
    disabled: { control: "boolean" },
    "aria-invalid": { control: "boolean", description: "Marca o campo como inválido: borda destructive." },
    invalid: { control: "boolean", description: "Apelido de aria-invalid, mantido por compatibilidade." },
    "aria-label": { control: "text", description: "Nome do campo quando não há FieldLabel." },
  },
};

export default meta;

type Story = StoryObj<typeof InputOTP>;

/** 1. Uso básico: 6 slots, controlado. */
export const Basic: Story = {
  render: function BasicRender(args) {
    const [value, setValue] = useState("");
    return <InputOTP {...args} length={6} value={value} onChange={setValue} />;
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

/** 3. Com Field e rótulo visível, apenas dígitos (REGEXP_ONLY_DIGITS). Sem aria-label: o nome vem do rótulo. */
export const PatternDigitsOnly: Story = {
  render: function PatternDigitsOnlyRender(args) {
    const [value, setValue] = useState("");
    return (
      <Field className="w-fit">
        <FieldLabel htmlFor="digits-only">Código de verificação</FieldLabel>
        <InputOTP
          {...args}
          aria-label={undefined}
          id="digits-only"
          length={6}
          pattern={REGEXP_ONLY_DIGITS}
          value={value}
          onChange={setValue}
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
        aria-label="Código desabilitado"
      />
    );
  },
};

/** 6. Controlado com mensagem abaixo. */
export const Controlled: Story = {
  render: function ControlledRender(args) {
    const [value, setValue] = useState("");
    return (
      <div className="space-y-2">
        <InputOTP {...args} length={6} value={value} onChange={setValue} aria-label="Código de uso único" />
        <div className="text-center text-sm text-muted-foreground">
          {value === "" ? <>Digite o código de uso único.</> : <>Você digitou: {value}</>}
        </div>
      </div>
    );
  },
};

/** 7. Erro: aria-invalid no InputOTP e a mensagem ligada por aria-describedby. */
export const Erro: Story = {
  render: function ErroRender(args) {
    const [value, setValue] = useState("000000");
    return (
      <Field className="w-fit" data-invalid>
        <FieldLabel htmlFor="otp-erro">Código de verificação</FieldLabel>
        <InputOTP
          {...args}
          aria-label={undefined}
          id="otp-erro"
          length={6}
          value={value}
          onChange={setValue}
          separator
          separatorEvery={3}
          aria-invalid
          aria-describedby="otp-erro-msg"
        />
        <p id="otp-erro-msg" className="text-destructive text-sm">
          Código incorreto. Confira o SMS e tente de novo.
        </p>
      </Field>
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

/** Separador como caractere ("-") entre cada dígito. */
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

/** Separador padrão (separator={true}): o traço (Minus) de 16px, como no Figma. */
export const SeparatorDefault: Story = {
  render: function SeparatorDefaultRender(args) {
    const [value, setValue] = useState("");
    return (
      <InputOTP
        {...args}
        length={6}
        separator
        separatorEvery={3}
        value={value}
        onChange={setValue}
        aria-label="Código com separador padrão"
      />
    );
  },
};

/** Tamanhos: sm, md e lg, com o slot em control-height, como o Input. */
export const Sizes: Story = {
  render: function SizesRender() {
    const [v1, setV1] = useState("");
    const [v2, setV2] = useState("");
    const [v3, setV3] = useState("");
    return (
      <div className="flex flex-col gap-6">
        <div>
          <p className="mb-2 text-sm text-muted-foreground">sm</p>
          <InputOTP length={6} size="sm" value={v1} onChange={setV1} aria-label="Tamanho sm" />
        </div>
        <div>
          <p className="mb-2 text-sm text-muted-foreground">md (padrão)</p>
          <InputOTP length={6} value={v2} onChange={setV2} aria-label="Tamanho md" />
        </div>
        <div>
          <p className="mb-2 text-sm text-muted-foreground">lg</p>
          <InputOTP length={6} size="lg" value={v3} onChange={setV3} aria-label="Tamanho lg" />
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
          aria-label="Código de verificação"
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

/**
 * Os estados do Figma lado a lado. O foco do InputOTP vem do input real (o slot ativo),
 * não de :focus-visible, então o pseudo-states não o força: Focus e Error (Focus) aparecem
 * ao clicar nos campos Default e Error.
 */
export const Estados: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <EstadosGrade
      estados={[
        { nome: "Default", gatilho: "sem valor", campo: <InputOTP aria-label="Default" /> },
        { nome: "Filled", gatilho: "value", campo: <InputOTP aria-label="Filled" value="123456" /> },
        { nome: "Disabled", gatilho: "disabled", campo: <InputOTP aria-label="Disabled" value="123" disabled /> },
        { nome: "Error", gatilho: "aria-invalid", campo: <InputOTP aria-label="Error" value="000000" aria-invalid /> },
      ]}
    />
  ),
};
