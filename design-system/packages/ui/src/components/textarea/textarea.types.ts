import type * as React from "react";
import type { TextareaVariantProps } from "./textarea.styles";

type NativeTextareaProps = Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "aria-invalid">;

/**
 * Props do componente Textarea do design system PRIZM.
 *
 * Extende os atributos nativos de `<textarea />`, adicionando as variantes
 * tipadas em `textarea.styles.ts` (`"sm" | "md" | "lg"`), além da prop
 * controlada pelo design system para resize.
 */
export interface TextareaProps extends NativeTextareaProps, TextareaVariantProps {
  /**
   * Controla se o textarea pode ser redimensionado pelo usuário.
   *
   * - `false` (padrão): o handle de resize não é exibido.
   * - `true`: permite redimensionar (verticalmente).
   */
  resizable?: boolean;

  /**
   * Permite sobrescrever o valor de `aria-invalid` diretamente, caso
   * o consumo venha de libs de formulário (ex.: React Hook Form).
   */
  "aria-invalid"?: React.AriaAttributes["aria-invalid"];

  /**
   * Quando verdadeiro, exibe um botão de expansão no canto superior direito
   * que abre o mesmo conteúdo do textarea em um `Dialog` de edição expandida.
   *
   * - `false` (padrão): comportamento padrão, sem dialog.
   * - `true`: mostra o ícone de expandir e permite editar em um overlay.
   *
   * A API recomendada continua sendo via props (`value`, `onChange` etc.);
   * o componente garante que o valor seja sincronizado entre o textarea base
   * e o textarea dentro do dialog.
   */
  expandable?: boolean;
}
