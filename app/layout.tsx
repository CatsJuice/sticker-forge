import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import "./globals.css";

function getSafeHost(value: string | null): string {
  const candidate = (value ?? "").split(",")[0].trim();
  if (
    !/^(?:localhost|127\.0\.0\.1|[a-z0-9](?:[a-z0-9.-]*[a-z0-9])?)(?::\d{1,5})?$/i.test(
      candidate,
    )
  ) {
    return "localhost:3000";
  }
  try {
    new URL(`http://${candidate}`);
    return candidate;
  } catch {
    return "localhost:3000";
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = getSafeHost(
    requestHeaders.get("x-forwarded-host") ??
      requestHeaders.get("host"),
  );
  const protocolHeader = requestHeaders
    .get("x-forwarded-proto")
    ?.split(",")[0]
    .trim();
  const protocol =
    protocolHeader === "http" || host.startsWith("localhost")
      ? "http"
      : "https";
  const origin = `${protocol}://${host}`;

  return {
    metadataBase: new URL(origin),
    title: {
      default: "Sticker Forge",
      template: "%s · Sticker Forge",
    },
    description:
      "A tactile web sticker maker for text and SVG artwork. Drag an edge to peel it up.",
    applicationName: "Sticker Forge",
    keywords: ["sticker", "SVG", "WebGL", "interactive", "generator"],
    openGraph: {
      type: "website",
      title: "Sticker Forge",
      description: "Turn text or SVG artwork into a sticker you can really peel.",
      images: [
        {
          url: `${origin}/og.png`,
          width: 1731,
          height: 909,
          alt: "STICKER FORGE vinyl sticker peeling from a pale studio surface",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Sticker Forge",
      description: "Turn text or SVG artwork into a sticker you can really peel.",
      images: [`${origin}/og.png`],
    },
  };
}

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
      <body>{children}</body>
    </html>
  );
}
