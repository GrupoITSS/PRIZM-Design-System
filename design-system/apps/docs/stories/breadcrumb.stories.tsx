import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronDown, Dot } from "@grupoitss/prizm-ui/icons";
import { Breadcrumb } from "@grupoitss/prizm-ui/breadcrumb";

const meta: Meta<typeof Breadcrumb> = {
  title: "Primários/Breadcrumb",
  component: Breadcrumb,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "API preferencial **por props** (sem subcomponentes). Base: [shadcn/ui](https://ui.shadcn.com) + Radix, com tokens PRIZM.\n\n" +
          "Breadcrumb do design system PRIZM, baseado no componente Breadcrumb do shadcn/ui.\n\n" +
          "Oferece uma **API simplificada via prop `items`** para os casos mais comuns e " +
          "mantém a **API de composição** (`BreadcrumbList`, `BreadcrumbItem`, etc.) para layouts avançados.\n\n" +
          '**Documentação base:** <a href="https://ui.shadcn.com/docs/components/breadcrumb" target="_blank" rel="noopener noreferrer">Breadcrumb — shadcn/ui</a>',
      },
    },
  },
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Projects", href: "/projects" },
      { label: "PRIZM UI" },
    ],
  },
};

export default meta;

type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {};

export const WithIcons: Story = {
  args: {
    items: [
      { label: "Home", href: "/", icon: <span aria-hidden="true">🏠</span> },
      {
        label: "Design System",
        href: "/design-system",
        icon: <span aria-hidden="true">🎨</span>,
      },
      { label: "Breadcrumb", icon: <span aria-hidden="true">🧭</span> },
    ],
  },
};

export const WithEllipsis: Story = {
  render: () => (
    <Breadcrumb
      items={[
        { label: "Home", href: "/" },
        { label: "Dashboard", href: "/dashboard" },
        { label: "Settings", icon: <span aria-hidden="true">⚙️</span> },
      ]}
    />
  ),
};

export const CustomSeparatorDots: Story = {
  render: () => (
    <Breadcrumb
      separator={<Dot className="size-3.5" />}
      items={[
        { label: "Home", href: "/" },
        { label: "Components", href: "/components" },
        { label: "Breadcrumb" },
      ]}
    />
  ),
};

export const WithDropdown: Story = {
  render: () => (
    <Breadcrumb
      separator={<Dot className="size-3.5" />}
      items={[
        { label: "Home", href: "/" },
        {
          label: (
            <button
              type="button"
              className="flex items-center gap-1 rounded-md border border-border bg-background px-2 py-1 text-xs"
            >
              Components
              <ChevronDown className="size-3.5" aria-hidden="true" />
            </button>
          ),
        },
        { label: "Breadcrumb" },
      ]}
    />
  ),
};
