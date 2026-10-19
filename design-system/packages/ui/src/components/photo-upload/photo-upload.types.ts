export type PhotoUploadProps = {
  enableCropping?: boolean;
  loading?: boolean;
  editing?: boolean;
  value?: string;
  setValue: (value: string) => void;
  label: string;
  error?: string;
  required?: boolean;
  /**
   * Inicial no círculo quando não há imagem (ou ela falha ao carregar).
   * Se vazio, usa "?".
   */
  emptyLabel?: string;
  /** Classes extras no `DialogContent` (ex.: tokens de modal do Cockpit). */
  dialogContentClassName?: string;
  /** Classes extras no overlay do dialog. */
  dialogOverlayClassName?: string;
};

export type PixelCrop = {
  x: number;
  y: number;
  width: number;
  height: number;
};
