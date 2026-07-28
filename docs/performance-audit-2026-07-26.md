# Performance audit — 2026-07-26

## Outcome

This audit covered the production renderer, animation loops, export preview and
encoding paths, background removal, worker failure handling, gallery previews,
and audio loading. It found and fixed CPU hot paths, large retained native
buffers, unbounded caches, avoidable pixel copies, and incomplete failure
cleanup.

The changes do not reduce rendering quality, particle count, animation
duration, export frame selection, audio behavior, cache correctness, or public
API behavior. Exact pixel, state, snapshot, frame-sequence, and output-hash
checks are part of the benchmarks and regression tests.

## Test environment and anti-noise protocol

| Item | Value |
| --- | --- |
| Baseline commit | `15e50734687ce4b7b740218796083024e39aea4b` |
| Baseline ESM bundle | `e940c1eb31e65200ff20ec888befad70ceda72a5f08e5512ba58031b9a640a31` |
| Optimized ESM bundle | `9deb1c0121df803f5f34dda599a2871a539ac7c00eb843485851d5b739be8612` |
| Hardware | Apple M4, 16 GB RAM |
| OS | macOS 26.5.1 (25F80), arm64 |
| Browser | Chrome 150.0.7871.182, ANGLE Metal |
| Runtime | Node.js 24.14.0 |
| Browser fixture | 1440×900, DPR 1, fixed SVG, wind and sound disabled |

The final production embed comparison used fresh Chrome profiles and real
trusted CDP pointer input. It ran in chronological A-B-B-A order: the saved
baseline, optimized run A, optimized run B, then the same saved baseline again.
Each run used 5 warmups and 20 measured samples, producing 40 samples per
version. Memory measurements used 8 warmups, 20 cycles, and forced GC. Targeted
benchmarks used at least 5 warmup pairs and 20 measured pairs in alternating
AB/BA order.

No outliers were removed. Every timing series retains raw samples and reports
p50, p95, MAD, standard deviation, and CV in its JSON output. Exact parity
failures return a non-zero exit code. The final bundle was measured in two
independent full runs. Its zero backing-storage, DOM-node, and listener slopes
reproduced exactly; its retained-handle JS slope differed by 140 bytes per
cycle between runs.

## CPU and frame-time results

Lower times and counts are better. Percentages use p50 unless explicitly noted.

| Scenario | Before | After | Change | p95 before → after | Dispersion / parity |
| --- | ---: | ---: | ---: | ---: | --- |
| 24 same-size public `resize()` calls, page time | 55.350 ms | 0.500 ms | **-99.10%** | 58.520 → 0.705 ms | CV 3.63% → 22.60%; higher relative CV is from sub-millisecond results; state and pixels exact |
| 24 same-size public `resize()` calls, Chrome task CPU | 55.852 ms | 0.842 ms | **-98.49%** | 59.521 → 1.363 ms | 40 samples/version |
| Trusted peel, Chrome task CPU | 25.989 ms | 21.658 ms | **-16.66%** | 27.550 → 25.169 ms | CV 14.02% → 20.12%; both optimized runs were below both bracketing baseline runs |
| Trusted peel, Chrome script CPU | 10.876 ms | 8.798 ms | **-19.11%** | 12.527 → 11.018 ms | CV 17.56% → 22.71%; both optimized runs were below both bracketing baseline runs |
| Trusted peel frame interval | 16.700 ms | 16.700 ms | no regression | 16.700 → 16.700 ms | 59.88 FPS at p50; zero frames over 20 ms in either version |
| Manual export preview, Chrome task CPU per 24 display ticks | 24.718 ms | 7.723 ms | **71.22% paired reduction** | 30.755 → 10.314 ms | paired-reduction CV 15.59%; exact frame sequence and pixels |
| Automatic export preview, Chrome task CPU per 24 display ticks | 12.329 ms | 4.062 ms | **67.25% paired reduction** | 14.234 → 5.023 ms | paired-reduction CV 15.72%; exact state, snapshot, and pixels |
| Background-removal particle animation | 96.285 ms | 82.912 ms | **-13.89%** | 98.541 → 85.142 ms | 25 paired samples; exact rendered bytes |
| Holographic seeded invariant generation | 148.030 ms | 0.110 ms | **-99.93%** | 156.740 → 0.115 ms | CV 3.86% → 7.15%; exact pixels |
| Glitter seeded invariant generation | 90.243 ms | 0.600 ms | **-99.33%** | 96.666 → 0.645 ms | CV 5.03% → 4.89%; exact pixels |
| 2,048×2,048 background-result RGBA handoff | 1.000 ms | below 0.1 ms timer resolution | one 16 MiB copy eliminated | 1.105 → below 0.1 ms | paired saved time p50 1.000 ms, CV 7.48%; exact PNG and pixels |

