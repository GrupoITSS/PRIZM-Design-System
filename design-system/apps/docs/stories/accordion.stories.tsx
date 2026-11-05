import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@grupoitss/prizm-ui/accordion";

// Traceability: the AccordionItem component set in [PRIZM] Componentes, the documentation frame
// and the CMS article. The token map lives next to the component (accordion.tokens.json) and is
// checked against the classes in a test.
const FIGMA_URL = "https://www.figma.com/design/7NPb3iuxjitMdpudp4yHTl?node-id=22-516";
const FIGMA_DOC_URL = "https://www.figma.com/design/7NPb3iuxjitMdpudp4yHTl?node-id=26165-2766";
const CMS_URL =
  "https://sgq.pas.app.br/cms/prizm_design_system/articles?articleId=7a083e3d-f457-4d4b-856d-ae2ac8e6de32&version=v1";

const meta: Meta<typeof Accordion> = {
  title: "Primários/Accordion",
  component: Accordion,
  tags: ["autodocs", "documentado"],
  parameters: {
    docs: {
      description: {
        component:
          "API preferencial **por props** (sem subcomponentes). Base: [shadcn/ui](https://ui.shadcn.com) + Radix, com tokens PRIZM.\n\n" +
          'Accordion do design system PRIZM. Uso recomendado: `<Accordion type="single" collapsible items={…} />`. Para conteúdo próprio, use `AccordionItem`, `AccordionTrigger` e `AccordionContent`.\n\n' +
          "Hover com fundo `accent`, foco com o anel do Prizm, item desabilitado a 50%.\n\n" +
          `**Rastreabilidade:** <a href="${FIGMA_URL}" target="_blank" rel="noopener noreferrer">Componente no Figma</a> · <a href="${FIGMA_DOC_URL}" target="_blank" rel="noopener noreferrer">Documentação no Figma</a> · <a href="${CMS_URL}" target="_blank" rel="noopener noreferrer">Artigo no CMS</a> · <a href="https://ui.shadcn.com/docs/components/accordion" target="_blank" rel="noopener noreferrer">Accordion — shadcn/ui</a>`,
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
            "Yes. It uses Radix Accordion primitives: each title is a button inside a heading, and each panel is a region named by its title.",
        },
        {
          value: "item-2",
          trigger: "Is it styled?",
          content:
            "Yes. Neutral borders and PRIZM tokens: accent background on hover, the PRIZM focus ring, and accordion-down/up animations.",
        },
        {
          value: "item-3",
          trigger: "Can it be multiple?",
          content: (
            <>
              Yes. Use <code>type=&quot;multiple&quot;</code> on Accordion to allow multiple items
              open at once.
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

export const DisabledItem: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Item desabilitado: a 50%, sem abrir e fora do Tab. Use pouco: quando der, deixe abrir e explique dentro.",
      },
    },
  },
  render: () => (
    <Accordion
      type="single"
      collapsible
      className="w-full max-w-md"
      items={[
        { value: "address", trigger: "Address", content: "Street, number and zip code." },
        { value: "payment", trigger: "Payment", content: "Card or bank slip.", disabled: true },
        { value: "review", trigger: "Review", content: "Check your order before confirming." },
      ]}
    />
  ),
};

export const LongTitle: Story = {
  parameters: {
    docs: {
      description: {
        story: "Título longo: quebra em mais de uma linha, à esquerda, a 16px do chevron.",
      },
    },
  },
  render: () => (
    <Accordion
      type="single"
      collapsible
      defaultValue="long"
      className="w-full max-w-sm"
      items={[
        {
          value: "long",
          trigger: "How do I change the payment method of a subscription that is already active?",
          content: "Open Billing, choose the subscription and select a new payment method.",
        },
      ]}
    />
  ),
};

export const Composition: Story = {
  parameters: {
    docs: {
      description: {
        story: "API de composição, para conteúdo próprio dentro do item.",
      },
    },
  },
  render: () => (
    <Accordion type="single" collapsible className="w-full max-w-md">
      <AccordionItem value="shipping">
        <AccordionTrigger>Shipping</AccordionTrigger>
        <AccordionContent>Orders ship within 2 business days.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="returns">
        <AccordionTrigger>Returns</AccordionTrigger>
        <AccordionContent>Returns are accepted up to 30 days after purchase.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
