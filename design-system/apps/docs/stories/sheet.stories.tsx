import { Button } from "@grupoitss/prizm-ui/button";
import { Input } from "@grupoitss/prizm-ui/input";
import { Label } from "@grupoitss/prizm-ui/label";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Sheet } from "@grupoitss/prizm-ui/sheet";

const meta: Meta<typeof Sheet> = {
  title: "Compositions/Sheet",
  component: Sheet,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "painel lateral deslizante alinhado ao [Sheet — shadcn/ui](https://ui.shadcn.com/docs/components/radix/sheet).\n\n" +
          "API por props (sem subcomponentes): `trigger`, `title`, `description`, `body`, `footer`, `side`, `showCloseButton`.\n\n" +
          "O botão de fechar (X) reutiliza `dialogCloseButtonStyles` (`right-6 top-6`), o mesmo inset do Dialog.\n\n" +
          "Lados left/right usam `w-3/4 sm:max-w-sm` (padrão shadcn new-york). Para drawer de produto (~40rem), use `contentClassName` ou o Drawer do app.",
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
    showCloseButton: {
      control: "boolean",
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
          <Button>Save changes</Button>
          <Button variant="outline">Close</Button>
        </>
      }
    />
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua.
                </p>
              ))}
            </div>
          }
          footer={
            <>
              <Button>Save changes</Button>
              <Button variant="outline">Cancel</Button>
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
