# U-2-Netp model provenance

This directory redistributes the U-2-Netp background-removal model under the
Apache License 2.0. The application serves these files from its own origin so
inference remains entirely in the browser without requiring access to the
Hugging Face Hub.

- Model repository: https://huggingface.co/BritishWerewolf/U-2-Netp
- Source revision: `7112208dbac3a3642496c8d54e2f0f9bb3dc1dc8`
- Original U²-Net project: https://github.com/xuebinqin/U-2-Net
- Model conversion credit: https://github.com/danielgatis/rembg

Bundled files:

| File | Size (bytes) | SHA-256 |
| --- | ---: | --- |
| `config.json` | 388 | `863f4c818e573a77b0bedea8ecacc6c449ec24e8c179e2f8b1f4067ba8d0dea6` |
| `onnx/model.onnx` | 4,574,861 | `309c8469258dda742793dce0ebea8e6dd393174f89934733ecc8b14c76f4ddd8` |

The application does not modify the model weights. Image preprocessing and
matte postprocessing are implemented separately in the background-removal web
worker.
