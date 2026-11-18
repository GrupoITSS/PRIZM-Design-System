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
  /**
   * Nome acessível do botão. Obrigatório quando o botão é só de ícone (o Button avisa no console
   * se faltar).
   */
  "aria-label"?: string;
}

export interface ButtonGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">, ButtonGroupVariantProps {
  /**
   * **API simplificada:** Lista de botões a exibir no grupo.
   * Quando definido, o grupo é renderizado a partir desses itens (sem subcomponentes).
   */
  buttons?: ButtonGroupButtonItem[];

  /**
   * Separador visual entre cada par de botões. Em `"auto"`, aparece quando nenhum botão é
   * `outline` (no Outline, a borda já separa). Usado apenas quando `buttons` está definido.
   * @default "auto"
   */
  separatorBetween?: boolean | "auto";

  /**
   * Texto ou elemento exibido no início do grupo (estilo de label).
   * Usado apenas quando `buttons` está definido.
   */
  text?: React.ReactNode;

  /**
   * Nome do grupo para o leitor de tela (role="group"). Passe `aria-label` ou `aria-labelledby`:
   * sem nenhum dos dois, o grupo avisa no console em desenvolvimento.
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
