import type * as React from "react";
import type { InputOTPVariantProps } from "./input-otp.styles";

/**
 * Separator between OTP slots.
 * - `true`: dash (Minus icon) between slots
 * - `string`: character(s) between slots (e.g. "-", " ")
 * - `ReactNode`: custom element between slots
 * - `undefined`: no separator
 * @default undefined
 */
export type InputOTPSeparator = React.ReactNode;

export interface InputOTPProps extends InputOTPVariantProps {
  /**
   * Controlled value (digits string).
   */
  value?: string;
  /**
   * Callback when value changes.
   */
  onChange?: (value: string) => void;
  /**
   * Number of OTP digits/slots.
   * @default 6
   */
  length?: number;
  /**
   * Separator between slots. `true` = dash, string = character(s), ReactNode = custom.
   * @default undefined
   */
  separator?: InputOTPSeparator;
  /**
   * When set, separator is shown only every N slots (e.g. 2 → 12-34-56, 3 → 123-456).
   * Ignored if `separator` is undefined.
   * @default undefined (separator between every slot when separator is set)
   */
  separatorEvery?: number;
  /**
   * Disables the input.
   * @default false
   */
  disabled?: boolean;
  /**
   * Callback when all slots are filled.
   */
  onComplete?: (value: string) => void;
  /**
   * Placeholder character for empty slots.
   */
  placeholder?: string;
  /**
   * Regex pattern for allowed input (e.g. digits only). Use REGEXP_ONLY_DIGITS from "input-otp" for numbers.
   */
  pattern?: RegExp | string;
  /**
   * Class name for the root container (flex wrapper).
   */
  containerClassName?: string;
  /**
   * Class name for the underlying input wrapper (passed to OTPInput).
   */
  className?: string;
  /**
   * Align text in slots.
   * @default "center"
   */
  textAlign?: "left" | "center" | "right";
  /**
   * Input mode for virtual keyboard.
   * @default "numeric"
   */
  inputMode?: "numeric" | "text" | "decimal" | "tel" | "search" | "email" | "url";
  /**
   * Transforms pasted text before applying (e.g. strip hyphens).
   */
  pasteTransformer?: (pasted: string) => string;
  /**
   * Error state: sets aria-invalid on the input for a11y and styling.
   * Apelido de `aria-invalid`, mantido por compatibilidade.
   * @default false
   */
  invalid?: boolean;
  /**
   * Marca o campo como inválido: borda `destructive`, anunciado no input.
   */
  "aria-invalid"?: boolean | "true" | "false";
  /**
   * Id for the underlying input (e.g. for FieldLabel htmlFor).
   */
  id?: string;
  /**
   * Additional props forwarded to the underlying invisible input (a11y, aria-*, etc.).
   */
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
}
