import type * as React from "react";
import type { DayPicker, Locale as DayPickerLocale } from "react-day-picker";
import type { Button } from "../button";

/**
 * Props públicas do componente `Calendar` do design system PRIZM.
 *
 * - Baseadas em `react-day-picker` (`DayPicker`).
 * - Expõem apenas customizações relevantes para o design system.
 */
export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  /** Variante de botão usada nos controles de navegação. @default "ghost" */
  buttonVariant?: React.ComponentProps<typeof Button>["variant"];
  /** Locale opcional para formatação de datas e suporte RTL. */
  locale?: Partial<DayPickerLocale>;
};
