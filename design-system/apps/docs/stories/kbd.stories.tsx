import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@grupoitss/prizm-ui/button";
import { Kbd } from "@grupoitss/prizm-ui/kbd";

// Traceability: the component sets in [PRIZM] Componentes (Kbd and KbdGroup), the
// documentation frame and the CMS article. The token map lives next to the component
// (kbd.tokens.json) and is checked against the classes in a test.
const FIGMA_URL = "https://www.figma.com/design/7NPb3iuxjitMdpudp4yHTl?node-id=18665-781";
const FIGMA_DOC_URL = "https://www.figma.com/design/7NPb3iuxjitMdpudp4yHTl?node-id=25330-67936";
const CMS_URL =
  "https://sgq.pas.app.br/cms/prizm_design_system/articles?articleId=4557c87f-6dda-4207-8d61-38b2f935a03b&version=v1";

const meta: Meta<typeof Kbd> = {
  title: "Primários/Kbd",
  component: Kbd,
  tags: ["autodocs", "documentado"],
  parameters: {
    docs: {
      description: {
        component:
          "API preferencial **por props** (sem subcomponentes). Base: [shadcn/ui](https://ui.shadcn.com) + Radix, com tokens PRIZM.\n\n" +
          'Kbd do design system PRIZM. Exibe atalhos de teclado estilizados.\n\n**API por props:**\n- Uma tecla: `<Kbd>⌘</Kbd>`\n- Várias teclas: `<Kbd keys={["⌘", "K"]} />` (o KbdGroup do Figma)\n- Teclas pressionadas juntas: `<Kbd keys={["Ctrl", "Alt", "B"]} separator="+" />`\n\nDentro de um Button cheio (`default`, `destructive`) a tecla usa a cor do texto do botão; em botão neutro mantém `muted` (Contexto no Figma).\n\n**Documentação base:** <a href="https://ui.shadcn.com/docs/components/kbd" target="_blank" rel="noopener noreferrer">Kbd — shadcn/ui</a>\n\n' +
          `[Componente no Figma](${FIGMA_URL}) · [Documentação no Figma](${FIGMA_DOC_URL}) · [Artigo no CMS](${CMS_URL}).`,
      },
    },
  },
  argTypes: {
    children: {
      control: "text",
      description: "Conteúdo da tecla (uso single key).",
    },
    keys: {
      control: "object",
      description: "Lista de teclas para exibir em sequência.",
    },
    separator: {
      control: "text",
      description: 'Texto entre as teclas, só com keys (ex.: "+").',
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

export const Separator: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
      <Kbd keys={["Ctrl", "Alt", "B"]} separator="+" />
      <Kbd keys={["Ctrl", "Shift", "P"]} separator="+" />
    </div>
  ),
};

export const InsideButton: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="secondary">
        Buscar
        <Kbd keys={["⌘", "K"]} />
      </Button>
      <Button variant="outline">
        Filtrar
        <Kbd keys={["⌘", "K"]} />
      </Button>
      <Button variant="ghost">
        Abrir
        <Kbd keys={["⌘", "K"]} />
      </Button>
      <Button>
        Salvar
        <Kbd keys={["⌘", "S"]} />
      </Button>
      <Button variant="destructive">
        Excluir
        <Kbd keys={["⌘", "⌫"]} />
      </Button>
    </div>
  ),
};

export const WithClassName: Story = {
  render: () => (
    <p className="text-sm">
      <Kbd className="ml-1" keys={["Ctrl", "Alt", "Del"]} />
    </p>
  ),
};
