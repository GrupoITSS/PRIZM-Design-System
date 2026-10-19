import * as React from "react";
import type { ItemBadge, ItemProps } from "./item.types";
import { filterBadge } from "./item.utils";

export function useItemBadges(
  badges: ItemProps["badges"],
  onBadgesChange: ItemProps["onBadgesChange"],
  onBadgeRemove: ItemProps["onBadgeRemove"],
) {
  const hasBadges = badges != null && badges.length > 0;

  const handleRemoveBadge = React.useCallback(
    (badge: ItemBadge) => {
      if (!badges) return;
      const remaining = filterBadge(badges, badge.id);
      onBadgesChange?.(remaining);
      onBadgeRemove?.(badge, remaining);
    },
    [badges, onBadgesChange, onBadgeRemove],
  );

  return { hasBadges, handleRemoveBadge } as const;
}
