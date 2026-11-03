import type { RadioGroupOrientation, RadioGroupSpacing } from "./radio-group.types";

const gapClassBySpacing: Record<RadioGroupSpacing, string> = {
  0: "gap-0",
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  5: "gap-5",
  6: "gap-6",
  8: "gap-8",
};

export function getRadioGroupRootClasses(
  orientation: RadioGroupOrientation = "vertical",
  spacing: RadioGroupSpacing = 2,
) {
  const gapClass = gapClassBySpacing[spacing] ?? "gap-2";
  const directionClass = orientation === "horizontal" ? "flex-row" : "flex-col";

  return ["group/radio-group flex", directionClass, gapClass].filter(Boolean).join(" ");
}

export const radioItemWrapperClasses = "flex items-start gap-2 text-sm text-foreground";

export const radioItemControlClasses = [
  // Layout e reset de botão nativo
  "relative grid shrink-0 place-content-center rounded-full border border-input-strong",
  "bg-input-background cursor-pointer appearance-none",
  // 16px; o after: dá 24px de alvo de ponteiro (WCAG 2.5.8)
  "size-4 min-h-4 min-w-4 after:absolute after:-inset-1 after:content-['']",
  "transition-colors duration-150 ease-out",
  // Foco igual ao do Checkbox: anel separado por 2px de ring-offset
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-ring-offset",
  "disabled:cursor-not-allowed disabled:opacity-50",
  // Marcado: borda e ponto primary; o fundo continua o do campo
  "text-primary data-[state=checked]:border-primary",
  // Erro no item ou no grupo; vence a borda do marcado. O anel continua ring.
  "aria-invalid:border-destructive aria-invalid:data-[state=checked]:border-destructive",
  "group-aria-invalid/radio-group:border-destructive group-aria-invalid/radio-group:data-[state=checked]:border-destructive",
].join(" ");

export const radioItemIndicatorClasses =
  "grid place-content-center text-current animate-in zoom-in-50 duration-150";

/** Ponto de 8px (width/2 no Figma). */
export const radioItemDotClasses = "size-2 fill-current";

export const radioItemContentClasses = "flex flex-col gap-1.5";

export const radioItemLabelClasses = "font-medium leading-none text-foreground";

export const radioItemDescriptionClasses = "text-sm text-muted-foreground leading-snug";
