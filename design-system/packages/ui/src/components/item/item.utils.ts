import type { ItemBadge } from "./item.types";

export function mergeRelForBlankTarget(
  target: React.AnchorHTMLAttributes<HTMLAnchorElement>["target"],
  rel: React.AnchorHTMLAttributes<HTMLAnchorElement>["rel"],
) {
  if (target !== "_blank") return rel;

  const base = rel ?? "";
  const tokens = new Set(base.split(/\s+/g).filter(Boolean));
  tokens.add("noopener");
  tokens.add("noreferrer");
  return Array.from(tokens).join(" ");
}

export function filterBadge(badges: ItemBadge[], removedId: string): ItemBadge[] {
  return badges.filter((b) => b.id !== removedId);
}

// ---------------------------------------------------------------------------
// File helpers
// ---------------------------------------------------------------------------

export type FileTypeColor = "blue" | "red" | "green" | "orange" | "neutral";

export type FileTypeKey =
  "pdf" | "docx" | "pptx" | "xlsx" | "csv" | "txt" | "image" | "archive" | "file";

export function getFileExtension(filename: string): string {
  return filename.split(".").pop()?.toLowerCase() ?? "";
}

const EXT_MAP: Record<string, FileTypeKey> = {
  pdf: "pdf",
  doc: "docx",
  docx: "docx",
  ppt: "pptx",
  pptx: "pptx",
  xls: "xlsx",
  xlsx: "xlsx",
  csv: "csv",
  txt: "txt",
  zip: "archive",
  rar: "archive",
  "7z": "archive",
  tar: "archive",
  gz: "archive",
  png: "image",
  jpg: "image",
  jpeg: "image",
  gif: "image",
  webp: "image",
  svg: "image",
  bmp: "image",
};

export function getFileTypeKey(mimeType?: string, filename?: string): FileTypeKey {
  if (!mimeType && !filename) return "file";

  const ext = filename ? getFileExtension(filename) : "";

  if (EXT_MAP[ext]) return EXT_MAP[ext];

  if (mimeType?.includes("pdf")) return "pdf";
  if (mimeType?.includes("wordprocessingml")) return "docx";
  if (mimeType?.includes("presentation")) return "pptx";
  if (mimeType?.includes("spreadsheet")) return "xlsx";
  if (mimeType?.includes("plain")) return "txt";
  if (mimeType?.includes("zip") || mimeType?.includes("compressed")) return "archive";
  if (mimeType?.startsWith("image/")) return "image";

  return "file";
}

const FILE_TYPE_LABELS: Record<FileTypeKey, string> = {
  pdf: "PDF",
  docx: "DOCX",
  pptx: "PPTX",
  xlsx: "XLSX",
  csv: "CSV",
  txt: "TXT",
  image: "IMG",
  archive: "ZIP",
  file: "File",
};

export function getFileTypeLabel(mimeType?: string, filename?: string): string {
  const key = getFileTypeKey(mimeType, filename);

  if (key === "image" && filename) {
    const ext = getFileExtension(filename).toUpperCase();
    if (ext) return ext;
  }

  return FILE_TYPE_LABELS[key];
}

const FILE_TYPE_COLORS: Record<FileTypeKey, FileTypeColor> = {
  pdf: "red",
  docx: "blue",
  pptx: "orange",
  xlsx: "green",
  csv: "green",
  txt: "neutral",
  image: "neutral",
  archive: "neutral",
  file: "neutral",
};

export function getFileTypeColor(mimeType?: string, filename?: string): FileTypeColor {
  return FILE_TYPE_COLORS[getFileTypeKey(mimeType, filename)];
}

const SIZE_UNITS = ["B", "KB", "MB", "GB", "TB"] as const;

export function formatFileSize(bytes: number): string {
  if (bytes <= 0) return "0 B";

  const k = 1024;
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(k)), SIZE_UNITS.length - 1);
  const size = bytes / k ** i;
  return `${size % 1 === 0 ? size : size.toFixed(1)} ${SIZE_UNITS[i]}`;
}
