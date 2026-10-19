import type * as React from "react";
import type { CardVariantProps } from "./card.styles";

export interface CardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">, CardVariantProps {
  /**
   * Title text/content for the card header.
   * When provided, the header is rendered automatically as part of the simplified API.
   *
   * @example "Card title"
   */
  title?: React.ReactNode;
  /**
   * Description text/content displayed under the title in the header.
   *
   * @example "Short description of this card."
   */
  description?: React.ReactNode;
  /**
   * Action element rendered in the top-right of the header (e.g. a Button or Badge).
   *
   * @example <Button size="sm">Edit</Button>
   */
  action?: React.ReactNode;
  /**
   * Footer content displayed at the bottom of the card.
   * Commonly used for secondary text or actions.
   *
   * @example "Last updated 2h ago"
   */
  footer?: React.ReactNode;
}

export type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>;

export type CardTitleProps = React.HTMLAttributes<HTMLDivElement>;

export type CardDescriptionProps = React.HTMLAttributes<HTMLDivElement>;

export type CardContentProps = React.HTMLAttributes<HTMLDivElement>;

export type CardFooterProps = React.HTMLAttributes<HTMLDivElement>;

export type CardActionProps = React.HTMLAttributes<HTMLDivElement>;
