import { Button } from "@grupoitss/prizm-ui/button";
import { addDays } from "date-fns";
import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { type DateRange } from "react-day-picker";
import { enUS } from "react-day-picker/locale";
import { Calendar, CalendarDayButton } from "@grupoitss/prizm-ui/calendar";

const FIGMA_COMPONENT = "https://www.figma.com/design/7NPb3iuxjitMdpudp4yHTl?node-id=17179-197284";
const FIGMA_DOC = "https://www.figma.com/design/7NPb3iuxjitMdpudp4yHTl?node-id=25918-2446";
const CMS_ARTICLE =
  "https://sgq.pas.app.br/cms/prizm_design_system/articles?articleId=0d15d1ec-8e6c-4514-b2c4-d6f958c49233&version=v1";

// Dia com o preço abaixo do número (o fim de semana custa mais).
function PriceDayButton({
  children,
  modifiers,
  day,
  ...props
}: React.ComponentProps<typeof CalendarDayButton>) {
  const isWeekend = day.date.getDay() === 0 || day.date.getDay() === 6;
  return (
    <CalendarDayButton day={day} modifiers={modifiers} {...props}>
      {children}
      {!modifiers.outside && <span>{isWeekend ? "R$ 120" : "R$ 100"}</span>}
    </CalendarDayButton>
  );
}

