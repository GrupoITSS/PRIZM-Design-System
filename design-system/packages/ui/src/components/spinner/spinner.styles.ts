import { cn } from "../../lib/cn";
import type { SpinnerProps } from "./spinner.types";

type SizeMap = Record<NonNullable<SpinnerProps["size"]>, string>;
type SpeedMap = Record<NonNullable<SpinnerProps["speed"]>, string>;

// Same scale as the Figma "Size" (xs, sm, md, lg, xl): 12, 16, 20, 24 and 32px.
const sizeClasses: SizeMap = {
  xs: "size-3",
  sm: "size-4",
  md: "size-5",
  lg: "size-6",
  xl: "size-8",
};

// Time per turn. Applied always, so `normal` is 600ms and not the 1s of animate-spin.
export const spinnerSpeeds: SpeedMap = {
  slow: "800ms",
  normal: "600ms",
  fast: "400ms",
};

// With prefers-reduced-motion the spinner keeps turning, slower. `!` so it wins over
// the inline animation-duration set by `speed`.
const reducedMotion = "motion-reduce:[animation-duration:1.5s]!";

export function getSpinnerClassName({
  size = "md",
  className,
}: Pick<SpinnerProps, "size" | "className">) {
  return cn("animate-spin", reducedMotion, sizeClasses[size], className);
}

export function getSpinnerStyle({
  speed = "normal",
  style,
}: Pick<SpinnerProps, "speed" | "style">): React.CSSProperties {
  return {
    animationDuration: spinnerSpeeds[speed],
    ...style,
  };
}
