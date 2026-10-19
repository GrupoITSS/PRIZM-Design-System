import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tabs } from "@grupoitss/prizm-ui/tabs";

/**
 * v2 — Tabs no visual real do Cockpit (underline azul).
 */
const meta: Meta<typeof Tabs> = {
  title: "Primários/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  args: {
    variant: "underline",
  },
};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const CockpitUnderline: Story = {
  name: "Cockpit (underline)",
  render: () => (
    <div className="w-full max-w-3xl rounded-lg border border-border bg-background overflow-hidden">
      <Tabs
        variant="underline"
        items={[
          {
            value: "accounts",
            label: "Contas",
            content: <div className="p-8 text-sm text-muted-foreground">Conteúdo Contas</div>,
          },
          {
            value: "solutions",
            label: "Soluções",
            content: <div className="p-8 text-sm text-muted-foreground">Conteúdo Soluções</div>,
          },
          {
            value: "contracts",
            label: "Contratos",
            content: <div className="p-8 text-sm text-muted-foreground">Conteúdo Contratos</div>,
          },
        ]}
      />
    </div>
  ),
};
