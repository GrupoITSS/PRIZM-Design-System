import { Button } from "../button";
import { cn } from "../../lib/cn";
import { Slot } from "radix-ui";
import * as React from "react";
import { ItemBadges } from "./badge-item";
import { useItemBadges } from "./item.hooks";
import {
  itemActionsStyles,
  itemContentStyles,
  itemDescriptionStyles,
  itemFooterStyles,
  itemHeaderStyles,
  itemMediaVariants,
  itemMetaStyles,
  itemTitleStyles,
  itemVariants,
} from "./item.styles";
import type { ItemProps } from "./item.types";
import { mergeRelForBlankTarget } from "./item.utils";

// ---------------------------------------------------------------------------
// Item
// ---------------------------------------------------------------------------

/**
 * Item — A versatile row for displaying media, title, description and actions.
 * Designed to be **props-based** (no subcomponents needed).
 */
const Item = ({
  className,
  classes,
  variant = "default",
  size = "default",
  interactive = false,
  asChild = false,
  title,
  description,
  header,
  footer,
  media,
  mediaVariant = "default",
  meta,
  actions: actionsProp,
  badges,
  badgesRemovable = true,
  onBadgesChange,
  onBadgeRemove,
  href,
  target,
  rel,
  ref,
  ...props
}: ItemProps & { ref?: React.Ref<HTMLElement> }) => {
  const Comp = asChild ? Slot.Root : href ? "a" : "div";
  const computedRel = mergeRelForBlankTarget(target, rel);
  const hasDescription = description != null;
  const actions =
    actionsProp === undefined && variant === "badges" ? (
      <Button size="sm" variant="outline">
        Manage
      </Button>
    ) : (
      actionsProp
    );
  const { hasBadges, handleRemoveBadge } = useItemBadges(badges, onBadgesChange, onBadgeRemove);

  return (
    <Comp
      // @ts-expect-error Polymorphic component, ref/type may mismatch on div/a/Slot
      ref={ref}
      data-slot="item"
      data-variant={variant}
      data-size={size}
      data-interactive={interactive ? "" : undefined}
      data-has-description={hasDescription ? "" : undefined}
      className={cn(
        itemVariants({ variant, size }),
        interactive
          ? variant === "file"
            ? "hover:bg-accent/60 cursor-pointer"
            : "hover:bg-accent/80 cursor-pointer"
          : undefined,
        classes?.root,
        className,
      )}
      {...(href
        ? {
            href,
            target,
            rel: computedRel,
          }
        : null)}
      {...props}
    >
      {header != null && (
        <div data-slot="item-header" className={cn(itemHeaderStyles, classes?.header)}>
          {header}
        </div>
      )}

      {media != null && (
        <div
          data-slot="item-media"
          data-variant={mediaVariant}
          className={cn(
            itemMediaVariants({ variant: mediaVariant }),
            hasDescription ? "self-start translate-y-0.5" : undefined,
            classes?.media,
          )}
        >
          {media}
        </div>
      )}

      <div data-slot="item-content" className={cn(itemContentStyles, classes?.content)}>
        <div data-slot="item-title" className={cn(itemTitleStyles, classes?.title)}>
          {title}
        </div>
        {hasDescription && (
          <p
            data-slot="item-description"
            className={cn(itemDescriptionStyles, classes?.description)}
          >
            {description}
          </p>
        )}
      </div>

      {meta != null && (
        <div data-slot="item-meta" className={cn(itemMetaStyles, classes?.meta)}>
          {meta}
        </div>
      )}

      {actions != null && (
        <div data-slot="item-actions" className={cn(itemActionsStyles, classes?.actions)}>
          {actions}
        </div>
      )}

      {hasBadges && (
        <ItemBadges
          badges={badges!}
          badgesRemovable={badgesRemovable}
          onRemove={handleRemoveBadge}
          className={classes?.badges}
          badgeClassName={classes?.badge}
        />
      )}

      {footer != null && (
        <div data-slot="item-footer" className={cn(itemFooterStyles, classes?.footer)}>
          {footer}
        </div>
      )}
    </Comp>
  );
};

Item.displayName = "Item";

export { FileItem, FileList } from "./file-item";
export { Item };
