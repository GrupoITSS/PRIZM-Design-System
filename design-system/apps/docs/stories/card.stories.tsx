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

// Traceability: the Card component in [PRIZM] Componentes, the documentation frame and the CMS article.
// The token map lives next to the component (card.tokens.json) and is checked in a test.
const FIGMA_URL = "https://www.figma.com/design/7NPb3iuxjitMdpudp4yHTl?node-id=17374-183180";
const FIGMA_DOC_URL = "https://www.figma.com/design/7NPb3iuxjitMdpudp4yHTl?node-id=26446-4644";
const CMS_URL =
  "https://sgq.pas.app.br/cms/prizm_design_system/articles?articleId=925e1f7e-c80c-487a-8974-ffa269effbe6&version=v1";

const meta: Meta<typeof Card> = {
  title: "Primários/Card",
  component: Card,
  tags: ["autodocs", "documentado"],
  parameters: {
    docs: {
      description: {
        component:
          "Caixa que agrupa conteúdo relacionado com cabeçalho, corpo e rodapé. Base: [shadcn/ui](https://ui.shadcn.com) + tokens PRIZM.\n\n" +
          "API documentada: composição (`CardHeader`, `CardTitle`, `CardDescription`, `CardAction`, `CardContent`, `CardFooter`). " +
          "As props `title`, `description`, `action` e `footer` são atalho compatível.\n\n" +
          '**Documentação base:** <a href="https://ui.shadcn.com/docs/components/card" target="_blank" rel="noopener noreferrer">Card — shadcn/ui</a>\n\n' +
          `[Componente no Figma](${FIGMA_URL}) · [Documentação no Figma](${FIGMA_DOC_URL}) · [Artigo no CMS](${CMS_URL}).`,
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
