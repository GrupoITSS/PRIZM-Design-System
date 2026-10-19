import { Badge } from "../../badge";
import { cn } from "../../../lib/cn";
import { XIcon } from "lucide-react";
import * as React from "react";
import {
  itemBadgeRemoveIconStyles,
  itemBadgeRemoveStyles,
  itemBadgesStyles,
} from "./badge-item.styles";
import type { ItemBadgesProps } from "./badge-item.types";

/**
 * Renders the badge row for Item (list of badges with optional remove buttons).
 * Used internally by Item when `badges` is provided.
 */
const ItemBadges = ({
  badges,
  badgesRemovable = true,
  onRemove,
  className,
  badgeClassName,
  ref,
}: ItemBadgesProps & { ref?: React.Ref<HTMLDivElement> }) => {
  return (
    <div ref={ref} data-slot="item-badges" className={cn(itemBadgesStyles, className)}>
      {badges.map((badge) => (
        <Badge
          key={badge.id}
          variant={badge.variant ?? "secondary"}
          size="sm"
          className={cn(badgeClassName)}
          endIcon={
            badgesRemovable ? (
              <button
                type="button"
                aria-label={`Remove ${badge.label}`}
                className={itemBadgeRemoveStyles}
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(badge);
                }}
              >
                <XIcon className={itemBadgeRemoveIconStyles} />
              </button>
            ) : undefined
          }
        >
          {badge.label}
        </Badge>
      ))}
    </div>
  );
};

ItemBadges.displayName = "ItemBadges";

export { ItemBadges };
