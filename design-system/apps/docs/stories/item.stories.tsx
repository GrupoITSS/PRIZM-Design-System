import { Avatar } from "@grupoitss/prizm-ui/avatar";
import { Button } from "@grupoitss/prizm-ui/button";
import { Checkbox } from "@grupoitss/prizm-ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@grupoitss/prizm-ui/dropdown-menu";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@grupoitss/prizm-ui/field";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  BadgeCheck as BadgeCheckIcon,
  Bell as BellIcon,
  Check as CheckIcon,
  ChevronDown as ChevronDownIcon,
  ChevronRight as ChevronRightIcon,
  ExternalLink as ExternalLinkIcon,
  FileText as FileTextIcon,
  Home as HomeIcon,
  Inbox as InboxIcon,
  Mail as MailIcon,
  MessageSquare as MessageSquareIcon,
  Pencil as PencilIcon,
  Plus as PlusIcon,
  ShieldAlert as ShieldAlertIcon,
  Trash2 as Trash2Icon,
  X as XIcon,
} from "@grupoitss/prizm-ui/icons";
import { Item } from "@grupoitss/prizm-ui/item";
import { Progress } from "@grupoitss/prizm-ui/progress";
import { Sheet } from "@grupoitss/prizm-ui/sheet";
import { useRef, useState } from "react";

// Traceability: the Item set in [PRIZM] Componentes, the documentation frame and the CMS article.
// The token map lives next to the component (item.tokens.json) and is checked in a test.
const FIGMA_URL = "https://www.figma.com/design/7NPb3iuxjitMdpudp4yHTl?node-id=18672-198607";
const FIGMA_DOC_URL = "https://www.figma.com/design/7NPb3iuxjitMdpudp4yHTl?node-id=26360-3575";
const CMS_URL =
  "https://sgq.pas.app.br/cms/prizm_design_system/articles?articleId=528be293-dd75-47a5-a40e-be2111842dc4&version=v1";

