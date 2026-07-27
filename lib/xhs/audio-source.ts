function abortError() {
  return new DOMException("Audio load aborted.", "AbortError");
}

export async function loadAudioSource(
  src: string,
  signal?: AbortSignal,
): Promise<ArrayBuffer> {
  if (signal?.aborted) throw abortError();
  const match = /^data:[^;,]+;base64,([\s\S]+)$/i.exec(src);
  if (!match) {
    throw new Error("XHS audio sources must be bundled data URLs.");
  }
  const binary = atob(match[1]);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  if (signal?.aborted) throw abortError();
  return bytes.buffer;
}
