import type { ImgHTMLAttributes } from "react";
import manifest from "@/lib/photo-manifest.json";
import { cn } from "@/lib/utils";
import { useLightbox, type LightboxItem } from "./lightbox";

type Info = { w: number; h: number; zoom: string; zw: number; zh: number; widths: number[]; base: string };
const MANIFEST = manifest as Record<string, Info>;

export function photoInfo(src: string): Info | undefined {
  return MANIFEST[src];
}

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt"> & {
  src: string;
  alt: string;
  /** Other photos to swipe through in the lightbox (this one included). */
  gallery?: LightboxItem[];
  sizes?: string;
  wrapperClassName?: string;
};

/**
 * A real job photo: responsive AVIF/WebP thumbnails on the page (original JPEG
 * fallback), and tap/click opens the zoomable fullscreen lightbox.
 */
export function ZoomPhoto({ src, alt, gallery, sizes = "(min-width: 768px) 50vw, 100vw", className, wrapperClassName, ...img }: Props) {
  const lb = useLightbox();
  const info = MANIFEST[src];
  const items = gallery && gallery.some((g) => g.src === src) ? gallery : [{ src, alt }];
  const index = Math.max(0, items.findIndex((g) => g.src === src));
  const set = (ext: string) => info?.widths.map((w) => `${info.base}-${w}.${ext} ${w}w`).join(", ");
  return (
    <button
      type="button"
      className={cn("block h-full w-full cursor-zoom-in focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent", wrapperClassName)}
      aria-label={`Open larger photo: ${alt}`}
      onClick={() => lb?.open(items, index)}
    >
      <picture>
        {info ? <source type="image/avif" srcSet={set("avif")} sizes={sizes} /> : null}
        {info ? <source type="image/webp" srcSet={set("webp")} sizes={sizes} /> : null}
        <img
          src={src}
          alt={alt}
          width={img.width ?? info?.w}
          height={img.height ?? info?.h}
          loading={img.loading ?? "lazy"}
          decoding="async"
          className={className}
          {...img}
        />
      </picture>
    </button>
  );
}
