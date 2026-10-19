import { cva, type VariantProps } from "class-variance-authority";

/**
 * Tabs PRIZM — `underline` é o visual do Cockpit (PAS);
 * `pills` mantém o estilo clássico shadcn.
 */
export const tabsRootVariants = cva("flex min-h-0 flex-col", {
  variants: {
    variant: {
      underline: "",
      pills: "",
    },
    size: {
      md: "",
    },
  },
  defaultVariants: {
    variant: "underline",
    size: "md",
  },
});

export type TabsVariantProps = VariantProps<typeof tabsRootVariants>;

export const tabsListVariants = cva("", {
  variants: {
    variant: {
      underline:
        "flex h-auto w-full items-stretch justify-start gap-0 overflow-visible rounded-none bg-transparent p-0 text-muted-foreground",
      pills:
        "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
    },
  },
  defaultVariants: {
    variant: "underline",
  },
});

export const tabsTriggerVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm transition-colors outline-none focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        /**
         * Cockpit / proto: fonte normal, underline azul no ativo, sem pill.
         */
        underline:
          "relative overflow-visible rounded-none px-2.5 pt-3 pb-3.5 font-normal leading-5 text-muted-foreground hover:text-foreground focus-visible:ring-0 data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none after:pointer-events-none after:absolute after:inset-x-0 after:bottom-[-1px] after:z-[1] after:h-0.5 after:bg-transparent data-[state=active]:after:bg-primary",
        pills:
          "rounded-sm px-3 py-1.5 font-medium ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      },
    },
    defaultVariants: {
      variant: "underline",
    },
  },
);

export const tabsContentVariants = cva(
  "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        underline: "mt-0 flex min-h-0 flex-1 flex-col overflow-hidden pt-0",
        pills: "mt-2",
      },
    },
    defaultVariants: {
      variant: "underline",
    },
  },
);

/** @deprecated use tabsListVariants — kept for any external imports */
export const tabsListStyles = tabsListVariants({ variant: "pills" });
/** @deprecated use tabsTriggerVariants */
export const tabsTriggerStyles = tabsTriggerVariants({ variant: "pills" });
/** @deprecated use tabsContentVariants */
export const tabsContentStyles = tabsContentVariants({ variant: "pills" });
