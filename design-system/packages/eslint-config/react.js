import js from "@eslint/js";
import eslintReact from "@eslint-react/eslint-plugin";
import { defineConfig, globalIgnores } from "eslint/config";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";

/*
 * Shared ESLint config (flat config) for React + TypeScript packages.
 *
 * Usage, in the package's eslint.config.js:
 *
 *   import react from "@repo/eslint-config/react";
 *   export default react;
 *
 * TypeScript files get the type-aware rules, using the package's tsconfig.json
 * (projectService). Plain JS files, like the config files themselves, get
 * the same rules without type information.
 */
export default defineConfig(
  globalIgnores(["**/dist/", "**/storybook-static/"]),
  js.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  eslintReact.configs["recommended-type-checked"],
  reactHooks.configs.flat["recommended-latest"],
  {
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        projectService: true,
      },
    },
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    extends: [tseslint.configs.disableTypeChecked, eslintReact.configs["disable-type-checked"]],
    languageOptions: {
      globals: globals.node,
    },
  },
);
