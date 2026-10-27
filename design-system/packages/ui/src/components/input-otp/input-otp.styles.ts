import { cva, type VariantProps } from "class-variance-authority";

/**
 * PRIZM InputOTP — container and slot styles using tokens from @grupoitss/prizm-tokens.
 * Slots are flush (no gap), like shadcn docs; spacing only around separators.
 * Escala, fundo, erro e foco da família do campo (decisões D1 a D4 de 27/10/2026).
 */
const containerBase = "flex items-center has-[:disabled]:opacity-50";

export const inputOTPContainerVariants = cva(containerBase, {
  variants: {
    size: {
      sm: "",
      md: "",
      lg: "",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

/** Margin around separator (so only separators add space, slots stay flush) */
export const inputOTPSeparatorGap = "mx-1.5";

/** Separator color: apoio visual, não conteúdo (pendência 3 de 27/10/2026). */
export const inputOTPSeparatorStyles = "shrink-0 text-muted-foreground";

/** Wrapper: one rounded bordered box when slots are flush (no separator) or per-group when separator */
export const inputOTPWrapper =
  "flex overflow-hidden rounded-md border border-input bg-input-background shadow-xs";

/** Invalid/error state for wrapper: só a borda; o anel do foco continua ring (D3). */
export const inputOTPWrapperInvalid = "border-destructive";

const slotBase =
  "relative flex items-center justify-center border-r border-input text-foreground transition-all outline-none";

/** @deprecated Not used (wrapper handles rounding); kept for backwards compatibility. */
export const inputOTPSlotFirst = "";
/** @deprecated Not used (wrapper handles rounding); kept for backwards compatibility. */
export const inputOTPSlotLast = "";

export const inputOTPSlotVariants = cva(slotBase, {
  variants: {
    size: {
      sm: "size-control-height-sm text-xs",
      md: "size-control-height-md text-sm",
      lg: "size-control-height-lg text-base md:text-sm",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

/** Active/focused slot ring (apply when slot is active) */
export const inputOTPSlotActive = "z-10 ring-2 ring-ring ring-offset-background";

/** Placeholder character in empty slots (pendência 2 de 27/10/2026). */
export const inputOTPPlaceholder = "text-muted-foreground";

/** Caret blink animation container (inside slot) */
export const inputOTPCaret =
  "pointer-events-none absolute inset-0 flex items-center justify-center";

export const inputOTPCaretLine = "h-4 w-px animate-caret-blink bg-foreground duration-1000";

/** @deprecated Error state now applies to wrapper instead of individual slots. Use inputOTPWrapperInvalid. */
export const inputOTPSlotInvalid = "border-destructive";

export type InputOTPVariantProps = VariantProps<typeof inputOTPContainerVariants>;
