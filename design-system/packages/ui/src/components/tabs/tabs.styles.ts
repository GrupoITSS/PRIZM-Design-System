import { cva, type VariantProps } from "class-variance-authority";

/**
 * Tabs PRIZM — `underline` é o visual do Cockpit (PAS) e o padrão;
 * `pills` é a troca compacta, no formato do shadcn atual.
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
      // 36px, como o shadcn atual e o Figma (decisão de 17/11/2026; antes h-10 e p-1).
      pills:
        "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-[3px] text-muted-foreground",
    },
  },
  defaultVariants: {
    variant: "underline",
  },
});

// Anel de foco padrão do Prizm, nas duas variantes (o underline não tinha foco visível, WCAG 2.4.7).
const focusRing =
  "focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-ring-offset";

export const tabsTriggerVariants = cva(
  `inline-flex items-center justify-center whitespace-nowrap text-sm transition-[color,box-shadow] outline-none hover:text-foreground disabled:pointer-events-none disabled:opacity-50 ${focusRing}`,
  {
    variants: {
      variant: {
        /**
         * Cockpit: fonte normal, indicador de 2px em `primary` na ativa, sem fundo.
         */
        underline:
          "relative overflow-visible rounded-none px-2.5 pt-3 pb-3.5 font-normal leading-5 text-muted-foreground data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none after:pointer-events-none after:absolute after:inset-x-0 after:bottom-[-1px] after:z-[1] after:h-0.5 after:bg-transparent data-[state=active]:after:bg-primary",
        pills:
          "h-[calc(100%-1px)] flex-1 rounded-md px-2 py-1 font-medium data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      },
    },
    defaultVariants: {
      variant: "underline",
    },
  },
);

export const tabsContentVariants = cva(`outline-none ${focusRing}`, {
  variants: {
    variant: {
      underline: "mt-0 flex min-h-0 flex-1 flex-col overflow-hidden pt-0",
      pills: "mt-2",
    },
  },
  defaultVariants: {
    variant: "underline",
  },
});

/** @deprecated use tabsListVariants — kept for any external imports */
export const tabsListStyles = tabsListVariants({ variant: "pills" });
/** @deprecated use tabsTriggerVariants */
export const tabsTriggerStyles = tabsTriggerVariants({ variant: "pills" });
/** @deprecated use tabsContentVariants */
export const tabsContentStyles = tabsContentVariants({ variant: "pills" });
