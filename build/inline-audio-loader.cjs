module.exports = function inlineAudioLoader(source) {
  const mimeType = this.resourcePath.toLowerCase().endsWith(".wav")
    ? "audio/wav"
    : "audio/mpeg";
  const dataUrl = `data:${mimeType};base64,${source.toString("base64")}`;
  return `export default ${JSON.stringify(dataUrl)};`;
};

module.exports.raw = true;
