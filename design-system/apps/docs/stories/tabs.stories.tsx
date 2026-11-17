import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@grupoitss/prizm-ui/tabs";

const painel = (texto: string) => <div className="p-8 text-sm text-muted-foreground">{texto}</div>;

const itens = [
  { value: "accounts", label: "Contas", content: painel("Conteúdo Contas") },
  { value: "solutions", label: "Soluções", content: painel("Conteúdo Soluções") },
  { value: "contracts", label: "Contratos", content: painel("Conteúdo Contratos") },
];

/**
 * Tabs: alterna entre painéis de conteúdo da mesma tela, um visível por vez.
 * `underline` (padrão) é o visual do Cockpit; `pills` é a troca compacta.
 */
// Rastreabilidade: o component set no [PRIZM] Componentes, o frame de documentação e o artigo no CMS.
const FIGMA_COMPONENTE = "https://www.figma.com/design/7NPb3iuxjitMdpudp4yHTl?node-id=183-532";
const FIGMA_DOC = "https://www.figma.com/design/7NPb3iuxjitMdpudp4yHTl?node-id=27297-2375";
const ARTIGO = "https://sgq.pas.app.br/cms/prizm_design_system/articles?articleId=18c635ba-85dc-4017-bb46-dc86d9e949fd&version=v1";

const meta: Meta<typeof Tabs> = {
  title: "Primários/Tabs",
  component: Tabs,
  tags: ["autodocs", "documentado"],
  parameters: {
    docs: {
      description: {
        component:
          "Tabs do design system PRIZM. Alterna entre painéis de conteúdo da mesma tela, um visível por vez. `underline` (padrão) é o visual do Cockpit; `pills` é a troca compacta.\n\n" +
          "Teclado: Tab entra na aba ativa, setas e Home/End trocam de aba, Tab de novo vai para o painel.\n\n" +
          `[Componente no Figma](${FIGMA_COMPONENTE}) · [Documentação no Figma](${FIGMA_DOC}) · [Artigo no CMS](${ARTIGO})`,
      },
    },
  },
  args: {
    variant: "underline",
    fullWidth: false,
    activationMode: "automatic",
  },
  argTypes: {
    variant: { control: "inline-radio", options: ["underline", "pills"] },
    fullWidth: { control: "boolean" },
    activationMode: { control: "inline-radio", options: ["automatic", "manual"] },
    items: { control: false },
    children: { control: false },
  },
};

export default meta;

type Story = StoryObj<typeof Tabs>;

/** Ligada aos controles: troque variant, fullWidth e activationMode. */
export const Playground: Story = {
  render: (args) => (
    <div className="w-full max-w-3xl overflow-hidden rounded-lg border border-border bg-background">
      <Tabs {...args} items={itens} listClassName="px-4" />
    </div>
  ),
};

export const CockpitUnderline: Story = {
  name: "Cockpit (underline)",
  render: () => (
    <div className="w-full max-w-3xl overflow-hidden rounded-lg border border-border bg-background">
      <Tabs variant="underline" items={itens} listClassName="px-4" />
    </div>
  ),
};

/** Troca compacta, dentro de card, painel ou diálogo. Lista de 36px. */
export const Pills: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <Tabs variant="pills" items={itens.slice(0, 2)} />
    </div>
  ),
};

/** `badge` vira um Badge número depois do rótulo e entra no nome da aba ("Pendentes 3"). */
export const ComBadge: Story = {
  name: "Com badge",
  render: () => (
    <div className="w-full max-w-3xl overflow-hidden rounded-lg border border-border bg-background">
      <Tabs
        listClassName="px-4"
        items={[
          { value: "all", label: "Todos", content: painel("Todos os registros") },
          { value: "pending", label: "Pendentes", badge: 3, content: painel("Registros pendentes") },
          { value: "done", label: "Concluídos", content: painel("Registros concluídos") },
        ]}
      />
    </div>
  ),
};

/** A aba desabilitada não recebe foco nem clique; `tooltip` explica o motivo. */
export const Desabilitada: Story = {
  render: () => (
    <div className="w-full max-w-3xl overflow-hidden rounded-lg border border-border bg-background">
      <Tabs
        listClassName="px-4"
        items={[
          ...itens.slice(0, 2),
          {
            value: "contracts",
            label: "Contratos",
            disabled: true,
            tooltip: "Disponível depois de cadastrar uma conta",
            content: painel("Conteúdo Contratos"),
          },
        ]}
      />
    </div>
  ),
};

/** Composição com TabsList, TabsTrigger e TabsContent, como no shadcn. */
export const Composicao: Story = {
  name: "Composição",
  render: () => (
    <div className="w-full max-w-3xl overflow-hidden rounded-lg border border-border bg-background">
      <Tabs defaultValue="details">
        <TabsList containerClassName="px-4">
          <TabsTrigger value="details">Detalhes</TabsTrigger>
          <TabsTrigger value="history" badge={12}>
            Histórico
          </TabsTrigger>
        </TabsList>
        <TabsContent value="details">{painel("Detalhes do registro")}</TabsContent>
        <TabsContent value="history">{painel("Histórico do registro")}</TabsContent>
      </Tabs>
    </div>
  ),
};