const meta: Meta<typeof Calendar> = {
  title: "Primários/Calendar",
  component: Calendar,
  tags: ["autodocs", "documentado"],
  parameters: {
    docs: {
      description: {
        component:
          `[Componente no Figma](${FIGMA_COMPONENT}) · [Documentação no Figma](${FIGMA_DOC}) · [Artigo no CMS](${CMS_ARTICLE})\n\n` +
          "API preferencial **por props** (sem subcomponentes). Base: [shadcn/ui](https://ui.shadcn.com) + `react-day-picker`, com tokens PRIZM.\n\n" +
          "Calendar do design system PRIZM: mostra os dias sempre à vista para escolher uma data, várias datas ou um intervalo. Num campo de formulário, use o DatePicker, que abre o mesmo Calendar num Popover.\n\n" +
          '- **Modos:** `mode="single"`, `mode="multiple"` e `mode="range"` (com `numberOfMonths`).\n' +
          '- **Mês e ano em lista:** `captionLayout="dropdown"`, para datas distantes.\n' +
          "- **Idioma:** pt-BR por padrão (dias, meses e nomes das setas). Para outro idioma, passe `locale`.\n" +
          "- **Tamanho:** a célula tem 32px (`--cell-size`). Para 48px, use `[--cell-size:--spacing(12)]` no `className`.\n\n" +
          '**Documentação base:** <a href="https://daypicker.dev" target="_blank" rel="noopener noreferrer">react-day-picker</a> · <a href="https://ui.shadcn.com/docs/components/radix/calendar" target="_blank" rel="noopener noreferrer">Calendar — shadcn/ui</a>',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Calendar>;

export const SingleDate: Story = {
  name: "Data única",
  render: () => (
    <Calendar mode="single" className="rounded-lg border bg-background text-foreground" />
  ),
};

export const RangeSelection: Story = {
  name: "Intervalo",
  render: function Render() {
    const [dateRange, setDateRange] = React.useState<DateRange | undefined>(() => ({
      from: new Date(new Date().getFullYear(), 0, 12),
      to: addDays(new Date(new Date().getFullYear(), 0, 12), 30),
    }));

    return (
      <div className="mx-auto w-fit">
        <Calendar
          mode="range"
          defaultMonth={dateRange?.from}
          selected={dateRange}
          onSelect={setDateRange}
          numberOfMonths={2}
          disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
        />
      </div>
    );
  },
};

export const MonthAndYearSelector: Story = {
  name: "Mês e ano em lista",
  render: () => <Calendar mode="single" captionLayout="dropdown" className="rounded-lg border" />,
};

export const Presets: Story = {
  name: "Atalhos de data",
  render: function Render() {
    const [date, setDate] = React.useState<Date | undefined>(
      () => new Date(new Date().getFullYear(), 1, 12),
    );
    const [currentMonth, setCurrentMonth] = React.useState<Date>(
      () => new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    );

    return (
      <div className="mx-auto w-fit max-w-[300px] space-y-3">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          month={currentMonth}
          onMonthChange={setCurrentMonth}
          fixedWeeks
          className="rounded-lg border [--cell-size:--spacing(8.5)]"
        />
        <div className="flex flex-wrap gap-2 border-t pt-2">
          {[
            { label: "Hoje", value: 0 },
            { label: "Amanhã", value: 1 },
            { label: "Em 3 dias", value: 3 },
            { label: "Em 1 semana", value: 7 },
            { label: "Em 2 semanas", value: 14 },
          ].map((preset) => (
            <Button
              key={preset.value}
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => {
                const newDate = addDays(new Date(), preset.value);
                setDate(newDate);
                setCurrentMonth(new Date(newDate.getFullYear(), newDate.getMonth(), 1));
              }}
            >
              {preset.label}
            </Button>
          ))}
        </div>
      </div>
    );
  },
};

export const BookedDates: Story = {
  name: "Dias ocupados",
  parameters: {
    docs: {
      description: {
        story:
          "Unavailable no Figma. O dia ocupado recebe `disabled` e um modificador com `line-through` e `opacity-100`, para continuar legível. Diga o motivo fora do calendário, num texto de ajuda.",
      },
    },
  },
  render: function Render() {
    const [date, setDate] = React.useState<Date | undefined>(
      () => new Date(new Date().getFullYear(), 1, 3),
    );

    const bookedDates = Array.from(
      { length: 15 },
      (_, i) => new Date(new Date().getFullYear(), 1, 12 + i),
    );

    return (
      <div className="mx-auto w-fit">
        <Calendar
          mode="single"
          defaultMonth={date}
          selected={date}
          onSelect={setDate}
          disabled={bookedDates}
          modifiers={{
            booked: bookedDates,
          }}
          modifiersClassNames={{
            booked: "[&>button]:line-through opacity-100",
          }}
        />
      </div>
    );
  },
};

export const MdSize: Story = {
  name: "Tamanho md (48px)",
  parameters: {
    docs: {
      description: {
        story:
          "Size md no Figma. Não há prop: a célula cresce com `[--cell-size:--spacing(12)]` no `className`.",
      },
    },
  },
  render: () => (
    <Calendar mode="single" className="rounded-lg border [--cell-size:--spacing(12)]" />
  ),
};

export const CustomCellSize: Story = {
  name: "Dia com conteúdo extra",
  parameters: {
    docs: {
      description: {
        story:
          "Custom Day Button no Figma: um `DayButton` próprio, com o preço abaixo do número, e a célula maior com `--cell-size`.",
      },
    },
  },
  render: function Render() {
    const [range, setRange] = React.useState<DateRange | undefined>(() => ({
      from: new Date(new Date().getFullYear(), 11, 8),
      to: addDays(new Date(new Date().getFullYear(), 11, 8), 10),
    }));

    return (
      <div className="mx-auto w-fit">
        <Calendar
          mode="range"
          defaultMonth={range?.from}
          selected={range}
          onSelect={setRange}
          numberOfMonths={1}
          captionLayout="dropdown"
          className="[--cell-size:--spacing(9)] md:[--cell-size:--spacing(10)]"
          formatters={{
            formatMonthDropdown: (date) => {
              return date.toLocaleString("pt-BR", { month: "long" });
            },
          }}
          components={{ DayButton: PriceDayButton }}
        />
      </div>
    );
  },
};

export const WeekNumbers: Story = {
  name: "Número da semana",
  render: function Render() {
    const [date, setDate] = React.useState<Date | undefined>(
      () => new Date(new Date().getFullYear(), 1, 3),
    );

    return (
      <div className="mx-auto w-fit">
        <Calendar
          mode="single"
          defaultMonth={date}
          selected={date}
          onSelect={setDate}
          showWeekNumber
        />
      </div>
    );
  },
};

export const OtherLocale: Story = {
  name: "Outro idioma",
  parameters: {
    docs: {
      description: {
        story:
          "O padrão já é pt-BR. Para outro idioma, passe o `locale` do `react-day-picker/locale` (aqui, `enUS`).",
      },
    },
  },
  render: function Render() {
    const [date, setDate] = React.useState<Date | undefined>(() => new Date());

    return (
      <div className="mx-auto w-fit">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          locale={enUS}
          className="rounded-lg border"
        />
      </div>
    );
  },
};
