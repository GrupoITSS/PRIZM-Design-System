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
          "Combobox do design system PRIZM. Campo de seleção/busca construído sobre `@base-ui/react`.\n\n**Uso recomendado (props diretas):** passar `items`, `placeholder`, `emptyMessage`; para múltipla seleção use `multiple`, `value` e `onValueChange`; para itens objeto use `itemToStringValue`. A composição com subcomponentes fica como escape hatch.\n\n**Documentação base:** <a href=\"https://base-ui.com/react/components/combobox\" target=\"_blank\" rel=\"noopener noreferrer\">Combobox — Base UI</a>",
      },
    },
    controls: {
      include: ["placeholder", "emptyMessage", "showTrigger", "showClear", "size", "disabled"],
      expanded: true,
    },
  },
  args: {
    placeholder: "Selecionar um framework",
    emptyMessage: "Nenhum item encontrado.",
    showTrigger: true,
    showClear: false,
    size: "md",
    disabled: false,
  },
  argTypes: {
    placeholder: { control: "text" },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    showTrigger: { control: "boolean" },
    showClear: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof Combobox>;

const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"];

/** Uso primário: apenas props, sem subcomponentes. */
export const Basic: Story = {
  render: (args) => <Combobox items={frameworks} {...args} />,
};

/** Botão de limpar visível. */
export const ClearButton: Story = {
  args: { showClear: true },
  render: (args) => <Combobox items={frameworks} {...args} />,
};

type Framework = { label: string; value: string };

const frameworksCustom: Framework[] = [
  { label: "Next.js", value: "next" },
  { label: "SvelteKit", value: "sveltekit" },
  { label: "Nuxt", value: "nuxt" },
];

/** Itens como objetos; `itemToStringValue` para exibir e filtrar. */
export const CustomItems: Story = {
  render: (args) => (
    <Combobox<Framework>
      items={frameworksCustom}
      itemToStringValue={(item) => (item as Framework).label}
      {...args}
    />
  ),
};

/** Múltipla seleção com chips (controlado por value/onValueChange). */
export const Multiple: Story = {
  render: function MultipleStory(args) {
    const [value, setValue] = useState<string[]>([]);
    return (
      <Combobox
        items={frameworks}
        multiple
        value={value}
        onValueChange={(nextValue) => setValue(nextValue as string[])}
        {...args}
        placeholder={args.placeholder ?? "Adicionar framework"}
      />
    );
  },
};

/** Desabilitado. */
export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => <Combobox items={frameworks} {...args} />,
};

/** Tamanhos sm, md e lg, os mesmos do Input. */
export const Sizes: Story = {
  render: (args) => (
    <div className="flex w-80 flex-col gap-3">
      <Combobox items={frameworks} {...args} size="sm" placeholder="sm" />
      <Combobox items={frameworks} {...args} size="md" placeholder="md" />
      <Combobox items={frameworks} {...args} size="lg" placeholder="lg" />
    </div>
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
      <ComboboxInput placeholder="Selecionar um framework" showTrigger showClear />
      <ComboboxContent>
        <ComboboxEmpty>Nenhum item encontrado.</ComboboxEmpty>
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
  render: (args) => <Combobox items={frameworks} aria-invalid="true" {...args} />,
};

/** Auto highlight do primeiro item ao digitar. */
export const AutoHighlight: Story = {
  render: (args) => <Combobox items={frameworks} autoHighlight {...args} />,
};