The peel wall duration is intentionally input-paced at approximately 437 ms, so
it remains unchanged while its task and script CPU fall. The material rows
measure seeded invariant generation and cache lookup, not a claimed end-to-end
FPS increase.

The browser export-preview benchmark also recorded the work eliminated without
changing its 16.665 ms p50 / 16.670 ms p95 frame cadence:

| Export preview work | Before | After |
| --- | ---: | ---: |
| Manual preview texture uploads in 24 ticks | 24 | 12 |
| Manual preview temporary RGBA allocation | 33,177,600 bytes | 0 bytes |
| Automatic preview WebGL render requests in 24 ticks | 24 | 1 |

A longer 421-tick playback microbenchmark reproduced the same mechanism:
8.670 ms → 0.018 ms p50 CPU (**-99.79%**), 421 → 120 texture uploads, and
387,993,600 → 0 temporary bytes. For a 3-second automatic interval, redundant
render requests fell from 180 to 1. Frame indices and the automatic pose were
exactly equal.

## Memory and resource-lifetime results

The core Chrome test intentionally keeps destroyed controller objects and
consumed/pending prepared-source handle objects reachable. This is stricter
than normal application use and separates retained native payloads from the
small JavaScript wrappers a caller deliberately retains.

| Forced-GC slope | Before, run A / B | After, run A / B | Change |
| --- | ---: | ---: | ---: |
| Destroyed renderer backing storage | 26,804,428 / 26,804,428 B per cycle | 0 / 0 B per cycle | **-100%** |
| Destroyed renderer embedder heap | 32,302.45 / 32,289.32 B per cycle | 2,266.66 / 2,232.40 B per cycle | **-93.0%** |
| Destroyed renderer JS heap | 86,080.17 / 86,136.13 B per cycle | 2,553.02 / 2,692.94 B per cycle | **-97.0%** |
| Retained DOM nodes | 8 / 8 per cycle | 0 / 0 per cycle | **-100%** |
| Retained registered listeners | 4 / 4 per cycle | 0 / 0 per cycle | **-100%** |
| Invalid-source failure JS heap | 139,015.99 / 139,083.98 B per failure | 511.42 / 512.07 B per failure | **-99.63%** |
| Injected attach-stage failure JS heap | 69,313.98 / 69,311.70 B per failure | 277.17 / 0 B per failure | **at least -99.60%** |

After 20 retained-controller cycles, backing-storage growth fell from
536,088,560 bytes to zero in both final runs. The remaining 72,520 / 76,236
bytes of final JS growth is reported rather than hidden: the harness
deliberately stores every lightweight destroyed public handle and three
prepared-source handle wrappers per cycle. The public handle severs its
renderer reference in `finally`; native geometry, texture, render-target, and
canvas backing storage are released, the WebGL context is explicitly lost, and
DOM/listener growth is zero.

Invalid-source and injected attach/ResizeObserver failures both reached zero
backing-storage, DOM-node, embedder-heap, and active-listener growth after the
fix. All 20 failures in each independent run rejected as expected.

