import eslint from "@eslint/js"
import eslintConfigPrettier from "eslint-config-prettier/flat"
import perfectionist from "eslint-plugin-perfectionist"
import tseslint from "typescript-eslint"

export default [
  eslint.configs.recommended,
  tseslint.configs.recommended,
  eslintConfigPrettier,
  {
    plugins: {
      perfectionist,
    },
    rules: {
      "perfectionist/sort-imports": [
        "error",
        {
          order: "asc",
          type: "natural",
        },
      ],
      "perfectionist/sort-interfaces": [
        "error",
        {
          groups: ["unknown", "property", "method"],
          order: "asc",
          sortBy: "name",
          type: "alphabetical",
        },
      ],
      "perfectionist/sort-objects": [
        "error",
        {
          groups: ["unknown", "property", "method"],
          order: "asc",
          sortBy: "name",
          type: "alphabetical",
        },
      ],
      "no-console": "warn",
      "no-debugger": "error",
    },
  },
]
