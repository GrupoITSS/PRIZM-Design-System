import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "@grupoitss/prizm-ui/badge";
import { Button } from "@grupoitss/prizm-ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@grupoitss/prizm-ui/card";

const meta: Meta<typeof Card> = {
  title: "Primários/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "API preferencial **por props** (sem subcomponentes). Base: [shadcn/ui](https://ui.shadcn.com) + Radix, com tokens PRIZM.\n\n" +
          'Card do design system PRIZM. Exibe conteúdo agrupado com header, body e footer.\n\nUso recomendado: `<Card title={} description={} action={} footer={}>children</Card>`.\n\nBaseado em shadcn/ui, com suporte a `size="default" | "sm"` para controlar a densidade.\n\n**Documentação base:** <a href="https://ui.shadcn.com/docs/components/card" target="_blank" rel="noopener noreferrer">Card — shadcn/ui</a>',
      },
    },
  },
  args: {
    size: "default",
    title: "Card Title",
    description: "Card Description",
    footer: "Card Footer",
    className: "mx-auto w-full max-w-sm",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["default", "sm"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: (args) => (
    <Card {...args} action={<button className="text-xs font-medium">Action</button>}>
      <p>Card Content</p>
    </Card>
  ),
};

export const Size: Story = {
  render: () => (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-6">
      <Card title="Default size" description="Uses default spacing." footer="Footer">
        <p>Content with default spacing.</p>
      </Card>

      <Card size="sm" title="Small size" description="Uses smaller spacing." footer="Footer">
        <p>Content with small spacing.</p>
      </Card>
    </div>
  ),
};

export const WithImage: Story = {
  render: () => (
    <Card className="relative mx-auto w-full max-w-sm overflow-hidden">
      <div className="relative aspect-video w-full">
        <div className="absolute inset-0 z-10 bg-black/40" />
        <img
          src="https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=800&q=80"
          alt="Event cover"
          className="h-full w-full object-cover brightness-75"
        />
      </div>
      <CardHeader>
        <CardAction>
          <Badge variant="secondary">Featured</Badge>
        </CardAction>
        <CardTitle>Design systems meetup</CardTitle>
        <CardDescription>
          A practical talk on component APIs, accessibility, and shipping faster.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="w-full">View Event</Button>
      </CardFooter>
    </Card>
  ),
};
