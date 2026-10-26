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

  // Foco, erro e disabled seguem o Input (decisões de 21/10/2026, aplicadas ao grupo em 22/10/2026):
  // anel de 2px em `ring` com a borda transparente; no erro a borda fica `destructive` (classe da
  // base) e o anel continua `ring`; disabled com opacidade 50% na caixa inteira (26/10/2026).
  const wrapperClassName = cn(
    INPUT_GROUP_BASE_CLASSES,
    disabled && "cursor-not-allowed opacity-50",
    isFocused && !isInvalid && "border-transparent ring-2 ring-ring",
    isFocused && isInvalid && "ring-2 ring-ring",
    className,
  );

  return { wrapperClassName, handleFocus, handleBlur };
}
