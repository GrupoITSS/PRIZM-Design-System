import type { Meta, StoryObj } from "@storybook/react-vite";
import * as icons from "@grupoitss/prizm-ui/icons";
import {
  CircleAlert,
  CircleCheckBig,
  ExternalLink,
  Info,
  Search,
  TriangleAlert,
} from "@grupoitss/prizm-ui/icons";
import type { LucideIcon } from "@grupoitss/prizm-ui/icons";

const FIGMA_URL =
  "https://www.figma.com/design/7NPb3iuxjitMdpudp4yHTl?node-id=1-433";
const FIGMA_DOC_URL =
  "https://www.figma.com/design/7NPb3iuxjitMdpudp4yHTl?node-id=25303-1957";
const CMS_URL =
  "https://sgq.pas.app.br/cms/prizm_design_system/articles?articleId=26fad0ad-6c9f-47f9-abd7-23762308dc87&version=v1";

// Todos os ícones exportados, em ordem alfabética (os tipos somem em tempo de execução).
const catalogo = Object.entries(
  icons as unknown as Record<string, LucideIcon>,
).sort(([a], [b]) => a.localeCompare(b, "en", { sensitivity: "base" }));
const PROPRIOS = ["FileCsv", "FileDoc", "FilePdf", "Inactive"];

const TAMANHOS = [
  { classe: "size-3", px: 12, traco: "1px" },
  { classe: "size-4", px: 16, traco: "1,33px" },
  { classe: "size-5", px: 20, traco: "1,67px" },
  { classe: "size-6", px: 24, traco: "2px" },
] as const;

type PlaygroundArgs = {
  icone: string;
  tamanho: (typeof TAMANHOS)[number]["classe"];
  cor: string;
};

const meta: Meta<PlaygroundArgs> = {
  title: "Tokens/Icons",
  tags: ["autodocs", "documentado"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          `[Ícones no Figma](${FIGMA_URL}) · [Documentação no Figma](${FIGMA_DOC_URL}) · [Artigo no CMS](${CMS_URL}).\n\n` +
          `Ícones de interface do Prizm: **${catalogo.length} ícones**, uma lista curada do [Lucide](https://lucide.dev) mais três ícones de arquivo próprios (FileCsv, FileDoc e FilePdf). ` +
          "Importe sempre de `@grupoitss/prizm-ui/icons`, nunca de `lucide-react`.\n\n" +
          "O ícone herda a cor do texto (`currentColor`). O tamanho vem da classe `size-3` a `size-6`, e o traço escala junto. " +
          "Ícone decorativo sai com `aria-hidden`; ícone que carrega a informação sozinho precisa de `aria-label`.",
      },
    },
  },
  argTypes: {
    icone: {
      control: "select",
      options: catalogo.map(([nome]) => nome),
      description: "Nome exportado por @grupoitss/prizm-ui/icons.",
    },
    tamanho: {
      control: "inline-radio",
      options: TAMANHOS.map((t) => t.classe),
      description: "Classe de tamanho: 12, 16, 20 ou 24px.",
    },
    cor: {
      control: "select",
      options: [
        "text-foreground",
        "text-muted-foreground",
        "text-primary",
        "text-destructive",
        "text-success",
        "text-warning",
        "text-info",
      ],
      description: "Cor do texto do pai; o ícone herda por currentColor.",
    },
  },
  args: { icone: "Search", tamanho: "size-6", cor: "text-foreground" },
};

export default meta;

type Story = StoryObj<PlaygroundArgs>;

export const Playground: Story = {
  render: ({ icone, tamanho, cor }) => {
    const Icon =
      (icons as unknown as Record<string, LucideIcon>)[icone] ?? Search;
    return (
      <div className={`flex items-center gap-3 ${cor}`}>
        <Icon className={tamanho} />
        <code className="text-sm">{icone}</code>
      </div>
    );
  },
};

export const Catalogo: Story = {
  name: "Catálogo",
  render: () => (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        {catalogo.length} ícones exportados por{" "}
        <code className="rounded bg-muted px-1 py-0.5 text-xs">
          @grupoitss/prizm-ui/icons
        </code>
        . Em destaque, os próprios do Prizm. Ícone que não está aqui não existe
        no pacote: peça a inclusão com uma issue.
      </p>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(8rem,1fr))] gap-2">
        {catalogo.map(([nome, Icon]) => (
          <div
            key={nome}
            className={`flex flex-col items-center gap-2 rounded-md p-4 text-center ${
              PROPRIOS.includes(nome) ? "bg-primary-weak" : "bg-muted"
            }`}
          >
            <Icon className="size-6 text-foreground" />
            <span className="font-mono text-[11px] text-muted-foreground">
              {nome}
            </span>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const Tamanhos: Story = {
  render: () => (
    <div className="flex flex-wrap items-end gap-10 rounded-lg bg-muted p-6">
      {TAMANHOS.map(({ classe, px, traco }) => (
        <div key={classe} className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-3 text-foreground">
            <icons.Search className={classe} />
            <icons.Settings className={classe} />
            <icons.FilePdf className={classe} />
          </div>
          <code className="text-xs text-foreground">
            {classe} · {px}px
          </code>
          <span className="text-xs text-muted-foreground">traço {traco}</span>
        </div>
      ))}
    </div>
  ),
};

export const Cor: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6">
      {(
        [
          ["text-foreground", Info],
          ["text-muted-foreground", Search],
          ["text-primary", ExternalLink],
          ["text-destructive", CircleAlert],
          ["text-success", CircleCheckBig],
          ["text-warning", TriangleAlert],
        ] as const
      ).map(([classe, Icon]) => (
        <div key={classe} className={`flex items-center gap-2 ${classe}`}>
          <Icon className="size-5" />
          <code className="text-xs">{classe}</code>
        </div>
      ))}
    </div>
  ),
};

export const ComNome: Story = {
  name: "Com nome acessível",
  render: () => (
    <div className="flex items-center gap-6 text-foreground">
      <span className="flex items-center gap-2">
        <icons.Plus className="size-4" />
        Novo item{" "}
        <code className="text-xs text-muted-foreground">
          (decorativo: aria-hidden)
        </code>
      </span>
      <span className="flex items-center gap-2">
        <CircleAlert className="size-4 text-destructive" aria-label="Erro" />
        <code className="text-xs text-muted-foreground">
          (sozinho: aria-label)
        </code>
      </span>
    </div>
  ),
};
