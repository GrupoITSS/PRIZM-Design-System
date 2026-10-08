import { defineConfig } from "tsdown";

// One entry per component, each exported in package.json "exports".
// Dependencies and peerDependencies (react) stay external.
export default defineConfig((options) => ({
  entry: ["src/button.tsx"],
  format: ["esm", "cjs"],
  dts: true,
  // In watch mode (pnpm dev), overwrite dist/ instead of emptying it first: a
  // running Storybook would otherwise import the component while it's gone.
  clean: !options.watch,
}));
