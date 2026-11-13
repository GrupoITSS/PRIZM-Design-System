"use client";

import { Button, buttonVariants } from "@grupoitss/prizm-ui/button";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Toaster, toast } from "@grupoitss/prizm-ui/sonner";

const FIGMA_URL = "https://www.figma.com/design/7NPb3iuxjitMdpudp4yHTl?node-id=18482-48401";
const FIGMA_DOC_URL = "https://www.figma.com/design/7NPb3iuxjitMdpudp4yHTl?node-id=27062-3133";
const CMS_URL =
  "https://sgq.pas.app.br/cms/prizm_design_system/articles?articleId=98eee5c4-b39f-49b9-b7da-8982e20c2bfd&version=v1";

const meta: Meta<typeof Toaster> = {
  title: "Primários/Sonner",
  component: Toaster,
  tags: ["autodocs", "documentado"],
  parameters: {
    docs: {
      description: {
        component:
          "Notificação passageira (toast), sobre a biblioteca <code>sonner</code>. Base: [shadcn/ui](https://ui.shadcn.com/docs/components/sonner), com tokens PRIZM.\n\n" +
          "Renderize o `Toaster` uma vez, perto da raiz do app, e dispare com `toast()`, `toast.success()`, `.info()`, `.warning()`, `.error()`, `.loading()` ou `.promise()`, de `@grupoitss/prizm-ui/sonner`. Tons no padrão do Alert (`richColors` ligado por padrão), ação com o Button outline sm e sem botão fechar por padrão. Toast com ação: `duration` maior e a mesma ação fora do toast.\n\n" +
          '**Documentação oficial:** <a href="https://sonner.emilkowal.ski/getting-started" target="_blank" rel="noopener noreferrer">Sonner — Getting started</a>' +
          `\n\n[Componente no Figma](${FIGMA_URL}) · [Documentação no Figma](${FIGMA_DOC_URL}) · [Artigo no CMS](${CMS_URL}).`,
      },
    },
  },
  args: {
    richColors: true,
    closeButton: false,
  },
};

export default meta;
type Story = StoryObj<typeof Toaster>;

export const Demo: Story = {
  name: "Demo básica",
  render: (args) => (
    <>
      <Toaster {...args} />
      <Button
        onClick={() =>
          toast("Event has been created", {
            description: "Sunday, December 03, 2023 at 9:00 AM",
            // Toast com ação: mais tempo para chegar à ação pelo teclado (WCAG 2.2.1).
            duration: 10000,
            action: {
              label: "Undo",
              onClick: () => {
                console.log("Undo");
              },
            },
          })
        }
      >
        Show Toast
      </Button>
    </>
  ),
};

export const Types: Story = {
  name: "Tipos de toast",
  render: (args) => (
    <>
      <Toaster {...args} />
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => toast("Event has been created")}>Default</Button>
        <Button onClick={() => toast.success("Event has been created")}>Success</Button>
        <Button onClick={() => toast.info("Be at the area 10 minutes before the event time")}>
          Info
        </Button>
        <Button onClick={() => toast.warning("Event start time cannot be earlier than 8am")}>
          Warning
        </Button>
        <Button onClick={() => toast.error("Event has not been created")}>Error</Button>
        <Button
          onClick={() => {
            toast.promise<{ name: string }>(
              () => new Promise((resolve) => setTimeout(() => resolve({ name: "Event" }), 2000)),
              {
                loading: "Loading...",
                success: (data) => `${data.name} has been created`,
                error: "Error",
              },
            );
          }}
        >
          Promise
        </Button>
      </div>
    </>
  ),
};

export const WithDescription: Story = {
  name: "Com descrição",
  render: (args) => (
    <>
      <Toaster {...args} />
      <Button
        className="w-fit"
        onClick={() =>
          toast("Event has been created", {
            description: "Monday, January 3rd at 6:00pm",
          })
        }
      >
        Show Toast
      </Button>
    </>
  ),
};

export const Positions: Story = {
  name: "Posições",
  render: (args) => (
    <>
      <Toaster {...args} />
      <div className="flex flex-wrap justify-center gap-2">
        <Button onClick={() => toast("Event has been created", { position: "top-left" })}>
          Top Left
        </Button>
        <Button onClick={() => toast("Event has been created", { position: "top-center" })}>
          Top Center
        </Button>
        <Button onClick={() => toast("Event has been created", { position: "top-right" })}>
          Top Right
        </Button>
        <Button onClick={() => toast("Event has been created", { position: "bottom-left" })}>
          Bottom Left
        </Button>
        <Button onClick={() => toast("Event has been created", { position: "bottom-center" })}>
          Bottom Center
        </Button>
        <Button onClick={() => toast("Event has been created", { position: "bottom-right" })}>
          Bottom Right
        </Button>
      </div>
    </>
  ),
};

const COCKPIT_MAX_ALERTS = 3;

/**
 * Cockpit: tudo neutro (richColors desligado: card, border e foreground do Prizm) e o botão Ok
 * como Button default xs. Só a ação muda em relação ao Toaster; o resto vem dos tokens.
 */
const COCKPIT_TOAST_CLASS_NAMES = {
  actionButton: [
    buttonVariants({ variant: "default", size: "xs" }),
    "!h-control-height-xs !rounded-md !border-0 !bg-primary !px-2 !text-xs !font-medium !text-primary-foreground !shadow-xs hover:!bg-primary/80",
    "focus-visible:!ring-[3px] focus-visible:!ring-ring focus-visible:!ring-offset-2 focus-visible:!ring-offset-ring-offset",
  ].join(" "),
};

function dismissOldestToastIfNeeded() {
  const activeToasts = toast.getToasts().filter((item) => !("dismiss" in item && item.dismiss));

  if (activeToasts.length < COCKPIT_MAX_ALERTS) return;

  const oldest = activeToasts[activeToasts.length - 1];
  if (oldest && "id" in oldest) {
    toast.dismiss(oldest.id);
  }
}

function showCockpitToast(title: string, description?: string) {
  dismissOldestToastIfNeeded();
  toast(title, {
    description,
    duration: 5000,
    action: {
      label: "Ok",
      onClick: () => {},
    },
  });
}

/** Alerta flutuante do Cockpit: toast neutro, botão Ok, máx. 3 visíveis. Só tokens do Prizm. */
export const CockpitAlerta: Story = {
  name: "Cockpit — alerta (máx. 3 + Ok)",
  args: {
    position: "bottom-right",
    richColors: false,
    closeButton: false,
    visibleToasts: COCKPIT_MAX_ALERTS,
    toastOptions: {
      classNames: COCKPIT_TOAST_CLASS_NAMES,
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Padrão do Cockpit: toast neutro (`color/card`, `richColors` desligado), botão **Ok** (Button default xs, sem X) e no máximo **3** alertas visíveis ao mesmo tempo. Clique várias vezes para ver o limite.",
      },
    },
  },
  render: (args) => (
    <>
      <Toaster {...args} />
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={() => {
            const n = toast.getToasts().length + 1;
            showCockpitToast(`Notificação ${n}`, "Toast neutro com título, descrição e botão Ok.");
          }}
        >
          Mostrar alerta
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            for (let i = 1; i <= 4; i += 1) {
              showCockpitToast(`Alerta ${i}`, "Só os 3 mais recentes permanecem visíveis.");
            }
          }}
        >
          Disparar 4 (testa máx. 3)
        </Button>
      </div>
    </>
  ),
};
