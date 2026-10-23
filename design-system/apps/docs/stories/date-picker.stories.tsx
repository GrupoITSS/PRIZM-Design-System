import { Field, FieldGroup, FieldLabel } from "@grupoitss/prizm-ui/field";
import { Input } from "@grupoitss/prizm-ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@grupoitss/prizm-ui/input-group";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { addDays } from "date-fns";
import { Calendar as CalendarIcon } from "@grupoitss/prizm-ui/icons";
import * as React from "react";
import type { DateRange } from "react-day-picker";
import { DatePicker } from "@grupoitss/prizm-ui/date-picker";

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

  // 2) Suporte básico a expressões do tipo "In 2 days".
  const inDaysMatch = /^in\s+(\d+)\s+days?$/i.exec(trimmed);
  if (inDaysMatch) {
    const days = Number(inDaysMatch[1]);
    const base = new Date();
    base.setDate(base.getDate() + days);
    return base;
  }

  return null;
}

const meta: Meta<typeof DatePicker> = {
  title: "Primários/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "API preferencial **por props** (sem subcomponentes). Base: [shadcn/ui](https://ui.shadcn.com) + Radix, com tokens PRIZM.\n\n" +
          "Componente de seleção de datas do design system PRIZM. Construído em cima de `Popover` e `Calendar` (baseado em `react-day-picker`), exposto como um único componente baseado em props.\n\n" +
          'Suporta seleção de data única (`mode="single"`) e intervalo de datas (`mode="range"`), além de cenários avançados com input, presets e linguagem natural.\n\n' +
          '**Documentação de referência:** <a href="https://ui.shadcn.com/docs/components/radix/date-picker" target="_blank" rel="noopener noreferrer">Date Picker — shadcn/ui</a>',
      },
    },
  },
  args: {
    placeholder: "Pick a date",
  },
  argTypes: {
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
        <FieldLabel htmlFor="date-picker-basic">Date</FieldLabel>
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
        placeholder="Pick a date"
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
        <FieldLabel htmlFor="date-picker-range">Date Picker Range</FieldLabel>
        <DatePicker
          mode="range"
          id="date-picker-range"
          value={range}
          onChange={setRange}
          placeholder="Pick a date"
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
        <FieldLabel htmlFor="date-of-birth">Date of birth</FieldLabel>
        <DatePicker
          mode="single"
          id="date-of-birth"
          value={date}
          onChange={setDate}
          placeholder="Select date"
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
      return date.toLocaleDateString("en-US", {
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
        <FieldLabel htmlFor="date-required">Subscription Date</FieldLabel>
        <InputGroup>
          <InputGroupInput
            id="date-required"
            value={value}
            placeholder="June 01, 2025"
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
              placeholder="Select date"
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
          <FieldLabel htmlFor="date-picker-optional">Date</FieldLabel>
          <DatePicker
            mode="single"
            id="date-picker-optional"
            value={date}
            onChange={(next) => {
              setDate(next);
              setOpen(false);
            }}
            placeholder="Select date"
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
          <FieldLabel htmlFor="time-picker-optional">Time</FieldLabel>
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
      return date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    }

    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState("In 2 days");
    const [date, setDate] = React.useState<Date | undefined>(() => parseDate(value) || undefined);

    return (
      <Field className="mx-auto max-w-xs">
        <FieldLabel htmlFor="date-optional">Schedule Date</FieldLabel>
        <InputGroup>
          <InputGroupInput
            id="date-optional"
            value={value}
            placeholder="Tomorrow or next week"
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
              placeholder="Select date"
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
          Your post will be published on{" "}
          <span className="font-medium">{formatDateDisplay(date)}</span>.
        </div>
      </Field>
    );
  },
};
