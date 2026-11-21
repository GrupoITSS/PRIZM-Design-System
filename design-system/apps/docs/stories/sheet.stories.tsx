import { Badge } from "@grupoitss/prizm-ui/badge";
import { Button } from "@grupoitss/prizm-ui/button";
import { Input } from "@grupoitss/prizm-ui/input";
import { Label } from "@grupoitss/prizm-ui/label";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Ellipsis, Pencil } from "@grupoitss/prizm-ui/icons";
import { Sheet, sheetSizes } from "@grupoitss/prizm-ui/sheet";

// Traceability: the Sheet component set in [PRIZM] Componentes and the documentation frame. The
// token map lives next to the component (sheet.tokens.json) and is checked against the classes in
// a test.
const FIGMA_URL =
  "https://www.figma.com/design/7NPb3iuxjitMdpudp4yHTl?node-id=220-4633";
const FIGMA_DOC_URL =
  "https://www.figma.com/design/7NPb3iuxjitMdpudp4yHTl?node-id=27943-3264";

const meta: Meta<typeof Sheet> = {
  title: "Primários/Sheet",
  component: Sheet,
  tags: ["autodocs", "documentado"],
  parameters: {
    docs: {
      description: {
        component:
          "Painel deslizante a partir de uma borda da tela, alinhado ao [Sheet — shadcn/ui](https://ui.shadcn.com/docs/components/radix/sheet).\n\n" +
          "API por props (sem subcomponentes): `trigger`, `eyebrow`, `title`, `titleAdornment`, `description`, `headerActions`, `body`, `footer`, `footerLeading`, `side` e `size`.\n\n" +
          'O cabeçalho e o rodapé ficam fixos; só o corpo rola. O botão fechar é o `Button` ghost `icon-sm` do Prizm, com o nome `closeLabel` (padrão "Close"). Todo botão só de ícone em `headerActions` precisa de `aria-label`.\n\n' +
          "`size` usa a escala `max-width/*` do Core, a mesma do Dialog: `sm` (padrão nas laterais), `md`, `lg`, `xl`, `2xl` e `full` (padrão em `top` e `bottom`). No celular, as laterais ocupam 75% da tela e `top` e `bottom` a largura toda.\n\n" +
          `**Rastreabilidade:** <a href="${FIGMA_URL}" target="_blank" rel="noopener noreferrer">Componente no Figma</a> · <a href="${FIGMA_DOC_URL}" target="_blank" rel="noopener noreferrer">Documentação no Figma</a> · <a href="https://ui.shadcn.com/docs/components/radix/sheet" target="_blank" rel="noopener noreferrer">Sheet — shadcn/ui</a>`,
      },
    },
  },
  args: {
    side: "right",
    defaultOpen: false,
    showCloseButton: true,
  },
  argTypes: {
    side: {
      control: "inline-radio",
      options: ["left", "right", "top", "bottom"],
    },
    size: {
      control: "inline-radio",
      options: sheetSizes,
      description:
        "Largura máxima. Padrão: sm nas laterais, full em top e bottom.",
    },
    showCloseButton: {
      control: "boolean",
    },
    closeLabel: {
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Sheet>;

function ProfileFields() {
  return (
    <div className="grid gap-4 py-2">
      <div className="grid gap-2">
        <Label htmlFor="sheet-v2-name">Name</Label>
        <Input id="sheet-v2-name" defaultValue="Pedro Duarte" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="sheet-v2-username">Username</Label>
        <Input id="sheet-v2-username" defaultValue="@peduarte" />
      </div>
    </div>
  );
}

/** Demo oficial shadcn: Edit profile com campos + footer. */
export const Basic: Story = {
  name: "SheetDemo",
  render: (args) => (
    <Sheet
      {...args}
      trigger={<Button variant="outline">Open</Button>}
      title="Edit profile"
      description="Make changes to your profile here. Click save when you're done."
      body={<ProfileFields />}
      footer={
        <>
          <Button variant="outline">Cancel</Button>
          <Button>Save changes</Button>
        </>
      }
    />
  ),
};

/** Cabeçalho completo: eyebrow, Title Adornment e Header Actions, com Leading no rodapé. */
export const HeaderCombinations: Story = {
  render: (args) => (
    <Sheet
      {...args}
      trigger={<Button variant="outline">Open</Button>}
      eyebrow="Order #1234"
      title="Edit order"
      titleAdornment={<Badge variant="default">Active</Badge>}
      description="Make changes to the order here."
      headerActions={
        <>
          <Button variant="ghost" size="icon-sm" aria-label="Edit">
            <Pencil />
          </Button>
          <Button variant="ghost" size="icon-sm" aria-label="More actions">
            <Ellipsis />
          </Button>
        </>
      }
      body={<ProfileFields />}
      footerLeading={<Button variant="link">Learn more</Button>}
      footer={
        <>
          <Button variant="outline">Cancel</Button>
          <Button>Save</Button>
        </>
      }
    />
  ),
};

/** `size`: sm a 2xl nas laterais; em top e bottom, também full. */
export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-2">
      {(["sm", "md", "lg", "xl", "2xl"] as const).map((size) => (
        <Sheet
          key={size}
          {...args}
          size={size}
          trigger={<Button variant="outline">{size}</Button>}
          title="Edit profile"
          description="Make changes to your profile here."
          body={<ProfileFields />}
          footer={
            <>
              <Button variant="outline">Cancel</Button>
              <Button>Save</Button>
            </>
          }
        />
      ))}
    </div>
  ),
};

/** `side`: top | right | bottom | left */
export const Sides: Story = {
  name: "SheetSide",
  render: (args) => (
    <div className="flex flex-wrap gap-2">
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <Sheet
          key={side}
          {...args}
          side={side}
          trigger={
            <Button variant="outline" className="capitalize">
              {side}
            </Button>
          }
          title="Edit profile"
          description="Make changes to your profile here. Click save when you're done."
          body={
            <div className="space-y-2 text-sm leading-relaxed text-muted-foreground">
              {Array.from({ length: 6 }).map((_, index) => (
                // eslint-disable-next-line @eslint-react/no-array-index-key -- static placeholder list
                <p key={index}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              ))}
            </div>
          }
          footer={
            <>
              <Button variant="outline">Cancel</Button>
              <Button>Save changes</Button>
            </>
          }
        />
      ))}
    </div>
  ),
};

export const NoCloseButton: Story = {
  render: (args) => (
    <Sheet
      {...args}
      trigger={<Button variant="outline">Open Sheet</Button>}
      title="No Close Button"
      description="This sheet doesn't have a close button in the top-right corner. Click outside to close."
      showCloseButton={false}
      body={<ProfileFields />}
    />
  ),
};

/** Largura custom (ex.: painel de produto ~40rem). */
export const WideProductPanel: Story = {
  render: (args) => (
    <Sheet
      {...args}
      side="right"
      contentClassName="w-full sm:max-w-none sm:w-[40rem]"
      trigger={<Button variant="outline">Open wide sheet</Button>}
      title="Organização"
      description="Painel largo via contentClassName (padrão Cockpit ~40rem)."
      body={<ProfileFields />}
      footer={
        <>
          <Button variant="outline">Cancelar</Button>
          <Button>Salvar</Button>
        </>
      }
    />
  ),
};
