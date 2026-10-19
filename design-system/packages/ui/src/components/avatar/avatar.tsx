import { cn } from "../../lib/cn";
import { Avatar as RadixAvatar } from "radix-ui";
import * as React from "react";
import {
  avatarBadgeStyles,
  avatarFallbackStyles,
  avatarGroupCountStyles,
  avatarGroupStyles,
  avatarImageStyles,
  avatarVariants,
} from "./avatar.styles";
import type {
  AvatarBadgeProps,
  AvatarFallbackProps,
  AvatarGroupCountProps,
  AvatarGroupProps,
  AvatarImageProps,
  AvatarProps,
} from "./avatar.types";

/**
 * URLs que já carregaram com sucesso nesta sessão do browser.
 * Evita piscada (fallback → imagem) ao remountar o Avatar na troca de tela.
 */
const loadedAvatarSrcCache = new Set<string>();

/** Limpa o cache (testes). */
export function clearAvatarSrcCache() {
  loadedAvatarSrcCache.clear();
}

/**
 * Preload da URL: só considera a imagem válida após `onload`.
 * Se a URL já foi carregada antes, reusa imediatamente (sem flash do fallback).
 */
function useResolvedAvatarSrc(src?: string) {
  const nextSrc = src?.trim() || undefined;
  const [resolvedSrc, setResolvedSrc] = React.useState<string | undefined>(() =>
    nextSrc && loadedAvatarSrcCache.has(nextSrc) ? nextSrc : undefined,
  );

  // When src changes, empty or already-loaded URLs resolve right away, during
  // render (https://react.dev/learn/you-might-not-need-an-effect).
  const [prevSrc, setPrevSrc] = React.useState(nextSrc);
  if (nextSrc !== prevSrc) {
    setPrevSrc(nextSrc);
    if (!nextSrc) setResolvedSrc(undefined);
    else if (loadedAvatarSrcCache.has(nextSrc)) setResolvedSrc(nextSrc);
  }

  React.useEffect(() => {
    if (!nextSrc || loadedAvatarSrcCache.has(nextSrc)) return;

    // Mantém a imagem anterior enquanto a nova carrega (evita flash).
    let cancelled = false;
    const image = new window.Image();

    image.onload = () => {
      loadedAvatarSrcCache.add(nextSrc);
      if (!cancelled) setResolvedSrc(nextSrc);
    };
    image.onerror = () => {
      loadedAvatarSrcCache.delete(nextSrc);
      if (!cancelled) setResolvedSrc(undefined);
    };
    image.src = nextSrc;

    return () => {
      cancelled = true;
      image.onload = null;
      image.onerror = null;
    };
  }, [nextSrc]);

  return resolvedSrc;
}

/**
 * Avatar (root). Image element with fallback for representing the user.
 * Uses Radix Avatar primitive; supports size variants (xs, sm, md, lg, xl).
 *
 * **Simplified API:** Pass `src`, `alt`, `fallback` as props (e.g. `<Avatar src="..." fallback="CN" />`).
 * Na 1ª carga mostra a letra até o preload; URLs já carregadas reaparecem sem piscada.
 * **Composition API:** Pass AvatarImage and AvatarFallback as children for advanced use.
 *
 * @see [Avatar — shadcn/ui (Radix)](https://ui.shadcn.com/docs/components/radix/avatar)
 */
const Avatar = ({
  className,
  size = "xl",
  src,
  alt,
  fallback,
  children,
  ref,
  ...props
}: AvatarProps & { ref?: React.Ref<React.ComponentRef<typeof RadixAvatar.Root>> }) => {
  // Se fallback ou src são fornecidos, usar API simplificada
  const useSimplifiedAPI = fallback !== undefined || src !== undefined;
  const resolvedSrc = useResolvedAvatarSrc(useSimplifiedAPI ? src : undefined);

  return (
    <RadixAvatar.Root
      ref={ref}
      data-slot="avatar"
      data-size={size}
      className={cn(avatarVariants({ size }), className)}
      {...props}
    >
      {useSimplifiedAPI ? (
        <>
          {resolvedSrc ? <AvatarImage src={resolvedSrc} alt={alt} /> : null}
          <AvatarFallback>{fallback ?? ""}</AvatarFallback>
        </>
      ) : (
        children
      )}
    </RadixAvatar.Root>
  );
};
Avatar.displayName = RadixAvatar.Root.displayName ?? "Avatar";

const AvatarImage = ({
  className,
  ref,
  ...props
}: AvatarImageProps & { ref?: React.Ref<React.ComponentRef<typeof RadixAvatar.Image>> }) => (
  <RadixAvatar.Image
    ref={ref}
    data-slot="avatar-image"
    className={cn(avatarImageStyles, className)}
    {...props}
  />
);
AvatarImage.displayName = RadixAvatar.Image.displayName ?? "AvatarImage";

const AvatarFallback = ({
  className,
  ref,
  ...props
}: AvatarFallbackProps & { ref?: React.Ref<React.ComponentRef<typeof RadixAvatar.Fallback>> }) => (
  <RadixAvatar.Fallback
    ref={ref}
    data-slot="avatar-fallback"
    className={cn(avatarFallbackStyles, className)}
    {...props}
  />
);
AvatarFallback.displayName = RadixAvatar.Fallback.displayName ?? "AvatarFallback";

function AvatarBadge({ className, ...props }: AvatarBadgeProps) {
  return <span data-slot="avatar-badge" className={cn(avatarBadgeStyles, className)} {...props} />;
}
AvatarBadge.displayName = "AvatarBadge";

function AvatarGroup({ className, ...props }: AvatarGroupProps) {
  return <div data-slot="avatar-group" className={cn(avatarGroupStyles, className)} {...props} />;
}
AvatarGroup.displayName = "AvatarGroup";

function AvatarGroupCount({ className, ...props }: AvatarGroupCountProps) {
  return (
    <span
      data-slot="avatar-group-count"
      className={cn(avatarGroupCountStyles, className)}
      {...props}
    />
  );
}
AvatarGroupCount.displayName = "AvatarGroupCount";

export { Avatar, AvatarBadge, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage };
