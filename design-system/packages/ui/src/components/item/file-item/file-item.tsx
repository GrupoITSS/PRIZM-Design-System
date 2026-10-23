import { cn } from "../../../lib/cn";
import {
  File as FileIcon,
  FileImage as FileImageIcon,
  FileSpreadsheet as FileSpreadsheetIcon,
  FileText as FileTextIcon,
  X as XIcon,
} from "../../icons";
import * as React from "react";
import { Item } from "../item";
import type { FileTypeKey } from "../item.utils";
import { formatFileSize, getFileTypeColor, getFileTypeKey, getFileTypeLabel } from "../item.utils";
import {
  fileIconColorVariants,
  fileItemContentSlotStyles,
  fileItemMetaTextStyles,
  fileItemNameStyles,
  fileItemTitleContainerStyles,
  fileItemTitleSlotStyles,
  fileListVariants,
  fileRemoveButtonStyles,
  fileRemoveIconStyles,
  fileStatusVariants,
} from "./file-item.styles";
import type { FileItemProps, FileListProps, FileProcessingStatus } from "./file-item.types";

const FILE_TYPE_ICON_MAP: Record<FileTypeKey, React.ComponentType<{ className?: string }>> = {
  pdf: FileTextIcon,
  docx: FileTextIcon,
  pptx: FileIcon,
  xlsx: FileSpreadsheetIcon,
  csv: FileSpreadsheetIcon,
  txt: FileTextIcon,
  image: FileImageIcon,
  archive: FileIcon,
  file: FileIcon,
};

const FILE_STATUS_LABELS: Record<FileProcessingStatus, string> = {
  WAITING: "Aguardando",
  PROCESSING: "Processando",
  PROCESSED: "Processado",
  ERROR: "Falhou",
  UNKNOWN: "Desconhecido",
};

const FileItem = ({
  file,
  removable = false,
  onRemove,
  iconColor,
  fileTypeLabel: fileTypeLabelProp,
  media: mediaProp,
  actions: actionsProp,
  variant = "file",
  size = "sm",
  ref,
  ...rest
}: FileItemProps & { ref?: React.Ref<HTMLElement> }) => {
  const detectedColor = iconColor ?? getFileTypeColor(file.mimeType, file.name);
  const typeKey = getFileTypeKey(file.mimeType, file.name);
  const IconComp = FILE_TYPE_ICON_MAP[typeKey];
  const label = fileTypeLabelProp ?? getFileTypeLabel(file.mimeType, file.name);

  const sizeLabel = file.size != null ? formatFileSize(file.size) : null;
  const metaText = [label, sizeLabel].filter(Boolean).join(" · ");

  const defaultMedia = (
    <div className={fileIconColorVariants({ color: detectedColor })}>
      <IconComp />
    </div>
  );

  const defaultActions = removable ? (
    <button
      type="button"
      aria-label={`Remove ${file.name}`}
      className={fileRemoveButtonStyles}
      onClick={(e) => {
        e.stopPropagation();
        onRemove?.(file.id);
      }}
    >
      <XIcon className={fileRemoveIconStyles} />
    </button>
  ) : null;

  const statusLabel =
    file.status != null
      ? (FILE_STATUS_LABELS[file.status] ?? FILE_STATUS_LABELS.UNKNOWN)
      : undefined;

  return (
    <Item
      ref={ref}
      variant={variant}
      size={size}
      media={mediaProp ?? defaultMedia}
      title={
        <div className={fileItemTitleContainerStyles}>
          <span className={fileItemNameStyles} title={file.name}>
            {file.name}
          </span>
          {metaText && <span className={fileItemMetaTextStyles}>{metaText}</span>}
        </div>
      }
      actions={
        <>
          {statusLabel && (
            <span
              className={fileStatusVariants({
                status: file.status ?? "UNKNOWN",
              })}
            >
              {statusLabel}
            </span>
          )}
          {actionsProp ?? defaultActions}
        </>
      }
      classes={{
        title: fileItemTitleSlotStyles,
        content: fileItemContentSlotStyles,
      }}
      data-file-id={file.id}
      data-file-status={file.status}
      {...rest}
    />
  );
};

FileItem.displayName = "FileItem";

const FileList = ({
  files,
  removable = false,
  onRemove,
  scrollable = false,
  itemProps,
  className,
  ref,
  ...rest
}: FileListProps & { ref?: React.Ref<HTMLDivElement> }) => {
  return (
    <div
      ref={ref}
      data-slot="file-list"
      className={cn(fileListVariants({ scrollable }), className)}
      {...rest}
    >
      {files.map((file) => (
        <FileItem
          key={file.id}
          file={file}
          removable={removable}
          onRemove={onRemove}
          {...itemProps}
        />
      ))}
    </div>
  );
};

FileList.displayName = "FileList";

export { FileItem, FileList };
