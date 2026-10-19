import { cva, type VariantProps } from "class-variance-authority";

/**
 * PRIZM InputOTP — container and slot styles using tokens from @grupoitss/prizm-tokens.
 * Slots are flush (no gap), like shadcn docs; spacing only around separators.
 */
const containerBase = "flex items-center has-[:disabled]:opacity-50";

export const inputOTPContainerVariants = cva(containerBase, {
  variants: {
    size: {
      sm: "",
      default: "",
      lg: "",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

/** Margin around separator (so only separators add space, slots stay flush) */
export const inputOTPSeparatorGap = "mx-1.5";

/** Wrapper: one rounded bordered box when slots are flush (no separator) or per-group when separator */
export const inputOTPWrapper = "flex overflow-hidden rounded-md border border-input bg-background";

/** Invalid/error state for wrapper (applied to the group container) */
export const inputOTPWrapperInvalid = "border-destructive ring-2 ring-destructive/20";

const slotBase =
  "relative flex items-center justify-center border-r border-input text-sm transition-all outline-none";

/** @deprecated Not used (wrapper handles rounding); kept for backwards compatibility. */
export const inputOTPSlotFirst = "";
/** @deprecated Not used (wrapper handles rounding); kept for backwards compatibility. */
export const inputOTPSlotLast = "";

export const inputOTPSlotVariants = cva(slotBase, {
  variants: {
    size: {
      sm: "h-8 w-8 min-w-8 text-xs",
      default: "h-10 w-10 min-w-10",
      lg: "h-12 w-12 min-w-12 text-base",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

/** Active/focused slot ring (apply when slot is active) */
export const inputOTPSlotActive = "z-10 ring-2 ring-ring ring-offset-background";

/** Caret blink animation container (inside slot) */
export const inputOTPCaret =
  "pointer-events-none absolute inset-0 flex items-center justify-center";

export const inputOTPCaretLine = "h-4 w-px animate-caret-blink bg-foreground duration-1000";

/** @deprecated Error state now applies to wrapper instead of individual slots. Use inputOTPWrapperInvalid. */
export const inputOTPSlotInvalid = "border-destructive ring-2 ring-destructive/20";

export type InputOTPVariantProps = VariantProps<typeof inputOTPContainerVariants>;
