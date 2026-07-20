import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const standaloneEntry = fileURLToPath(
  new URL("./lib/standalone.ts", import.meta.url),
);

export default defineConfig({
  // The embed bundle is independent from the Sites application build.
  publicDir: false,
  build: {
    target: "es2020",
    outDir: "public/embed",
    emptyOutDir: false,
    copyPublicDir: false,
    sourcemap: true,
    minify: "esbuild",
    lib: {
      entry: standaloneEntry,
      name: "StickerForge",
      formats: ["es", "iife"],
      fileName: (format) =>
        format === "es"
          ? "sticker-forge.es.js"
          : "sticker-forge.iife.js",
    },
    rollupOptions: {
      // Deliberately keep `three` inside both distributable files so consumers
      // never need to install or configure a peer dependency.
      external: [],
      output: {
        codeSplitting: false,
      },
    },
  },
});
