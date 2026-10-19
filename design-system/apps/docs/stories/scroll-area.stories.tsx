import { Separator } from "@grupoitss/prizm-ui/separator";
import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { ScrollArea } from "@grupoitss/prizm-ui/scroll-area";

const meta: Meta<typeof ScrollArea> = {
  title: "Primários/ScrollArea",
  component: ScrollArea,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "API preferencial **por props** (sem subcomponentes). Base: [shadcn/ui](https://ui.shadcn.com) + Radix, com tokens PRIZM.\n\n" +
          'ScrollArea do design system PRIZM com API **100% baseada em props** (sem subcomponentes públicos). Internamente usa Radix `ScrollArea` para acessibilidade e comportamento, mas a composição (Viewport, Scrollbar, Thumb) é totalmente encapsulada.\n\nUso recomendado (lista vertical):\n\n```tsx\n<ScrollArea className="h-72 w-48 rounded-md border">\n  <div data-slot="scroll-area-content" className="p-4">\n    {/* conteúdo rolável aqui */}\n  </div>\n</ScrollArea>\n```\n\nRolagem horizontal:\n\n```tsx\n<ScrollArea horizontal className="w-96 rounded-md border whitespace-nowrap">\n  <div\n    data-slot="scroll-area-content"\n    className="flex w-max space-x-4 p-4"\n  >\n    {/* itens horizontais */}\n  </div>\n</ScrollArea>\n```\n\n**Documentação de referência (Radix/shadcn):** <a href="https://ui.shadcn.com/docs/components/radix/scroll-area" target="_blank" rel="noopener noreferrer">ScrollArea — shadcn/ui (Radix)</a>',
      },
    },
  },
  args: {
    horizontal: false,
    hideScrollbars: false,
  },
};

export default meta;
type Story = StoryObj<typeof ScrollArea>;

const tags = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`);

export const VerticalList: Story = {
  name: "Vertical list (tags)",
  render: (args) => (
    <ScrollArea {...args} className="h-72 w-48 rounded-md border">
      <div data-slot="scroll-area-content" className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
        {tags.map((tag) => (
          <React.Fragment key={tag}>
            <div className="text-sm">{tag}</div>
            <Separator className="my-2" />
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const SimpleContent: Story = {
  name: "Simple content",
  render: (args) => (
    <ScrollArea {...args} className="h-[200px] w-[350px] rounded-md border p-4">
      <div data-slot="scroll-area-content">Your scrollable content here.</div>
    </ScrollArea>
  ),
};

export interface Artwork {
  artist: string;
  art: string;
}

const works: Artwork[] = [
  {
    artist: "Ornella Binni",
    art: "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Tom Byrom",
    art: "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Vladimir Malyavko",
    art: "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
  },
];

export const HorizontalGallery: Story = {
  name: "Horizontal gallery",
  render: (args) => (
    <ScrollArea {...args} horizontal className="w-96 rounded-md border whitespace-nowrap">
      <div data-slot="scroll-area-content" className="flex w-max space-x-4 p-4">
        {works.map((artwork) => (
          <figure key={artwork.artist} className="shrink-0">
            <div className="overflow-hidden rounded-md">
              <img
                src={artwork.art}
                alt={`Photo by ${artwork.artist}`}
                className="aspect-3/4 h-fit w-fit object-cover"
                width={300}
                height={400}
              />
            </div>
            <figcaption className="pt-2 text-xs text-muted-foreground">
              Photo by <span className="font-semibold text-foreground">{artwork.artist}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </ScrollArea>
  ),
};
