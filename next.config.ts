import type { NextConfig } from "next";
import path from "node:path";

const isGitHubPages = process.env.GITHUB_PAGES === "true";

const pagesWebpackConfig: Pick<NextConfig, "webpack"> = {
  webpack(config) {
    config.module.rules.push({
      test: /\.mp3$/i,
      resourceQuery: /inline/,
      type: "javascript/auto",
      use: [path.resolve("build/inline-audio-loader.cjs")],
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
