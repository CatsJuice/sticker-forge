import react from "@vitejs/plugin-react";
import { cp, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, type Plugin } from "vite";

const repositoryRoot = path.dirname(fileURLToPath(import.meta.url));
const resolveFromRoot = (relativePath: string) =>
  path.resolve(repositoryRoot, relativePath);

function copyXhsAssets(): Plugin {
  return {
    name: "copy-xhs-assets",
    apply: "build",
    async writeBundle(options) {
      const outputDirectory = path.resolve(
        repositoryRoot,
        typeof options.dir === "string" ? options.dir : "dist/xhs",
      );
      await mkdir(outputDirectory, { recursive: true });
      await cp(
        resolveFromRoot("public/default-image.svg"),
        path.join(outputDirectory, "default-image.svg"),
      );
      await cp(
        resolveFromRoot("public/sticker-forge-logo-peel.webp"),
        path.join(outputDirectory, "sticker-forge-logo-peel.webp"),
      );
      await cp(
        resolveFromRoot("public/default-gallery"),
        path.join(outputDirectory, "default-gallery"),
        { recursive: true },
      );
    },
  };
}

export default defineConfig(({ command }) => ({
  root: resolveFromRoot("xhs"),
  base: "./",
  // Dev serves the source assets so the preview matches the packaged relative
  // URLs. Production still copies only the explicit XHS allowlist above.
  publicDir: command === "serve" ? resolveFromRoot("public") : false,
  define: {
    __BUILD_TARGET__: JSON.stringify("xhs"),
    __XHS_BUILD__: "true",
  },
  resolve: {
    alias: [
      {
        find: "@/app/ExportDialog",
        replacement: resolveFromRoot("app/xhs/ExportDialog.tsx"),
      },
      {
        find: "@/app/SidebarPeelEasterEgg",
        replacement: resolveFromRoot("app/xhs/SidebarPeelEasterEgg.tsx"),
      },
      {
        find: "@/lib/background-removal",
        replacement: resolveFromRoot("lib/xhs/background-removal.ts"),
      },
      {
        find: "@/lib/heic",
        replacement: resolveFromRoot("lib/xhs/heic.ts"),
      },
      {
        find: "@/lib/audio-source",
        replacement: resolveFromRoot("lib/xhs/audio-source.ts"),
      },
      {
        find: "@/lib/gallery-transfer",
        replacement: resolveFromRoot("lib/xhs/gallery-transfer.ts"),
      },
      {
        find: "@",
        replacement: repositoryRoot,
      },
    ],
  },
  plugins: [react(), copyXhsAssets()],
  build: {
    outDir: resolveFromRoot("dist/xhs"),
    emptyOutDir: true,
    copyPublicDir: false,
    sourcemap: false,
    target: "es2020",
    minify: "esbuild",
    modulePreload: {
      polyfill: false,
    },
  },
}));
