import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery | Ember & Oak",
};

const GALLERY_ITEMS = [
  { label: "The dining room", gradient: "from-amber-200 to-amber-500" },
  { label: "Wood-fired hearth", gradient: "from-orange-300 to-red-500" },
  { label: "Wood-Fired Ribeye", gradient: "from-stone-300 to-stone-600" },
  { label: "The bar", gradient: "from-yellow-200 to-orange-400" },
  { label: "Private events", gradient: "from-amber-300 to-rose-400" },
  { label: "Seasonal dessert", gradient: "from-rose-200 to-amber-400" },
];

export default function GalleryPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Gallery</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        A look inside the restaurant. Placeholder tiles below &mdash; swap
        these for real photos of your space and dishes.
      </p>
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {GALLERY_ITEMS.map((item) => (
          <div
            key={item.label}
            className={`flex aspect-square items-end rounded-lg bg-gradient-to-br p-4 ${item.gradient}`}
          >
            <span className="text-sm font-medium text-white drop-shadow">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
