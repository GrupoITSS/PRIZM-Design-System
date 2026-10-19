import type { ButtonProps } from "../button";
import type * as React from "react";
import type {
  InputGroupAddonVariantProps,
  InputGroupButtonVariantProps,
} from "./input-group.styles";

export interface InputGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /**
   * Tipo do controle: input (padrão) ou textarea.
   * @default "input"
   */
  control?: "input" | "textarea";

  /**
   * Addon exibido no início (inline para input) ou no topo (block para textarea).
   * Uso recomendado: apenas via props; subcomponentes são escape hatch.
   */
  addonInlineStart?: React.ReactNode;

  /**
   * Addon exibido no final (inline para input) ou na base (block para textarea).
   */
  addonInlineEnd?: React.ReactNode;

  /**
   * Addon exibido acima do controle (apenas para textarea / block).
   */
  addonBlockStart?: React.ReactNode;

  /**
   * Addon exibido abaixo do controle (apenas para textarea / block).
   */
  addonBlockEnd?: React.ReactNode;

  /** Repassado ao input/textarea quando usa API simplificada. */
  placeholder?: string;
  /** Repassado ao input/textarea quando usa API simplificada. */
  value?: string;
  /** Repassado ao input/textarea quando usa API simplificada. */
  defaultValue?: string;
  /** Repassado ao input/textarea quando usa API simplificada. */
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  /** Repassado ao input quando usa API simplificada. */
  type?: string;
  /** Repassado ao textarea quando usa API simplificada. */
  rows?: number;
  /** Repassado ao input/textarea quando usa API simplificada. */
  id?: string;
  /** Desabilita o controle e aplica estilos de disabled no grupo (API simplificada). */
  disabled?: boolean;
  /** Tamanho do Input interno (API simplificada). */
  size?: "sm" | "md" | "default" | "lg";
}

export type InputGroupAddonProps = React.HTMLAttributes<HTMLDivElement> &
  InputGroupAddonVariantProps;

export type InputGroupButtonProps = Omit<ButtonProps, "size"> & InputGroupButtonVariantProps;

export type InputGroupTextProps = React.HTMLAttributes<HTMLSpanElement>;

export interface InputGroupInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> {
  /** Variante de tamanho do Input (PRIZM), não o atributo HTML numérico. */
  size?: "sm" | "md" | "default" | "lg";
}

export type InputGroupTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;
