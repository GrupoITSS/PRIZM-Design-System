import { Button } from "@grupoitss/prizm-ui/button";
import { Kbd } from "@grupoitss/prizm-ui/kbd";
import { Save } from "@grupoitss/prizm-ui/icons";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tooltip } from "@grupoitss/prizm-ui/tooltip";

const meta: Meta<typeof Tooltip> = {
  title: "Primários/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "API preferencial **por props** (sem subcomponentes). Base: [shadcn/ui](https://ui.shadcn.com) + Radix, com tokens PRIZM.\n\n" +
          'Tooltip do design system PRIZM. **API por props:** use `content` (obrigatório) e `children` (trigger). Ex.: `<Tooltip content="Salvar"> <Button>Hover</Button> </Tooltip>`. Não é necessário `TooltipProvider` na raiz: cada `<Tooltip>` inclui seu próprio provider. Nos apps (auth, cockpit, assistant) pode-se opcionalmente envolver o root com `TooltipProvider` do Radix para delay global.\n\n**Documentação:** <a href="https://ui.shadcn.com/docs/components/tooltip" target="_blank" rel="noopener noreferrer">Tooltip — shadcn/ui (Radix)</a>',
      },
    },
  },
  args: {
    content: "Save your changes",
    children: null,
  },
  argTypes: {
    content: { control: "text" },
    side: {
      control: "select",
      options: ["top", "right", "bottom", "left"],
    },
    sideOffset: { control: "number" },
    delayDuration: { control: "number" },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

/** Uso básico: `content` + `children` (trigger). */
export const Default: Story = {
  args: {
    content: "Save your changes",
    children: <Button variant="outline">Hover me</Button>,
  },
  render: (args) => <Tooltip {...args} />,
};

/** Use a prop `side` para posicionar o tooltip (left, top, bottom, right). */
export const Sides: Story = {
  render: () => (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {(["left", "top", "bottom", "right"] as const).map((side) => (
        <Tooltip key={side} content="Add to library" side={side}>
          <Button variant="outline" className="w-fit capitalize">
            {side}
          </Button>
        </Tooltip>
      ))}
    </div>
  ),
};

/** Conteúdo com atalho de teclado usando o componente `Kbd`. */
export const WithKeyboardShortcut: Story = {
  render: () => (
    <Tooltip
      content={
        <div className="flex items-center gap-2">
          Save Changes <Kbd keys={["S"]} />
        </div>
      }
      contentClassName="pr-1.5"
    >
      <Button variant="outline" size="icon">
        <Save className="size-4" />
      </Button>
    </Tooltip>
  ),
};

/** Tooltip em botão desabilitado: envolva o botão em um `<span>` para o trigger receber eventos. */
export const DisabledButton: Story = {
  render: () => (
    <Tooltip content="This feature is currently unavailable">
      <span className="inline-block w-fit">
        <Button variant="outline" disabled>
          Disabled
        </Button>
      </span>
    </Tooltip>
  ),
};

/** Conteúdo rico (ex.: atalho com múltiplas teclas). */
export const WithRichContent: Story = {
  args: {
    content: (
      <span>
        <strong>Keyboard shortcut:</strong> <Kbd keys={["Ctrl", "S"]} />
      </span>
    ),
    children: <Button>Save</Button>,
  },
  render: (args) => <Tooltip {...args} />,
};

/** Delay maior antes de mostrar (útil para evitar tooltips ao passar rápido). */
export const SlowDelay: Story = {
  args: {
    content: "Appears after 800ms",
    delayDuration: 800,
    children: <Button variant="ghost">Slow tooltip</Button>,
  },
  render: (args) => <Tooltip {...args} />,
};
