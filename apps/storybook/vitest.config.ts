import { defineConfig } from "vitest/config"

import { sourceAliases } from "./vite.config.ts"

export default defineConfig({
  resolve: { alias: sourceAliases, dedupe: ["react", "react-dom"] },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
  },
})
