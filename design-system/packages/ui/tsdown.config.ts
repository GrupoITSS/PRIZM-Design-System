import { readdirSync } from "node:fs";
import { defineConfig } from "tsdown";

// One entry per component folder (src/components/<name>/index.ts), published
// as @grupoitss/prizm-ui/<name>, plus the root entry with every component.
// A new folder also needs its path in package.json "exports".
// Dependencies and peerDependencies (react) stay external.
const components = readdirSync("src/components", { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

export default defineConfig((options) => ({
  entry: {
    index: "src/index.ts",
    ...Object.fromEntries(components.map((name) => [name, `src/components/${name}/index.ts`])),
  },
  format: ["esm", "cjs"],
  dts: true,
  // Published as @grupoitss/prizm-ui/styles.css, next to the built components
  // (its @source "./" makes Tailwind read them).
  copy: ["src/styles.css"],
  // In watch mode (pnpm dev), overwrite dist/ instead of emptying it first: a
  // running Storybook would otherwise import the component while it's gone.
  clean: !options.watch,
}));
