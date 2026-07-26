# Sticker Forge deterministic performance benchmark

This dependency-free Node harness launches a fresh Chromium profile and measures
the production embed bundle through the Chrome DevTools Protocol (CDP). It does
not use Playwright, Puppeteer, or browser-side synthetic pointer events.

The default run self-serves `public/embed/sticker-forge.es.js` with a minimal,
fixed SVG fixture:

```sh
npm run build:lib
node tests/performance/benchmark.mjs \
  --output /tmp/sticker-forge-performance.json
```

Use `--bundle /absolute/path/to/sticker-forge.es.js` to run the same fixture
against a saved before-build without replacing the current generated bundle.

To benchmark the bundle from a running application:

```sh
npm run dev
node tests/performance/benchmark.mjs \
  --url http://127.0.0.1:3000/ \
  --output /tmp/sticker-forge-performance.json
```

The running origin must serve `/embed/sticker-forge.es.js`. Override that URL
when necessary:

```sh
node tests/performance/benchmark.mjs \
  --url http://127.0.0.1:3000/ \
  --module-url http://127.0.0.1:3000/custom/sticker-forge.es.js
```

Use `--chromium /absolute/path/to/chromium` or set `CHROMIUM_PATH` when automatic
discovery does not find Chrome, Chromium, or Edge.

## Determinism and raw evidence

The harness fixes the viewport to 1440×900 at DPR 1, uses a fresh browser
profile, disables fixture wind and sound, discovers a real exterior contour,
and drives the peel with trusted `Input.dispatchMouseEvent` CDP events. It
collects:

- raw before/after `Performance.getMetrics` values and CPU/task/script/layout
  deltas for every measured peel;
- raw `requestAnimationFrame` intervals during each peel;
- 24-call no-op resize batches, including page time and CDP CPU deltas;
- pointer scheduling error and the trusted pointer/custom peel event streams;
- forced-GC heap usage, DOM nodes, documents, and JavaScript listener counts
  before and after repeated create/destroy cycles while consumed and pending
  prepared-source handles and destroyed controller objects remain intentionally
  reachable;
- forced-GC retention after repeated invalid-source creation failures;
- exact SHA-256 WebGL pixel hashes for flat, peeled, restored, and
  snapshot-replayed poses.

Every numeric series includes p50, p95, median absolute deviation (MAD),
population standard deviation, and coefficient of variation (CV). JSON is
always written to stdout; progress diagnostics are written to stderr.

Rebuild the library before every source-level before/after measurement so the
bundle fingerprint in the JSON identifies the exact implementation under test.

The default configuration uses five pointer warmups, 20 measured peels, eight
create/destroy warmups, and 20 measured create/destroy cycles. A short smoke run
is useful while changing the harness:

```sh
node tests/performance/benchmark.mjs \
  --warmups 1 \
  --runs 2 \
  --memory-warmups 1 \
  --memory-cycles 2 \
  --pointer-steps 16 \
  --pointer-step-ms 4 \
  --output /tmp/sticker-forge-performance-smoke.json
```

Exact parity failures set exit status 2. Pass `--no-strict-parity` only when
investigating a failure; the JSON still contains every failed check.

## Targeted benchmarks

Run targeted hot-path benchmarks in isolation so another Chrome or CPU-heavy
process cannot contaminate their samples:

```sh
node tests/performance/background-removal-particles.mjs \
  > /tmp/background-removal-particles.json
node tests/performance/background-removal-pixel-copy.mjs \
  --iterations 1 --width 2048 --height 2048 \
  --output /tmp/background-removal-pixel-copy.json
node tests/performance/material-preview-cache.mjs \
  --iterations 200 --output /tmp/material-preview-cache.json
node --expose-gc tests/performance/export-playback.mjs \
  > /tmp/export-playback.json
node tests/performance/export-preview-hotpaths.mjs \
  --output /tmp/export-preview-hotpaths.json
```

Each targeted benchmark uses at least five warmup pairs and 20 measured pairs.
The paired variants alternate AB/BA order, retain raw samples, report robust
percentiles plus dispersion, and verify exact state, frame, or pixel parity.
The background-result benchmark forces GC before each variant so the measured
RGBA copy is not mixed with an incidental collection pause.

`edge-hit-outer-boundary.mjs` is a regression guard for a rejected lookup-table
optimization. Its optimized candidate was slower than the production exterior
neighbor checks, so the candidate is deliberately not shipped.
