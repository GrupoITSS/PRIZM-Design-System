import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@grupoitss/prizm-ui/combobox";

const meta: Meta<typeof Combobox> = {
  title: "Primários/Combobox",
  component: Combobox,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "API preferencial **por props** (sem subcomponentes). Base: [shadcn/ui](https://ui.shadcn.com) + Radix, com tokens PRIZM.\n\n" +
          'Combobox do design system PRIZM. Campo de seleção/busca construído sobre `@base-ui/react`.\n\n**Uso recomendado (props diretas):** passar `items`, `placeholder`, `emptyMessage`; para múltipla seleção use `multiple`, `value` e `onValueChange`; para itens objeto use `itemToStringValue`. A composição com subcomponentes fica como escape hatch.\n\n**Documentação base:** <a href="https://base-ui.com/react/components/combobox" target="_blank" rel="noopener noreferrer">Combobox — Base UI</a>',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Combobox>;

const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"];

/** Uso primário: apenas props, sem subcomponentes. */
export const Basic: Story = {
  render: () => (
    <Combobox items={frameworks} placeholder="Select a framework" emptyMessage="No items found." />
  ),
};

/** Botão de limpar visível. */
export const ClearButton: Story = {
  render: () => (
    <Combobox
      items={frameworks}
      placeholder="Select a framework"
      emptyMessage="No items found."
      showClear
    />
  ),
};

type Framework = { label: string; value: string };

const frameworksCustom: Framework[] = [
  { label: "Next.js", value: "next" },
  { label: "SvelteKit", value: "sveltekit" },
  { label: "Nuxt", value: "nuxt" },
];

/** Itens como objetos; `itemToStringValue` para exibir e filtrar. */
export const CustomItems: Story = {
  render: () => (
    <Combobox<Framework>
      items={frameworksCustom}
      itemToStringValue={(item) => (item as Framework).label}
      placeholder="Select a framework"
      emptyMessage="No items found."
    />
  ),
};

/** Múltipla seleção com chips (controlado por value/onValueChange). */
export const Multiple: Story = {
  render: function MultipleStory() {
    const [value, setValue] = useState<string[]>([]);
    return (
      <Combobox
        items={frameworks}
        multiple
        value={value}
        onValueChange={(nextValue) => setValue(nextValue as string[])}
        placeholder="Add framework"
        emptyMessage="No items found."
      />
    );
  },
};

/** Desabilitado. */
export const Disabled: Story = {
  render: () => (
    <Combobox
      items={frameworks}
      placeholder="Select a framework"
      emptyMessage="No items found."
      disabled
    />
  ),
};

/** Escape hatch: composição com subcomponentes (igual à doc Base UI). */
export const Composition: Story = {
  parameters: {
    docs: {
      description: {
        story: "Uso avançado quando precisar de layout ou itens totalmente customizados.",
      },
    },
  },
  render: () => (
    <Combobox items={frameworks}>
      <ComboboxInput placeholder="Select a framework" showTrigger showClear />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
};

/** Estado inválido via `aria-invalid`. */
export const Invalid: Story = {
  render: () => (
    <Combobox
      items={frameworks}
      placeholder="Select a framework"
      emptyMessage="No items found."
      aria-invalid="true"
    />
  ),
};

/** Auto highlight do primeiro item ao digitar. */
export const AutoHighlight: Story = {
  render: () => (
    <Combobox
      items={frameworks}
      placeholder="Select a framework"
      emptyMessage="No items found."
      autoHighlight
    />
  ),
};
