import { cn } from "../../lib/cn";
import { OTPInput, type SlotProps } from "input-otp";
import { Minus } from "../icons";
import * as React from "react";
import {
  inputOTPCaret,
  inputOTPCaretLine,
  inputOTPContainerVariants,
  inputOTPPlaceholder,
  inputOTPSeparatorGap,
  inputOTPSeparatorStyles,
  inputOTPSlotActive,
  inputOTPSlotVariants,
  inputOTPWrapper,
  inputOTPWrapperInvalid,
} from "./input-otp.styles";
import type { InputOTPProps, InputOTPSeparator } from "./input-otp.types";

// Slots e separadores são só visuais: o valor, o nome e o estado ficam no input
// (aria-hidden, pendência 4 de 27/10/2026).
function renderSeparator(separator: InputOTPSeparator, key: string) {
  if (!separator) return null;
  const className = cn(inputOTPSeparatorStyles, inputOTPSeparatorGap);
  if (separator === true)
    return (
      <div key={key} aria-hidden className={className}>
        <Minus className="size-4" />
      </div>
    );
  return (
    <span key={key} aria-hidden className={className}>
      {separator}
    </span>
  );
}

/**
 * Input OTP do design system PRIZM.
 * API por props: valor controlado, número de dígitos, separador opcional e tamanho.
 *
 * Uso recomendado:
 * ```tsx
 * <InputOTP length={6} value={value} onChange={setValue} aria-label="Código de verificação" />
 * <InputOTP length={4} value={code} onChange={setCode} separator="-" aria-label="PIN" />
 * <InputOTP length={6} value={otp} onChange={setOtp} separator size="sm" aria-label="Código" />
 * ```
 *
 * Baseado em input-otp + shadcn/ui.
 *
 * @see https://ui.shadcn.com/docs/components/input-otp
 */
function shouldShowSeparator(
  index: number,
  separator: InputOTPSeparator | undefined,
  separatorEvery: number | undefined,
): boolean {
  if (!separator) return false;
  if (separatorEvery === undefined) return index > 0;
  return index > 0 && index % separatorEvery === 0;
}

function InputOTP({
  value,
  onChange,
  length = 6,
  separator,
  separatorEvery,
  disabled = false,
  invalid = false,
  onComplete,
  placeholder,
  pattern,
  containerClassName,
  className,
  size = "md",
  textAlign = "center",
  inputMode = "numeric",
  pasteTransformer,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
  ref,
  ...rest
}: InputOTPProps & { ref?: React.Ref<HTMLInputElement> }) {
  const patternProp = typeof pattern === "string" ? pattern : (pattern?.source ?? undefined);
  // `invalid` continua como apelido de aria-invalid (D3).
  const isInvalid = invalid || ariaInvalid === true || ariaInvalid === "true";

  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const setRefs = (node: HTMLInputElement | null) => {
    inputRef.current = node;
    if (typeof ref === "function") ref(node);
    else if (ref) ref.current = node;
  };

  // Sem rótulo, o leitor de tela anuncia só "campo de edição" (WCAG 4.1.2, pendência 1).
  React.useEffect(() => {
    if (process.env.NODE_ENV === "production") return;
    const named =
      Boolean(ariaLabel ?? ariaLabelledBy) || (inputRef.current?.labels?.length ?? 0) > 0;
    if (!named) {
      console.warn(
        "InputOTP: campo sem nome acessível. Ligue um FieldLabel pelo id ou passe aria-label.",
      );
    }
  }, [ariaLabel, ariaLabelledBy]);

  const renderSlot = (slot: SlotProps, isLast: boolean, key: number) => (
    <div
      key={key}
      className={cn(
        inputOTPSlotVariants({ size }),
        isLast && "border-r-0",
        slot.isActive && inputOTPSlotActive,
      )}
    >
      {slot.char ??
        (slot.placeholderChar && <span className={inputOTPPlaceholder}>{slot.placeholderChar}</span>)}
      {slot.hasFakeCaret && (
        <div className={inputOTPCaret}>
          <div className={inputOTPCaretLine} />
        </div>
      )}
    </div>
  );

  return (
    <OTPInput
      ref={setRefs}
      maxLength={length}
      value={value ?? ""}
      onChange={onChange}
      onComplete={onComplete}
      placeholder={placeholder}
      pattern={patternProp}
      disabled={disabled}
      textAlign={textAlign}
      inputMode={inputMode}
      pasteTransformer={pasteTransformer}
      containerClassName={cn(inputOTPContainerVariants({ size }), containerClassName)}
      className={cn("disabled:cursor-not-allowed", className)}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
      aria-invalid={isInvalid || undefined}
      render={({ slots }) => {
        // Se não há separador, renderiza tudo em um único grupo
        if (!separator) {
          return (
            <div aria-hidden className={cn(inputOTPWrapper, isInvalid && inputOTPWrapperInvalid)}>
              {slots.map((slot, index) => renderSlot(slot, index === slots.length - 1, index))}
            </div>
          );
        }

        // Com separador: divide em grupos
        const groups: (typeof slots)[] = [];
        let currentGroup: typeof slots = [];

        slots.forEach((slot, index) => {
          if (shouldShowSeparator(index, separator, separatorEvery)) {
            groups.push(currentGroup);
            currentGroup = [slot];
          } else {
            currentGroup.push(slot);
          }
        });
        if (currentGroup.length > 0) {
          groups.push(currentGroup);
        }

        return (
          <>
            {groups.map((group, groupIndex) => (
              // eslint-disable-next-line @eslint-react/no-array-index-key -- positional list, items have no stable id
              <React.Fragment key={groupIndex}>
                {groupIndex > 0 && renderSeparator(separator, `sep-${groupIndex}`)}
                <div aria-hidden className={cn(inputOTPWrapper, isInvalid && inputOTPWrapperInvalid)}>
                  {group.map((slot, slotIndex) =>
                    renderSlot(slot, slotIndex === group.length - 1, slotIndex),
                  )}
                </div>
              </React.Fragment>
            ))}
          </>
        );
      }}
      {...rest}
    />
  );
}

InputOTP.displayName = "InputOTP";

export { InputOTP };
