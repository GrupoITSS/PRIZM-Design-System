import {
  ChevronDown as ChevronDownIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "../icons";
import * as React from "react";
import { ptBR } from "react-day-picker/locale";
import {
  type CustomComponents,
  DayButton,
  DayPicker,
  getDefaultClassNames,
  useDayPicker,
} from "react-day-picker";

import { Button, buttonVariants } from "../button";
import { cn } from "../../lib/cn";
import {
  calendarClassNames,
  calendarDayButtonStyles,
  calendarRootStyles,
  calendarRtlChevronRotationStyles,
} from "./calendar.styles";
import type { CalendarProps } from "./calendar.types";

/**
 * Calendar — componente de calendário do design system PRIZM.
 *
 * Construído em cima de `react-day-picker`, espelhando o componente
 * Calendar oficial do shadcn/ui.
 *
 * **Uso recomendado (API por props):**
 *
 * ```tsx
 * const [date, setDate] = React.useState<Date | undefined>(new Date());
 *
 * <Calendar
 *   mode="single"
 *   selected={date}
 *   onSelect={setDate}
 *   className="rounded-lg border"
 * />
 * ```
 */

function CalendarBase({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  // pt-BR por padrão: nomes dos dias, dos meses e rótulos dos botões (WCAG 3.1.2).
  locale = ptBR,
  ...props
}: CalendarProps) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(calendarRootStyles, calendarRtlChevronRotationStyles, className)}
      captionLayout={captionLayout}
      locale={locale}
      formatters={{
        formatMonthDropdown: (date) => date.toLocaleString(locale?.code, { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn(calendarClassNames.root, defaultClassNames.root),
        months: cn(calendarClassNames.months, defaultClassNames.months),
        month: cn(calendarClassNames.month, defaultClassNames.month),
        nav: cn(calendarClassNames.nav, defaultClassNames.nav),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          calendarClassNames.navButton,
          defaultClassNames.button_previous,
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          calendarClassNames.navButton,
          defaultClassNames.button_next,
        ),
        month_caption: cn(calendarClassNames.monthCaption, defaultClassNames.month_caption),
        dropdowns: cn(calendarClassNames.dropdowns, defaultClassNames.dropdowns),
        dropdown_root: cn(calendarClassNames.dropdownRoot, defaultClassNames.dropdown_root),
        dropdown: cn(calendarClassNames.dropdown, defaultClassNames.dropdown),
        caption_label: cn(
          calendarClassNames.captionLabelBase,
          captionLayout === "label"
            ? calendarClassNames.captionLabelAsLabel
            : calendarClassNames.captionLabelAsDropdown,
          defaultClassNames.caption_label,
        ),
        table: calendarClassNames.table,
        weekdays: cn(calendarClassNames.weekdays, defaultClassNames.weekdays),
        weekday: cn(calendarClassNames.weekday, defaultClassNames.weekday),
        week: cn(calendarClassNames.week, defaultClassNames.week),
        week_number_header: cn(
          calendarClassNames.weekNumberHeader,
          defaultClassNames.week_number_header,
        ),
        week_number: cn(calendarClassNames.weekNumber, defaultClassNames.week_number),
        day: cn(
          calendarClassNames.dayBase,
          props.showWeekNumber
            ? calendarClassNames.dayRangeMiddleRoundingWithWeekNumber
            : calendarClassNames.dayRangeMiddleRoundingWithoutWeekNumber,
        ),
        range_start: calendarClassNames.rangeStart,
        range_middle: cn(
          calendarClassNames.rangeMiddleBase,
          props.showWeekNumber
            ? calendarClassNames.rangeMiddleButtonRoundingWithWeekNumber
            : calendarClassNames.rangeMiddleButtonRoundingWithoutWeekNumber,
        ),
        range_end: calendarClassNames.rangeEnd,
        today: calendarClassNames.today,
        outside: calendarClassNames.outside,
        disabled: calendarClassNames.disabled,
        hidden: calendarClassNames.hidden,
        ...classNames,
      }}
      components={{
        Root: CalendarRoot,
        Chevron: CalendarChevron,
        DayButton: CalendarDayButton,
        WeekNumber: CalendarWeekNumber,
        ...components,
      }}
      {...props}
    />
  );
}

function CalendarRoot({
  className,
  rootRef,
  ...props
}: React.ComponentProps<NonNullable<CustomComponents["Root"]>>) {
  return <div data-slot="calendar" ref={rootRef} className={cn(className)} {...props} />;
}

function CalendarChevron({
  className,
  orientation,
  ...props
}: React.ComponentProps<NonNullable<CustomComponents["Chevron"]>>) {
  if (orientation === "left") {
    return <ChevronLeftIcon className={cn("size-4", className)} {...props} />;
  }
  if (orientation === "right") {
    return <ChevronRightIcon className={cn("size-4", className)} {...props} />;
  }
  return <ChevronDownIcon className={cn("size-4", className)} {...props} />;
}

function CalendarWeekNumber({
  children,
  ...props
}: React.ComponentProps<NonNullable<CustomComponents["WeekNumber"]>>) {
  return (
    <td {...props}>
      <div className="flex size-(--cell-size) items-center justify-center text-center">
        {children}
      </div>
    </td>
  );
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const { locale } = useDayPicker().dayPickerProps;
  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  const isRangeStart = Boolean(modifiers.range_start);
  const isRangeEnd = Boolean(modifiers.range_end);
  const isRangeMiddle = Boolean(modifiers.range_middle);
  const isSelectedSingle =
    Boolean(modifiers.selected) && !isRangeStart && !isRangeEnd && !isRangeMiddle;

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon-sm"
      data-day={day.date.toLocaleDateString(locale?.code)}
      data-selected-single={isSelectedSingle ? "true" : undefined}
      data-range-start={isRangeStart ? "true" : undefined}
      data-range-end={isRangeEnd ? "true" : undefined}
      data-range-middle={isRangeMiddle ? "true" : undefined}
      className={cn(calendarDayButtonStyles, className)}
      {...props}
    />
  );
}

const Calendar = React.memo(CalendarBase);
Calendar.displayName = "Calendar";

export { Calendar, CalendarDayButton };
