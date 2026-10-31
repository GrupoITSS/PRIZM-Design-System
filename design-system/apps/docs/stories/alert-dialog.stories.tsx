import { Button } from "@grupoitss/prizm-ui/button";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@grupoitss/prizm-ui/alert-dialog";
import { Trash2 } from "@grupoitss/prizm-ui/icons";
import * as React from "react";

// Traceability: the component set in [PRIZM] Componentes, the documentation frame and the
// CMS article. The token map lives next to the component (alert-dialog.tokens.json) and is
// checked against the classes in a test.
const FIGMA_URL = "https://www.figma.com/design/7NPb3iuxjitMdpudp4yHTl?node-id=83-122";
const FIGMA_DOC_URL = "https://www.figma.com/design/7NPb3iuxjitMdpudp4yHTl?node-id=25767-2011";
const CMS_URL =
  "https://sgq.pas.app.br/cms/prizm_design_system/articles?articleId=fe5ac0c3-f27b-47a2-9ba9-a6de1ee0fae1&version=v1";

const meta: Meta<typeof AlertDialog> = {
  title: "Primários/AlertDialog",
  component: AlertDialog,
  tags: ["autodocs", "documentado"],
  parameters: {
    docs: {
      description: {
        component:
          "API preferencial **por props** (sem subcomponentes). Base: [shadcn/ui](https://ui.shadcn.com) + Radix, com tokens PRIZM.\n\n" +
          "Alert Dialog do design system PRIZM: confirma uma ação que não se desfaz. Uso recomendado: `<AlertDialog trigger={} title={} description={} icon={} actionText={} onAction={} onCancel={} />`. Com `trigger`, `title` é obrigatório. Para trocar a variante da ação ou esperar uma ação que demora, use a composição com o Button.\n\n" +
          'Não fecha clicando fora: só por Cancelar, pela ação ou pelo Esc (que também chama `onCancel`). Ao abrir, o foco vai para Cancelar.\n\n**Documentação:** <a href="https://ui.shadcn.com/docs/components/radix/alert-dialog" target="_blank" rel="noopener noreferrer">Alert Dialog — shadcn/ui (Radix)</a>' +
          `\n\n[Componente no Figma](${FIGMA_URL}) · [Documentação no Figma](${FIGMA_DOC_URL}) · [Artigo no CMS](${CMS_URL}).`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof AlertDialog>;

export const Default: Story = {
  render: () => (
    <AlertDialog
      trigger={<Button variant="outline">Abrir</Button>}
      title="Tem certeza?"
      description="Esta ação não pode ser desfeita. O item será excluído."
      actionText="Continuar"
      onAction={() => console.log("Continuou")}
      onCancel={() => console.log("Cancelou")}
    />
  ),
};

export const Primary: Story = {
  render: () => (
    <AlertDialog
      trigger={<Button variant="default">Publicar</Button>}
      title="Publicar alterações?"
      description="A nova versão fica visível para todos."
      actionText="Publicar"
      onAction={() => console.log("Publicou")}
      onCancel={() => console.log("Cancelou")}
    />
  ),
};

/** Media = Icon no Figma: mídia acima do título no celular e à esquerda a partir de 640px. */
export const ComIcone: Story = {
  name: "Com ícone",
  render: () => (
    <AlertDialog
      trigger={<Button variant="destructive">Excluir projeto</Button>}
      icon={<Trash2 />}
      title="Excluir projeto?"
      description="Esta ação não pode ser desfeita. O projeto e os arquivos serão removidos."
      actionText="Excluir projeto"
    />
  ),
};

/**
 * Ação que demora: composição com `<Button loading>` dentro de `AlertDialogAction` e `open`
 * controlado. O modal só fecha quando a ação termina.
 */
export const AcaoDemorada: Story = {
  name: "Ação que demora",
  render: function AcaoDemoradaStory() {
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    return (
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button variant="destructive">Excluir projeto</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogMedia>
              <Trash2 />
            </AlertDialogMedia>
            <AlertDialogTitle>Excluir projeto?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. O projeto e os arquivos serão removidos.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button variant="outline">Cancelar</Button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                variant="destructive"
                loading={loading}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                  event.preventDefault();
                  setLoading(true);
                  setTimeout(() => {
                    setLoading(false);
                    setOpen(false);
                  }, 1500);
                }}
              >
                {loading ? "Excluindo…" : "Excluir projeto"}
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  },
};
