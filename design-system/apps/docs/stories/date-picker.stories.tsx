import { Field, FieldGroup, FieldLabel } from "@grupoitss/prizm-ui/field";
import { Input } from "@grupoitss/prizm-ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@grupoitss/prizm-ui/input-group";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { addDays } from "date-fns";
import { Calendar as CalendarIcon } from "@grupoitss/prizm-ui/icons";
import * as React from "react";
import type { DateRange } from "react-day-picker";
import { DatePicker } from "@grupoitss/prizm-ui/date-picker";
import { EstadosGrade } from "./_estados";

// Pequeno helper local para parsear datas em linguagem natural simples,
// sem depender da biblioteca externa `chrono-node`.
function parseDate(value: string): Date | null {
  const trimmed = value.trim();
  if (!trimmed) return null;

  // 1) Tenta fazer parse direto via Date (ex.: "2025-01-01", "Jan 1, 2025", etc.).
  const direct = new Date(trimmed);
  if (!Number.isNaN(direct.getTime())) {
    return direct;
  }

  // 2) Suporte básico a expressões do tipo "Em 2 dias".
  const inDaysMatch = /^em\s+(\d+)\s+dias?$/i.exec(trimmed);
  if (inDaysMatch) {
    const days = Number(inDaysMatch[1]);
    const base = new Date();
    base.setDate(base.getDate() + days);
    return base;
  }

  return null;
}

// Traceability: the component set in [PRIZM] Componentes, its documentation
// frame and the CMS article. The token map lives next to the component
// (date-picker.tokens.json) and is checked against the classes in a test.
const FIGMA_URL = "https://www.figma.com/design/7NPb3iuxjitMdpudp4yHTl?node-id=334-4051";
const FIGMA_DOC_URL = "https://www.figma.com/design/7NPb3iuxjitMdpudp4yHTl?node-id=25439-2501";
const CMS_URL =
  "https://sgq.pas.app.br/cms/prizm_design_system/articles?articleId=68521515-38ca-420e-a465-3833b6f7c285&version=v1";

const meta: Meta<typeof DatePicker> = {
  title: "Primários/DatePicker",
  component: DatePicker,
  tags: ["autodocs", "documentado"],
  parameters: {
    docs: {
      description: {
        component:
          "API preferencial **por props** (sem subcomponentes). Base: [shadcn/ui](https://ui.shadcn.com) + Radix, com tokens PRIZM.\n\n" +
          "Componente de seleção de datas do design system PRIZM. Construído em cima de `Popover` e `Calendar` (baseado em `react-day-picker`), exposto como um único componente baseado em props.\n\n" +
          'Suporta seleção de data única (`mode="single"`) e intervalo de datas (`mode="range"`), além de cenários avançados com input, presets e linguagem natural.\n\n' +
          "O calendário abre como diálogo com o nome de `calendarLabel` (padrão \"Escolher data\"), em pt-BR, com o foco no dia escolhido. Erro com `aria-invalid`; o campo não muda no hover; com o calendário aberto, o gatilho usa o anel do foco.\n\n" +
          `[Componente no Figma](${FIGMA_URL}) · [Documentação no Figma](${FIGMA_DOC_URL}) · [Artigo no CMS](${CMS_URL}).\n\n` +
          '**Documentação de referência:** <a href="https://ui.shadcn.com/docs/components/radix/date-picker" target="_blank" rel="noopener noreferrer">Date Picker — shadcn/ui</a>',
      },
    },
  },
  args: {
    placeholder: "Selecionar data",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    iconPosition: {
      control: "select",
      options: ["start", "end"],
    },
    showIcon: { control: "boolean" },
    showChevron: { control: "boolean" },
    fullWidth: { control: "boolean" },
    closeOnSelect: { control: "boolean" },
    disabled: { control: "boolean" },
    "aria-invalid": {
      control: "boolean",
      description: "Marca o campo como inválido: borda destructive.",
    },
    calendarLabel: {
      control: "text",
      description: 'Nome do calendário para o leitor de tela. Padrão: "Escolher data".',
    },
    mode: {
      control: "select",
      options: ["single", "range"],
      description: 'Modo de seleção: data única (`"single"`) ou intervalo (`"range"`).',
    },
    value: {
      control: false,
      description: "Valor atual selecionado (Date ou DateRange).",
    },
    onChange: {
      control: false,
      description: "Callback disparado ao alterar a seleção.",
    },
    calendarProps: {
      control: false,
      description: "Props avançadas repassadas para o `Calendar` interno (locale, disabled, etc.).",
    },
    popoverProps: {
      control: false,
      description:
        "Props avançadas repassadas para o `Popover` interno (align, side, controle de open, etc.).",
    },
  },
};

export default meta;

type Story = StoryObj<typeof DatePicker>;

/**
 * 1. Basic — Date picker simples com data única.
 *
 * Adaptado do exemplo `DatePickerSimple` em `Untitled-1.md`,
 * mas usando a API props-based do `DatePicker`.
 */
