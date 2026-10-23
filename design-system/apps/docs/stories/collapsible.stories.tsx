import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { Button } from "@grupoitss/prizm-ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@grupoitss/prizm-ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@grupoitss/prizm-ui/collapsible";
import { Field, FieldGroup, FieldLabel } from "@grupoitss/prizm-ui/field";
import { Input } from "@grupoitss/prizm-ui/input";
import { ChevronDown } from "@grupoitss/prizm-ui/icons";
import { ChevronsUpDown, Maximize2, Minimize2 } from "@grupoitss/prizm-ui/icons";

const meta: Meta<typeof Collapsible> = {
  title: "Primários/Collapsible",
  component: Collapsible,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "API preferencial **por props** (sem subcomponentes). Base: [shadcn/ui](https://ui.shadcn.com) + Radix, com tokens PRIZM.\n\n" +
          "Collapsible do design system PRIZM. Conteúdo expansível com trigger.\n\n" +
          "**Uso recomendado (API por props):** `trigger`, `triggerIcon`, `children` (conteúdo). " +
          "Use `trigger={(isOpen) => ...}` para trigger que depende do estado (ex.: troca de ícone).\n\n" +
          "**Composição (escape hatch):** omita `trigger` e use CollapsibleTrigger + CollapsibleContent como children.\n\n" +
          '**Documentação base:** <a href="https://ui.shadcn.com/docs/components/collapsible" target="_blank" rel="noopener noreferrer">Collapsible — shadcn/ui</a> | ' +
          '<a href="https://www.radix-ui.com/docs/primitives/components/collapsible" target="_blank" rel="noopener noreferrer">Radix Collapsible</a>',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Collapsible>;

/**
 * **Basic** — API por props: `trigger`, `triggerIcon`, `children`.
 * Card com collapsible "Product details" e conteúdo com botão Learn More.
 */
export const Basic: Story = {
  render: () => (
    <Card className="mx-auto w-full max-w-sm">
      <CardContent>
        <Collapsible
          trigger="Product details"
          triggerIcon={
            <ChevronDown className="size-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
          }
          triggerClassName="w-full group"
          contentClassName="flex flex-col items-start gap-2 p-2.5 pt-0 text-sm"
          className="rounded-md data-[state=open]:bg-muted"
        >
          <div>This panel can be expanded or collapsed to reveal additional content.</div>
          <Button size="xs">Learn More</Button>
        </Collapsible>
      </CardContent>
    </Card>
  ),
};

/**
 * **Settings Panel** — Layout customizado (trigger ao lado dos campos). Usa composição.
 * Controlled; ícone alterna entre Maximize e Minimize.
 */
export const SettingsPanel: Story = {
  render: function SettingsPanelStory() {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
      <Card className="mx-auto w-full max-w-xs" size="sm">
        <CardHeader>
          <CardTitle>Radius</CardTitle>
          <CardDescription>Set the corner radius of the element.</CardDescription>
        </CardHeader>
        <CardContent>
          <Collapsible open={isOpen} onOpenChange={setIsOpen} className="flex items-start gap-2">
            <FieldGroup className="grid w-full grid-cols-2 gap-2">
              <Field>
                <FieldLabel htmlFor="radius-x" className="sr-only">
                  Radius X
                </FieldLabel>
                <Input id="radius-x" placeholder="0" defaultValue={0} />
              </Field>
              <Field>
                <FieldLabel htmlFor="radius-y" className="sr-only">
                  Radius Y
                </FieldLabel>
                <Input id="radius-y" placeholder="0" defaultValue={0} />
              </Field>
              <CollapsibleContent className="col-span-full grid grid-cols-2 gap-2">
                <Field>
                  <FieldLabel htmlFor="radius-x2" className="sr-only">
                    Radius X
                  </FieldLabel>
                  <Input id="radius-x2" placeholder="0" defaultValue={0} />
                </Field>
                <Field>
                  <FieldLabel htmlFor="radius-y2" className="sr-only">
                    Radius Y
                  </FieldLabel>
                  <Input id="radius-y2" placeholder="0" defaultValue={0} />
                </Field>
              </CollapsibleContent>
            </FieldGroup>
            <CollapsibleTrigger asChild>
              <Button variant="outline" size="icon">
                {isOpen ? <Minimize2 className="size-4" /> : <Maximize2 className="size-4" />}
              </Button>
            </CollapsibleTrigger>
          </Collapsible>
        </CardContent>
      </Card>
    );
  },
};

/**
 * **Order details** — Título e trigger na mesma linha; conteúdo expansível. Usa composição para layout exato.
 */
export const OrderDetails: Story = {
  render: function OrderDetailsStory() {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="flex w-[350px] flex-col gap-2">
        <div className="flex items-center justify-between gap-4 px-4">
          <h4 className="text-sm font-semibold">Order #4189</h4>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="icon" className="size-8">
              <ChevronsUpDown className="size-4" />
              <span className="sr-only">Toggle details</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <div className="flex items-center justify-between rounded-md border px-4 py-2 text-sm">
          <span className="text-muted-foreground">Status</span>
          <span className="font-medium">Shipped</span>
        </div>
        <CollapsibleContent className="flex flex-col gap-2">
          <div className="rounded-md border px-4 py-2 text-sm">
            <p className="font-medium">Shipping address</p>
            <p className="text-muted-foreground">100 Market St, San Francisco</p>
          </div>
          <div className="rounded-md border px-4 py-2 text-sm">
            <p className="font-medium">Items</p>
            <p className="text-muted-foreground">2x Studio Headphones</p>
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  },
};

/** API por props: aberto por padrão. */
export const OpenByDefault: Story = {
  args: {
    defaultOpen: true,
    trigger: "Content is open by default",
    triggerIcon: (
      <ChevronDown className="size-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
    ),
    triggerClassName: "w-full group",
  },
  render: (args) => (
    <Collapsible {...args} className="w-full max-w-md rounded-lg border border-border p-2">
      <div className="rounded-md border border-dashed border-border p-4 mt-2 text-sm text-muted-foreground">
        This content is visible when the component mounts.
      </div>
    </Collapsible>
  ),
};

/** Trigger com variant ghost (sem background no hover). */
export const TriggerVariantGhost: Story = {
  args: {
    trigger: "Ghost trigger",
    triggerVariant: "ghost",
    triggerIcon: (
      <ChevronDown className="size-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
    ),
    triggerClassName: "w-full group py-1",
  },
  render: (args) => (
    <Collapsible {...args} className="w-full max-w-md">
      <div className="pt-2 text-sm text-muted-foreground">
        Trigger with variant="ghost" has no background hover.
      </div>
    </Collapsible>
  ),
};
