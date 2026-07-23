import type { Metadata, Viewport } from "next";
import "./globals.css";
import { DebugPanel } from "./DebugPanel";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sticker.oooo.so";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Sticker Forge",
    template: "%s · Sticker Forge",
  },
  description:
    "A tactile web sticker maker for text and uploaded images. Drag an edge to peel it up.",
  applicationName: "Sticker Forge",
  keywords: ["sticker", "image", "PNG", "WebGL", "interactive", "generator"],
  openGraph: {
    type: "website",
    title: "Sticker Forge",
    description: "Turn text or uploaded images into a sticker you can really peel.",
    images: [
      {
        url: "/og.png",
        width: 1731,
        height: 909,
        alt: "STICKER FORGE vinyl sticker peeling from a pale studio surface",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sticker Forge",
    description: "Turn text or uploaded images into a sticker you can really peel.",
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ecebe7",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <script
          defer
          src="https://vibeloft.ai/telemetry/v1.js"
          data-vl-product-id="c487b005-2d62-4cdc-b2d1-05e9186d00eb"
          data-vl-auth-key="vl_web.hBqwU87ATF_flUbHTsi2cWmignCM_XgxTUkBPav0cLo"
        />
      </head>
      <body>
        {children}
        <DebugPanel />
      </body>
    </html>
  );
}
