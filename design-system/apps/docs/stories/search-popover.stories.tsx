import { Input } from "@grupoitss/prizm-ui/input";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useMemo, useState } from "react";
import { SearchPopover } from "@grupoitss/prizm-ui/search-popover";

const MEMBERS = [
  { id: "1", name: "Ana Souza", email: "ana@acme.com" },
  { id: "2", name: "Bruno Lima", email: "bruno@acme.com" },
  { id: "3", name: "Carla Mendes", email: "carla@acme.com" },
  { id: "4", name: "Diego Alves", email: "diego@acme.com" },
];

const meta: Meta<typeof SearchPopover> = {
  title: "Primários/SearchPopover",
  component: SearchPopover,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "popover ancorado a um campo de busca com lista de sugestões. Usa `Popover.Anchor` (não fecha ao clicar no input) e `modal={false}` para funcionar dentro de drawers.\n\n" +
          'O conteúdo marca `data-slot="popover-content"` para o dismiss correto ao clicar fora.\n\n' +
          "Uso típico no Cockpit: busca de membros no objeto (digite para filtrar, clique fora para fechar).",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof SearchPopover>;

export const SearchMember: Story = {
  name: "Busca de membros",
  render: function SearchMemberStory() {
    const [query, setQuery] = useState("");
    const [open, setOpen] = useState(false);

    const results = useMemo(() => {
      const q = query.trim().toLowerCase();
      if (!q) return MEMBERS;
      return MEMBERS.filter(
        (member) => member.name.toLowerCase().includes(q) || member.email.toLowerCase().includes(q),
      );
    }, [query]);

    return (
      <div className="max-w-sm">
        <SearchPopover
          open={open}
          onOpenChange={setOpen}
          anchor={
            <div>
              <Input
                size="md"
                placeholder="Buscar usuários…"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setOpen(true);
                }}
                onFocus={() => setOpen(true)}
              />
            </div>
          }
        >
          {results.length === 0 ? (
            <p className="px-3 py-2 text-sm text-muted-foreground">
              Nenhum resultado para “{query}”.
            </p>
          ) : (
            <ul className="py-1">
              {results.map((member) => (
                <li key={member.id}>
                  <button
                    type="button"
                    className="flex w-full flex-col items-start px-3 py-2 text-left text-sm hover:bg-accent"
                    onClick={() => {
                      setQuery(member.name);
                      setOpen(false);
                    }}
                  >
                    <span className="font-medium text-foreground">{member.name}</span>
                    <span className="text-muted-foreground">{member.email}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </SearchPopover>
      </div>
    );
  },
};

export const Open: Story = {
  name: "Aberto",
  render: () => (
    <div className="max-w-sm pb-40">
      <SearchPopover
        open
        onOpenChange={() => undefined}
        anchor={
          <div>
            <Input size="md" defaultValue="Ana" readOnly />
          </div>
        }
      >
        <p className="px-3 py-2 text-sm">Sugestões</p>
      </SearchPopover>
    </div>
  ),
};
