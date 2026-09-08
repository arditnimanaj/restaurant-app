import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery | Ember & Oak",
};

const GALLERY_ITEMS = [
  { label: "The dining room", gradient: "from-amber-900 to-amber-600" },
  { label: "Wood-fired hearth", gradient: "from-orange-950 to-red-800" },
  { label: "Wood-Fired Ribeye", gradient: "from-stone-800 to-stone-600" },
  { label: "The bar", gradient: "from-yellow-950 to-orange-800" },
  { label: "Private events", gradient: "from-amber-950 to-rose-800" },
  { label: "Seasonal dessert", gradient: "from-rose-950 to-amber-800" },
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
          A look inside the restaurant. Placeholder tiles below &mdash; swap
          these for real photos of your space and dishes.
        </p>
      </div>
      <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {GALLERY_ITEMS.map((item) => (
          <div
            key={item.label}
            className={`flex aspect-square items-end rounded-lg bg-gradient-to-br p-4 ring-1 ring-border/60 ${item.gradient}`}
          >
            <span className="text-sm font-medium tracking-wide text-white/90 uppercase drop-shadow">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
