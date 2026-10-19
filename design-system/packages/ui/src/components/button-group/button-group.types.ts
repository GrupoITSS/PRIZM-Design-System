import type * as React from "react";
import type { ButtonProps } from "../button";
import type { ButtonGroupVariantProps } from "./button-group.styles";

/**
 * Configuração de um botão na API simplificada do ButtonGroup (prop `buttons`).
 */
export interface ButtonGroupButtonItem {
  /** Conteúdo do botão (texto ou ReactNode). */
  label: React.ReactNode;
  /** Ícone exibido antes do texto. */
  icon?: React.ReactNode;
  /** Callback ao clicar. */
  onClick?: () => void;
  /** Variante visual do botão. @default "default" */
  variant?: ButtonProps["variant"];
  /** Tamanho do botão. @default "default" */
  size?: ButtonProps["size"];
  /** Desabilita o botão. */
  disabled?: boolean;
  /** Tipo do botão. @default "button" */
  type?: "button" | "submit" | "reset";
}

export interface ButtonGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">, ButtonGroupVariantProps {
  /**
   * **API simplificada:** Lista de botões a exibir no grupo.
   * Quando definido, o grupo é renderizado a partir desses itens (sem subcomponentes).
   */
  buttons?: ButtonGroupButtonItem[];

  /**
   * Exibe um separador visual entre cada par de botões (recomendado para variantes que não sejam outline).
   * @default false
   */
  separatorBetween?: boolean;

  /**
   * Texto ou elemento exibido no início do grupo (estilo de label).
   * Usado apenas quando `buttons` está definido.
   */
  text?: React.ReactNode;

  /**
   * Label para acessibilidade (role="group").
   * Recomendado para a11y.
   */
  "aria-label"?: string;

  /**
   * **Composição (escape hatch):** Conteúdo customizado (ButtonGroup, ButtonGroupSeparator, ButtonGroupText, etc.).
   * Quando definido junto com `buttons`, `buttons` tem precedência.
   */
  children?: React.ReactNode;
}

export interface ButtonGroupSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Orientação do separador. @default "vertical" (horizontal group) */
  orientation?: "horizontal" | "vertical";
}

export interface ButtonGroupTextProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Se true, renderiza o filho único como elemento (Slot). */
  asChild?: boolean;
}
