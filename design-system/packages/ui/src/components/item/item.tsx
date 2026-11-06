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
  itemButtonStyles,
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
  // Interactive without href is a real <button> (06/11/2026): before it was a div the keyboard
  // never reached (WCAG 2.1.1, 4.1.2). Inside a button only phrasing content is valid, so the
  // inner parts become spans.
  const asButton = interactive && !href && !asChild;
  const Comp = asChild ? Slot.Root : href ? "a" : asButton ? "button" : "div";
  const Part = asButton ? "span" : "div";
  const Desc = asButton ? "span" : "p";
  const computedRel = mergeRelForBlankTarget(target, rel);
  const hasDescription = description != null;
  const actions = actionsProp;
  const clickable = interactive || href != null;
  // A decorative icon (e.g. a chevron) in actions is fine; a control is not.
  const actionsRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (process.env.NODE_ENV === "production" || !clickable) return;
    const control = actionsRef.current?.querySelector(
      "button, a[href], input, select, textarea, [tabindex]",
    );
    if (control) {
      console.warn(
        "Item: controle em actions dentro de um Item clicável (href ou interactive) é um controle dentro de outro. Tire o botão ou o clique do Item.",
      );
    }
  });
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
        interactive ? "hover:bg-accent/80 cursor-pointer" : undefined,
        asButton ? itemButtonStyles : undefined,
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
      {...(asButton ? { type: "button" as const } : null)}
      {...props}
    >
      {header != null && (
        <Part data-slot="item-header" className={cn(itemHeaderStyles, classes?.header)}>
          {header}
        </Part>
      )}

      {media != null && (
        <Part
          data-slot="item-media"
          data-variant={mediaVariant}
          className={cn(
            itemMediaVariants({ variant: mediaVariant }),
            hasDescription ? "self-start translate-y-0.5" : undefined,
            classes?.media,
          )}
        >
          {media}
        </Part>
      )}

      <Part data-slot="item-content" className={cn(itemContentStyles, classes?.content)}>
        <Part data-slot="item-title" className={cn(itemTitleStyles, classes?.title)}>
          {title}
        </Part>
        {hasDescription && (
          <Desc
            data-slot="item-description"
            className={cn(itemDescriptionStyles, classes?.description)}
          >
            {description}
          </Desc>
        )}
      </Part>

      {meta != null && (
        <Part data-slot="item-meta" className={cn(itemMetaStyles, classes?.meta)}>
          {meta}
        </Part>
      )}

      {actions != null && (
        <Part
          ref={actionsRef as React.Ref<HTMLDivElement & HTMLSpanElement>}
          data-slot="item-actions" className={cn(itemActionsStyles, classes?.actions)}>
          {actions}
        </Part>
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
        <Part data-slot="item-footer" className={cn(itemFooterStyles, classes?.footer)}>
          {footer}
        </Part>
      )}
    </Comp>
  );
};

Item.displayName = "Item";

export { FileItem, FileList } from "./file-item";
export { Item };
