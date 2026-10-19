import { Button } from "@grupoitss/prizm-ui/button";
import { Dialog } from "@grupoitss/prizm-ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@grupoitss/prizm-ui/field";
import { Input } from "@grupoitss/prizm-ui/input";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Minus, Plus } from "lucide-react";
import * as React from "react";
import { Bar, BarChart, ResponsiveContainer } from "recharts";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@grupoitss/prizm-ui/drawer";

const meta: Meta<typeof Drawer> = {
  title: "Compositions/Drawer",
  component: Drawer,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "API preferencial **por props** (sem subcomponentes). Base: [shadcn/ui](https://ui.shadcn.com) + Radix, com tokens PRIZM.\n\n" +
          "Drawer do design system PRIZM. Painel deslizante (bottom/top/left/right) baseado em Vaul, usando tokens de `@grupoitss/prizm-tokens` e **API simplificada por props** (`trigger`, `title`, `description`, `body`, `footer`).\n\n" +
          "Subcomponentes (`DrawerContent`, `DrawerHeader`, etc.) existem apenas como escape hatch — os exemplos principais usam sempre props.\n\n" +
          '**Documentação base:** <a href="https://vaul.emilkowal.ski/" target="_blank" rel="noopener noreferrer">Vaul</a>',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Drawer>;

/** Uso básico: formulário com trigger, title, description, body e footer. */
export const Basic: Story = {
  render: () => (
    <Drawer
      trigger={<Button variant="outline">Open Drawer</Button>}
      title="Edit profile"
      description="Make changes below. Click save when you're done."
      body={
        <FieldGroup className="px-4">
          <Field>
            <FieldLabel htmlFor="drawer-name">Name</FieldLabel>
            <Input id="drawer-name" name="name" defaultValue="Pedro Duarte" />
          </Field>
          <Field>
            <FieldLabel htmlFor="drawer-username">Username</FieldLabel>
            <Input id="drawer-username" name="username" defaultValue="@peduarte" />
          </Field>
        </FieldGroup>
      }
      footer={
        <>
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit">Save changes</Button>
        </>
      }
    />
  ),
};

/** Move Goal: meta diária com +/- e gráfico de barras. Tudo por props. */
const goalData = [
  { goal: 400 },
  { goal: 300 },
  { goal: 200 },
  { goal: 300 },
  { goal: 200 },
  { goal: 278 },
  { goal: 189 },
  { goal: 239 },
  { goal: 300 },
  { goal: 200 },
  { goal: 278 },
  { goal: 189 },
  { goal: 349 },
];

export const MoveGoal: Story = {
  render: function Render() {
    const [goal, setGoal] = React.useState(350);
    const onClick = (adjustment: number) => {
      setGoal((g) => Math.max(200, Math.min(400, g + adjustment)));
    };
    return (
      <Drawer
        trigger={<Button variant="outline">Open Drawer</Button>}
        title="Move Goal"
        description="Set your daily activity goal."
        body={
          <div className="mx-auto w-full max-w-sm p-4 pb-0">
            <div className="flex items-center justify-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => onClick(-10)}
                disabled={goal <= 200}
              >
                <Minus />
                <span className="sr-only">Decrease</span>
              </Button>
              <div className="flex-1 text-center">
                <div className="text-7xl font-bold tracking-tighter">{goal}</div>
                <div className="text-muted-foreground text-[0.70rem] uppercase">Calories/day</div>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => onClick(10)}
                disabled={goal >= 400}
              >
                <Plus />
                <span className="sr-only">Increase</span>
              </Button>
            </div>
            <div className="mt-3 h-[120px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={goalData}>
                  <Bar dataKey="goal" style={{ fill: "var(--prizm-color-chart-1)" }} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        }
        footer={
          <>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </>
        }
      />
    );
  },
};

/** Conteúdo rolável: header e footer fixos, body com scroll. side="right". */
const loremParagraph = (
  <p className="mb-4 leading-normal">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
    laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
    voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
    non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  </p>
);

export const ScrollableContent: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Keep actions visible while the content scrolls. Uses side="right".',
      },
    },
  },
  render: () => (
    <Drawer
      side="right"
      trigger={<Button variant="outline">Scrollable Content</Button>}
      title="Move Goal"
      description="Set your daily activity goal."
      body={
        <div className="no-scrollbar overflow-y-auto px-4">
          {Array.from({ length: 10 }).map((_, i) => (
            // eslint-disable-next-line @eslint-react/no-array-index-key -- static placeholder list
            <React.Fragment key={i}>{loremParagraph}</React.Fragment>
          ))}
        </div>
      }
      footer={
        <>
          <Button>Submit</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </>
      }
    />
  ),
};

/** Sides: side top, right, bottom, left. Cada um com mesmo conteúdo (props). */
const DRAWER_SIDES = ["top", "right", "bottom", "left"] as const;
const scrollableBody = (
  <div className="no-scrollbar overflow-y-auto px-4">
    {Array.from({ length: 10 }).map((_, i) => (
      // eslint-disable-next-line @eslint-react/no-array-index-key -- static placeholder list
      <React.Fragment key={i}>{loremParagraph}</React.Fragment>
    ))}
  </div>
);
const sideFooter = (
  <>
    <Button>Submit</Button>
    <DrawerClose asChild>
      <Button variant="outline">Cancel</Button>
    </DrawerClose>
  </>
);