export const Basic: Story = {
  render: function Render() {
    const [date, setDate] = React.useState<Date | undefined>();

    return (
      <Field className="mx-auto w-44">
        <FieldLabel htmlFor="date-picker-basic">Data</FieldLabel>
        <DatePicker
          mode="single"
          id="date-picker-basic"
          value={date}
          onChange={setDate}
          calendarProps={{
            defaultMonth: date,
          }}
        />
      </Field>
    );
  },
};

/**
 * 2. WithIcon — Date picker com ícone de calendário e largura maior.
 *
 * Adaptado do exemplo `DatePickerDemo` de uso, mostrando ícone e texto.
 */
export const WithIcon: Story = {
  render: function Render() {
    const [date, setDate] = React.useState<Date | undefined>();

    return (
      <DatePicker
        mode="single"
        value={date}
        onChange={setDate}
        aria-label="Data"
        fullWidth={false}
        calendarProps={{
          defaultMonth: date,
        }}
        popoverProps={{
          align: "start",
        }}
      />
    );
  },
};

/**
 * 3. RangePicker — seleção de intervalo de datas.
 *
 * Adaptado do exemplo `DatePickerWithRange`, usando `mode="range"`.
 */
export const RangePicker: Story = {
  render: function Render() {
    const [range, setRange] = React.useState<DateRange | undefined>(() => ({
      from: new Date(new Date().getFullYear(), 0, 20),
      to: addDays(new Date(new Date().getFullYear(), 0, 20), 20),
    }));

    return (
      <Field className="mx-auto w-60">
        <FieldLabel htmlFor="date-picker-range">Período</FieldLabel>
        <DatePicker
          mode="range"
          id="date-picker-range"
          value={range}
          onChange={setRange}
          placeholder="Selecionar período"
          calendarLabel="Escolher período"
          calendarProps={{
            defaultMonth: range?.from,
            numberOfMonths: 2,
          }}
        />
      </Field>
    );
  },
};

/**
 * 4. DateOfBirth — seleção de data de nascimento com caption em dropdown.
 *
 * Adaptado do exemplo `DatePickerSimple` (Date of Birth).
 */
export const DateOfBirth: Story = {
  render: function Render() {
    const [date, setDate] = React.useState<Date | undefined>();

    return (
      <Field className="mx-auto w-44">
        <FieldLabel htmlFor="date-of-birth">Data de nascimento</FieldLabel>
        <DatePicker
          mode="single"
          id="date-of-birth"
          value={date}
          onChange={setDate}
          calendarProps={{
            captionLayout: "dropdown",
            defaultMonth: date,
          }}
          popoverProps={{
            align: "start",
          }}
        />
      </Field>
    );
  },
};

/**
 * 5. WithInputField — date picker integrado a um campo de input.
 *
 * Adaptado do exemplo `DatePickerInput`, usando `InputGroup`.
 */
export const WithInputField: Story = {
  render: function Render() {
    function formatDate(date: Date | undefined) {
      if (!date) return "";
      return date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    }

    function isValidDate(date: Date | undefined) {
      if (!date) return false;
      return !Number.isNaN(date.getTime());
    }

    const [open, setOpen] = React.useState(false);
    const [date, setDate] = React.useState<Date | undefined>(() => new Date("2025-06-01"));
    const [month, setMonth] = React.useState<Date | undefined>(date);
    const [value, setValue] = React.useState(() => formatDate(date));

    return (
      <Field className="mx-auto w-64">
        <FieldLabel htmlFor="date-required">Data de assinatura</FieldLabel>
        <InputGroup>
          <InputGroupInput
            id="date-required"
            value={value}
            placeholder="01 de junho de 2025"
            onChange={(e) => {
              const nextDate = new Date(e.target.value);
              setValue(e.target.value);
              if (isValidDate(nextDate)) {
                setDate(nextDate);
                setMonth(nextDate);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setOpen(true);
              }
            }}
          />
          <InputGroupAddon align="inline-end">
            <DatePicker
              value={date}
              onChange={(next) => {
                setDate(next);
                setValue(formatDate(next));
              }}
              aria-label="Abrir calendário"
              fullWidth={false}
              showChevron={false}
              icon={<CalendarIcon className="size-4" />}
              popoverProps={{
                open,
                onOpenChange: setOpen,
                align: "end",
                sideOffset: 10,
              }}
              calendarProps={{
                month,
                onMonthChange: setMonth,
              }}
            />
          </InputGroupAddon>
        </InputGroup>
      </Field>
    );
  },
};

/**
 * 6. WithTimeInput — combinação de date picker com campo de horário.
 *
 * Adaptado do exemplo `DatePickerTime`.
 */
