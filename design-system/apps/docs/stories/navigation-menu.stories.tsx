import type { Meta, StoryObj } from "@storybook/react-vite";

import { NavigationMenu } from "@grupoitss/prizm-ui/navigation-menu";

const meta: Meta<typeof NavigationMenu> = {
  title: "Primários/NavigationMenu",
  component: NavigationMenu,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "API preferencial **por props** (sem subcomponentes). Base: [shadcn/ui](https://ui.shadcn.com) + Radix, com tokens PRIZM.\n\n" +
          "NavigationMenu do design system PRIZM, baseado em Radix NavigationMenu.\n\n" +
          "**API principal por props (recomendada):** use a prop `items` para definir a estrutura do menu (links simples ou painéis com múltiplos links), sem necessidade de subcomponentes.\n\n" +
          "As stories abaixo replicam o comportamento dos exemplos oficiais utilizando **apenas a API por props**.\n\n" +
          '**Documentação:** <a href="https://ui.shadcn.com/docs/components/navigation-menu" target="_blank" rel="noopener noreferrer">Navigation Menu — shadcn/ui</a>',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof NavigationMenu>;

export const Demo: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      {
        type: "panel",
        label: "Products",
        items: [
          {
            label: "Analytics",
            description: "Dashboards e insights em tempo real.",
            href: "/analytics",
            highlight: true,
          },
          {
            label: "Automation",
            description: "Automatize fluxos de negócio críticos.",
            href: "/automation",
          },
          {
            label: "Workflows",
            description: "Orquestre processos complexos com segurança.",
            href: "/workflows",
          },
        ],
      },
      {
        type: "panel",
        label: "Resources",
        items: [
          {
            label: "Docs",
            description: "Guia completo de integração e APIs.",
            href: "/docs",
          },
          {
            label: "Changelog",
            description: "Veja o histórico de releases e mudanças.",
            href: "/changelog",
          },
        ],
      },
      { label: "Pricing", href: "/pricing" },
    ],
  },
};

/**
 * Equivalente ao exemplo `NavigationMenuDemo` da doc do shadcn/ui:
 * - "Getting started" com lista simples de links
 * - "Components" com grid de componentes
 * - "Docs" como link simples no menu
 *
 * Tudo usando **apenas** a API de props (`items`), sem subcomponentes.
 */
export const ShadcnDemo: Story = {
  args: {
    items: [
      {
        type: "panel",
        label: "Getting started",
        items: [
          {
            label: "Introduction",
            description: "Re-usable components built with Tailwind CSS.",
            href: "/docs",
            highlight: true,
          },
          {
            label: "Installation",
            description: "How to install dependencies and structure your app.",
            href: "/docs/installation",
          },
          {
            label: "Typography",
            description: "Styles for headings, paragraphs, lists...etc",
            href: "/docs/primitives/typography",
          },
        ],
      },
      {
        type: "panel",
        label: "Components",
        columns: 2,
        items: [
          {
            label: "Alert Dialog",
            description:
              "A modal dialog that interrupts the user with important content and expects a response.",
            href: "/docs/primitives/alert-dialog",
          },
          {
            label: "Hover Card",
            description: "For sighted users to preview content available behind a link.",
            href: "/docs/primitives/hover-card",
          },
          {
            label: "Progress",
            description: "Displays an indicator showing the completion progress of a task.",
            href: "/docs/primitives/progress",
          },
          {
            label: "Scroll-area",
            description: "Visually or semantically separates content.",
            href: "/docs/primitives/scroll-area",
          },
          {
            label: "Tabs",
            description: "Layered sections of content that are displayed one at a time.",
            href: "/docs/primitives/tabs",
          },
          {
            label: "Tooltip",
            description: "Displays information related to an element on hover or focus.",
            href: "/docs/primitives/tooltip",
          },
        ],
      },
      {
        label: "Docs",
        href: "/docs",
      },
    ],
  },
};

/**
 * Versão mínima, equivalente ao exemplo "Usage" da doc:
 * um único item que abre um painel com um único link.
 */
export const SimpleUsage: Story = {
  args: {
    items: [
      {
        type: "panel",
        label: "Item One",
        items: [
          {
            label: "Link",
            href: "/docs/item-one",
          },
        ],
      },
    ],
  },
};

/**
 * Exemplo focado em links simples (equivalente ao exemplo "Link Component"),
 * mostrando como representar entradas que funcionam como botões/links diretos.
 *
 * Em apps reais com React Router 7, você pode usar essas rotas (`href`)
 * para navegar programaticamente no handler de clique, mantendo a API
 * de componentes baseada em props.
 */
export const SimpleLinksRow: Story = {
  args: {
    items: [
      { label: "Documentation", href: "/docs" },
      { label: "Components", href: "/docs/components" },
      { label: "Changelog", href: "/docs/changelog" },
    ],
  },
};

/**
 * Exemplo com hierarquia de **3 níveis lógicos** usando apenas props:
 *
 * - Nível 1: trigger raiz ("Solutions")
 * - Nível 2: cartões de categoria dentro do painel ("By Team", "By Industry")
 * - Nível 3: listas aninhadas de subitens dentro de cada cartão
 */
export const NestedSubmenus: Story = {
  args: {
    items: [
      {
        type: "panel",
        label: "Solutions",
        items: [
          {
            label: "By Team",
            description: "Soluções pensadas para cada tipo de equipe.",
            children: [
              { label: "Product", href: "/solutions/teams/product" },
              { label: "Engineering", href: "/solutions/teams/engineering" },
              { label: "Marketing", href: "/solutions/teams/marketing" },
              { label: "Sales", href: "/solutions/teams/sales" },
            ],
          },
          {
            label: "By Industry",
            description: "Use cases específicos para mercados regulados e complexos.",
            children: [
              { label: "Financial Services", href: "/solutions/industry/fs" },
              { label: "Healthcare", href: "/solutions/industry/health" },
              { label: "Retail", href: "/solutions/industry/retail" },
            ],
          },
          {
            label: "By Use Case",
            description: "Comece por um problema de negócio.",
            children: [
              { label: "Onboarding", href: "/solutions/use-cases/onboarding" },
              { label: "Risk & Compliance", href: "/solutions/use-cases/risk" },
              { label: "Customer Support", href: "/solutions/use-cases/support" },
            ],
          },
        ],
      },
      {
        label: "All solutions",
        href: "/solutions",
      },
    ],
  },
};
