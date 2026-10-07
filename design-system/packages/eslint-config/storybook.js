import { defineConfig } from "eslint/config";
import storybook from "eslint-plugin-storybook";
import react from "./react.js";

/*
 * Shared ESLint config (flat config) for the Storybook app: the React config
 * plus the Storybook rules for stories and .storybook/.
 *
 * Usage, in the app's eslint.config.js:
 *
 *   import storybook from "@repo/eslint-config/storybook";
 *   export default storybook;
 */
export default defineConfig(react, storybook.configs["flat/recommended"]);
