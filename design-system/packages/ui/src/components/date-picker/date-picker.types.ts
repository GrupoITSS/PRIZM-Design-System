import type * as React from "react";
import type { DateRange } from "react-day-picker";

import type { CalendarProps } from "../calendar";
import type { PopoverProps } from "../popover";
import type { DatePickerTriggerVariantProps } from "./date-picker.styles";

type CalendarConfigProps = Omit<CalendarProps, "mode" | "selected" | "onSelect">;
type PopoverConfigProps = Omit<PopoverProps, "trigger" | "content">;

export type DatePickerSize = NonNullable<DatePickerTriggerVariantProps["size"]>;

export interface DatePickerBaseProps {
  /**
   * ID aplicado ao elemento trigger (botão) para integração com labels externos.
   */
  id?: string;

  /**
   * Classes adicionais aplicadas ao botão trigger.
   */
  className?: string;

  /**
   * Placeholder exibido quando nenhum valor está selecionado.
   * @default "Selecionar data"
   */
  placeholder?: string;

  /**
   * Desabilita o date picker (trigger + calendário).
   */
  disabled?: boolean;

  /**
   * Ícone exibido dentro do botão trigger.
   * Quando não informado, um ícone padrão de calendário é usado.
   */
  icon?: React.ReactNode;

  /**
   * Exibe ou não o ícone de calendário.
   * @default true
   */
  showIcon?: boolean;

  /**
   * Posição do ícone de calendário.
   * @default "end"
   */
  iconPosition?: "start" | "end";

  /**
   * Exibe um ícone de seta (chevron) no final do botão.
   * @default false
   */
  showChevron?: boolean;

  /**
   * Tamanho do trigger — alinhado ao Input (`sm` | `md` | `default` | `lg`).
   * @default "md"
   */
  size?: DatePickerSize;

  /**
   * Faz o botão ocupar toda a largura disponível.
   * @default true
   */
  fullWidth?: boolean;

  /**
   * Fecha o popover automaticamente ao selecionar uma data (single)
   * ou ao completar o intervalo (range).
   * @default true
   */
  closeOnSelect?: boolean;

  /**
   * Props opcionais repassadas para o componente `Calendar` interno.
   */
  calendarProps?: CalendarConfigProps;

  /**
   * Props opcionais repassadas para o componente `Popover` interno.
   * Útil para customizar alinhamento, lado, controle manual de open, etc.
   */
  popoverProps?: PopoverConfigProps;
}

export interface SingleDatePickerProps extends DatePickerBaseProps {
  mode?: "single";
  value?: Date;
  onChange?: (value?: Date) => void;
  formatLabel?: (value?: Date) => React.ReactNode;
}

export interface RangeDatePickerProps extends DatePickerBaseProps {
  mode: "range";
  value?: DateRange;
  onChange?: (value?: DateRange) => void;
  formatLabel?: (value?: DateRange) => React.ReactNode;
}

/**
 * Props públicas do componente `DatePicker` do design system PRIZM.
 */
export type DatePickerProps = SingleDatePickerProps | RangeDatePickerProps;
