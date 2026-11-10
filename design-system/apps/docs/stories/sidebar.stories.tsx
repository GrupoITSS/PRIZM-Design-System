import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@grupoitss/prizm-ui/dropdown-menu";
import {
  Bot,
  Building2,
  ChevronsUpDown,
  Component,
  Ellipsis,
  FileText,
  Folder,
  Network,
  Plus,
  Search,
  Settings,
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
} from "@grupoitss/prizm-ui/sidebar";
import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";

// Traceability: the Sidebar sets in [PRIZM] Componentes and the documentation frame.
const FIGMA_URL = "https://www.figma.com/design/7NPb3iuxjitMdpudp4yHTl?node-id=5198-1113";
const FIGMA_DOC_URL = "https://www.figma.com/design/7NPb3iuxjitMdpudp4yHTl?node-id=26475-4838";

/** Header global de exemplo, acima da Sidebar (S2). */
function HeaderGlobal() {
  return (
    <header className="fixed inset-x-0 top-0 z-20 flex h-12 items-center gap-2 border-b bg-background px-4 text-sm font-medium">
      Cockpit
    </header>
  );
}

function Pagina({ titulo }: { titulo: string }) {
  return (
    <SidebarInset>
      <div className="flex items-center gap-2 border-b p-2">
        <SidebarTrigger />
        <span className="text-sm text-muted-foreground">{titulo}</span>
      </div>
      <div className="p-4 text-sm text-muted-foreground">Conteúdo da página.</div>
    </SidebarInset>
  );
}

function MenuPlataforma({ ativo = "Organizações" }: { ativo?: string }) {
  const itens = [
    { nome: "Pesquisa", icone: Search },
    { nome: "Organizações", icone: Network },
    { nome: "Acessos", icone: Users },
    { nome: "Componentes", icone: Component },
  ];
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Plataforma</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {itens.map(({ nome, icone: Icone }) => (
            <SidebarMenuItem key={nome}>
              <SidebarMenuButton asChild isActive={nome === ativo} tooltip={nome}>
                <a href={`#${nome.toLowerCase()}`}>
                  <Icone aria-hidden="true" />
                  <span>{nome}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

const meta: Meta<typeof Sidebar> = {
  title: "Primários/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      story: { inline: false, iframeHeight: 480 },
      description: {
        component:
          "Navegação lateral de uma solução, abaixo do header global. Base: [shadcn/ui](https://ui.shadcn.com/docs/components/radix/sidebar), com tokens PRIZM e as decisões de 10/11/2026.\n\n" +
          "- `SidebarProvider` guarda o estado (aberta ou recolhida, salvo no cookie `sidebar_state`). Use `headerHeight` com a altura do header global.\n" +
          '- Recolhe para uma faixa de ícones de 48px (`collapsible="icon"`, o padrão). No celular, abre numa gaveta.\n' +
          '- O item da página atual leva `isActive`: fundo `color/sidebar-primary` e `aria-current="page"`.\n' +
          "- Ctrl ou Cmd + B abre e recolhe, menos com o foco num campo editável. Desligue com `keyboardShortcut={false}`.\n\n" +
          `[Componente no Figma](${FIGMA_URL}) · [Documentação no Figma](${FIGMA_DOC_URL}).`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/** O padrão: grupo com rótulo, item ativo, submenu e rodapé. */
export const Padrao: Story = {
  name: "Padrão",
  render: () => (
    <>
      <HeaderGlobal />
      <div className="pt-12">
        <SidebarProvider headerHeight="3rem">
          <Sidebar>
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
        </SidebarProvider>
      </div>
    </>
  ),
};

/** Recolhida: a faixa de ícones. O nome de cada item aparece no Tooltip, no hover e no foco. */
export const Recolhida: Story = {
  render: () => (
    <>
      <HeaderGlobal />
      <div className="pt-12">
        <SidebarProvider headerHeight="3rem" defaultOpen={false}>
          <Sidebar>
            <SidebarContent>
              <MenuPlataforma />
            </SidebarContent>
            <SidebarRail />
          </Sidebar>
          <Pagina titulo="Organizações" />
        </SidebarProvider>
      </div>
    </>
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

/** Controlada de fora, com `open` e `onOpenChange`. */
export const Controlada: Story = {
  render: function Render() {
    const [aberta, setAberta] = React.useState(true);
    return (
      <>
        <HeaderGlobal />
        <div className="pt-12">
          <SidebarProvider headerHeight="3rem" open={aberta} onOpenChange={setAberta}>
            <Sidebar>
              <SidebarContent>
                <MenuPlataforma ativo="Acessos" />
              </SidebarContent>
            </Sidebar>
            <SidebarInset>
              <div className="flex items-center gap-2 border-b p-2">
                <SidebarTrigger />
                <span className="text-sm text-muted-foreground">
                  {aberta ? "Aberta" : "Recolhida"}
                </span>
              </div>
            </SidebarInset>
          </SidebarProvider>
        </div>
      </>
    );
  },
};