export const Sides: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use the side prop to set where the drawer opens. Available: top, right, bottom, left.",
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-2">
      {DRAWER_SIDES.map((side) => (
        <Drawer
          key={side}
          side={side}
          trigger={
            <Button variant="outline" className="capitalize">
              {side}
            </Button>
          }
          title="Move Goal"
          description="Set your daily activity goal."
          body={scrollableBody}
          footer={sideFooter}
        />
      ))}
    </div>
  ),
};

/** Sem alça (handle). */
export const NoHandle: Story = {
  render: () => (
    <Drawer
      trigger={<Button variant="outline">Drawer without handle</Button>}
      title="No handle"
      description="This drawer doesn't show the drag handle."
      showHandle={false}
      body={<p className="px-4 py-2 text-sm text-muted-foreground">Content only.</p>}
      footer={<Button>Close</Button>}
    />
  ),
};

/** Apenas título e body. */
export const TitleOnly: Story = {
  render: () => (
    <Drawer
      trigger={<Button variant="outline">Title only</Button>}
      title="Simple drawer"
      body={<p className="px-4 py-2 text-sm">Body content here.</p>}
    />
  ),
};

/** Não fecha ao clicar fora nem com Escape; só pelo botão. */
export const NonDismissible: Story = {
  parameters: {
    docs: {
      description: { story: "dismissible={false}: close only via button." },
    },
  },
  render: () => (
    <Drawer
      dismissible={false}
      trigger={<Button variant="outline">Open (must use button to close)</Button>}
      title="Non-dismissible"
      description="Click outside or Escape won't close this drawer."
      body={<p className="px-4 py-2 text-sm">Use the button below to close.</p>}
      footer={
        <DrawerClose asChild>
          <Button variant="outline">Close</Button>
        </DrawerClose>
      }
    />
  ),
};

/** Não modal: fundo permanece interativo. */
export const NonModal: Story = {
  parameters: {
    docs: {
      description: { story: "modal={false}: background stays interactive." },
    },
  },
  render: () => (
    <Drawer
      modal={false}
      trigger={<Button variant="outline">Open (non-modal)</Button>}
      title="Non-modal drawer"
      description="You can interact with the page behind."
      body={<p className="px-4 py-2 text-sm">Close with button or by dragging.</p>}
      footer={
        <DrawerClose asChild>
          <Button>Close</Button>
        </DrawerClose>
      }
    />
  ),
};

/** Responsive: Dialog no “desktop” e Drawer no “mobile”. Toggle para simular. Ambos 100% props. */
function ProfileFormBody({ className }: { className?: string }) {
  return (
    <form className={className} onSubmit={(e) => e.preventDefault()}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="resp-email">Email</FieldLabel>
          <Input type="email" id="resp-email" defaultValue="shadcn@example.com" />
        </Field>
        <Field>
          <FieldLabel htmlFor="resp-username">Username</FieldLabel>
          <Input id="resp-username" defaultValue="@shadcn" />
        </Field>
      </FieldGroup>
      <Button type="submit">Save changes</Button>
    </form>
  );
}

export const ResponsiveDialog: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Combine Dialog and Drawer for responsive UX: Dialog on desktop, Drawer on mobile. Toggle below simulates viewport; in your app use useMediaQuery('(min-width: 768px)'). Both use props-based API.",
      },
    },
  },
  render: function Render() {
    const [open, setOpen] = React.useState(false);
    const [isDesktop, setIsDesktop] = React.useState(true);

    const trigger = <Button variant="outline">Edit Profile</Button>;

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">View:</span>
          <Button
            variant={isDesktop ? "default" : "outline"}
            size="sm"
            onClick={() => setIsDesktop(true)}
          >
            Desktop (Dialog)
          </Button>
          <Button
            variant={!isDesktop ? "default" : "outline"}
            size="sm"
            onClick={() => setIsDesktop(false)}
          >
            Mobile (Drawer)
          </Button>
        </div>

        {isDesktop ? (
          <Dialog
            open={open}
            onOpenChange={setOpen}
            trigger={trigger}
            title="Edit profile"
            description="Make changes to your profile here. Click save when you're done."
            body={<ProfileFormBody />}
            contentClassName="sm:max-w-[425px]"
          />
        ) : (
          <Drawer
            open={open}
            onOpenChange={setOpen}
            trigger={trigger}
            title="Edit profile"
            description="Make changes to your profile here. Click save when you're done."
            body={<ProfileFormBody className="px-4" />}
            footer={
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            }
          />
        )}
      </div>
    );
  },
};

/** Uso avançado com subcomponentes (escape hatch). */
export const Composition: Story = {
  parameters: {
    docs: {
      description: {
        story: "When you need full control over structure, use subcomponents.",
      },
    },
  },
  render: () => (
    <Drawer defaultOpen>
      <DrawerTrigger asChild>
        <Button variant="outline">Open (composition)</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Composition example</DrawerTitle>
          <DrawerDescription>When you need full control over structure.</DrawerDescription>
        </DrawerHeader>
        <p className="px-4 py-2 text-sm">Custom content.</p>
        <DrawerFooter>
          <Button>Done</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};
