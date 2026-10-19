import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card, CardContent, CardHeader } from "@grupoitss/prizm-ui/card";
import { Skeleton } from "@grupoitss/prizm-ui/skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "Primários/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "API preferencial **por props** (sem subcomponentes). Base: [shadcn/ui](https://ui.shadcn.com) + Radix, com tokens PRIZM.\n\n" +
          "Skeleton de carregamento do design system PRIZM, baseado no componente Skeleton do shadcn/ui.\n\n" +
          "**API principal baseada em props (recomendada):** use apenas o componente `Skeleton` com `className` para tamanho/forma/layout, sem subcomponents específicos de Skeleton.\n\n" +
          'Exemplos: `<Skeleton className="h-4 w-32" />`, `<Skeleton className="size-10 rounded-full" />`.\n\n' +
          "**Documentação:** " +
          '<a href="https://ui.shadcn.com/docs/components/radix/skeleton" target="_blank" rel="noopener noreferrer">Skeleton — shadcn/ui</a>',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Demo: Story = {
  render: () => (
    <div className="space-y-8">
      {/* Avatar + text (hero) */}
      <div className="flex items-center gap-4">
        <Skeleton className="h-12 w-12 rounded-full" />
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
      <Skeleton className="size-10 shrink-0 rounded-full" />
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
