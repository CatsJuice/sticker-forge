import type { NextConfig } from "next";
import path from "node:path";

const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: isGitHubPages ? "export" : undefined,
  trailingSlash: isGitHubPages,
  webpack(config, { webpack }) {
    config.plugins.push(
      new webpack.DefinePlugin({
        __BUILD_TARGET__: JSON.stringify("web"),
        __XHS_BUILD__: JSON.stringify(false),
      }),
    );
    if (!isGitHubPages) return config;
    config.resolve.fallback = {
      ...config.resolve.fallback,
      module: false,
    };
    config.module.rules.push({
      test: /\.(?:mp3|wav)$/i,
      resourceQuery: /inline/,
      type: "javascript/auto",
      use: [path.resolve("build/inline-audio-loader.cjs")],
    });
    config.module.rules.push({
      test: /prores-encoder\.esm\.js$/,
      parser: { url: false },
    });
    return config;
  },
};

export default nextConfig;
