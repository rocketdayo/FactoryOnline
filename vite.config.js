import { defineConfig } from "vite";

export default defineConfig({
  base: "./",

  server: {
    host: "0.0.0.0",
    port: 5173,
    open: true
  },

  preview: {
    host: "0.0.0.0",
    port: 4173
  },

  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
    emptyOutDir: true
  }
});