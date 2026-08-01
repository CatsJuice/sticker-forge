export type BackgroundRemovalProgress = {
  phase: "loading" | "processing";
  progress?: number;
};

export type BackgroundRemovalResult = {
  dataUrl: string;
  pixels: Uint8ClampedArray;
  width: number;
  height: number;
};

export async function removeImageBackground(): Promise<BackgroundRemovalResult> {
  throw new Error("Background removal is unavailable in the XHS build.");
}
