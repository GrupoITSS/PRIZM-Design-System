import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@grupoitss/prizm-ui/command";
import { Calendar } from "@grupoitss/prizm-ui/icons";

const FIGMA_COMPONENT = "https://www.figma.com/design/7NPb3iuxjitMdpudp4yHTl?node-id=204-1144";
const FIGMA_DOC = "https://www.figma.com/design/7NPb3iuxjitMdpudp4yHTl?node-id=25907-3157";

const meta: Meta<typeof Command> = {
  title: "Primários/Command",
  component: Command,
  tags: ["autodocs", "documentado"],
  parameters: {
    docs: {
      description: {
        component:
          `[Componente no Figma](${FIGMA_COMPONENT}) · [Documentação no Figma](${FIGMA_DOC})\n\n` +
          "API preferencial **por props** (sem subcomponentes). Base: [shadcn/ui](https://ui.shadcn.com) + `cmdk`, com tokens PRIZM.\n\n" +
          "Command do design system PRIZM: lista de ações com busca. A pessoa digita para filtrar e escolhe pelo mouse ou pelo teclado.\n\n" +
          "- **API por props:** `groups`, `placeholder`, `emptyMessage` e `label` (nome da busca, padrão \"Buscar comandos\").\n" +
          "- **Composição:** `CommandInput`, `CommandList`, `CommandGroup`, `CommandItem`, `CommandShortcut` e `CommandSeparator`.\n" +
          "- **CommandDialog:** o mesmo Command num Dialog, aberto por um gatilho.\n\n" +
          '**Documentação base:** <a href="https://github.com/dip/cmdk" target="_blank" rel="noopener noreferrer">cmdk — GitHub</a> · <a href="https://ui.shadcn.com/docs/components/command" target="_blank" rel="noopener noreferrer">Command — shadcn/ui</a>',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Command>;

export const Basic: Story = {
  render: () => (
    <Command
      className="max-w-sm border"
      groups={[
        {
          heading: "Sugestões",
          items: [
            { icon: <Calendar />, label: "Calendário", shortcut: "⌘K" },
            { label: "Buscar emoji" },
            { label: "Calculadora" },
          ],
        },
        {
          heading: "Configurações",
          items: [{ label: "Perfil" }, { label: "Cobrança" }, { label: "Preferências" }],
        },
      ]}
    />
  ),
};

export const Composition: Story = {
  name: "Composição",
  render: () => (
    <Command className="max-w-sm border" label="Buscar páginas">
      <CommandInput placeholder="Buscar página…" />
      <CommandList>
        <CommandEmpty>Nenhuma página encontrada.</CommandEmpty>
        <CommandGroup heading="Páginas">
          <CommandItem>
            <Calendar />
            Agenda
            <CommandShortcut>⌘A</CommandShortcut>
          </CommandItem>
          <CommandItem>Relatórios</CommandItem>
          <CommandItem disabled>Arquivo (sem acesso)</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Conta">
          <CommandItem>Perfil</CommandItem>
          <CommandItem>Sair</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};

export const InDialog: Story = {
  name: "No Dialog",
  render: () => (
    <CommandDialog
      trigger={
        <button className="inline-flex items-center rounded-md border px-3 py-2 text-sm">
          Abrir comandos
        </button>
      }
    >
      <CommandInput placeholder="Digite um comando ou busque…" />
      <CommandList>
        <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
        <CommandGroup heading="Sugestões">
          <CommandItem>Calendário</CommandItem>
          <CommandItem>Buscar emoji</CommandItem>
          <CommandItem>Calculadora</CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  ),
};
