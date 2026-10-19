import { cn } from "../../lib/cn";
import * as React from "react";
import { INPUT_GROUP_BASE_CLASSES } from "./input-group.styles";

interface UseInputGroupWrapperOptions {
  className?: string;
  disabled?: boolean;
  isInvalid: boolean;
  onFocus?: React.FocusEventHandler<HTMLDivElement>;
  onBlur?: React.FocusEventHandler<HTMLDivElement>;
}

interface UseInputGroupWrapperResult {
  wrapperClassName: string;
  handleFocus: React.FocusEventHandler<HTMLDivElement>;
  handleBlur: React.FocusEventHandler<HTMLDivElement>;
}

export function useInputGroupWrapper(
  options: UseInputGroupWrapperOptions,
): UseInputGroupWrapperResult {
  const { className, disabled, isInvalid, onFocus, onBlur } = options;

  const [isFocused, setIsFocused] = React.useState(false);

  const handleFocus: React.FocusEventHandler<HTMLDivElement> = (event) => {
    onFocus?.(event);
    setIsFocused(true);
  };

  const handleBlur: React.FocusEventHandler<HTMLDivElement> = (event) => {
    onBlur?.(event);
    // Só remove o foco quando ele realmente sair do grupo
    if (event.currentTarget && !event.currentTarget.contains(event.relatedTarget)) {
      setIsFocused(false);
    }
  };

  const wrapperClassName = cn(
    INPUT_GROUP_BASE_CLASSES,
    disabled && "cursor-not-allowed opacity-50",
    // Ring neutro (foco)
    isFocused && !isInvalid && "ring-[3px] ring-ring/50",
    // Ring de erro (foco + inválido)
    isFocused &&
      isInvalid &&
      "ring-[3px] ring-destructive/20",
    className,
  );

  return { wrapperClassName, handleFocus, handleBlur };
}
