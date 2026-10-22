import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "next/image": fileURLToPath(new URL("./src/compat/next-image.tsx", import.meta.url)),
      "next/link": fileURLToPath(new URL("./src/compat/next-link.tsx", import.meta.url)),
      "next/navigation": fileURLToPath(new URL("./src/compat/next-navigation.ts", import.meta.url)),
    },
  },
  server: {
    port: 3000,
    host: true,
  },
  build: {
    outDir: "dist",
    sourcemap: false,
  },
});
