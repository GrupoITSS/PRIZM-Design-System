import type * as React from "react";
import type { InputVariantProps } from "./input.styles";

type NativeInputProps = React.InputHTMLAttributes<HTMLInputElement>;

/**
 * Props do componente Input do design system PRIZM.
 *
 * Extende os atributos nativos de `<input />`, sobrescrevendo a prop
 * `size` nativa (numérica) para usar as variantes tipadas em
 * `input.styles.ts` (`"sm" | "default" | "lg"`).
 */
export interface InputProps extends Omit<NativeInputProps, "size">, InputVariantProps {
  /**
   * Ícone à esquerda do campo (ex.: busca na toolbar da DataTable).
   */
  startIcon?: React.ReactNode;
}
