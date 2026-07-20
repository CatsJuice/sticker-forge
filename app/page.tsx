import type { Metadata } from "next";
import { StickerForgeStudio } from "./StickerForgeStudio";

export const metadata: Metadata = {
  title: { absolute: "Sticker Forge — Interactive Sticker Maker" },
  description:
    "Turn text or SVG artwork into a tactile, peelable web sticker with live material and shadow controls.",
};

export default function Home() {
  return <StickerForgeStudio />;
}
