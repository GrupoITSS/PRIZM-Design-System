import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@grupoitss/prizm-ui/command";
import { Calendar } from "lucide-react";

const meta: Meta<typeof Command> = {
  title: "Compositions/Command",
  component: Command,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "API preferencial **por props** (sem subcomponentes). Base: [shadcn/ui](https://ui.shadcn.com) + Radix, com tokens PRIZM.\n\n" +
          'Command do design system PRIZM. Menu de comandos / palette de busca construído sobre `cmdk`.\n\n**Uso recomendado (props diretas):** configurar grupos e itens via `groups`, com `placeholder` e `emptyMessage` por props. A API de composição com subcomponentes continua disponível apenas como escape hatch para cenários avançados.\n\n**Documentação base:** <a href="https://github.com/dip/cmdk" target="_blank" rel="noopener noreferrer">cmdk — GitHub</a> · <a href="https://ui.shadcn.com/docs/components/command" target="_blank" rel="noopener noreferrer">Command — shadcn/ui</a>',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Command>;

export const Basic: Story = {
  render: () => (
    <Command
      className="max-w-sm rounded-lg border"
      placeholder="Type a command or search..."
      emptyMessage="No results found."
      groups={[
        {
          heading: "Suggestions",
          items: [
            { icon: <Calendar />, label: "Calendar", shortcut: "⌘K" },
            { label: "Search Emoji" },
            { label: "Calculator" },
          ],
        },
        {
          heading: "Settings",
          items: [{ label: "Profile" }, { label: "Billing" }, { label: "Settings" }],
        },
      ]}
    />
  ),
};

export const InDialog: Story = {
  render: () => (
    <CommandDialog
      trigger={
        <button className="inline-flex items-center rounded-md border px-3 py-2 text-sm">
          Open Command
        </button>
      }
    >
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>Calendar</CommandItem>
          <CommandItem>Search Emoji</CommandItem>
          <CommandItem>Calculator</CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  ),
};
