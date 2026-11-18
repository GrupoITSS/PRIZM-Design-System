import { Button } from "@grupoitss/prizm-ui/button";
import { ButtonGroup, ButtonGroupSeparator } from "@grupoitss/prizm-ui/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@grupoitss/prizm-ui/dropdown-menu";
import { ChevronDown, Minus, Plus, Search, Trash2 } from "@grupoitss/prizm-ui/icons";
import { Input } from "@grupoitss/prizm-ui/input";
import type { Meta, StoryObj } from "@storybook/react-vite";

// Traceability: the ButtonGroup set in [PRIZM] Componentes, the documentation frame and the article.
const FIGMA_URL = "https://www.figma.com/design/7NPb3iuxjitMdpudp4yHTl?node-id=18672-224279";
const FIGMA_DOC_URL = "https://www.figma.com/design/7NPb3iuxjitMdpudp4yHTl?node-id=27593-5600";
const CMS_URL =
  "https://sgq.pas.app.br/cms/prizm_design_system/articles?articleId=f168d429-d7e1-4092-b9f0-939acefe6fab&version=v1";

const meta: Meta<typeof ButtonGroup> = {
  title: "Primários/ButtonGroup",
  component: ButtonGroup,
  tags: ["autodocs", "documentado"],
  parameters: {
    docs: {
      description: {
        component:
          "Junta botões de ações relacionadas numa faixa só, com a borda compartilhada. Base: [shadcn/ui](https://ui.shadcn.com/docs/components/radix/button-group), com o Button do Prizm em cada botão.\n\n" +
          "- API recomendada **por props**: `buttons`, `orientation`, `separatorBetween`, `text` e `aria-label`. `ButtonGroupSeparator` e `ButtonGroupText` são para a composição (campo, menu).\n" +
          '- O grupo é `role="group"` e precisa de nome: `aria-label` ou `aria-labelledby`. Sem nenhum dos dois, avisa no console em desenvolvimento.\n' +
          '- `separatorBetween="auto"` (padrão) põe o separador quando nenhum botão é `outline`. A cor segue a variante do botão anterior.\n' +
          "- Use o mesmo tamanho em todos os botões. Para escolher uma opção ou ligar e desligar, use o ToggleGroup.\n\n" +
          `[Componente no Figma](${FIGMA_URL}) · [Documentação no Figma](${FIGMA_DOC_URL}) · [Artigo no CMS](${CMS_URL}).`,
      },
    },
  },
  argTypes: {
    orientation: { control: "inline-radio", options: ["horizontal", "vertical"] },
    separatorBetween: { control: "inline-radio", options: ["auto", true, false] },
    "aria-label": { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof ButtonGroup>;

const nada = () => {};

/** Ações do mesmo assunto, no Outline. */
export const Default: Story = {
  name: "Padrão",
  args: {
    "aria-label": "Edição",
    buttons: [
      { label: "Copiar", variant: "outline", onClick: nada },
      { label: "Recortar", variant: "outline", onClick: nada },
      { label: "Colar", variant: "outline", onClick: nada },
    ],
  },
};

/** `orientation` horizontal (padrão) ou vertical. */
export const Orientation: Story = {
  name: "Orientação",
  render: () => (
    <div className="flex flex-wrap items-start gap-8">
      <div className="flex flex-col gap-2">
        <span className="text-sm text-muted-foreground">Horizontal</span>
        <ButtonGroup
          aria-label="Navegação"
          orientation="horizontal"
          buttons={[
            { label: "Anterior", variant: "outline", onClick: nada },
            { label: "Próximo", variant: "outline", onClick: nada },
          ]}
        />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-muted-foreground">Vertical</span>
        <ButtonGroup
          aria-label="Ordenar"
          orientation="vertical"
          buttons={[
            { label: "Subir", variant: "outline", onClick: nada },
            { label: "Descer", variant: "outline", onClick: nada },
          ]}
        />
      </div>
    </div>
  ),
};

/** O grupo segue a escala do Button. Use o mesmo `size` em todos os botões. */
export const Size: Story = {
  name: "Tamanho",
  render: () => (
    <div className="flex flex-wrap items-center gap-6">
      {(["sm", "default", "lg"] as const).map((size) => (
        <ButtonGroup
          key={size}
          aria-label={`Período, tamanho ${size}`}
          buttons={[
            { label: "Dia", size, variant: "outline", onClick: nada },
            { label: "Semana", size, variant: "outline", onClick: nada },
            { label: "Mês", size, variant: "outline", onClick: nada },
          ]}
        />
      ))}
    </div>
  ),
};

/** As três variantes do Figma. No código, cada botão tem a sua, e o grupo pode ser misto. */
export const Variants: Story = {
  name: "Variantes",
  render: () => (
    <div className="flex flex-wrap gap-4">
      {(["default", "outline", "secondary"] as const).map((variant) => (
        <ButtonGroup
          key={variant}
          aria-label={`Grupo ${variant}`}
          buttons={[
            { label: "Um", variant, onClick: nada },
            { label: "Dois", variant, onClick: nada },
            { label: "Três", variant, onClick: nada },
          ]}
        />
      ))}
      <ButtonGroup
        aria-label="Grupo misto"
        buttons={[
          { label: "Salvar", variant: "default", onClick: nada },
          { label: "Pré-visualizar", variant: "outline", onClick: nada },
        ]}
      />
    </div>
  ),
};

/**
 * Separador. Em `"auto"` (padrão), aparece quando nenhum botão é `outline`: `primary-foreground`
 * a 20% depois de `default` e `destructive`, `border` nos outros. `false` tira.
 */
export const Separator: Story = {
  name: "Separador",
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <ButtonGroup
        aria-label="Automático no default"
        buttons={[{ label: "Um" }, { label: "Dois" }, { label: "Três" }]}
      />
      <ButtonGroup
        aria-label="Automático no secondary"
        buttons={[
          { label: "Um", variant: "secondary" },
          { label: "Dois", variant: "secondary" },
          { label: "Três", variant: "secondary" },
        ]}
      />
      <ButtonGroup
        aria-label="Sem separador"
        separatorBetween={false}
        buttons={[{ label: "Um" }, { label: "Dois" }, { label: "Três" }]}
      />
    </div>
  ),
};

/** `text` mostra um rótulo no início do grupo. */
export const WithText: Story = {
  name: "Com rótulo",
  render: () => (
    <ButtonGroup
      aria-label="Zoom"
      text="Zoom"
      buttons={[
        { label: <Minus aria-hidden="true" />, "aria-label": "Reduzir", size: "icon", variant: "outline" },
        { label: "100%", variant: "outline" },
        { label: <Plus aria-hidden="true" />, "aria-label": "Ampliar", size: "icon", variant: "outline" },
      ]}
    />
  ),
};

/** Ícone antes do texto (`icon`) e botão só de ícone, com `aria-label` no item. */
export const WithIcons: Story = {
  name: "Com ícones",
  render: () => (
    <ButtonGroup
      aria-label="Itens"
      buttons={[
        { label: "Adicionar", icon: <Plus aria-hidden="true" />, variant: "outline", onClick: nada },
        { label: "Buscar", icon: <Search aria-hidden="true" />, variant: "outline", onClick: nada },
        {
          label: <Trash2 aria-hidden="true" />,
          "aria-label": "Excluir",
          size: "icon",
          variant: "outline",
          onClick: nada,
        },
      ]}
    />
  ),
};

/** Composição: campo com a ação colada, e ação principal com um menu ao lado. */
export const Composition: Story = {
  name: "Composição",
  render: () => (
    <div className="flex flex-wrap items-center gap-6">
      <ButtonGroup aria-label="Busca">
        <Input placeholder="Buscar" aria-label="Buscar" />
        <Button variant="outline">Buscar</Button>
      </ButtonGroup>
      <ButtonGroup aria-label="Salvar">
        <Button>Salvar</Button>
        <ButtonGroupSeparator />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" aria-label="Mais opções de salvar">
              <ChevronDown aria-hidden="true" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Salvar como</DropdownMenuItem>
            <DropdownMenuItem>Salvar e fechar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ButtonGroup>
    </div>
  ),
};

/** Dois grupos lado a lado ganham 8px de espaço quando ficam dentro de outro ButtonGroup. */
export const Nested: Story = {
  name: "Aninhados",
  render: () => (
    <ButtonGroup aria-label="Paginação">
      <ButtonGroup
        aria-label="Primeira e anterior"
        buttons={[
          { label: "Primeira", variant: "outline", onClick: nada },
          { label: "Anterior", variant: "outline", onClick: nada },
        ]}
      />
      <ButtonGroup
        aria-label="Próxima e última"
        buttons={[
          { label: "Próxima", variant: "outline", onClick: nada },
          { label: "Última", variant: "outline", onClick: nada },
        ]}
      />
    </ButtonGroup>
  ),
};
