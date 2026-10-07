import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArrowRight, Circle, Plus, Trash2 } from "lucide-react";
import { Button, type ButtonProps } from "@prizm/ui/button";

type Variant = NonNullable<ButtonProps["variant"]>;
type Size = NonNullable<ButtonProps["size"]>;

const VARIANTS: Variant[] = ["default", "secondary", "destructive", "outline", "ghost", "link", "warning"];
const TEXT_SIZES: Size[] = ["default", "sm", "lg"];
const ICON_SIZES: Size[] = ["icon", "icon-sm", "icon-lg"];

const FIGMA_URL =
  "https://www.figma.com/design/DKxVyaDsRPJGk3lvL630yS/-TESTE-LUCAS--Design-Tokens---Core?node-id=345-2093";

const meta: Meta<typeof Button> = {
  title: "Button",
  component: Button,
  parameters: {
    docs: {
      description: {
        component: `Botão do shadcn com as cores, alturas, raio, fonte e sombra ligados aos design tokens. Marca, produto, modo e plataforma vêm da barra de ferramentas (atributos \`data-*\`), não de props. [Ver no Figma](${FIGMA_URL}).`,
      },
    },
  },
  argTypes: {
    variant: { control: "select", options: VARIANTS },
    size: { control: "select", options: [...TEXT_SIZES, ...ICON_SIZES] },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
    children: { control: "text" },
  },
  args: {
    children: "Button",
    variant: "default",
    size: "default",
    loading: false,
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Playground: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-4">
      {VARIANTS.map((variant) => (
        <Button {...args} key={variant} variant={variant}>
          {variant}
        </Button>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-4">
      {TEXT_SIZES.map((size) => (
        <Button {...args} key={size} size={size}>
          {size}
        </Button>
      ))}
      {ICON_SIZES.map((size) => (
        <Button {...args} aria-label={size} key={size} size={size}>
          <Circle />
        </Button>
      ))}
    </div>
  ),
};

export const WithIcon: Story = {
  name: "With icon",
  render: (args) => (
    <div className="flex flex-wrap items-center gap-4">
      <Button {...args}>
        <Plus />
        Novo item
      </Button>
      <Button {...args} variant="outline">
        Continuar
        <ArrowRight />
      </Button>
      <Button {...args} aria-label="Excluir" size="icon" variant="destructive">
        <Trash2 />
      </Button>
    </div>
  ),
};

export const Loading: Story = {
  args: { loading: true },
  render: (args) => (
    <div className="flex flex-wrap items-center gap-4">
      <Button {...args}>Salvando</Button>
      <Button {...args} aria-label="Salvando" size="icon">
        <Circle />
      </Button>
    </div>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
  render: Variants.render,
};

/** Same grid as the Figma frame: every variant at every size. Hover, focus and press to see the states. */
export const Matrix: Story = {
  render: (args) => (
    <table className="border-collapse text-sm">
      <thead>
        <tr>
          <th>
            <span className="sr-only">Variante</span>
          </th>
          {[...TEXT_SIZES, ...ICON_SIZES].map((size) => (
            <th className="px-4 pb-3 font-medium text-muted-foreground" key={size}>
              {size}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {VARIANTS.map((variant) => (
          <tr className="border-t border-border" key={variant}>
            <th className="pr-6 text-left font-medium text-muted-foreground">{variant}</th>
            {TEXT_SIZES.map((size) => (
              <td className="px-4 py-3 text-center" key={size}>
                <Button {...args} size={size} variant={variant}>
                  Button
                </Button>
              </td>
            ))}
            {ICON_SIZES.map((size) => (
              <td className="px-4 py-3 text-center" key={size}>
                <Button {...args} aria-label={`${variant} ${size}`} size={size} variant={variant}>
                  <Circle />
                </Button>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ),
};

const BRANDS = [
  { brand: "pas", title: "PAS" },
  { brand: "pas", product: "cms", title: "PAS · CMS" },
  { brand: "tchello", title: "Tchello" },
  { brand: "docnix", title: "Docnix" },
  { brand: "itss", product: "afipe", title: "ITSS · AFIPE" },
  { brand: "itss", product: "digitrol", title: "ITSS · Digitrol" },
];

/** Every brand in light and dark side by side, regardless of the toolbar. */
export const Brands: Story = {
  render: (args) => (
    <div className="grid gap-px overflow-hidden rounded-md border border-border bg-border">
      {BRANDS.flatMap(({ brand, product, title }) =>
        ["light", "dark"].map((mode) => (
          <div
            className="flex flex-wrap items-center gap-3 bg-background p-4 font-sans text-foreground"
            data-brand={brand}
            data-mode={mode}
            data-product={product}
            key={`${title}-${mode}`}
          >
            <span className="w-40 text-xs text-muted-foreground">
              {title} · {mode}
            </span>
            {VARIANTS.map((variant) => (
              <Button {...args} key={variant} variant={variant}>
                {variant}
              </Button>
            ))}
          </div>
        )),
      )}
    </div>
  ),
};
