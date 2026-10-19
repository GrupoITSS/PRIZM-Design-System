import type { BadgeVariantProps } from "../badge/badge.styles";
import type { ItemMediaVariantProps, ItemVariantProps } from "./item.styles";

export interface ItemBadge {
  id: string;
  label: string;
  variant?: NonNullable<BadgeVariantProps["variant"]>;
}

export interface ItemClasses {
  root?: string;
  header?: string;
  footer?: string;
  media?: string;
  content?: string;
  title?: string;
  description?: string;
  meta?: string;
  actions?: string;
  badges?: string;
  badge?: string;
}

export interface ItemProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "title">, ItemVariantProps {
  /**
   * Main title of the item (primary text).
   */
  title: React.ReactNode;
  /**
   * Optional supporting text below the title.
   */
  description?: React.ReactNode;
  /**
   * Optional header content displayed above the main row (full width).
   */
  header?: React.ReactNode;
  /**
   * Optional footer content displayed below the main row (full width).
   */
  footer?: React.ReactNode;
  /**
   * Optional media content (icon, avatar, image, etc.) displayed before the content.
   */
  media?: React.ReactNode;
  /**
   * Media styling preset.
   * @default "default"
   */
  mediaVariant?: NonNullable<ItemMediaVariantProps["variant"]>;
  /**
   * Optional content rendered after the main content (e.g. duration, status).
   */
  meta?: React.ReactNode;
  /**
   * Optional actions area rendered at the end (buttons, icons, etc).
   */
  actions?: React.ReactNode;
  /**
   * Array of badges displayed in the footer area.
   * Each badge can be removed via the close button when `badgesRemovable` is true.
   */
  badges?: ItemBadge[];
  /**
   * Whether badges can be removed (shows close button on each badge).
   * @default true
   */
  badgesRemovable?: boolean;
  /**
   * Callback fired when the badge array changes (after add or remove).
   */
  onBadgesChange?: (badges: ItemBadge[]) => void;
  /**
   * Callback fired when a single badge is removed.
   * Receives the removed badge and the remaining array.
   */
  onBadgeRemove?: (removed: ItemBadge, remaining: ItemBadge[]) => void;
  /**
   * If provided, renders the item as an anchor element.
   */
  href?: string;
  /**
   * Anchor target when `href` is provided.
   */
  target?: React.AnchorHTMLAttributes<HTMLAnchorElement>["target"];
  /**
   * Anchor rel when `href` is provided. If `target=\"_blank\"` and `rel` is not
   * provided, defaults to `\"noopener noreferrer\"`.
   */
  rel?: React.AnchorHTMLAttributes<HTMLAnchorElement>["rel"];
  /**
   * If true, renders as Slot.Root, allowing advanced composition.
   * @default false
   */
  asChild?: boolean;
  /**
   * Enables hover styles and pointer affordance for interactive usage
   * (e.g. clickable rows, menu items, popover triggers).
   * @default false
   */
  interactive?: boolean;
  /**
   * Optional per-slot className overrides.
   */
  classes?: ItemClasses;
}

export type { FileItemData, FileItemProps, FileListProps } from "./file-item/file-item.types";
