import { cn } from "../../lib/cn";
import type { SpinnerProps } from "./spinner.types";

type SizeMap = Record<NonNullable<SpinnerProps["size"]>, string>;
type DegreeMap = Record<NonNullable<SpinnerProps["degree"]>, string>;

const sizeClasses: SizeMap = {
  xs: "size-3",
  sm: "size-4",
  md: "size-5",
  lg: "size-8",
};

const degreeDurations: DegreeMap = {
  slow: "800ms",
  normal: "600ms",
  fast: "400ms",
};

export function getSpinnerClassName({
  size = "md",
  className,
}: Pick<SpinnerProps, "size" | "className">) {
  return cn("animate-spin", sizeClasses[size], className);
}

export function getSpinnerStyle({
  degree = "normal",
  style,
}: Pick<SpinnerProps, "degree" | "style">): React.CSSProperties | undefined {
  if (!style && degree === "normal") {
    return undefined;
  }

  const animationDuration = degreeDurations[degree];

  return {
    ...style,
    animationDuration,
  };
}
