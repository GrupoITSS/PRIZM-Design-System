import type * as React from "react";

export interface BreadcrumbItemData {
  /**
   * Label exibido no item do breadcrumb.
   *
   * @example "Settings"
   */
  label: React.ReactNode;
  /**
   * URL de navegação. Quando presente e o item não for o atual,
   * o componente renderiza um link (`<a href="..." />`).
   */
  href?: string;
  /**
   * Ícone opcional exibido antes do label.
   */
  icon?: React.ReactNode;
  /**
   * Indica se este item representa a página atual.
   * Quando omitido, o último item da lista é considerado atual.
   *
   * @default false
   */
  isCurrent?: boolean;
}

export type BreadcrumbProps = React.ComponentPropsWithoutRef<"nav"> & {
  /**
   * API simplificada: lista de itens para montar o breadcrumb sem
   * precisar de subcomponentes.
   *
   * Quando `items` é fornecido, `children` é ignorado.
   */
  items?: BreadcrumbItemData[];
  /**
   * Separador entre os itens do breadcrumb.
   *
   * @default <ChevronRight />
   */
  separator?: React.ReactNode;
};

export type BreadcrumbListProps = React.ComponentPropsWithoutRef<"ol">;

export type BreadcrumbItemProps = React.ComponentPropsWithoutRef<"li">;

export type BreadcrumbLinkProps = React.ComponentPropsWithoutRef<"a"> & {
  /**
   * Permite compor com outro componente (ex.: Next.js Link) usando Slot.
   *
   * @example
   *   <BreadcrumbLink asChild>
   *     <Link href="/settings">Settings</Link>
   *   </BreadcrumbLink>
   */
  asChild?: boolean;
};

export type BreadcrumbPageProps = React.ComponentPropsWithoutRef<"span">;

export type BreadcrumbSeparatorProps = React.ComponentPropsWithoutRef<"li">;

export type BreadcrumbEllipsisProps = React.ComponentPropsWithoutRef<"span">;
