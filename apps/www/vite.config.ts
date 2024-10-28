import { fileURLToPath, URL } from "node:url"

import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  server: { port: 3000 },
  preview: { port: 3000 },
  resolve: { alias: { "~": fileURLToPath(new URL("./src", import.meta.url)) } },
})
