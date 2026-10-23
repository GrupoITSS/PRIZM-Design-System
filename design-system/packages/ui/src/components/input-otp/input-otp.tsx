import { cn } from "../../lib/cn";
import { OTPInput } from "input-otp";
import { Dot } from "../icons";
import * as React from "react";
import {
  inputOTPCaret,
  inputOTPCaretLine,
  inputOTPContainerVariants,
  inputOTPSeparatorGap,
  inputOTPSlotActive,
  inputOTPSlotVariants,
  inputOTPWrapper,
  inputOTPWrapperInvalid,
} from "./input-otp.styles";
import type { InputOTPProps, InputOTPSeparator } from "./input-otp.types";

function renderSeparator(separator: InputOTPSeparator, key: string) {
  if (!separator) return null;
  const gapClass = inputOTPSeparatorGap;
  if (separator === true)
    return (
      <div key={key} role="separator" className={cn("shrink-0", gapClass)}>
        <Dot className="size-4 text-muted-foreground" />
      </div>
    );
  if (typeof separator === "string")
    return (
      <span key={key} role="separator" className={cn("text-muted-foreground", gapClass)}>
        {separator}
      </span>
    );
  return (
    <span key={key} className={gapClass}>
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
 * <InputOTP length={6} value={value} onChange={setValue} />
 * <InputOTP length={4} value={code} onChange={setCode} separator="-" />
 * <InputOTP length={6} value={otp} onChange={setOtp} separator size="sm" />
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
  size = "default",
  textAlign = "center",
  inputMode = "numeric",
  pasteTransformer,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedBy,
  ref,
  ...rest
}: InputOTPProps & { ref?: React.Ref<HTMLInputElement> }) {
  const patternProp = typeof pattern === "string" ? pattern : (pattern?.source ?? undefined);

  return (
    <OTPInput
      ref={ref}
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
      aria-describedby={ariaDescribedBy}
      aria-invalid={invalid || undefined}
      render={({ slots }) => {
        // Se não há separador, renderiza tudo em um único grupo
        if (!separator) {
          return (
            <div className={cn(inputOTPWrapper, invalid && inputOTPWrapperInvalid)}>
              {slots.map((slot, index) => (
                <div
                  // eslint-disable-next-line @eslint-react/no-array-index-key -- positional list, items have no stable id
                  key={index}
                  className={cn(
                    inputOTPSlotVariants({ size }),
                    index === slots.length - 1 && "border-r-0",
                    slot.isActive && inputOTPSlotActive,
                  )}
                >
                  {slot.char ?? slot.placeholderChar}
                  {slot.hasFakeCaret && (
                    <div className={inputOTPCaret}>
                      <div className={inputOTPCaretLine} />
                    </div>
                  )}
                </div>
              ))}
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
                <div className={cn(inputOTPWrapper, invalid && inputOTPWrapperInvalid)}>
                  {group.map((slot, slotIndex) => (
                    <div
                      // eslint-disable-next-line @eslint-react/no-array-index-key -- positional list, items have no stable id
                      key={slotIndex}
                      className={cn(
                        inputOTPSlotVariants({ size }),
                        slotIndex === group.length - 1 && "border-r-0",
                        slot.isActive && inputOTPSlotActive,
                      )}
                    >
                      {slot.char ?? slot.placeholderChar}
                      {slot.hasFakeCaret && (
                        <div className={inputOTPCaret}>
                          <div className={inputOTPCaretLine} />
                        </div>
                      )}
                    </div>
                  ))}
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
