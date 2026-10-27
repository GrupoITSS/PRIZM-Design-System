import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card, CardContent, CardHeader } from "@grupoitss/prizm-ui/card";
import { Skeleton } from "@grupoitss/prizm-ui/skeleton";

// Traceability: the component set in [PRIZM] Componentes, the documentation frame and the
// CMS article. The token map lives next to the component (skeleton.tokens.json) and is
// checked against the classes in a test.
const FIGMA_URL = "https://www.figma.com/design/7NPb3iuxjitMdpudp4yHTl?node-id=295-462";
const FIGMA_DOC_URL = "https://www.figma.com/design/7NPb3iuxjitMdpudp4yHTl?node-id=25516-1970";
const CMS_URL =
  "https://sgq.pas.app.br/cms/prizm_design_system/articles?articleId=37cc09a5-9d4e-469d-93d6-8b83799ce15b&version=v1";

const meta: Meta<typeof Skeleton> = {
  title: "Primários/Skeleton",
  component: Skeleton,
  tags: ["autodocs", "documentado"],
  argTypes: {
    shape: { control: "select", options: ["rect", "pill", "circle"] },
    className: { control: "text" },
  },
  args: {
    shape: "rect",
    className: "h-4 w-32",
  },
  parameters: {
    docs: {
      description: {
        component:
          "API preferencial **por props** (sem subcomponentes). Base: [shadcn/ui](https://ui.shadcn.com) + Radix, com tokens PRIZM.\n\n" +
          "Reserva o lugar do conteúdo enquanto ele carrega: um bloco em `color/muted` que pulsa (2 ciclos e para), na forma do que vai aparecer.\n\n" +
          "A forma vem de `shape` (`rect`, `pill`, `circle`), os mesmos nomes do Figma. O tamanho vem do `className` (`h-*`, `w-*`, `size-*`); `circle` só precisa de um tamanho. " +
          'Quem anuncia o carregamento é o contêiner (`role="status"`, `aria-busy` e texto `sr-only`); o Skeleton fica com `aria-hidden`.\n\n' +
          `[Componente no Figma](${FIGMA_URL}) · [Documentação no Figma](${FIGMA_DOC_URL}) · [Artigo no CMS](${CMS_URL}).`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Playground: Story = {};

export const Shapes: Story = {
  name: "Formas",
  render: () => (
    <div className="flex items-center gap-8">
      <Skeleton className="h-4 w-32" />
      <Skeleton shape="pill" className="h-8 w-24" />
      <Skeleton shape="circle" className="size-10" />
    </div>
  ),
};

export const Loading: Story = {
  name: "Com anúncio",
  render: () => (
    <div role="status" aria-busy="true" className="flex w-full max-w-xs flex-col gap-2">
      <Skeleton aria-hidden className="h-4 w-full" />
      <Skeleton aria-hidden className="h-4 w-3/4" />
      <span className="sr-only">Carregando</span>
    </div>
  ),
};

export const Demo: Story = {
  render: () => (
    <div className="space-y-8">
      {/* Avatar + text (hero) */}
      <div className="flex items-center gap-4">
        <Skeleton shape="circle" className="size-12" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>

      {/* Text block */}
      <div className="flex w-full max-w-md flex-col gap-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>

      {/* Card + table preview */}
      <Card className="w-full max-w-xl">
        <CardHeader className="space-y-2">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-4 w-1/4" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="aspect-video w-full" />
          <div className="flex w-full flex-col gap-2">
            {Array.from({ length: 3 }).map((_, index) => (
              // eslint-disable-next-line @eslint-react/no-array-index-key -- static placeholder list
              <div className="flex gap-4" key={index}>
                <Skeleton className="h-4 flex-1" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  ),
};

export const Avatar: Story = {
  render: () => (
    <div className="flex w-fit items-center gap-4">
      <Skeleton shape="circle" className="size-10 shrink-0" />
      <div className="grid gap-2">
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-4 w-[100px]" />
      </div>
    </div>
  ),
};

export const CardExample: Story = {
  name: "Card",
  render: () => (
    <Card className="w-full max-w-xs">
      <CardHeader>
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      <CardContent>
        <Skeleton className="aspect-video w-full" />
      </CardContent>
    </Card>
  ),
};

export const Text: Story = {
  render: () => (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  ),
};

export const Form: Story = {
  render: () => (
    <div className="flex w-full max-w-xs flex-col gap-7">
      <div className="flex flex-col gap-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-8 w-full" />
      </div>
      <div className="flex flex-col gap-3">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-full" />
      </div>
      <Skeleton className="h-8 w-24" />
    </div>
  ),
};

export const Table: Story = {
  render: () => (
    <div className="flex w-full max-w-sm flex-col gap-2">
      {Array.from({ length: 5 }).map((_, index) => (
        // eslint-disable-next-line @eslint-react/no-array-index-key -- static placeholder list
        <div className="flex gap-4" key={index}>
          <Skeleton className="h-4 flex-1" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
        </div>
      ))}
    </div>
  ),
};
