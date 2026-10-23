import type * as React from "react";
import type { DropzoneVariantProps } from "./dropzone.styles";

export interface DropzoneProps
  extends
    Omit<React.LabelHTMLAttributes<HTMLLabelElement>, "onDrop" | "onDragOver" | "onDragLeave">,
    Omit<DropzoneVariantProps, "state"> {
  /**
   * Accepted file types/extensions.
   * Can be a CSV string (e.g. ".pdf,.png,image/*") or an array.
   * When provided, only matching files trigger callbacks.
   * Also applied to the underlying `<input type="file" accept="..." />`.
   */
  accept?: string | string[];
  /**
   * Allow selecting/dropping multiple files.
   * @default false
   */
  multiple?: boolean;
  /**
   * When true, the dropzone is not interactive and drag/click are disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * Visual loading state. Most útil para indicar upload em andamento.
   * Quando true, mostra ícone LoaderCircle e aplica estilos de carregando.
   * @default false
   */
  loading?: boolean;
  /**
   * Visual invalid/error state. Útil para exibir erro de validação externo.
   * Também aplica `aria-invalid="true"` no container.
   * @default false
   */
  invalid?: boolean;
  /**
   * Optional icon rendered inside the circular icon wrapper.
   * Defaults to a generic file icon from the PRIZM icon set.
   */
  icon?: React.ReactNode;
  /**
   * Primary text shown inside the "input-like" container (e.g. "Clique aqui").
   * @default "Clique aqui"
   */
  label?: React.ReactNode;
  /**
   * Secondary text shown next to the primary text (e.g. "ou arraste os arquivos nesta área").
   * @default "ou arraste os arquivos nesta área"
   */
  secondaryLabel?: React.ReactNode;
  /**
   * Optional helper/description text rendered below the dropzone (e.g. "Arquivos permitidos: .pdf, .png").
   * When not provided, nothing is rendered — no automatic text from `accept`.
   */
  description?: React.ReactNode;
  /**
   * Called with the first accepted file (sugar for single-file use cases).
   * For multi-file mode, prefer `onFilesChange`.
   */
  onFileSelect?: (file: File) => void;
  /**
   * Called with all accepted files (after drag-and-drop or file selection).
   */
  onFilesChange?: (files: File[]) => void;
  /**
   * Called when one or more files are rejected due to the `accept` filter.
   * This is useful to show custom error messages to the user.
   */
  onInvalidFiles?: (files: File[]) => void;
  /** Optional `data-testid` on the file input (e2e / unit tests). */
  fileInputTestId?: string;
  /** Optional `data-testid` on the icon wrapper. */
  uploadIconTestId?: string;
  /** Optional `data-testid` on the primary label text. */
  uploadTextTestId?: string;
  /** Optional `data-testid` on the description paragraph below the dropzone. */
  descriptionTestId?: string;
}