const meta: Meta<typeof Item> = {
  title: "Primários/Item",
  component: Item,
  tags: ["autodocs", "documentado"],
  parameters: {
    docs: {
      description: {
        component:
          "API preferencial **por props** (sem subcomponentes). Base: [shadcn/ui](https://ui.shadcn.com), com tokens PRIZM.\n\n" +
          "Linha versátil com mídia, título, descrição e ações, para listas de configurações, notificações, arquivos e membros. Variantes `default`, `outline` e `muted`; tamanhos `default`, `sm` e `xs`.\n\n" +
          "- Com `href`, o Item é um `<a>`; com `interactive` e sem `href`, um `<button>`. Os dois ganham hover e foco.\n" +
          "- Num Item clicável, `actions` não leva botão: seria um controle dentro de outro (o Item avisa no console).\n\n" +
          '**Documentação base:** <a href="https://ui.shadcn.com/docs/components/item" target="_blank" rel="noopener noreferrer">Item — shadcn/ui</a>\n\n' +
          `[Componente no Figma](${FIGMA_URL}) · [Documentação no Figma](${FIGMA_DOC_URL}) · [Artigo no CMS](${CMS_URL}).`,
      },
    },
  },
  args: {
    variant: "default",
    size: "default",
    title: "Item title",
    description: "Item description",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline", "muted"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "xs"],
    },
    mediaVariant: {
      control: "select",
      options: ["default", "icon", "image"],
    },
    asChild: {
      control: "boolean",
    },
    interactive: {
      control: "boolean",
      description: "Hover e foco. Sem `href`, o Item renderiza um `<button>`.",
    },
    href: {
      control: "text",
      description: "Renderiza o Item como `<a>`.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Item>;

// (BadgeItem stories foram movidas para item/badge-item/badge-item.stories.tsx)

// (FileItem stories have been moved to file-item/file-item.stories.tsx)

export const Demo: Story = {
  parameters: {
    docs: {
      description: {
        story: "Demo of the Item component.",
      },
    },
  },
  render: () => (
    <div className="flex w-full max-w-md flex-col gap-6">
      <Item
        variant="outline"
        title="Basic Item"
        description="A simple item with title and description."
        actions={
          <Button variant="outline" size="sm">
            Action
          </Button>
        }
      />

      <Item
        variant="outline"
        size="sm"
        href="#"
        onClick={(e) => e.preventDefault()}
        media={<BadgeCheckIcon className="size-5" />}
        title="Your profile has been verified."
        actions={<ChevronRightIcon className="size-4" />}
      />
    </div>
  ),
};

export const Overview: Story = {
  parameters: {
    docs: {
      description: {
        story: "Overview of the Item component.",
      },
    },
  },
  render: () => (
    <div className="flex w-full max-w-md flex-col gap-3">
      <Item
        variant="outline"
        title="Notifications"
        description="Updates and alerts relevant to your account."
        actions={
          <Button variant="outline" size="sm">
            Manage
          </Button>
        }
      />
      <Item
        title="Team"
        description="Invite teammates and manage roles."
        actions={<ChevronRightIcon className="size-4" />}
      />
    </div>
  ),
};

export const Usage: Story = {
  parameters: {
    docs: {
      description: {
        story: "Usage of the Item component.",
      },
    },
  },
  render: () => (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Item
        mediaVariant="icon"
        media={<InboxIcon />}
        title="Title"
        description="Description"
        actions={<Button size="sm">Action</Button>}
      />
    </div>
  ),
};

export const ItemVsField: Story = {
  parameters: {
    docs: {
      description: {
        story: "Item vs Field.",
      },
    },
  },
  render: () => (
    <div className="grid w-full max-w-2xl grid-cols-1 gap-4 md:grid-cols-2">
      <div className="flex flex-col gap-3">
        <div className="text-muted-foreground text-sm font-medium">Item (conteúdo)</div>
        <Item
          variant="outline"
          title="Billing"
          description="Manage invoices and payment methods."
          actions={<ChevronRightIcon className="size-4" />}
        />
      </div>

      <div className="flex flex-col gap-3">
        <div className="text-muted-foreground text-sm font-medium">Field (input)</div>
        <Field>
          <FieldLabel className="w-full">
            <Checkbox aria-label="Enable feature" />
            <FieldContent>
              <FieldTitle>Enable feature</FieldTitle>
              <FieldDescription>Turns on the behavior for your account.</FieldDescription>
            </FieldContent>
          </FieldLabel>
        </Field>
      </div>
    </div>
  ),
};

export const Size: Story = {
  parameters: {
    docs: {
      description: {
        story: "Size of the Item component.",
      },
    },
  },
  render: () => (
    <div className="flex w-full max-w-md flex-col gap-6">
      <Item
        variant="outline"
        mediaVariant="icon"
        media={<InboxIcon />}
        title="Default Size"
        description="The standard size for most use cases."
      />
      <Item
        variant="outline"
        size="sm"
        mediaVariant="icon"
        media={<InboxIcon />}
        title="Small Size"
        description="A compact size for dense layouts."
      />
      <Item
        variant="outline"
        size="xs"
        mediaVariant="icon"
        media={<InboxIcon />}
        title="Extra Small Size"
        description="The most compact size available."
      />
    </div>
  ),
};

export const Icon: Story = {
  parameters: {
    docs: {
      description: {
        story: "Icon of the Item component.",
      },
    },
  },
  render: () => (
    <div className="flex w-full max-w-lg flex-col gap-6">
      <Item
        variant="outline"
        mediaVariant="icon"
        media={<ShieldAlertIcon />}
        title="Security Alert"
        description="New login detected from unknown device."
        actions={
          <Button size="sm" variant="outline">
            Review
          </Button>
        }
      />
    </div>
  ),
};

export const AvatarExample: Story = {
  parameters: {
    docs: {
      description: {
        story: "Avatar of the Item component.",
      },
    },
  },
  render: () => (
    <div className="flex w-full max-w-lg flex-col gap-6">
      <Item
        variant="outline"
        media={<Avatar src="https://github.com/evilrabbit.png" fallback="ER" />}
        title="Evil Rabbit"
        description="Last seen 5 months ago"
        actions={
          <Button size="icon-sm" variant="outline" className="rounded-full" aria-label="Invite">
            <PlusIcon />
          </Button>
        }
      />

      <Item
        variant="outline"
        media={
          <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
            <Avatar src="https://github.com/shadcn.png" fallback="CN" className="hidden sm:flex" />
            <Avatar
              src="https://github.com/maxleiter.png"
              fallback="LR"
              className="hidden sm:flex"
            />
            <Avatar src="https://github.com/evilrabbit.png" fallback="ER" />
          </div>
        }
        title="No Team Members"
        description="Invite your team to collaborate on this project."
        actions={
          <Button size="sm" variant="outline">
            Invite
          </Button>
        }
      />
    </div>
  ),
};

const music = [
  {
    title: "Midnight City Lights",
    artist: "Neon Dreams",
    album: "Electric Nights",
    duration: "3:45",
  },
  {
    title: "Coffee Shop Conversations",
    artist: "The Morning Brew",
    album: "Urban Stories",
    duration: "4:05",
  },
  {
    title: "Digital Rain",
    artist: "Cyber Symphony",
    album: "Binary Beats",
    duration: "3:30",
  },
];

export const Image: Story = {
  parameters: {
    docs: {
      description: {
        story: "Image of the Item component.",
      },
    },
  },
  render: () => (
    <div className="flex w-full max-w-md flex-col gap-4">
      {music.map((song) => (
        <Item
          key={song.title}
          variant="outline"
          href="#"
          onClick={(e) => e.preventDefault()}
          mediaVariant="image"
          media={
            <img
              src={`https://avatar.vercel.sh/${encodeURIComponent(song.title)}`}
              alt={song.title}
              className="object-cover grayscale"
            />
          }
          title={
            <span className="line-clamp-1">
              {song.title} - <span className="text-muted-foreground">{song.album}</span>
            </span>
          }
          description={song.artist}
          meta={<span className="text-muted-foreground text-sm">{song.duration}</span>}
        />
      ))}
    </div>
  ),
};

const people = [
  {
    username: "shadcn",
    avatar: "https://github.com/shadcn.png",
    email: "shadcn@vercel.com",
  },
  {
    username: "maxleiter",
    avatar: "https://github.com/maxleiter.png",
    email: "maxleiter@vercel.com",
  },
  {
    username: "evilrabbit",
    avatar: "https://github.com/evilrabbit.png",
    email: "evilrabbit@vercel.com",
  },
];

export const Group: Story = {
  parameters: {
    docs: {
      description: {
        story: "Group of the Item component.",
      },
    },
  },
  render: () => (
    <div className="flex w-full max-w-sm flex-col gap-3">
      {people.map((person) => (
        <Item
          key={person.username}
          variant="outline"
          media={
            <Avatar
              src={person.avatar}
              fallback={person.username[0] ?? "?"}
              className="grayscale"
            />
          }
          title={person.username}
          description={person.email}
          actions={
            <Button variant="ghost" size="icon" className="rounded-full" aria-label="Invite">
              <PlusIcon />
            </Button>
          }
        />
      ))}
    </div>
  ),
};

const models = [
  {
    name: "v0-1.5-sm",
    description: "Everyday tasks and UI generation.",
    image:
      "https://images.unsplash.com/photo-1650804068570-7fb2e3dbf888?q=80&w=640&auto=format&fit=crop",
  },
  {
    name: "v0-1.5-lg",
    description: "Advanced thinking or reasoning.",
    image:
      "https://images.unsplash.com/photo-1610280777472-54133d004c8c?q=80&w=640&auto=format&fit=crop",
  },
  {
    name: "v0-2.0-mini",
    description: "Open Source model for everyone.",
    image:
      "https://images.unsplash.com/photo-1602146057681-08560aee8cde?q=80&w=640&auto=format&fit=crop",
  },
];

export const Header: Story = {
  parameters: {
    docs: {
      description: {
        story: "Header of the Item component.",
      },
    },
  },
  render: () => (
    <div className="grid w-full max-w-xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {models.map((model) => (
        <Item
          key={model.name}
          variant="outline"
          header={
            <img
              src={model.image}
              alt={model.name}
              className="aspect-square w-full rounded-sm object-cover"
            />
          }
          title={model.name}
          description={model.description}
        />
      ))}
    </div>
  ),
};

