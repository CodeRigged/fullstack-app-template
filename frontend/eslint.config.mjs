import reactHooks from "eslint-plugin-react-hooks"
import { reactRefresh } from "eslint-plugin-react-refresh"
import { defineConfig } from "eslint/config"

import baseConfig from "../eslint.config.mjs"

export default defineConfig(...baseConfig, reactRefresh.configs.recommended(), reactHooks.configs.flat.recommended, {
  ignores: ["node_modules", "dist"],
  // Add frontend-specific rules or overrides here if needed
})
