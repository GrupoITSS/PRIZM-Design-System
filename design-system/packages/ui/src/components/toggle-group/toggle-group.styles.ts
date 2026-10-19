import type { ToggleGroupSpacing } from "./toggle-group.types";

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

export function getToggleGroupRootClasses(
  orientation: "horizontal" | "vertical",
  spacing: ToggleGroupSpacing = 1,
) {
  const gapClass = gapClassBySpacing[spacing] ?? "gap-1";
  const directionClass = orientation === "vertical" ? "flex-col" : "flex-row";

  return ["flex items-center justify-center", directionClass, gapClass].filter(Boolean).join(" ");
}