export const Link: Story = {
  parameters: {
    docs: {
      description: {
        story: "Link of the Item component.",
      },
    },
  },
  render: () => (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Item
        href="#"
        onClick={(e) => e.preventDefault()}
        title="Visit our documentation"
        description="Learn how to get started with our components."
        actions={<ChevronRightIcon className="size-4" />}
      />

      <Item
        variant="outline"
        href="#"
        target="_blank"
        onClick={(e) => e.preventDefault()}
        title="External resource"
        description="Opens in a new tab with security attributes."
        actions={<ExternalLinkIcon className="size-4" />}
      />

      <Item
        href="/dashboard"
        onClick={(e) => e.preventDefault()}
        mediaVariant="icon"
        media={<HomeIcon />}
        title="Dashboard"
        description="Overview of your account and activity."
      />
    </div>
  ),
};

export const DropdownMenuExample: Story = {
  parameters: {
    docs: {
      description: {
        story: "DropdownMenu of the Item component.",
      },
    },
  },
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          Select <ChevronDownIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48" align="end">
        <DropdownMenuGroup>
          {people.map((person) => (
            <DropdownMenuItem key={person.username}>
              <Item
                interactive
                size="xs"
                className="w-full p-2"
                media={
                  <Avatar
                    src={person.avatar}
                    fallback={person.username[0] ?? "?"}
                    className="size-6.5 grayscale"
                  />
                }
                title={person.username}
                description={person.email}
                classes={{
                  content: "gap-0",
                  description: "leading-none",
                }}
              />
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const Interactive: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Item interativo com hover habilitado via prop `interactive`. Útil para rows clicáveis, triggers de popover ou itens de menu.",
      },
    },
  },
  render: () => (
    <div className="flex w-full max-w-md flex-col gap-3">
      <Item
        interactive
        variant="outline"
        title="Clickable item"
        description="Este item se comporta como um botão com estado de hover."
        onClick={() => {
          // noop — apenas demonstração
        }}
      />

      <Item
        interactive
        href="#"
        onClick={(e) => e.preventDefault()}
        title="Interactive link"
        description="Exemplo de item link com hover habilitado."
        actions={<ChevronRightIcon className="size-4" />}
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Cenários de uso (DS-79, Tarde de 12/11)
// ---------------------------------------------------------------------------

/**
 * Padrão "ação principal + ações secundárias" (decidido em 13/11, DS-79).
 * O Item não é clicável inteiro: o título é o botão ou link principal, com a área de
 * clique esticada sobre a linha (`after:absolute after:inset-0`), e os botões de
 * `actions` ficam acima dessa área (`relative z-10`). Assim não há controle dentro de
 * outro (WCAG 4.1.2), e o anel de foco do Item aparece quando a ação principal tem foco.
 */
const linhaComAcoes =
  "relative hover:bg-accent/80 has-[[data-acao-principal]:focus-visible]:ring-[3px] has-[[data-acao-principal]:focus-visible]:ring-ring has-[[data-acao-principal]:focus-visible]:ring-offset-2 has-[[data-acao-principal]:focus-visible]:ring-offset-ring-offset";
const acaoPrincipal =
  "text-left outline-none after:absolute after:inset-0 after:rounded-md after:content-['']";

export const CenarioEstatico: Story = {
  name: "Cenário · Estático",
  parameters: {
    docs: {
      description: {
        story:
          "Só informação. Sem `href` nem `interactive`, o Item não recebe foco nem muda no hover. Os botões de `actions` são os únicos controles da linha.",
      },
    },
  },
  render: () => (
    <div className="flex w-full max-w-md flex-col gap-3">
      <Item
        variant="outline"
        mediaVariant="icon"
        media={<MailIcon />}
        title="E-mail de cobrança"
        description="financeiro@acme.com.br"
        actions={
          <Button variant="outline" size="sm">
            Alterar
          </Button>
        }
      />
    </div>
  ),
};

export const CenarioClicavel: Story = {
  name: "Cenário · Clicável inteiro",
  parameters: {
    docs: {
      description: {
        story:
          "O item inteiro é o alvo: `href` para navegar, `interactive` para uma ação na mesma tela. É a saída para o \"card clicável\": o Card não tem estado, o Item `outline` com `header` tem.",
      },
    },
  },
  render: () => (
    <div className="grid w-full max-w-xl grid-cols-1 gap-4 sm:grid-cols-2">
      <Item
        variant="outline"
        href="#"
        onClick={(e) => e.preventDefault()}
        title="Painel da conta"
        description="Visão geral do uso e das faturas."
        actions={<ChevronRightIcon className="size-4" aria-hidden="true" />}
      />
      <Item
        variant="outline"
        interactive
        header={
          <img
            src={models[0]?.image}
            alt=""
            className="aspect-video w-full rounded-sm object-cover"
          />
        }
        title="Modelo de proposta"
        description="Abre a pré-visualização."
        onClick={() => {
          // demonstração
        }}
      />
    </div>
  ),
};

const conversas = [
  { id: "c1", titulo: "Proposta Acme", quando: "Atualizada há 2h" },
  { id: "c2", titulo: "Contrato Beta", quando: "Atualizada ontem" },
  { id: "c3", titulo: "Pedido 4521", quando: "Atualizada em 10/11" },
];

export const CenarioSelecionado: Story = {
  name: "Cenário · Selecionado com ações no hover",
  parameters: {
    docs: {
      description: {
        story:
          "A linha abre uma Sheet e fica selecionada: fundo `color/accent` e `aria-current=\"true\"` no botão principal. As ações aparecem no hover, no foco por teclado (`focus-within`) e sempre em tela de toque. No escuro, a descrição sobre `accent` cheio fica entre 4,06 e 4,13:1: exceção do time (13/11), registrada no Critério de acessibilidade.",
      },
    },
  },
  render: function Render() {
    const [selecionada, setSelecionada] = useState<string | null>("c3");
    const [aberta, setAberta] = useState(false);
    const origem = useRef<HTMLButtonElement | null>(null);
    const atual = conversas.find((c) => c.id === selecionada);
    return (
      <>
        <div role="list" className="flex w-full max-w-sm flex-col gap-1">
          {conversas.map((c) => {
            const sel = c.id === selecionada;
            return (
              <Item
                key={c.id}
                role="listitem"
                size="sm"
                className={`group/linha ${linhaComAcoes} ${sel ? "bg-accent hover:bg-accent" : ""}`}
                mediaVariant="icon"
                media={<MessageSquareIcon />}
                title={
                  <button
                    type="button"
                    data-acao-principal=""
                    aria-current={sel ? "true" : undefined}
                    className={acaoPrincipal}
                    onClick={(e) => {
                      origem.current = e.currentTarget;
                      setSelecionada(c.id);
                      setAberta(true);
                    }}
                  >
                    {c.titulo}
                  </button>
                }
                description={c.quando}
                actions={
                  <div className="relative z-10 flex gap-1 opacity-0 group-hover/linha:opacity-100 group-focus-within/linha:opacity-100 [@media(hover:none)]:opacity-100">
                    <Button variant="ghost" size="icon-sm" aria-label={`Renomear ${c.titulo}`}>
                      <PencilIcon />
                    </Button>
                    <Button variant="ghost" size="icon-sm" aria-label={`Excluir ${c.titulo}`}>
                      <Trash2Icon />
                    </Button>
                  </div>
                }
              />
            );
          })}
        </div>
        <Sheet
          open={aberta}
          onOpenChange={(v) => {
            setAberta(v);
            // A Sheet abre por estado, sem Trigger: o foco volta à linha à mão.
            if (!v) requestAnimationFrame(() => origem.current?.focus());
          }}
          title={atual?.titulo}
          description={atual?.quando}
          body={<p className="text-muted-foreground text-sm">Conteúdo da conversa.</p>}
        />
      </>
    );
  },
};

const notificacoes = [
  { id: "n1", titulo: "Nova proposta para aprovar", quando: "Há 5 min", lida: false },
  { id: "n2", titulo: "Contrato Beta assinado", quando: "Há 1h", lida: false },
];

export const CenarioAcaoIcone: Story = {
  name: "Cenário · Ação em botão de ícone",
  parameters: {
    docs: {
      description: {
        story:
          "Notificação ou e-mail: a linha abre o item e um botão de ícone faz uma ação rápida. Mesmo padrão do selecionado, com as ações sempre visíveis. Cada botão de ícone tem `aria-label` com o nome do item.",
      },
    },
  },
  render: function Render() {
    const [lista, setLista] = useState(notificacoes);
    return (
      <div role="list" className="flex w-full max-w-md flex-col gap-1">
        {lista.map((n) => (
          <Item
            key={n.id}
            role="listitem"
            size="sm"
            className={linhaComAcoes}
            mediaVariant="icon"
            media={<BellIcon />}
            title={
              <a
                href="#"
                data-acao-principal=""
                className={acaoPrincipal}
                onClick={(e) => e.preventDefault()}
              >
                {n.titulo}
              </a>
            }
            description={n.lida ? `${n.quando} · lida` : n.quando}
            actions={
              <div className="relative z-10 flex gap-1">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label={`Marcar como lida: ${n.titulo}`}
                  disabled={n.lida}
                  onClick={() =>
                    setLista((l) => l.map((x) => (x.id === n.id ? { ...x, lida: true } : x)))
                  }
                >
                  <CheckIcon />
                </Button>
              </div>
            }
          />
        ))}
      </div>
    );
  },
};

export const CenarioDownload: Story = {
  name: "Cenário · Download com cancelar",
  parameters: {
    docs: {
      description: {
        story:
          "Item estático com o Progress em `footer` e o botão de cancelar em `actions`. Como o Item não é clicável, o botão não fica dentro de outro controle. O Progress tem nome próprio (`aria-label`).",
      },
    },
  },
  render: function Render() {
    const [cancelado, setCancelado] = useState(false);
    return (
      <div className="flex w-full max-w-md flex-col gap-3">
        <Item
          variant="outline"
          mediaVariant="icon"
          media={<FileTextIcon />}
          title="relatorio-anual.pdf"
          description={cancelado ? "Download cancelado" : "3,2 MB de 8 MB"}
          actions={
            cancelado ? undefined : (
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Cancelar download de relatorio-anual.pdf"
                onClick={() => setCancelado(true)}
              >
                <XIcon />
              </Button>
            )
          }
          footer={
            cancelado ? undefined : (
              <Progress value={40} aria-label="Download de relatorio-anual.pdf" />
            )
          }
        />
      </div>
    );
  },
};
