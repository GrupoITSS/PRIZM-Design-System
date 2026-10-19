/**
 * Estilos do Calendar PRIZM baseados em tokens de `@grupoitss/prizm-tokens`.
 *
 * Sobrescreve as variáveis CSS padrão do `react-day-picker` (style.css)
 * para usar tokens PRIZM em vez dos defaults (blue, 100% border-radius, etc.).
 */

export const calendarRootStyles = [
  "bg-background group/calendar p-3 [--cell-size:--spacing(8)]",
  "[[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
  // Sobrescreve as variáveis CSS do react-day-picker para usar tokens PRIZM
  "[--rdp-accent-color:var(--prizm-color-primary)]",
  "[--rdp-accent-background-color:var(--prizm-color-accent)]",
  "[--rdp-day_button-border-radius:var(--prizm-radius-md)]",
  "[--rdp-day_button-border:none]",
  "[--rdp-selected-border:none]",
  "[--rdp-range_middle-background-color:var(--prizm-color-accent)]",
  "[--rdp-range_middle-color:var(--prizm-color-accent-foreground)]",
  "[--rdp-range_start-color:var(--prizm-color-primary-foreground)]",
  "[--rdp-range_start-date-background-color:var(--prizm-color-primary)]",
  "[--rdp-range_end-color:var(--prizm-color-primary-foreground)]",
  "[--rdp-range_end-date-background-color:var(--prizm-color-primary)]",
  "[--rdp-today-color:var(--prizm-color-accent-foreground)]",
  "[--rdp-outside-opacity:0.5]",
].join(" ");

export const calendarRtlChevronRotationStyles = [
  String.raw`rtl:**:[.rdp-button_next>svg]:rotate-180`,
  String.raw`rtl:**:[.rdp-button_previous>svg]:rotate-180`,
].join(" ");

export const calendarClassNames = {
  root: "w-fit",
  months: "relative flex flex-row flex-wrap gap-4",
  month: "flex w-fit flex-col gap-4",
  nav: "absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1",
  navButton: "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
  monthCaption: "flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)",
  dropdowns: "w-full flex items-center text-sm font-medium justify-center h-(--cell-size) gap-1.5",
  dropdownRoot:
    "has-focus:border-ring border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] relative rounded-md border",
  dropdown: "bg-popover absolute inset-0 opacity-0",
  captionLabelBase: "select-none font-medium",
  captionLabelAsLabel: "text-sm",
  captionLabelAsDropdown:
    "[&>svg]:text-muted-foreground flex h-8 items-center gap-1 rounded-md pl-2 pr-1 text-sm [&>svg]:size-3.5",
  table: "w-full border-collapse",
  weekdays: "flex",
  weekday: "text-muted-foreground flex-1 select-none rounded-md text-[0.8rem] font-normal",
  week: "mt-2 flex w-full",
  weekNumberHeader: "select-none w-(--cell-size)",
  weekNumber: "text-muted-foreground select-none text-[0.8rem]",
  dayBase:
    "relative w-full h-full p-0 text-center [&:last-child_[data-range-middle=true]]:rounded-r-md! group/day aspect-square select-none",
  dayRangeMiddleRoundingWithWeekNumber: "[&:nth-child(2)_[data-range-middle=true]]:rounded-l-md!",
  dayRangeMiddleRoundingWithoutWeekNumber: "[&:first-child_[data-range-middle=true]]:rounded-l-md!",
  rangeStart: "rounded-l-md bg-accent text-accent-foreground",
  rangeMiddleBase: "rounded-none bg-accent text-accent-foreground",
  rangeMiddleButtonRoundingWithWeekNumber:
    "[&:nth-child(2)_button]:rounded-l-md! [&:last-child_button]:rounded-r-md!",
  rangeMiddleButtonRoundingWithoutWeekNumber:
    "[&:first-child_button]:rounded-l-md! [&:last-child_button]:rounded-r-md!",
  rangeEnd: "rounded-r-md bg-accent text-accent-foreground",
  today: "bg-accent text-accent-foreground rounded-md",
  outside: "text-muted-foreground aria-selected:text-muted-foreground",
  disabled: "text-muted-foreground opacity-50",
  hidden: "invisible",
} as const;

export const calendarDayButtonStyles = [
  // Base size & shape (Figma: 32x32, rounded-md)
  "flex size-(--cell-size) items-center justify-center rounded-md p-0 font-normal leading-none",

  // Ensure our selected styles override react-day-picker default border/ring.
  "aria-selected:border-0! aria-selected:ring-0! aria-selected:ring-offset-0!",

  // Selected (single)
  "data-[selected-single=true]:bg-primary! rounded-md! data-[selected-single=true]:text-primary-foreground! data-[selected-single=true]:hover:bg-primary/80! border-none! ring-0!",

  // Selected (range)
  "data-[range-start=true]:bg-primary! data-[range-start=true]:text-primary-foreground! data-[range-start=true]:hover:bg-primary/80! rounded-md",
  "data-[range-end=true]:bg-primary! data-[range-end=true]:text-primary-foreground! data-[range-end=true]:hover:bg-primary/80!",
  "data-[range-middle=true]:bg-accent! data-[range-middle=true]:text-accent-foreground! data-[range-middle=true]:rounded-none",

  "group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px]",
  "",
].join(" ");
