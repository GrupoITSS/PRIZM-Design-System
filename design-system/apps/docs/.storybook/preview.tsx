import type { Decorator, Preview } from "@storybook/react-vite";
import "./preview.css";

// The Tokens Studio themes ($themes in tokens.json, group "Marca · Produto").
// Add a new brand or product here when it's added to Tokens Studio. Values
// only use characters Storybook accepts in URLs (?globals=brand:itss-digitrol).
const BRANDS = [
  { value: "pas", title: "PAS", brand: "pas" },
  { value: "pas-cms", title: "PAS · CMS", brand: "pas", product: "cms" },
  { value: "tchello", title: "Tchello", brand: "tchello" },
  { value: "docnix", title: "Docnix", brand: "docnix" },
  { value: "itss-afipe", title: "ITSS · AFIPE", brand: "itss", product: "afipe" },
  { value: "itss-digitrol", title: "ITSS · Digitrol", brand: "itss", product: "digitrol" },
];

// Same attributes the token CSS is scoped by (packages/tokens/dist/css), so a
// story renders exactly like an app with these attributes on <html>.
const withTheme: Decorator = (Story, { globals, viewMode }) => {
  const { brand, product } = BRANDS.find(({ value }) => value === globals.brand) ?? BRANDS[0];

  return (
    <div
      className={`bg-background p-6 font-sans text-foreground ${viewMode === "story" ? "min-h-screen" : ""}`}
      data-brand={brand}
      data-mode={globals.mode as string}
      data-platform={globals.platform as string}
      data-product={product}
    >
      <Story />
    </div>
  );
};

const preview: Preview = {
  // A "Docs" page (props table, stories) for every component.
  tags: ["autodocs"],
  decorators: [withTheme],
  globalTypes: {
    brand: {
      description: "Marca · Produto",
      toolbar: {
        title: "Marca",
        icon: "paintbrush",
        items: BRANDS.map(({ value, title }) => ({ value, title })),
        dynamicTitle: true,
      },
    },
    mode: {
      description: "Mode",
      toolbar: {
        title: "Mode",
        icon: "mirror",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
    platform: {
      description: "Plataforma",
      toolbar: {
        title: "Plataforma",
        icon: "mobile",
        items: [
          { value: "desktop", title: "Desktop" },
          { value: "mobile", title: "Mobile" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { brand: "pas", mode: "light", platform: "desktop" },
  parameters: {
    // The decorator paints the token background; Storybook's own would hide dark mode.
    backgrounds: { disable: true },
    layout: "fullscreen",
  },
};

export default preview;
