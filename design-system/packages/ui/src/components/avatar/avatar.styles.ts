import { cva, type VariantProps } from "class-variance-authority";

/**
 * PRIZM Avatar — styles use design tokens from @grupoitss/prizm-tokens.
 * Compatible with light/dark mode via :root and .dark CSS variables.
 *
 * Decisões de 04/11/2026: padrão md, sem borda, iniciais e badge no tamanho do avatar,
 * badge com status e contador no tamanho do grupo.
 *
 * @see [Avatar — shadcn/ui (Radix)](https://ui.shadcn.com/docs/components/radix/avatar)
 */
const avatarBase = "group/avatar relative flex shrink-0 overflow-hidden rounded-full";

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
    size: "md",
  },
});

export type AvatarVariantProps = VariantProps<typeof avatarVariants>;
export type AvatarSize = NonNullable<AvatarVariantProps["size"]>;

/** AvatarImage: fill container, cover, square aspect (shadcn) */
export const avatarImageStyles = "aspect-square size-full object-cover";

/** AvatarFallback: iniciais em text-xs (xs, sm) e text-sm (md, lg, xl), muted nos dois modos. */
export const avatarFallbackStyles =
  "flex size-full items-center justify-center rounded-full bg-muted text-sm text-muted-foreground group-data-[size=sm]/avatar:text-xs group-data-[size=xs]/avatar:text-xs";

/** AvatarBadge: indicador de status no canto inferior direito, no tamanho do avatar (6 a 14 px). */
export const avatarBadgeVariants = cva(
  "absolute right-0 bottom-0 z-10 size-2.5 rounded-full border-2 border-background group-data-[size=xs]/avatar:size-1.5 group-data-[size=sm]/avatar:size-2 group-data-[size=lg]/avatar:size-3 group-data-[size=xl]/avatar:size-3.5",
  {
    variants: {
      status: {
        online: "bg-success",
        away: "bg-warning",
        busy: "bg-destructive",
        offline: "bg-muted-foreground",
      },
    },
    defaultVariants: {
      status: "online",
    },
  },
);

export type AvatarStatus = NonNullable<VariantProps<typeof avatarBadgeVariants>["status"]>;

/** Texto oculto do status para o leitor de tela (decisão de 04/11/2026). */
export const avatarStatusLabels: Record<AvatarStatus, string> = {
  online: "Online",
  away: "Ausente",
  busy: "Ocupado",
  offline: "Offline",
};

/** AvatarGroup: overlapping avatars container */
export const avatarGroupStyles =
  "group/avatar-group flex -space-x-2 [&>span]:ring-2 [&>span]:ring-background";

/** AvatarGroupCount: "+N" no tamanho dos avatares do grupo (padrão md). */
export const avatarGroupCountStyles =
  "relative flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-medium text-muted-foreground ring-2 ring-background group-has-data-[size=xs]/avatar-group:size-5 group-has-data-[size=xs]/avatar-group:text-xs group-has-data-[size=sm]/avatar-group:size-6 group-has-data-[size=sm]/avatar-group:text-xs group-has-data-[size=lg]/avatar-group:size-10 group-has-data-[size=xl]/avatar-group:size-12";
