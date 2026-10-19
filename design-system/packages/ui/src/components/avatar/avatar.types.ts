import type * as React from "react";
import type { Avatar as RadixAvatar } from "radix-ui";
import type { AvatarVariantProps } from "./avatar.styles";

export interface AvatarProps
  extends
    Omit<React.ComponentPropsWithoutRef<typeof RadixAvatar.Root>, "className">,
    AvatarVariantProps {
  className?: string;
  /**
   * Image URL to display. The component preloads the URL and only renders the
   * image after a successful load; until then (or on failure) `fallback` is shown.
   */
  src?: string;
  /**
   * Alt text for the image. **Highly recommended for accessibility** when using `src`.
   * @example "John Doe"
   */
  alt?: string;
  /**
   * Fallback content (e.g. initials like "JD"). **Required when using simplified API** (src/fallback props).
   * Displayed when `src` is not provided or fails to load. Omit when using composition (children).
   * @example "JD"
   */
  fallback?: string;
}

export interface AvatarImageProps extends Omit<
  React.ComponentPropsWithoutRef<typeof RadixAvatar.Image>,
  "className"
> {
  className?: string;
}

export interface AvatarFallbackProps extends Omit<
  React.ComponentPropsWithoutRef<typeof RadixAvatar.Fallback>,
  "className"
> {
  className?: string;
}

export type AvatarBadgeProps = React.HTMLAttributes<HTMLDivElement>;

export type AvatarGroupProps = React.HTMLAttributes<HTMLDivElement>;

export type AvatarGroupCountProps = React.HTMLAttributes<HTMLDivElement>;
