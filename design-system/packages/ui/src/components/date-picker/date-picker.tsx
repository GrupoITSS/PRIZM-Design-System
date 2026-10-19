import { Calendar as CalendarIcon, ChevronDownIcon } from "lucide-react";
import * as React from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { DateRange } from "react-day-picker";

import { Button } from "../button";
import { Calendar } from "../calendar";
import { Popover } from "../popover";
import { cn } from "../../lib/cn";
import { datePickerTriggerVariants } from "./date-picker.styles";
import type { DatePickerProps } from "./date-picker.types";

function formatSingleDefault(value?: Date) {
  if (!value) return "";
  try {
    return format(value, "dd/MM/yyyy", { locale: ptBR });
  } catch {
    return value.toLocaleDateString("pt-BR");
  }
}

function formatRangeDefault(value?: DateRange) {
  if (!value?.from) return "";
  if (value.from && value.to) {
    try {
      return `${format(value.from, "dd/MM/yyyy", { locale: ptBR })} - ${format(
        value.to,
        "dd/MM/yyyy",
        { locale: ptBR },
      )}`;
    } catch {
      return `${value.from.toLocaleDateString("pt-BR")} - ${value.to.toLocaleDateString("pt-BR")}`;
    }
  }
  try {
    return format(value.from, "dd/MM/yyyy", { locale: ptBR });
  } catch {
    return value.from.toLocaleDateString("pt-BR");
  }
}

/**
 * DatePicker — seleção de datas do design system PRIZM.
 *
 * Popover + Calendar, trigger alinhado ao Input (tamanho médio por padrão,
 * ícone de calendário à direita).
 */
const DatePicker = ({
  ref,
  ...props
}: DatePickerProps & { ref?: React.Ref<HTMLButtonElement> }) => {
  const {
    id,
    className,
    placeholder = "Selecionar data",
    disabled,
    icon,
    showIcon = true,
    iconPosition = "end",
    showChevron = false,
    size = "md",
    fullWidth = true,
    closeOnSelect = true,
    calendarProps,
    popoverProps,
  } = props;

  const isRange = props.mode === "range";

  const [open, setOpen] = React.useState(popoverProps?.open ?? popoverProps?.defaultOpen ?? false);

  const handleOpenChange = (nextOpen: boolean) => {
    popoverProps?.onOpenChange?.(nextOpen);
    if (typeof popoverProps?.open === "boolean") return;
    setOpen(nextOpen);
  };

  const valueLabel = ((): React.ReactNode => {
    if (isRange) {
      const { value, formatLabel } = props;
      const typedValue = value;
      if (formatLabel) return formatLabel(typedValue);
      const text = formatRangeDefault(typedValue);
      return text || placeholder;
    }

    const { value, formatLabel } = props;
    const typedValue = value;
    if (formatLabel) return formatLabel(typedValue);
    const text = formatSingleDefault(typedValue);
    return text || placeholder;
  })();

  const isEmpty = (() => {
    if (isRange) {
      const { value } = props;
      const typedValue = value;
      return !typedValue?.from && !typedValue?.to;
    }

    const { value } = props;
    const typedValue = value;
    return !typedValue;
  })();

  const handleSingleSelect = (date?: Date) => {
    if (props.mode === "range") return;
    props.onChange?.(date);
    if (closeOnSelect && date) {
      handleOpenChange(false);
    }
  };

  const handleRangeSelect = (range?: DateRange) => {
    if (props.mode !== "range") return;
    props.onChange?.(range);
    if (closeOnSelect && range?.from && range.to) {
      handleOpenChange(false);
    }
  };

  const triggerIcon = icon ?? <CalendarIcon className="size-4" />;

  const iconNode = showIcon ? (
    <span className="shrink-0 text-muted-foreground" aria-hidden>
      {triggerIcon}
    </span>
  ) : null;

  return (
    <Popover
      {...popoverProps}
      open={popoverProps?.open ?? open}
      onOpenChange={handleOpenChange}
      modal={popoverProps?.modal ?? true}
      size="sm"
      align={popoverProps?.align ?? "start"}
      side={popoverProps?.side ?? "bottom"}
      className={cn("z-[200] w-auto min-w-[18rem] p-0", popoverProps?.className)}
      trigger={
        <Button
          ref={ref}
          id={id}
          type="button"
          variant="outline"
          size={size === "sm" ? "sm" : size === "lg" ? "lg" : "default"}
          disabled={disabled}
          data-empty={isEmpty ? "true" : undefined}
          data-size={size}
          aria-haspopup="dialog"
          aria-expanded={popoverProps?.open ?? open}
          className={cn(
            datePickerTriggerVariants({ fullWidth, size }),
            "has-[>svg]:px-3",
            className,
          )}
        >
          {iconPosition === "start" ? iconNode : null}
          <span className="min-w-0 flex-1 truncate text-left">{valueLabel}</span>
          {iconPosition === "end" ? iconNode : null}
          {showChevron ? (
            <ChevronDownIcon className="size-4 shrink-0 text-muted-foreground" />
          ) : null}
        </Button>
      }
      content={
        props.mode === "range" ? (
          <Calendar
            {...calendarProps}
            locale={calendarProps?.locale ?? ptBR}
            mode="range"
            selected={props.value}
            onSelect={handleRangeSelect}
            disabled={calendarProps?.disabled}
            className={cn("rounded-md border-0", calendarProps?.className)}
          />
        ) : (
          <Calendar
            {...calendarProps}
            locale={calendarProps?.locale ?? ptBR}
            mode="single"
            selected={props.value}
            onSelect={handleSingleSelect}
            disabled={calendarProps?.disabled}
            className={cn("rounded-md border-0", calendarProps?.className)}
          />
        )
      }
    />
  );
};

DatePicker.displayName = "DatePicker";

export { DatePicker };
