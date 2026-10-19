import { Button } from "@grupoitss/prizm-ui/button";
import { addDays } from "date-fns";
import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { type DateRange } from "react-day-picker";
import { ptBR } from "react-day-picker/locale";
import { Calendar, CalendarDayButton } from "@grupoitss/prizm-ui/calendar";

// Day with a price below the number (weekends cost more).
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
      {!modifiers.outside && <span>{isWeekend ? "$120" : "$100"}</span>}
    </CalendarDayButton>
  );
}

const meta: Meta<typeof Calendar> = {
  title: "Primários/Calendar",
  component: Calendar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "API preferencial **por props** (sem subcomponentes). Base: [shadcn/ui](https://ui.shadcn.com) + Radix, com tokens PRIZM.\n\n" +
          "Calendar do design system PRIZM, baseado em `react-day-picker` e no componente Calendar do shadcn/ui.\n\n" +
          'Suporta seleção de data única (`mode="single"`), intervalo (`mode="range"`), e várias configurações avançadas.\n\n' +
          '**Documentação:** <a href="https://ui.shadcn.com/docs/components/radix/calendar" target="_blank" rel="noopener noreferrer">Calendar — shadcn/ui</a>',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Calendar>;

export const SingleDate: Story = {
  render: () => (
    <Calendar mode="single" className="rounded-lg border bg-background text-foreground" />
  ),
};

export const RangeSelection: Story = {
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
  render: () => <Calendar mode="single" captionLayout="dropdown" className="rounded-lg border" />,
};

export const Presets: Story = {
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
            { label: "Today", value: 0 },
            { label: "Tomorrow", value: 1 },
            { label: "In 3 days", value: 3 },
            { label: "In a week", value: 7 },
            { label: "In 2 weeks", value: 14 },
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

export const CustomCellSize: Story = {
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
              return date.toLocaleString("default", { month: "long" });
            },
          }}
          components={{ DayButton: PriceDayButton }}
        />
      </div>
    );
  },
};

export const WeekNumbers: Story = {
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

export const PortugueseLocale: Story = {
  name: "Locale: pt-BR",
  render: function Render() {
    const [date, setDate] = React.useState<Date | undefined>(() => new Date());

    return (
      <div className="mx-auto w-fit">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          locale={ptBR}
          className="rounded-lg border"
        />
      </div>
    );
  },
};
