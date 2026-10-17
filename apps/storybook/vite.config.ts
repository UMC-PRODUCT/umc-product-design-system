import { fileURLToPath } from "node:url"

import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig, type Alias } from "vite"

const reactSourceOf = (path: string) =>
  fileURLToPath(new URL(`../../packages/react/src/${path}`, import.meta.url))

export const sourceAliases: Alias[] = [
  { find: /^@umc-product\/react$/, replacement: reactSourceOf("index.ts") },
  {
    find: /^@umc-product\/react\/styles\.css$/,
    replacement: reactSourceOf("styles.css"),
  },
]

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { alias: sourceAliases, dedupe: ["react", "react-dom"] },
})
