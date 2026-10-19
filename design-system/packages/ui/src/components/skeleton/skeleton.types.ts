import type { SkeletonVariantProps } from "./skeleton.styles";

/**
 * Props do componente `Skeleton` do design system PRIZM.
 *
 * API principal é **baseada em props**:
 *
 * ```tsx
 * <Skeleton className="h-4 w-32" />
 * <Skeleton shape="circle" className="h-10 w-10" />
 * <Skeleton shape="pill" className="h-8 w-24" />
 * ```
 *
 * Tamanho é controlado via classes (`h-*`, `w-*`) e layout do container.
 */
export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement>, SkeletonVariantProps {
  /**
   * `className` adicional para ajustar tamanho e layout.
   *
   * @example "h-4 w-32"
   */
  className?: string;
}
