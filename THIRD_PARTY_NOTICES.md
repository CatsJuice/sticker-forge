# Third-Party Notices

## MOV Export

Transparent ProRes 4444 MOV export uses `prores-wasm-encoder`, licensed under
the MIT License and installed from npm.

## Local Background Removal

Browser-side inference uses `@huggingface/transformers`, licensed under the
Apache License 2.0. The background-removal weights are loaded on demand from
`BritishWerewolf/U-2-Netp`, licensed under the Apache License 2.0.

## Debug Tooling

The optional `?debug=true` parameter panel uses `tweakpane`, licensed under the
MIT License and loaded on demand.

## HEIC Image Import

Browser-side HEIC/HEIF conversion uses `heic-decode`, licensed under the ISC
License, and its `libheif-js` dependency, licensed under the GNU Lesser General
Public License v3.0. The decoder is loaded on demand only when one of those
formats is selected.
