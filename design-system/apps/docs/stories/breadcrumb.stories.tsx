import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronDown, Dot, FileText, Folder, Home } from "@grupoitss/prizm-ui/icons";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  breadcrumbLinkStyles,
} from "@grupoitss/prizm-ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@grupoitss/prizm-ui/dropdown-menu";

const meta: Meta<typeof Breadcrumb> = {
  title: "Primários/Breadcrumb",
  component: Breadcrumb,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Mostra onde a página está no caminho e leva de volta aos níveis de cima. " +
          "O último item é a página atual, sem link.\n\n" +
          "Use a prop `items` nos casos comuns. Para recolher o caminho ou pôr um menu num item, " +
          "monte com as peças (`BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbPage`, " +
          "`BreadcrumbSeparator`, `BreadcrumbEllipsis`).\n\n" +
          '**Base:** <a href="https://ui.shadcn.com/docs/components/breadcrumb" target="_blank" rel="noopener noreferrer">Breadcrumb — shadcn/ui</a>',
      },
    },
  },
  args: {
    items: [
      { label: "Início", href: "/" },
      { label: "Documentos", href: "/documentos" },
      { label: "Manual da qualidade" },
    ],
  },
};

export default meta;

type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {};

/** Ícone só no primeiro item, para marcar o início do caminho. */
export const ComIcone: Story = {
  name: "Com ícone",
  args: {
    items: [
      { label: "Início", href: "/", icon: <Home /> },
      { label: "Documentos", href: "/documentos" },
      { label: "Manual da qualidade" },
    ],
  },
};

/**
 * Caminho longo recolhido: as reticências são um botão "Mais páginas"
 * que abre os níveis escondidos num DropdownMenu.
 */
export const Recolhido: Story = {
  name: "Caminho recolhido",
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Início</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <BreadcrumbEllipsis />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>
                <Folder /> Documentos
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Folder /> Qualidade
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Folder /> Procedimentos
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/documentos/qualidade/procedimentos/compras">Compras</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>
            <FileText /> Avaliação de fornecedores
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};

/**
 * Item com menu, para trocar de página no mesmo nível. O gatilho usa
 * `breadcrumbLinkStyles` e fica num item do meio, nunca na página atual.
 */
export const ItemComMenu: Story = {
  name: "Item com menu",
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Início</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger className={breadcrumbLinkStyles}>
              Documentos
              <ChevronDown aria-hidden="true" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>Documentos</DropdownMenuItem>
              <DropdownMenuItem>Registros</DropdownMenuItem>
              <DropdownMenuItem>Indicadores</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Manual da qualidade</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};

/** Um item do meio sem `href` vira texto simples: não é link nem página atual. */
export const ItemSemLink: Story = {
  name: "Item sem link",
  args: {
    items: [
      { label: "Início", href: "/" },
      { label: "Configurações" },
      { label: "Conta" },
    ],
  },
};

export const SeparadorCustomizado: Story = {
  name: "Separador customizado",
  args: {
    separator: <Dot />,
  },
};