export const WithTimeInput: Story = {
  render: function Render() {
    const [open, setOpen] = React.useState(false);
    const [date, setDate] = React.useState<Date | undefined>(undefined);

    return (
      <FieldGroup className="mx-auto max-w-xs flex-row">
        <Field>
          <FieldLabel htmlFor="date-picker-optional">Data</FieldLabel>
          <DatePicker
            mode="single"
            id="date-picker-optional"
            value={date}
            onChange={(next) => {
              setDate(next);
              setOpen(false);
            }}
            fullWidth={false}
            showIcon={false}
            icon={<></>}
            popoverProps={{
              open,
              onOpenChange: setOpen,
              align: "start",
            }}
            calendarProps={{
              captionLayout: "dropdown",
              defaultMonth: date,
            }}
          />
        </Field>
        <Field className="w-32">
          <FieldLabel htmlFor="time-picker-optional">Horário</FieldLabel>
          <Input
            type="time"
            id="time-picker-optional"
            step="1"
            defaultValue="10:30:00"
            className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
          />
        </Field>
      </FieldGroup>
    );
  },
};

/**
 * 7. NaturalLanguage — integração com linguagem natural usando `chrono-node`.
 *
 * Adaptado do exemplo `DatePickerNaturalLanguage`.
 */
export const NaturalLanguage: Story = {
  render: function Render() {
    function formatDateDisplay(date: Date | undefined) {
      if (!date) return "";
      return date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    }

    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState("Em 2 dias");
    const [date, setDate] = React.useState<Date | undefined>(() => parseDate(value) || undefined);

    return (
      <Field className="mx-auto max-w-xs">
        <FieldLabel htmlFor="date-optional">Data de publicação</FieldLabel>
        <InputGroup>
          <InputGroupInput
            id="date-optional"
            value={value}
            placeholder="Em 2 dias ou 2026-11-15"
            onChange={(e) => {
              setValue(e.target.value);
              const parsed = parseDate(e.target.value);
              if (parsed) {
                setDate(parsed);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setOpen(true);
              }
            }}
          />
          <InputGroupAddon align="inline-end">
            <DatePicker
              value={date}
              onChange={(next) => {
                setDate(next);
                setValue(formatDateDisplay(next));
              }}
              aria-label="Abrir calendário"
              fullWidth={false}
              showChevron={false}
              icon={<CalendarIcon className="size-4" />}
              popoverProps={{
                open,
                onOpenChange: setOpen,
                align: "end",
                sideOffset: 8,
              }}
              calendarProps={{
                captionLayout: "dropdown",
                defaultMonth: date,
              }}
            />
          </InputGroupAddon>
        </InputGroup>
        <div className="text-muted-foreground px-1 text-sm">
          A publicação sai em{" "}
          <span className="font-medium">{formatDateDisplay(date)}</span>.
        </div>
      </Field>
    );
  },
};

/**
 * Tamanhos — sm, md e lg, com a altura em `control-height`, como o Input.
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex w-64 flex-col gap-3">
      <DatePicker size="sm" aria-label="Tamanho sm" />
      <DatePicker aria-label="Tamanho md" />
      <DatePicker size="lg" aria-label="Tamanho lg" />
    </div>
  ),
};

/**
 * Erro — `aria-invalid` no DatePicker e a mensagem ligada por `aria-describedby`.
 */
export const Erro: Story = {
  render: function Render() {
    const [date, setDate] = React.useState<Date | undefined>();
    return (
      <Field className="mx-auto w-64" data-invalid>
        <FieldLabel htmlFor="date-picker-erro">Data de entrega</FieldLabel>
        <DatePicker
          id="date-picker-erro"
          value={date}
          onChange={setDate}
          aria-invalid
          aria-describedby="date-picker-erro-msg"
        />
        <p id="date-picker-erro-msg" className="text-destructive text-sm">
          Escolha uma data a partir de amanhã.
        </p>
      </Field>
    );
  },
};

/**
 * Os 6 estados do Figma lado a lado. Focus e Error (Focus) usam o foco forçado
 * pelo storybook-addon-pseudo-states; o calendário aberto usa o mesmo anel.
 */
export const Estados: Story = {
  parameters: {
    pseudo: { focusVisible: ["#date-picker-estado-focus", "#date-picker-estado-erro-focus"] },
    controls: { disable: true },
  },
  render: () => (
    <EstadosGrade
      estados={[
        { nome: "Default", gatilho: "sem data, fechado", campo: <DatePicker aria-label="Default" /> },
        { nome: "Filled", gatilho: "com value", campo: <DatePicker aria-label="Filled" value={new Date(2026, 9, 27)} /> },
        { nome: "Focus", gatilho: ":focus-visible ou calendário aberto", campo: <DatePicker id="date-picker-estado-focus" aria-label="Focus" /> },
        { nome: "Disabled", gatilho: "disabled", campo: <DatePicker aria-label="Disabled" disabled /> },
        { nome: "Error", gatilho: "aria-invalid", campo: <DatePicker aria-label="Error" aria-invalid /> },
        { nome: "Error (Focus)", gatilho: "aria-invalid + foco", campo: <DatePicker id="date-picker-estado-erro-focus" aria-label="Error (Focus)" aria-invalid /> },
      ]}
    />
  ),
};
