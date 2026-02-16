import { defineConfig } from "tsup"

export default defineConfig({
  clean: true,
  dts: false,
  entry: ["src/server.ts"],
  format: ["esm"],
  minify: false,
  outDir: "dist",
  shims: false,
  skipNodeModulesBundle: true,
  sourcemap: true,
  splitting: false,
  target: "es2020",
})
