import type { ToggleGroupSpacing } from "./toggle-group.types";

type Orientation = "horizontal" | "vertical";

const gapClassBySpacing: Record<ToggleGroupSpacing, string> = {
  0: "gap-0",
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  5: "gap-5",
  6: "gap-6",
  8: "gap-8",
};

/**
 * Classes da raiz. O grupo ocupa só a largura dos itens (w-fit); com `fullWidth`, a largura
 * toda (TG9, 23/11/2026). Antes, a raiz era um flex de largura toda com os itens centralizados.
 */
export function getToggleGroupRootClasses(
  orientation: Orientation,
  spacing: ToggleGroupSpacing = 0,
  fullWidth = false,
) {
  const gapClass = gapClassBySpacing[spacing] ?? "gap-0";
  const directionClass = orientation === "vertical" ? "flex-col items-stretch" : "flex-row items-center";
  const widthClass = fullWidth ? "w-full" : "w-fit";

  return ["flex", directionClass, widthClass, gapClass].join(" ");
}

/**
 * Classes de cada item. Com `spacing` 0 (padrão desde TG2, 23/11/2026), os itens ficam
 * colados: cantos só nas pontas e, no outline, uma borda só entre dois itens. O item
 * focado vem para a frente, para o anel não ficar embaixo do vizinho.
 */
export function getToggleGroupItemClasses({
  spacing = 0,
  orientation = "horizontal",
  variant = "outline",
  fullWidth = false,
}: {
  spacing?: ToggleGroupSpacing;
  orientation?: Orientation;
  variant?: "default" | "outline" | null;
  fullWidth?: boolean;
}) {
  const classes = ["focus-visible:z-10"];
  if (fullWidth) classes.push("flex-1");
  if (spacing === 0) {
    if (orientation === "vertical") {
      classes.push("rounded-none first:rounded-t-md last:rounded-b-md");
      if (variant === "outline") classes.push("border-t-0 first:border-t");
    } else {
      classes.push("rounded-none first:rounded-l-md last:rounded-r-md");
      if (variant === "outline") classes.push("border-l-0 first:border-l");
    }
  }
  return classes.join(" ");
}
