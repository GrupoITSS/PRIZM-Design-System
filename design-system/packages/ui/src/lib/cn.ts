import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// tailwind-merge only knows Tailwind's default scales. The tokens preset adds
// spacing keys (h-control-height-md, size-control-height-sm…), so they're
// declared here; otherwise `h-control-height-md h-10` would keep both.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      spacing: [(value: string) => value.startsWith("control-height-")],
    },
  },
});

/**
 * Joins class names and resolves Tailwind conflicts, so a `className` passed
 * to a component overrides its own classes (e.g. `px-8` replaces `px-4`).
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
