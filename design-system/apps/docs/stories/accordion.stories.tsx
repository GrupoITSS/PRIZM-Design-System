import type { Meta, StoryObj } from "@storybook/react-vite";
import { Accordion } from "@grupoitss/prizm-ui/accordion";

const meta: Meta<typeof Accordion> = {
  title: "Primários/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "API preferencial **por props** (sem subcomponentes). Base: [shadcn/ui](https://ui.shadcn.com) + Radix, com tokens PRIZM.\n\n" +
          'Accordion do design system PRIZM.\n\n**Uso recomendado (API simplificada):** passe `items` para não precisar usar subcomponentes.\n\n**Uso avançado (composição):** ainda é possível usar `AccordionItem`, `AccordionTrigger` e `AccordionContent` diretamente.\n\nBordas neutras (border-border). Baseado em shadcn/ui + Radix.\n\n**Documentação:** <a href="https://ui.shadcn.com/docs/components/accordion" target="_blank" rel="noopener noreferrer">Accordion — shadcn/ui</a>',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: () => (
    <Accordion
      type="single"
      collapsible
      className="w-full max-w-md"
      items={[
        {
          value: "item-1",
          trigger: "Is it accessible?",
          content:
            "Yes. It uses Radix Accordion primitives under the hood, with neutral borders and PRIZM tokens.",
        },
        {
          value: "item-2",
          trigger: "Is it styled?",
          content:
            "Yes. It uses border-border and text-foreground/muted-foreground from @grupoitss/prizm-tokens, with accordion-down/up animations.",
        },
        {
          value: "item-3",
          trigger: "Can it be multiple?",
          content: (
            <>
              Yes. Use <code>type=\"multiple\"</code> on Accordion to allow multiple items open at
              once.
            </>
          ),
        },
      ]}
    />
  ),
};

export const Multiple: Story = {
  render: () => (
    <Accordion
      type="multiple"
      className="w-full max-w-md"
      items={[
        { value: "a", trigger: "Section A", content: "Content for section A." },
        { value: "b", trigger: "Section B", content: "Content for section B." },
        { value: "c", trigger: "Section C", content: "Content for section C." },
      ]}
    />
  ),
};
