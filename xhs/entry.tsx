import { createRoot } from "react-dom/client";

import "@/app/globals.css";
import { StickerForgeStudio } from "@/app/StickerForgeStudio";

const root = document.querySelector("#root");
if (!root) throw new Error("Sticker Forge root element is missing.");

document.documentElement.classList.add("xhs-build");
createRoot(root).render(<StickerForgeStudio />);
