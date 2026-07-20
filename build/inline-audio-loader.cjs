module.exports = function inlineAudioLoader(source) {
  const dataUrl = `data:audio/mpeg;base64,${source.toString("base64")}`;
  return `export default ${JSON.stringify(dataUrl)};`;
};

module.exports.raw = true;
