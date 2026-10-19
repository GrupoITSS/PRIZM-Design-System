import { cva, type VariantProps } from "class-variance-authority";

/**
 * PRIZM Avatar — styles use design tokens from @grupoitss/prizm-tokens.
 * Compatible with light/dark mode via :root and .dark CSS variables.
 *
 * @see [Avatar — shadcn/ui (Radix)](https://ui.shadcn.com/docs/components/radix/avatar)
 */
const avatarBase = "relative flex shrink-0 overflow-hidden rounded-full border border-border";

export const avatarVariants = cva(avatarBase, {
  variants: {
    size: {
      xs: "size-5",
      sm: "size-6",
      md: "size-8",
      lg: "size-10",
      xl: "size-12",
    },
  },
  defaultVariants: {
    size: "xl",
  },
});

export type AvatarVariantProps = VariantProps<typeof avatarVariants>;

/** AvatarImage: fill container, cover, square aspect (shadcn) */
export const avatarImageStyles = "aspect-square size-full object-cover";

/** AvatarFallback: center content, muted background; text stays muted in light and dark (no white in dark) */
export const avatarFallbackStyles =
  "flex size-full items-center justify-center rounded-full bg-muted text-muted-foreground";

/** AvatarBadge: bottom-right indicator (e.g. online status) */
export const avatarBadgeStyles =
  "absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-background bg-success";

/** AvatarGroup: overlapping avatars container */
export const avatarGroupStyles = "flex -space-x-2 [&>span]:ring-2 [&>span]:ring-background";

/** AvatarGroupCount: "+N" circle when there are more avatars */
export const avatarGroupCountStyles =
  "flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground text-xs font-medium ring-2 ring-background";
