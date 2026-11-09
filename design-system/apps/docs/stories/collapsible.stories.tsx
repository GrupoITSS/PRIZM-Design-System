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
import { Badge } from "@grupoitss/prizm-ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleToggle,
  CollapsibleTrigger,
} from "@grupoitss/prizm-ui/collapsible";
import { Field, FieldGroup, FieldLabel } from "@grupoitss/prizm-ui/field";
import { Input } from "@grupoitss/prizm-ui/input";
import { ChevronDown } from "@grupoitss/prizm-ui/icons";
import { GripVertical, Maximize2, Minimize2, Plus } from "@grupoitss/prizm-ui/icons";

// Traceability: the Collapsible / Trigger component set in [PRIZM] Componentes, the documentation
// frame and the CMS article. The token map lives next to the component (collapsible.tokens.json)
// and is checked against the classes in a test.
const FIGMA_URL = "https://www.figma.com/design/7NPb3iuxjitMdpudp4yHTl?node-id=26250-3011";
const FIGMA_DOC_URL = "https://www.figma.com/design/7NPb3iuxjitMdpudp4yHTl?node-id=26251-2005";
const CMS_URL =
  "https://sgq.pas.app.br/cms/prizm_design_system/articles?articleId=de046740-d9be-4dda-9a79-de9a38552fe0&version=v1";

const meta: Meta<typeof Collapsible> = {
  title: "Primários/Collapsible",
  component: Collapsible,
  tags: ["autodocs", "documentado"],
  parameters: {
    docs: {
      description: {
        component:
          "API preferencial **por props** (sem subcomponentes). Base: [shadcn/ui](https://ui.shadcn.com) + Radix, com tokens PRIZM.\n\n" +
          "Collapsible do design system PRIZM. Conteúdo expansível com trigger.\n\n" +
          "**Uso recomendado (API por props):** `trigger`, `triggerIcon`, `children` (conteúdo). " +
          "O ícone de `triggerIcon` gira 180° com o painel aberto. Use `trigger={(isOpen) => ...}` para trigger que depende do estado (ex.: troca de ícone).\n\n" +
          "**Composição (escape hatch):** omita `trigger` e use CollapsibleTrigger + CollapsibleContent como children. Com `asChild`, o gatilho é o Button do Prizm, com o estilo dele.\n\n" +
          `**Rastreabilidade:** <a href="${FIGMA_URL}" target="_blank" rel="noopener noreferrer">Componente no Figma</a> · <a href="${FIGMA_DOC_URL}" target="_blank" rel="noopener noreferrer">Documentação no Figma</a> · <a href="${CMS_URL}" target="_blank" rel="noopener noreferrer">Artigo no CMS</a> · <a href="https://ui.shadcn.com/docs/components/collapsible" target="_blank" rel="noopener noreferrer">Collapsible — shadcn/ui</a> · <a href="https://www.radix-ui.com/docs/primitives/components/collapsible" target="_blank" rel="noopener noreferrer">Radix Collapsible</a>`,
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
          triggerIcon={<ChevronDown />}
          contentClassName="flex flex-col items-start gap-2 px-2 pb-4 text-sm"
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
 * **Order details** — `CollapsibleToggle` e título na mesma linha; conteúdo expansível. No Figma, é a
 * variante API=Composition do set Collapsible: o toggle fixo antes do slot Header, e o slot Content.
 */
export const OrderDetails: Story = {
  render: function OrderDetailsStory() {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="flex w-[350px] flex-col gap-2">
        <div className="flex items-center gap-2 px-4">
          <CollapsibleToggle aria-label="Toggle order details" />
          <h4 className="text-sm font-semibold">Order #4189</h4>
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
    triggerIcon: <ChevronDown />,
  },
  render: (args) => (
    <Collapsible {...args} className="w-full max-w-md rounded-lg border border-border p-2">
      <div className="rounded-md border border-dashed border-border p-4 mt-2 text-sm text-muted-foreground">
        This content is visible when the component mounts.
      </div>
    </Collapsible>
  ),
};

/** Gatilho desabilitado: a 50%, sem abrir. */
export const Disabled: Story = {
  args: {
    disabled: true,
    trigger: "Product details",
    triggerIcon: <ChevronDown />,
  },
  render: (args) => (
    <Collapsible {...args} className="w-full max-w-md">
      <div className="px-2 pb-4 text-sm">This content is not reachable while disabled.</div>
    </Collapsible>
  ),
};

/**
 * **Category header** — Cabeçalho com outras ações ao lado (alça, nome, badge, Editar, Inativar,
 * Excluir) e só o `CollapsibleToggle` abre e fecha. Caso do Catálogo do Pricing.
 */
export const CategoryHeader: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Composição com `CollapsibleToggle`: o Button ghost icon-sm com ChevronRight, que gira 90° aberto. As outras ações do cabeçalho continuam clicáveis sem abrir o painel. Dê ao toggle o nome do que abre.",
      },
    },
  },
  render: function CategoryHeaderStory() {
    const [isOpen, setIsOpen] = React.useState(true);
    return (
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-full max-w-2xl rounded-lg border border-border"
      >
        <div className="flex items-center gap-2 px-2 py-2">
          <GripVertical aria-hidden="true" className="size-4 cursor-grab text-muted-foreground" />
          <CollapsibleToggle aria-label="Show Beverages products" />
          <span className="text-sm font-medium">Beverages</span>
          <Badge variant="secondary">Monthly</Badge>
          <div className="ml-auto flex items-center gap-1">
            <Button variant="ghost" size="sm">
              Edit
            </Button>
            <Button variant="ghost" size="sm">
              Deactivate
            </Button>
            <Button variant="ghost" size="sm">
              Delete
            </Button>
          </div>
        </div>
        <CollapsibleContent className="flex flex-col gap-2 border-t border-border px-4 py-3 text-sm">
          <div className="rounded-md border border-border px-4 py-2">Sparkling water</div>
          <div className="rounded-md border border-border px-4 py-2">Orange juice</div>
          <Button variant="outline" size="sm" className="self-start">
            <Plus /> Add product
          </Button>
        </CollapsibleContent>
      </Collapsible>
    );
  },
};
