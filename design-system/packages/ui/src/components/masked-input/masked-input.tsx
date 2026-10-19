import React, { useCallback } from "react";
import { Input } from "../input";
import type { MaskedInputProps } from "./masked-input.types";
import { maskMappings } from "./mask.utils";

const MaskedInput = ({
  type = "text",
  mask,
  maxLength,
  size = "md",
  onChange,
  error,
  className,
  ref,
  ...props
}: MaskedInputProps & { ref?: React.Ref<HTMLInputElement> }) => {
  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      let inputValue = event.target.value;
      const maskFunction = maskMappings[mask];
      if (maskFunction) {
        inputValue = maskFunction(inputValue);
      }
      event.target.value = inputValue;
      onChange?.(event);
    },
    [mask, onChange],
  );

  return (
    <div className="flex w-full flex-col gap-1">
      <Input
        {...props}
        type={type}
        ref={ref}
        maxLength={maxLength}
        size={size}
        onChange={handleInputChange}
        aria-invalid={props["aria-invalid"] ?? !!error}
        className={className ?? "border-input bg-background"}
      />
      {error ? (
        <p className="text-destructive text-xs" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
};

MaskedInput.displayName = "MaskedInput";

export { MaskedInput };
