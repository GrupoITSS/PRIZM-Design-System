import { Avatar } from "@grupoitss/prizm-ui/avatar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@grupoitss/prizm-ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@grupoitss/prizm-ui/dropdown-menu";
import {
  BookOpen,
  Bot,
  Building2,
  ChevronDown,
  ChevronsUpDown,
  CirclePlus,
  Component,
  Ellipsis,
  FileText,
  Folder,
  Layers,
  Network,
  PanelLeft,
  Plus,
  Search,
  Settings,
  SquarePen,
  Tag,
  UserRoundCog,
  Users,
} from "@grupoitss/prizm-ui/icons";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@grupoitss/prizm-ui/sidebar";
import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";

// Traceability: the Sidebar sets in [PRIZM] Componentes, the documentation frame and the
// Redesign Docnix page the product examples come from.
const FIGMA_URL = "https://www.figma.com/design/7NPb3iuxjitMdpudp4yHTl?node-id=5198-1113";
const FIGMA_DOC_URL = "https://www.figma.com/design/7NPb3iuxjitMdpudp4yHTl?node-id=26475-4838";
const FIGMA_REF_URL = "https://www.figma.com/design/fdV47vgUG4481ptSHnGT6n?node-id=931-7162";
const CMS_URL =
  "https://sgq.pas.app.br/cms/prizm_design_system/articles?articleId=0c03a023-e958-49af-830e-ee2c3a10dc58&version=v1";

/**
 * Header global de exemplo, acima da Sidebar (S2). No celular a Sidebar sai da tela: o
 * SidebarTrigger do header abre a gaveta. No desktop ele some, e o botão fica dentro da Sidebar.
 */
function HeaderGlobal({ solucao = "Cockpit" }: { solucao?: string }) {
  return (
    <header className="fixed inset-x-0 top-0 z-20 flex h-12 items-center gap-2 border-b bg-background px-4 text-sm font-medium">
      <SidebarTrigger className="md:hidden" />
      {solucao}
    </header>
  );
}

function Pagina({ titulo }: { titulo: string }) {
  return (
    <SidebarInset>
      <div className="border-b p-4 text-sm font-medium">{titulo}</div>
      <div className="p-4 text-sm text-muted-foreground">Conteúdo da página.</div>
    </SidebarInset>
  );
}

/** Abaixo do header global, com a altura dele em `headerHeight`. */
function Tela({
  solucao,
  defaultOpen,
  children,
}: {
  solucao: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="pt-12">
      <SidebarProvider headerHeight="3rem" defaultOpen={defaultOpen}>
        <HeaderGlobal solucao={solucao} />
        {children}
      </SidebarProvider>
    </div>
  );
}

/**
 * Botão de recolher dentro da Sidebar, como nas referências do Redesign Docnix. É um
 * SidebarMenuButton: herda o anel e o hover da Sidebar. Aberta, fica à direita da primeira linha;
 * recolhida, no topo da faixa.
 */
function BotaoRecolher() {
  const { toggleSidebar, open } = useSidebar();
  return (
    <SidebarMenuButton
      className="w-8 shrink-0 justify-center"
      aria-expanded={open}
      onClick={toggleSidebar}
    >
      <PanelLeft aria-hidden="true" />
      <span className="sr-only">Mostrar ou ocultar a navegação</span>
    </SidebarMenuButton>
  );
}

