import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// Component tests (*.test.tsx next to each component), ported from @pas/ui.
export default defineConfig({
  plugins: [react()],
  test: {
    include: ["src/**/*.test.{ts,tsx}"],
    globals: true,
    environment: "jsdom",
    setupFiles: ["./tests/setup/cleanup.ts"],
  },
});
