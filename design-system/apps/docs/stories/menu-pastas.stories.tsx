import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@grupoitss/prizm-ui/alert-dialog";
import { Badge } from "@grupoitss/prizm-ui/badge";
import { Button } from "@grupoitss/prizm-ui/button";
import { ButtonGroup } from "@grupoitss/prizm-ui/button-group";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@grupoitss/prizm-ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@grupoitss/prizm-ui/dropdown-menu";
import { Empty } from "@grupoitss/prizm-ui/empty";
import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  EllipsisVertical,
  FileText,
  Folder,
  FolderOpen,
  FolderSearch,
  Layers,
  Link,
  Pencil,
  Plus,
  Search,
  Settings,
  Tag,
  Trash2,
} from "@grupoitss/prizm-ui/icons";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@grupoitss/prizm-ui/input-group";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@grupoitss/prizm-ui/sidebar";
import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";

// Traceability: the reference in Redesign Docnix and the Sidebar this composition is built on.
const FIGMA_REF_URL = "https://www.figma.com/design/fdV47vgUG4481ptSHnGT6n?node-id=1165-27680";
const CMS_URL =
  "https://sgq.pas.app.br/cms/prizm_design_system/articles?articleId=d77d4c60-f35d-49db-9bba-f31b143598d8&version=v1";
const FIGMA_DOC_URL = "https://www.figma.com/design/7NPb3iuxjitMdpudp4yHTl?node-id=26549-5714";
const SIDEBAR_CMS_URL =
  "https://sgq.pas.app.br/cms/prizm_design_system/articles?articleId=0c03a023-e958-49af-830e-ee2c3a10dc58&version=v1";

/**
 * Moldura das telas: a Sidebar e o header são `fixed`. O `transform` faz a moldura conter os
 * elementos fixos, e a tela cabe dentro da página Docs, sem iframe próprio. Em iframe próprio
 * (`inline: false`), a story não recebia a marca e o modo escolhidos na barra do Storybook.
 * O `-m-6` tira a margem da moldura do Storybook.
 */
const MOLDURA = "relative -m-6 h-[600px] overflow-hidden pt-12 [transform:translateZ(0)]";

type No = {
  id: string;
  nome: string;
  tipo: "pasta" | "artigo";
  rascunho?: boolean;
  filhos?: No[];
};

const ARVORE: No[] = [
  {
    id: "manual",
    nome: "Manual de uso",
    tipo: "pasta",
    filhos: [
      {
        id: "primeiros-passos",
        nome: "Primeiros passos",
        tipo: "pasta",
        filhos: [
          { id: "por-que", nome: "Por que escolher o Docnix?", tipo: "artigo", rascunho: true },
          { id: "acesso", nome: "Acesso", tipo: "artigo" },
        ],
      },
      {
        id: "documentos",
        nome: "Documentos (Maxdoc)",
        tipo: "pasta",
        filhos: [
          {
            id: "administracao",
            nome: "Administração",
            tipo: "pasta",
            filhos: [
              { id: "parametros", nome: "Parâmetros", tipo: "artigo" },
              { id: "cadastros", nome: "Cadastros administrativos", tipo: "artigo" },
            ],
          },
          { id: "graficos", nome: "Gráficos e relatórios", tipo: "artigo" },
          { id: "informacao-mantida", nome: "Informação mantida (documentos)", tipo: "artigo" },
        ],
      },
      {
        id: "treinamento",
        nome: "Treinamento (T&D)",
        tipo: "pasta",
        filhos: [
          { id: "profissional", nome: "Profissional", tipo: "artigo" },
          { id: "avaliacao", nome: "Avaliação", tipo: "artigo" },
        ],
      },
    ],
  },
];

/** Busca por nome, sem diferenciar maiúsculas e acentos. */
const normalizar = (texto: string) =>
  texto
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();

/** Mantém os itens que batem com a busca e as pastas que levam até eles. */
function filtrar(nos: No[], busca: string): No[] {
  const termo = normalizar(busca.trim());
  if (!termo) return nos;
  return nos.flatMap((no) => {
    const bate = normalizar(no.nome).includes(termo);
    const filhos = no.filhos ? filtrar(no.filhos, busca) : [];
    if (bate) return [no];
    return filhos.length ? [{ ...no, filhos }] : [];
  });
}

function remover(nos: No[], id: string): No[] {
  return nos
    .filter((no) => no.id !== id)
    .map((no) => (no.filhos ? { ...no, filhos: remover(no.filhos, id) } : no));
}

