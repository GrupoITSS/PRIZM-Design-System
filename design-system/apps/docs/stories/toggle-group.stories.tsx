import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bold, Italic, LayoutGrid, List, Underline } from "@grupoitss/prizm-ui/icons";
import { ToggleGroup, ToggleGroupItem } from "@grupoitss/prizm-ui/toggle-group";
import type { ToggleGroupItemOption } from "@grupoitss/prizm-ui/toggle-group";

// Traceability: the set in [PRIZM] Componentes, the documentation frame and the article.
const FIGMA_URL = "https://www.figma.com/design/7NPb3iuxjitMdpudp4yHTl?node-id=18707-214048";
const FIGMA_DOC_URL = "https://www.figma.com/design/7NPb3iuxjitMdpudp4yHTl?node-id=28044-2324";
const CMS_URL =
  "https://sgq.pas.app.br/cms/prizm_design_system/articles?articleId=d738f96b-1587-416a-9c51-8b69e82e34e9&version=v1";

const meta: Meta<typeof ToggleGroup> = {
  title: "Primários/ToggleGroup",
  component: ToggleGroup,
  tags: ["autodocs", "documentado"],
  parameters: {
    docs: {
      description: {
        component:
          "Botões que ligam e desligam, colados numa faixa. Cada item é o Toggle do Prizm.\n\n" +
          '- `type="single"` (padrão): o item ligado é a opção escolhida, como num filtro. Use `required` para que o grupo nunca fique sem valor.\n' +
          '- `type="multiple"`: cada item liga e desliga sozinho, como numa barra de formatação.\n' +
          '- O grupo precisa de nome: `aria-label` ou `aria-labelledby`. Item só de ícone leva `"aria-label"`; com texto visível, não.\n' +
          "- Para trocar painéis, use Tabs; para ações, ButtonGroup.\n\n" +
          '**Base:** <a href="https://ui.shadcn.com/docs/components/toggle-group" target="_blank" rel="noopener noreferrer">Toggle Group — shadcn/ui</a>\n\n' +
          `[Componente no Figma](${FIGMA_URL}) · [Documentação no Figma](${FIGMA_DOC_URL}) · [Artigo no CMS](${CMS_URL}).`,
      },
    },
  },
  args: {
    "aria-label": "Status",
    type: "single",
    variant: "outline",
    size: "default",
    spacing: 0,
    orientation: "horizontal",
    required: true,
    fullWidth: false,
  },
  argTypes: {
    type: { control: "inline-radio", options: ["single", "multiple"] },
    variant: { control: "inline-radio", options: ["outline", "default"] },
    size: { control: "inline-radio", options: ["sm", "default", "lg"] },
    spacing: { control: "select", options: [0, 1, 2, 3, 4, 5, 6, 8] },
    orientation: { control: "inline-radio", options: ["horizontal", "vertical"] },
    required: { control: "boolean" },
    fullWidth: { control: "boolean" },
    "aria-label": { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof ToggleGroup>;

const status: ToggleGroupItemOption[] = [
  { value: "todos", label: "Todos" },
  { value: "ativos", label: "Ativos" },
  { value: "inativos", label: "Inativos" },
];

const formatacao: ToggleGroupItemOption[] = [
  { value: "negrito", icon: <Bold />, "aria-label": "Negrito" },
  { value: "italico", icon: <Italic />, "aria-label": "Itálico" },
  { value: "sublinhado", icon: <Underline />, "aria-label": "Sublinhado" },
];

/** Filtro de uma lista: escolha única, e `required` impede que fique sem filtro. */
export const Filtro: Story = {
  render: (args) => <ToggleGroup {...args} defaultValue="todos" items={status} />,
};

/** Barra de formatação: vários itens ligados, só de ícone, cada um com `aria-label`. */
export const Formatacao: Story = {
  name: "Formatação",
  render: (args) => (
    <ToggleGroup
      {...args}
      aria-label="Formatação do texto"
      type="multiple"
      required={false}
      defaultValue={["negrito"]}
      items={formatacao}
    />
  ),
};

/** Ícone e texto no mesmo item: o nome vem do texto, sem `aria-label`. */
export const IconeETexto: Story = {
  name: "Ícone e texto",
  render: (args) => (
    <ToggleGroup
      {...args}
      aria-label="Visualização"
      defaultValue="lista"
      items={[
        { value: "lista", label: "Lista", icon: <List /> },
        { value: "grade", label: "Grade", icon: <LayoutGrid /> },
      ]}
    />
  ),
};

/** `fullWidth`: o grupo ocupa a largura, e os itens dividem o espaço. */
export const LarguraTotal: Story = {
  name: "Largura total",
  render: (args) => (
    <div className="w-96">
      <ToggleGroup {...args} fullWidth defaultValue="todos" items={status} />
    </div>
  ),
};

/** Altura em `control-height`, como o Button. */
export const Tamanhos: Story = {
  render: (args) => (
    <div className="flex flex-col items-start gap-4">
      <ToggleGroup {...args} size="sm" defaultValue="todos" items={status} />
      <ToggleGroup {...args} size="default" defaultValue="todos" items={status} />
      <ToggleGroup {...args} size="lg" defaultValue="todos" items={status} />
    </div>
  ),
};

/** Com `spacing` maior que 0, os itens se separam; na vertical, empilham. */
export const SeparadosEVertical: Story = {
  name: "Separados e vertical",
  render: (args) => (
    <div className="flex items-start gap-8">
      <ToggleGroup {...args} spacing={2} defaultValue="todos" items={status} />
      <ToggleGroup {...args} orientation="vertical" defaultValue="todos" items={status} />
    </div>
  ),
};

export const ItemDesabilitado: Story = {
  name: "Item desabilitado",
  render: (args) => (
    <ToggleGroup
      {...args}
      defaultValue="todos"
      items={[...status.slice(0, 2), { value: "inativos", label: "Inativos", disabled: true }]}
    />
  ),
};

/** Composição com `ToggleGroupItem`, para o que `items` não cobre. */
export const Composicao: Story = {
  name: "Composição",
  render: (args) => (
    <ToggleGroup {...args} aria-label="Período" defaultValue="semana">
      <ToggleGroupItem value="dia">Dia</ToggleGroupItem>
      <ToggleGroupItem value="semana">Semana</ToggleGroupItem>
      <ToggleGroupItem value="mes">Mês</ToggleGroupItem>
    </ToggleGroup>
  ),
};
