import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "@grupoitss/prizm-ui/badge";
import { Button } from "@grupoitss/prizm-ui/button";
import {
  Card,
  CardAction,
  CardContent,
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
          "Caixa que agrupa conteúdo relacionado com cabeçalho, corpo e rodapé. Base: [shadcn/ui](https://ui.shadcn.com) + tokens PRIZM.\n\n" +
          "API documentada: composição (`CardHeader`, `CardTitle`, `CardDescription`, `CardAction`, `CardContent`, `CardFooter`). " +
          "As props `title`, `description`, `action` e `footer` são atalho compatível.\n\n" +
          '**Documentação base:** <a href="https://ui.shadcn.com/docs/components/card" target="_blank" rel="noopener noreferrer">Card — shadcn/ui</a>',
      },
    },
  },
  args: {
    className: "mx-auto w-full max-w-sm",
  },
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card className="mx-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
        <CardAction>
          <button type="button" className="text-xs font-medium">
            Action
          </button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>Card Footer</CardFooter>
    </Card>
  ),
};

export const AtalhoPorProps: Story = {
  name: "Atalho por props",
  render: () => (
    <Card
      className="mx-auto w-full max-w-sm"
      title="Card Title"
      description="Card Description"
      action={
        <button type="button" className="text-xs font-medium">
          Action
        </button>
      }
      footer="Card Footer"
    >
      <p>Card Content</p>
    </Card>
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
