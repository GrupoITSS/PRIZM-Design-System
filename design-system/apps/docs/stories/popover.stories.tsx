import { Button } from "@grupoitss/prizm-ui/button";
import { Field, FieldGroup, FieldLabel } from "@grupoitss/prizm-ui/field";
import { Input } from "@grupoitss/prizm-ui/input";
import { Label } from "@grupoitss/prizm-ui/label";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Popover } from "@grupoitss/prizm-ui/popover";

const FIGMA_COMPONENT = "https://www.figma.com/design/7NPb3iuxjitMdpudp4yHTl?node-id=26059-2317";
const FIGMA_DOC = "https://www.figma.com/design/7NPb3iuxjitMdpudp4yHTl?node-id=26060-3477";

const meta: Meta<typeof Popover> = {
  title: "Primários/Popover",
  component: Popover,
  tags: ["autodocs", "documentado"],
  parameters: {
    docs: {
      description: {
        component:
          `[Componente no Figma](${FIGMA_COMPONENT}) · [Documentação no Figma](${FIGMA_DOC})\n\n` +
          "API preferencial **por props** (sem subcomponentes). Base: [shadcn/ui](https://ui.shadcn.com) + Radix, com tokens PRIZM.\n\n" +
          "Popover do design system PRIZM: painel flutuante preso a um gatilho, para conteúdo curto e interativo. Uso: `<Popover trigger={...} content={...} />`.\n\n" +
          "- **Tamanhos:** `size` `sm` (224px, menus de ação), `md` (288px, padrão) e `lg` (384px).\n" +
          "- **Nome:** o conteúdo é `role=\"dialog\"`. Passe `aria-label` ou `aria-labelledby` em `contentProps`; sem nome, o Popover avisa no console em desenvolvimento.\n\n" +
          "**Documentação base:** " +
          '<a href="https://ui.shadcn.com/docs/components/radix/popover" target="_blank" rel="noopener noreferrer">' +
          "Popover — shadcn/ui (Radix)" +
          "</a>",
      },
    },
  },
  args: {
    trigger: <Button variant="outline">Abrir popover</Button>,
    content: "Conteúdo do popover",
    align: "center",
  },
  argTypes: {
    trigger: {
      control: false,
      description:
        "Elemento React que dispara a abertura/fechamento do popover. Renderizado via `asChild` no trigger do Radix.",
    },
    content: {
      control: false,
      description: "Conteúdo React exibido dentro do popover.",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Largura base do conteúdo do popover.",
    },
    align: {
      control: "select",
      options: ["start", "center", "end"],
      description: "Alinhamento horizontal do popover em relação ao trigger.",
    },
    side: {
      control: "select",
      options: ["top", "right", "bottom", "left"],
      description: "Lado em que o popover aparece em relação ao trigger.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Popover>;

/**
 * 1. PopoverDemo — exemplo com campos de dimensão.
 *
 * Conversão direta do exemplo de referência, mas usando a API props-based:
 * `trigger` e `content` em vez de subcomponentes `PopoverTrigger` e `PopoverContent`.
 */
export const PopoverDemo: Story = {
  render: () => (
    <Popover
      contentProps={{ "aria-label": "Dimensões" }}
      trigger={<Button variant="outline">Abrir popover</Button>}
      content={
        <div className="w-full">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Dimensões</h4>
              <p className="text-sm text-muted-foreground">Defina as dimensões da camada.</p>
            </div>
            <div className="grid gap-2">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="width">Largura</Label>
                <Input id="width" defaultValue="100%" className="col-span-2 h-8" />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="maxWidth">Largura máx.</Label>
                <Input id="maxWidth" defaultValue="300px" className="col-span-2 h-8" />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="height">Altura</Label>
                <Input id="height" defaultValue="25px" className="col-span-2 h-8" />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="maxHeight">Altura máx.</Label>
                <Input id="maxHeight" defaultValue="none" className="col-span-2 h-8" />
              </div>
            </div>
          </div>
        </div>
      }
    />
  ),
};

/**
 * 2. Basic — popover simples com header, título e descrição.
 *
 * Adaptado do exemplo `PopoverBasic` do arquivo de referência.
 */
export const Basic: Story = {
  render: () => (
    <Popover
      contentProps={{ "aria-label": "Dimensões" }}
      trigger={<Button variant="outline">Abrir popover</Button>}
      align="start"
      content={
        <div className="space-y-2">
          <div className="space-y-1">
            <h4 className="font-medium leading-none">Dimensões</h4>
            <p className="text-sm text-muted-foreground">Defina as dimensões da camada.</p>
          </div>
        </div>
      }
    />
  ),
};

/**
 * 3. Align — demonstra os diferentes alinhamentos usando a prop `align`.
 *
 * Adaptado do exemplo `PopoverAlignments`.
 */
export const Alignments: Story = {
  render: () => (
    <div className="flex gap-6">
      <Popover
        contentProps={{ "aria-label": "Alinhamento" }}
        trigger={
          <Button variant="outline" size="sm">
            Início
          </Button>
        }
        align="start"
        content={<div className="w-40">Alinhado ao início</div>}
      />

      <Popover
        contentProps={{ "aria-label": "Alinhamento" }}
        trigger={
          <Button variant="outline" size="sm">
            Centro
          </Button>
        }
        align="center"
        content={<div className="w-40">Alinhado ao centro</div>}
      />

      <Popover
        contentProps={{ "aria-label": "Alinhamento" }}
        trigger={
          <Button variant="outline" size="sm">
            Fim
          </Button>
        }
        align="end"
        content={<div className="w-40">Alinhado ao fim</div>}
      />
    </div>
  ),
};

/**
 * 4. With Form — popover com campos de formulário dentro.
 *
 * Adaptado do exemplo `PopoverForm`, usando `Field`, `FieldGroup` e `FieldLabel`
 * do design system.
 */
export const WithForm: Story = {
  render: () => (
    <Popover
      contentProps={{ "aria-label": "Dimensões" }}
      trigger={<Button variant="outline">Abrir popover</Button>}
      align="start"
      content={
        <div className="w-64 space-y-4">
          <div className="space-y-1">
            <h4 className="font-medium leading-none">Dimensões</h4>
            <p className="text-sm text-muted-foreground">Defina as dimensões da camada.</p>
          </div>
          <FieldGroup className="gap-4">
            <Field orientation="horizontal">
              <FieldLabel htmlFor="width" className="w-1/2">
                Width
              </FieldLabel>
              <Input id="width" defaultValue="100%" />
            </Field>
            <Field orientation="horizontal">
              <FieldLabel htmlFor="height" className="w-1/2">
                Height
              </FieldLabel>
              <Input id="height" defaultValue="25px" />
            </Field>
          </FieldGroup>
        </div>
      }
    />
  ),
};

/**
 * Tamanhos (`sm` | `md` | `lg`) — `sm` é o usado em menus de ação (sem padding interno).
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-start gap-6">
      {(["sm", "md", "lg"] as const).map((size) => (
        <Popover
          contentProps={{ "aria-label": "Tamanho" }}
          key={size}
          size={size}
          trigger={
            <Button variant="outline" size="sm">
              size={size}
            </Button>
          }
          content={
            <div className={size === "sm" ? "px-3 py-2 text-sm" : "text-sm"}>
              Popover <strong>{size}</strong>
            </div>
          }
        />
      ))}
    </div>
  ),
};

/** Lados (`top` | `right` | `bottom` | `left`). */
export const Sides: Story = {
  render: () => (
    <div className="flex flex-wrap items-center justify-center gap-8 py-16">
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <Popover
          contentProps={{ "aria-label": "Lado" }}
          key={side}
          side={side}
          trigger={
            <Button variant="outline" size="sm">
              {side}
            </Button>
          }
          content={<div className="w-36 text-sm">Abrindo por {side}</div>}
        />
      ))}
    </div>
  ),
};

