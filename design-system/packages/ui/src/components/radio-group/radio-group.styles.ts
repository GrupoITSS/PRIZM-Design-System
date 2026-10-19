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

  return ["flex", directionClass, gapClass].filter(Boolean).join(" ");
}

export const radioItemWrapperClasses = "flex items-start gap-2 text-sm text-foreground";

export const radioItemControlClasses = [
  // Layout e reset de botão nativo
  "grid shrink-0 place-content-center rounded-full border border-input",
  "bg-background cursor-pointer appearance-none",
  // Tamanho e alinhamento (16px total)
  "h-4 w-4 min-h-4 min-w-4",
  // Transições suaves ao alternar seleção / foco
  "transition-colors duration-150 ease-out",
  // Focus ring alinhado com demais componentes PRIZM
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  // Estados desabilitado
  "disabled:cursor-not-allowed disabled:opacity-50",
  // Estado checked: borda/posição alinhadas ao tema
  "data-[state=checked]:border-primary data-[state=checked]:bg-primary/10 data-[state=checked]:text-primary",
].join(" ");

export const radioItemLabelClasses = "font-light leading-none text-foreground";

export const radioItemDescriptionClasses = "mt-1 text-xs text-muted-foreground leading-snug";