/** Primeira linha: um item e o botão de recolher. Recolhida, o botão sobe para o topo. */
function LinhaDoTopo({ children }: { children: React.ReactNode }) {
  return (
    <SidebarMenu className="flex-row items-center group-data-[collapsible=icon]:flex-col-reverse">
      <SidebarMenuItem className="min-w-0 flex-1">{children}</SidebarMenuItem>
      <SidebarMenuItem>
        <BotaoRecolher />
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

function ItemNavegacao({
  nome,
  icone: Icone,
  ativo,
}: {
  nome: string;
  icone: typeof Search;
  ativo?: boolean;
}) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={ativo} tooltip={nome}>
        <a href={`#${nome.toLowerCase()}`}>
          <Icone aria-hidden="true" />
          <span>{nome}</span>
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

function MenuPlataforma({ ativo = "Organizações" }: { ativo?: string }) {
  const itens = [
    { nome: "Organizações", icone: Network },
    { nome: "Acessos", icone: Users },
    { nome: "Componentes", icone: Component },
  ];
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Plataforma</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {itens.map((item) => (
            <ItemNavegacao key={item.nome} {...item} ativo={item.nome === ativo} />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

function SidebarCockpit() {
  return (
    <Sidebar>
      <SidebarHeader>
        <LinhaDoTopo>
          <SidebarMenuButton asChild tooltip="Pesquisa">
            <a href="#pesquisa">
              <Search aria-hidden="true" />
              <span>Pesquisa</span>
            </a>
          </SidebarMenuButton>
        </LinhaDoTopo>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="pt-0">
          <SidebarGroupContent>
            <SidebarMenu>
              <ItemNavegacao nome="Organizações" icone={Network} ativo />
              <ItemNavegacao nome="Acessos" icone={UserRoundCog} />
              <ItemNavegacao nome="Componentes" icone={Component} />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}

const meta: Meta<typeof Sidebar> = {
  title: "Primários/Sidebar",
  component: Sidebar,
  tags: ["autodocs", "documentado"],
  parameters: {
    layout: "fullscreen",
    docs: {
      story: { inline: false, iframeHeight: 520 },
      description: {
        component:
          "Navegação lateral de uma solução, abaixo do header global. Base: [shadcn/ui](https://ui.shadcn.com/docs/components/radix/sidebar), com tokens PRIZM e as decisões de 10/11/2026.\n\n" +
          "- `SidebarProvider` guarda o estado (aberta ou recolhida, salvo no cookie `sidebar_state`). Use `headerHeight` com a altura do header global.\n" +
          '- Recolhe para uma faixa de ícones de 48px (`collapsible="icon"`, o padrão). No celular, abre numa gaveta.\n' +
          "- O botão de recolher fica dentro da Sidebar: aberta, à direita da primeira linha; recolhida, no topo da faixa.\n" +
          '- O item da página atual leva `isActive`: fundo `color/sidebar-primary` e `aria-current="page"`.\n' +
          "- Ctrl ou Cmd + B abre e recolhe, menos com o foco num campo editável. Desligue com `keyboardShortcut={false}`.\n\n" +
          "As stories Cockpit, Assistant e Portal do Conhecimento reproduzem as Sidebars dos produtos no Redesign Docnix.\n\n" +
          `[Componente no Figma](${FIGMA_URL}) · [Documentação no Figma](${FIGMA_DOC_URL}) · [Artigo no CMS](${CMS_URL}) · [Referência dos produtos](${FIGMA_REF_URL}).`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/** O padrão: botão de recolher no topo, grupo com rótulo, item ativo, submenu e rodapé. */
export const Padrao: Story = {
  name: "Padrão",
  render: () => (
    <Tela solucao="Cockpit">
      <Sidebar>
        <SidebarHeader>
          <LinhaDoTopo>
            <SidebarMenuButton asChild tooltip="Pesquisa">
              <a href="#pesquisa">
                <Search aria-hidden="true" />
                <span>Pesquisa</span>
              </a>
            </SidebarMenuButton>
          </LinhaDoTopo>
        </SidebarHeader>
        <SidebarContent>
          <MenuPlataforma />
          <SidebarGroup>
            <SidebarGroupLabel>Documentos</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Manuais">
                    <FileText aria-hidden="true" />
                    <span>Manuais</span>
                  </SidebarMenuButton>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton href="#manual-de-uso" isActive>
                        <span>Manual de uso</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton href="#procedimentos">
                        <span>Procedimentos</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Configurações">
                <Settings aria-hidden="true" />
                <span>Configurações</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <Pagina titulo="Organizações" />
    </Tela>
  ),
};

/** Recolhida: a faixa de ícones, com o botão de recolher no topo. O nome de cada item aparece no Tooltip. */
export const Recolhida: Story = {
  render: () => (
    <Tela solucao="Cockpit" defaultOpen={false}>
      <SidebarCockpit />
      <Pagina titulo="Organizações" />
    </Tela>
  ),
};

/** Cockpit, como no Redesign Docnix: pesquisa e botão de recolher no topo, itens sem rótulo de grupo. */
export const Cockpit: Story = {
  render: () => (
    <Tela solucao="Cockpit">
      <SidebarCockpit />
      <Pagina titulo="Organizações" />
    </Tela>
  ),
};

const ASSISTENTES = [
  { nome: "Manu", iniciais: "MA" },
  { nome: "Aura", iniciais: "AU" },
  { nome: "Logika", iniciais: "LO" },
  { nome: "Alvaro Teste", iniciais: "AT" },
];

const CONVERSAS = [
  "Problema na rede elétrica",
  "Elétrica para análise detalhada",
  "Conexões soltas ou desgastadas",
];

/**
 * Assistant, como no Redesign Docnix: novo chat e pesquisa no topo, assistentes num submenu que
 * abre e fecha, e o histórico de conversas por data, com ações e "Ver mais". Recolhida, ficam
 * só os ícones do topo e dos assistentes.
 */
export const Assistant: Story = {
  render: () => (
    <Tela solucao="Assistant">
      <Sidebar>
        <SidebarHeader>
          <LinhaDoTopo>
            <SidebarMenuButton tooltip="Novo chat">
              <SquarePen aria-hidden="true" />
              <span>Novo chat</span>
            </SidebarMenuButton>
          </LinhaDoTopo>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Pesquisar">
                <Search aria-hidden="true" />
                <span>Pesquisar</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup className="pt-0">
            <SidebarMenu>
              <Collapsible asChild defaultOpen>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip="Assistentes">
                      <Bot aria-hidden="true" />
                      <span>Assistentes</span>
                      <ChevronDown
                        aria-hidden="true"
                        className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180"
                      />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {ASSISTENTES.map(({ nome, iniciais }, i) => (
                        <SidebarMenuSubItem key={nome}>
                          <SidebarMenuSubButton
                            href={`#${iniciais.toLowerCase()}`}
                            isActive={i === ASSISTENTES.length - 1}
                          >
                            <Avatar size="xs" fallback={iniciais} alt="" />
                            <span>{nome}</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild>
                          <button type="button">
                            <CirclePlus aria-hidden="true" />
                            <span>Criar assistente</span>
                          </button>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>23/12/2025</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {CONVERSAS.map((titulo) => (
                  <SidebarMenuItem key={titulo}>
                    <SidebarMenuButton asChild>
                      <a href="#conversa">
                        <span>{titulo}</span>
                      </a>
                    </SidebarMenuButton>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <SidebarMenuAction showOnHover aria-label={`Mais opções de ${titulo}`}>
                          <Ellipsis aria-hidden="true" />
                        </SidebarMenuAction>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="right" align="start">
                        <DropdownMenuItem>Renomear</DropdownMenuItem>
                        <DropdownMenuItem>Excluir</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </SidebarMenuItem>
                ))}
                <SidebarMenuItem>
                  <SidebarMenuButton className="text-sidebar-foreground/70">
                    <Ellipsis aria-hidden="true" />
                    <span>Ver mais</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      <Pagina titulo="Novo chat" />
    </Tela>
  ),
};

/**
 * Portal do Conhecimento, como no Redesign Docnix: o seletor de workspace no topo (`size="lg"`,
 * que recolhido fica só o logo), os itens de gestão e o botão de recolher no rodapé.
 */
export const PortalDoConhecimento: Story = {
  name: "Portal do Conhecimento",
  render: () => (
    <Tela solucao="Portal do Conhecimento">
      <Sidebar>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton size="lg" tooltip="Docnix Workspace">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                      <Layers aria-hidden="true" className="size-4" />
                    </span>
                    <span className="truncate font-semibold">Docnix Workspace</span>
                    <ChevronDown aria-hidden="true" className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="bottom" align="start">
                  <DropdownMenuItem>Docnix Workspace</DropdownMenuItem>
                  <DropdownMenuItem>Workspace do time</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <ItemNavegacao nome="Artigos" icone={BookOpen} ativo />
                <ItemNavegacao nome="Gerenciar tags" icone={Tag} />
                <ItemNavegacao nome="Gerenciar usuários" icone={UserRoundCog} />
                <ItemNavegacao nome="Gerenciar versões" icone={FileText} />
                <ItemNavegacao nome="Gerenciamento" icone={Settings} />
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <BotaoRecolher />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <Pagina titulo="Artigos" />
    </Tela>
  ),
};

/** Ações e contador: o "…" do item abre um DropdownMenu; o "+" do grupo cria um item. */
export const AcoesEContador: Story = {
  name: "Ações e contador",
  render: () => (
    <SidebarProvider>
      <Sidebar collapsible="none" className="h-[480px] border-r">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Assistentes</SidebarGroupLabel>
            <SidebarGroupAction>
              <Plus aria-hidden="true" />
              <span className="sr-only">Criar assistente</span>
            </SidebarGroupAction>
            <SidebarGroupContent>
              <SidebarMenu>
                {["Manu", "Aura", "Logika"].map((nome, i) => (
                  <SidebarMenuItem key={nome}>
                    <SidebarMenuButton isActive={i === 0}>
                      <Bot aria-hidden="true" />
                      <span>{nome}</span>
                    </SidebarMenuButton>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <SidebarMenuAction showOnHover aria-label={`Mais opções de ${nome}`}>
                          <Ellipsis aria-hidden="true" />
                        </SidebarMenuAction>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="right" align="start">
                        <DropdownMenuItem>Renomear</DropdownMenuItem>
                        <DropdownMenuItem>Excluir</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </SidebarMenuItem>
                ))}
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Folder aria-hidden="true" />
                    <span>Conversas</span>
                  </SidebarMenuButton>
                  <SidebarMenuBadge>23</SidebarMenuBadge>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  ),
};

/**
 * Item grande (`size="lg"`): o seletor no topo da Sidebar, com mídia, título e subtítulo. Ele abre
 * um menu e não leva `isActive` (P4).
 */
export const ItemGrande: Story = {
  name: "Item grande",
  render: () => (
    <SidebarProvider>
      <Sidebar collapsible="none" className="h-[480px] border-r">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton size="lg">
                    <span className="flex size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                      <Building2 aria-hidden="true" className="size-4" />
                    </span>
                    <span className="flex flex-col leading-tight">
                      <span className="font-semibold">Docnix Workspace</span>
                      <span className="text-xs">Empresa Padrão</span>
                    </span>
                    <ChevronsUpDown aria-hidden="true" className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" align="start">
                  <DropdownMenuItem>Docnix Workspace</DropdownMenuItem>
                  <DropdownMenuItem>Manual de uso</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <MenuPlataforma />
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  ),
};

/** Carregando: itens com SidebarMenuSkeleton. */
export const Carregando: Story = {
  render: () => (
    <SidebarProvider>
      <Sidebar collapsible="none" className="h-[480px] border-r">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Plataforma</SidebarGroupLabel>
            <SidebarMenu>
              {Array.from({ length: 5 }, (_, i) => (
                <SidebarMenuItem key={i}>
                  <SidebarMenuSkeleton showIcon />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  ),
};

/**
 * Controlada: a tela guarda o estado, com `open` e `onOpenChange`, em vez do cookie. Serve, por
 * exemplo, para recolher a Sidebar ao abrir um editor em tela cheia ou guardar a escolha no
 * perfil. O botão de recolher continua dentro da Sidebar; a página só lê o estado.
 */
export const Controlada: Story = {
  render: function Render() {
    const [aberta, setAberta] = React.useState(true);
    return (
      <>
        <div className="pt-12">
          <SidebarProvider headerHeight="3rem" open={aberta} onOpenChange={setAberta}>
            <HeaderGlobal />
            <SidebarCockpit />
            <SidebarInset>
              <div className="border-b p-4 text-sm font-medium">Organizações</div>
              <p className="p-4 text-sm text-muted-foreground">
                Estado guardado pela tela: {aberta ? "aberta" : "recolhida"}.
              </p>
            </SidebarInset>
          </SidebarProvider>
        </div>
      </>
    );
  },
};
