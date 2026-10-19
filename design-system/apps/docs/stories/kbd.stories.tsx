import type { Meta, StoryObj } from "@storybook/react-vite";
import { Kbd } from "@grupoitss/prizm-ui/kbd";

const meta: Meta<typeof Kbd> = {
  title: "Primários/Kbd",
  component: Kbd,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "API preferencial **por props** (sem subcomponentes). Base: [shadcn/ui](https://ui.shadcn.com) + Radix, com tokens PRIZM.\n\n" +
          'Kbd do design system PRIZM. Exibe atalhos de teclado estilizados.\n\n**API por props:**\n- Uma tecla: `<Kbd>⌘</Kbd>`\n- Várias teclas: `<Kbd keys={["⌘", "K"]} />`\n\n**Documentação base:** <a href="https://ui.shadcn.com/docs/components/kbd" target="_blank" rel="noopener noreferrer">Kbd — shadcn/ui</a>',
      },
    },
  },
  argTypes: {
    children: {
      control: "text",
      description: "Conteúdo da tecla (uso single key).",
    },
    keys: {
      description: "Lista de teclas para exibir em sequência.",
    },
  },
  args: {
    children: "⌘",
  },
};

export default meta;

type Story = StoryObj<typeof Kbd>;

export const Default: Story = {
  render: (args) => <Kbd {...args} />,
};

export const SingleKey: Story = {
  render: () => (
    <p className="text-sm text-muted-foreground">
      Pressione <Kbd>⌘</Kbd> para abrir a busca.
    </p>
  ),
};

export const MultipleKeys: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
      <span>
        Salvar: <Kbd keys={["⌘", "S"]} />
      </span>
      <span>
        Copiar: <Kbd keys={["⌘", "C"]} />
      </span>
      <span>
        Colar: <Kbd keys={["⌘", "V"]} />
      </span>
      <span>
        Fechar: <Kbd keys={["⌘", "W"]} />
      </span>
    </div>
  ),
};

export const CommonShortcuts: Story = {
  render: () => (
    <ul className="flex flex-col gap-2 text-sm">
      <li className="flex items-center gap-2">
        <Kbd keys={["⌘", "K"]} />
        <span className="text-muted-foreground">Abrir command palette</span>
      </li>
      <li className="flex items-center gap-2">
        <Kbd keys={["⌘", "Shift", "P"]} />
        <span className="text-muted-foreground">Abrir comandos</span>
      </li>
      <li className="flex items-center gap-2">
        <Kbd>Enter</Kbd>
        <span className="text-muted-foreground">Confirmar</span>
      </li>
      <li className="flex items-center gap-2">
        <Kbd>Esc</Kbd>
        <span className="text-muted-foreground">Cancelar</span>
      </li>
    </ul>
  ),
};

export const WithClassName: Story = {
  render: () => (
    <p className="text-sm">
      <Kbd className="ml-1" keys={["Ctrl", "Alt", "Del"]} />
    </p>
  ),
};
