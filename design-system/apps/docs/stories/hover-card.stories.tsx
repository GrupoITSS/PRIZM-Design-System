import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "@grupoitss/prizm-ui/button";

import { HoverCard } from "@grupoitss/prizm-ui/hover-card";

const meta: Meta<typeof HoverCard> = {
  title: "Primários/HoverCard",
  component: HoverCard,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "API preferencial **por props** (sem subcomponentes). Base: [shadcn/ui](https://ui.shadcn.com) + Radix, com tokens PRIZM.\n\n" +
          "Hover card do design system PRIZM, baseado em Radix HoverCard.\n\n" +
          "**API principal por props (recomendada):** use `trigger` e `content` para definir o disparador e o conteúdo exibido, sem necessidade de subcomponentes.\n\n" +
          "Exemplo: `<HoverCard trigger={<span>@prizm</span>} content={<div>...</div>} />`\n\n" +
          '**Documentação:** <a href="https://ui.shadcn.com/docs/components/hover-card" target="_blank" rel="noopener noreferrer">Hover Card — shadcn/ui</a>',
      },
    },
  },
  argTypes: {
    trigger: { control: false },
    content: { control: false },
  },
};

export default meta;

type Story = StoryObj<typeof HoverCard>;

// 1. Basic / Demo — replica do exemplo principal com botão "Hover Here"
export const Demo: Story = {
  render: (args) => (
    <div className="flex h-[80vh] items-center justify-center">
      <HoverCard
        {...args}
        openDelay={10}
        closeDelay={100}
        trigger={<Button variant="link">Hover Here</Button>}
        content={
          <div className="flex w-64 flex-col gap-0.5">
            <div className="font-semibold">@nextjs</div>
            <div>The React Framework – created and maintained by @vercel.</div>
            <div className="mt-1 text-xs text-muted-foreground">Joined December 2021</div>
          </div>
        }
      />
    </div>
  ),
};

// 2. Trigger Delays — controle de openDelay e closeDelay
export const TriggerDelays: Story = {
  render: (args) => (
    <div className="flex h-[80vh] items-center justify-center">
      <HoverCard
        {...args}
        openDelay={100}
        closeDelay={200}
        trigger={<Button variant="outline">Hover</Button>}
        content={<div>Content</div>}
      />
    </div>
  ),
};

// 3. Positioning — controle de side e align
export const Positioning: Story = {
  render: (args) => (
    <div className="flex h-[80vh] items-center justify-center">
      <HoverCard
        {...args}
        side="top"
        align="start"
        trigger={<Button variant="outline">Hover (top / start)</Button>}
        content={<div>Content</div>}
      />
    </div>
  ),
};

// 4. Sides — mesma demo do shadcn, mas via prop `side`
const HOVER_CARD_SIDES = ["left", "top", "bottom", "right"] as const;

export const Sides: Story = {
  render: (args) => (
    <div className="flex h-[80vh] items-center flex-wrap justify-center gap-2">
      {HOVER_CARD_SIDES.map((side) => (
        <HoverCard
          key={side}
          {...args}
          openDelay={100}
          closeDelay={100}
          side={side}
          trigger={
            <Button variant="outline" className="capitalize">
              {side}
            </Button>
          }
          content={
            <div className="flex flex-col gap-1">
              <h4 className="font-medium">Hover Card</h4>
              <p>This hover card appears on the {side} side of the trigger.</p>
            </div>
          }
        />
      ))}
    </div>
  ),
};
