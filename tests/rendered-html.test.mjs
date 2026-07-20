import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Sticker Forge studio shell", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Sticker Forge — Interactive Sticker Maker<\/title>/i);
  assert.match(html, /STICKER FORGE/);
  assert.match(html, /贴纸实验台/);
  assert.match(html, /复制嵌入代码/);
  assert.match(html, /data-testid="sticker-stage"/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/i);
});

test("ships both standalone bundles and a copyable embed example", async () => {
  const [example, declarations, iifeSource] = await Promise.all([
    readFile(new URL("../examples/embed.html", import.meta.url), "utf8"),
    readFile(
      new URL("../public/embed/sticker-forge.d.ts", import.meta.url),
      "utf8",
    ),
    readFile(
      new URL("../public/embed/sticker-forge.iife.js", import.meta.url),
      "utf8",
    ),
    access(new URL("../public/embed/sticker-forge.es.js", import.meta.url)),
  ]);

  assert.match(example, /sticker-forge\.iife\.js/);
  assert.match(example, /StickerForge\.createSticker/);
  assert.match(declarations, /interface StickerInstance/);
  assert.match(declarations, /setSource\(source: StickerSource\): Promise<void>/);

  const esmUrl = new URL("../public/embed/sticker-forge.es.js", import.meta.url);
  esmUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const esm = await import(esmUrl.href);
  for (const name of [
    "StickerForgeElement",
    "createSticker",
    "defineStickerForge",
    "sanitizeSvgMarkup",
  ]) {
    assert.equal(typeof esm[name], "function", `missing ESM export: ${name}`);
  }

  class BareElement {}
  const tags = new Map();
  const constructors = new Set();
  const customElements = {
    define(name, constructor) {
      if (tags.has(name) || constructors.has(constructor)) {
        throw new Error("duplicate custom-element registration");
      }
      tags.set(name, constructor);
      constructors.add(constructor);
    },
    get(name) {
      return tags.get(name);
    },
  };
  const context = vm.createContext({
    console,
    customElements,
    HTMLElement: BareElement,
  });
  vm.runInContext(iifeSource, context);
  assert.equal(typeof context.StickerForge?.createSticker, "function");
  assert.equal(typeof context.StickerForge?.defineStickerForge, "function");
  assert.equal(typeof customElements.get("sticker-forge"), "function");
  context.StickerForge.defineStickerForge("custom-sticker");
  assert.equal(typeof customElements.get("custom-sticker"), "function");
});
