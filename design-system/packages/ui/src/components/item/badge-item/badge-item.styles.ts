export const itemBadgesStyles = "flex basis-full flex-wrap items-center gap-1.5";

// The icon is 12px; the ::after spreads the click and touch area to 24 x 24px (WCAG 2.5.8,
// decision of 06/11/2026) without moving the badge text.
export const itemBadgeRemoveStyles =
  "relative ml-1 inline-flex cursor-pointer items-center rounded-sm opacity-70 transition-opacity after:absolute after:-inset-1.5 after:content-[''] hover:opacity-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring";

export const itemBadgeRemoveIconStyles = "size-3";
