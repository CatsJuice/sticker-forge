export async function loadAudioSource(
  src: string,
  signal?: AbortSignal,
): Promise<ArrayBuffer> {
  const response = await fetch(src, { signal });
  if (!response.ok) {
    throw new Error(`Peel audio request failed with ${response.status}.`);
  }
  return response.arrayBuffer();
}
