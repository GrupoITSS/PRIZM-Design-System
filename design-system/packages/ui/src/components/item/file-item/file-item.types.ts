import type { FileIconColorVariantProps } from "./file-item.styles";
import type { ItemProps } from "../item.types";
import type { FileTypeColor } from "../item.utils";

// ---------------------------------------------------------------------------
// FileItem
// ---------------------------------------------------------------------------
//
/**
 * Processing status for files, alinhado com o domínio de Knowledge Base.
 * Os valores correspondem a `ProcessingStatus` e aos rótulos de
 * `common.processingStatus.*` nas traduções.
 */
export type FileProcessingStatus = "WAITING" | "PROCESSING" | "PROCESSED" | "ERROR" | "UNKNOWN";

export interface FileItemData {
  id: string;
  name: string;
  /** Size in bytes — formatted automatically by the component. */
  size?: number;
  mimeType?: string;
  /**
   * Processing status of the file. Used to derive a human‑readable
   * label (e.g. "Aguardando", "Processando", "Processado", "Falhou").
   */
  status?: FileProcessingStatus;
}

export interface FileItemProps extends Omit<
  ItemProps,
  "title" | "description" | "media" | "mediaVariant" | "meta"
> {
  /** File data to display. */
  file: FileItemData;
  /**
   * Whether the file can be removed. Shows an X button in the actions slot.
   * @default false
   */
  removable?: boolean;
  /** Callback fired when the remove button is clicked. */
  onRemove?: (fileId: string) => void;
  /**
   * Override the auto-detected icon color.
   * If not provided, the color is inferred from the file extension / mimeType.
   */
  iconColor?: NonNullable<FileIconColorVariantProps["color"]> | FileTypeColor;
  /**
   * Override the auto-detected file type label shown in the meta slot.
   * If not provided, it is inferred from the file extension / mimeType.
   */
  fileTypeLabel?: string;
  /**
   * Custom media element. If provided, overrides the default file icon.
   */
  media?: React.ReactNode;
}

// ---------------------------------------------------------------------------
// FileList
// ---------------------------------------------------------------------------

export interface FileListProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** Array of files to display. */
  files: FileItemData[];
  /**
   * Whether each file can be removed.
   * @default false
   */
  removable?: boolean;
  /** Callback fired when the remove button is clicked on any file. */
  onRemove?: (fileId: string) => void;
  /**
   * Whether the list should be scrollable when it exceeds `maxHeight`.
   * @default false
   */
  scrollable?: boolean;
  /**
   * Shared props forwarded to every `FileItem` in the list.
   */
  itemProps?: Omit<FileItemProps, "file" | "removable" | "onRemove">;
}
