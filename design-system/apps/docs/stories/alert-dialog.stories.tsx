import { Button } from "@grupoitss/prizm-ui/button";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { AlertDialog } from "@grupoitss/prizm-ui/alert-dialog";

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
