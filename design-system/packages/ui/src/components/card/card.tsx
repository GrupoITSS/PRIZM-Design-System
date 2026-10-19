import { cn } from "../../lib/cn";
import * as React from "react";
import {
  cardContentVariants,
  cardFooterVariants,
  cardHeaderVariants,
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

type CardSize = NonNullable<CardProps["size"]>;

const CardSizeContext = React.createContext<CardSize>("default");

function useCardSize(): CardSize {
  return React.use(CardSizeContext) ?? "default";
}

/**
 * Card — container used to group related content with optional header and footer.
 *
 * The `size` prop controls the density of the header, content and footer.
 *
 * @example
 * <Card size="sm">
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
  size = "default",
  title,
  description,
  action,
  footer,
  children,
  ref,
  ...props
}: CardProps & { ref?: React.Ref<HTMLDivElement> }) {
  const normalizedSize: CardSize = size === "sm" ? "sm" : "default";
  const hasHeaderProps = title !== undefined || description !== undefined || action !== undefined;
  const hasFooterProp = footer !== undefined;
  const useSimplifiedAPI = hasHeaderProps || hasFooterProp;

  return (
    <CardSizeContext value={normalizedSize}>
      <div
        ref={ref}
        data-slot="card"
        data-size={normalizedSize}
        className={cn(cardVariants({ size: normalizedSize, className }))}
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
    </CardSizeContext>
  );
};

const CardHeader = function CardHeader({
  className,
  ref,
  ...props
}: CardHeaderProps & { ref?: React.Ref<HTMLDivElement> }) {
  const size = useCardSize();

  return (
    <div
      ref={ref}
      data-slot="card-header"
      className={cn(cardHeaderVariants({ size, className }))}
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
      className={cn("text-2xl font-semibold leading-none tracking-tight", className)}
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
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
};

const CardContent = function CardContent({
  className,
  ref,
  ...props
}: CardContentProps & { ref?: React.Ref<HTMLDivElement> }) {
  const size = useCardSize();

  return (
    <div
      ref={ref}
      data-slot="card-content"
      className={cn(cardContentVariants({ size, className }))}
      {...props}
    />
  );
};

const CardFooter = function CardFooter({
  className,
  ref,
  ...props
}: CardFooterProps & { ref?: React.Ref<HTMLDivElement> }) {
  const size = useCardSize();

  return (
    <div
      ref={ref}
      data-slot="card-footer"
      className={cn(cardFooterVariants({ size, className }))}
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
      className={cn("ml-auto flex items-center gap-2", className)}
      {...props}
    />
  );
};

export { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
