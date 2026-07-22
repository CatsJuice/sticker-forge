# Sticker Forge

Sticker Forge turns text or uploaded image artwork into a tactile WebGL sticker. Grab the
real die-cut edge, drag it inward, and the sticker curls to reveal a satin back
surface with depth-aware shadowing.

The repository contains two deliverables:

- an interactive builder in `app/`;
- a framework-independent Web Component and imperative API in `lib/`.

## Run locally

Node.js 22.13 or newer is required.

```bash
npm install
npm run dev
```

Build the hosted app and both reusable library bundles with:

```bash
npm run build
```

The reusable files are emitted to `public/embed/`:

- `sticker-forge.es.js` — an ES module that auto-registers `<sticker-forge>`;
- `sticker-forge.iife.js` — a classic script exposing `window.StickerForge`;
- `sticker-forge.d.ts` — public TypeScript declarations.

## GitHub Pages

Pushes to `main` deploy a static export through the GitHub Pages workflow at
`.github/workflows/deploy-pages.yml`. Build the same artifact locally with:

```bash
npm run build:pages
```

The production Pages site uses `https://sticker.oooo.so`. Its DNS record is a
`CNAME` for the `sticker` subdomain pointing to `catsjuice.github.io`.

The provided peel sound is trimmed, converted to mono, lightly high-passed, and
inlined into both JavaScript bundles, so it does not need to be copied or hosted
as a separate asset. The untouched source recording remains in `lib/assets/`.

## Copy-paste Web Component

Copy both the ES bundle and this markup into any page. The bundle registers the
element automatically; the idempotent `defineStickerForge()` helper is also
exported and returns immediately (`void`).

```html
<script type="module" src="/embed/sticker-forge.es.js"></script>

<sticker-forge
  id="sticker"
  style="display:block;width:640px;height:420px"
></sticker-forge>

<script type="module">
  await customElements.whenDefined("sticker-forge");
  const sticker = document.querySelector("#sticker");

  sticker.setOptions({
    outline: { width: 18, color: "#ffffff" },
    shadow: { opacity: 0.22, blur: 22, distance: 16, angle: 42 },
    peel: {
      radius: 0.12,
      stiffness: 0.72,
      maxAngle: 3.55,
      release: "reset",
    },
    sound: { enabled: true, volume: 0.68 },
    back: { color: "#f7f5f2", gloss: 0.7, roughness: 0.3 },
    tilt: -3,
  });

  // setSource() is async: the promise settles after the texture is ready.
  await sticker.setSource({
    type: "text",
    text: "PEEL ME",
    color: "#19191d",
    fontFamily: "Arial Rounded MT Bold, Arial Black, sans-serif",
    fontWeight: 900,
  });

  sticker.addEventListener("peelchange", (event) => {
    console.log("peel", event.detail.progress);
  });
</script>
```

See [`examples/embed.html`](examples/embed.html) for a complete standalone page.

## Imperative JavaScript API

If a custom element does not fit the host framework, mount the renderer into a
normal element. `createSticker()` is asynchronous and resolves to the control
object; renderer events are dispatched from the target element.

```html
<div id="sticker-target" style="width:640px;height:420px"></div>

<script type="module">
  import { createSticker } from "/embed/sticker-forge.es.js";

  const target = document.querySelector("#sticker-target");
  target.addEventListener("peelend", (event) => {
    console.log("released at", event.detail.progress);
  });

  const sticker = await createSticker(target, {
    source: { type: "text", text: "PEEL ME", color: "#19191d" },
    peel: { radius: 0.12, maxAngle: 3.55 },
    sound: { enabled: true, volume: 0.68 },
  });

  // Call before permanently removing the target in an SPA.
  // sticker.destroy();
</script>
```

For classic scripts, load `sticker-forge.iife.js` and call
`await StickerForge.createSticker(...)`, as demonstrated by the standalone
example.

## Inputs

Text sources accept `text`, `color`, `fontFamily`, and `fontWeight`. The engine
waits for the requested browser font before rebuilding the texture.

Image sources accept any browser-decodable image URL, including data URLs made
from PNG, WebP, JPEG, GIF, AVIF, or SVG uploads:

```js
await sticker.setSource({ type: "image", src: imageDataUrl, name: file.name });
```

The engine inspects decoded pixel alpha. Transparent images use their alpha
silhouette for the die-cut outline; fully opaque images use their rectangular
image boundary.

Legacy SVG sources also accept raw markup; pre-sanitization is not required:

```js
await sticker.setSource({ type: "svg", svg: svgMarkup });
```

SVG input is processed locally. The library always removes scripts, event
attributes, `foreignObject`, and external URL references before rasterization.
`sanitizeSvgMarkup(svgMarkup)` is exported when the sanitized markup itself is
needed.

## API

The custom element and the object returned by the awaited `createSticker()`
promise expose the same control surface:

```ts
setSource(source): Promise<void>
setOptions(partialOptions): void
reset(): void
resize(): void
getState(): StickerState
destroy(): void
```

For the imperative API, listen on the target element passed to
`createSticker()`. For the Web Component, listen on `<sticker-forge>`; its peel
and error events bubble across the shadow boundary.

| Event | `event.detail` |
| --- | --- |
| `ready` | Imperative target: `{ width, height }`; Web Component: no detail |
| `peelstart` | `{ amount, progress, origin }` |
| `peelchange` | `{ amount, progress, direction? }` |
| `peelend` | `{ amount, progress, willReset }` |
| `error` | `{ message }` |

`amount` and `progress` are the same normalized value from `0` (flat) to `1`
(fully lifted). `origin` and `direction` are `{ x, y }` points in sticker-local
coordinates.

`peel.radius` is normalized to the sticker's short side (`0.12` means 12%),
while `peel.maxAngle` is expressed in radians. Shadow direction and `tilt` are
expressed in degrees; shadow blur/distance use CSS pixels, while
`peel.grabWidth` uses CSS pixels at 100% scale and scales with the sticker.

The bundled recording is treated as an audio sprite rather than a timeline.
Sticker Forge separates its lift, light crackle, strong tear, and release
material, compensates their different levels, and drives randomized grains from
the drag velocity and acceleration. A slow peel is sparse, a fast peel is denser
and brighter, holding still is silent, and reattaching uses a quieter low-passed
texture instead of reversed audio. `progress` is used only for the initial lift
and final release events. Set `sound.enabled` to `false` or `sound.volume` to `0`
to mute it. Provide `sound.src` to replace the bundled sound with another
browser-decodable audio URL; custom recordings use a duration-relative generic
slice profile.

`setOptions()` deep-merges nested option groups. Prefer the awaitable
`setSource()` when changing artwork; passing `source` through `setOptions()`
starts the same rebuild but cannot be awaited. `destroy()` should be called
before a single-page application permanently removes an imperative sticker
instance. A disconnected `<sticker-forge>` cleans itself up automatically.

## Rendering notes

- Three.js manages the WebGL scene, camera, geometry, and depth buffer.
- Custom shaders keep the attached region rigid and bend only the peel front.
- Front and back materials render separately according to face orientation.
- The shadow is projected from the deformed surface instead of being a static
  box or CSS shadow.
- Source alpha drives both visual clipping and boundary hit testing, so empty
  corners of an SVG bounding box cannot be grabbed.
- Rendering idles when the sticker is flat; DPR and mesh density are capped for
  predictable mobile performance.

The measured reference-video timeline and calibration values live in
[`docs/reference-analysis.md`](docs/reference-analysis.md).
