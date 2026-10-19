import type { Meta, StoryObj } from "@storybook/react-vite";

import { ResizablePanels } from "@grupoitss/prizm-ui/resizable";

const meta: Meta<typeof ResizablePanels> = {
  title: "Primários/ResizablePanels",
  component: ResizablePanels,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "API preferencial **por props** (sem subcomponentes). Base: [shadcn/ui](https://ui.shadcn.com) + Radix, com tokens PRIZM.\n\n" +
          "Grupo de painéis redimensionáveis do design system PRIZM, baseado em `react-resizable-panels`.\n\n" +
          "**API principal por props (recomendada):** use a prop `panels` para descrever os painéis, sem necessidade de subcomponentes (`Panel`, `PanelGroup`, `PanelResizeHandle`).\n\n" +
          'Exemplo: `<ResizablePanels direction="horizontal" panels={[{ content: <Sidebar /> }, { content: <Main /> }]} />`\n\n' +
          '**Documentação:** <a href="https://ui.shadcn.com/docs/components/resizable" target="_blank" rel="noopener noreferrer">Resizable — shadcn/ui</a>',
      },
    },
  },
  args: {
    direction: "horizontal",
    withHandle: true,
  },
  argTypes: {
    direction: {
      control: "inline-radio",
      options: ["horizontal", "vertical"],
    },
    withHandle: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ResizablePanels>;

// 1. Demo básico — dois painéis com conteúdo simples
export const Demo: Story = {
  render: (args) => (
    <div className="h-64 w-full border bg-muted/40">
      <ResizablePanels
        {...args}
        panels={[
          {
            id: "left",
            defaultSize: 30,
            minSize: 15,
            content: (
              <div className="flex h-full items-center justify-center bg-muted text-xs text-muted-foreground">
                Left panel
              </div>
            ),
          },
          {
            id: "right",
            defaultSize: 70,
            minSize: 40,
            content: (
              <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                Right panel
              </div>
            ),
          },
        ]}
      />
    </div>
  ),
};

// 2. Vertical — pilha de painéis
export const Vertical: Story = {
  render: (args) => (
    <div className="h-64 w-full border bg-muted/40">
      <ResizablePanels
        {...args}
        direction="vertical"
        panels={[
          {
            id: "top",
            defaultSize: 40,
            minSize: 20,
            content: (
              <div className="flex h-full items-center justify-center bg-muted text-xs text-muted-foreground">
                Top panel
              </div>
            ),
          },
          {
            id: "bottom",
            defaultSize: 60,
            minSize: 30,
            content: (
              <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                Bottom panel
              </div>
            ),
          },
        ]}
      />
    </div>
  ),
};

// 3. Três painéis — layout mais complexo
export const ThreePanels: Story = {
  args: {
    direction: "vertical",
  },

  render: (args) => (
    <div className="h-64 w-full border bg-muted/40">
      <ResizablePanels
        {...args}
        panels={[
          {
            id: "nav",
            defaultSize: 20,
            minSize: 10,
            content: (
              <div className="flex h-full items-center justify-center bg-muted text-xs text-muted-foreground">
                Navigation
              </div>
            ),
          },
          {
            id: "content",
            defaultSize: 55,
            minSize: 40,
            content: (
              <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                Content
              </div>
            ),
          },
          {
            id: "details",
            defaultSize: 25,
            minSize: 15,
            content: (
              <div className="flex h-full items-center justify-center bg-muted text-xs text-muted-foreground">
                Details
              </div>
            ),
          },
        ]}
      />
    </div>
  ),
};
