import { Upload } from "../icons";
import { Input } from "../input";
import { Label } from "../label";
import { Spinner } from "../spinner";
import { cn } from "../../lib/cn";
import * as React from "react";
import {
  dropzoneDescriptionStyles,
  dropzoneIconWrapperStyles,
  dropzoneInnerInputStyles,
  dropzoneInnerPrimaryTextStyles,
  dropzoneInnerSecondaryTextStyles,
  dropzoneVariants,
} from "./dropzone.styles";
import type { DropzoneProps } from "./dropzone.types";
import { fileMatchesAccept, formatAcceptForInput, normalizeAccept } from "./dropzone.utils";

/**
 * Dropzone (file upload) do design system PRIZM.
 *
 * Suporta seleção por clique e drag-and-drop, filtro por tipos (`accept`),
 * estado visual de hover/drag ativo e texto descritivo.
 *
 * **API simplificada (recomendada):**
 * - `onFileSelect(file)` para uso de arquivo único
 * - `onFilesChange(files)` para múltiplos arquivos
 *
 * @example
 * <Dropzone
 *   accept={[".pdf", ".png", ".jpg"]}
 *   onFileSelect={(file) => console.log(file)}
 * />
 */
function Dropzone({
  className,
  accept,
  multiple = false,
  disabled = false,
  loading = false,
  invalid = false,
  icon,
  label = "Clique aqui",
  secondaryLabel,
  description,
  onFileSelect,
  onFilesChange,
  onInvalidFiles,
  fileInputTestId,
  uploadIconTestId,
  uploadTextTestId,
  descriptionTestId,
  ref,
  ...labelProps
}: DropzoneProps & { ref?: React.Ref<HTMLLabelElement> }) {
  const [isDragging, setIsDragging] = React.useState(false);
  const inputId = React.useId();
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const acceptTokens = React.useMemo(() => normalizeAccept(accept), [accept]);
  const acceptAttr = React.useMemo(() => formatAcceptForInput(acceptTokens), [acceptTokens]);

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    const allFiles = Array.from(fileList);
    if (!allFiles.length) return;

    const acceptedFiles = allFiles.filter((file) => fileMatchesAccept(file, acceptTokens));
    const rejectedFiles = allFiles.filter((file) => !fileMatchesAccept(file, acceptTokens));

    if (acceptedFiles.length) {
      onFilesChange?.(acceptedFiles);
      if (onFileSelect) {
        onFileSelect(acceptedFiles[0]);
      }
    }

    if (rejectedFiles.length && onInvalidFiles) {
      onInvalidFiles(rejectedFiles);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    if (disabled || loading) return;
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLLabelElement>) => {
    if (disabled || loading) return;
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    if (disabled || loading) return;
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    handleFiles(event.dataTransfer?.files ?? null);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled || loading) return;
    handleFiles(event.target.files);
    event.target.value = "";
  };

  const state = disabled
    ? "disabled"
    : invalid
      ? "invalid"
      : loading
        ? "loading"
        : isDragging
          ? "active"
          : "idle";

  const currentIcon =
    loading && !disabled ? (
      <Spinner size="lg" aria-label="Enviando arquivos" />
    ) : (
      (icon ?? <Upload className="size-6" />)
    );

  const resolvedSecondaryLabel =
    secondaryLabel === undefined ? "ou arraste os arquivos nesta área" : secondaryLabel;

  return (
    <div className="flex w-full flex-col items-center">
      <Label
        ref={ref}
        htmlFor={inputId}
        data-slot="dropzone"
        data-state={state}
        className={cn(dropzoneVariants({ state }), className)}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        aria-disabled={disabled || undefined}
        aria-busy={loading || undefined}
        aria-invalid={invalid || undefined}
        {...labelProps}
      >
        <div
          className={dropzoneIconWrapperStyles}
          aria-hidden="true"
          data-testid={uploadIconTestId}
        >
          {currentIcon}
        </div>

        <div className={dropzoneInnerInputStyles}>
          <span className={dropzoneInnerPrimaryTextStyles} data-testid={uploadTextTestId}>
            {label}
          </span>
          {resolvedSecondaryLabel !== "" && (
            <span className={dropzoneInnerSecondaryTextStyles}>{resolvedSecondaryLabel}</span>
          )}
        </div>

        <Input
          ref={inputRef}
          id={inputId}
          type="file"
          className="sr-only"
          accept={acceptAttr}
          multiple={multiple}
          disabled={disabled || loading}
          onChange={handleInputChange}
          data-testid={fileInputTestId}
        />
      </Label>

      {description != null && description !== "" && (
        <p className={dropzoneDescriptionStyles} data-testid={descriptionTestId}>
          {description}
        </p>
      )}
    </div>
  );
}

Dropzone.displayName = "Dropzone";

export { Dropzone };
