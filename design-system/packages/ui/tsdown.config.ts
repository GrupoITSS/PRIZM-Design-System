import { defineConfig } from "tsdown";

// One entry per component, each exported in package.json "exports".
// Dependencies and peerDependencies (react) stay external.
export default defineConfig({
  entry: ["src/button.tsx"],
  format: ["esm", "cjs"],
  dts: true,
});
