"use client";

/* eslint-disable @next/next/no-img-element -- previews are local IndexedDB blobs */

import {
  forwardRef,
  useEffect,
  useState,
  type ComponentPropsWithoutRef,
} from "react";
import {
  acquireGalleryPreviewUrl,
  type GalleryPreviewUrlLease,
} from "@/lib/gallery-storage";

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
    let lease: GalleryPreviewUrlLease | null = null;
    setSrc(undefined);
    void acquireGalleryPreviewUrl(itemId)
      .then((acquiredLease) => {
        if (cancelled) {
          acquiredLease.release();
          return;
        }
        lease = acquiredLease;
        setSrc(acquiredLease.url);
      })
      .catch(() => {
        if (!cancelled) setSrc(undefined);
      });
    return () => {
      cancelled = true;
      lease?.release();
      lease = null;
    };
  }, [itemId]);

  return <img {...props} ref={ref} src={src} alt={alt} />;
});
