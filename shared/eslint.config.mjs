import { defineConfig } from "eslint/config"

import baseConfig from "../eslint.config.mjs"

export default defineConfig(...baseConfig, {
  ignores: ["node_modules", "build"],
  // Add shared-specific rules or overrides here if needed
})
