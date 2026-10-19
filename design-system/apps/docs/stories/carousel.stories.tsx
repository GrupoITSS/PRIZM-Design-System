import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "@grupoitss/prizm-ui/card";
import { Carousel } from "@grupoitss/prizm-ui/carousel";

const meta: Meta<typeof Carousel> = {
  title: "Primários/Carousel",
  component: Carousel,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "API preferencial **por props** (sem subcomponentes). Base: [shadcn/ui](https://ui.shadcn.com) + Radix, com tokens PRIZM.\n\n" +
          "Carousel do design system PRIZM, baseado em `embla-carousel-react`.\n\n" +
          "**API por props (recomendada):** use sempre `items` com a lista de slides. Não use subcomponentes (`CarouselContent`, `CarouselItem`, `CarouselPrevious`, `CarouselNext`) nas stories nem no uso comum — eles existem apenas como escape hatch.\n\n" +
          "Exemplo: `<Carousel items={[{ content: 'Slide 1' }, { content: 'Slide 2' }]} showControls showIndicators />`\n\n" +
          '**Documentação:** <a href="https://ui.shadcn.com/docs/components/carousel" target="_blank" rel="noopener noreferrer">Carousel — shadcn/ui</a>',
      },
    },
  },
  args: {
    orientation: "horizontal",
    showControls: true,
    showIndicators: false,
  },
  argTypes: {
    orientation: { control: "select", options: ["horizontal", "vertical"] },
    showControls: { control: "boolean" },
    showIndicators: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof Carousel>;

/** Helper: slide como caixa estilizada (reutilizado em várias stories). */
const slideBox = (label: string, extraClass?: string) => (
  <div
    className={
      "flex h-32 items-center justify-center rounded-lg border bg-muted text-foreground " +
      (extraClass ?? "")
    }
  >
    {label}
  </div>
);

/** Helper: slide com aspecto de imagem (placeholder). */
const slideImage = (label: string, color: string) => (
  <div
    className="flex h-48 w-full items-center justify-center rounded-lg text-white"
    style={{ backgroundColor: color }}
  >
    {label}
  </div>
);

/** Helper: slide no formato card (título + descrição). */
const slideCard = (title: string, description: string) => (
  <div className="rounded-lg border bg-card p-4 text-card-foreground">
    <h3 className="font-semibold">{title}</h3>
    <p className="mt-1 text-sm text-muted-foreground">{description}</p>
  </div>
);

// ─── 1. Grupo (equivalente “Group” do doc) ─────────────────────────────────
/** Uso básico: lista de slides apenas por props (como um “grupo” de itens). */
export const Basic: Story = {
  render: () => (
    <div className="mx-auto w-full max-w-xs">
      <Carousel
        items={Array.from({ length: 5 }, (_, i) => ({
          id: i,
          content: slideBox(`Slide ${i + 1}`),
        }))}
      />
    </div>
  ),
};

/** Múltiplos slides com largura fracionária (basis) por item. */
export const Sizes: Story = {
  render: () => (
    <div className="mx-auto w-full max-w-2xl">
      <Carousel
        items={[
          { id: 1, className: "basis-1/3", content: slideBox("1/3") },
          { id: 2, className: "basis-1/3", content: slideBox("1/3") },
          { id: 3, className: "basis-1/3", content: slideBox("1/3") },
        ]}
      />
    </div>
  ),
};

/** Espaçamento entre slides via `contentClassName` e `itemClassName`. */
export const Spacing: Story = {
  render: () => (
    <div className="mx-auto w-full max-w-2xl">
      <Carousel
        contentClassName="-ml-4"
        itemClassName="pl-4"
        items={Array.from({ length: 3 }, (_, i) => ({
          id: i,
          content: slideBox(`Slide ${i + 1}`),
        }))}
      />
    </div>
  ),
};

// ─── 2. Controles (equivalente “Button” — foco nos controles) ─────────────────
/** Orientação vertical. */
export const VerticalOrientation: Story = {
  render: () => (
    <div className="mx-auto h-80 w-full max-w-xs">
      <Carousel
        orientation="vertical"
        items={Array.from({ length: 3 }, (_, i) => ({
          id: i,
          content: slideBox(`Vertical ${i + 1}`),
        }))}
      />
    </div>
  ),
};

/** Sem botões anterior/próximo (`showControls: false`). */
export const WithoutControls: Story = {
  render: () => (
    <div className="mx-auto w-full max-w-xs">
      <Carousel
        showControls={false}
        items={Array.from({ length: 3 }, (_, i) => ({
          id: i,
          content: slideBox(`Slide ${i + 1}`),
        }))}
      />
    </div>
  ),
};

/** Com indicadores (dots) e loop via `opts`. */
export const WithIndicatorsAndLoop: Story = {
  render: () => (
    <div className="mx-auto w-full max-w-2xl">
      <Carousel
        showIndicators
        opts={{ align: "start", loop: true }}
        items={Array.from({ length: 5 }, (_, i) => ({
          id: i,
          content: slideBox(`Loop ${i + 1}`),
        }))}
      />
    </div>
  ),
};

/** Acesso à API do Embla via `setApi` (ex.: slide atual / total). */
export const WithApi: Story = {
  render: function Render() {
    const [current, setCurrent] = React.useState(0);
    const [count, setCount] = React.useState(0);

    return (
      <div className="space-y-4">
        <div className="mx-auto w-full max-w-xs">
          <Carousel
            setApi={(api) => {
              if (!api) return;
              const update = () => {
                setCurrent(api.selectedScrollSnap() + 1);
                setCount(api.scrollSnapList().length);
              };
              api.on("select", update);
              update();
            }}
            items={Array.from({ length: 3 }, (_, i) => ({
              id: i,
              content: slideBox(`API slide ${i + 1}`),
            }))}
          />
        </div>
        <div className="flex justify-center gap-4">
          <span className="text-sm text-muted-foreground">
            Slide {current || 1} de {count || 3}
          </span>
        </div>
      </div>
    );
  },
};

// ─── 3. Em contexto (equivalente “Tooltip” — carousel dentro de outro UI) ───
/** Carousel dentro de um Card (contexto de conteúdo). */
export const InCard: Story = {
  render: () => (
    <div className="mx-auto w-full max-w-md">
      <Card title="Galeria" description="Navegue pelos itens">
        <Carousel
          showControls
          showIndicators
          className="rounded-b-lg"
          items={Array.from({ length: 3 }, (_, i) => ({
            id: i,
            content: slideBox(`Item ${i + 1}`),
          }))}
        />
      </Card>
    </div>
  ),
};

// ─── 4. Com “addons” (equivalente “Input Group” — título/caption/rodapé) ───
/** Carousel com título acima e legenda/rodapé (addons). */
export const WithHeaderAndFooter: Story = {
  render: () => (
    <div className="mx-auto w-full max-w-lg space-y-2">
      <h3 className="text-sm font-medium text-foreground">Destaques</h3>
      <Carousel
        showControls
        showIndicators
        items={Array.from({ length: 4 }, (_, i) => ({
          id: i,
          content: slideBox(`Destaque ${i + 1}`),
        }))}
      />
      <p className="text-xs text-muted-foreground">Use as setas ou os indicadores para navegar.</p>
    </div>
  ),
};

/** Carousel com legenda abaixo do slide atual (via setApi). */
export const WithCaption: Story = {
  render: function Render() {
    const [index, setIndex] = React.useState(0);
    const labels = ["Primeiro slide", "Segundo slide", "Terceiro slide"];

    return (
      <div className="mx-auto w-full max-w-xs space-y-2">
        <Carousel
          setApi={(api) => {
            if (!api) return;
            const update = () => setIndex(api.selectedScrollSnap());
            api.on("select", update);
            update();
          }}
          items={Array.from({ length: 3 }, (_, i) => ({
            id: i,
            content: slideBox(`Slide ${i + 1}`),
          }))}
        />
        <p className="text-center text-sm text-muted-foreground">{labels[index]}</p>
      </div>
    );
  },
};

// ─── Mais casos ─────────────────────────────────────────────────────────────
/** Estilo hero: um slide por vez, maior. */
export const Hero: Story = {
  render: () => (
    <div className="mx-auto w-full max-w-2xl">
      <Carousel
        showIndicators
        opts={{ align: "center", loop: true }}
        items={[
          { id: 1, content: slideBox("Hero 1", "h-48") },
          { id: 2, content: slideBox("Hero 2", "h-48") },
          { id: 3, content: slideBox("Hero 3", "h-48") },
        ]}
      />
    </div>
  ),
};

/** Slides no formato de card (título + descrição). */
export const Cards: Story = {
  render: () => (
    <div className="mx-auto w-full max-w-md">
      <Carousel
        items={[
          {
            id: 1,
            content: slideCard("Card 1", "Descrição do primeiro card."),
          },
          {
            id: 2,
            content: slideCard("Card 2", "Descrição do segundo card."),
          },
          {
            id: 3,
            content: slideCard("Card 3", "Descrição do terceiro card."),
          },
        ]}
      />
    </div>
  ),
};

/** Slides com aspecto de imagem (placeholders coloridos). */
export const Images: Story = {
  render: () => (
    <div className="mx-auto w-full max-w-sm">
      <Carousel
        items={[
          { id: 1, content: slideImage("Imagem 1", "var(--prizm-color-chart-1)") },
          { id: 2, content: slideImage("Imagem 2", "var(--prizm-color-chart-2)") },
          { id: 3, content: slideImage("Imagem 3", "var(--prizm-color-chart-3)") },
        ]}
      />
    </div>
  ),
};

/** Muitos slides (scroll longo). */
export const ManySlides: Story = {
  render: () => (
    <div className="mx-auto w-full max-w-2xl">
      <Carousel
        opts={{ align: "start", containScroll: "trimSnaps" }}
        items={Array.from({ length: 12 }, (_, i) => ({
          id: i,
          className: "basis-1/3",
          content: slideBox(`${i + 1}`),
        }))}
      />
    </div>
  ),
};

/** Um único slide (edge case). */
export const SingleSlide: Story = {
  render: () => (
    <div className="mx-auto w-full max-w-xs">
      <Carousel showControls={false} items={[{ id: 1, content: slideBox("Único slide") }]} />
    </div>
  ),
};

/** Alinhamento “start” com loop. */
export const AlignStart: Story = {
  render: () => (
    <div className="mx-auto w-full max-w-2xl">
      <Carousel
        opts={{ align: "start", loop: true }}
        items={Array.from({ length: 5 }, (_, i) => ({
          id: i,
          content: slideBox(`Start ${i + 1}`),
        }))}
      />
    </div>
  ),
};

/** Customização de classes por item e no content. */
export const CustomItemAndContentClass: Story = {
  render: () => (
    <div className="mx-auto w-full max-w-md">
      <Carousel
        contentClassName="-ml-2"
        itemClassName="pl-2"
        items={[
          {
            id: 1,
            className: "basis-2/3",
            content: slideBox("Maior"),
          },
          {
            id: 2,
            className: "basis-1/3",
            content: slideBox("Menor"),
          },
        ]}
      />
    </div>
  ),
};