/**
 * Menu de ações (padrão Cockpit ActionPopover) — `size="sm"`, lista de botões.
 */
export const ActionMenu: Story = {
  render: () => (
    <Popover
      contentProps={{ "aria-label": "Ações" }}
      size="sm"
      align="end"
      side="bottom"
      trigger={
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-8 text-muted-foreground"
          aria-label="Abrir menu de ações"
        >
          ⋮
        </Button>
      }
      content={
        <div className="flex min-w-[10rem] flex-col gap-0.5 py-1">
          <button
            type="button"
            className="rounded-md px-3 py-2 text-left text-sm text-foreground transition-colors hover:bg-accent"
          >
            Editar
          </button>
          <button
            type="button"
            className="rounded-md px-3 py-2 text-left text-sm text-foreground transition-colors hover:bg-accent"
          >
            Duplicar
          </button>
          <button
            type="button"
            className="rounded-md px-3 py-2 text-left text-sm text-destructive transition-colors hover:bg-destructive/10"
          >
            Excluir
          </button>
        </div>
      }
    />
  ),
};

/** Controlado via `open` / `onOpenChange`. */
export const Controlled: Story = {
  render: function ControlledPopover() {
    const [open, setOpen] = useState(false);
    return (
      <div className="flex flex-col items-start gap-3">
        <Button variant="outline" onClick={() => setOpen(true)}>
          Abrir programaticamente
        </Button>
        <Popover
          contentProps={{ "aria-label": "Popover controlado" }}
          open={open}
          onOpenChange={setOpen}
          trigger={<Button variant="secondary">Abrir</Button>}
          content={
            <div className="space-y-2">
              <p className="text-sm">Popover controlado</p>
              <Button size="sm" onClick={() => setOpen(false)}>
                Fechar
              </Button>
            </div>
          }
        />
      </div>
    );
  },
};
