import { CircleAlert, TriangleAlert, CircleCheckBig, Info } from "@grupoitss/prizm-ui/icons";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Alert } from "@grupoitss/prizm-ui/alert";

const meta: Meta<typeof Alert> = {
  title: "Primários/Alert",
  component: Alert,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "API preferencial **por props** (sem subcomponentes). Base: [shadcn/ui](https://ui.shadcn.com) + Radix, com tokens PRIZM.\n\n" +
          'Alert do design system PRIZM. Uso recomendado: `<Alert title={} description={} icon={} variant={} />`. Título é obrigatório. Baseado em shadcn/ui.\n\n**Documentação:** <a href="https://ui.shadcn.com/docs/components/alert" target="_blank" rel="noopener noreferrer">Alert — shadcn/ui</a>',
      },
    },
  },
  args: {
    variant: "default",
    title: "Title",
    description: "Description text for the alert. You can add more details here.",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "warning", "success"],
    },
    title: { control: "text" },
    description: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  args: {
    variant: "default",
    icon: <Info className="size-4" />,
    title: "Information",
    description: "Description text for the alert. You can add more details here.",
  },
  render: (args) => <Alert {...args} />,
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    icon: <CircleAlert className="size-4" />,
    title: "Error",
    description: "Your session has expired. Please log in again.",
  },
  render: (args) => <Alert {...args} />,
};

export const Warning: Story = {
  args: {
    variant: "warning",
    icon: <TriangleAlert className="size-4" />,
    title: "Warning",
    description: "Your storage is almost full. Consider freeing up space.",
  },
  render: (args) => <Alert {...args} />,
};

export const Success: Story = {
  args: {
    variant: "success",
    icon: <CircleCheckBig className="size-4" />,
    title: "Success",
    description: "Your changes have been saved successfully.",
  },
  render: (args) => <Alert {...args} />,
};

export const WithoutIcon: Story = {
  args: {
    title: "Notice",
    description: "This is an alert without an icon.",
  },
  render: (args) => <Alert {...args} />,
};

export const TitleOnly: Story = {
  args: {
    title: "Quick notice",
  },
  render: (args) => <Alert {...args} />,
};
