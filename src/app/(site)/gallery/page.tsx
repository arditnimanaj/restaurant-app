import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Gallery | Ember & Oak",
};

const GALLERY_ITEMS = [
  {
    label: "The dining room",
    src: "https://images.unsplash.com/photo-1776993298456-98c71c0e177e?w=800&q=75",
  },
  {
    label: "Wood-fired hearth",
    src: "https://images.unsplash.com/photo-1588182657969-777d766e31ab?w=800&q=75",
  },
  {
    label: "Wood-Fired Ribeye",
    src: "https://images.unsplash.com/photo-1761138785048-9dae4abb0a0c?w=800&q=75",
  },
  {
    label: "The bar",
    src: "https://images.unsplash.com/photo-1718044402845-1f7c40598dec?w=800&q=75",
  },
  {
    label: "Private events",
    src: "https://images.unsplash.com/photo-1643101570532-88c8ecc07c1f?w=800&q=75",
  },
  {
    label: "Seasonal dessert",
    src: "https://images.unsplash.com/photo-1541781550486-81b7a2328578?w=800&q=75",
  },
];

export default function GalleryPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="text-center">
        <p className="text-xs font-medium tracking-[0.2em] text-primary uppercase">
          Inside Ember &amp; Oak
        </p>
        <h1 className="mt-3 font-heading text-4xl tracking-wide uppercase">
          Gallery
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          A look inside the restaurant &mdash; the dining room, the fire, and
          what comes off it.
        </p>
      </div>
      <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {GALLERY_ITEMS.map((item) => (
          <div
            key={item.label}
            className="group relative flex aspect-square items-end overflow-hidden rounded-lg ring-1 ring-border/60"
          >
            <Image
              src={item.src}
              alt={item.label}
              fill
              sizes="(min-width: 640px) 33vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0" />
            <span className="relative p-4 text-sm font-medium tracking-wide text-white uppercase drop-shadow">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
