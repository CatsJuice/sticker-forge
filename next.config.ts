import type { NextConfig } from "next";
import path from "node:path";

const isGitHubPages = process.env.GITHUB_PAGES === "true";

const pagesWebpackConfig: Pick<NextConfig, "webpack"> = {
  webpack(config) {
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

const nextConfig: NextConfig = {
  output: isGitHubPages ? "export" : undefined,
  trailingSlash: isGitHubPages,
  ...(isGitHubPages ? pagesWebpackConfig : {}),
};

export default nextConfig;
