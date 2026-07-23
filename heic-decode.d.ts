declare module "heic-decode" {
  type DecodeInput = {
    buffer: Uint8Array | ArrayBuffer;
  };

  type DecodeResult = {
    width: number;
    height: number;
    data: Uint8ClampedArray;
  };

  export default function decode(input: DecodeInput): Promise<DecodeResult>;
}
