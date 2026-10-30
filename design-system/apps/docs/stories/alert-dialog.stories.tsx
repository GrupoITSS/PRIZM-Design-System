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

const meta: Meta<typeof AlertDialog> = {
  title: "Compositions/AlertDialog",
  component: AlertDialog,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "API preferencial **por props** (sem subcomponentes). Base: [shadcn/ui](https://ui.shadcn.com) + Radix, com tokens PRIZM.\n\n" +
          'Alert Dialog do design system PRIZM. Uso recomendado: `<AlertDialog trigger={} title={} description={} actionText={} cancelText={} onAction={} onCancel={} />`. Baseado em shadcn/ui (Radix).\n\n**Documentação:** <a href="https://ui.shadcn.com/docs/components/radix/alert-dialog" target="_blank" rel="noopener noreferrer">Alert Dialog — shadcn/ui (Radix)</a>',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof AlertDialog>;

export const Default: Story = {
  render: () => (
    <AlertDialog
      trigger={<Button variant="outline">Open</Button>}
      title="Are you sure?"
      description="This action cannot be undone. This will permanently delete the item."
      cancelText="Cancel"
      actionText="Continue"
      onAction={() => console.log("Continued")}
      onCancel={() => console.log("Cancelled")}
    />
  ),
};

export const Primary: Story = {
  render: () => (
    <AlertDialog
      trigger={<Button variant="default">Continue</Button>}
      title="Are you sure?"
      description="This action cannot be undone. This will permanently delete the item."
      cancelText="Cancel"
      actionText="Continue"
      onAction={() => console.log("Continued")}
      onCancel={() => console.log("Cancelled")}
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
