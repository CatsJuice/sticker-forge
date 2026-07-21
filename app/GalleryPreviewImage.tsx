"use client";

/* eslint-disable @next/next/no-img-element -- previews are local IndexedDB blobs */

import {
  forwardRef,
  useEffect,
  useState,
  type ComponentPropsWithoutRef,
} from "react";
import { getGalleryPreviewUrl } from "@/lib/gallery-storage";

type GalleryPreviewImageProps = Omit<
  ComponentPropsWithoutRef<"img">,
  "src"
> & {
  itemId: string;
  alt: string;
};

export const GalleryPreviewImage = forwardRef<
  HTMLImageElement,
  GalleryPreviewImageProps
>(function GalleryPreviewImage({ itemId, alt, ...props }, ref) {
  const [src, setSrc] = useState<string>();

  useEffect(() => {
    let cancelled = false;
    setSrc(undefined);
    void getGalleryPreviewUrl(itemId)
      .then((url) => {
        if (!cancelled) setSrc(url);
      })
      .catch(() => {
        if (!cancelled) setSrc(undefined);
      });
    return () => {
      cancelled = true;
    };
  }, [itemId]);

  return <img {...props} ref={ref} src={src} alt={alt} />;
});
