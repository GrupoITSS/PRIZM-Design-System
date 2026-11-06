import { Button } from "@grupoitss/prizm-ui/button";
import { Kbd } from "@grupoitss/prizm-ui/kbd";
import { Bold, Italic, Save, Underline } from "@grupoitss/prizm-ui/icons";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tooltip, TooltipProvider } from "@grupoitss/prizm-ui/tooltip";

const meta: Meta<typeof Tooltip> = {
  title: "Primários/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "API preferencial **por props** (sem subcomponentes). Base: [shadcn/ui](https://ui.shadcn.com) + Radix, com tokens PRIZM.\n\n" +
          'Tooltip do design system PRIZM. **API por props:** use `content` (obrigatório) e `children` (trigger). Ex.: `<Tooltip content="Salvar"> <Button>Hover</Button> </Tooltip>`. Balão escuro em `color/tooltip`, com seta, `text-xs` e largura máxima `max-w-sm`. Sem `TooltipProvider`, cada `<Tooltip>` cria o próprio provider. Com `TooltipProvider` em volta de uma região (uma barra, o app), os Tooltips de dentro usam ele, e o atraso curto entre vizinhos funciona.\n\n**Documentação:** <a href="https://ui.shadcn.com/docs/components/tooltip" target="_blank" rel="noopener noreferrer">Tooltip — shadcn/ui (Radix)</a>',
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
      <Button variant="outline" size="icon" aria-label="Save">
        <Save className="size-4" />
      </Button>
    </Tooltip>
  ),
};

/**
 * Botão desabilitado: não use tooltip. Com `disabled`, o botão sai do Tab e quem usa teclado (ou o
 * celular) nunca vê a dica. Mostre o motivo em texto visível.
 */
export const DisabledReason: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Não use tooltip em botão desabilitado: o botão sai do Tab e a dica não chega a quem usa teclado ou o celular. O motivo vai em texto visível, ao lado ou abaixo.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col items-start gap-1">
      <Button variant="outline" disabled>
        Export
      </Button>
      <p className="text-xs text-muted-foreground">Available on the Pro plan.</p>
    </div>
  ),
};

/**
 * Barra de ferramentas com `TooltipProvider`: ao passar de um botão para o vizinho, o segundo tooltip
 * abre sem esperar.
 */
export const Toolbar: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Com `TooltipProvider` em volta, o primeiro tooltip espera 200ms e os vizinhos abrem na hora por 300ms (`skipDelayDuration`). O tooltip é a descrição; o nome do botão vem do `aria-label`.",
      },
    },
  },
  render: () => (
    <TooltipProvider>
      <div className="flex gap-1">
        <Tooltip content="Bold">
          <Button variant="ghost" size="icon" aria-label="Bold">
            <Bold />
          </Button>
        </Tooltip>
        <Tooltip content="Italic">
          <Button variant="ghost" size="icon" aria-label="Italic">
            <Italic />
          </Button>
        </Tooltip>
        <Tooltip content="Underline">
          <Button variant="ghost" size="icon" aria-label="Underline">
            <Underline />
          </Button>
        </Tooltip>
      </div>
    </TooltipProvider>
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