type Acoes = {
  ativo?: string;
  buscando: boolean;
  onAbrir: (id: string) => void;
  onExcluir: (no: No) => void;
};

/**
 * Ações da linha: aparecem no hover e no foco da própria linha. O `showOnHover` da Sidebar olha o
 * SidebarMenuItem, e na árvore os itens ficam um dentro do outro: passar o mouse numa pasta aberta
 * mostraria as ações de tudo o que está nela. Por isso cada linha tem o seu grupo, `linha`.
 */
const acaoDaLinha =
  "md:opacity-0 group-hover/linha:opacity-100 group-focus-within/linha:opacity-100 data-[state=open]:opacity-100";

function MenuMaisOpcoes({ no, onExcluir }: { no: No; onExcluir: (no: No) => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuAction className={acaoDaLinha} aria-label={`Mais opções de ${no.nome}`}>
          <EllipsisVertical aria-hidden="true" />
        </SidebarMenuAction>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" align="start">
        <DropdownMenuItem>
          <Pencil aria-hidden="true" />
          Renomear
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link aria-hidden="true" />
          Copiar link
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onSelect={() => onExcluir(no)}>
          <Trash2 aria-hidden="true" />
          {no.tipo === "pasta" ? "Excluir pasta" : "Excluir artigo"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function Linha({ no, acoes }: { no: No; acoes: Acoes }) {
  if (no.tipo === "artigo") {
    return (
      <SidebarMenuItem className="group/linha">
        <SidebarMenuButton asChild isActive={acoes.ativo === no.id}>
          <a
            href={`#${no.id}`}
            onClick={(evento) => {
              evento.preventDefault();
              acoes.onAbrir(no.id);
            }}
          >
            <FileText aria-hidden="true" />
            <span className="min-w-0 flex-1 truncate">{no.nome}</span>
            {/* Na Sidebar, o selo usa as cores dela: o primary da página some no Docnix. */}
            {no.rascunho ? (
              <Badge
                variant="default"
                className="shrink-0 border-transparent bg-sidebar-primary text-sidebar-primary-foreground"
              >
                Rascunho
              </Badge>
            ) : null}
          </a>
        </SidebarMenuButton>
        <MenuMaisOpcoes no={no} onExcluir={acoes.onExcluir} />
      </SidebarMenuItem>
    );
  }

  return (
    <Collapsible
      asChild
      // Com busca, as pastas abrem para mostrar onde está o resultado.
      key={acoes.buscando ? "buscando" : "navegando"}
      defaultOpen={acoes.buscando || no.id === "manual" || no.id === "primeiros-passos"}
    >
      <SidebarMenuItem>
        <div className="group/linha relative">
          <CollapsibleTrigger asChild>
            <SidebarMenuButton className="group/pasta pr-14!">
              <ChevronRight
                aria-hidden="true"
                className="transition-transform group-data-[state=open]/pasta:rotate-90"
              />
              <FolderOpen aria-hidden="true" className="hidden group-data-[state=open]/pasta:block" />
              <Folder aria-hidden="true" className="group-data-[state=open]/pasta:hidden" />
              <span className="min-w-0 flex-1 truncate">{no.nome}</span>
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuAction className={`right-7 ${acaoDaLinha}`} aria-label={`Criar em ${no.nome}`}>
                <Plus aria-hidden="true" />
              </SidebarMenuAction>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="start">
              <DropdownMenuItem>
                <Folder aria-hidden="true" />
                Nova subpasta
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileText aria-hidden="true" />
                Novo artigo
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <MenuMaisOpcoes no={no} onExcluir={acoes.onExcluir} />
        </div>
        <CollapsibleContent>
          {/* Cada nível tem a guia à esquerda, como o SidebarMenuSub. */}
          <SidebarMenu className="ml-3.5 border-l border-sidebar-border pl-2 pt-1">
            {(no.filhos ?? []).map((filho) => (
              <Linha key={filho.id} no={filho} acoes={acoes} />
            ))}
          </SidebarMenu>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}

/** O Empty usa as cores da página; dentro da Sidebar, passa para as dela (o Docnix tem a sidebar roxa). */
const emptyNaSidebar =
  "[&_[data-slot=empty-title]]:text-sidebar-foreground [&_[data-slot=empty-description]]:text-sidebar-foreground/70 [&_[data-slot=empty-icon]]:text-sidebar-foreground/70";

type MenuDePastasProps = {
  arvoreInicial?: No[];
  buscaInicial?: string;
  excluirInicial?: string;
};

function encontrar(nos: No[], id?: string): No | undefined {
  for (const no of nos) {
    if (no.id === id) return no;
    const achado = encontrar(no.filhos ?? [], id);
    if (achado) return achado;
  }
  return undefined;
}

/**
 * Menu de pastas do Portal do Conhecimento: painel de 328px com busca, criação e a árvore de
 * pastas e artigos. É uma composição das peças da Sidebar (MP1); cada pasta é um botão que abre e
 * fecha, com `aria-expanded` (MP2).
 */
function MenuDePastas({ arvoreInicial = ARVORE, buscaInicial = "", excluirInicial }: MenuDePastasProps) {
  const [arvore, setArvore] = React.useState(arvoreInicial);
  const [busca, setBusca] = React.useState(buscaInicial);
  const [ativo, setAtivo] = React.useState("acesso");
  const [excluindo, setExcluindo] = React.useState<No | undefined>(() =>
    encontrar(arvoreInicial, excluirInicial),
  );

  // Guarda o nome para devolver o foco depois que o diálogo fecha e `excluindo` já foi limpo.
  const ultimoExcluidoRef = React.useRef(excluindo?.nome);

  const visiveis = filtrar(arvore, busca);
  const acoes: Acoes = {
    ativo,
    buscando: busca.trim() !== "",
    onAbrir: setAtivo,
    onExcluir: (no) => {
      ultimoExcluidoRef.current = no.nome;
      setExcluindo(no);
    },
  };

  return (
    <Sidebar collapsible="none" label="Pastas e artigos" className="w-[328px] border-r">
      <SidebarHeader className="gap-2">
        <h2 className="px-2 pt-1 text-xs font-medium text-sidebar-foreground/70">Pastas e artigos</h2>
        <InputGroup size="sm">
          <InputGroupAddon>
            <Search aria-hidden="true" />
          </InputGroupAddon>
          <InputGroupInput
            type="search"
            aria-label="Pesquisar por nome"
            placeholder="Pesquisar por nome"
            value={busca}
            onChange={(evento) => setBusca(evento.target.value)}
          />
        </InputGroup>
        <ButtonGroup className="w-full">
          <Button variant="outline" size="sm" className="flex-1">
            <Plus aria-hidden="true" />
            Adicionar pasta
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon-sm" aria-label="Mais opções de criação">
                <ChevronDown aria-hidden="true" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <FileText aria-hidden="true" />
                Novo artigo
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </ButtonGroup>
      </SidebarHeader>
      <SidebarContent>
        {arvore.length === 0 ? (
          <Empty
            appearance="plain"
            className={emptyNaSidebar}
            icon={<Folder aria-hidden="true" />}
            description="Suas pastas e artigos serão exibidos aqui."
          />
        ) : visiveis.length === 0 ? (
          <Empty
            appearance="plain"
            className={emptyNaSidebar}
            icon={<FolderSearch aria-hidden="true" />}
            title="Nenhum resultado"
            description="Não foi possível encontrar conteúdos com esse nome."
          />
        ) : (
          <SidebarGroup className="pt-0">
            <SidebarGroupContent>
              <SidebarMenu>
                {visiveis.map((no) => (
                  <Linha key={no.id} no={no} acoes={acoes} />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <AlertDialog open={excluindo !== undefined} onOpenChange={(aberto) => !aberto && setExcluindo(undefined)}>
        <AlertDialogContent
          onCloseAutoFocus={(evento) => {
            // O diálogo abre de um item de menu, que já saiu da tela: sem isto, o foco cai no body.
            // Volta para o "⋮" do item; se ele foi excluído, para a busca.
            evento.preventDefault();
            const painel = document.querySelector('nav[aria-label="Pastas e artigos"]');
            const nome = ultimoExcluidoRef.current ?? "";
            const alvo =
              painel?.querySelector<HTMLElement>(`[aria-label="${CSS.escape(`Mais opções de ${nome}`)}"]`) ??
              painel?.querySelector<HTMLElement>("input");
            alvo?.focus();
          }}
        >
          <AlertDialogHeader>
            <AlertDialogTitle>
              {excluindo?.tipo === "pasta"
                ? `Deseja excluir a pasta "${excluindo.nome}"?`
                : `Deseja excluir o artigo "${excluindo?.nome}"?`}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {excluindo?.tipo === "pasta"
                ? "Ao confirmar, a pasta e tudo o que está nela (subpastas e artigos) serão excluídos. Esta ação não pode ser desfeita."
                : "Ao confirmar, o artigo será excluído com todo o seu conteúdo. Esta ação não pode ser desfeita."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                variant="destructive"
                onClick={() => {
                  if (excluindo) setArvore((atual) => remover(atual, excluindo.id));
                }}
              >
                Sim, excluir
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Sidebar>
  );
}

/** Tela do Portal do Conhecimento: Sidebar recolhida e o menu de pastas ao lado (MP4). */
function Portal(props: MenuDePastasProps) {
  return (
    <div className={MOLDURA}>
      <SidebarProvider headerHeight="3rem" defaultOpen={false}>
        <header className="fixed inset-x-0 top-0 z-20 flex h-12 items-center gap-2 border-b bg-background px-4 text-sm font-medium">
          <SidebarTrigger className="md:hidden" />
          Portal do Conhecimento
        </header>
        <Sidebar>
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg" tooltip="Docnix Workspace">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <Layers aria-hidden="true" className="size-4" />
                  </span>
                  <span className="truncate font-semibold">Docnix Workspace</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarMenu>
                {[
                  { nome: "Artigos", icone: BookOpen, ativo: true },
                  { nome: "Gerenciar tags", icone: Tag },
                  { nome: "Gerenciamento", icone: Settings },
                ].map(({ nome, icone: Icone, ativo }) => (
                  <SidebarMenuItem key={nome}>
                    <SidebarMenuButton asChild isActive={ativo} tooltip={nome}>
                      <a href={`#${nome.toLowerCase()}`}>
                        <Icone aria-hidden="true" />
                        <span>{nome}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <SidebarInset className="h-[calc(100svh-3rem)] flex-row">
          <MenuDePastas {...props} />
          <div className="flex-1 p-6 text-sm text-muted-foreground">Conteúdo do artigo.</div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

const meta: Meta<typeof MenuDePastas> = {
  title: "Compositions/Menu de pastas",
  component: MenuDePastas,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Árvore de pastas e artigos do Portal do Conhecimento, num painel de 328px ao lado da Sidebar recolhida. É uma composição das peças da [Sidebar](" +
          SIDEBAR_CMS_URL +
          "), sem componente novo: pode virar um TreeView se outros produtos precisarem (decisões MP1 a MP6, 11/11/2026).\n\n" +
          "- Cada pasta é um botão que abre e fecha (`aria-expanded`), e o Tab percorre a árvore. Sem `role=\"tree\"` nem navegação por setas (MP2).\n" +
          "- Pastas e artigos com 32px, como o item da Sidebar (MP3). Cada nível tem a guia à esquerda.\n" +
          '- No hover e no foco, a pasta mostra "+" (Nova subpasta, Novo artigo) e "⋮" (Renomear, Copiar link, Excluir). O artigo mostra só o "⋮".\n' +
          "- A busca filtra por nome, sem diferenciar maiúsculas e acentos, e abre as pastas que levam ao resultado.\n" +
          "- Excluir pede confirmação num AlertDialog.\n\n" +
          "Ficam para depois (MP5): editar o nome na própria linha, o diálogo de tradução e o link inteligente.\n\n" +
          `[Documentação no Figma](${FIGMA_DOC_URL}) · [Artigo no CMS](${CMS_URL}) · [Referência no Redesign Docnix](${FIGMA_REF_URL}).`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/** A árvore no Portal do Conhecimento, com o artigo "Acesso" aberto. */
export const Padrao: Story = {
  name: "Padrão",
  render: () => <Portal />,
};

/** Sem pastas: o Empty no lugar da árvore. */
export const Vazio: Story = {
  render: () => <Portal arvoreInicial={[]} />,
};

/** Busca com resultado: as pastas que levam até ele ficam abertas. */
export const Busca: Story = {
  render: () => <Portal buscaInicial="parametros" />,
};

/** Busca sem resultado. */
export const SemResultado: Story = {
  name: "Sem resultado",
  render: () => <Portal buscaInicial="orçamento" />,
};

/** Confirmar a exclusão de uma pasta: avisa que as subpastas e os artigos vão junto. */
export const ExcluirPasta: Story = {
  name: "Excluir pasta",
  // Abre o AlertDialog ao carregar: na página Docs, ele cobriria a página inteira.
  tags: ["!autodocs"],
  render: () => <Portal excluirInicial="primeiros-passos" />,
};