Deterministic lifetime tests cover the non-renderer resources:

| Workload | Before | After |
| --- | --- | --- |
| 51 background-worker setup/post/retry failures | requests could remain in the pending map after a synchronous throw | 51/51 rejected, 51/51 removed, pending size 0 |
| 25 export-worker initial post failures | created workers were not terminated | 25/25 terminated, outstanding 0 |
| Background-worker stale error/timer race | a rejected request could be posted again by a stale retry | posts `[[1], [2], [2]]`; rejected request 1 was not replayed; pending size 0 |
| 74 gallery preview URL creations | zero-reference URLs had no bound and delete/load races could retain or prematurely revoke URLs | 50 revoked, 24 zero-reference URLs retained; active leases survived pressure; in-flight delete leaked 0 URLs |
| 50 audio engine/cache operations | every unique decoded source remained cached | final size 10: 2 pinned built-ins + 8 zero-reference custom entries; active shared entry remained valid |
| 30 abandoned custom audio loads | pending fetch/decode work was not evicted | 31 requests started, 22 aborted, 9 bounded entries retained, 0 decodes started |
| 30 queued custom audio decodes | native `decodeAudioData` concurrency was unbounded and evicted jobs could still decode | maximum concurrency 2; 20 evicted jobs skipped; 11 required jobs completed; 0 active after drain |

The gallery and audio limits apply only to zero-reference entries. Active
leases are never evicted, built-in audio remains pinned, and recently released
items remain reusable.

## Particle-state allocation

Particle state previously allocated eleven full-image typed arrays even when
only a fraction of pixels was removed. It now allocates exactly 44 bytes per
removed pixel and keeps the same Float32 quantization and render order.

| Removed pixels | Before | After | Change |
| ---: | ---: | ---: | ---: |
| 10% | 4,325,376 B | 432,520 B | **-90.00%** |
| 50% | 4,325,376 B | 2,162,688 B | **-50.00%** |
| 90% | 4,325,376 B | 3,892,856 B | **-10.00%** |
| 100% | 4,325,376 B | 4,325,376 B | no regression |

Four independent benchmark runs all improved total particle time; their p50
reductions were 10.67%, 11.79%, 12.22%, and 13.75%. The final run used a
384×256 source, a 512×360 output, 41,288 removed pixels, 31 timestamps, 7
warmup pairs, and 25 measured AB/BA pairs.

## Fix inventory

1. **Renderer resize and scheduling**
   - Reuses geometry topology and rewrites positions only when dimensions
     require it.
   - Caches rendered dimensions, DPR, media queries, and layout measurements.
   - Skips unchanged ResizeObserver callbacks and coalesces fallback
     `window.resize` and hover hit tests to one animation-frame callback while
     preserving synchronous, bound public `resize()` semantics.
   - Removes duplicate option application.

2. **Renderer teardown and failed construction**
   - Cancels all animation frames, timers, observers, and registrations.
   - Disposes pending and prepared textures, clears texture/artwork/uniform
     references, removes dense geometry attributes and index buffers, and
     explicitly loses the WebGL context.
   - Severs consumed prepared-source handles from renderer payloads.
   - Cleans attach-stage/ResizeObserver construction failures and
     texture-initialization failures.
   - Returns a lightweight public handle that severs the renderer after
     teardown while preserving post-destroy state/snapshot reads.

3. **Export preview and encoding**
   - Updates automatic preview state only when the visual value changes.
   - Reuses the manual preview context/ImageData and uploads only when the
     selected source frame changes.
   - Uses owned `getImageData().data` buffers directly.
   - Removes scale-1 worker copies and the immutable-source copy in transparent
     edge repair.

