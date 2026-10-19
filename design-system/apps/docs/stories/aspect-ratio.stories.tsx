import type { Meta, StoryObj } from "@storybook/react-vite";
import { AspectRatio } from "@grupoitss/prizm-ui/aspect-ratio";
import { ASPECT_RATIO_PRESETS } from "@grupoitss/prizm-ui/aspect-ratio";

const presetOptions = Object.keys(ASPECT_RATIO_PRESETS) as (keyof typeof ASPECT_RATIO_PRESETS)[];

const meta: Meta<typeof AspectRatio> = {
  title: "Primários/AspectRatio",
  component: AspectRatio,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "API preferencial **por props** (sem subcomponentes). Base: [shadcn/ui](https://ui.shadcn.com) + Radix, com tokens PRIZM.\n\n" +
          'AspectRatio do design system PRIZM. Mantém a proporção do conteúdo (ex.: vídeos, imagens). Use a prop `ratioPreset` (ex.: "16:9", "1:1") ou `ratio` (número). Baseado em shadcn/ui + Radix.\n\n**Documentação:** <a href="https://ui.shadcn.com/docs/components/aspect-ratio" target="_blank" rel="noopener noreferrer">Aspect Ratio — shadcn/ui</a>',
      },
    },
  },
  argTypes: {
    ratioPreset: {
      control: "select",
      options: presetOptions,
      description: "Proporção por nome pré-definido.",
    },
    ratio: {
      control: "number",
      description: "Proporção numérica (usado quando ratioPreset não está definido).",
    },
  },
};

export default meta;

type Story = StoryObj<typeof AspectRatio>;

export const Default: Story = {
  args: { ratioPreset: "16:9" },
  render: (args) => (
    <AspectRatio {...args} className="max-w-md">
      <img
        src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2"
        alt="Placeholder"
        className="size-full object-cover"
      />
    </AspectRatio>
  ),
};

export const Square: Story = {
  args: { ratioPreset: "1:1" },
  render: (args) => (
    <AspectRatio {...args} className="max-w-50">
      <div className="flex size-full items-center justify-center rounded-md bg-muted text-muted-foreground">
        1:1
      </div>
    </AspectRatio>
  ),
};

export const Video: Story = {
  args: { ratioPreset: "16:9" },
  render: (args) => (
    <AspectRatio {...args} className="max-w-lg">
      <iframe
        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
        title="YouTube"
        allowFullScreen
        className="absolute left-0 top-0 size-full rounded-md border-0"
      />
    </AspectRatio>
  ),
};
