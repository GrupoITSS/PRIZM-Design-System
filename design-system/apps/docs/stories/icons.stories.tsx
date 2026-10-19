import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  AlertCircle,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  ArrowUpDown,
  Bell,
  Bold,
  Bookmark,
  Check,
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Circle,
  Copy,
  CreditCard,
  Dot,
  Download,
  Expand,
  ExternalLink,
  File,
  FileCode,
  FileText,
  Filter,
  Folder,
  FolderOpen,
  FolderSearch,
  Heart,
  HelpCircle,
  Home,
  Info,
  Italic,
  Keyboard,
  Languages,
  Layout,
  Link,
  Loader,
  Loader2,
  LogOut,
  Mail,
  Minus,
  Monitor,
  Moon,
  MoreHorizontal,
  OctagonX,
  Palette,
  Pencil,
  Plus,
  Save,
  Search,
  Settings,
  Shield,
  Sun,
  Trash2,
  TriangleAlert,
  Underline,
  Upload,
  User,
  Users,
  X,
  XCircle,
} from "@grupoitss/prizm-ui/icons";

type IconEntry = {
  name: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

type IconGroup = {
  title: string;
  description: string;
  icons: IconEntry[];
};

const iconGroups: IconGroup[] = [
  {
    title: "Navigation & Arrows",
    description: "Navegação entre páginas, listas e flows.",
    icons: [
      { name: "ArrowLeft", Icon: ArrowLeft },
      { name: "ArrowRight", Icon: ArrowRight },
      { name: "ArrowUpDown", Icon: ArrowUpDown },
      { name: "ChevronDown", Icon: ChevronDown },
      { name: "ChevronLeft", Icon: ChevronLeft },
      { name: "ChevronRight", Icon: ChevronRight },
      { name: "ChevronUp", Icon: ChevronUp },
      { name: "Home", Icon: Home },
      { name: "ExternalLink", Icon: ExternalLink },
      { name: "Expand", Icon: Expand },
      { name: "MoreHorizontal", Icon: MoreHorizontal },
    ],
  },
  {
    title: "Actions & Objects",
    description: "Ações principais, edição, arquivos e recursos.",
    icons: [
      { name: "Plus", Icon: Plus },
      { name: "Minus", Icon: Minus },
      { name: "Check", Icon: Check },
      { name: "X", Icon: X },
      { name: "Trash2", Icon: Trash2 },
      { name: "Download", Icon: Download },
      { name: "Upload", Icon: Upload },
      { name: "Save", Icon: Save },
      { name: "Copy", Icon: Copy },
      { name: "Pencil", Icon: Pencil },
      { name: "Filter", Icon: Filter },
      { name: "Search", Icon: Search },
      { name: "Settings", Icon: Settings },
      { name: "LogOut", Icon: LogOut },
      { name: "Monitor", Icon: Monitor },
      { name: "Mail", Icon: Mail },
      { name: "CreditCard", Icon: CreditCard },
      { name: "Folder", Icon: Folder },
      { name: "FolderOpen", Icon: FolderOpen },
      { name: "FolderSearch", Icon: FolderSearch },
      { name: "File", Icon: File },
      { name: "FileText", Icon: FileText },
      { name: "FileCode", Icon: FileCode },
      { name: "Bookmark", Icon: Bookmark },
      { name: "Bell", Icon: Bell },
      { name: "Loader", Icon: Loader },
      { name: "Loader2", Icon: Loader2 },
    ],
  },
  {
    title: "Status & Feedback",
    description: "Estados de sistema, alertas, sucesso e erro.",
    icons: [
      { name: "AlertCircle", Icon: AlertCircle },
      { name: "AlertTriangle", Icon: AlertTriangle },
      { name: "TriangleAlert", Icon: TriangleAlert },
      { name: "OctagonX", Icon: OctagonX },
      { name: "Info", Icon: Info },
      { name: "HelpCircle", Icon: HelpCircle },
      { name: "CheckCircle", Icon: CheckCircle },
      { name: "Circle", Icon: Circle },
      { name: "Dot", Icon: Dot },
      { name: "Shield", Icon: Shield },
    ],
  },
  {
    title: "Text & Layout",
    description: "Edição de texto, formatação e estrutura.",
    icons: [
      { name: "Bold", Icon: Bold },
      { name: "Italic", Icon: Italic },
      { name: "Underline", Icon: Underline },
      { name: "Link", Icon: Link },
      { name: "Palette", Icon: Palette },
      { name: "Layout", Icon: Layout },
      { name: "Keyboard", Icon: Keyboard },
      { name: "Languages", Icon: Languages },
    ],
  },
  {
    title: "User & Theme",
    description: "Identidade de usuário e preferência de tema.",
    icons: [
      { name: "User", Icon: User },
      { name: "Users", Icon: Users },
      { name: "Heart", Icon: Heart },
      { name: "Sun", Icon: Sun },
      { name: "Moon", Icon: Moon },
      { name: "XCircle", Icon: XCircle },
    ],
  },
];

const meta: Meta = {
  title: "Tokens/Icons",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "API preferencial **por props** (sem subcomponentes). Base: [shadcn/ui](https://ui.shadcn.com) + Radix, com tokens PRIZM.\n\n" +
          "Icons are Lucide icons re-exported by `@grupoitss/prizm-ui/icons`. The gallery below mostra **apenas um subconjunto curado** para exemplos de uso — a biblioteca Lucide completa possui centenas de ícones adicionais. Sempre importe pelos nomes re-exportados no design system.",
      },
    },
  },
};

export default meta;

type Story = StoryObj;

export const AllIcons: Story = {
  render: () => (
    <div className="space-y-6 rounded-lg border border-border bg-card p-6">
      <p className="text-sm text-muted-foreground">
        Import icons from{" "}
        <code className="rounded bg-muted px-1 py-0.5 text-xs">@grupoitss/prizm-ui/icons</code>, for
        example:{" "}
        <code className="rounded bg-muted px-1 py-0.5 text-xs">
          import &#123; Plus, Search &#125; from &quot;@grupoitss/prizm-ui/icons&quot;
        </code>
        . This page shows a **representative subset** of the most common icons; Lucide includes many
        more if needed.
      </p>
      {iconGroups.map((group) => (
        <section key={group.title} className="space-y-3">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="text-sm font-semibold text-foreground">{group.title}</h3>
            <p className="text-xs text-muted-foreground">{group.description}</p>
          </div>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(7rem,1fr))] gap-4">
            {group.icons.map(({ name, Icon }) => (
              <div
                key={name}
                className="flex flex-col items-center gap-2 rounded-md border border-border bg-background p-4 text-center transition-colors hover:bg-accent/50"
              >
                <Icon className="size-6 text-foreground" aria-hidden />
                <span className="text-[11px] font-medium text-foreground/90">{name}</span>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  ),
};

export const IconSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-end gap-6 rounded-lg border border-border bg-card p-6">
      <div className="flex flex-col items-center gap-2">
        <Search className="size-3 text-foreground" aria-hidden />
        <span className="text-xs text-muted-foreground">size-3 (12px)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Search className="size-4 text-foreground" aria-hidden />
        <span className="text-xs text-muted-foreground">size-4 (16px)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Search className="size-5 text-foreground" aria-hidden />
        <span className="text-xs text-muted-foreground">size-5 (20px)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Search className="size-6 text-foreground" aria-hidden />
        <span className="text-xs text-muted-foreground">size-6 (24px)</span>
      </div>
    </div>
  ),
};