4. **Background removal**
   - Allocates particle state by removed-pixel count, skips expensive
     pre-launch trajectory math, and reuses equivalent trigonometric results.
   - Passes the worker-owned result buffer directly into `ImageData`.
   - Cleans synchronous worker failures and makes retry/error handling
     worker-identity aware.

5. **Material preview**
   - Adds separate six-entry LRUs for deterministic 96×96 holographic pixels and
     glitter PRNG values, bounded to approximately 2.36 MiB in total.

6. **Gallery preview URLs**
   - Replaces the unbounded URL map with reference-counted leases and a
     24-entry zero-reference LRU.
   - Handles deletion during an in-flight load and releases late React/Three
     consumers.

7. **Audio**
   - Replaces the unbounded decoded-audio map with reference-counted entries,
     eight custom zero-reference slots, and two pinned built-ins.
   - Aborts evicted fetches and limits non-abortable native decodes to two,
     pruning invalidated queued jobs before decode.

8. **Worker failure cleanup**
   - Terminates export workers when the initial transfer/post throws.
   - Ensures every background-removal terminal path removes its pending request
     and prevents stale workers or timers from replaying rejected work.

## No functional tradeoff

The following checks passed:

- Both baseline and both final-bundle core browser runs produced the same flat,
  peeled, restored, and snapshot-replayed pixels. The flat hash was
  `8541433200a9efa0b92480a7b1721582c7467d07e9b6eb876ac9fa3a72687f76`;
  the peeled hash was
  `e2ecffc9ab6756ead55cab6a3bb561ce0919a23a65189b989767c51dfb17b683`.
- Trusted pointer input, peel event order, state restoration, public resize
  reset behavior, and snapshot replay all remained exact.
- Manual and automatic export preview pixels, selected frame indices, state,
  snapshots, and frame cadence remained exact.
- Particle output remained byte-exact across the primary sequence and 40
  density/timestamp parity cases.
- Six material variants matched before/cold-cache/warm-cache SHA-256 hashes.
- The zero-copy background result preserved the input, canvas pixels, and PNG
  hash exactly.
- Gallery leases keep active consumers alive; audio leases keep active and
  built-in buffers alive.

An exterior-edge lookup-table candidate was also benchmarked and rejected. It
preserved all 8,192 query results but was slower: 23.475 → 32.066 ms p50
(+36.60%) and 24.326 → 34.715 ms p95 (+42.71%). The production code keeps the
faster existing neighbor checks, and the rejected candidate remains only as a
regression guard.

## Validation

The final generated bundle was tested with:

```sh
npm run typecheck
npm run lint
npm test
node --test tests/background-removal-pixels.test.mjs \
  tests/background-removal.test.mjs \
  tests/materials.test.mjs \
  tests/performance-memory-lifetimes.test.mjs
```

The baseline full suite had 58 passes and 7 existing source-contract failure
categories (65 total). The optimized suite has 70 passes and the same 7
pre-existing categories (77 total), adding 12 passing regression tests and no
additional failure category. Those categories concern repeated delete clicks,
immutable gallery edit transitions, multiple folders, an untapered crease
source assertion, a shadow-seam source assertion, export-modal source
assertions, and manual-recording source assertions.

Benchmark commands and output fields are documented in
`tests/performance/README.md`. The harnesses emit complete JSON, include bundle
fingerprints, retain raw samples, and fail on parity errors.

## Limits of the evidence

These results are from one Apple M4 machine, Chrome 150 headless, DPR 1, and a
520 px core fixture. GPU/resource retention is inferred from forced-GC CDP
backing-storage and resource slopes rather than vendor-specific GPU telemetry.
Particle timing is an exact-pixel algorithm benchmark rather than a claim about
device-wide FPS. Gallery, audio, and worker lifetime tests use deterministic
fakes. The 20-cycle lifecycle measurements are repeated-lifecycle tests, not an
hours-long soak. The evidence therefore supports the tested paths, bounds, and
no-regression claims; it is not presented as universal proof across every
browser and device.
