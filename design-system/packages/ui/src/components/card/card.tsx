import { cn } from "../../lib/cn";
import * as React from "react";
import {
  cardActionStyles,
  cardContentStyles,
  cardDescriptionStyles,
  cardFooterStyles,
  cardHeaderStyles,
  cardTitleStyles,
  cardVariants,
} from "./card.styles";
import type {
  CardActionProps,
  CardContentProps,
  CardDescriptionProps,
  CardFooterProps,
  CardHeaderProps,
  CardProps,
  CardTitleProps,
} from "./card.types";

/**
 * Card — caixa que agrupa conteúdo relacionado com cabeçalho, corpo e rodapé.
 *
 * A API documentada é a composição (`CardHeader`, `CardTitle`, `CardDescription`,
 * `CardAction`, `CardContent`, `CardFooter`). As props `title`, `description`,
 * `action` e `footer` são um atalho compatível.
 *
 * @example
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Card Title</CardTitle>
 *     <CardDescription>Card Description</CardDescription>
 *     <CardAction>Action</CardAction>
 *   </CardHeader>
 *   <CardContent>Card Content</CardContent>
 *   <CardFooter>Card Footer</CardFooter>
 * </Card>
 *
 * @see https://ui.shadcn.com/docs/components/card
 */
const Card = function Card({
  className,
  title,
  description,
  action,
  footer,
  children,
  ref,
  ...props
}: CardProps & { ref?: React.Ref<HTMLDivElement> }) {
  const hasHeaderProps = title !== undefined || description !== undefined || action !== undefined;
  const hasFooterProp = footer !== undefined;
  const useSimplifiedAPI = hasHeaderProps || hasFooterProp;

  return (
    <div
      ref={ref}
      data-slot="card"
      className={cn(cardVariants(), className)}
      {...props}
    >
      {useSimplifiedAPI ? (
        <>
          {hasHeaderProps && (
            <CardHeader>
              {Boolean(title) && <CardTitle>{title}</CardTitle>}
              {Boolean(description) && <CardDescription>{description}</CardDescription>}
              {Boolean(action) && <CardAction>{action}</CardAction>}
            </CardHeader>
          )}

          {Boolean(children) && <CardContent>{children}</CardContent>}

          {hasFooterProp && <CardFooter>{footer}</CardFooter>}
        </>
      ) : (
        children
      )}
    </div>
  );
};

const CardHeader = function CardHeader({
  className,
  ref,
  ...props
}: CardHeaderProps & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      data-slot="card-header"
      className={cn(cardHeaderStyles, className)}
      {...props}
    />
  );
};

const CardTitle = function CardTitle({
  className,
  ref,
  ...props
}: CardTitleProps & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      data-slot="card-title"
      className={cn(cardTitleStyles, className)}
      {...props}
    />
  );
};

const CardDescription = function CardDescription({
  className,
  ref,
  ...props
}: CardDescriptionProps & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      data-slot="card-description"
      className={cn(cardDescriptionStyles, className)}
      {...props}
    />
  );
};

const CardContent = function CardContent({
  className,
  ref,
  ...props
}: CardContentProps & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      data-slot="card-content"
      className={cn(cardContentStyles, className)}
      {...props}
    />
  );
};

const CardFooter = function CardFooter({
  className,
  ref,
  ...props
}: CardFooterProps & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      data-slot="card-footer"
      className={cn(cardFooterStyles, className)}
      {...props}
    />
  );
};

const CardAction = function CardAction({
  className,
  ref,
  ...props
}: CardActionProps & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      data-slot="card-action"
      className={cn(cardActionStyles, className)}
      {...props}
    />
  );
};

export { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
