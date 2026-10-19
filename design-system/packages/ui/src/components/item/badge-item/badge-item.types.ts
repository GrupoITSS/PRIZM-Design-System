import type { ItemBadge } from "../item.types";

export interface ItemBadgesProps {
  badges: ItemBadge[];
  badgesRemovable?: boolean;
  onRemove: (badge: ItemBadge) => void;
  className?: string;
  badgeClassName?: string;
}
